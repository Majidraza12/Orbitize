import React from 'react'

const DisplayTasks = () => {
  return (
      <div className='w-[70%]'>
          <h1 className='text-3xl'>To-do</h1>
          {/* Tasks will be displayed here */}
          <div>
              <p className='text-sm'>Name</p>
              <p className='text-sm'>Status</p>
              <p className='text-sm'>Due Date</p>
              <p className='text-sm'>Assigned To</p>
              <button>Veiw Task</button>
          </div>

    </div>
  )
}

export default DisplayTasks