import { endpoints } from './endpoints'
import { getSavedCSRFToken } from '@/utils/csrf'

export async function fetchAPIPosts(): Promise<Post[]> {
  const csrfToken = getSavedCSRFToken()

  return fetch(`${endpoints.blog}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
  })
    .then((response) => response.json())
    .then((data) => data as Post[])
    .catch((error) => {
      throw new Error(error)
    })
}

export async function createPost(postData: Omit<Post, 'id' | 'author_username'>): Promise<Post> {
  const csrfToken = getSavedCSRFToken()

  return fetch(`${endpoints.blog}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => data as Post)
    .catch((error) => {
      throw new Error(error)
    })
}

export async function deletePost(id: number) {
  const csrfToken = getSavedCSRFToken()

  return fetch(`${endpoints.blog}${id}/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
  }).catch((error) => {
    console.error('Error:', error)
    throw new Error(error)
  })
}
