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
  const { data: addedProject, error: addedProjectError } = await supabase.from("projects").select("*").eq("name", formData.get("name") as string);
  if (addedProjectError) {
    console.log("Error adding project:", addedProjectError);
  }
  console.log("addedProject : ", addedProject);
  //Once we have created the project , we have to add the owner into members table
  const newMmeber = {
    project_id: addedProject[0]?.id,
    user_id: id.data?.id,
    role: "owner",
  }
  const { data: addedMember, error: insertError } = await supabase.from("members").insert(newMmeber);
  if (insertError) {
    console.error("Error adding member to the project:", insertError);
    return { member: null, error: insertError.message };
  }
  console.log("New member added:", addedMember);
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
  console.log("User ID:", user.email);

  const { data: userProfile, error: userProfileError } = await supabase.from("user_profiles").select("*").eq("email", user.email).single();
  console.log("User Profile:", userProfile);  

  //Get the project Ids from the members table
  const { data: projectIds, error } = await supabase
    .from("members")
    .select("project_id")
    .eq("user_id", userProfile.id) // Get projects where the user is a member

  console.log("Project IDs:", projectIds);

  // Get the project details for each project ID
  const projectIdsArray = projectIds?.map((project) => project.project_id);
  console.log("Project IDs Array:", projectIdsArray);

  const {data : projects, error: projectError} = await supabase.from("projects").select("*").in("id", projectIdsArray);
  
  

  // Log the results of the query
  // console.log("Projects fetched:", projects);

  if (projects?.length === 0) {
    console.log("No projects found");
    return { projects: null };
  }

  if (projectError) {
    console.log("Error fetching projects:", projectError);
    return { projects: null, projectError: projectError?.message };
  }

  return { projects, error: null };
}
//To get details for a specific project
export async function getProject(projectId: string) {
  const supabase = await createClient();
  const { data: project, error } = await supabase.from("projects").select("*").eq("id", projectId).single();
  return { project, error };
}
//To get members for a specific project
// export async function getMembers(projectId: string) {
//   const supabase = await createClient();
//   const { data: members, error } = await supabase.from("members").select("*").eq("project_id", projectId);
//   return { members, error };
// }
//Update project details
export async function updateProject(projectId: string, formData: FormData) {
  const supabase = await createClient();

  // Debugging: log formData values to check if they are being passed correctly
  // console.log("FormData values:");
  // console.log("Name:", formData.name);
  // console.log("Description:", formData.description);
  // console.log("Start Date:", formData.startDate);
  // console.log("End Date:", formData.endDate);
  // console.log("Status:", formData.status);
  // console.log("Project ID:", projectId);  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  const userId = user?.id
  const { data: { owner_id }, error: projectError } = await supabase.from("projects").select("owner_id").eq("id", projectId)
  if (userId !== owner_id) {
    return {status : "Only Owner Can update Project Details" }
  }


  // Ensure all necessary form data exists
  const name = formData.name as string;
  const description = formData.description as string;
  const startDate = formData.startDate as string;
  const endDate = formData.endDate as string;
  const status = formData.status as string;
  console.log("Date being sent Confirmation");
  console.log("Name : ", name);
  console.log(description);
  console.log(startDate);
  console.log(endDate);
  console.log(status)
  if (!name || !description || !startDate || !endDate || !status) {
    return { status: "Error: Missing required fields", project: null };
  }

  const { data, error } = await supabase
    .from("projects")
    .update({
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
    })
    .eq("id", projectId);

  if (error) {
    console.error("Supabase Error:", error.message); // Log the error for debugging
    return { status: error.message, project: null };
  }

  return { status: "Success" };
}

// export async function deleteTask(task) {
//   const supabase = await createClient()
//   const { data: { user }, error: userError } = await supabase.auth.getUser()
//   if (userError) {
//     console.log("Error fetching user : ", userError)
//     return { status : "Error fetching user",data:null}
//   }

// }
