"use client"; // Mark as a Client Component

import { TypographyH2 } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import OrganizationsList from "./components/OrganizationsList";
import CreateOrganizationForm from "../(auth)/_components/CreateOrganizationForm";

type Organization = {
  name: string;
  slug: string;
  logo: string;
  createdAt: string;
};

export default function OrganizationPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organization");

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-[#0a0f1d]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#ff004c]"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative text-white py-10"
      style={{ backgroundImage: "url('/background/5297078.jpg')" }} // Set background image
    >
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center text-[#ff004c] hover:text-[#ff3366] transition mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to Dashboard</span>
        </button>

        {/* Page Header with Add Organization Button */}
        <div className="flex justify-between items-center mb-6 bg-[#141b2d]/80 shadow-lg p-4 rounded-lg border border-[#ff004c]/40">
          <TypographyH2 className="text-[#ff004c]">Organizations</TypographyH2>

          {/* Stylish "Add Organization" Button (Kept the same) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition-all duration-300"
          >
            Add Organization
          </button>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="text-red-500 bg-red-900/30 border border-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Organizations Table with a Dark Theme */}
        <div className="bg-[#141b2d]/80 p-6 rounded-lg shadow-lg border border-[#ff004c]/40">
          <OrganizationsList />
        </div>

        {/* Modal for Creating Organization */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-[#141b2d] p-6 rounded-lg shadow-xl w-full max-w-md border border-[#ff004c]/40">
              {/* ❌ Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                onClick={() => setIsModalOpen(false)}
              >
                ✖
              </button>
              <CreateOrganizationForm closeModal={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}