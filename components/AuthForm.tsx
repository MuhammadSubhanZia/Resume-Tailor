'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (!error) setSent(true)
    else alert(error.message)
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-bold">Sign in via Magic Link</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border rounded px-4 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Send Magic Link
      </button>
      {sent && <p className="text-green-700">Check your email 📩</p>}
    </div>
  )
}
