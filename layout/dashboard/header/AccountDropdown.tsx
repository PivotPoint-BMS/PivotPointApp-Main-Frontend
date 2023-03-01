import React from 'react'
import clsx from 'clsx'
// next
import { useRouter } from 'next/router'
import Link from 'next/link'
// radix
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { PATH_ACCOUNT, PATH_AUTH } from 'routes/paths'
// store
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { logout } from 'store/slices/sessionSlice'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon as Iconify } from '@iconify/react'
import IconButton from '@/components/IconButton'
import Button from '@/components/Button'

export default function AccountDropdown() {
  const { push } = useRouter()
  const { t, locale } = useTranslate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.session)

  const handleLogout = () => {
    dispatch(logout())
    push(PATH_AUTH.login)
  }

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className='outline-none'>
        <IconButton className='group'>
          <Iconify
            icon='heroicons:user-circle-20-solid'
            className='transition-all group-hover:scale-110 motion-reduce:transition-none'
            height={24}
            width={24}
          />
        </IconButton>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={locale === 'ar' ? 'start' : 'end'}
          side='top'
          sideOffset={5}
          className={clsx(
            'data-[side=top]:animate-slide-up data-[side=bottom]:animate-slide-down',
            'z-50 rounded-lg shadow-md',
            'bg-paper-light dark:bg-paper-dark',
            'divide-y',
            'border border-dashed border-gray-400 dark:border-gray-500'
          )}
        >
          <div className='p-3'>
            <p className='text-sm font-medium'>
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className='flex flex-col items-center justify-center gap-2 p-2'>
            <Link href={PATH_ACCOUNT.profile} className='w-full'>
              <Button variant='text' intent='default' className='w-full'>
                <DropdownMenuPrimitive.Item className='w-full'>
                  {t('Profile')}
                </DropdownMenuPrimitive.Item>
              </Button>
            </Link>
            <Link href={PATH_ACCOUNT.settings} className='w-full'>
              <Button variant='text' intent='default' className='w-full'>
                <DropdownMenuPrimitive.Item>{t('Settings')}</DropdownMenuPrimitive.Item>
              </Button>
            </Link>
          </div>
          <div className='p-2'>
            <Button variant='outlined' intent='default' className='w-full' onClick={handleLogout}>
              {t('Logout')}
            </Button>
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
