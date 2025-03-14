"use client"; // Mark as a Client Component

import { TypographyH2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { ArrowLeft } from "lucide-react";
import OrganizationsList from "./components/OrganizationsList";

// Dummy organization data type
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
  const router = useRouter(); 

  // Fetch organizations from MongoDB
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organizations");
  
        // Check if response is OK
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log("Fetched Organizations:", data); // Debugging
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
      <div className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid"></div>
      </div>
    );
  }  
  

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard")} 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back to Dashboard</span>
      </button>

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <TypographyH2>Organization</TypographyH2>
        {/* Show "Add Organization" button only if user is NOT in an organization */}
        {organizations.length === 0 && (
          <Link href="/organization/create">
            <Button className="bg-blue-600 hover:bg-blue-700">Add Organization</Button>
          </Link>
        )}
      </div>

      {/* Error Handling */}
      {error && (
        <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <OrganizationsList />
    </div>
  );
}
