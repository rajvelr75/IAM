import { TypographyH3 } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "@/lib/action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import SignOut from "./sign-out";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession();

  const profile = session?.user?.image;
  const name = session?.user?.name;

  return (
    <Card className="fixed top-0 left-0 w-full p-0 rounded-none shadow-md z-50 bg-white border-b border-gray-200">
      <CardContent className="py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <TypographyH3>Dashboard</TypographyH3>
          {/* Organization Link */}
          <Link
            href="/organization"
            className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            Organization
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer transition-transform hover:scale-105">
              <AvatarImage
                src={profile ? profile : "https://github.com/shadcn.png"}
              />
              <AvatarFallback>
                {name ? name.slice(0, 1) : "P"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-2 w-48 rounded-lg shadow-xl bg-white border border-gray-200"
          >
            <DropdownMenuLabel className="text-gray-700 text-sm font-semibold px-3 py-2">
              Account Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/user-info"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
              >
                🧑‍💼 User Info
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/session-info"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
              >
                🔐 Session Info
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/update-profile"
                className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition flex items-center gap-2"
              >
                🛠️ Profile Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <div className="px-3 py-2">
                <SignOut />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}