"use client";
import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTaskButton";
import { deleteTask, getTasks } from "@/actions/task";
import { useRouter, usePathname } from "next/navigation";
import ShowLatestCommit from "./ShowLatestCommit";
import { Button } from "./ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";
import { Calendar, Mail, User, Trash2, History } from "lucide-react";
import UpdateTaskForm from "./UpdateTaskForm";
import TaskSkeletonLoader from "./TaskSkeletonLoader";
import toast from "react-hot-toast";

interface DisplayTasksProps {
  projectId: string;
}

const DisplayTasks: React.FC<DisplayTasksProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      console.log("Fetching tasks for projectId:", projectId);
      const { data } = await getTasks(projectId);
      setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, [projectId]);

  const handleTaskDelete = async (e: React.MouseEvent, task: any) => {
    e.preventDefault();
    console.log(task);
    const { status } = await deleteTask(task)
    if (status === "Success") {
      toast.success("Task Deleted");
      setTimeout(() => {
        window.location.reload();
      }, 600); //600ms delay
      return
    }
    return toast.success(status)
  };

  const handleViewCommit = () => {
    const newPath = `${pathname}/commits/1`;
    router.push(newPath);
  };

  return (
    <div className="w-[75%]">
      <h1 className="text-3xl font-mono m-4 font-bold">Project Tasks</h1>
      {loading ? (
        <TaskSkeletonLoader />
      ) : tasks.length > 0 ? (
        <div className="flex gap-10 flex-wrap m-2">
          {tasks.map((task, index) => (
            <Card key={index} className="md:w-[340px] h-[200px] w-[90%]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {task.task_name}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Trash2 className="h-4 w-4 hover:text-red-800 hover:cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your task and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button size="sm" variant="destructive" onClick={(e)=>handleTaskDelete(e,task)}>
                          Delete Task
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>
                  <Badge
                    variant={
                      task.status === "Pending"
                        ? "destructive"
                        : task.status === "Completed"
                          ? "secondary"
                          : "default"
                    }
                    className="mt-1"
                  >
                    {task.status}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-5 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{task.due_date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={16} className="h-4 w-4" />
                  <span>{task.assignedToName}</span>
                </div>
              </CardContent>
              <CardFooter className="flex items-start justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{task.task_name}</DialogTitle>
                      <DialogDescription>{task.description}</DialogDescription>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-20 text-muted-foreground text-sm">
                          <div className="flex flex-col w-[30%]">
                            <span className="font-semibold">Status</span>
                            <Badge
                              variant={
                                task.status === "Pending"
                                  ? "destructive"
                                  : task.status === "Completed"
                                    ? "secondary"
                                    : "default"
                              }
                              className="mt-1"
                            >
                              {task.status}
                            </Badge>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold">Priority</span>
                            <span className="text-white text-sm">
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col w-[30%] gap-1 text-muted-foreground text-sm">
                          <span className="font-semibold">Assigned To</span>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span className="text-white">
                              {capitalize(task.assignedToName)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-white flex items-center gap-1">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              {task.assignedToEmail}
                            </span>
                          </div>
                        </div>
                      </div>
                    </DialogHeader>
                    <DialogFooter className="flex justify-between">
                      <div className="flex items-center gap-1 hover:underline hover:text-white mt-0">
                        <span
                          className="text-white flex items-center gap-1"
                          onClick={handleViewCommit}
                        >
                          <History className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">Commit History</p>
                        </span>
                      </div>
                      <DialogClose asChild>
                        <Button variant="destructive" size="sm">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setSelectedTask(task)}
                    >
                      Update Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Update Task</DialogTitle>
                    {selectedTask && <UpdateTaskForm task={selectedTask} />}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
          <div className="flex items-center justify-center">
            <CreateTask projectId={projectId} />
          </div>
        </div>
      ) : (
        <div className="flex items-center p-4">
          <CreateTask projectId={projectId} />
        </div>
      )}
      <div className="ml-2 mt-10">
        <ShowLatestCommit projectId={projectId} />
      </div>
    </div>
  );
};

export default DisplayTasks;
