// lib/auth.ts

import { supabase } from './supabase-client'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

// export async function signUp(email: string, password: string) {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${window.location.origin}/auth/callback`,
//     },
//   })

//   if (error) throw error
//   return data
// }

export async function signUp(email: string, password: string, nickname: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        nickname,
      }
    },
  })

  if (error) throw error

  const user = data.user;
  if (!user) throw new Error('User not created')

  // const { error: updateError } = await supabase
  //   .from('profiles')
  //   .update({ nickname })
  //   .eq('id', user.id)
  
  // if (updateError) throw updateError;
  
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}