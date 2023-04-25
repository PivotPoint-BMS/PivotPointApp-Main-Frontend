/* eslint-disable no-constant-condition */
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, Variant } from 'framer-motion'
import clsx from 'clsx'
// config
import { NAVBAR } from 'config'
// icons
import { Icon as Iconify } from '@iconify/react'
// assets
import logo from 'public/logo.svg'
// hooks
import useTranslate from 'hooks/useTranslate'
// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { close } from 'store/slices/sideBarSlice'
// Components
import { Scrollbar, IconButton } from 'components'
import MobileNavItem from './MobileNavItem'

export default function SidebarMobile() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [opened, setOpened] = useState(false)
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
          className='z-50 m-0 h-screen border-r border-dashed border-gray-400 bg-white py-6 px-4 transition-all delay-100 dark:border-gray-600 dark:bg-secondary-900'
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
                <MobileNavItem
                  key={i}
                  name={t(item.name)}
                  icon={<Iconify icon={item.icon} height={22} width={22} />}
                  href={item.href}
                  asLink
                  subItems={item.subItems}
                  onClick={handleClose}
                />
              ))}
            </nav>
          </div>
          <div className='flex w-full flex-col items-start justify-between gap-2'>
            {mounted && (
              <MobileNavItem
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
