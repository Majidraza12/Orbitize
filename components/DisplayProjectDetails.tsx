"use client";
import React, { useEffect, useState } from "react";
import { getProject } from "@/actions/project";
import { Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { SelectItem } from "./ui/select";

const DisplayProjectDetails = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      const { project, error } = await getProject(projectId);
      if (error) {
        toast.error(error?.message);
      } else {
        setProject(project);
        setProjectData({
          name: project?.name || "",
          description: project?.description || "",
          startDate: project?.start_date || "",
          endDate: project?.end_date || "",
          status: project?.status || "",
        });
      }
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setProjectData((prevData) => ({ ...prevData, status: value }));
    };
    
    const handleSaveChanges = async (e) => { 
        if (!projectData.name || !projectData.description || !projectData.startDate || !projectData.endDate || !projectData.status) {
            return toast.error("Please fill all the fields");
        }
        if (new Date(projectData.startDate) < new Date() || new Date(projectData.endDate) < new Date()) { 
            return toast.error("Start date and end date should be in the future");
        }
        e.preventDefault();
        console.log(projectData);
    }

  return (
    <div>
      <h1 className="text-xl mb-2 mt-2">Project Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Project Name : {project?.name}</CardTitle>
          <CardDescription>
            Description : {project?.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Status : {project?.status}</p>
          <p>Start Date : {project?.start_date}</p>
          <p>End Date : {project?.end_date}</p>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Pencil />
                Update
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Project</DialogTitle>
                <DialogDescription>
                  Note that Project updates are <b>irreversible.</b>
                </DialogDescription>
              </DialogHeader>
              <Label>Name</Label>
              <Input
                name="name"
                value={projectData.name}
                onChange={handleChange}
              />
              <Label>Description</Label>
              <Textarea
                name="description"
                value={projectData.description}
                onChange={handleChange}
              />
              <Label>Status</Label>
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={projectData.status || "Select Status"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-between">
                <div className="w-[45%] space-y-1">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    value={projectData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-[45%] space-y-1">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    value={projectData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <DialogFooter className="mt-2">
                <DialogClose asChild>
                  <Button type="button" variant="destructive">
                    Cancel
                  </Button>
                </DialogClose>
                <Button onClick={(e) => handleSaveChanges(e)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DisplayProjectDetails;
