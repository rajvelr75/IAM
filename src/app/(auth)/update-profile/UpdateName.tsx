"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Session } from "@/lib/better-auth/auth-types";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/better-auth/auth-client";

const schema = z.object({
  name: z.string().min(2, "At least 2 characters").max(20, "At most 20 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function UpdateName({ session }: { session: Session }) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: session.user?.name || "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await authClient.updateUser(values);
      toast({ title: "Name Updated!" });
    } catch (error) {
      toast({ title: "Error!", description: (error as Error).message });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input placeholder="Enter Name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
