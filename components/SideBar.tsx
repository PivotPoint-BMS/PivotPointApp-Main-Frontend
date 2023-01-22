import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import SimpleBarReact from 'simplebar-react'

// Icons
import { AiFillDashboard } from 'react-icons/ai'
import { IoLogOut } from 'react-icons/io5'
import { RiCustomerService2Fill, RiSettings3Fill } from 'react-icons/ri'
import { MdContacts, MdGroups, MdInventory, MdPerson } from 'react-icons/md'
import { BsKanbanFill } from 'react-icons/bs'
import { FaMoneyCheckAlt, FaTruckLoading } from 'react-icons/fa'

// Components
import NavItem from './NavItem'

// Assets
import logo from '../public/logo.svg'
// import 'simplebar-react/dist/simplebar.min.css'

function SideBar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='relative'>
      <div className='group absolute z-10 flex h-screen w-max flex-col items-start border-r border-dashed border-gray-400 bg-white py-6 px-4 transition-all dark:border-gray-600 dark:bg-primary-900'>
        <Image src={logo} alt='logo' className='mt-4 mb-12 aspect-auto h-10 w-full' />
        <nav className='flex w-full flex-1 flex-col items-center gap-2'>
          <NavItem tooltip='CRM' icon={<RiCustomerService2Fill size={24} />} href='/crm' asLink />
          <NavItem tooltip='HRM' icon={<MdGroups size={24} />} href='/hrm' asLink />
          <NavItem tooltip='PM' icon={<BsKanbanFill size={24} />} href='/pm' asLink />
          <NavItem tooltip='IM' icon={<MdInventory size={24} />} href='/im' asLink />
          <NavItem tooltip='SCM' icon={<FaTruckLoading size={24} />} href='/scm' asLink />
          <NavItem tooltip='FM' icon={<FaMoneyCheckAlt size={24} />} href='/fm' asLink />
        </nav>
        <div className='flex flex-col items-center justify-between gap-2'>
          {mounted && (
            <NavItem
              icon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  height={24}
                  width={24}
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
              tooltip='Toggle Dark Mode'
            />
          )}
          <NavItem icon={<RiSettings3Fill size={24} />} tooltip='Settings' />
          <NavItem icon={<IoLogOut size={24} />} tooltip='Logout' />
        </div>
      </div>
      <div className='ml-[88px] flex h-screen w-max flex-col bg-secondary-100 dark:bg-secondary-900 dark:text-white'>
        <SimpleBarReact className='h-full px-5'>
          <h1 className='mb-5 mt-28 font-medium'>General</h1>
          <div className='flex flex-col items-center gap-4'>
            <Link
              href='#'
              className={clsx(
                'flex w-full items-center gap-3 rounded-xl py-3 px-5',
                true
                  ? 'bg-secondary-600 text-gray-200 hover:bg-secondary-700 dark:text-gray-100'
                  : 'bg-gray-100/40 text-secondary-600 hover:bg-gray-100/60 dark:bg-secondary-100/60 dark:text-gray-300 dark:hover:bg-secondary-200/50'
              )}
            >
              <AiFillDashboard size={24} />
              <h4 className='text-sm'>Dashboard</h4>
            </Link>
            <Link
              href='#'
              className={clsx(
                'flex w-full items-center gap-3 rounded-xl py-3 px-4',
                false
                  ? 'bg-secondary-600 text-gray-200 dark:text-gray-100'
                  : 'bg-gray-100/40 text-secondary-600 hover:bg-gray-100/60 dark:bg-secondary-100/60 dark:text-gray-300 dark:hover:bg-secondary-200/50'
              )}
            >
              <MdPerson size={24} />
              <h4 className='text-sm'>Leads</h4>
            </Link>
            <Link
              href='#'
              className={clsx(
                'flex w-full items-center gap-3 rounded-xl py-3 px-4',
                false
                  ? 'bg-secondary-600 text-gray-200 dark:text-gray-100'
                  : 'bg-gray-100/40 text-secondary-600 hover:bg-gray-100/60 dark:bg-secondary-100/60 dark:text-gray-300 dark:hover:bg-secondary-200/50'
              )}
            >
              <MdContacts size={24} />
              <h4 className='text-sm'>Contact</h4>
            </Link>
          </div>
        </SimpleBarReact>
      </div>
    </div>
  )
}

export default SideBar
