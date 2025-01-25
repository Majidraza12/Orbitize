"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { addMember, getMembers } from "@/actions/members";

const MembersDisplay = ({ projectId }: { projectId: string }) => {
  const [members, setMembers] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      const { members, error } = await getMembers(projectId);
      if (error) {
        console.log("Error fetching members:", error);
      } else {
        setMembers(members);
      }
    };

    fetchMembers();
  }, [projectId]);

  const handleAddMember = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(memberEmail);
    const { member, error: userError } = await addMember(
      projectId,
      memberEmail
    );
    console.log("User found : ", member);

    if (userError) {
      console.error("Failed to add member:", userError);
      toast.error(userError);
    } else {
      toast.success("Member successfully added");
      console.log("Member successfully added:", member);
      setMembers((prevMembers) => [...prevMembers, member]); // Add the new member to the list
    }
  };

  return (
    <div className="w-[20%] min-h-[100%] border-l border-gray-200 pl-5">
      <h2>Members</h2>
      <div className="flex flex-col items-center gap-2">
        {/* Add member section */}
        <div>
          <Input
            type="text"
            placeholder="Enter member email"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />
          <Button
            className="flex items-center gap-2"
            onClick={(e) => handleAddMember(e)}
          >
            <Plus size={16} /> Add Member
          </Button>
        </div>

        {/* Display members list */}
        <div className="mt-4 w-full">
          <h3 className="text-lg font-semibold">Current Members:</h3>
          {members.length > 0 ? (
            <ul className="list-disc pl-4">
              {members.map((member) => (
                <li key={member.id} className="text-sm">
                  {member.role} - {member.user_id}
                </li>
              ))}
            </ul>
          ) : (
            <p>No members yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersDisplay;
