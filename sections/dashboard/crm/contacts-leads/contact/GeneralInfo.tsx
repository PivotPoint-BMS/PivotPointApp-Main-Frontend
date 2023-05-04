import clsx from 'clsx'
import moment from 'moment'
// next
import Link from 'next/link'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { Lead } from 'types'
// types
import { PATH_DASHBOARD } from 'routes/paths'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
// components
import { Icon as Iconify } from '@iconify/react'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import IconButton from 'components/IconButton'
import Image from 'components/Image'

const TABS = [
  { name: 'Contact Info', value: 'info' },
  { name: 'Address Info', value: 'address' },
]

export default function GeneralInfo({ contact }: { contact: Lead }) {
  const { t, locale } = useTranslate()
  return (
    <Card fullWidth variant='default' className='rounded-none !bg-transparent'>
      <CardContent className='p-0'>
        <div className='mb-4 flex items-center gap-2 px-4'>
          <Link href={`${PATH_DASHBOARD.crm['contacts-leads'].root}?tab=contacts`}>
            <IconButton>
              <Iconify icon='material-symbols:arrow-back-ios-new-rounded' height={20} />
            </IconButton>
          </Link>
          <h1 className='text-lg font-semibold'>{t('Back to Contacts')}</h1>
        </div>
        <div className='p- flex flex-col items-center gap-3 p-4'>
          <Image
            alt='avatar'
            width={100}
            height={100}
            src={avatarPlaceholder.src}
            className='rounded-full'
          />
          <h1 className='text-center text-lg font-semibold'>{contact.fullName}</h1>
          <div className='flex w-full items-center justify-center gap-10'>
            <div className='flex flex-col items-center justify-center gap-1'>
              <IconButton className='border'>
                <Iconify icon='material-symbols:outgoing-mail' height={22} />
              </IconButton>
              <span className='text-[13px] '>{t('Email')}</span>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <IconButton className='border'>
                <Iconify icon='material-symbols:call' height={22} />
              </IconButton>
              <span className='text-[13px] '>{t('Call')}</span>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <IconButton className='border'>
                <Iconify icon='material-symbols:more-horiz' height={22} />
              </IconButton>
              <span className='text-[13px] '>{t('More')}</span>
            </div>
          </div>
          <div className='flex items-start justify-center gap-1'>
            <div className='mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500'></div>
            <p className='text-[13px]'>
              {t('Last activity')}: {moment('2022-06-06').format('DD MMM yyyy, HH:mm a')}
            </p>
          </div>
        </div>
        <TabsPrimitive.Root
          defaultValue='info'
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className='overflow-hidden'
        >
          <TabsPrimitive.List className='flex w-full items-center border-b '>
            {TABS.map((item, i) => (
              <TabsPrimitive.Trigger
                key={i}
                value={item.value}
                className={clsx(
                  'relative flex flex-1 cursor-pointer items-center justify-center gap-3 px-4 pt-3 pb-3 text-sm transition-all',
                  'before:absolute before:bottom-0 before:h-[3px] before:w-full before:rounded-t-full before:bg-primary-600 before:transition-all ltr:before:left-0 rtl:before:right-0',
                  'before:duration-500 data-[state=inactive]:before:w-0',
                  'data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400'
                )}
              >
                <div className='flex w-max cursor-pointer items-center gap-2'>
                  <label className='cursor-pointer font-medium'>{t(item.name)}</label>
                </div>
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          <TabsPrimitive.Content value='info' className='w-full'>
            <div className='flex flex-col gap-3 p-4'>
              <div className='flex flex-col gap-1 truncate'>
                <h6 className='text-sm text-gray-600 dark:text-gray-400'>{t('Email')}</h6>
                <p className='truncate text-[15px]'>guenouziyaniss@gmail.com</p>
              </div>
              <div className='flex flex-col gap-1 truncate'>
                <h6 className='text-sm text-gray-600 dark:text-gray-400'>{t('Phone Number')}</h6>
                <p className='truncate text-[15px]'>0542662874</p>
              </div>
              <div className='flex flex-col gap-1 truncate'>
                <h6 className='text-sm text-gray-600 dark:text-gray-400'>{t('Jon Title')}</h6>
                <p className='truncate text-[15px]'>Developer</p>
              </div>{' '}
              <div className='flex flex-col gap-1 truncate'>
                <h6 className='text-sm text-gray-600 dark:text-gray-400'>{t('Contact Source')}</h6>
                <p className='truncate text-[15px]'>Store</p>
              </div>
            </div>
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='address' className='w-full'>
            <div className='flex flex-col gap-3 p-4'>
              <div className='flex flex-col gap-1 truncate'>
                <h6 className='text-sm text-gray-600 dark:text-gray-400'>{t('City')}</h6>
                <p className='truncate text-[15px]'>Hadjout</p>
              </div>
              <div className='flex flex-col gap-1 truncate'>
                <h6 className='text-sm text-gray-600 dark:text-gray-400'>{t('Country')}</h6>
                <p className='truncate text-[15px]'>Algeria</p>
              </div>
            </div>
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </CardContent>
    </Card>
  )
}
