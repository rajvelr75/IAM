"use client";

import React, { useState } from "react";
import { useCreateOrganization } from "@/lib/better-auth/auth-client";

export const CreateOrganizationForm = ({ closeModal }: { closeModal: () => void }) => {
  const { createOrganization } = useCreateOrganization();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createOrganization(name, slug, logo);
      setSuccess(true);
      setName("");
      setSlug("");
      setLogo("");

      // ✅ Close Modal After a Delay
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (err) {
      console.error("Error creating organization:", err);
      setError("Failed to create organization. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#141b2d] text-white rounded-lg shadow-lg border border-[#ff004c]/40">
      <h2 className="text-2xl font-semibold text-[#ff004c] mb-6">Create Organization</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Organization Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-[#1b2236] border border-[#ff004c]/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff004c] transition"
            placeholder="Enter organization name"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 bg-[#1b2236] border border-[#ff004c]/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff004c] transition"
            placeholder="Enter slug (e.g., my-org)"
            required
          />
        </div>

        {/* Logo URL */}
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-300 mb-1">
            Logo URL
          </label>
          <input
            type="url"
            id="logo"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className="w-full px-4 py-2 bg-[#1b2236] border border-[#ff004c]/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff004c] transition"
            placeholder="Enter logo URL (optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition-all duration-300"
        >
          {loading ? "Creating..." : "Create Organization"}
        </button>

        {/* Error and Success Messages */}
        {error && <div className="mt-4 p-3 bg-red-900/40 text-red-300 border border-red-500/50 rounded-lg">{error}</div>}
        {success && <div className="mt-4 p-3 bg-green-900/40 text-green-300 border border-green-500/50 rounded-lg">Organization created successfully!</div>}
      </form>
    </div>
  );
};

export default CreateOrganizationForm;
