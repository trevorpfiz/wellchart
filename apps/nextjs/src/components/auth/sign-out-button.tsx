import { Button } from "@wellchart/ui/button";

import { signOut } from "~/lib/actions/auth";

export const SignOutButton = () => {
  return (
    <form>
      <Button size="lg" formAction={signOut}>
        Sign out
      </Button>
    </form>
  );
};
