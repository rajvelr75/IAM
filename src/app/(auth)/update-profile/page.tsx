"use client";

import { useState, useEffect } from "react";
import { TypographyP } from "@/components/ui/typography";
import ProfileSidebar from "./ProfileSidebar";
import UpdateName from "./UpdateName";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import Enable2FA from "./Enable2FA";
import DeleteAccount from "./DeleteAccount";
import { useSession } from "@/lib/better-auth/auth-client";

export default function ProfilePage() {
  const { data: session} = useSession(); 
  const [selectedAction, setSelectedAction] = useState("update-name");

  if (status === "loading") {
    return <TypographyP className="text-center">Loading...</TypographyP>;
  }

  if (!session) {
    return <TypographyP className="text-center">You are not logged in.</TypographyP>;
  }

  return (
    <div className="flex max-w-4xl mx-auto p-6 gap-8">
      {/* Left Sidebar */}
      <ProfileSidebar selectedAction={selectedAction} setSelectedAction={setSelectedAction} />

      {/* Right Content Area */}
      <div className="flex-1 p-6 border rounded-md shadow-md bg-white">
        {selectedAction === "update-name" && <UpdateName session={session} />}
        {selectedAction === "update-email" && <UpdateEmail session={session} />}
        {selectedAction === "update-password" && <UpdatePassword session={session} />}
        {selectedAction === "enable-2fa" && <Enable2FA session={session} />}
        {selectedAction === "delete-account" && <DeleteAccount />}
      </div>
    </div>
  );
}
