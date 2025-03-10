"use client"

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
          👤 User Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
          <p><span className="font-semibold text-gray-600">User ID:</span> {id}</p>
          <p><span className="font-semibold text-gray-600">Name:</span> {name}</p>
          <p><span className="font-semibold text-gray-600">Email:</span> {email}</p>
          <p>
            <span className="font-semibold text-gray-600">Email Status:</span> 
            <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-lg ${emailVerified ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
              {emailVerified ? "Verified" : "Unverified"}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">2FA Status:</span> 
            <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-lg ${twoFactorEnabled ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
              {twoFactorEnabled ? "Enabled" : "Disabled"}
            </span>
          </p>
          <p><span className="font-semibold text-gray-600">Joined At:</span> {format(createdAt, "dd-MMM-yyyy")}</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
