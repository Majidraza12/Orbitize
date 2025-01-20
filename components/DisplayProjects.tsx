"use client";
import React, { useEffect, useState } from "react";
import { getProjects } from "@/actions/project";
import { Button } from "@/components/ui/button";
import CreateProjectButton from "@/components/CreateProjectButton";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function DisplayProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const statusColors = {
    active: "text-green-500",
    "completed\n": "text-blue-500",
    "cancelled\n": "text-red-500",
    'on-hold\n': "text-yellow-500",
    'in-progress\n': "text-orange-500",
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
  console.log("projects : ", projects);
  return (
    <div>
      {error && <p>Error: {error}</p>}
      {projects.length > 0 ? (
        <div className="flex gap-10 flex-wrap p-5 mt-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-300 shadow-lg p-5 rounded-lg transition-transform transform hover:scale-105 w-[20%] h-[20%]"
            >
              <h1 className="font-bold text-xl mb-2">{project.name}</h1>
              <p className="text-white mb-1">
                Description: {project.description}
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-500">{project.start_date}</p>
                <ArrowRight size={16} />
                <p className="text-sm text-gray-500">{project.end_date}</p> 
              </div>
              <div className="flex justify-between">
                <div className="flex gap-1">
                  <p className="text-sm text-gray-500">Status:</p>
                  <p
                      className={`text-sm ${statusColors[project.status as keyof typeof statusColors]}`}
                  >
                    {project.status}
                  </p>
                </div>
                <Button size="sm" onClick={() => router.push(`/dashboard/${project.id}`)}>Open Page</Button>
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center">
            <CreateProjectButton />
          </div>
        </div>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default DisplayProjects;
