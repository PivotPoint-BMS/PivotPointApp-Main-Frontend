import React from 'react'
import isString from 'lodash/isString'
import { DropzoneProps, useDropzone } from 'react-dropzone'
import clsx from 'clsx'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import { Icon as Iconify } from '@iconify/react'
import RejectionFiles from './RejectionFiles'
import Image from '../Image'

export interface UploadAvatarProps extends DropzoneProps {
  error?: boolean
  file?: string | (File & { preview: string })
  helperText?: React.ReactNode
}

export default function UploadAvatar({ error, file, helperText, ...other }: UploadAvatarProps) {
  const { t } = useTranslate()
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  })

  return (
    <>
      <div
        className={clsx(
          'm-auto h-36 w-36 rounded-full border border-dashed  p-1 dark:border-gray-200',
          (isDragReject || error) && 'text-red-400'
        )}
      >
        <div
          className={clsx(
            'group relative flex h-full w-full items-center justify-center overflow-hidden rounded-full outline-none hover:cursor-pointer',
            isDragActive && 'opacity-75'
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          {file && (
            <Image
              alt='avatar'
              width={143}
              height={143}
              src={isString(file) ? file : file.preview}
            />
          )}
          <div
            className={clsx(
              'absolute flex h-full w-full flex-col items-center justify-center rounded-full bg-gray-600/30 text-white opacity-0 backdrop-blur-sm group-hover:z-10 group-hover:opacity-100 dark:text-gray-300 dark:hover:bg-gray-900/50',
              !file && 'bg-gray-400/30 opacity-100',
              (isDragReject || error) && 'bg-red-400/50'
            )}
          >
            <Iconify icon='ic:round-add-a-photo' height={24} width={24} className='mb-[1px]' />
            <p>{file ? t('Change photo') : t('Upload photo')}</p>
          </div>
        </div>
      </div>

      {helperText && helperText}

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
    </>
  )
}
