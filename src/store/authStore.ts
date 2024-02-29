import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { refreshCsrfToken } from '@/utils/csrf'
import { login, logout, getCurrentUser, register } from '@/services/auth'

const initialData: { user: User | null; token: string } = {
  user: null,
  token: '',
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: initialData.user,
      token: initialData.token,

      login: async (credentials: LoginCredentials) => {
        const loginResponse = await login(credentials)
        const userResponse = await getCurrentUser()

        refreshCsrfToken()

        set({ user: userResponse, token: loginResponse.key })
      },

      register: async (registerData: RegisterData) => {
        await register(registerData)
      },

      logout: async () => {
        await logout()

        refreshCsrfToken()

        set({ ...initialData })
      },

      isAuth: () => {
        return !!(get().token && get().token.length > 0)
      },

      reset: () => set({ ...initialData }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
