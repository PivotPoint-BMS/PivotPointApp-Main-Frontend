// next
import Link from 'next/link'
// hooks
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// types
import { Supplier } from 'types'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
// components
import { Icon as Iconify } from '@iconify/react'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import IconButton from 'components/IconButton'
import Image from 'components/Image'

export default function GeneralInfo({ supplier }: { supplier: Supplier }) {
  const { t } = useTranslate()

  return (
    <Card fullWidth variant='default' className='rounded-none !bg-transparent'>
      <CardContent className='p-0'>
        <div className='mb-4 flex items-center gap-2 px-4'>
          <Link href={`${PATH_DASHBOARD.scm.suppliers}`}>
            <IconButton>
              <Iconify
                icon='material-symbols:arrow-back-ios-new-rounded'
                height={20}
                className='rtl:rotate-180'
              />
            </IconButton>
          </Link>
          <h1 className='text-lg font-semibold'>{t('Back to Suppliers')}</h1>
        </div>
        <div className='p- flex flex-col items-center gap-3 p-4'>
          <Image
            alt='avatar'
            width={100}
            height={100}
            src={avatarPlaceholder.src}
            className='aspect-square rounded-full object-cover'
          />
          <h1 className='text-center text-lg font-semibold'>{supplier.name}</h1>
        </div>
        <div className='flex flex-col gap-3 border-t p-4 dark:border-gray-600'>
          <div className='flex flex-col gap-1 truncate'>
            <h6 className='text-sm text-gray-600 dark:text-gray-400'>{t('Email')}</h6>
            <p className='truncate text-[15px]'>{supplier.email}</p>
          </div>
          <div className='flex flex-col gap-1 truncate'>
            <h6 className='text-sm text-gray-600 dark:text-gray-400'>{t('Phone Number')}</h6>
            <p className='truncate text-[15px]'>{supplier.phoneNumber}</p>
          </div>
          <div className='flex flex-col gap-1 truncate'>
            <h6 className='text-sm text-gray-600 dark:text-gray-400'>{t('Address')}</h6>
            <p className='truncate text-[15px]'>{supplier.address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
