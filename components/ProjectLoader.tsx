import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectLoader() {
  return (
    <div className="flex gap-10 flex-wrap p-5 mt-10">
      {/* Simulate multiple cards loading */}
      {[...Array(5)].map((_, index) => (
        <Card key={index} className="min-w-[80%] sm:min-w-[20%]">
          <CardHeader>
            {/* Title Skeleton */}
            <Skeleton className="h-6 w-3/4 bg-gray-300 rounded-md" />
            {/* Status and Date Skeleton */}
            <div className="flex gap-4 mt-3">
              <Skeleton className="h-4 w-1/4 bg-gray-300 rounded-md" />
              <Skeleton className="h-4 w-1/3 bg-gray-300 rounded-md" />
            </div>
          </CardHeader>
          <CardContent>
            {/* Content Skeleton */}
            {/* <Skeleton className="h-24 w-full bg-gray-300 rounded-md" /> */}
          </CardContent>
          <CardFooter className="flex justify-between items-center">
                  {/* Button Skeleton */}
            <Skeleton className="h-8 w-20 bg-gray-300 rounded-md" />
            <Skeleton className="h-8 w-20 bg-gray-300 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ProjectLoader;
