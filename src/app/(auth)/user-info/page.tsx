import UserInfoCard from "@/app/(dashboard)/_components/user-info";
import { getServerSession } from "@/lib/action"; 

export default async function UserInfoPage() {
  const session = await getServerSession(); 

  if (!session) {
    return <p className="text-center text-red-500">You are not logged in.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <UserInfoCard session={session} />
    </div>
  );
}
