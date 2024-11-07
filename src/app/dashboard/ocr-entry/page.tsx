// @ts-nocheck
"use client";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadThing";
import { ArrowUp10Icon } from "lucide-react";
import { useEffect, useState } from "react";
import Spreadsheet from "react-spreadsheet";
import OpenAI from "openai";

// Ensure OpenAI key exists
if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  console.error("OpenAI API key is missing.");
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const parseImageToCsv = async (imageUrl) => {
  console.log("Parsing image:", imageUrl);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful data extraction agent. For numeric values like Rp 200,000,000, parse them as 200000000. Date format should be dd/mm/yyyy",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please extract the data to CSV from the image at the following URL, with columns [Kode, Tanggal, Deskripsi, Nilai, Kategori (can be Debit / Kredit)]. Do not return the column names or any other text or formatting, just the parsed values and rows ONLY",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });

    const extractedCsv = response.choices[0]?.message?.content?.trim() || "";
    console.log("Extracted CSV:", extractedCsv);
    return extractedCsv;
  } catch (error) {
    console.error("Error in parsing image to CSV:", error);
    return "";
  }
};

// Helper function to parse CSV into a 2D array
const parseCSV = (csv) => {
  const MAX_ROWS = 50;
  const MAX_COLUMNS = 5;

  const parsedData = csv.split("\n").map((row) =>
    row
      .trim()
      .split(",")
      .map((cell) => ({ value: cell.trim() }))
  );

  for (let i = 0; i < parsedData.length; i++) {
    while (parsedData[i].length < MAX_COLUMNS) {
      parsedData[i].push({ value: "" });
    }
  }

  while (parsedData.length < MAX_ROWS) {
    parsedData.push(Array.from({ length: MAX_COLUMNS }, () => ({ value: "" })));
  }

  return parsedData;
};

const Page = () => {
  const [data, setData] = useState(
    Array.from({ length: 50 }, () =>
      Array.from({ length: 5 }, () => ({ value: "" }))
    )
  );
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleParseImage = async () => {
    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    const csvData = await parseImageToCsv(imageUrl);
    if (csvData) {
      const parsedData = parseCSV(csvData);
      setData(parsedData);
    } else {
      alert("Failed to parse CSV data.");
    }
    setIsLoading(false);
  };

  return (
    <div className="mx-auto">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files uploaded:", res);
          setImageUrl(res[0].url);
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
        className="bg-gray-800"
      />
      <div className="flex my-3 gap-3">
        <Button
          type="button"
          className={`w-1/2 bg-emerald-600 text-white hover:bg-emerald-700 ${
            isLoading ? "animate-pulse" : ""
          }`}
          onClick={handleParseImage}
          disabled={isLoading}
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              Mulai proses <ArrowUp10Icon />
            </>
          )}
        </Button>
        <Button type="submit" className="w-1/2">
          Konfirmasi
        </Button>
      </div>

      <div className="flex items-start">
        <img src={imageUrl} className="w-1/2 object-contain align-top" />
        <Spreadsheet
          data={data}
          onChange={setData}
          className="mx-auto"
          columnLabels={["Kode", "Tanggal", "Deskripsi", "Nilai", "Kategori"]}
        />
      </div>
    </div>
  );
};

export default Page;
