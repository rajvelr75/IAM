"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/better-auth/auth-types";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/better-auth/auth-client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const schema = z.object({
  currentPassword: z.string().min(8, "Must be at least 8 characters").max(16, "Must be at most 16 characters"),
  newPassword: z.string().min(8, "Must be at least 8 characters").max(16, "Must be at most 16 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function UpdatePassword({ session }: { session: Session }) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await authClient.changePassword(values);
      toast({ title: "Password Updated!" });
    } catch (error) {
      toast({ title: "Error!", description: (error as Error).message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="currentPassword" render={({ field }) => (
          <FormItem>
            <FormLabel>Current Password</FormLabel>
            <FormControl><Input type="password" placeholder="Enter Current Password" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="newPassword" render={({ field }) => (
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl><Input type="password" placeholder="Enter New Password" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : "Change Password"}
        </Button>
      </form>
    </Form>
  );
}
