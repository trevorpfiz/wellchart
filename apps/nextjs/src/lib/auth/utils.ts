import { redirect, useRouter } from "next/navigation";

import { createClient } from "~/utils/supabase/client";
import { createClient as createClientServer } from "~/utils/supabase/server";

export async function getUserServer() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  return data.user;
}

export async function getUserClient() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const router = useRouter();

  if (error || !data?.user) {
    router.push("/signin");
  }

  return data.user;
}

export const checkAuthServer = async () => {
  const supabase = createClientServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }
};

export const checkAuthClient = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const router = useRouter();

  if (error || !data?.user) {
    router.push("/signin");
  }
};
