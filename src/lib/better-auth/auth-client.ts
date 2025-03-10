// auth-client.ts
import { createAuthClient } from "better-auth/react";
import { BASE_URL } from "../constants/env";
import { twoFactorClient } from "better-auth/client/plugins";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [
    twoFactorClient(),
    organizationClient()
  ]
});

export const { useSession } = authClient;

export const createOrganization = async (name: string, slug: string, logo?: string) => {
  const organization = await authClient.organization.create({ name, slug, logo });
  return organization;
};
