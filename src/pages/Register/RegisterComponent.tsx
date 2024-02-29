import logo from '@/assets/Logos/logo-l.png'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export function RegisterComponent() {
  const { register } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const first_name = e.currentTarget.first_name.value
    const last_name = e.currentTarget.last_name.value
    const password1 = e.currentTarget.password1.value
    const password2 = e.currentTarget.password2.value

    const registerData: RegisterData = {
      username,
      first_name,
      last_name,
      password1,
      password2,
    }

    try {
      await register(registerData)
      toast.success('Register successful', { position: 'top-right' })

      navigate('/', { replace: true })
    } catch (error) {
      toast.error('Register failed', { position: 'top-right' })
    }
  }

  return (
    <div className='register'>
      <div className='register-head'>
        <img src={logo} />
        <h1>Front-end development blog</h1>
      </div>
      <p className='welcome-card'>
        Register to collaborate on our blog and stay up to date with all the news in the sector.
      </p>
      <div className='register-form'>
        <h3 className='register-form__head'>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>username</label>
            <input id='username' type='text' />
          </div>
          <div className='form-group'>
            <label htmlFor='first_name'>First name</label>
            <input id='first_name' type='text' />
          </div>
          <div className='form-group'>
            <label htmlFor='last_name'>Last name</label>
            <input id='last_name' type='text' />
          </div>
          <div className='form-group'>
            <label htmlFor='password1'>Password</label>
            <input id='password1' type='password' />
          </div>
          <div className='form-group'>
            <label htmlFor='password2'>Confirm Password</label>
            <input id='password2' type='password' />
          </div>
          <button type='submit'>Login</button>
          <div className='form-text'>
            <p>Have an account?</p>
            <Link to='/' aria-label='Login to your account'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
