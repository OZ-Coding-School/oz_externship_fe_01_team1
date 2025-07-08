import { create } from 'zustand'
import type { userData } from '@customType/userData'

type UserInfoState = {
  userInfo: userData | null
  setUserInfo: (userInfo: userData | null) => void
  initializeUserInfo: () => void
}

export const useUserInfo = create<UserInfoState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    } else {
      localStorage.removeItem('userInfo')
    }
    set({ userInfo })
  },
  initializeUserInfo: () => {
    const stored = localStorage.getItem('userInfo')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        set({ userInfo: parsed })
      } catch {
        set({ userInfo: null })
      }
    }
  },
}))