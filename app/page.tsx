"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function Home() {
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      console.log(user);
    });
  }, [supabase]);

  return <div>Our Future Landing Page - Accessible to all users</div>;
}
