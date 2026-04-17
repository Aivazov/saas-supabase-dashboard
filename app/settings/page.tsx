// app/settings/page.tsx

import SettingsClient from "@/components/SettingsClient";
import { getServerUser } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function Settings() {
  const user = await getServerUser();

  if (!user) {
    redirect('/auth')
  }

  return <SettingsClient userEmail={user.email} />
}