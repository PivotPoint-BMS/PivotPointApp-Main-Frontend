import { useState, useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// hooks
import Login from 'pages/auth/Login'
// components
import LoadingScreen from '../components/LoadingScreen'

export default function AuthGuard({ children }) {
  // const { isAuthenticated, isInitialized } = useAuth()

  const { pathname, push } = useRouter()

  const [requestedLocation, setRequestedLocation] = useState(null)

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null)
      push(requestedLocation)
    }
  }, [pathname, push, requestedLocation])

  // if (!isInitialized) {
  //   return <LoadingScreen />
  // }

  // if (!isAuthenticated) {
  //   if (pathname !== requestedLocation) {
  //     setRequestedLocation(pathname)
  //   }
  //   return <Login />
  // }

  return <>{children}</>
}
