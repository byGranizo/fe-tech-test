import logo from '@/assets/Logos/logo-l.png'
import loginIMG from '@/assets/Illustrations/home.png'
import { Link } from 'react-router-dom'
import './Login.css'

interface LoginComponentProps {
  handleLogin: (user: string, password: string) => void
}

export function LoginComponent(props: LoginComponentProps) {
  const { handleLogin } = props

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = e.currentTarget.username.value
    const password = e.currentTarget.password.value
    handleLogin(user, password)
  }

  return (
    <div className='login'>
      <div className='login-head'>
        <img src={logo} alt='Logo' />
        <h1>Front-end development blog</h1>
      </div>
      <p className='welcome-card'>
        Hello code enthusiasts and Ul lovers' In this digital corner, we welcome you to our blog
        dedicated to the fascinating universe of front-end development. Here, we'll explore the
        latest trends, best practices, and most innovative tools that bring the face of the web to
        life.
      </p>
      <div className='login-content'>
        <img src={loginIMG} alt='Login' />
        <div className='login-form'>
          <h3 className='login-form__head'>Login</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input id='username' type='text' required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input id='password' type='password' required />
            </div>

            <button type='submit'>Login</button>
            <div className='form-text'>
              <p>Don't have an account</p>
              <Link to='/register' aria-label='Register for an account'>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
