"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { addMember } from '@/actions/project';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

const MembersDisplay = ({ projectId }: { projectId: string }) => {
    const [memberEmail, setMemberEmail] = useState('');
    const handleAddMember = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const supabase = await createClient();
        const {data: user, error: userError} = await supabase.from("user_profiles").select("*").eq("email", memberEmail).single();  
        if (userError) {
            toast.error("User not found");
        }
        console.log("User found : ", user);
        console.log("Project ID : ", projectId);
        console.log("User ID : ", user.id);
        const {member, error} = await addMember(projectId, user.id);
        if (error) {
            toast.error("Error adding member");
        }
        console.log("Member added : ", member);
    }
  return (
      <div className='w-[20%] border-l border-gray-200 pl-5'>MembersDisplay
        <div className='flex flex-col items-center gap-2'>   
          <Input type='text' placeholder='Enter member email' value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} />
          <Button className='flex items-center gap-2' onClick={(e) => handleAddMember(e)}><Plus size={16} />Add Member</Button>
        </div>
      </div>
  )
}

export default MembersDisplay