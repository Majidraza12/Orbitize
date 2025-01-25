import { createClient } from "@/utils/supabase/server";


export async function createTask (formData: FormData) {
  const supabase = await createClient();

  // Verify user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized - Please log in");
  }

  // Insert the task
  const { error, data } = await supabase.from("tasks").insert({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    project_id: formData.get("project_id") as string,
    status: formData.get("status") as string,
    priority: formData.get("priority") as string,
    start_date: formData.get("startDate") as string,
    end_date: formData.get("endDate") as string,
  });

  if (error) {
    console.log("Error adding task:", error);
    return { status: "Something went wrong", task: null };
  }
  return { status: "Success", task: data };
}

export async function updateTask(formData: FormData) { 
    const supabase = await createClient();
    
    // Verify user is logged in
    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) {
        throw new Error("Unauthorized - Please log in");
    }
    
    // Insert the task
    const { error, data } = await supabase.from("tasks").update({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        project_id: formData.get("project_id") as string,
        status: formData.get("status") as string,
        priority: formData.get("priority") as string,
        start_date: formData.get("startDate") as string,
        end_date: formData.get("endDate") as string,
    }).eq('id',formData.get('id') as string);
    
    if (error) {
        console.log("Error adding task:", error);
        return { status: "Something went wrong", task: null };
    }
    return { status: "Success", task: data };
}