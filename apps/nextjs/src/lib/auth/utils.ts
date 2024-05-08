import { redirect } from "next/navigation";

import { createClient } from "~/utils/supabase/client";
import { createClient as createClientServer } from "~/utils/supabase/server";

export async function getUserServer() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
    redirect("/signin");
  }

  return data.user;
}

export const checkAuthServer = async () => {
  const supabase = createClientServer();
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
    redirect("/signin");
  }
};
