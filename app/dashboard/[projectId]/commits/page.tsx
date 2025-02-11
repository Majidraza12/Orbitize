"use client";
import React, { useState } from "react";
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

const Page = ({
  params,
}: {
  params: { projectId: string; taskId: string };
}) => {
  // Unwrapping params using React.use
  const { projectId, taskId } = React.use(params);

  const [commits, setCommits] = useState([
    {
      id: 1,
      message: "Initial commit: Project setup and basic structure",
      author: "John Doe",
      date: "2024-02-09",
      hash: "8f62a4d",
    },
    {
      id: 2,
      message: "Add authentication system and user roles",
      author: "Jane Smith",
      date: "2024-02-08",
      hash: "3e7b9c1",
    },
  ]);

  const [newCommit, setNewCommit] = useState({
    message: "",
    author: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCommit = () => {
    if (newCommit.message && newCommit.author) {
      const commit = {
        id: commits.length + 1,
        message: newCommit.message,
        author: newCommit.author,
        date: new Date().toISOString().split("T")[0],
        hash: Math.random().toString(16).slice(2, 9),
      };

      setCommits([commit, ...commits]);
      setNewCommit({ message: "", author: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Commit History</h1>
          <div className="text-sm text-gray-500">
            <p>Project ID: {projectId}</p>
            <p>Task ID: {taskId || "None"}</p>
          </div>
        </div>

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
                  value={newCommit.author}
                  onChange={(e) =>
                    setNewCommit({ ...newCommit, author: e.target.value })
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
                disabled={!newCommit.message || !newCommit.author}
              >
                Create Commit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {commits.map((commit) => (
          <div
            key={commit.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-sm text-gray-500">
                  {commit.hash}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {commit.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {commit.date}
                </div>
              </div>
            </div>
            <p className="mt-2 text-gray-700">{commit.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
