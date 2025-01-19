"use client";
import { Button } from "@/components/ui/button";    
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateProjectButton = () => {
  const router = useRouter();
  const handleCreateProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/dashboard/create-project");
  };
  return (
    <Button size="sm" className="mt-4" onClick={(e) => {handleCreateProject(e)}}>
      Create Project
      <PlusIcon className="w-3 h-3 ml-2" />
    </Button>
  );
};

export default CreateProjectButton