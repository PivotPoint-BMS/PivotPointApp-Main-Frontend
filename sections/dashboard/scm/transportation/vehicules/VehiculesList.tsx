import React, { useState } from "react"
// next
import { useRouter } from "next/router"
import Image from "next/image"
// utils
import { fNumber } from "utils/formatNumber"
// api
import { useGetVehiclesQuery } from "store/api/scm/transportation/vehiculesApis"
// redux
import { previewVehicle } from "store/slices/vehiculePreviewSlice"
// utils
import getVehiclesImage from "utils/getVehiculeImage"
// hooks
import { useAppDispatch, useAppSelector } from "store/hooks"
import useTranslate from "hooks/useTranslate"
// components
import { Icon } from "@iconify/react"
import { Card, CardContent, CardHeader, IconButton, LoadingIndicator, TextField } from "components"
import VehiclePreview from "./VehiculePreview"

function VehiclesList() {
  const { t } = useTranslate()
  const dispatch = useAppDispatch()
  const { isFallback } = useRouter()
  // Pagination
  const { PageSize, PageNumber } = useAppSelector((state) => state.pagination)
  // Filters
  const [searchValue, setSearchValue] = useState("")
  // Query Params
  const [SearchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  // Queries
  const { data, isLoading, isSuccess, isFetching } = useGetVehiclesQuery(
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
      <>
        <div className='p-3 '>
          <TextField
            placeholder={t("Search...")}
            endAdornment={
              <IconButton
                onClick={() => setSearchTerm(searchValue === "" ? undefined : searchValue)}
              >
                <Icon icon='ion:search-outline' height={18} className='text-gray-500' />
              </IconButton>
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='flex h-full'
            onKeyDown={(e) => {
              if (e.key === "Enter")
                setSearchTerm(e.currentTarget.value === "" ? undefined : e.currentTarget.value)
            }}
          />
        </div>
        <div className='grid w-full grid-cols-1 gap-4 px-3 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.data.map((vehicule) => (
            <Card
              key={`vehicule-${vehicule.id}`}
              fullWidth
              className='cursor-pointer divide-y !bg-gray-50/50 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:divide-gray-600 dark:!bg-paper-dark-contrast'
              onClick={() => dispatch(previewVehicle(vehicule))}
            >
              <CardHeader
                title={
                  <div className='space-y-1'>
                    <p className='text-sm font-normal text-gray-600 dark:text-gray-400'>
                      {t("Vehicle Code")}
                    </p>
                    <p className='text-lg'>{vehicule.code}</p>
                  </div>
                }
                actions={
                  <Image
                    alt='truck'
                    src={getVehiclesImage(vehicule.type, vehicule.size)}
                    className='aspect-auto w-24'
                    width={96}
                  />
                }
              />
              <CardContent className='grid grid-cols-2'>
                <div className='space-y-1'>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>{t("Model")}</p>
                  <p className='font-bold'>{vehicule.model}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>{t("Weight")}</p>
                  <p className='font-bold'>{fNumber(vehicule.weight)}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>{t("Volume")}</p>
                  <p className='font-bold'>{fNumber(vehicule.volumne)}&sup2;</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>{t("Max Capacity")}</p>
                  <p className='font-bold'>
                    {fNumber(vehicule.maxCapacity)} {t("Kg")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <VehiclePreview />
      </>
    )
  return (
    <>
      <div className='py-3 '>
        <TextField
          placeholder={t("Search...")}
          endAdornment={
            <IconButton onClick={() => setSearchTerm(searchValue === "" ? undefined : searchValue)}>
              <Icon icon='ion:search-outline' height={18} className='text-gray-500' />
            </IconButton>
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='flex h-full'
          onKeyDown={(e) => {
            if (e.key === "Enter")
              setSearchTerm(e.currentTarget.value === "" ? undefined : e.currentTarget.value)
          }}
        />
      </div>
      <div className='flex h-24 w-full items-center justify-center'>
        <h1 className='text-xl font-bold'>{t("No Vehicle Found")}</h1>
      </div>
    </>
  )
}

export default VehiclesList
