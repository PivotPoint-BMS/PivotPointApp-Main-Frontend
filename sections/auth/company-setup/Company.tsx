import React from 'react'
import { motion } from 'framer-motion'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import MotionContainer from '@/components/animate/MotionContainer'
import { varFade } from '@/components/animate/variants'
import { RHFTextField } from '@/components/hook-form'
import Button from '@/components/Button'

export default function Company({ handleNext }: { handleNext: () => void }) {
  const { t } = useTranslate()
  return (
    <MotionContainer>
      <div className='container mx-auto flex h-full flex-col items-center justify-center gap-5 rounded-xl bg-white px-10 py-10 shadow-md dark:bg-secondary-900 sm:px-16 md:px-32 lg:w-1/2'>
        <motion.div
          variants={varFade().in}
          className='flex h-full w-full flex-col items-center gap-6'
        >
          <h1 className='text-3xl font-semibold'>{t("Let's set up your company")}</h1>
          <p className='text-center text-gray-600 dark:text-gray-300'>
            {t(
              'We need some initial information about your company to get you started, please fill in the fields below'
            )}
          </p>
          <RHFTextField name='yourPosition' label={t('Your Position')} />
          <RHFTextField name='companyName' label={t('Company name')} />
          <RHFTextField name='companySlogan' label={t('Company Slogan')} />
          <RHFTextField name='companyWebsite' label={t('Company Website')} />
        </motion.div>
        <Button className='w-1/3 self-end' onClick={handleNext}>
          {t('Next')}
        </Button>
      </div>
    </MotionContainer>
  )
}
