"use client";

import { Session } from "@/lib/better-auth/auth-types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function UserInfoCard({ session }: { session: Session }) {
  const router = useRouter();

  const {
    user: { createdAt, email, id, emailVerified, name, twoFactorEnabled },
  } = session;

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background/5297078.jpg')" }} 
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Back Button */}
      <button 
        onClick={() => router.push("/dashboard")} 
        className="absolute top-8 left-8 flex items-center gap-2 text-white hover:opacity-80 transition z-20"
      >
        <ArrowLeft size={28} />
        <span className="text-lg font-medium">Back</span>
      </button>

      {/* Glassmorphic Card */}
      <div className="relative z-20 w-full max-w-3xl bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-white/30">
        <h2 className="text-4xl font-extrabold text-white text-center mb-8 tracking-wide">
          👤 User Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-white">
          <p><span className="font-semibold">User ID:</span> {id}</p>
          <p><span className="font-semibold">Name:</span> {name ?? "N/A"}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p>
            <span className="font-semibold">Email Status:</span> 
            <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-lg ${emailVerified ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
              {emailVerified ? "Verified" : "Unverified"}
            </span>
          </p>
          <p>
            <span className="font-semibold">2FA Status:</span> 
            <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-lg ${twoFactorEnabled ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
              {twoFactorEnabled ? "Enabled" : "Disabled"}
            </span>
          </p>
          <p>
            <span className="font-semibold">Joined At:</span> 
            {createdAt ? format(new Date(createdAt), "dd-MMM-yyyy") : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
