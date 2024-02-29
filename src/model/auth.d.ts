interface LoginCredentials {
  username: string
  password: string
}

interface RegisterData {
  username: string
  first_name: string
  last_name: string
  password1: string
  password2: string
}

interface LoginResponse {
  key: string
}

interface User {
  pk: number
  username: string
  email: string
  first_name: string
  last_name: string
}

interface AuthStore {
  user: User | null
  token: string
  login: (credentials: LoginCredentials) => Promise<void>
  register: (registerData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  isAuth: () => boolean
  reset: () => void
}
