// lib/profile.ts
import { supabase } from './supabase-client'

export async function updateNickname(nickname: string) {
  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) throw new Error('No user')

  const { error } = await supabase
    .from('profiles')
    .update({ nickname })
    .eq('id', userData.user.id)

  if (error) throw error

  return true
}