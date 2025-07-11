import { create } from 'zustand'
import type { userData } from '@customType/userData'
import { persist } from 'zustand/middleware'

type UserInfoState = {
  userInfo: userData | null
  setUserInfo: (userInfo: userData | null) => void
}

export const useUserInfo = create<UserInfoState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: 'userInfo',
    }
  )
)
