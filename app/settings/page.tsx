// app/settings/page.tsx

import SettingsClient from "@/components/SettingsClient";
import { getServerUser, getServerProfile, getServerSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function Settings() {
  const user = await getServerUser();

  if (!user) {
    redirect('/auth');
  }

  const profile = await getServerProfile(user.id);

  return (
    <SettingsClient
      userEmail={user.email}
      nickname={profile?.nickname ?? null}
    />
  );
}