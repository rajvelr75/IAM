"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { z } from "zod";
import React, { useState } from 'react'
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { Session } from "@/lib/better-auth/auth-types";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/better-auth/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const UserActions = ({session, provider,}: {session: Session;provider: string;}) => {
  return (
<Card>
      {provider === "credential" ? (
        <>
          <CardHeader>
            <CardTitle className="card-title">User Action</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <UpdateUser session={session} />
            <UpdateEmailForm session={session} />
            <UpdatePassForm session={session} />
            <Enable2Fa session={session} />
            <DeleteUser />
          </CardContent>
        </>
      ) : (
        <TypographyP className="m-6">User action is in OAuth</TypographyP>
      )}
    </Card>
  )
}

export default UserActions

const updateInfoFormSchema = z.object({
    image: z.string().url(),
    name: z
      .string()
      .min(2, "Name must have at least 2 characters")
      .max(20, "Name must have at most 20 characters"),
  });
  
  type UpdateInfoForm = z.infer<typeof updateInfoFormSchema>;
  
  function UpdateUser({ session }: { session: Session }) {
    const { toast } = useToast();
  
    const { user } = session;
    const form = useForm<UpdateInfoForm>({
      resolver: zodResolver(updateInfoFormSchema),
      defaultValues: {
        image: user?.image || "",
        name: user?.name || "",
      },
    });
  
    const {
      formState: { isSubmitting },
    } = form;
  
    async function onSubmit(values: UpdateInfoForm) {
      const { image, name } = values;
      await authClient.updateUser(
        {
          image,
          name,
        },
        {
          onSuccess: () => {
            toast({
              title: "Updated!",
            });
          },
          onError: (cxt) => {
            toast({
              title: "Error!",
              description: cxt.error.message,
            });
          },
        }
      );
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Url</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isSubmitting ? (
            <Button type="submit">Save</Button>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </form>
      </Form>
    );
  }

  const emailChangeFormSchema = z.object({
    newEmail: z.string().email(),
    callbackURL: z.string().default("/dashboard"),
  });
  
  type EmailUpdateForm = z.infer<typeof emailChangeFormSchema>;
  
  function UpdateEmailForm({ session }: { session: Session }) {
    const { toast } = useToast();
  
    const { user } = session;
    const form = useForm<EmailUpdateForm>({
      resolver: zodResolver(emailChangeFormSchema),
      defaultValues: {
        newEmail: "",
        callbackURL: "/dashboard",
      },
    });
  
    const {
      formState: { isSubmitting },
    } = form;
  
    async function onSubmit(values: EmailUpdateForm) {
      await authClient.changeEmail(values, {
        onSuccess: () => {
          toast({
            title: "Updated!",
          });
        },
        onError: (cxt) => {
          toast({
            title: "Error!",
            description: cxt.error.message,
          });
        },
      });
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter New Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isSubmitting ? (
            <Button type="submit">Change</Button>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </form>
      </Form>
    );
  }

  const passChangeFormSchema = z.object({
    newPassword: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(16, "Password must have at most 16 characters"),
    currentPassword: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(16, "Password must have at most 16 characters"),
    revokeOtherSessions: z.boolean().default(true),
  });
  
  type PassUpdateForm = z.infer<typeof passChangeFormSchema>;
  
  function UpdatePassForm({ session }: { session: Session }) {
    const { toast } = useToast();
  
    const { user } = session;
    const form = useForm<PassUpdateForm>({
      resolver: zodResolver(passChangeFormSchema),
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        revokeOtherSessions: true,
      },
    });
  
    const {
      formState: { isSubmitting },
    } = form;
  
    async function onSubmit(values: PassUpdateForm) {
      await authClient.changePassword(values, {
        onSuccess: () => {
          toast({
            title: "Updated!",
          });
        },
        onError: (cxt) => {
          toast({
            title: "Error!",
            description: cxt.error.message,
          });
        },
      });
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Current Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter new Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isSubmitting ? (
            <Button type="submit">Change</Button>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </form>
      </Form>
    );
  }

  function DeleteUser() {
    const [isDeleting, setIsDeleting] = useState(false);
    const { toast } = useToast();
    return (
      <div className="space-y-8">
        <TypographyH3>Delete Account</TypographyH3>
        <Button
          variant="destructive"
          onClick={async () => {
            await authClient.deleteUser(
              {
                callbackURL: "/goodbye",
              },
              {
                onRequest: () => {
                  setIsDeleting(true);
                },
                onResponse: () => {
                  setIsDeleting(false);
                },
                onSuccess: () => {
                  toast({
                    title: "Check your email!",
                  });
                },
                onError: (cxt) => {
                  toast({
                    title: "Error!",
                    description: cxt.error.message,
                  });
                },
              }
            );
          }}
        >
          {!isDeleting ? <Trash /> : <Loader2 className="animate-spin" />} Delete
          account
        </Button>
      </div>
    );
  }

  const twoFaSchema = z.object({
    state: z.boolean(),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(16, "Password must have at most 16 characters"),
  });
  
  type TwoFaForm = z.infer<typeof twoFaSchema>;
  
  function Enable2Fa({ session }: { session: Session }) {
    const { toast } = useToast();
    const form = useForm<TwoFaForm>({
      resolver: zodResolver(twoFaSchema),
      defaultValues: {
        state: session?.user?.twoFactorEnabled || false,
        password: "",
      },
    });
  
    const {
      formState: { isSubmitting },
    } = form;
  
    async function onSubmit(values: TwoFaForm) {
      const { password, state } = values;
  
      if (state) {
        console.log("enable");
  
        await authClient.twoFactor.enable(
          {
            password,
          },
          {
            onSuccess: () => {
              toast({
                title: "Enabled",
              });
            },
            onError: (cxt) => {
              toast({
                title: "Error!",
                description: cxt.error.message,
              });
            },
          }
        );
      }
  
      if (!state) {
        await authClient.twoFactor.disable(
          {
            password,
          },
          {
            onSuccess: () => {
              toast({
                title: "Disabled!",
              });
            },
            onError: (cxt) => {
              toast({
                title: "Error!",
                description: cxt.error.message,
              });
            },
          }
        );
      }
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Enable 2FA</FormLabel>
                  <FormDescription>
                    Enhance your account security by enabling Two-Factor
                    Authentication.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="FErt$%$#%^BHN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isSubmitting ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </form>
      </Form>
    );
  }