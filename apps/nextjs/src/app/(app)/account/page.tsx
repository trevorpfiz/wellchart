import { createClient } from "~/utils/supabase/server";
import UserSettings from "./user-settings";

export default async function Account() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user.id) {
    throw new Error("User not found");
  }

  return (
    <main>
      <h1 className="my-4 text-2xl font-semibold">Account</h1>
      <div className="space-y-4">
        <UserSettings user={data.user} />
      </div>
    </main>
  );
}
