interface MenuLinkProps {
  iconActive: string
  icon: string
  active: boolean
  text: string
  onClick?: () => void
}

export function MenuLink(props: MenuLinkProps) {
  const { iconActive, icon, active, text, onClick = () => {} } = props

  return (
    <a className={`menu__link${active ? ' menu__link--active' : ''}`} onClick={onClick}>
      <img src={active ? iconActive : icon} />
      <p>{text}</p>
    </a>
  )
}
