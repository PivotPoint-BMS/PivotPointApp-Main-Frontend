import React, { useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
// guards
import AuthGuard from 'guards/AuthGuard'
// hooks
import useResponsive from 'hooks/useResponsive'
import useTranslate from 'hooks/useTranslate'
import { useAppSelector } from 'store/hooks'
// routes
import { PATH_ACCOUNT } from 'routes/paths'
// config
import { HEADER } from 'config'
// components
import AlertDialog from 'components/AlertDialog'
import Header from './app/header/Header'
import SidebarDesktop from './app/nav/SidebarDesktop'
import SidebarMobile from './app/nav/SidebarMobile'
import LogoOnlyLayout from './LogoOnlyLayout'

function Layout({
  children,
  variant = 'dashboard',
}: {
  children: React.ReactNode | React.ReactNode[]
  variant: 'dashboard' | 'logoOnly' | 'main'
}) {
  const { t } = useTranslate()
  const { push } = useRouter()
  const { user } = useAppSelector((state) => state.session)
  const [openDialog, setOpenDialog] = useState(Boolean(user?.hasToChangePassword))

  useEffect(() => {
    if (user) setOpenDialog(user.hasToChangePassword)
  }, [user])

  const isDesktop = useResponsive('lg', 'up')

  if (variant === 'main') {
    return <> {children} </>
  }

  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>
  }

  return (
    <AuthGuard>
      <div className='flex h-screen w-screen'>
        {!isDesktop && <Header />}
        {isDesktop ? <SidebarDesktop /> : <SidebarMobile />}
        <main
          className='mt-5 flex-1 overflow-x-hidden'
          style={{ marginTop: !isDesktop ? HEADER.MAIN_DESKTOP_HEIGHT : 20 }}
        >
          {children}
        </main>
      </div>
      <AlertDialog
        open={openDialog}
        title={t('Temporary Password')}
        description={
          <p className='py-2 text-sm'>
            {t('You have a temporary password. For your security, please change your password ')}
          </p>
        }
        confirmText={t('Proceed to password change')}
        onConfirm={() => {
          push({
            pathname: PATH_ACCOUNT.profile,
            query: { tab: 'password' },
          })
          setOpenDialog(false)
        }}
        onClose={() => {}}
      />
    </AuthGuard>
  )
}

export default Layout
