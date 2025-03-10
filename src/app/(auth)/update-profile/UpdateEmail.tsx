"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/better-auth/auth-types";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/better-auth/auth-client";

const schema = z.object({
  newEmail: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export default function UpdateEmail({ session }: { session: Session }) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { newEmail: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await authClient.changeEmail(values);
      toast({ title: "Email Updated!" });
    } catch (error) {
      toast({ title: "Error!", description: (error as Error).message });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Input placeholder="Enter New Email" {...form.register("newEmail")} />
      <Button type="submit">Change</Button>
    </form>
  );
}
