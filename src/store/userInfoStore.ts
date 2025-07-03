import type { userData } from '@customType/userData'
import { create } from 'zustand'

type UserInfoState = {
  userInfo: userData | null
  setUserInfo: (userInfo: userData | null) => Promise<void>
}

type IsLoginState = {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}

export const useUserInfo = create<UserInfoState>((set) => ({
  userInfo: null,
  setUserInfo: async (userInfo) => {
    set(() => ({ userInfo: userInfo }))
  },
}))

export const useIsUserLogin = create<IsLoginState>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) =>
    set(() => {
      return { isLogin: !!isLogin }
    }),
}))
