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
  //Make sure that the project name is unique
  console.log("formData.get('name') : ", formData.get("name"));
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("name", formData.get("name") as string)
    .single();

  if (projectError) {
    console.log("Error fetching project:", projectError);
  }

  console.log("project : ", project);
  if (project) {
    console.log("Project already exists:", project);
    return { status: "Project already exists", project: null };
  }
  // Insert the project, using session.user.id as the owner_id
  // console.log("id.data?.id : ", id.data?.id);
  const { error, data } = await supabase.from("projects").insert({
    name: formData.get("name") as string,
    owner_id: id.data?.id, // Use the UID from the session
    description: formData.get("description") as string,
    start_date: formData.get("startDate") as string,
    end_date: formData.get("endDate") as string,
    status: formData.get("status") as string,
  });
  console.log("Owner ID : ", id.data?.id);
  const {data: addedProject, error: addedProjectError} = await supabase.from("projects").select("*").eq("owner_id", id.data?.id);
  if (addedProjectError) {
    console.log("Error adding owner to members table:", addedProjectError);
  }
  console.log("addedProject : ", addedProject);
  if (error) {
    console.log("Error creating project:", error);
    return { status: error?.message, project: null };
  } else {
    return { status: "Success", project: data };
  }
}

export async function getProjects() {
  const supabase = await createClient();
  // Get the current logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized - Please log in");
  }

  // Log the user ID for debugging
  console.log("User ID:", user.id);

  // Get the projects for the current user
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", user.id) // Ensure this matches the owner_id in your database

  // Log the results of the query
  // console.log("Projects fetched:", projects);

  if (projects?.length === 0) {
    console.log("No projects found");
    return { projects: null, error: "No projects found" };
  }

  if (error) {
    console.log("Error fetching projects:", error);
    return { projects: null, error: error?.message };
  }

  return { projects, error };
}
//To get details for a specific project
export async function getProject(projectId: string) {
  const supabase = await createClient();
  const { data: project, error } = await supabase.from("projects").select("*").eq("id", projectId).single();
  return { project, error };
}
//To get members for a specific project
export async function getMembers(projectId: string) {
  const supabase = await createClient();
  const { data: members, error } = await supabase.from("members").select("*").eq("project_id", projectId);
  return { members, error };
}
///To add a member to a project
export async function addMember(projectId: string, userId: string) {
  const supabase = await createClient();
  const { data: member, error } = await supabase.from("members").insert({ project_id: projectId, user_id: userId });
  if (error) {
    console.error("Error adding member to project:", error);
    return {
      member: null,
      error: error ? error.message : "Unknown error occurred",
    };
  } else {
    console.log("Member added successfully:", member);
    return { member, error: null };
  }
}

