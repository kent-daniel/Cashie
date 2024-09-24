import { User } from "@/models/user";
import { supabase } from "@/utils/supabase/server";

// export async function createUser(
//   email: string,
//   password: string,
//   name: string
// ): Promise<void> {

//   const user = data.user;

//   if (user) {
//     await supabase
//       .from("profiles")
//       .insert([{ id: user.id, email: user.email, name }]);
//   } else {
//     throw new Error("User is null");
//   }
// }s

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
