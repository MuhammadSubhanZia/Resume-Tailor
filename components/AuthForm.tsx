import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // ✅ Change this for localhost or Vercel deployment
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/auth/callback",
      },
    });

    if (error) {
      setMessage("Something went wrong. Try again.");
    } else {
      setMessage("Magic link sent! Check your email.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="px-4 py-2 border rounded"
        required
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Send Magic Link
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
