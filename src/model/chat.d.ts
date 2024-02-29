interface ChatResponse {
  output: string
}

interface ChatMessage {
  text: string
  user: string
}

interface ChatStore {
  chat: ChatMessage[]

  fetchChat: (input: string) => Promise<void>
  reset: () => void
}
