import { SignOutButton } from "~/components/auth/sign-out-button";
import { createClient } from "~/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <main className="">
      <h1 className="my-2 text-2xl font-bold">Profile</h1>
      <pre className="my-2 rounded-lg bg-secondary p-4">
        {JSON.stringify(data.user, null, 2)}
      </pre>
      <SignOutButton />
    </main>
  );
}
