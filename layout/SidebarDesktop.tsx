/* eslint-disable no-constant-condition */
import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
// config
import { NAVBAR } from 'config'
// icons
import { Icon as Iconify } from '@iconify/react'
// assets
import logo from 'public/logo.svg'
// hooks
import useTranslate from 'hooks/useTranslate'
// redux
import { useAppSelector } from '../store/hooks'
import { NavItemConfig } from '../store/sideBarSlice'
// Components
import Scrollbar from '@/components/Scrollbar'
import NavItemOne from './NavItemOne'
import NavItemTwo from './NavItemTwo'

const getSubItems = (items: NavItemConfig[], path: string) => {
  const activePath = path.split('/')[1]
  const activeItem = items.filter((item) => item.href === `/${activePath}`)

  if (!activeItem[0]) return null
  return activeItem[0].subItems
}

function SideBar() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { items } = useAppSelector((state) => state.sideBarConfig)

  const { t } = useTranslate()

  const subItems = useMemo(() => getSubItems(items, router.pathname), [router.pathname])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className='relative h-screen'
      style={{ width: NAVBAR.MAIN_NAVBAR_WIDTH + NAVBAR.SECONDARY_NAVBAR_WIDTH }}
    >
      <div
        className='group fixed z-10 flex h-screen flex-col items-start border-r border-dashed border-gray-400 bg-white py-6 px-4 transition-all motion-reduce:transition-none dark:border-gray-600 dark:bg-primary-900'
        style={{ minWidth: NAVBAR.MAIN_NAVBAR_WIDTH }}
      >
        <Link href='/' className='mt-4 mb-12 w-full'>
          <Image src={logo} alt='logo' className='aspect-auto h-10 w-full' />
        </Link>
        <nav className='flex w-full flex-1 flex-col items-start gap-2'>
          {items.map((item, i) => (
            <NavItemOne
              key={i}
              name={t(item.name)}
              icon={<Iconify icon={item.icon} height={22} width={22} />}
              href={item.href}
              asLink
            />
          ))}
        </nav>
        <div className='flex w-full flex-col items-start justify-between gap-2'>
          {mounted && (
            <NavItemOne
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
          <NavItemOne
            icon={<Iconify icon='ri:settings-3-fill' height={22} width={22} />}
            name={t('Settings')}
          />
          <NavItemOne
            icon={<Iconify icon='majesticons:logout' height={22} width={22} />}
            name={t('Logout')}
          />
        </div>
      </div>
      {subItems && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: NAVBAR.SECONDARY_NAVBAR_WIDTH }}
          transition={{ duration: 0.2 }}
          className='fixed top-0 left-0 flex h-screen flex-col bg-secondary-100 dark:bg-secondary-900 dark:text-white'
          style={{ marginLeft: NAVBAR.MAIN_NAVBAR_WIDTH }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Scrollbar className='h-full px-5 pb-10' style={{ maxHeight: '100vh' }}>
              <h1 className='mb-5 mt-28 font-medium'>General</h1>
              <div className='flex flex-col gap-4'>
                {subItems.map(({ name, href, icon, badge, disabled }, i) => (
                  <NavItemTwo
                    key={i}
                    name={t(name)}
                    href={href}
                    icon={icon}
                    badge={badge}
                    disabled={disabled as boolean}
                  />
                ))}
              </div>
            </Scrollbar>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default SideBar