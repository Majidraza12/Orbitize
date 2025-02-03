import React from 'react'
import CreateTask from './CreateTaskButton'

const DisplayTasks = ( {projectId}  : string) => {
  return (
    <div className='w-[75%]'>DisplayTasks
      <CreateTask projectId={projectId} />
    </div>
  )
}

export default DisplayTasks