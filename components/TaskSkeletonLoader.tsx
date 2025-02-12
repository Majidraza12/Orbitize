import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TaskSkeletonLoader = ({ count = 2 }) => {
  return (
    <div className="flex gap-10 flex-wrap m-2">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card key={index} className="md:w-[340px] h-[200px] w-[90%]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-4 w-4" />
              </div>
              <Skeleton className="h-5 w-20 mt-2" />
            </CardHeader>

            <CardContent className="flex gap-5">
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>

            <CardFooter className="flex items-start justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default TaskSkeletonLoader;
