import { SignOutButton } from "~/components/auth/sign-out-button";
import { api } from "~/trpc/server";
import { createClient } from "~/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  const test = await api.report.test({
    token: data?.session?.access_token ?? "",
  });

  console.log(test);

  return (
    <main className="">
      <h1 className="my-2 text-2xl font-bold">Profile</h1>
      <p>{test?.message}</p>
      <SignOutButton />
    </main>
  );
}
