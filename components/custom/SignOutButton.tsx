"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();

  return (
    <Button
      variant={"destructive"}
      className="bg-red-600!"
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success("Signed out successfully");
              router.push("/");
              router.refresh();
            },
            onError: (error) => {
              toast.error(error.error.message);
            },
          },
        })
      }
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
