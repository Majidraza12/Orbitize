import React from 'react'
import { getProject } from "@/actions/project";
import MembersDisplay from "@/components/MembersDisplay";
import DisplayTasks from "@/components/DisplayTasks"

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const projectId = (await params).projectId;
  const { project, error } = await getProject(projectId);

  if (error) {
    return <div>Error: {error.message || "An unknown error occurred"}</div>;
  }
  if (!project) {
    return <div>Loading...</div>;
  } 

  return (
      <div className="flex px-2 min-h-[80%]">
        <DisplayTasks projectId = {projectId} />
        <MembersDisplay projectId={projectId} />
      </div>
  );
};


export default ProjectPage