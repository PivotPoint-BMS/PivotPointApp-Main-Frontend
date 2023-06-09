import { useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
// next
import { useRouter } from 'next/router'
// form
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import {
  getCategories,
  getProduct,
  getRunningQueriesThunk,
  useCreateProductMutation,
  useEditProductMutation,
  useGetCategoriesQuery,
} from 'store/api/scm/products-service/productsApi'
import { wrapper } from 'store'
// utils
import { fData } from 'utils/formatNumber'
// types
import Product from 'types/Product'
// routes
import { PATH_DASHBOARD } from 'routes/paths'
// config
import { PRODUCTS_TYPES } from 'config'
// hooks
import { useAppSelector } from 'store/hooks'
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import Select from 'react-select'
import { Card, CardContent, Button, LoadingIndicator, Tooltip } from 'components'
import { FormProvider, RHFTextField, RHFFieldContainer } from 'components/hook-form'
import RHFUploadAvatar from 'components/hook-form/RHFUpload'
import { Category } from 'types'
import { Icon } from '@iconify/react'

export default function CreateEditProductForm({
  isEdit,
  currentProduct,
}: {
  isEdit?: boolean
  currentProduct?: Product
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const { push } = useRouter()

  const [type, setType] = useState<number | null>(null)

  const { PageNumber, PageSize } = useAppSelector((state) => state.paggination)

  const { data: categories, isLoading, isSuccess } = useGetCategoriesQuery()
  const [
    createProduct,
    { isLoading: isCreateLoading, isError: isCreateError, isSuccess: isCreateSuccess },
  ] = useCreateProductMutation()
  const [
    editProduct,
    { isLoading: isEditLoading, isError: isEditError, isSuccess: isEditSuccess },
  ] = useEditProductMutation()

  const ProductSchema = Yup.object().shape({
    type: Yup.number().nullable().required(t('This field is required')),
    categoryId: Yup.string().nullable().required(t('This field is required')),
    name: Yup.string().nullable().min(3, t('Too short')).required(t('This field is required')),
    price: Yup.number().nullable().required(t('This field is required')),
    productCode: Yup.string().nullable().required(t('This field is required')),
    cost: Yup.number().nullable().required(t('This field is required')),
    brand: Yup.string().nullable(),
    weight: Yup.string().when('type', {
      is: 1,
      then: (schema) => schema.required(t('This field is required')),
    }),
    height: Yup.string().when('type', {
      is: 1,
      then: (schema) => schema.required(t('This field is required')),
    }),
    length: Yup.string().when('type', {
      is: 1,
      then: (schema) => schema.required(t('This field is required')),
    }),
    width: Yup.string().when('type', {
      is: 1,
      then: (schema) => schema.required(t('This field is required')),
    }),
  })

  const defaultValues = useMemo(
    () => ({
      type: currentProduct?.type || null,
      categoryId: currentProduct?.categoryId || null,
      name: currentProduct?.name || null,
      price: currentProduct?.price || null,
      productCode: currentProduct?.productCode || null,
      cost: currentProduct?.cost || null,
      brand: currentProduct?.brand || null,
      weight: currentProduct?.weight || '',
      height: '',
      length: '',
      width: '',
      picture: currentProduct?.picture || '',
    }),
    [currentProduct]
  )

  const methods = useForm<FieldValues>({
    resolver: yupResolver(ProductSchema),
    defaultValues,
  })

  const { handleSubmit, setValue, reset } = methods

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData()
    formData.append('picture', data.picture)
    formData.append('brand', data.brand || '')
    formData.append('categoryId', data.categoryId || '')
    formData.append('cost', data.cost || 0)
    formData.append('name', data.name || '')
    formData.append('price', data.price || '')
    formData.append('productCode', data.productCode || '')
    formData.append('type', data.type || '')
    formData.append('weight', data.weight || 0)
    formData.append('dimensions', `${data.height},${data.length},${data.width}` || '')

    if (isEdit) editProduct({ id: currentProduct?.id || '', PageNumber, PageSize, data: formData })
    else createProduct({ data: formData, PageNumber, PageSize })
  }

  // ImageUpload
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (file) {
        setValue(
          'picture',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      }
    },
    [setValue]
  )
  //

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues)
    }
    if (!isEdit) {
      reset(defaultValues)
    }
  }, [isEdit, currentProduct])

  useEffect(() => {
    if (isCreateError || isEditError) {
      open({
        message: t('A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isCreateSuccess || isEditSuccess) {
      reset()
      open({
        message: isEdit ? t('Product Updated Successfully.') : t('Product Added Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
      push({
        pathname: PATH_DASHBOARD.scm['product-service'].list,
        query: { tab: 'products' },
      })
    }
  }, [isCreateError, isEditError, isCreateSuccess, isEditSuccess])

  return isLoading ? (
    <div className='flex h-56 w-full items-center justify-center'>
      <LoadingIndicator />
    </div>
  ) : (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card fullWidth>
          <CardContent>
            <h6 className='mb-3 text-lg font-semibold'>{t('Product Image')}</h6>
            <RHFUploadAvatar
              name='picture'
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <p className='mx-auto block text-center text-xs text-gray-600 dark:text-gray-400'>
                  {t('Allowed *.jpeg, *.jpg, *.png, *.gif')}
                  <br /> {t('max size of')} {fData(3145728)}
                </p>
              }
            />
          </CardContent>
        </Card>
        <Card fullWidth className='!overflow-visible md:col-span-2'>
          <CardContent className='flex flex-col !overflow-visible'>
            <h6 className='mb-5 text-lg font-semibold'>{t('Product Informations')}</h6>
            <div className='mb-6 grid gap-6 sm:grid-cols-2'>
              <RHFTextField name='name' label={t('Name')} />
              <RHFFieldContainer name='type' label={t('Type')}>
                <Select
                  options={PRODUCTS_TYPES}
                  getOptionLabel={(option) => t(option.label)}
                  isSearchable={false}
                  isLoading={isLoading}
                  onChange={(newValue) => {
                    setValue('type', newValue?.value)
                    setType(newValue?.value || null)
                  }}
                  defaultValue={PRODUCTS_TYPES.find((item) => item.value === currentProduct?.type)}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder=''
                />
              </RHFFieldContainer>
              <RHFFieldContainer name='categoryId' label={t('Category')}>
                <Select
                  options={isSuccess ? categories?.data : ([] as Category[])}
                  isLoading={isLoading}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  onChange={(newValue) => {
                    setValue('categoryId', newValue?.id)
                  }}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder=''
                />
              </RHFFieldContainer>
              <RHFTextField type='number' name='price' label={t('Price')} endAdornment={t('Da')} />
              <RHFTextField name='productCode' label={t('Product Code')} />
              <RHFTextField type='number' name='cost' label={t('Cost')} endAdornment={t('Da')} />
              {type === 1 && (
                <>
                  <div className='sm:col-span-2'>
                    <RHFTextField name='brand' label={t('Brand')} />
                  </div>
                  <h6 className='col-span-2 text-lg font-semibold'>
                    {t('Warehousing Infotmations')}{' '}
                    <Tooltip
                      className='font-normal'
                      title={t('These information help us in the warehousing fuctions')}
                      side='bottom'
                    >
                      <Icon
                        icon='ic:info'
                        height={18}
                        className='inline-block cursor-help text-secondary-600'
                      />
                    </Tooltip>
                  </h6>
                  <RHFTextField type='number' name='weight' label={t('Weight')} />
                  <RHFTextField type='number' name='height' label={t('Height')} />
                  <RHFTextField type='number' name='width' label={t('Width')} />
                  <RHFTextField type='number' name='length' label={t('Length')} />
                </>
              )}
            </div>
            <div className='mt-6 flex w-full items-center justify-center'>
              <Button size='large' type='submit' loading={isCreateLoading || isEditLoading}>
                {isEdit ? t('Edit Product') : t('Add Product')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.params?.id
  if (typeof id === 'string') store.dispatch(getProduct.initiate(id))
  store.dispatch(getCategories.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
