"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const supabase = createClient();

export async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error(error.message);
  }

  redirect("/dashboard");
}
