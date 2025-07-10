import { create } from 'zustand'

interface AuthVerificationState {
  emailCodeValid: boolean
  phoneCodeValid: boolean
  setEmailCodeValid: (isValid: boolean) => void
  setPhoneCodeValid: (isValid: boolean) => void
}

export const useAuthVerificationStore = create<AuthVerificationState>(
  (set) => ({
    emailCodeValid: false,
    phoneCodeValid: false,
    setEmailCodeValid: (isValid) => set({ emailCodeValid: isValid }),
    setPhoneCodeValid: (isValid) => set({ phoneCodeValid: isValid }),
  })
)
