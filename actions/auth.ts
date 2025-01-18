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
  console.log(formData);
  const supabase = await createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (error) {
    return { status: error?.message, user: null };
  } else if (data?.user) {
    return { status: "Success", user: data?.user };
  }
  //Todo : create user Interface in user_profile table -> what we here are doing the we are creating a user in the user_profile table when the user login for the first time , therefore first we need to check if the user is already in the user_profile table , if not then we need to create a user in the user_profile table
  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", data?.user.email)
    .limit(1)
    .single();
  //select only one row from the user_profile stable
  if (!existingUser) {
    const { error: insertError, data: user } = await supabase
      .from("user_profiles")
      .insert({
        email: data?.user.email,
        username: data?.user?.user_metadata?.username,
      });
    if (insertError) {
      return { status: insertError?.message, user: null };
    }
    console.log(user);
    return { status: "Success", user: user };
  }

  // Revalidate the path (for page refresh)
  revalidatePath("/", "layout");
  return { status: "success", user: data?.user };
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
