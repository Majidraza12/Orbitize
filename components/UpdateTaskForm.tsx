"use client";
import { DialogFooter } from "./ui/dialog";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateTask } from "@/actions/task";
import toast from "react-hot-toast";

const UpdateTaskForm = ({task }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    task_id : task.id,
    task_name: task.task_name,
    description: task.description,
    status: task.status,
    priority: task.priority,
    category: task.category,
    due_date: task.due_date,
    projectId: task.projectId,
    assignedToId : task.assignedToId,
    assignedToEmail: task.assignedToEmail,
    assignedToName : task.assignedToName,
  });

  useEffect(() => {
    console.log("task : ", task);
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Task Sent : ",task)
    console.log("Form Data:", formData);
    const { status, data } = await updateTask(formData)// Log the form data
    if (status === "Task updated Successfully") {
      console.log(data)
      toast.success("Task was updated Successfully")
        window.location.reload();
    }
    else {
      console.log(data)
      return toast.error(status)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="task_name">Task Name</Label>
          <Input
            id="task_name"
            value={formData.task_name}
            onChange={(e) =>
              setFormData({ ...formData, task_name: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.due_date}
            onChange={(e) =>
              setFormData({ ...formData, due_date: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Assigned To</Label>
          <Input
            id="assignedToEmail"
            type="text"
            value={formData.assignedToEmail}
            onChange={(e) =>
              setFormData({ ...formData, assignedToEmail: e.target.value })
            }
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Update Task</Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
