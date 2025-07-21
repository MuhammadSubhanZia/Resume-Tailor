// app/auth/magic-link/page.tsx or a similar file
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MagicLinkLogin() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `http://localhost:3000/auth/callback`, // ✅ redirect to /auth/callback
      },
    });

    if (error) {
      setMessage("❌ Something went wrong: " + error.message);
    } else {
      setMessage("✅ Check your email for the magic link!");
      setEmail(""); // clear input after successful send
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="input"
      />
      <button type="submit" className="btn">Send Magic Link</button>
      <p>{message}</p>
    </form>
  );
}
