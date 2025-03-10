import UserSession from "@/app/(dashboard)/_components/user-session";
import { getServerSession } from "@/lib/action"; 

export default async function UserInfoPage() {
  const session = await getServerSession(); 

  if (!session) {
    return <p className="text-center text-red-500">You are not logged in.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <UserSession session={session} />
    </div>
  );
}
