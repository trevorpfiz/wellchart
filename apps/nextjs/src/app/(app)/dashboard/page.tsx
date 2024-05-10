import { FileUpload } from "~/components/upload/file-upload";
import { createClient } from "~/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  const token = data?.session?.access_token ?? "";

  return (
    <main className="">
      <div className="flex flex-col gap-8">
        <h1 className="my-2 text-2xl font-bold">Upload a patient's chart</h1>
        <FileUpload token={token} />
      </div>
    </main>
  );
}
