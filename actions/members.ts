"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";

export async function addMember(projectId: string, memberEmail: string) {
  const supabase = await createClient();

  // Step 1: Fetch the member details from the user_profiles table
  const { data: member, error: fetchError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", memberEmail)
    .single();

  if (fetchError) {
    console.error("Error fetching member:", fetchError);
    return { member: null, error: fetchError.message };
  }

  if (!member) {
    console.error("No member found with the given email.");
    return { member: null, error: "No member found with the given email." };
  }

  console.log("Member found:", member);

  // Step 2: Check if the member is already part of the project
  const { data: existingMember, error: selectError } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", member.id)
    .eq("project_id", projectId)
    .limit(1)

  if (selectError) {
    console.log("Error checking if member exists:", selectError);
    return { member: null, error: selectError.message };
  }
  console.log("Existing member:", existingMember);
  if (existingMember.length > 0) {
    return { member: null, error: "Member already Exists in the project" };
  }

  // Step 3: Create a new member object with a default role
  const newMember = {
    project_id: projectId,
    user_id: member.id, // Assuming `id` is the primary key in `user_profiles`
    role: "member", // Default role
  };
  console.log("New member object:", newMember);

  // Step 4: Insert the new member into the members table
  const { data: addedMember, error: insertError } = await supabase
    .from("members")
    .insert(newMember);

  if (insertError) {
    console.log("Error adding member to the project:", insertError);
    return { member: null, error: insertError.message };
  }

  console.log("New member added:", addedMember);
  revalidatePath(`/dashboard/${projectId}`,"layout")  
  return { member: addedMember, error: null };
}
export async function getMembers(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("project_id", projectId);
  if (error) {
    console.error("Error fetching members:", error);
    return { members: [], error: error.message };
  }
  return { members: data, error: null };
}
export async function getMembersAndProfiles(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("members")
    .select("role, user_profiles(username,email)")
    .eq("project_id", projectId);

  if (error) {
    console.error("Error fetching members and profiles:", error);
    return []; // Return an empty array in case of an error
  }
  return data || [];
}