"use client";
import { useState } from "react";

export default function PortalHome() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    window.location.href = "/api/auth/signin?provider=google";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Client Portal</h1>
      <p className="mb-8 text-gray-600">Sign in to manage your invoices, tickets, and profile.</p>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        {loading ? "Redirecting..." : "Sign in with Google"}
      </button>
    </div>
  );
}
