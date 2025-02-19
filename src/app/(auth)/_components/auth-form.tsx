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

  // Handle form submission
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
            title: "Account created successfully",
          });
          push("/dashboard")
      },
      onError: async (cxt)=>{
        toast({
          title: "Error Creating Account",
          description:cxt.error.message, 
        })
      }
    });
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="card-title">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Name" {...field} />
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
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <TypographyP>
                Already have an account?{" "}
                <Link href="/sign-in" className="link">
                  Sign In
                </Link>
              </TypographyP>
            {/* Submit Button */}
            <div className="w-full">
              {!isSubmitting ? (
                <Button type="submit">Sign Up</Button>
              ) : (
                <Loader2 className="animate-spin mx-auto" />
              )}
            </div>
          </form>
        </Form>
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

// Infer the type of the form schema
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

  // Handle form submission
  async function onSubmit(values: SignInForm) {
    const {email, password} = values
    await authClient.signIn.email({
      email,
      password,
      callbackURL:"/dashboard"
    },{
      onSuccess: async (cxt)=>{
          toast({
            title: "Account created successfully",
          });
          push("/dashboard")
      },
      onError: async (cxt)=>{
        toast({
          title: "Error Creating Account",
          description:cxt.error.message, 
        })
      }
    });
  }

  return (
    <>
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="card-title">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="flex items-center justify-end w-full h-fit">
                      <Button variant="link" type="button" onClick={()=>{setIsForgetClick(true)}}>Forget Password</Button>
                  </div>
                </FormItem>
              )}
            />
              <TypographyP>
                Dont have an account?{" "}
                <Link href="/sign-up" className="link">
                  Sign Up
                </Link>
              </TypographyP>
            {/* Submit Button */}
            <div className="w-full">
              {!isSubmitting ? (
                <Button type="submit">Sign In</Button>
              ) : (
                <Loader2 className="animate-spin mx-auto" />
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
    <ForgetPasswordAlert isForgetClick={isForgetClick} setIsForgetClick={setIsForgetClick}/>
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
  const form = useForm<ForgetForm>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })
  async function onSubmit(values:ForgetForm){
    console.log(values)
  }
    return(
      <Dialog open={isForgetClick} onOpenChange={setIsForgetClick}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Reset passowrd</DialogTitle>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </DialogHeader>
  </DialogContent>
</Dialog>
    );
}