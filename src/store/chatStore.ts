import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { fetchAPIChat } from '@/services/chat'
import { useAuthStore } from './authStore'

const initialData: { chat: ChatMessage[] } = {
  chat: [],
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chat: initialData.chat,

      fetchChat: async (input) => {
        const myMessage: ChatMessage = {
          text: input,
          user: useAuthStore.getState().user!.username,
        }
        set((state) => ({ chat: [...state.chat, myMessage] }))

        const chatResponse = await fetchAPIChat(input)

        const botMessage: ChatMessage = {
          text: chatResponse.output,
          user: 'bot',
        }

        set((state) => ({ chat: [...state.chat, botMessage] }))
      },

      reset: () => set({ ...initialData }),
    }),
    {
      name: 'blog-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
