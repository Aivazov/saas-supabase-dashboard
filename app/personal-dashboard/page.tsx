// app/personal-dashboard/page.tsx

import { redirect } from 'next/navigation'
import { getServerUser } from '@/lib/supabase-server'
import PersonalDashboardClient from '@/features/personal-dashboard/components/PersonalDashboard'

export default async function PersonalDashboard() {
  const user = await getServerUser()
  
  // console.log("SERVER USER:", user)
  // 🔒 защита ДО рендера
  if (!user) {
    redirect('/auth')
  }

  // return <PersonalDashboardClient />
  return <PersonalDashboardClient userEmail={user.email} />
}