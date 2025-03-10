import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const actions = [
  { id: "update-name", label: "Update Name" },
  { id: "update-email", label: "Update Email" },
  { id: "update-password", label: "Update Password" },
  { id: "enable-2fa", label: "Enable 2FA" },
  { id: "delete-account", label: "Delete Account" },
];

export default function ProfileSidebar({
  selectedAction,
  setSelectedAction,
}: {
  selectedAction: string;
  setSelectedAction: (action: string) => void;
}) {
  return (
    <div className="w-1/3 h-full flex flex-col justify-center p-4 border rounded-md shadow-md bg-white">
      {/* Back to Dashboard Button */}
      <Link href="/dashboard">
        <ArrowLeft size={24} />
        <span className="text-lg font-medium">Back</span>
      </Link>

      <h2 className="text-lg font-semibold mb-4 text-center">Profile Settings</h2>

      <div className="space-y-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={selectedAction === action.id ? "default" : "outline"}
            className="w-full"
            onClick={() => setSelectedAction(action.id)}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
