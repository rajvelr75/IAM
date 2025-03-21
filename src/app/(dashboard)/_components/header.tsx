import { TypographyH3 } from "@/components/ui/typography";
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
import SignOut from "./sign-out";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession();

  const profile = session?.user?.image;
  const name = session?.user?.name;
  const role = session?.user?.role; 

  return (
    <div className="fixed top-0 left-0 w-full p-0 shadow-md z-50 
      bg-gradient-to-r from-[#0a0f1d] to-[#010409] border-b border-[#ff004c]/60 shadow-[0px_3px_15px_rgba(255,0,76,0.3)]">
      <div className="py-3 px-6 flex items-center justify-between">
        
        {/* Left Side - Dashboard Title */}
        <TypographyH3 className="text-white tracking-wide drop-shadow-md">
          Dashboard
        </TypographyH3>

        {/* Right Side - Links and User Profile */}
        <div className="flex items-center gap-6">
          
          {/* Organization Link */}
          <Link
            href="/organization"
            className="text-gray-300 hover:text-red-400 transition-colors text-sm font-medium"
          >
            Organization
          </Link>

          {/* Show Admin Panel if the user is an admin */}
          {role === "admin" && (
            <Link
              href="/admin-panel"
              className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
            >
              Admin Panel
            </Link>
          )}

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer transition-transform hover:scale-105 border-2 border-[#ff004c]/60 shadow-md">
                <AvatarImage
                  src={profile ? profile : "https://github.com/shadcn.png"}
                  className="rounded-full"
                />
                <AvatarFallback className="bg-gray-700 text-white">
                  {name ? name.slice(0, 1) : "P"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="mt-2 w-48 rounded-lg shadow-xl bg-[#0a0f1d] border border-[#ff004c]/50"
            >
              <DropdownMenuLabel className="text-gray-300 text-sm font-semibold px-3 py-2">
                Account Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border-[#ff004c]/50" />

              <DropdownMenuItem asChild>
                <Link
                  href="/user-info"
                  className="block px-3 py-2 text-gray-300 hover:bg-[#ff004c]/20 rounded-md transition"
                >
                  🧑‍💼 User Info
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/session-info"
                  className="block px-3 py-2 text-gray-300 hover:bg-[#ff004c]/20 rounded-md transition"
                >
                  🔐 Session Info
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/update-profile"
                  className="px-3 py-2 text-gray-300 hover:bg-[#ff004c]/20 rounded-md transition flex items-center gap-2"
                >
                  🛠️ Profile Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-black" />
              <DropdownMenuItem asChild>
                <div className="px-3 py-2">
                  <SignOut />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}