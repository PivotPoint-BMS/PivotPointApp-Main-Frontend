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
import { AlertDialog } from 'components'
import Header from './app/header/Header'
import SidebarDesktop from './app/double-sidebar'
import SidebarMobile from './app/mobile-sidebar'
import LogoOnlyLayout from './LogoOnlyLayout'
import SidebarVertical from './app/vertical-sidebar'

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
  const { themeLayout } = useAppSelector((state) => state.settings)
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

  if (themeLayout === 'vertical')
    return (
      <AuthGuard>
        {/* <Alert intent='warning' variant='ghost' className='mb-1 rounded-none'>
          {t(
            'This version of the app is for testing purposes, Please do not use real data as all the databases will be reset'
          )}{' '}
          {moment('06/23/2023').add(90, 'days').fromNow()}{' '}
          {t('when the production version is released')}
        </Alert> */}
        <div className='relative flex'>
          {!isDesktop && <Header />}
          {isDesktop ? <SidebarVertical /> : <SidebarMobile />}
          <main
            className='flex-1 overflow-x-hidden pt-2'
            style={{ marginTop: !isDesktop ? HEADER.MAIN_DESKTOP_HEIGHT : 0 }}
          >
            <div>{children}</div>
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

  return (
    <AuthGuard>
      {/* <div className='px-2 py-1'>
        <Alert intent='warning' variant='ghost' className='!p-1'>
          {t(
            'This version of the app is for testing purposes, Please do not use real data as all the databases will be reset'
          )}{' '}
          {moment('06/23/2023').add(90, 'days').fromNow()}{' '}
          {t('when the production version is released')}
        </Alert>
      </div> */}
      <div className='flex h-screen w-screen'>
        {!isDesktop && <Header />}
        {isDesktop ? <SidebarDesktop /> : <SidebarMobile />}
        <main
          className='flex-1 overflow-x-hidden pt-2'
          style={{ marginTop: !isDesktop ? HEADER.MAIN_DESKTOP_HEIGHT : 0 }}
        >
          <div>{children}</div>
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
