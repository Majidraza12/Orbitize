import React from 'react'
import { Button } from './ui/button'

const KanbanBoard = ({projectId}: {projectId: string}) => {
  return (
    <div className="w-[80%]">
      KanbanBoard
      <Button>Add Task</Button>
      <p>Project ID : {projectId}</p>
      <div className="flex flex-row mt-5 gap-4">
      <div className="w-[30%] border-2 border-red-300 rounded-md p-5">
          <h1 className='text-2xl font-bold'>To Do</h1>
          <div className="flex flex-col">
            <div className="flex flex-row">
              sdad
            </div>
          </div>
        </div>
        <div className="w-[30%] border-2 border-green-300 rounded-md p-5">
          <h1 className='text-2xl font-bold'>In Progress</h1>
          <div className="flex flex-col"></div>
        </div>
        <div className="w-[30%] border-2 border-blue-300 rounded-md p-5">
          <h1 className='text-2xl font-bold'>Done</h1>
          <div className="flex flex-col"></div>
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard