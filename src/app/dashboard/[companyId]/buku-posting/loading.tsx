import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 ">
      <div className="w-1/2 mb-4">
        <div className="h-10 w-48 bg-emerald-800/75 animate-pulse rounded-md mx-auto"></div>{" "}
        {/* Placeholder for BackToDashboardButton */}
      </div>
      <div className="w-1/2  p-6  bg-emerald-900 rounded-lg shadow-lg space-y-4">
        <div className="h-6 w-1/3  bg-emerald-800/75 animate-pulse rounded-md"></div>{" "}
        {/* Placeholder for ProjectListHeader */}
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 bg-emerald-800/75  w-full  animate-pulse rounded-md"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
