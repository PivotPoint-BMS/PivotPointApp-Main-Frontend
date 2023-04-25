/* eslint-disable no-constant-condition */
import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
import { collapse, extend, NavItemConfig } from 'store/slices/sideBarSlice'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// Components
import { Scrollbar } from 'components'
import NavItemOne from './NavItemOne'
import SubNavItemTwo from './SubNavItemTwo'

const getSubItems = (items: NavItemConfig[], path: string) => {
  const activePath = path.split('/')[2]
  const activeItem = items.filter((item) => item.href === `${PATH_DASHBOARD.root}/${activePath}`)

  if (!activeItem[0]) return null
  return activeItem[0].subItems
}

function SideBar() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { items, isCollapsed } = useAppSelector((state) => state.sideBar)
  const dispatch = useAppDispatch()

  const { t, locale } = useTranslate()

  const subItems = useMemo(() => getSubItems(items, router.pathname), [router.pathname])

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleCollapse = () => {
    if (isCollapsed) {
      dispatch(extend())
    } else {
      dispatch(collapse())
    }
  }
  return (
    <div
      className='relative z-50 h-screen'
      style={{
        // eslint-disable-next-line no-nested-ternary
        width: subItems
          ? isCollapsed
            ? NAVBAR.MAIN_NAVBAR_WIDTH + NAVBAR.SECONDARY_NAVBAR_COLLAPSE_WIDTH
            : NAVBAR.MAIN_NAVBAR_WIDTH + NAVBAR.SECONDARY_NAVBAR_WIDTH
          : NAVBAR.MAIN_NAVBAR_WIDTH,
      }}
    >
      <div
        className='group fixed z-10 flex h-screen flex-col items-start border-dashed border-gray-400 bg-white py-6 px-4 transition-all ltr:border-r rtl:border-l motion-reduce:transition-none dark:border-gray-500 dark:bg-dark'
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
      </div>
      {subItems && (
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: isCollapsed
              ? NAVBAR.SECONDARY_NAVBAR_COLLAPSE_WIDTH
              : NAVBAR.SECONDARY_NAVBAR_WIDTH,
          }}
          whileHover={{ width: NAVBAR.SECONDARY_NAVBAR_WIDTH }}
          transition={{ duration: 0.2 }}
          className='group fixed top-0 flex h-screen flex-col border-dashed border-gray-400 bg-secondary-600 text-white ltr:left-0 ltr:border-r rtl:right-0 dark:border-gray-500 dark:bg-secondary-900'
          style={{
            marginLeft: locale === 'ar' ? 0 : NAVBAR.MAIN_NAVBAR_WIDTH,
            marginRight: locale === 'ar' ? NAVBAR.MAIN_NAVBAR_WIDTH : 0,
          }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div
              className={clsx(
                'mb-16  mt-5 flex w-full px-5',
                isCollapsed ? 'justify-center group-hover:justify-end' : 'justify-end'
              )}
            >
              <button
                className='group/collapse rounded-full p-2 outline-0 hover:bg-secondary-500/10 dark:hover:bg-secondary-300/10'
                onClick={toggleCollapse}
              >
                <Iconify
                  icon='system-uicons:window-collapse-left'
                  className={clsx(
                    'transition-all group-hover/collapse:scale-110 motion-reduce:transition-none',
                    isCollapsed && 'rotate-180'
                  )}
                  height={18}
                  width={18}
                />
              </button>
            </div>
            <Scrollbar tabIndex={-1} className='h-full px-5 pb-10' style={{ maxHeight: '100vh' }}>
              <div className='flex flex-col gap-4'>
                {subItems.map(({ name, href, icon, badge, disabled }, i) => (
                  <SubNavItemTwo
                    key={i}
                    name={t(name)}
                    href={href}
                    icon={icon}
                    badge={badge}
                    disabled={disabled as boolean}
                    isCollapsed={isCollapsed}
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
