import React from "react";
import { Button } from "@/components/ui/button";

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
    <div className="w-1/3 flex flex-col bg-white border rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Profile Settings</h2>
      <div className="space-y-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={selectedAction === action.id ? "default" : "outline"}
            className="w-full transition hover:bg-gray-100"
            onClick={() => setSelectedAction(action.id)}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
