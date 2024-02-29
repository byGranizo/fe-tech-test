import { endpoints } from './endpoints'
import { getSavedCSRFToken } from '@/utils/csrf'

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const csrfToken = getSavedCSRFToken()

  return fetch(`${endpoints.auth}login/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .then((data) => data as LoginResponse)
    .catch((error) => {
      throw new Error(error)
    })
}

export async function logout() {
  const csrfToken = getSavedCSRFToken()

  return fetch(`${endpoints.auth}logout/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
  })
    .then((response) => response.json())
    .then((data) => data.csrfToken)
    .catch((error) => {
      throw new Error(error)
    })
}

export async function getCurrentUser(): Promise<User> {
  const csrfToken = getSavedCSRFToken()

  return fetch(`${endpoints.auth}user/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
  })
    .then((response) => response.json())
    .then((data) => data as User)
    .catch((error) => {
      throw new Error(error)
    })
}

export async function register(registerData: RegisterData) {
  const csrfToken = getSavedCSRFToken()

  return fetch(`${endpoints.auth}registration/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify(registerData),
  }).catch((error) => {
    console.error(error)
    throw new Error(error)
  })
}
