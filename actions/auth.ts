//Server actions regarding authentication
"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  // Signup user to supabase
  const { error, data } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        username: formData.get("username") as string,
      },
    },
  });

  if (error) {
    return { status: error?.message, user: null };
  }

  if (data?.user) {
    // Check if the email is already registered
    if (!data.user.identities || data.user.identities.length === 0) {
      return { status: "Email already registered", user: null };
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        email: data.user.email,
        username: data.user.user_metadata.username,
      });

    if (profileError) {
      return { status: profileError.message, user: null };
    }

    // Revalidate the path (for page refresh)
    revalidatePath("/", "layout");

    return {
      status: "Success",
      data: data.user,
      session: data.session,
    };
  }

  return { status: "Something went wrong", user: null };
}
export async function login(formData: FormData) {
  const supabase = await createClient();

  // First authenticate the user
  const { error, data } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { status: error?.message, user: null };
  }

  if (!data?.user) {
    return { status: "Authentication failed", user: null };
  }

  // Check if user profile exists in user_profiles table
  const { data: profileUser, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", data.user.email)
    .single();

  console.log("Profile from user_profiles table:", profileUser);

  // If profile doesn't exist in user_profiles, create one
  if (!profileUser) {
    console.log("Creating new profile for user");
    const { error: insertError, data: newProfile } = await supabase
      .from("user_profiles")
      .insert({
        id: data.user.id,
        email: data.user.email,
        username: data.user.user_metadata.username,
      })
      .select()
      .single();

    if (insertError) {
      console.log("Error creating profile:", insertError);
      return { status: insertError?.message, user: null };
    }

    revalidatePath("/", "layout");
    return { status: "Success", user: newProfile };
  }

  // Return the user profile from user_profiles table, not the auth user
  revalidatePath("/", "layout");
  return { status: "Success", user: profileUser };
}
export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
  revalidatePath("/", "layout");
  redirect("/auth/login");
}
