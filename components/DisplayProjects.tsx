"use client";
import React, { useEffect, useState } from "react";
import { getProjects } from "@/actions/project";
import { Button } from "@/components/ui/button";
import CreateProjectButton from "@/components/CreateProjectButton";
import { ArrowRight, MoveUpRight, CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardFooter,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectLoader from "./ProjectLoader";

function DisplayProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  const statusColors = {
    active: "text-green-500",
    completed: "text-blue-500",
    cancelled: "text-red-500",
    "on-hold": "text-yellow-500",
    "in-progress": "text-orange-500",
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Set loading to true when fetching starts
      const { projects, error } = await getProjects();
      if (error) {
        console.log("Error fetching projects:", error);
        setError(error);
      } else {
        setProjects(projects);
      }
      setLoading(false); // Set loading to false when fetching ends
    };

    fetchProjects();
  }, []);

  const handlePageOpen = (e, projectId) => {
    e.preventDefault();
    router.push(`/dashboard/${projectId}`);
  };

  if (loading) {
    return <ProjectLoader />; // Display loader while data is being fetched
  }

  return (
    <div>
      {projects && projects.length > 0 ? (
        <div className="flex gap-10 flex-wrap p-5 mt-10">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="md:w-[340px] h-[200px] w-[90%]"
            >
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  <div className="flex gap-4 mt-3">
                    <Badge
                      variant={
                        project.status === "cancelled"
                          ? "destructive"
                          : project.status === "active"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                    <div className="flex items-center justify-center gap-2">
                      <CalendarIcon size={20} />
                      <p className="text-xs">{project.end_date}</p>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-0"></CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{project.name}</DialogTitle>
                      <DialogDescription>
                        {project.description}
                      </DialogDescription>
                      <div className="flex gap-1">
                        <CalendarIcon size={20} />
                        <p className="text-sm">{project.start_date}</p>
                        <ArrowRight size={20} />
                        <p className="text-sm">{project.end_date}</p>
                      </div>
                      <div className="flex gap-1 text-sm">
                        Status :
                        <p className={`${statusColors[project.status]}`}>
                          {project.status}
                        </p>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="secondary"
                  onClick={(e) => handlePageOpen(e, project.id)}
                >
                  View Page
                  <MoveUpRight size={12} />
                </Button>
              </CardFooter>
            </Card>
          ))}
          <div className="flex justify-center items-center">
            <CreateProjectButton />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <CreateProjectButton />
        </div>
      )}
    </div>
  );
}

export default DisplayProjects;
