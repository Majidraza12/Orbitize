"use client";
import React, { useEffect, useState } from "react";
import { GitCommit , Calendar , User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getLatestCommit } from "@/actions/commit";
import CommitLoader from "@/components/skeletons/CommitLoader"

function ShowLatestCommit({ projectId }: { projectId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [latestCommit, setLatestCommit] = useState(null); // Initialize as null
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const fetchLatestCommit = async () => {
      setLoading(true)
      const { status, data } = await getLatestCommit(projectId);
      console.log(data);
      if (status === "Success") {
        setLatestCommit(data[0]); // Set the latest commit
      }
      setLoading(false)
    };
    fetchLatestCommit();
  }, [projectId]);

  useEffect(() => {
    console.log("Latest commit updated:", latestCommit);
  }, [latestCommit]); // Logs whenever state updates

  const handleViewAllCommits = (e) => {
    // e.preventDefault();
    router.push(`${pathname}/commits`);
  };
    function convertTimestamp(isoTimestamp) {
      // Create a Date object from the ISO timestamp
      const date = new Date(isoTimestamp);

      // Extract date and time components
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      // Format into a readable string
      const readableFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return readableFormat;
    }


  const handleShowCommit = (e) => {
    console.log(latestCommit);
    console.log(latestCommit?.message);
  };

  return (
    <div className="mr-20 w-[60%]">
      {loading ? (
         <CommitLoader/>
      ) : (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-gray-500" />
              <span className="font-mono text-sm text-gray-500">
                {latestCommit ? latestCommit.id.slice(0, 8) : <p>Loading...</p>}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {latestCommit ? latestCommit.authorName : <p>Loading...</p>}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {/* {convertTimestamp(latestCommit.created_at)} */}
                {latestCommit ? (
                  convertTimestamp(latestCommit.created_at)
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            {latestCommit ? latestCommit.message : <p>Loading...</p>}
            <Button size="sm" onClick={(e)=>handleViewAllCommits()}>View All Commits</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowLatestCommit;
