import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";

const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-2 border-b-2 border-slate-800 flex items-center justify-around min-h-[20%]">
      <div className="flex gap-2">
        <Link href="/">
          <p className="text-3xl ml-1 p-1 font-semibold">TaskSphere</p>
        </Link>
      </div>
      {user ? (
        <div className="flex gap-2">
          <LogoutButton />
          <ProfileButton/>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="secondary">
              Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
