"use server";

import { supabase } from "@/utils/supabase/server";

export async function handleResetPassword(formData: FormData) {
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    throw new Error(error.message);
  }
}
