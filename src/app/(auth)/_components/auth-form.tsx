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
  const { toast } = useToast();
  const { push } = useRouter();
  
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: SignUpForm) {
    const { email, name, password } = values;
    
    await authClient.signUp.email(
      { email, password, name, callbackURL: "/apps" },
      {
        onSuccess: async () => {
          toast({ title: "Success!" });
          push(`/verify-email?email=${email}`);
        },
        onError: async (ctx) => {
          toast({ title: "Error", description: ctx.error.message });
        },
      }
    );
  }

  return (
    <div className="fixed inset-0 bg-[url('/background/23964.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-lg bg-black/50 backdrop-blur-lg border border-gray-700 shadow-[0_4px_30px_rgba(255,0,0,0.3)]">
        <h2 className="text-3xl font-bold text-white text-center tracking-wider">Join the Future</h2>
        <p className="text-gray-400 text-center text-sm mt-1">Sign up for an enhanced experience</p>

        {/* ✅ FORM WITH WORKING SUBMIT */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
            {/* Username */}
            <FormField 
              control={form.control} 
              name="name" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 text-sm">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} className="w-full bg-transparent border border-gray-600 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField 
              control={form.control} 
              name="email" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 text-sm">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} className="w-full bg-transparent border border-gray-600 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField 
              control={form.control} 
              name="password" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300 text-sm">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} className="w-full bg-transparent border border-gray-600 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="w-full flex justify-center">
  {!isSubmitting ? (
    <Button
      type="submit"
      className="w-full bg-[#111827] border border-red-500 text-white font-semibold py-2 rounded-lg 
      shadow-[0_0_15px_rgba(255,0,0,0.6)] transition-all hover:bg-red-500 hover:border-red-700 
      hover:shadow-[0_0_25px_rgba(255,0,0,0.9)]"
    >
      Sign Up
    </Button>
  ) : (
    <Loader2 className="animate-spin mx-auto text-red-500" />
  )}
</div>
          </form>
        </Form>

        {/* Sign In Link */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account? 
          <Link href="/sign-in" className="text-blue-400 hover:underline ml-1">Sign in</Link>
        </p>

        {/* Google Sign-In */}
        <div className="mt-4 flex justify-center">
          <GoogleButton />
        </div>
      </div>
    </div>
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
  const { toast } = useToast();
  const { push } = useRouter();
  const [isForgetClick, setIsForgetClick] = useState(false);

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const { formState: { isSubmitting } } = form;

  async function onSubmit(values: SignInForm) {
    const { email, password } = values;
    
    await authClient.signIn.email(
      { email, password, callbackURL: "/apps" },
      {
        onSuccess: async () => {
          toast({ title: "Success!" });
          await authClient.twoFactor.sendOtp();
          push("/2fa-verification");
        },
        onError: async (ctx) => {
          toast({ title: "Error", description: ctx.error.message });
        },
      }
    );
  }

  return (
    <div className="fixed inset-0 bg-[url('/background/23964.jpg')] bg-cover bg-center flex items-center justify-center px-4">
  <div className="w-full max-w-md p-6 rounded-lg bg-black/50 backdrop-blur-lg border border-gray-700 shadow-[0_4px_30px_rgba(255,0,0,0.3)]">
    <h2 className="text-3xl font-bold text-white text-center tracking-wider">Welcome Back</h2>
    <p className="text-gray-400 text-center text-sm mt-1">Sign in to your account</p>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
        {/* Email */}
        <FormField 
          control={form.control} 
          name="email" 
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 text-sm">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} className="w-full bg-transparent border border-gray-600 text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField 
          control={form.control} 
          name="password" 
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 text-sm">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} className="w-full bg-transparent border border-gray-600 text-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot Password & Sign Up */}
        <div className="flex justify-between mt-2 text-sm">
          <button type="button" onClick={() => setIsForgetClick(true)} className="text-red-400 hover:underline">
            Forgot Password?
          </button>
          <Link href="/sign-up" className="text-gray-400 hover:text-red-400 hover:underline">
            New User? Sign Up
          </Link>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center">
  {!isSubmitting ? (
    <Button
      type="submit"
      className="w-full bg-[#111827] border border-red-500 text-white font-semibold py-2 rounded-lg 
      shadow-[0_0_15px_rgba(255,0,0,0.6)] transition-all hover:bg-red-500 hover:border-red-700 
      hover:shadow-[0_0_25px_rgba(255,0,0,0.9)]"
    >
      Sign In
    </Button>
  ) : (
    <Loader2 className="animate-spin mx-auto text-red-500" />
  )}
</div>

      </form>
    </Form>

    {/* Google Sign-In */}
    <div className="mt-4 flex justify-center">
      <GoogleButton />
    </div>
  </div>

  {/* Forgot Password Modal */}
  <ForgetPasswordAlert isForgetClick={isForgetClick} setIsForgetClick={setIsForgetClick} />
</div>

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