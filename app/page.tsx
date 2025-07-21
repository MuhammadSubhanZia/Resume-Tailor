'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AuthForm from "@/components/AuthForm";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log("User is already logged in");
        router.push("/form"); // 🚀 redirect to form or dashboard
      }
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        console.log("Logged in via magic link!");
        router.push("/form"); // 🚀 redirect after login
      }
    });

    // Cleanup listener on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <AuthForm />
    </main>
  );
}