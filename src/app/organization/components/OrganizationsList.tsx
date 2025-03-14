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
  console.log("Fetched organizations:", organizations);

  return (
    <div className="overflow-x-auto">
      {organizations ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {organizations.map((org: Organization) => (
              <tr key={org.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {org.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {org.slug}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(org.createdAt).toLocaleDateString()} 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-700 mb-4">
            You haven't created or joined any organizations.
          </p>
          <Link href="/organization/create">
            <Button className="bg-blue-600 hover:bg-blue-700">Create Organization</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default OrganizationsList;
