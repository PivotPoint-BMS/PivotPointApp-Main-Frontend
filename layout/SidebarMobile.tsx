/* eslint-disable no-constant-condition */
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
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
import { close } from 'store/sideBarSlice'
// Components
import MobileNavItem from './MobileNavItem'
import Scrollbar from '@/components/Scrollbar'

export default function SidebarMobile() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { items, isOpen } = useAppSelector((state) => state.sideBarConfig)
  const dispatch = useAppDispatch()
  const { t } = useTranslate()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 z-50 flex h-screen w-screen backdrop-blur-sm',
        isOpen ? 'block' : 'hidden'
      )}
    >
      <Scrollbar
        className='z-50 m-0 h-screen border-r border-dashed border-gray-400 bg-white py-6 px-4 transition-all delay-100 dark:border-gray-600 dark:bg-primary-900'
        style={{ width: isOpen ? NAVBAR.MAIN_NAVBAR_WIDTH_MOBILE : 0 }}
      >
        <div className='flex flex-col items-start'>
          <Link href='/' className='mt-4 mb-12 w-full'>
            <Image src={logo} alt='logo' className='aspect-auto h-10 w-full' />
          </Link>
          <nav className='flex w-full flex-1 flex-col items-start gap-2'>
            {items.map((item, i) => (
              <MobileNavItem
                key={i}
                name={t(item.name)}
                icon={<Iconify icon={item.icon} height={22} width={22} />}
                href={item.href}
                asLink
                subItems={item.subItems}
              />
            ))}
          </nav>
        </div>
        <div className='flex w-full flex-col items-start justify-between gap-2'>
          {mounted && (
            <MobileNavItem
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  height={22}
                  width={22}
                  className='stroke-primary-900 stroke-[0.5px] dark:stroke-white'
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                >
                  {theme === 'dark' && (
                    <motion.path
                      d='M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2 c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z'
                      initial={{ pathLength: 0, fill: 'rgba(255, 255, 255, 0)' }}
                      animate={{ pathLength: 1, fill: 'rgba(255, 255, 255, 1)' }}
                      transition={{ duration: 1, type: 'keyframes' }}
                    />
                  )}
                  {theme === 'light' && (
                    <motion.path
                      d='M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z'
                      initial={{ pathLength: 0, fill: 'rgba(13, 34, 55, 0)' }}
                      animate={{ pathLength: 1, fill: 'rgba(13, 34, 55, 1)' }}
                      transition={{ duration: 1, type: 'keyframes' }}
                    />
                  )}
                </svg>
              }
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              name={theme === 'dark' ? t('Light Mode') : t('Dark Mode')}
            />
          )}
          <MobileNavItem
            icon={<Iconify icon='ri:settings-3-fill' height={22} width={22} />}
            name={t('Settings')}
          />
          <MobileNavItem
            icon={<Iconify icon='majesticons:logout' height={22} width={22} />}
            name={t('Logout')}
          />
        </div>
      </Scrollbar>
      <div
        className='flex-1'
        onClick={(e) => {
          e.stopPropagation()
          dispatch(close())
        }}
      ></div>
    </div>
  )
}
