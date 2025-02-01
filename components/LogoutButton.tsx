"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { useState } from "react";
import { Loader } from "lucide-react";
import useAuthUserStore from "../store/authUserStore"

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser , authUser } = useAuthUserStore();
  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
    setAuthUser(null);
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? <Loader className="animate-spin" /> : "Logout"}
    </Button>
  );
};

export default LogoutButton;
