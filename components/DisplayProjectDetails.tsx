"use client"
import React, { useEffect } from 'react'
import { getProject } from '@/actions/project'
import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button'

const DisplayProjectDetails = ({ projectId }) => {
    const [project, setProject] = useState(null)

    useEffect(() => { 
        const fetchProject = async () => {
            const { project, error } = await getProject(projectId)
            if (error) {
                toast.error(error?.message)
            }
            setProject(project)
            console.log(project)
        }
        fetchProject()
    },[])

  return (
    <div>
      <h1 className="text-xl mb-2 mt-2">Project Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Project Name : {project?.name}</CardTitle>
          <CardDescription>
            Description : {project?.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Status : {project?.status}</p>
          <p>Start Date : {project?.start_date}</p>
          <p>End Date : {project?.end_date}</p>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Pencil />
                Update
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}

export default DisplayProjectDetails