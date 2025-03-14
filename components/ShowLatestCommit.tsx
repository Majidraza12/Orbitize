"use client";
import React, { useEffect, useState } from "react";
import { GitCommit, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getLatestCommit } from "@/actions/commit";
import CommitLoader from "@/components/skeletons/CommitLoader";

function ShowLatestCommit({ projectId }: { projectId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [latestCommit, setLatestCommit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noCommits, setNoCommits] = useState(false);

  useEffect(() => {
    const fetchLatestCommit = async () => {
      setLoading(true);
      const { status, data } = await getLatestCommit(projectId);
      console.log(data);
      if (status === "Success" && data.length > 0) {
        setLatestCommit(data[0]);
      } else {
        setNoCommits(true);
      }
      setLoading(false);
    };
    fetchLatestCommit();
  }, [projectId]);

  useEffect(() => {
    console.log("Latest commit updated:", latestCommit);
  }, [latestCommit]);

  const handleViewAllCommits = () => {
    router.push(`${pathname}/commits`);
  };

  function convertTimestamp(isoTimestamp) {
    const date = new Date(isoTimestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="mr-20 w-[60%]">
      {loading ? (
        <CommitLoader />
      ) : noCommits ? (
        <div className="border rounded-lg p-4 text-gray-500 flex justify-between">
          No commits available.
          <Button size="sm" onClick={handleViewAllCommits}>
            View All Commits
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-gray-500" />
              <span className="font-mono text-sm text-gray-500">
                {latestCommit?.id.slice(0, 8)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {latestCommit?.authorName}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {latestCommit ? convertTimestamp(latestCommit.created_at) : ""}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            {latestCommit?.message}
            <Button size="sm" onClick={handleViewAllCommits}>
              View All Commits
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowLatestCommit;
