"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getLatestCommit } from "@/actions/commit";

function ShowLatestCommit({ projectId }: { projectId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [latestCommit,setLatestCommit] = useState()

  useEffect(() => {
    const fetchLatestCommit = async () => {
      const { status, data } = await getLatestCommit(projectId)
      console.log(data)
      if (status === "Success") {
        setLatestCommit(data)
      }
    }
    fetchLatestCommit()
  },[projectId])

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
                  commit
                </span>
              </div>
              <p className="font-medium">
                latest commit message
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
            <span>{}</span>
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
