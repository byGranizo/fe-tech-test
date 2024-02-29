import { endpoints } from './endpoints'
import { getSavedCSRFToken } from '@/utils/csrf'

export async function fetchAPIChat(input: string): Promise<ChatResponse> {
  const csrfToken = getSavedCSRFToken()

  return fetch(`${endpoints.lorem}?text=${input}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
  })
    .then((response) => response.json())
    .then((data) => data as ChatResponse)
    .catch((error) => {
      throw new Error(error)
    })
}
