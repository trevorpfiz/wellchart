import type { User } from "@supabase/supabase-js";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@wellchart/ui/avatar";

import { getNameFromUser } from "~/lib/utils";
import { createClient } from "~/utils/supabase/server";
import SidebarItems from "./sidebar-items";

const Sidebar = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user.id) {
    throw new Error("User not found");
  }

  return (
    <aside className="hidden h-screen min-w-52 border-r border-border bg-muted p-4 pt-8 shadow-inner md:block">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4">
          <h3 className="ml-4 text-lg font-semibold">Logo</h3>
          <SidebarItems />
        </div>
        <UserDetails user={data.user} />
      </div>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ user }: { user: User }) => {
  const name = getNameFromUser(user);

  return (
    <Link href="/account">
      <div className="flex w-full items-center justify-between border-t border-border px-2 pt-4">
        <div className="text-muted-foreground">
          <p className="text-xs">{name ?? "User"}</p>
          <p className="pr-4 text-xs font-light">
            {user.email ?? "john@doe.com"}
          </p>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="border-2 border-border text-muted-foreground">
            {name
              ? name
                  ?.split(" ")
                  .map((word) => word[0]?.toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        </Avatar>
      </div>
    </Link>
  );
};
