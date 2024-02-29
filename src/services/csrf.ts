import { endpoints } from './endpoints'

export async function getCSRFToken() {
  return fetch(endpoints.csrf, {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((data) => data.csrfToken)
}
