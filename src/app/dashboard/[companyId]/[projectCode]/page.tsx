import React from "react";
import { fetchProjectPaymentRows } from "./actions";

const page = async ({ params }: { params: { projectCode: string } }) => {
  const response = await fetchProjectPaymentRows(params.projectCode);

  return (
    <>
      <div>
        <p>
          Number of Payments: {response.length} {response[0].email}
        </p>
      </div>
      {response.map((row) => (
        <p key={row.id}>{row.description}</p>
      ))}
    </>
  );
};

export default page;
