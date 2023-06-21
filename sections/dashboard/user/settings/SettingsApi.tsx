import React from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

// next
import Link from 'next/link'
// apis
import { useGenerateKeyMutation, useGetApiKeyQuery } from 'store/api/settings/settingsAPIs'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// routes
import { PATH_PAGE } from 'routes/paths'
// components
import { Icon as Iconify } from '@iconify/react'
import {
  Card,
  CardContent,
  TextField,
  Progressbar,
  IconButton,
  Tooltip,
  LoadingIndicator,
  Button,
} from 'components'
import FieldContainer from 'components/FieldContainer'

export default function SettingsApi() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [_, copy] = useCopyToClipboard()

  // Queries
  const { data, isLoading } = useGetApiKeyQuery()

  // Mutation
  const [generateKey, { isLoading: isGenerating }] = useGenerateKeyMutation()

  return (
    <Card className='!w-full'>
      <CardContent>
        {isLoading ? (
          <div className='flex h-48 w-full items-center justify-center'>
            <LoadingIndicator />
          </div>
        ) : (
          <div className='flex flex-col gap-5'>
            <div className='flex items-end gap-2'>
              {/* <TextField
                label={t('API KEY')}
                name='API_KEY'
                value={data?.data.key}
                className='cursor-copy select-all'
              /> */}
              <FieldContainer label={t('API KEY')} className='flex-1'>
                <p
                  className='w-full rounded-lg border p-2 dark:border-gray-600'
                  onClick={() =>
                    copy(data?.data.key || '').then(() =>
                      open({ message: t('API Key Copied to clipboard.') })
                    )
                  }
                >
                  {data?.data.key}
                </p>
              </FieldContainer>

              <Tooltip title={t('Copy to clipboard')} side='bottom'>
                <IconButton
                  onClick={() =>
                    copy(data?.data.key || '').then(() =>
                      open({ message: t('API Key Copied to clipboard.') })
                    )
                  }
                >
                  <Iconify icon='solar:copy-bold-duotone' height={24} />
                </IconButton>
              </Tooltip>
            </div>
            <Button
              onClick={() => {
                if (data?.data.key === '') generateKey()
              }}
              loading={isGenerating}
            >
              {t('Generate Key')}
            </Button>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium dark:text-white'>{t('API Usage')}</label>
                <p className='text-sm font-medium dark:text-white'>(80%)</p>
              </div>
              <Progressbar progress={80} />
            </div>
            <Link
              href={PATH_PAGE.apiDocs}
              className='flex items-center gap-1 font-medium text-primary-600 hover:underline dark:text-primary-400'
            >
              <span>{t('API Docs')}</span>
              <Iconify icon='tabler:external-link' height={16} />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
