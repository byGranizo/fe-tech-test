import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

import userPic from '@/assets/UserPic.png'
import logoutIMG from '@/assets/Icons/logout.png'

export function ProfileLink() {
  const { logout, user } = useAuth()

  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      toast.success('Logout successful', { position: 'top-right' })
      navigate('/')
    } catch (error) {
      toast.error('Logout failed', { position: 'top-right' })
    }
  }

  return (
    <div className='menu-user'>
      <img src={userPic} className='menu-user__image' />
      <div className='menu-user__data'>
        <p>
          {user?.first_name} {user?.last_name}
        </p>
        <p>Collaborator</p>
      </div>
      <button className='menu-user__logout' onClick={handleLogout}>
        <img src={logoutIMG} />
      </button>
    </div>
  )
}
