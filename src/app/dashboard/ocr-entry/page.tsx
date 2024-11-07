// @ts-nocheck

"use client";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadThing";
import { ArrowUp10Icon } from "lucide-react";
import { useEffect, useState } from "react";
import Spreadsheet from "react-spreadsheet";
import { parseImageToCsv } from "./actions";

// Helper function to parse CSV into a 2D array
const parseCSV = (csv) => {
  const MAX_ROWS = 50;
  const MAX_COLUMNS = 5;

  // Parse the CSV into a 2D array of cell objects
  const parsedData = csv.split("\n").map((row) =>
    row
      .trim()
      .split(",")
      .map((cell) => ({ value: cell.trim() }))
  );

  // Ensure each row has the same number of columns
  for (let i = 0; i < parsedData.length; i++) {
    while (parsedData[i].length < MAX_COLUMNS) {
      parsedData[i].push({ value: "" });
    }
  }

  // Add empty rows until we reach 50 rows
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
    if (imageUrl) {
      setIsLoading(true);
      const csvData = await parseImageToCsv(imageUrl);
      const parsedData = parseCSV(csvData);
      setData(parsedData);
      setIsLoading(false);
    } else {
      alert("Please upload an image first.");
    }
  };

  return (
    <div className="mx-auto">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);

          setImageUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        className="bg-gray-800"
      />
      <div className="flex my-3 gap-3">
        <Button
          type="button"
          className={`w-1/2 bg-emerald-600 text-white hover:bg-emerald-700 ${
            isLoading && "animate-pulse"
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
        <img src={imageUrl} className="w-1/2 object-contain align-top"></img>
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
