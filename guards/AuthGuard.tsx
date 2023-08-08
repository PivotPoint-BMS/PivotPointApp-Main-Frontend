import React, { useState, useEffect } from "react"
// next
import { useRouter } from "next/router"
// hooks
import { useAppDispatch, useAppSelector } from "store/hooks"
import { useGetUserMutation } from "store/api/auth/authApi"
// store
import { stopLoading } from "store/slices/sessionSlice"
// pages
import Login from "pages/auth/login"
import CompanySetup from "pages/auth/company-setup"
import Payment from "pages/auth/payment"
// components
import { LoadingScreen } from "components"

export default function AuthGuard({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const { pathname } = useRouter()
  const dispatch = useAppDispatch()
  const { user, isLoading, refreshToken } = useAppSelector((state) => state.session)
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null)
  const [getUser] = useGetUserMutation()

  useEffect(() => {
    if (!user && refreshToken) getUser(refreshToken)
    else dispatch(stopLoading())
  }, [pathname, requestedLocation, refreshToken, user])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isLoading && !user) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <Login />
  }

  if (user && (!user.hasSetupCompany || user.currentStep > 0)) {
    return <CompanySetup />
  }

  if (user && !user.hasPaidSubscription) {
    return <Payment />
  }

  return <>{children}</>
}
