// store/useProfile.ts

import { create } from 'zustand'
import * as profileApi from '@/lib/profile'

type ProfileState = {
  loading: boolean
  error: string | null

  nickname: string | null
  email: string | null

  setProfile: (profile: { nickname: string | null; email: string | null }) => void

  updateNickname: (nickname: string) => Promise<void>
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  loading: false,
  error: null,

  nickname: null,
  email: null,

  setProfile: (profile) =>
    set({
      nickname: profile.nickname,
      email: profile.email,
    }),

  updateNickname: async (nickname: string) => {
    set({ loading: true, error: null })

    try {
      await profileApi.updateNickname(nickname)

      // 🔥 IMPORTANT: optimistic update (обновляем UI сразу)
      set({
        nickname,
      })
    } catch (err: any) {
      set({ error: err.message })
      throw err
    } finally {
      set({ loading: false })
    }
  },
}))