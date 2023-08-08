/* eslint-disable no-constant-condition */
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { motion, Variant } from 'framer-motion'
// next
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
// config
import { LANGS, NAVBAR, PIVOTPOINT_API } from 'config'
// icons
import { Icon as Iconify } from '@iconify/react'
// assets
import logo from 'public/logo.svg'
// redux
import { logout } from 'store/slices/sessionSlice'
// routes
import { PATH_ACCOUNT, PATH_AUTH } from 'routes/paths'
// hooks
import useTranslate from 'hooks/useTranslate'
// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { close } from 'store/slices/sideBarSlice'
// Components
import { Scrollbar, IconButton } from 'components'
import NavItem from './NavItem'

export default function SidebarMobile() {
  const { theme, setTheme } = useTheme()
  const { pathname, push, asPath, query } = useRouter()
  const [mounted, setMounted] = useState(false)
  const [opened, setOpened] = useState(false)
  const { user } = useAppSelector((state) => state.session)
  const { items, isOpen } = useAppSelector((state) => state.sideBar)
  const dispatch = useAppDispatch()
  const { t, locale } = useTranslate()

  const variants: { [key: string]: Variant } = {
    closed: { x: locale === 'ar' ? '100%' : '-100%' },
    opened: { x: '0%' },
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setOpened(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpened(false)
    setTimeout(() => {
      dispatch(close())
    }, 200)
  }

  const changeLocale = (nextLocale: string) => {
    push({ pathname, query }, asPath, { locale: nextLocale })
  }

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 z-50 flex h-screen w-screen backdrop-blur-sm transition-all',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <motion.div
        initial='closed'
        animate={opened ? 'opened' : 'closed'}
        variants={variants}
        transition={{ type: 'keyframes' }}
      >
        <Scrollbar
          className='z-50 m-0 h-screen border-r border-dashed bg-white py-6 px-4 transition-all delay-100 dark:border-gray-600 dark:bg-paper-dark'
          style={{ width: NAVBAR.MAIN_NAVBAR_WIDTH_MOBILE }}
        >
          <div className='flex flex-col items-start'>
            <div className='mt-4 mb-12 flex w-full items-center justify-between'>
              <Link href='/' onClick={handleClose}>
                <Image src={logo} alt='logo' className='h-10 w-16' />
              </Link>
              <IconButton onClick={handleClose}>
                <Iconify icon='ion:close' height={24} width={24} />
              </IconButton>
            </div>
            <nav className='flex w-full flex-1 flex-col items-start gap-2'>
              {items.map((item, i) => (
                <NavItem
                  key={i}
                  name={t(item.name)}
                  icon={<Iconify icon={item.icon} height={22} width={22} />}
                  href={item.href}
                  asLink
                  subItems={item.subItems}
                  onClick={handleClose}
                  disabled={item.disabled}
                  roles={item.roles}
                />
              ))}
            </nav>
          </div>

          <div className='flex w-full flex-col items-start justify-between gap-1'>
            <NavItem
              href='#'
              name={`${user?.firstName} ${user?.lastName}`}
              icon={
                <div className='relative h-[22px] w-[22px] '>
                  {user && user?.profilePicture && user?.profilePicture !== '' ? (
                    <Image
                      alt='avatar'
                      width={22}
                      height={22}
                      src={`${PIVOTPOINT_API.profilePicUrl}/${user?.profilePicture}`}
                      className='aspect-square rounded-full object-cover'
                    />
                  ) : (
                    <Iconify
                      icon='heroicons:user-circle-20-solid'
                      className='absolute top-0 right-0'
                      height={22}
                      width={22}
                    />
                  )}
                </div>
              }
              asLink
              subItems={[
                {
                  name: 'Profile',
                  href: PATH_ACCOUNT.profile,
                  icon: 'ion:person-circle',
                  onClick: () => {
                    handleClose()
                  },
                },
                {
                  name: 'Company',
                  href: PATH_ACCOUNT.company,
                  icon: 'ion:settings',
                  onClick: () => {
                    handleClose()
                  },
                  disabled: !user?.isOwner,
                },
                {
                  name: 'Logout',
                  onClick: () => {
                    handleClose()
                    dispatch(logout())
                    push(PATH_AUTH.login)
                  },
                  icon: 'ion:exit',
                },
              ]}
            />
            <NavItem
              href='#'
              name={t('Language')}
              icon={<Iconify icon='fluent:globe-16-filled' height={22} width={22} />}
              asLink
              subItems={LANGS.map((language) => ({
                name: language.label,
                onClick: () => {
                  changeLocale(language.value)
                  handleClose()
                },
              }))}
            />
            {mounted && (
              <NavItem
                icon={
                  <Iconify
                    icon={theme === 'dark' ? 'tabler:sun-filled' : 'ph:moon-fill'}
                    height={22}
                    width={22}
                  />
                }
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                name={theme === 'dark' ? t('Light Mode') : t('Dark Mode')}
              />
            )}
          </div>
        </Scrollbar>
      </motion.div>
      <div className='flex-1' onClick={handleClose}></div>
    </div>
  )
}
