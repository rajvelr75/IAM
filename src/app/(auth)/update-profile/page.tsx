"use client";

import { useState } from "react";
import { TypographyP } from "@/components/ui/typography";
import ProfileSidebar from "./ProfileSidebar";
import UpdateName from "./UpdateName";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import Enable2FA from "./Enable2FA";
import DeleteAccount from "./DeleteAccount";
import { useSession } from "@/lib/better-auth/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession(); 
  const [selectedAction, setSelectedAction] = useState("update-name");

  if (!session) {
    return <TypographyP className="text-center min-h-screen flex items-center justify-center">Loading...</TypographyP>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Back to Dashboard Button */}
      <div className="w-full relative">
        <Link href="/dashboard">
          <Button variant="ghost" className="absolute top-0 left-0 flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex w-full max-w-4xl gap-8 mt-10">
        {/* Left Sidebar */}
        <ProfileSidebar selectedAction={selectedAction} setSelectedAction={setSelectedAction} />

        {/* Right Content Area */}
        <div className="flex-1 p-6 border rounded-lg shadow-lg bg-white">
          {selectedAction === "update-name" && <UpdateName session={session} />}
          {selectedAction === "update-email" && <UpdateEmail session={session} />}
          {selectedAction === "update-password" && <UpdatePassword session={session} />}
          {selectedAction === "enable-2fa" && <Enable2FA session={session} />}
          {selectedAction === "delete-account" && <DeleteAccount />}
        </div>
      </div>
    </div>
  );
}
