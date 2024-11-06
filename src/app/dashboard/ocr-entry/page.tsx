// @ts-nocheck

"use client";
import { UploadButton } from "@/utils/uploadThing";
import { useEffect, useState } from "react";
import Spreadsheet from "react-spreadsheet";

// Simulate fetching CSV data from an API
const fetchCSVData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const csvData = `Code,Description,Date,Amount
1054V,B.Pro PVC 1/2",27-02-23,182,200
1056V,Elbow PVC 8",27-02-23,559,800
C,Knop gantung 3/4",03-05-23,82,500
G,Flexible Rod 8",06-05-23,2,497,500
1056V,Flexible Rod 8",06-05-23,3,996,000
Q,Klem gantung 1/2",08-03-23,46,800
1101,Klem gantung 2",13-05-23,316,900
U,U-Bolt 1 1/2",15-05-23,50,400
1101,U-Bolt 1 1/2",15-05-23,108,400
1056V,Flexible Rod 8",16-05-23,220,600
1056V,Flexible Rod 8",17-03-23,890,500
1055,B. Pipa PVC 1/2",14-03-23,173,300
1056V,Flexible Rod 8",27-02-23,1,370,000
G,Plug 1/8",27-02-23,31,300
Q,Klem gantung 3",18-03-23,41,700
1058,B. Pipa GI 3/4",15-05-23,318,000
1058,B. Gate Valve 1/2" S/Union,16-05-23,411,000
1058,B. Check Valve 1/2",16-05-23,424,000
1058,B. Gate Valve 2 1/2" KITZ,16-05-23,628,600
1058,B. Pipa PVC PN 10 1/2",16-05-23,702,000
1058,Elbow PVC 1/2",15-05-23,142,600
1055,B. Socket UGI 2",16-05-23,37,600
1055,B. Elbow GI 3",08-03-23,180,000
1055,B. Elbow GI 4",08-03-23,440,000
1055,B. Elbow GI 3/4",15-05-23,72,000
1055,B. Socket UGI 3/8",22-05-23,22,000
1055,B. Elbow PVC 3/4",08-03-23,207,600
1101,Klem gantung 3",08-03-23,291,000
G,Plug 1/2",27-02-23,33,000
1058V,See FPP 1/2",15-05-23,25,000
Q,Socket galvan pipe 1/2",27-02-23,23,000
Q,Socket galvan pipe 3/8",08-03-23,34,000
G,Elbow PVC 3/4",08-03-23,18,000
ODC2,NVR 4" hole,26-03-23,263,000
Total, , ,15,186,700`;
      resolve(csvData);
    }, 1000); // Simulate a 1-second delay
  });
};

// Helper function to parse CSV into a 2D array
const parseCSV = (csv) => {
  return csv.split("\n").map((row) =>
    row
      .trim()
      .split(",")
      .map((cell) => ({ value: cell.trim() }))
  );
};

const Page = () => {
  const [data, setData] = useState(
    Array.from({ length: 50 }, () =>
      Array.from({ length: 5 }, () => ({ value: "" }))
    )
  );

  useEffect(() => {
    const populateData = async () => {
      const csvData = await fetchCSVData();
      const parsedData = parseCSV(csvData);

      // Update the 50x50 matrix with the parsed CSV data
      setData((prevData) => {
        const newData = [...prevData];
        parsedData.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (i < 50 && j < 50) {
              newData[i][j] = cell;
            }
          });
        });
        return newData;
      });
    };

    populateData();
  }, []);

  console.log(data);

  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        className="bg-gray-800"
      />
      <Spreadsheet data={data} onChange={setData} />;
    </>
  );
};

export default Page;
