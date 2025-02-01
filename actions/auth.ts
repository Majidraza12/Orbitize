
//Server actions regarding authentication
"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useAuthUserStore } from "@/store/authUserStore";

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
  } else if (data?.user) {
    //Check if the user has identities (external logins)
    if (data.user.identities?.length === 0) {
      return { status: "Email already registered", user: null };
    }
    //revalidate path for page refresh
    revalidatePath("/", "layout");
    return {
      status: "Success",
      data: data?.user,
      session: data?.session,
    };
  }
  return { status: "Something went wrong", user: null };
}
export async function login(formData: FormData) {
  const supabase = await createClient();

  // Authenticate the user
  const { error: authError, data: authData } =
    await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

  if (authError) {
    return { status: authError.message, user: null };
  }

  // Check if the user exists in the user_profiles table
  const { data: existingUser, error: selectError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", formData.get("email") as string)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    // Handle any unexpected errors except "no rows found" (PostgREST code: PGRST116)
    return { status: selectError.message, user: null };
  }

  if (!existingUser) {
    // If the user doesn't exist, insert them into the user_profiles table
    const { error: insertError, data: insertedUser } = await supabase
      .from("user_profiles")
      .insert({
        email: authData.user?.email,
        username: authData.user?.user_metadata?.username || null,
      })
      .single();

    if (insertError) {
      return { status: insertError.message, user: null };
    }
    return { status: "Success", user: insertedUser };
  }

  // Optionally revalidate paths (make sure this function is properly defined in your context)
  revalidatePath("/", "layout");

  return { status: "Success", user: authData.user };
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

export async function getUserData(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { user: null, error: error.message };
  }
  return { user: data, error: null };
}
