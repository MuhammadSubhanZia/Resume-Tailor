// app/auth/callback/page.tsx
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        // ✅ Redirect after login
        const userId = data.session.user.id;

        const { data: profile } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (profile) {
          router.replace("/dashboard");
        } else {
          router.replace("/form");
        }
      } else {
        router.replace("/"); // failed to login
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </main>
  );
}
