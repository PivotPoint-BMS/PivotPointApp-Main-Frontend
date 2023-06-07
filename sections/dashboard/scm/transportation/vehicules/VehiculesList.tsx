import React, { useState } from 'react'
// next
import { useRouter } from 'next/router'
import Image from 'next/image'
// utils
import { fNumber } from 'utils/formatNumber'
// api
import { useGetVehiculesQuery } from 'store/api/scm/transportation/vehiculesApis'
// hooks
import { useAppSelector } from 'store/hooks'
import useTranslate from 'hooks/useTranslate'
// components
import { Card, CardContent, CardHeader, LoadingIndicator } from 'components'
// assets
import car from 'public/vehicules/car.png'
import small from 'public/vehicules/small.png'
import medium from 'public/vehicules/medium.png'
import large from 'public/vehicules/large.png'

function getVehiculesImage(type: 0 | 1 | 2 | 3, size: 0 | 1 | 2 | 3) {
  if (type === 0) {
    switch (size) {
      case 0:
        return car
      case 1:
        return small
      case 2:
        return medium
      case 3:
        return large
      default:
        return car
    }
  } else return car
}

function VehiculesList() {
  const { t } = useTranslate()
  const { isFallback } = useRouter()
  // Pogination
  const { PageSize, PageNumber } = useAppSelector((state) => state.paggination)
  // Filters
  // const [searchValue, setSearchValue] = useState('')
  // Query Params
  const [SearchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  // Queries
  const { data, isLoading, isSuccess, isFetching } = useGetVehiculesQuery(
    { SearchTerm, PageNumber, PageSize },
    { skip: isFallback, refetchOnMountOrArgChange: true }
  )

  if (isLoading || isFetching)
    return (
      <div className='flex h-24 w-full items-center justify-center'>
        <LoadingIndicator />
      </div>
    )

  if (isSuccess && data.data.length > 0)
    return (
      <div className='grid w-full grid-cols-1 gap-4 py-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data.data.map((vehicule) => (
          <Card
            fullWidth
            className='cursor-pointer divide-y shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg'
          >
            <CardHeader
              title={
                <div className='space-y-1'>
                  <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
                    {t('Vehicule Code')}
                  </p>
                  <p className='text-lg'>{vehicule.code}</p>
                </div>
              }
              actions={
                <Image
                  alt='truck'
                  src={getVehiculesImage(vehicule.type, vehicule.size)}
                  className='aspect-auto w-24'
                  width={96}
                />
              }
            />
            <CardContent className='grid grid-cols-1 md:grid-cols-2'>
              <div className='space-y-1'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{t('Model')}</p>
                <p className='font-bold'>{vehicule.model}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{t('Weight')}</p>
                <p className='font-bold'>{fNumber(vehicule.weight)}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{t('Volume')}</p>
                <p className='font-bold'>{fNumber(vehicule.volumne)}&sup2;</p>
              </div>
              <div className='space-y-1'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{t('Max Capacity')}</p>
                <p className='font-bold'>
                  {fNumber(vehicule.maxCapacity)} {t('Kg')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  return (
    <div className='flex h-24 w-full items-center justify-center'>
      <h1 className='text-xl font-bold'>{t('No Vehicule Found')}</h1>
    </div>
  )
}

export default VehiculesList
