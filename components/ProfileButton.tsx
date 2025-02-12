"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { createClient } from "@/utils/supabase/client"; // Adjust this according to your setup
import { Loader } from "lucide-react";

function ProfileButton() {
  const router = useRouter(); // Call useRouter hook from next/navigation
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state to show while fetching user

  useEffect(() => {
    // Function to fetch the authenticated user
    async function fetchUser() {
      const supabase = createClient(); // Create Supabase client
      const { data: userData, error } = await supabase.auth.getUser(); // Get authenticated user
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("Authenticated User:", userData.user.identities[0].identity_data.username);
        setUser(userData.user.identities[0].identity_data.username); // Set the user data
      }
      setLoading(false); // Set loading to false once done
    }

    fetchUser(); // Fetch user on mount
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/dashboard/profile"); // Navigate to profile page
  };

  return (
    <div>
      {loading ? (
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:cursor-pointer hover:bg-gray-200 ml-2">
          <p className="text-black"><Loader className="h-4 w-4 animate-spin"/></p>
        </div>
      ) : (
        <div>
          {user ? (
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:cursor-pointer hover:bg-gray-200 ml-2" onClick={(e)=> handleClick(e)}>
              <p className="text-black">{user.slice(0, 2)}</p>
            </div>
          ) : (
            <p>No user logged in</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
