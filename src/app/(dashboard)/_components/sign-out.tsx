"use client";

import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/better-auth/auth-client";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SignOut = () => {
  const { push } = useRouter();
  const { toast } = useToast();

  return (
    <DropdownMenuItem
      className="flex items-center justify-between gap-3 cursor-pointer px-4 py-2
                 bg-[#0a0f1d]/80 text-white
                 transition-all rounded-lg shadow-md"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast({
                title: "Sign out success!",
              });
              push("/sign-in");
            },
            onError: (ctx) => {
              toast({
                title: "Error!",
                description: ctx.error.message,
              });
            },
          },
        });
      }}
    >
      <span className="font-semibold">Sign Out</span>
      <LogOut className="w-5 h-5 text-white transition-transform hover:scale-110" />
    </DropdownMenuItem>
  );
};

export default SignOut;
