import { create } from 'zustand'

interface TextState {
  text: string
  setText: (text: string) => void
}

export const useTextarea = create<TextState>((set) => ({
  text: '',
  setText: (text) => set(() => ({ text: text })),
}))
