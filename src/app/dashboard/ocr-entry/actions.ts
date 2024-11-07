"use client";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const parseImageToCsv = async (imageUrl: string): Promise<string> => {
  console.log("parsing image :", imageUrl);
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
            text: "Please extract the data to CSV from the image at the following URL, with columns [Kode, Tanggal, Deskripsi, Nilai, Kategori (can be Debit / Kredit)]. Do not return the column names or any other text or formatting , just the parsed values and rows ONLY",
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
};
