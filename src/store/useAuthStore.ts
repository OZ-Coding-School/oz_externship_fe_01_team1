import { create } from 'zustand'

interface UserInfo {
  email: string
  name: string
}

interface AuthState {
  userInfo: UserInfo | null
  isLogin: boolean
  setLogin: (user: UserInfo) => void
  setLogout: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  userInfo: null,
  isLogin: false,

  setLogin: (user) => {
    localStorage.setItem('userInfo', JSON.stringify(user))
    set({ userInfo: user, isLogin: true })
  },

  setLogout: () => {
    localStorage.removeItem('userInfo')
    set({ userInfo: null, isLogin: false })
  },

  initAuth: () => {
    const data = localStorage.getItem('userInfo')
    if (data) {
      const parsed = JSON.parse(data)
      set({ userInfo: parsed, isLogin: true })
    } else {
      set({ userInfo: null, isLogin: false })
    }
  },
}))
