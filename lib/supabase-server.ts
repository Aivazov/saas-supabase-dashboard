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
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}

// export const getServerUser = async () => {
//   const supabase = getServerSupabase()
//   const { data: { user } } = await supabase.auth.getUser()
//   return user
// }

export const getServerUser = async () => {
  const supabase = await getServerSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

// export const getServerSupabase = async () => {
//   const cookieStore = await cookies()

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll()
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             cookieStore.set(name, value, options)
//           )
//         },
//       },
//     }
//   )
// }


// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export const getServerSupabase = () => {
//   return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies,
//     }
//   )
// }

// export const getServerUser = async () => {
//   const supabase = getServerSupabase()
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   return user
// }

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export const getServerSupabase = async () => {
//   const cookieStore = cookies()
//   // const cookieStore = await cookies()

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll() // возвращает массив cookie объектов
//         },
//       },
//       // cookies: {
//       //   getAll() {
//       //     return cookieStore.getAll()
//       //   },
//       //   setAll(cookiesToSet) {
//       //     cookiesToSet.forEach(({ name, value, options }) =>
//       //       cookieStore.set(name, value, options)
//       //     )
//       //   },
//       // },
//     }
//   )
// }

// export const getServerUser = async () => {
//   const supabase = await getServerSupabase()

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   return user
// }

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export const getServerSupabase = () => {
//   const cookieStore = cookies()

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => cookieStore.getAll(),
//       },
//     }
//   )
// }

// export const getServerUser = async () => {
//   const supabase = getServerSupabase()

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   return user
// }