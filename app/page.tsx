'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AuthForm from "@/components/AuthForm";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (user) {
        // Check if profile exists
        const { data: profile, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (profile) {
          router.push("/dashboard");
        } else {
          router.push("/form");
        }
      }
    };

    handleRedirect();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const user = session.user;

          const { data: profile } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (profile) {
            router.push("/dashboard");
          } else {
            router.push("/form");
          }
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <AuthForm />
    </main>
  );
}
