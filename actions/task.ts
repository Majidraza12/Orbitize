"use server"
import { createClient } from "@/utils/supabase/server";


export async function createTask(formData: FormData) {
  const supabase = await createClient()
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