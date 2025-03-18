import { createAuthClient } from "better-auth/react";
import { BASE_URL } from "../constants/env";
import { adminClient, twoFactorClient } from "better-auth/client/plugins";
import { organizationClient } from "better-auth/client/plugins";
import { ac, moderator, user, admin as adminRole } from "@/app/(auth)/permissions";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [
    twoFactorClient(),
    organizationClient(),
    adminClient({
      ac: ac,
      roles: {
          admin: adminRole, 
          user,
          moderator,
      }
  })
  ],
});

export const { useSession } = authClient;

/**
 * ✅ Hook to fetch all organizations
 */
export const useListOrganizations = () => {
  return authClient.organization.list();
};

/**
 * ✅ Hook to fetch a single organization by slug
 */
// export const useGetOrganization = (slug: string) => {
//   return authClient.organization.get({ slug });
// };

/**
 * ✅ Hook to create an organization
 */

export const useCreateOrganization = () => {
  const { data: session } = useSession();

  const createOrganization = async (name: string, slug: string, logo?: string) => {
    if (!session?.user?.email) {
      throw new Error("User must be authenticated with a valid email to create an organization.");
    }

    // Create the organization
    const organization = await authClient.organization.create({
      name,
      slug,
      logo,
    });

    if (!organization?.data?.id) {
      throw new Error("Failed to create organization.");
    }

    // Assign the current user as admin
    if (authClient.organization.inviteMember) {
      await authClient.organization.inviteMember({
        organizationId: organization.data.id,
        email: session.user.email,
        role: "admin",
      });
    } else {
      throw new Error("No method available to assign admin role.");
    }

    return organization;
  };

  return { createOrganization };
};
