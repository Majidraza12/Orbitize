"use client";
import React, { useEffect, useState } from "react";
import { PlusCircle, GitCommit, Calendar, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addCommit , getCommits } from "@/actions/commit";
import toast from "react-hot-toast";
import CommitLoader from "@/components/skeletons/CommitLoader";

const Page = ({
  params,
}: {
  params: { projectId: string; taskId: string };
}) => {
  // Unwrapping params using React.use
  const { projectId, taskId } = React.use(params);

  const [commits, setCommits] = useState([]);
  const [loading,setLoading] = useState(false)

  const [newCommit, setNewCommit] = useState({
    message: "",
    authorName: "",
    projectId : projectId
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true)
      console.log("Fetching Commits for the project" , projectId)
      const { status, data } = await getCommits(projectId)
      console.log("Commits : " ,data)
      if (status !== "Success") {
        return toast.error("Couldn't fetch commits at this time")
      }
      setCommits(data)
      setLoading(false)
      return 
    }
    fetchCommits()
  },[projectId])

  const handleAddCommit = async () => {
    console.log(projectId)
    console.log("New Commit : ", newCommit)
    const { status, data } = await addCommit(newCommit)
    console.log(data)
    console.log(status)
    if (status === "Success") {
      toast.success("Commit Successfull");
      setTimeout(() => {
        window.location.reload();
      }, 600); //600ms delay
    }
    else {
      toast.error(status)
    }
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

  // Example usage

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Commit History</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Add Commit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Commit</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <Input
                  placeholder="Enter author name"
                  value={newCommit.authorName}
                  onChange={(e) =>
                    setNewCommit({ ...newCommit, authorName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Commit Message
                </label>
                <Textarea
                  placeholder="Enter commit message"
                  value={newCommit.message}
                  onChange={(e) =>
                    setNewCommit({ ...newCommit, message: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleAddCommit}
                disabled={!newCommit.message || !newCommit.authorName}
              >
                Create Commit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {loading ? (
          <>
            <CommitLoader />
            <CommitLoader />
            <CommitLoader />
          </>
        ) : (
          <>
            {commits.map((commit, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-gray-500" />
                    <span className="font-mono text-sm text-gray-500">
                      {commit.id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {commit.authorName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {convertTimestamp(commit.created_at)}
                    </div>
                  </div>
                </div>
                <p className="mt-2">{commit.message}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
