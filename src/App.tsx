import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthLayout, AnonLayout } from '@/layouts'
import { Home, Login, Register, Post } from '@/pages'

import { refreshCsrfToken } from '@/utils/csrf'

import { useAuth } from '@/hooks/useAuth'

function App() {
  const { isAuth } = useAuth()

  useEffect(() => {
    refreshCsrfToken()
    const intervalId = setInterval(refreshCsrfToken, 60000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Routes>
      {isAuth() ? (
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Home />} />
          <Route path='post/:postId' element={<Post />} />
        </Route>
      ) : (
        <Route path='/' element={<AnonLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      )}
    </Routes>
  )
}

export default App
