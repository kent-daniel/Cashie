import React from "react";

const Loading = () => {
  return (
    <div className="p-10">
      {/* Skeleton for Date Header */}
      <div className="h-8 w-1/3 mx-auto mb-8 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>

      {/* Skeleton for Payment Form */}
      <div className="space-y-4 mb-8">
        <div className="h-10 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
      </div>

      {/* Skeleton for Payment Table */}
      <div className="space-y-2">
        <div className="flex items-center space-x-4 mb-2">
          <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
          <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
          <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
          <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
        </div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-gray-600 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
