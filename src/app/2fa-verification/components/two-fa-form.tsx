"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/better-auth/auth-client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function TwoFaForm() {
  const { toast } = useToast();
  const { push } = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    await authClient.twoFactor.verifyOtp(
      { code: values.otp },
      {
        onSuccess() {
          toast({
            title: "Verified!",
          });

          push("/dashboard");
        },
        onError(ctx) {
          toast({
            title: "Error!",
            description: ctx.error.message,
          });
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <Card className="w-[400px] p-6 shadow-lg rounded-lg bg-white">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-semibold">2-Factor Authentication</CardTitle>
      <CardDescription className="text-gray-600">
        Enter your OTP to verify yourself
      </CardDescription>
    </CardHeader>
    <CardContent className="w-full flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full flex flex-col items-center">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-center">
                <FormLabel className="text-center">One-Time Password</FormLabel>
                <FormControl className="w-full flex justify-center">
                  <InputOTP maxLength={6} {...field} className="flex justify-center">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-center text-gray-500">
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
                <div className="w-full flex justify-center mt-3">
                  <Button
                    variant="link"
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={async () => {
                      const { data, error } = await authClient.twoFactor.sendOtp();

                      if (error) {
                        toast({
                          title: "Error!",
                          description: error.message,
                        });
                        return;
                      }

                      toast({
                        title: "Check your email",
                      });
                    }}
                  >
                    Request OTP
                  </Button>
                </div>
              </FormItem>
            )}
          />
          {/* Verify Button */}
          <Button type="submit" className="w-full">Verify</Button>
        </form>
      </Form>
    </CardContent>
  </Card>
</div>

  );
}

export default TwoFaForm;