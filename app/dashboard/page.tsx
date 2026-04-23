// app/dashboard/page.tsx

import { redirect } from 'next/navigation'
import { getServerUser } from '@/lib/supabase-server'
import DashboardClient from '@/features/dashboard/components/DashboardClient'

export default async function Dashboard() {
  const user = await getServerUser()
  
  if (!user) {
    redirect('/auth')
  }

  return <DashboardClient userEmail={user.email} />
}