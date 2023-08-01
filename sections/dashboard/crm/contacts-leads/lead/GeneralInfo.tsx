import { useEffect } from 'react'
import clsx from 'clsx'
import moment from 'moment'
// next
import { useRouter } from 'next/router'
import Link from 'next/link'
// radix
import * as TabsPrimitive from '@radix-ui/react-tabs'
// hooks
import { useAppSelector } from 'store/hooks'
import useTranslate from 'hooks/useTranslate'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// types
import { Lead } from 'types'
// api
import {
  useConvertToContactMutation,
  useGetLeadActivitiesQuery,
} from 'store/api/crm/contact-leads/leadApis'
// config
import { PIVOTPOINT_API } from 'config'
// asset
import avatarPlaceholder from 'public/avatar_placeholder.png'
// components
import { Icon as Iconify } from '@iconify/react'
import Button from 'components/Button'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import IconButton from 'components/IconButton'
import Image from 'components/Image'
import useSnackbar from 'hooks/useSnackbar'
import DropdownMenu from 'components/DropdownMenu'

const TABS = [
  { name: 'Lead Info', value: 'info' },
  { name: 'Address Info', value: 'address' },
]

export default function GeneralInfo({ lead }: { lead: Lead }) {
  const { t, locale } = useTranslate()
  const { open } = useSnackbar()
  const { push } = useRouter()
  const { PageNumber, PageSize } = useAppSelector((state) => state.pagination)

  const { data } = useGetLeadActivitiesQuery({
    id: lead.id,
    PageNumber,
    PageSize,
  })

  const [convertToContact, { isLoading, isError, isSuccess }] = useConvertToContactMutation()

  const handleConvertToContact = () => {
    convertToContact({ id: lead.id, PageNumber, PageSize })
  }

  useEffect(() => {
    if (isError) {
      open({
        message: t('A problem has occurred.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isSuccess) {
      open({
        message: t('Lead Added Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
      push({
        pathname: PATH_DASHBOARD.crm['contacts-leads'].root,
        query: { tab: 'contacts' },
      })
    }
  }, [isError, isSuccess])

  return (
    <Card fullWidth variant='default' className='rounded-none !bg-transparent'>
      <CardContent className='p-0'>
        {lead.isContact ? (
          <div className='mb-4 flex items-center gap-2 px-4'>
            <Link href={`${PATH_DASHBOARD.crm['contacts-leads'].root}?tab=contact`}>
              <IconButton>
                <Iconify
                  icon='material-symbols:arrow-back-ios-new-rounded'
                  height={20}
                  className='rtl:rotate-180'
                />
              </IconButton>
            </Link>
            <h1 className='text-lg font-semibold'>{t('Back to Contacts')}</h1>
          </div>
        ) : (
          <div className='mb-4 flex items-center gap-2 px-4'>
            <Link href={`${PATH_DASHBOARD.crm['contacts-leads'].root}?tab=leads`}>
              <IconButton>
                <Iconify
                  icon='material-symbols:arrow-back-ios-new-rounded'
                  height={20}
                  className='rtl:rotate-180'
                />
              </IconButton>
            </Link>
            <h1 className='text-lg font-semibold'>{t('Back to Leads')}</h1>
          </div>
        )}
        <div className='p- flex flex-col items-center gap-3 p-4'>
          <Image
            alt='avatar'
            width={100}
            height={100}
            src={
              lead?.picture ? `${PIVOTPOINT_API.crmPicUrl}/${lead?.picture}` : avatarPlaceholder.src
            }
            className='aspect-square rounded-full object-cover'
          />
          <h1 className='text-center text-lg font-semibold'>{lead.fullName}</h1>
          <div className='flex w-full items-center justify-center gap-10 text-center'>
            <div className='flex flex-col items-center justify-center gap-1'>
              <IconButton className='border'>
                <Iconify icon='fluent:clipboard-task-add-20-filled' height={22} />
              </IconButton>
              <span className='text-[13px] '>{t('Add Task')}</span>
            </div>
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
              <DropdownMenu
                trigger={
                  <IconButton className='border'>
                    <Iconify icon='material-symbols:more-horiz' height={22} />
                  </IconButton>
                }
                items={[
                  {
                    type: 'button',
                    icon: <Iconify icon='ic:round-edit' height={18} />,
                    label: t('Edit'),
                    onClick: () => push(PATH_DASHBOARD.crm['contacts-leads'].edit(lead.id)),
                  },
                ]}
              />
              <span className='text-[13px] '>{t('More')}</span>
            </div>
          </div>
          {!lead.isContact && (
            <Button
              variant='outlined'
              className='w-full'
              onClick={handleConvertToContact}
              loading={isLoading}
            >
              {t('Convert to Contact')}
            </Button>
          )}
          <div className='flex items-center justify-center gap-1'>
            <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
            <p className='text-[13px] leading-none'>
              {t('Last activity')}: {moment(data?.data[0].created).format('LLLL')}
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
              <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>{t('Email')}</p>
                <p className='truncate font-bold'>{lead.email}</p>
              </div>
              <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {t('Phone Number')}
                </p>
                <p className='truncate font-bold'>{lead.phoneNumber}</p>
              </div>
              <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {t('Job Title')}
                </p>
                <p className='truncate font-bold'>{lead.jobTitle}</p>
              </div>{' '}
              <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {t('Lead Source')}
                </p>
                <p className='truncate font-bold'>
                  {lead.leadSource?.source} |{' '}
                  <Link
                    href={lead.leadSource?.sourceLink || ''}
                    target='_blank'
                    className='text-primary-600 underline dark:text-primary-400'
                  >
                    {lead.leadSource?.sourceLink}
                  </Link>{' '}
                </p>
              </div>
            </div>
          </TabsPrimitive.Content>
          <TabsPrimitive.Content value='address' className='w-full'>
            <div className='flex flex-col gap-3 p-4'>
              <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>{t('City')}</p>
                <p className='truncate font-bold capitalize'>{lead.address?.city}</p>
              </div>
              <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast'>
                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                  {t('Country')}
                </p>
                <p className='truncate font-bold capitalize'>{lead.address?.country}</p>
              </div>
            </div>
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </CardContent>
    </Card>
  )
}
