"use client";
import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTaskButton";
import { getTasks } from "@/actions/task";
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
import { CalendarIcon, Calendar, Mail, User } from "lucide-react";
import UpdateTaskForm from "./UpdateTaskForm";

interface DisplayTasksProps {
  projectId: string;
}

const DisplayTasks: React.FC<DisplayTasksProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const capitalize = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("Fetching tasks for projectId:", projectId);
      const { data } = await getTasks(projectId);
      setTasks(data);
    };
    fetchTasks();
  }, [projectId]);

  return (
    <div className="w-[75%]">
      <h1 className="text-3xl font-mono m-4 font-bold">Project Tasks</h1>
      {tasks.length > 0 ? (
        <div className="flex gap-10 flex-wrap m-2">
          {tasks.map((task, index) => (
            <Card key={index} className="md:w-[340px] h-[200px] w-[90%]">
              <CardHeader>
                <CardTitle>{task.task_name}</CardTitle>
                <CardDescription>
                  <Badge
                    variant={
                      task.status === "Pending"
                        ? "destructive"
                        : task.status === "Completed"
                          ? "secondary"
                          : ""
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
                                    : ""
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
                            <Mail className="h-4 w-4" />
                            <span className="text-white">
                              {task.assignedToEmail}
                            </span>
                          </div>
                        </div>
                      </div>
                    </DialogHeader>
                    <DialogFooter >
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
                    <Button size="sm" variant="secondary" onClick={() => setSelectedTask(task)}>
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
        </div>
      ) : (
        <div>No Tasks</div>
      )}
      <CreateTask projectId={projectId} />
    </div>
  );
};

export default DisplayTasks;
