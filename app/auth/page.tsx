// app/auth/page.tsx

import { redirect } from 'next/navigation'
import { getServerUser } from '@/lib/supabase-server'
import AuthPage from '@/components/AuthPage'

export default async function Page() {
  const user = await getServerUser()

  if (user) {
    redirect('/dashboard')
  }

  return <AuthPage />
}