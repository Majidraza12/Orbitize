import React from 'react'
import { getProject } from "@/actions/project";
import KanbanBoard from "@/components/KanbanBoard";
import MembersDisplay from "@/components/MembersDisplay";

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const projectId = (await params).projectId;
  const { project, error } = await getProject(projectId);

  if (error) {
    return <div>Error: {error.message || "An unknown error occurred"}</div>;
  }

  return (
    <div>
      <h1>Details about Project {projectId} {project.name} </h1>
      <div className="flex p-2">
        <KanbanBoard projectId={projectId} />
        <MembersDisplay projectId={projectId} />
      </div>
    </div>
  );
};


export default ProjectPage