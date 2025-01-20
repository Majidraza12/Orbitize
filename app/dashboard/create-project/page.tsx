"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProject } from "@/actions/project";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

export default function CreateProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const handleCreateProject = async () => {
    if (
      !projectData.name ||
      !projectData.description ||
      !projectData.startDate ||
      !projectData.endDate ||
      !projectData.status
    ) {
      toast.error("All fields are required");
      return;
    }
    // Validate dates are not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time portion for date comparison
    
    const startDate = new Date(projectData.startDate);
    const endDate = new Date(projectData.endDate);

    if (startDate < today) {
      toast.error("Start date cannot be in the past");
      return;
    }

    if (endDate < today) {
      toast.error("End date cannot be in the past");
      return;
    }

    if (endDate < startDate) {
      toast.error("End date must be after start date");
      return;
    }

    // Validate status is 'active'
    if (projectData.status.toLowerCase() !== 'active') {
      toast.error("Project status must be 'active' for new projects");
      return;
    }
    //Create projet if all the data is valid  
    const formData = new FormData();    
    formData.append("name", projectData.name);
    formData.append("description", projectData.description);
    formData.append("startDate", projectData.startDate);
    formData.append("endDate", projectData.endDate);
    formData.append("status", projectData.status);
    try {
      setIsLoading(true);
      const res = await createProject(formData); 
      if (res.status === "Success") {
        toast.success("Project created successfully");
        router.push("/dashboard");
      } else {
        toast.error(res.status);
      }
    } catch (error) {
      toast.error(error || "Failed to create project");
    } finally {
      setIsLoading(false);
    }


    console.log(projectData);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-[70%] mx-auto mt-20">
      <h1 className="text-3xl font-bold mx-auto mt-5 mb-10">Create Project</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="project-name" className="text-sm font-medium">
          Project Name
        </label>
        <Input
          type="text"
          placeholder="Project Name"
          onChange={(e) =>
            setProjectData({ ...projectData, name: e.target.value })
          }
        />
        <label htmlFor="project-description" className="text-sm font-medium">
          Project Description
        </label>
        <Textarea
          placeholder="Project Description"
          onChange={(e) =>
            setProjectData({ ...projectData, description: e.target.value })
          }
        />
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <label htmlFor="project-start-date" className="text-sm font-medium">
              Project Start Date
            </label>
            <Input
              type="date"
              placeholder="Project Start Date"
              onChange={(e) =>
                setProjectData({ ...projectData, startDate: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="project-end-date" className="text-sm font-medium">
              Project End Date
            </label>
            <Input
              type="date"
              placeholder="Project End Date"
              onChange={(e) =>
                setProjectData({ ...projectData, endDate: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="project-status" className="text-sm font-medium">
              Project Status
            </label>
            <Select
              onValueChange={(value) =>
                setProjectData({ ...projectData, status: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="mt-4 mx-auto" onClick={handleCreateProject}>
          {isLoading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : "Create Project"}
        </Button>
      </div>
    </div>
  );
}
