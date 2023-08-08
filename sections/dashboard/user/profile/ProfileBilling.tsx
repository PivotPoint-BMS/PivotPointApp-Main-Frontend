import React from "react"
import moment from "moment"
// hooks
import useTranslate from "hooks/useTranslate"
// utils
import { fCurrency } from "utils/formatNumber"
// components
import { Icon as Iconify } from "@iconify/react"
import Card from "components/Card"
import CardContent from "components/CardContent"
import Button from "components/Button"
import { useAppSelector } from "store/hooks"

const PLANS: { [key: string]: { label: string; cancelable: boolean; canUpgrade: boolean } } = {
  0: {
    label: "Free",
    cancelable: true,
    canUpgrade: true,
  },
  1: {
    label: "Professional",
    cancelable: true,
    canUpgrade: true,
  },
  2: {
    label: "Enterprise",
    cancelable: true,
    canUpgrade: false,
  },
}

export default function ProfileBilling() {
  const { t } = useTranslate()
  const { user } = useAppSelector((state) => state.session)

  return (
    <div className='grid w-full grid-cols-1 gap-8 md:grid-cols-3'>
      <div className='col-span-2 flex flex-col gap-8'>
        <Card className='!w-full'>
          <CardContent className='flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
              <p className='font-medium text-gray-600 dark:text-gray-400'>{t("Your Plan")}</p>
              <div className='flex items-center gap-3'>
                {PLANS[user?.tier.toString() || "0"].cancelable && (
                  <Button variant='outlined' intent='default'>
                    {t("Cancel Plan")}
                  </Button>
                )}
                {PLANS[user?.tier.toString() || "0"].canUpgrade && (
                  <Button variant='outlined' intent='primary'>
                    {t("Upgrade Plan")}
                  </Button>
                )}
              </div>
            </div>
            <h6 className='text-2xl font-semibold'>
              {t(PLANS[user?.tier.toString() || "0"].label)}
            </h6>
          </CardContent>
        </Card>
        <Card className='!w-full'>
          <CardContent className='flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
              <p className='font-medium text-gray-600 dark:text-gray-400'>{t("Payment Method")}</p>
              <Button variant='outlined' intent='primary' startIcon={<Iconify icon='ion-plus' />}>
                {t("New Card")}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className='!w-full'>
          <CardContent className='flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
              <p className='font-medium text-gray-600 dark:text-gray-400'>{t("Billing info")}</p>
              <Button variant='outlined' intent='primary' startIcon={<Iconify icon='ion-plus' />}>
                {t("New Billing address")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className='font-medium text-gray-600 dark:text-gray-400'>{t("Invoice History")}</h1>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className='flex items-center'>
            <p className='flex-1'>{moment().format("DD MMM yyyy")}</p>
            <p className='flex-[0.5]'>{fCurrency(25)}</p>
            <p className='cursor-pointer text-primary-600 hover:underline dark:text-primary-400'>
              PDF
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
