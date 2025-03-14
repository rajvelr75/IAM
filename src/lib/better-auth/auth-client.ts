import { createAuthClient } from "better-auth/react";
import { BASE_URL } from "../constants/env";
import { twoFactorClient } from "better-auth/client/plugins";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [
    twoFactorClient(),
    organizationClient(),
  ],
});

export const { useSession } = authClient;

/**
 * Custom Hook to create an organization
 */
export const useCreateOrganization = () => {
  const { data: session } = useSession(); // ✅ Hook is now inside a React component/hook

  const createOrganization = async (name: string, slug: string, logo?: string) => {
    if (!session?.user?.email) {
      throw new Error("User must be authenticated with a valid email to create an organization.");
    }

    const organization = await authClient.organization.create({
      name,
      slug,
      logo,
    });

    if (!organization?.data?.id) {
      throw new Error("Failed to create organization.");
    }

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
