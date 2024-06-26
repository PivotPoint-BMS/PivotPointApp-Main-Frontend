import React, { useEffect, useState } from "react"
import clsx from "clsx"
// motion
import { Variant, motion } from "framer-motion"
// next
import Link from "next/link"
// routes
import { PATH_DASHBOARD } from "routes/paths"
// redux
import { useAppDispatch, useAppSelector } from "store/hooks"
import { closePreviewLead } from "store/slices/leadPreviewSlice"
// config
import { PIVOTPOINT_API } from "config"
// hooks
import useTranslate from "hooks/useTranslate"
// asset
import avatarPlaceholder from "public/avatar_placeholder.png"
// components
import { Icon as Iconify } from "@iconify/react"
import IconButton from "components/IconButton"
import Image from "components/Image"
import Tooltip from "components/Tooltip"

export default function ContactPreview() {
  const { t, locale } = useTranslate()
  const dispatch = useAppDispatch()
  const { isOpen, lead } = useAppSelector((state) => state.leadPreview)
  const [opened, setOpened] = useState(false)

  const variants: { [key: string]: Variant } = {
    closed: { x: locale === "ar" ? "-100%" : "100%" },
    opened: { x: "0%" },
  }

  useEffect(() => {
    setOpened(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpened(false)
    setTimeout(() => {
      dispatch(closePreviewLead())
    }, 200)
  }

  return (
    <div
      className={clsx(
        "fixed top-0 right-0 z-50 flex h-screen w-screen bg-gray-800/80  backdrop-blur-sm transition-all dark:bg-gray-500/20",
        isOpen ? "block" : "hidden"
      )}
    >
      <div className='flex-1' onClick={handleClose}></div>
      <motion.div
        initial='closed'
        animate={opened ? "opened" : "closed"}
        variants={variants}
        transition={{ type: "keyframes" }}
      >
        <div className='z-50 m-0 h-screen w-full bg-white py-4 shadow-2xl shadow-white/80 transition-all delay-100 dark:border-gray-600 dark:bg-paper-dark sm:w-[650px]'>
          <div className='mb-6 flex w-full  items-center gap-4 border-b   px-4 pb-4'>
            <div className='flex flex-1 items-center gap-2'>
              <IconButton onClick={handleClose}>
                <Iconify icon='ic:round-close' height={22} />
              </IconButton>
              <h6 className='flex-1 text-xl font-semibold'>{t("Contact Preview")}</h6>
            </div>
            <Tooltip title={t("View Full Details")}>
              <Link href={PATH_DASHBOARD.crm["contacts-leads"].contact(lead?.id)}>
                <IconButton>
                  <Iconify icon='mingcute:external-link-fill' height={18} />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title={t("Edit")}>
              <Link href={PATH_DASHBOARD.crm["contacts-leads"].edit(lead?.id)}>
                <IconButton>
                  <Iconify icon='ic:round-edit' height={18} />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
          <div className='mx-6 grid grid-cols-2 divide-x divide-y   rounded border rtl:divide-x-reverse sm:grid-cols-4'>
            <div className='col-span-2 flex flex-col items-start justify-between gap-4 p-3 sm:col-span-4 sm:flex-row'>
              <div className='flex w-full flex-col items-center justify-center gap-4 truncate sm:flex-row sm:items-start sm:justify-start'>
                <Image
                  alt='avatar'
                  width={100}
                  height={100}
                  src={
                    lead?.picture
                      ? `${PIVOTPOINT_API.crmPicUrl}/${lead?.picture}`
                      : avatarPlaceholder.src
                  }
                  className='aspect-square rounded-full object-cover'
                />
                <div className='flex h-full w-full flex-col justify-center gap-1 truncate'>
                  <h1 className='flex-1 self-center truncate text-lg font-semibold sm:self-start'>
                    {lead?.fullName}
                  </h1>
                  <p className='flex  items-center gap-1 text-sm text-gray-500 dark:text-gray-300'>
                    <span>
                      <Iconify icon='material-symbols:mail-rounded' height={18} />{" "}
                    </span>
                    <span className='truncate'>{lead?.email}</span>{" "}
                  </p>
                  <p className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300'>
                    <span>
                      <Iconify icon='material-symbols:call' height={18} />
                    </span>
                    <span className='truncate'>{lead?.phoneNumber}</span>
                  </p>
                  <p className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300'>
                    <span>
                      <Iconify icon='mdi:map-marker' height={18} />
                    </span>
                    <span className='truncate capitalize'>
                      {lead?.address.city}, {lead?.address.country}
                    </span>
                  </p>
                </div>
              </div>
              <div className='flex w-full items-center justify-evenly gap-6 sm:w-fit sm:justify-end sm:gap-2 '>
                <IconButton className='border'>
                  <Iconify icon='fluent:clipboard-task-add-20-filled' height={22} />
                </IconButton>
                <Link href={`mailto:${lead?.email}`}>
                  <IconButton className='border'>
                    <Iconify icon='material-symbols:outgoing-mail' height={22} />
                  </IconButton>
                </Link>
                <Link href={`tel:${lead?.phoneNumber}`}>
                  <IconButton className='border'>
                    <Iconify icon='material-symbols:call' height={22} />
                  </IconButton>
                </Link>
                <IconButton className='border'>
                  <Iconify icon='material-symbols:more-horiz' height={22} />
                </IconButton>
              </div>
            </div>
            <div className='flex flex-col gap-2 p-3'>
              <h6 className='flex-1 text-sm font-medium text-gray-500 dark:text-gray-300'>
                {t("Priority")}
              </h6>
              <p className='font-medium'>
                {lead?.priority === 0 && t("Unassined")}
                {lead?.priority === 1 && t("Low")}
                {lead?.priority === 2 && t("Medium")}
                {lead?.priority === 3 && t("High")}
              </p>
            </div>
            <div className='flex flex-col gap-2 p-3 '>
              <h6 className='flex-1 text-sm font-medium text-gray-500 dark:text-gray-300'>
                {t("Source")}
              </h6>
              <p className='font-medium'>
                {lead?.leadSource?.source ? lead?.leadSource?.source : t("No Source")}
              </p>
            </div>
            <div className='flex flex-col gap-2  p-3'>
              <h6 className='flex-1 text-sm font-medium text-gray-500 dark:text-gray-300'>
                {t("Job Title")}
              </h6>
              <p className='font-medium'>{lead?.jobTitle ? lead?.jobTitle : t("No Job Title")}</p>
            </div>
            <div className='flex flex-col gap-2 p-3 '>
              <h6 className='flex-1 text-sm font-medium text-gray-500 dark:text-gray-300'>
                {t("Annual Revenue")}
              </h6>
              <p className='font-medium'>{lead?.incomeK} Da</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
