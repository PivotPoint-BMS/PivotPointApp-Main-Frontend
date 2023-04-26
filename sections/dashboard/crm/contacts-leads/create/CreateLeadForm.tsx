import { useCallback } from 'react'
import * as Yup from 'yup'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
// utils
import { fData } from 'utils/formatNumber'
// hooks
import useTranslate from 'hooks/useTranslate'
// components
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import { FormProvider, RHFTextField } from 'components/hook-form'
import RHFUploadAvatar from 'components/hook-form/RHFUpload'
import Button from 'components/Button'

export default function CreateLeadForm() {
  const { t } = useTranslate()

  const LeadSchema = Yup.object().shape({
    imageFile: Yup.string().min(3, t('Too short')),
    fullName: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    email: Yup.string()
      .required(t('Email is required'))
      .email(t('Email must be a valid email address')),
    phoneNumber: Yup.string()
      .matches(/^(\+\d{1,3} \d{9}|0\d{9})$/, t('Phone number must be valid'))
      .required(t('Phone number is required')),
    jobTitle: Yup.string().min(3, t('Too short')).required(t('This field is required')),
    status: Yup.number().required(t('This field is required')),
    source: Yup.string().required(t('This field is required')),
    sourceLink: Yup.string().required(t('This field is required')),
    city: Yup.string().required(t('This field is required')),
    country: Yup.string().required(t('This field is required')),
  })

  const defaultValues = {
    imageFile: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
    status: 0,
    source: '',
    sourceLink: '',
    city: '',
    country: '',
  }

  const methods = useForm<FieldValues>({
    resolver: yupResolver(LeadSchema),
    defaultValues,
  })

  const { handleSubmit, setValue } = methods

  const onSubmit = async (data: FieldValues) => {
    console.log(data)
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        setValue(
          'imageFile',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      }
    },
    [setValue]
  )
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card fullWidth>
        <CardContent className='flex flex-col'>
          <h6 className='mb-3 text-lg font-semibold'>{t('Lead Image')}</h6>
          <RHFUploadAvatar
            name='imageFile'
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <p className='mx-auto block text-center text-xs text-gray-600 dark:text-gray-400'>
                {t('Allowed *.jpeg, *.jpg, *.png, *.gif')}
                <br /> {t('max size of')} {fData(3145728)}
              </p>
            }
          />

          <h6 className='mt-5 mb-5 text-lg font-semibold'>{t('Lead Informations')}</h6>
          <div className=' mb-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4'>
            <RHFTextField name='fullName' label={t('Full Name')} />
            <RHFTextField name='email' label={t('Email')} />
            <RHFTextField name='phoneNumber' label={t('Phone Number')} />
            <RHFTextField name='jobTitle' label={t('Job Title')} />
          </div>
          <h6 className='mb-5 text-lg font-semibold'>{t('Source Informations')}</h6>
          <div className='md: mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <RHFTextField name='source' label={t('Lead source')} />
            <RHFTextField name='sourceLink' label={t('Lead source Link')} />
          </div>
          <h6 className='mb-5 text-lg font-semibold'>{t('Address Informations')}</h6>
          <div className='md: grid grid-cols-1 gap-6 sm:grid-cols-2 '>
            <RHFTextField name='city' label={t('City')} />
            <RHFTextField name='country' label={t('Country')} />
          </div>
          <div className='mt-6 flex w-full items-center justify-center'>
            <Button size='large' type='submit'>
              Add Lead
            </Button>
          </div>
        </CardContent>
      </Card>
    </FormProvider>
  )
}
