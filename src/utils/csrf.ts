import { getCSRFToken } from '@/services/csrf'
import { setCookie, getCookie } from './cookies'

export async function refreshCsrfToken() {
  const token = await getCSRFToken()
  setCookie('csrftoken', token)
  console.log('CSRF token:', token)
}

export function getSavedCSRFToken() {
  return getCookie('csrftoken')
}
