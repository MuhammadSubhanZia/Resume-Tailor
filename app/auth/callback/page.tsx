// app/auth/callback/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session", error);
        return;
      }

      if (data.session) {
        console.log("User authenticated ✅", data.session);
        router.push('/dashboard'); // redirect after successful login
      } else {
        console.log("No session found ❌");
        router.push('/'); // fallback if not authenticated
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center text-lg font-medium">
      Authenticating via Magic Link...
    </div>
  );
}
