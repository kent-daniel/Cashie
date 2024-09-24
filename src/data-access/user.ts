import { User } from "@/models/user";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function findUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    return null;
  }

  return data as User;
}

export async function findUserById(id: string): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data as User;
}
