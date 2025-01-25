// components/MembersDisplay.tsx
"use client"
import React, { useEffect, useState } from "react";
import { getMembersAndProfiles } from "@/actions/members";

// Inline Member interface definition
interface Member {
  role: string;
  user_profiles: {
    username: string;
    email: string;
  };
}

const MembersDisplay = ({ projectId }: { projectId: string }) => {
  const [members, setMembers] = useState<Member[]>([]); // Ensure the state type matches the Member interface
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await getMembersAndProfiles(projectId);
        setMembers(membersData);
      } catch (err) {
        setError("Error fetching members");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [projectId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-[30%]">
      <h1>Project Members for {projectId}</h1>
      <div>
        {members.length > 0 ? (
          members.map((member, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Role:</strong> {member.role}
              </p>
              <p>
                <strong>Username:</strong> {member.user_profiles.username}
              </p>
              <p>
                <strong>Email:</strong> {member.user_profiles.email}
              </p>
            </div>
          ))
        ) : (
          <p>No members found for this project.</p>
        )}
      </div>
    </div>
  );
};

export default MembersDisplay;
