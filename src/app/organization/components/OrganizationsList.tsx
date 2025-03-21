import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/better-auth/auth-client";
import Link from "next/link";

type Organization = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
};

function OrganizationsList() {
  const { data: organizations } = authClient.useListOrganizations();

  return (
    <div className="overflow-x-auto">
      {organizations ? (
        <table className="min-w-full bg-[#141b2d] border border-[#ff004c]/40 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-[#1b2236] border-b border-[#ff004c]/40">
              <th className="px-6 py-3 text-left text-xs font-medium text-[#ff004c] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#ff004c] uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#ff004c] uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ff004c]/20">
            {organizations.map((org: Organization) => (
              <tr key={org.id} className="hover:bg-[#1f2943] transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium">
                  <Link href={`/organization/details/${org.slug}`} className="hover:underline">
                    {org.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{org.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(org.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">
            You haven't created or joined any organizations.
          </p>
          <Link href="/organization/create">
            <Button className="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition-all duration-300">
              Create Organization
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrganizationsList;