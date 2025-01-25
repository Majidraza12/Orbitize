"use client";
import React, { useEffect, useState } from "react";
import { getProjects } from "@/actions/project";
import { Button } from "@/components/ui/button";
import CreateProjectButton from "@/components/CreateProjectButton";
import { ArrowRight, User, MoveUpRight } from "lucide-react";
import {
  CalendarIcon,
  UserIcon,
  ClipboardListIcon,
  PencilIcon,
} from "lucide-react";  
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
} from "./ui/card";

function DisplayProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const statusColors = {
    active: "text-green-500",
    "completed\n": "text-blue-500",
    "cancelled\n": "text-red-500",
    "on-hold\n": "text-yellow-500",
    "in-progress\n": "text-orange-500",
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { projects, error } = await getProjects();
      if (error) {
        console.log("Error fetching projects:", error);
        setError(error);
      } else {
        setProjects(projects);
      }
    };

    fetchProjects();
  }, []);
  const handlePageOpen = (e,projectId) => {
    e.preventDefault();
    router.push(`/dashboard/${projectId}`);
   }

  return (
    <div>
      {projects ? (
        <div className="flex gap-10 flex-wrap p-5 mt-10">
          {projects.map((project, index) => (
            <Card key={index} className="min-w-[80%] sm:min-w-[20%]">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  <div className="flex gap-4 mt-3">
                    <Badge
                      variant={project.status !== "active" ? project.status === "cancelled\n" ? "destructive" : "secondary" : ""}
                      // color={statusColors[project.status]}
                      
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
                    <Button>Veiw Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{project.name}</DialogTitle>
                      <DialogDescription>
                        {/* <p className="font-bold">Description :</p> */}
                        {project.description}
                      </DialogDescription>
                      <div className="flex gap-1">
                        <CalendarIcon size={20} />
                        <p className="text-sm ">{project.start_date}</p>
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
