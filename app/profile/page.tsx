// app/profile/page.tsx

import ProfilePageClient from "@/features/profile/components/ProfilePageClient";
import { getServerUser, getServerProfile } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getServerUser();

  if (!user) {
    redirect('/auth');
  }

  const profile = await getServerProfile(user.id);

  return (
    <ProfilePageClient
      userEmail={user.email}
      nickname={profile?.nickname ?? null}
    />
  );
}