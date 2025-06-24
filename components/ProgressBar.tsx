import React from "react";

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="relative w-24 h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8 text-right">
        {Math.round(percent)}%
      </span>
    </div>
  );
} 