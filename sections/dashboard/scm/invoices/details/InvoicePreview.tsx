import React from "react"
import moment from "moment"
// next
import Image from "next/image"
// config
import { PIVOTPOINT_API } from "config"
// hooks
import useTranslate from "hooks/useTranslate"
// types
import { CompanyDetails, Invoice } from "types"
// components
import { Badge, Card, CardContent } from "components"

function InvoicePreview({
  invoice,
  companyDetails,
}: {
  invoice: Invoice
  companyDetails: CompanyDetails
}) {
  const { t } = useTranslate()

  return (
    <>
      <Card fullWidth className='mb-10'>
        <CardContent className='p-8'>
          <div className='mb-10 flex items-start justify-between'>
            <Image
              alt='companyLogo'
              width={60}
              height={60}
              src={`${PIVOTPOINT_API.profilePicUrl}/${companyDetails.logo}`}
              className='h-16 w-16 rounded'
            />
            <div className='flex flex-col items-end gap-2'>
              {invoice.status === 0 && <Badge color='primary' label={t("Created")} />}
              {invoice.status === 1 && <Badge intent='warning' size='small' label={t("Pending")} />}
              {invoice.status === 2 && <Badge intent='success' size='small' label={t("Paid")} />}
              {invoice.status === 3 && (
                <Badge intent='success' size='small' label={t("Completed")} />
              )}
              {invoice.status === 4 && <Badge intent='info' size='small' label={t("Overdue")} />}
              <p className='text-lg font-bold capitalize'> {invoice.invoiceTitle}</p>
            </div>
          </div>
          <div className='mb-10 grid grid-cols-2'>
            <div className=''>
              <p className='font-bold'>{t("Invoice From")}</p>
              <p className=''>{companyDetails.name}</p>
              <p className=''>{companyDetails.address}</p>
              <p className=''>{companyDetails.contactPhoneNum}</p>
            </div>
            <div className=''>
              <p className='font-bold'>{t("Invoice To")}</p>
              <p className=''>{invoice.clientName}</p>
              {/* <p className=''>{invoice.address}</p> */}
              <p className=''>{invoice.contactId}</p>
            </div>
          </div>
          <div className='mb-10 grid grid-cols-2'>
            <div className=''>
              <p className='font-bold'>{t("Created Date")}</p>
              <p className=''>{moment(invoice.created).format("LL")}</p>
            </div>
            <div className=''>
              <p className='font-bold'>{t("Due Date")}</p>
              <p className=''>{moment(invoice.due).format("LL")}</p>
            </div>
          </div>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='bg-gray-100 px-3 py-4 text-left ltr:rounded-l rtl:rounded-r dark:bg-paper-dark-contrast'>
                  #
                </th>
                <th className='w-1/2 bg-gray-100 px-3 py-4 text-left dark:bg-paper-dark-contrast'>
                  {t("Item")}
                </th>
                <th className='bg-gray-100 px-3 py-4 text-left dark:bg-paper-dark-contrast'>
                  {t("Quantity")}
                </th>
                <th className='bg-gray-100 px-3 py-4 text-left dark:bg-paper-dark-contrast'>
                  {t("Price")}
                </th>
                <th className='w-1/6 bg-gray-100 px-3 py-4 text-right ltr:rounded-r rtl:rounded-l dark:bg-paper-dark-contrast'>
                  {t("Total")}
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.invoiceItems.map((item, i) => (
                <tr key={item.id} className='border-b border-dashed dark:border-b-gray-600'>
                  <td className='px-3 py-4 text-left'>{i + 1}</td>
                  <td className='px-3 py-4 text-left'>{item.name}</td>
                  <td className='px-3 py-4 text-left'>{item.quantity}</td>
                  <td className='px-3 py-4 text-left'>
                    {item.value} {companyDetails.currency}
                  </td>
                  <td className='px-3 py-4 text-right'>
                    {item.value * item.quantity} {companyDetails.currency}
                  </td>
                </tr>
              ))}
              <tr>
                <td className='px-3 py-2 text-left'></td>
                <td className='px-3 py-2 text-left'></td>
                <td className='px-3 py-2 text-left'></td>
                <td className='px-3 py-2 text-left text-sm text-gray-600 dark:text-gray-400'>
                  {t("Subtotal")}
                </td>
                <td className='px-3 py-2 text-right font-semibold'>
                  {invoice.invoiceItems.reduce((acc, cur) => acc + cur.value * cur.quantity, 0) ||
                    0}{" "}
                  {companyDetails.currency}
                </td>
              </tr>
              <tr>
                <td className='px-3 py-2 text-left'></td>
                <td className='px-3 py-2 text-left'></td>
                <td className='px-3 py-2 text-left'></td>
                <td className='px-3 py-2 text-left font-bold'>{t("Total")}</td>
                <td className='px-3 py-2 text-right font-semibold'>
                  {invoice.total} {companyDetails.currency}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  )
}

export default InvoicePreview
