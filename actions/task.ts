"use server"
import { createClient } from "@/utils/supabase/server";
import { stat } from "fs";


export async function createTask(formData: FormData) {
  //Only the project owner can create Task

  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  // console.log(user)
  const userId = user?.id;

  const { data: projectData, error: projectsError } = await supabase
    .from("projects")
    .select("owner_id")
    .eq("id", formData.get("project_id") as string);
  // console.log(projectData[0].owner_id)
  if (userId !== projectData[0].owner_id) {
    return {status : "Only Owner can create Tasks" , task : null}
  }


  const { data: userIds, error } = await supabase.from("members").select("user_id").eq("project_id", formData.get("project_id") as string)
  if (error) {
    console.log("Error fetching members:", error);
  }
  const arr = userIds?.map((item) => item.user_id);
  console.log("Id arr : ", arr)
  console.log("Id arr : ", arr[0] as string)
  const userProfiles = await supabase.from("user_profiles").select("*").in("id", arr)
  //Create a Array containing all emails of the members
  const emails = userProfiles.data?.map((item) => item.email)
  console.log("Emails : ", emails)
  console.log("validEmails : ", userProfiles)
  console.log("Email Passed", formData.get("assignedTo"))
  if (!emails?.includes(formData.get("assignedTo") as string)) {
    return {
      status: "The assignee is not a member of this project.",
      task: null,
    };
  }
  //Sperate the user
  const assignee = {
    id: userProfiles.data?.find((item) => item.email === formData.get("assignedTo"))?.id,
    email: formData.get("assignedTo") as string,
    username : userProfiles.data?.find((item) => item.email === formData.get("assignedTo"))?.username
  }
  console.log("Assignee : ", assignee)
  //If the Email is valid create the task
  const { error: memberError, data } = await supabase.from("members").select("id").eq("user_id", assignee.id).eq("project_id", formData.get("project_id") as string).single()
  console.log(formData)
  const { data : task , error : insertError } = await supabase.from("tasks").insert({
    task_name: formData.get("task_name") as string,
    description: formData.get("description") as string,
    projectId: formData.get("project_id") as string,
    status: formData.get("status") as string,
    priority: formData.get("priority") as string,
    due_date: formData.get("dueDate") as string,
    category: formData.get("category") as string,
    assignedToId: data?.id,
    assignedToEmail: assignee.email,
    assignedToName: assignee.username
  });
  if(insertError){
    console.log("Error adding task:", insertError);
    return { status: "Something went wrong", task: null };
  }
  return { status: "Success", task: task };
}
export async function getTasks(projectId: string) {
  const supabase = await createClient()
  const { data: Tasks, error } = await supabase.from("tasks").select("*").eq("projectId", projectId)
  if (error) {
    return {data : null , status : error}
  }
  return { data: Tasks, status : "Success"}
}
export async function updateTask(formData) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log(user);
  if (userError) {
    console.log("Error fetching user:", userError);
    return { status: "Error fetching user", data: null };
  }
  const userId = user?.id;
  console.log("Current User ID:", userId);
  const { data, error: projectError } = await supabase
    .from("projects")
    .select("owner_id")
    .eq("id", formData.projectId);
  console.log(data);
  if (projectError) {
    return { status: "Project not found", data: projectError };
  }
  if (user?.id !== data[0].owner_id) {
    return { status: "Only Admins can update the Project", data: null };
  }
  //Check if the assigned member is part of the project or no
  // console.log("AssignedTO email " , formData.assignedToEmail)
const { data: member, error: memberError } = await supabase
  .from("members")
  .select("id, user_profiles!inner(email, username)") // Select specific fields and force INNER JOIN
  .eq("project_id", formData.projectId)
  .eq("user_profiles.email", formData.assignedToEmail); // Correct filtering
  console.log(member);
  if (memberError) {
    return { status: "Server Error", data: memberError };
  }
  if (member.length === 0) {
    return { status: "Assignee is not a member of the Project", data: null };
  }
  //If all check are good , then we can update the table
  const { data: updatedTask, error: updateTaskError } = await supabase
    .from("tasks")
    .update({
      task_name: formData.task_name,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      category: formData.category,
      due_date: formData.due_date,
      projectId: formData.projectId,
      assignedToId: member[0]?.id,
      assignedToEmail: member[0]?.user_profiles?.email,
      assignedToName: member[0]?.user_profiles?.username,
    })
    .eq("id", formData.task_id);
  if (updateTaskError) {
    return { status: "Update Task failed", data: updateTaskError };
  }
  return { status: "Task updated Successfully", data: updatedTask };
}
export async function deleteTask(task) {
  const supabase = await createClient();

  // Fetch the authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.log("Error fetching user:", userError);
    return { status: "Error fetching user", data: null };
  }

  const userId = userData.user.id;
  console.log("User ID:", userId);

  // Fetch project owner
  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select("owner_id")
    .eq("id", task.projectId)
    .single(); // Ensure a single object is returned

  if (projectError || !projectData) {
    return {
      status: "Project not found or error fetching project",
      data: projectError,
    };
  }

  if (userId !== projectData.owner_id) {
    return { status: "Only Admins can update the Project", data: null };
  }

  // If all good, delete the task
  const { error: TaskError } = await supabase
    .from("tasks")
    .delete()
    .eq("id", task.id);

  if (TaskError) {
    return { status: "Task deletion failed", data: TaskError.message };
  }

  return { status: "Success" };
}
