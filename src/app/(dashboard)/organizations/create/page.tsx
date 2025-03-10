// apps/web/src/app/(dashboard)/organizations/create/page.tsx

import { CreateOrganizationForm } from "@/app/(auth)/_components/CreateOrganizationForm";

export default function CreateOrganizationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create a New Organization</h1>
      <CreateOrganizationForm />
    </div>
  );
}