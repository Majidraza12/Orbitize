import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Resend} from 'resend'
import { Button } from "./ui/button";
import { Plus, User } from "lucide-react";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { addMember } from "@/actions/members";  
import { useRouter } from "next/navigation";

function AddMemberButton({ projectId }) {
  const [email, setEmail] = useState("");
  const [isClient, setIsClient] = useState(false); // Client-side check
  const router = useRouter();


  // To avoid hydration error, we set a flag to check if the component is running on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddMember = async () => {
    if (email.trim() === "") {
      toast.error("Please enter an email");
      return;
    }
    const { data, error } = await addMember(projectId, email);
    if (error) {
      return toast.error(
        error?.message || "Member Already exists or Account not found"
      );
    }

    toast.success("Member added successfully");
    window.location.reload();
  };

  // Only render the Dialog on the client side
  if (!isClient) return null;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <p className="text-sm">Add Member</p>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Input
              placeholder="Enter email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogDescription>
          <DialogFooter>
            <Button type="submit" onClick={handleAddMember}>
              Add
            </Button>
            {/* <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddMemberButton;
