import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { LoginComponent } from './LoginComponent'
import './Login.css'

import { useAuth } from '@/hooks/useAuth'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleLogin(username: string, password: string) {
    const credentials: LoginCredentials = { username, password }

    try {
      await login(credentials)
      toast.success('Login successful', { position: 'top-right' })

      // Redirect to home page
      navigate('/', { replace: true })
    } catch (error) {
      toast.error('Login failed', { position: 'top-right' })
    }
  }

  return (
    <>
      <LoginComponent handleLogin={handleLogin} />
    </>
  )
}
