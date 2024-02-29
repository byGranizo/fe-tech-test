import { Outlet } from 'react-router-dom'
import { Menu, Chat } from '@/components'
import './AuthLayout.css'

export function AuthLayout() {
  return (
    <div className='auth-layout'>
      <Menu />
      <main role='main'>
        <Outlet />
        <Chat />
      </main>
    </div>
  )
}
