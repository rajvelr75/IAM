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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200">
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:opacity-80 transition"
      >
        <ArrowLeft size={24} />
        <span className="text-lg font-medium">Back</span>
      </button>

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-lg rounded-xl p-8 border border-gray-300">
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
            {format(createdAt, "dd-MMM-yyyy")}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Session Expires At:</span>{" "}
            {format(expiresAt, "dd-MMM-yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
}
