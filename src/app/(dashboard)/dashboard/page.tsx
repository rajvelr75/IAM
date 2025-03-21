import React from "react";
import Header from "../_components/header";
import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getServerSession } from "@/lib/action";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) {
    return redirect("/sign-in");
  }

  const { provider } = (
    await auth.api.listUserAccounts({
      headers: await headers(),
    })
  )[0];

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/background/5297078.jpg')" }} 
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Container */}
      <div className="relative z-10">
        <Header />
      </div>
    </div>
  );
}