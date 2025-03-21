import UserInfoCard from "@/app/(dashboard)/_components/user-info";
import { getServerSession } from "@/lib/action";

export default async function UserInfoPage() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-red-500 text-lg">You are not logged in.</p>
      </div>
    );
  }

  // ✅ Ensure the session object is properly structured for UserInfoCard
  const sanitizedSession = {
    ...session,
    user: {
      ...session.user,
      role: session.user.role ?? undefined, // Convert null to undefined
      createdAt: session.user.createdAt ?? new Date().toISOString(), // Fallback if missing
    },
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background/5297078.jpg')" }} 
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* User Card */}
      <div className="relative z-10 w-full">
        <UserInfoCard session={sanitizedSession} />
      </div>
    </div>
  );
}