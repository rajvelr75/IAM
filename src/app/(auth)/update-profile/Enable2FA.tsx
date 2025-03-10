"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/better-auth/auth-types";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/better-auth/auth-client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const schema = z.object({
  state: z.boolean(),
  password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be at most 16 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function Enable2FA({ session }: { session: Session }) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      state: session.user?.twoFactorEnabled || false,
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const { password, state } = values;

    try {
      if (state) {
        await authClient.twoFactor.enable({ password });
        toast({ title: "2FA Enabled!" });
      } else {
        await authClient.twoFactor.disable({ password });
        toast({ title: "2FA Disabled!" });
      }
    } catch (error) {
      toast({ title: "Error!", description: (error as Error).message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="state" render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Enable 2FA</FormLabel>
              <FormDescription>Enhance security by enabling Two-Factor Authentication.</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl><Input type="password" placeholder="Enter Password" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
