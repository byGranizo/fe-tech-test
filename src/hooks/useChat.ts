import { useChatStore } from '@/store/chatStore'

export const useChat = () => {
  const chat = useChatStore((state) => state.chat)
  const fetchChat = useChatStore((state) => state.fetchChat)

  return {
    chat,
    fetchChat,
  }
}
