// lib/supabase-server.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const getServerSupabase = async () => {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        // setAll(cookiesToSet) {
        //   cookiesToSet.forEach(({ name, value, options }) =>
        //     cookieStore.set(name, value, options)
        //   )
        // },
      },
    }
  )
}

export const getServerUser = async () => {
  const supabase = await getServerSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export const getServerProfile = async (userId: string) => {
  const supabase = await getServerSupabase()

  const { data, error } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    console.error(error)
    return null
  }

  return data
}