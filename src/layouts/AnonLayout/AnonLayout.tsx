import { Outlet } from 'react-router-dom'
import './AnonLayout.css'
export function AnonLayout() {
  return (
    <div className='anon-layout'>
      <main role='main'>
        <Outlet />
      </main>
    </div>
  )
}
