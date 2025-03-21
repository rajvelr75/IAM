"use client";

import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/better-auth/auth-client";

function EmailVerificationComp({ email }: { email: string }) {
  const { toast } = useToast();

  return (
    <div className="fixed inset-0 bg-[url('/background/23964.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      {/* Floating Verification Box */}
      <div className="w-full max-w-md p-8 rounded-lg bg-black/40 backdrop-blur-lg border border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
        <h2 className="text-3xl font-extrabold text-white text-center tracking-wider">
          Verify Your Email
        </h2>
        <p className="text-gray-300 text-center mt-3">
          We've sent a verification email to{" "}
          <span className="text-red-400 font-semibold">{email}</span>.
          Please check your inbox and verify your email.  
          If you've already verified, refresh this page.
        </p>
        
        {/* Request Again */}
        <p className="text-gray-300 text-center mt-4">
          Didn't receive an email?{" "}
          <span
            className="text-red-500 font-semibold cursor-pointer hover:underline transition-all"
            onClick={async () => {
              await authClient.sendVerificationEmail(
                { email, callbackURL: "/apps" },
                {
                  onSuccess: () => {
                    toast({ title: "Success!", description: "Verification email sent!" });
                  },
                  onError: (ctx) => {
                    toast({ title: "Error!", description: ctx.error.message });
                  },
                }
              );
            }}
          >
            Request again
          </span>.
        </p>
      </div>
    </div>
  );
}

export default EmailVerificationComp;
