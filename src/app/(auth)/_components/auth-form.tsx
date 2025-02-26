"use client"

import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { TypographyP } from "@/components/ui/typography";
import { Dispatch, SetStateAction, useState } from "react";
import { authClient } from "@/lib/better-auth/auth-client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { GoogleButton } from "./oauth-button";

// Define the schema for form validation
const signUpFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be at most 20 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
});

// Infer the type of the form schema
type SignUpForm = z.infer<typeof signUpFormSchema>;

export const SignUpFormComp = () => {

  const {toast} = useToast();
  const {push} = useRouter();
  // Initialize the form
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: SignUpForm) {
    const {email, name, password} = values
    await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL:"/dashboard"
    },{
      onSuccess: async (cxt)=>{
          toast({
            title: "Success",
          });
          push(`verify-email?email=${email}`)
      },
      onError: async (cxt)=>{
        toast({
          title: "Error",
          description:cxt.error.message, 
        })
      }
    });
  }

  return (
<Card className="w-[400px] mx-auto flex flex-col items-center justify-center p-6 shadow-lg rounded-lg">
  <CardHeader className="text-center">
    <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
  </CardHeader>
  <CardContent className="w-full">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center w-full">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Name" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Email" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Password" type="password" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Sign-in Link */}
        <TypographyP className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </TypographyP>
        {/* Submit Button */}
        <div className="w-full flex justify-center">
          {!isSubmitting ? (
            <Button type="submit" className="w-full">Sign Up</Button>
          ) : (
            <Loader2 className="animate-spin mx-auto" />
          )}
        </div>
      </form>
    </Form>
    {/* Google Sign-In Button */}
    <div className="w-full flex justify-center mt-4">
      <GoogleButton />
    </div>
  </CardContent>
</Card>
  );
};

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export const SignInFormComp = () => {
  const {toast} = useToast();
  const {push} = useRouter();
  const [isForgetClick, setIsForgetClick] = useState(false);
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: SignInForm) {
    const {email, password} = values
    await authClient.signIn.email({
      email,
      password,
      callbackURL:"/dashboard"
    },{
      onSuccess: async (cxt)=>{
          toast({
            title: "Success",
          });
          const { data, error } = await authClient.twoFactor.sendOtp();
          push("2fa-verification")
      },
      onError: async (cxt)=>{
        toast({
          title: "Error",
          description:cxt.error.message, 
        })
      }
    });
  }

  return (
    <>
<div className="min-h-screen flex items-center justify-center">
  <Card className="w-[400px] flex flex-col items-center justify-center p-6 shadow-lg rounded-lg bg-white">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
    </CardHeader>
    <CardContent className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col items-center w-full">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Email" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Password" type="password" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
                <div className="flex justify-end w-full">
                  <Button variant="link" type="button" onClick={() => setIsForgetClick(true)}>
                    Forgot Password?
                  </Button>
                </div>
              </FormItem>
            )}
          />
          {/* Sign-up Link */}
          <TypographyP className="text-sm text-center">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </TypographyP>
          {/* Submit Button */}
          <div className="w-full flex justify-center">
            {!isSubmitting ? (
              <Button type="submit" className="w-full">Sign In</Button>
            ) : (
              <Loader2 className="animate-spin mx-auto" />
            )}
          </div>
        </form>
      </Form>
      {/* Google Sign-In Button */}
      <GoogleButton />
    </CardContent>
  </Card>
  {/* Forgot Password Alert */}
  <ForgetPasswordAlert isForgetClick={isForgetClick} setIsForgetClick={setIsForgetClick} />
</div>
    </>
  );
};

const forgetPasswordSchema = z.object({
  email : z.string().email(),
})

type ForgetForm = z.infer<typeof forgetPasswordSchema>;


export function ForgetPasswordAlert({
  isForgetClick,setIsForgetClick
}:{isForgetClick:boolean;setIsForgetClick:Dispatch<SetStateAction<boolean>>}){
  const {toast} = useToast()
  const form = useForm<ForgetForm>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const {formState:{isSubmitting}} = form

  async function onSubmit(values:ForgetForm){
    const {email} = values
    await authClient.forgetPassword({
      email,
      redirectTo:"/reset-password",
    },{
      onSuccess:(ctx)=>{
        toast({
          title: "Email sent",
        })
        setIsForgetClick(false);
      },
      onError:(ctx)=>{
        toast({
          title: "Error",
          description:ctx.error.message,
        })
      }
    })
  }
    return(
      <Dialog open={isForgetClick} onOpenChange={setIsForgetClick}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Forget Password</DialogTitle>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                      <div className="w-full">
                {!isSubmitting ? (
                  <Button className="w-full" type="submit">
                    Send
                  </Button>
                ) : (
                  <Loader2 className="animate-spin mx-auto" />
                )}
              </div>
      </form>
    </Form>
    </DialogHeader>
  </DialogContent>
</Dialog>
    );
}

const resetPassFormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(16, "Password must have at most 16 characters"),
});

type ResetPassForm = z.infer<typeof resetPassFormSchema>;

export function ResetPassComp() {
  const { toast } = useToast();
  const { push } = useRouter();

  const form = useForm<ResetPassForm>({
    resolver: zodResolver(resetPassFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: ResetPassForm) {
    const { password } = values;
    await authClient.resetPassword(
      {
        newPassword: password,
      },
      {
        onSuccess: async (cxt) => {
          toast({
            title: "Success!",
          });

          push("/sign-in");
        },
        onError: async (cxt) => {
          toast({
            title: "Error!",
            description: cxt.error.message,
          });
        },
      }
    );
  }

  return (
    <>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="card-title">Enter New Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                {!isSubmitting ? (
                  <Button className="w-full" type="submit">
                    Reset
                  </Button>
                ) : (
                  <Loader2 className="animate-spin mx-auto" />
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}