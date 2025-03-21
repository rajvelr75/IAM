"use client";

import { Session } from "@/lib/better-auth/auth-types";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserSession({ session }: { session: Session }) {
  const { session: userSession } = session;
  const { createdAt, expiresAt, id, ipAddress, userAgent } = userSession;
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/background/5297078.jpg')" }} 
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:opacity-80 transition z-10"
      >
        <ArrowLeft size={24} />
        <span className="text-lg font-medium">Back</span>
      </button>

      {/* Session Info Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-lg rounded-xl p-8 border border-gray-300">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 tracking-wide">
          🔐 Session Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
          <p>
            <span className="font-semibold text-gray-600">Session ID:</span> {id}
          </p>
          <p>
            <span className="font-semibold text-gray-600">IP Address:</span> {ipAddress}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Device:</span> {userAgent}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Logged In At:</span>{" "}
            {format(new Date(createdAt), "dd-MMM-yyyy")}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Session Expires At:</span>{" "}
            {format(new Date(expiresAt), "dd-MMM-yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
}