"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function ShowLatestCommit({ projectId }: { projectId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleViewAllCommits = (e) => {
    e.preventDefault();
    router.push(`${pathname}/commits`);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">⎇</span>
                <span className="font-mono text-sm text-gray-500">
                  first 5 digits of the commit Id
                </span>
              </div>
              <p className="font-medium">
                latest commit message for the project
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              onClick={(e) => handleViewAllCommits(e)}
            >
              View All Commits
            </Button>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>authorName</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>🕒</span>
              12/40/2025
            </span>
            <span>•</span>
            <span className="font-medium text-gray-700">
              Project: ProjectName
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShowLatestCommit;
