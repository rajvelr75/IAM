// app/organization/create/page.tsx

import { CreateOrganizationForm } from "@/app/(auth)/_components/CreateOrganizationForm";

export default function CreateOrganizationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CreateOrganizationForm />
    </div>
  );
}