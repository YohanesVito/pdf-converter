// components/Loading.jsx
"use client";

import { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10; // Increment progress by 10%
      });
    }, 500);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {/* Judul */}
        <h2 className="text-[#0e141b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Processing your file
        </h2>

        {/* Progress Bar */}
        <div className="flex flex-col gap-3 p-4">
          {/* Persentase */}
          <div className="flex gap-6 justify-between">
            <p className="text-[#0e141b] text-base font-medium leading-normal">{progress}%</p>
          </div>

          {/* Bar Progress */}
          <div className="rounded bg-[#d0dbe7]">
            <div
              className="h-2 rounded bg-[#1978e5]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Deskripsi */}
        <p className="text-[#0e141b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
          Please wait while we process your file. This may take a few moments.
        </p>
      </div>
    </div>
  );
};

export default Loading;