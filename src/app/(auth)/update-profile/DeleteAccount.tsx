"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/better-auth/auth-client";
import { Loader2, Trash } from "lucide-react";
import { TypographyH3 } from "@/components/ui/typography";

export default function DeleteAccount() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    setIsDeleting(true);
    try {
      await authClient.deleteUser({ callbackURL: "/goodbye" });
      toast({ title: "Check your email to confirm account deletion." });
    } catch (error) {
      toast({ title: "Error!", description: (error as Error).message });
    }
    setIsDeleting(false);
  }

  return (
    <div className="space-y-6">
      <TypographyH3>Delete Account</TypographyH3>
      <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? <Loader2 className="animate-spin" /> : <Trash />} Delete Account
      </Button>
    </div>
  );
}
