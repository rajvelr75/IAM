import UserSession from "@/app/(dashboard)/_components/user-session";
import { getServerSession } from "@/lib/action";

export default async function UserSessionPage() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-red-500 text-lg">You are not logged in.</p>
      </div>
    );
  }

  // ✅ Ensure role is a string (null → undefined)
  const sanitizedSession = {
    ...session,
    user: {
      ...session.user,
      role: session.user.role ?? undefined, // Convert null to undefined
    },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background/5297078.jpg')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Session Card */}
      <div className="relative z-10 w-full">
        <UserSession session={sanitizedSession} />
      </div>
    </div>
  );
}
