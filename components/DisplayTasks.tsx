"use client";
import React, { useState, useEffect } from "react";
import { getProject } from "@/actions/project";

const DisplayTasks = ({ projectId }) => {
  const [project, setProject] = useState(null); // State to store project data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch project data when component mounts or projectId changes
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getProject(projectId); // Fetch project data
        setProject(data); // Set project data
      } catch (err) {
        setError(err.message || "Failed to fetch project data"); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading state
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>; // Display an error message
  }

  if (!project || !project.tasks || project.tasks.length === 0) {
    return <div className="w-[70%]">No Tasks Avaiable</div>; // Handle empty tasks
  }

  return (
    <div className="w-[70%] p-4 bg-gray-100 rounded-lg shadow">
      <h1 className="text-3xl font-semibold mb-4">{project.name}</h1>
      <h2 className="text-xl font-medium mb-4">To-Do Tasks</h2>

      {/* Display tasks */}
      <div className="space-y-4">
        {project.tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Name: {task.name}</p>
              <p className="text-sm">Status: {task.status}</p>
              <p className="text-sm">Due Date: {task.dueDate}</p>
              <p className="text-sm">Assigned To: {task.assignedTo}</p>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              View Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTasks;
