"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import {useState} from 'react'


export default function CreateTaskPage() {

    const [formData, setFormData] = useState({
        taskName: '',
        taskDescription: '',
        assignedTo: '',
        dueDate: ''
    })  

    const handleCreateTask = () => {
        console.log(formData)
    }   

  return (
    <div className="flex flex-col items-center mt-20 ">
      <h1 className="text-3xl font-bold text-green-600 mb-10 mx-auto">
        Create Task
      </h1>
      <div className="flex flex-col gap-4 mx-auto w-1/4">
        <Label>Task Name</Label>
        <Input placeholder="Task Name" value={formData.taskName} onChange={(e) => setFormData({...formData, taskName: e.target.value})} />
        <Label>Task Description</Label>
        <Textarea placeholder="Task Description" value={formData.taskDescription} onChange={(e) => setFormData({...formData, taskDescription: e.target.value})} />
        <div className="flex flex-row gap-4 justify-between">
          <div className="flex flex-col gap-2 w-full">
            <Label>Assigned To</Label>
            <Select value={formData.assignedTo} onValueChange={(value) => setFormData({...formData, assignedTo: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Due Date</Label>
            <Input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})} />
          </div>
        </div>
        <Button className="mx-auto" onClick={handleCreateTask}>Create Task</Button>
      </div>
    </div>
  );
}

