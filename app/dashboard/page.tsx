// app/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email || "");
    };
    getUser();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Resume Tailor 👔</h1>
      <p className="text-lg text-gray-600">You&apos;re logged in as <span className="font-semibold">{email}</span></p>
    </main>
  );
}
