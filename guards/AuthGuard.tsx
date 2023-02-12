import React, { useState, useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// hooks
import { useAppSelector } from 'store/hooks'
// utils
// import { isValidToken } from 'utils/jwt'
// import { getTemporaryItem } from 'utils/localStorage'
// pages
import Login from 'pages/auth/login'
import CompanySetup from 'pages/auth/company-setup'
// components
// import LoadingScreen from '../components/LoadingScreen'

export default function AuthGuard({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const { pathname, push } = useRouter()
  const { user, isLoading } = useAppSelector((state) => state.session)

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null)

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       const token = getTemporaryItem('token')

  //       if (token && isValidToken(token)) {
  //         const response = await axios.get('/api/account/my-account')
  //         const { user } = response.data

  //         dispatch({
  //           type: 'INITIALIZE',
  //           payload: {
  //             isAuthenticated: true,
  //             user,
  //           },
  //         })
  //       } else {
  //         dispatch({
  //           type: 'INITIALIZE',
  //           payload: {
  //             isAuthenticated: false,
  //             user: null,
  //           },
  //         })
  //       }
  //     } catch (err) {
  //       console.error(err)
  //       dispatch({
  //         type: 'INITIALIZE',
  //         payload: {
  //           isAuthenticated: false,
  //           user: null,
  //         },
  //       })
  //     }
  //   }

  //   initialize()
  // }, [])

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null)
      push(requestedLocation)
    }
  }, [pathname, push, requestedLocation])

  if (isLoading) {
    // return <LoadingScreen />
    return <div>Loading...</div>
  }

  if (!isLoading && !user) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <Login />
  }

  if (user && !user?.hasSetupCompany) return <CompanySetup />

  return <>{children}</>
}
