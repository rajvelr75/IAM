import { authClient } from "@/lib/better-auth/auth-client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await authClient.getSession();

  // Check if session exists and extract user properly
  const user = session?.data?.user;

  if (user) {
    redirect("/apps");
  } else {
    redirect("/sign-up");
  }

  return null; 
}
