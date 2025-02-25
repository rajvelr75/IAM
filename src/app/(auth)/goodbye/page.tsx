"use client"

import { useEffect, useState } from "react";
import { TypographyH2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GoodbyePage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) {
      router.push("/sign-in");
    }
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md">
        <TypographyH2 className="text-red-600">Your Account has been Successfully Deleted</TypographyH2>
        <p className="mt-4 text-gray-600">Redirecting to Sign in page in {countdown} seconds...</p>
        <Button 
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => router.push("/sign-in")}
        >
          Redirect Now
        </Button>
      </div>
    </div>
  );
}
