export function setCookie(name: string, value: string) {
  const encodedName = encodeURIComponent(name)
  const encodedValue = encodeURIComponent(value)
  document.cookie = `${encodedName}=${encodedValue}; path=/`
}

export function getCookie(name: string) {
  const encodedName = encodeURIComponent(name)
  const cookie = document.cookie.split(';').find((cookie) => cookie.includes(encodedName))

  return cookie ? decodeURIComponent(cookie.split('=')[1]) : ''
}
