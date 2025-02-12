import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function CommitLoader() {
  return (
    <div className="mr-20 w-[100%]">
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          {/* Commit hash section */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" /> {/* GitCommit icon */}
            <Skeleton className="h-4 w-20" /> {/* Commit hash */}
          </div>

          {/* Author and date section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="w-4 h-4 rounded-full" /> {/* User icon */}
              <Skeleton className="h-4 w-24" /> {/* Author name */}
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="w-4 h-4 rounded-full" />{" "}
              {/* Calendar icon */}
              <Skeleton className="h-4 w-24" /> {/* Date */}
            </div>
          </div>
        </div>

        {/* Commit message and button section */}
        <div className="flex justify-between mt-2">
          <Skeleton className="h-4 w-[200px]" /> {/* Commit message */}
          <Skeleton className="h-8 w-32" /> {/* View All Commits button */}
        </div>
      </div>
    </div>
  );
};

export default CommitLoader;
