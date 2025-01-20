import React from 'react'

const ProjectPage = ( {params}: {params: {projectId: string}}) => {
  return (
    <div>Details about Project {params.projectId}</div>
  )
}

export default ProjectPage