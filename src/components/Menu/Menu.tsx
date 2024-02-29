import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sLogo from '@/assets/Logos/logo-s.png'
import mLogo from '@/assets/Logos/logo-m.png'

import burgerMenu from '@/assets/Logos/menu-open.png'

import homeIcon from '@/assets/Icons/home.png'
import homeAcIcon from '@/assets/Icons/home-on.png'

import calendarIcon from '@/assets/Icons/calendar.png'
import calendarAcIcon from '@/assets/Icons/calendar-on.png'

import favoriteIcon from '@/assets/Icons/favorites.png'
import favoriteAcIcon from '@/assets/Icons/favorites-on.png'

import statsIcon from '@/assets/Icons/statistics.png'
import statsAcIcon from '@/assets/Icons/statistics-on.png'

import settingsIcon from '@/assets/Icons/settings.png'
import settingsAcIcon from '@/assets/Icons/settings-on.png'

import { MenuLink } from './MenuLink'
import { ProfileLink } from './ProfileLink'
import './Menu.css'

export function Menu() {
  const [isExpanded, setIsExpanded] = useState(false)

  const navigate = useNavigate()

  function handleIsExpanded() {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='menu'>
      <div className='menu-head'>
        <img className='menu-head__logo--m' src={mLogo} />
        <img className='menu-head__logo--s' src={sLogo} />
        <button className='menu-head__burger-button' onClick={handleIsExpanded}>
          <img src={burgerMenu} />
        </button>
      </div>

      <div className={`menu__expandable${!isExpanded ? ' menu__expandable--hidden' : ''}`}>
        <div className='menu__separator' />

        <div className='menu-content'>
          <MenuLink
            iconActive={homeAcIcon}
            icon={homeIcon}
            active={true}
            text='Blog'
            onClick={() => {
              navigate('/')
            }}
          />
          <MenuLink
            iconActive={calendarAcIcon}
            icon={calendarIcon}
            active={false}
            text='Calendar'
          />
          <MenuLink
            iconActive={favoriteAcIcon}
            icon={favoriteIcon}
            active={false}
            text='Favorites'
          />
          <MenuLink iconActive={statsAcIcon} icon={statsIcon} active={false} text='Statistics' />

          <MenuLink
            iconActive={settingsAcIcon}
            icon={settingsIcon}
            active={false}
            text='Settings'
          />
        </div>

        <div className='menu__separator' />

        <div className='menu-footer'>
          <ProfileLink />
        </div>
      </div>
    </div>
  )
}
