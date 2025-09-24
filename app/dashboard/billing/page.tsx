"use client";

import { useSearchParams } from "next/navigation";

export default function BillingPage() {
  const params = useSearchParams();
  const success = params.get("success");
  const canceled = params.get("canceled");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Billing</h1>

      {success && <p className="text-green-600 mt-4">✅ Payment successful! Your plan is active.</p>}
      {canceled && <p className="text-red-600 mt-4">❌ Payment canceled. Please try again.</p>}

      <p className="mt-6">Your current plan: <strong>Pro Plan ($49/month)</strong></p>
    </div>
  );
}
