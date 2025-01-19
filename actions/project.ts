"use server";
import { createClient } from "@/utils/supabase/server";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
//   console.log("formData : ", formData);

  // Verify user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized - Please log in");
  }
  console.log("user : ", user);
  console.log("user.email : ", user.email);
  const id = await supabase
    .from("user_profiles")
    .select("id")
      .eq("email", user.email)
    .single();
//   console.log("id : ", id.data?.id);
//   console.log("id.data : ", id.data);

  // Insert the project, using session.user.id as the owner_id
  const { error, data } = await supabase.from("projects").insert({
    name: formData.get("name") as string,
    owner_id: id.data?.id, // Use the UID from the session
    description: formData.get("description") as string,
    start_date: formData.get("startDate") as string,
    end_date: formData.get("endDate") as string,
    status: formData.get("status") as string,
  });

  if (error) {
    console.log("Error creating project:", error);  
    return { status: error?.message, project: null };
  } else {
    return { status: "Success", project: data };
  }
}
