import React from 'react'
import CreateTask from './CreateTaskButton'

const DisplayTasks = ( {projectId}  : string) => {
  return (
    <div className='w-[75%]'>
      <div>
        <h1 className='text-2xl mb-2 mt-2'>Tasks</h1>
      </div>
      <CreateTask projectId={projectId} />
    </div>
  )
}

export default DisplayTasks