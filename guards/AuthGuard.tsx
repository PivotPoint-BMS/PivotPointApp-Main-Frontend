import React, { useState, useEffect } from 'react'
// next
import { useRouter } from 'next/router'
// hooks
import { useAppSelector } from 'store/hooks'
import { useGetUserMutation } from 'store/api/authApi'
// utils
// import { isValidToken } from 'utils/jwt'
// import { getTemporaryItem } from 'utils/localStorage'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// pages
import Login from 'pages/auth/login'
import CompanySetup from 'pages/auth/company-setup'
import Payment from 'pages/auth/payment'
// components
import LoadingScreen from '@/components/LoadingScreen'

export default function AuthGuard({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const { pathname, push } = useRouter()
  const { user, isLoading, refreshToken } = useAppSelector((state) => state.session)

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null)
  const [getUser] = useGetUserMutation()

  useEffect(() => {
    if (!user && refreshToken) getUser(refreshToken)
    else if (user && user.hasPaidSubscription && requestedLocation?.includes('auth')) {
      push(PATH_DASHBOARD.root)
    } else if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null)
      push(requestedLocation)
    }
  }, [pathname, push, requestedLocation, refreshToken])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isLoading && !user) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <Login />
  }

  if (user && !user.hasSetupCompany) {
    return <CompanySetup />
  }

  if (user && !user.hasPaidSubscription) {
    return <Payment />
  }

  return <>{children}</>
}
