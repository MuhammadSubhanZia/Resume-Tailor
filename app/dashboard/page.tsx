//app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", userData.user.id)
        .single();

      setProfile(profileData);
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-8">
      {profile ? (
        <>
          <h1 className="text-3xl font-bold">Welcome, {profile.name} 👋</h1>
          <h2 className="text-xl text-gray-600 mt-2">{profile.title}</h2>
          <p className="mt-4">{profile.bio}</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
