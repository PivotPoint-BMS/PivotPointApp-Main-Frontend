import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
// motion
import { Variant, motion } from 'framer-motion'
// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closePreviewDeal } from 'store/slices/dealPreviewSlice'
import {
  useDeleteDealMutation,
  useEditDealMutation,
  useGetDealQuery,
} from 'store/api/crm/sales-pipeline/dealsBoardsApi'
import { useGetContactsQuery, useGetLeadsQuery } from 'store/api/crm/contact-leads/leadApis'
import { skipToken } from '@reduxjs/toolkit/dist/query'
// config
import { DEALTYPES, PIVOTPOINT_API } from 'config'
// hooks
import useTranslate from 'hooks/useTranslate'
import useSnackbar from 'hooks/useSnackbar'
// components
import Select from 'react-select'
import { Icon } from '@iconify/react'
import IconButton from 'components/IconButton'
import LoadingIndicator from 'components/LoadingIndicator'
import TextArea from 'components/TextArea'
import Image from 'components/Image'
import Button from 'components/Button'
import AutoComplete from 'components/AutoComplete'
import Tooltip from 'components/Tooltip'
import AlertDialog from 'components/AlertDialog'
import { Deal, Lead } from 'types'
import moment from 'moment'

export default function DealPreview({ boardId }: { boardId: string }) {
  const { t, locale } = useTranslate()
  const { open } = useSnackbar()
  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement>(null)

  const [opened, setOpened] = useState(false)
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState(0)
  const [dealLeads, setDealLeads] = useState<Deal['leads']>([])
  const { isOpen, dealId } = useAppSelector((state) => state.dealPreview)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { user } = useAppSelector((state) => state.session)

  // Query
  const { data, isLoading, isSuccess } = useGetDealQuery(dealId || skipToken)
  const {
    data: leadsResponse,
    isSuccess: isLeadSuccess,
    isLoading: isLeadLoading,
  } = useGetLeadsQuery({ PageNumber: undefined, PageSize: undefined })
  const {
    data: contactsResponse,
    isSuccess: isContactsSuccess,
    isLoading: isContactsLoading,
  } = useGetContactsQuery({ PageNumber: undefined, PageSize: undefined })

  // Mutation
  const [editDeal, { isError: isEditError, isSuccess: isEditSuccess }] = useEditDealMutation()
  const [deleteDeal, { isError: isDeleteError, isSuccess: isDeleteSuccess }] =
    useDeleteDealMutation()

  const [leads, setLeads] = useState<Lead[]>(isLeadSuccess ? leadsResponse?.data : [])
  const [contacts, setContacts] = useState<Lead[]>(isContactsSuccess ? contactsResponse?.data : [])

  const handleDelete = () => {
    deleteDeal({ dealId: dealId || '', boardId })
  }

  const variants: { [key: string]: Variant } = {
    closed: { x: locale === 'ar' ? '-100%' : '100%' },
    opened: { x: '0%' },
  }

  useEffect(() => {
    if (isLeadSuccess) setLeads(leadsResponse?.data)
  }, [isLeadLoading])

  useEffect(() => {
    if (isContactsSuccess) setContacts(contactsResponse?.data)
  }, [isContactsLoading])

  useEffect(() => {
    setOpened(isOpen)
    setBackdropOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    if (isSuccess) {
      setTitle(data.data.title)
      setDescription(data.data.description)
      setType(data.data.type)
      setDealLeads(data.data.leads)
    }
  }, [isLoading, data])

  const handleClose = () => {
    setOpened(false)
    setTimeout(() => {
      dispatch(closePreviewDeal())
    }, 400)
    setTimeout(() => {
      setBackdropOpen(false)
    }, 200)
  }

  useEffect(() => {
    if (isEditError) {
      open({
        message: t('Sorry, Deal not updated, A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isEditSuccess) {
      open({
        message: t('Deal Updated Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
    }
  }, [isEditError, isEditSuccess])

  useEffect(() => {
    if (isDeleteError) {
      open({
        message: t('Sorry, Deal not deleted, A problem has occured.'),
        autoHideDuration: 4000,
        type: 'error',
        variant: 'contained',
      })
    }
    if (isDeleteSuccess) {
      open({
        message: t('Deal Deleted Successfully.'),
        autoHideDuration: 4000,
        type: 'success',
        variant: 'contained',
      })
      handleClose()
      setOpenDeleteDialog(false)
    }
  }, [isDeleteError, isDeleteSuccess])

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  return (
    <>
      <motion.div
        initial='closed'
        animate={backdropOpen ? 'opened' : 'closed'}
        variants={{ closed: { opacity: 0 }, opened: { opacity: 1 } }}
        transition={{ type: 'keyframes', duration: 0.1 }}
        className={clsx(
          'fixed top-0 right-0 z-50 flex h-screen w-screen bg-gray-800/80 backdrop-blur-sm transition-all dark:bg-gray-500/20',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <div className='flex-1' onClick={handleClose}></div>
        <motion.div
          initial='closed'
          animate={opened ? 'opened' : 'closed'}
          variants={variants}
          transition={{ type: 'keyframes' }}
          className='w-full sm:w-[500px]'
        >
          <div className='z-50 m-0 flex h-screen w-full flex-col bg-white py-4 shadow-2xl shadow-white/80 transition-all delay-100 dark:border-gray-600 dark:bg-paper-dark dark:shadow-black/80'>
            <div className='mb-6 flex w-full items-center gap-4 border-b px-4 pb-4'>
              <div className='flex w-full items-center gap-2 '>
                <IconButton onClick={handleClose}>
                  <Icon icon='ic:round-close' height={22} />
                </IconButton>
                <h6 className='flex-1 text-xl font-semibold'>{t('Deal Preview')}</h6>
                <Tooltip title={t('Delete')}>
                  <IconButton onClick={() => setOpenDeleteDialog(true)}>
                    <Icon
                      icon='material-symbols:delete-rounded'
                      height={20}
                      className='text-red-600 dark:text-red-400'
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            {isLoading ? (
              <div className='flex h-full w-full flex-1 items-center justify-center'>
                <LoadingIndicator />
              </div>
            ) : (
              <div className='flex flex-1 flex-col gap-5 overflow-y-scroll p-4'>
                {isSuccess && data.data ? (
                  <>
                    <input
                      type='text'
                      defaultValue={data.data.title}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value === '' || e.target.value === data.data.title) {
                          setIsEditing(false)
                          return
                        }
                        editDeal({
                          ...data.data,
                          boardId,
                          leadIds: data.data.leads.map((lead) => lead.id),
                          title: e.target.value,
                        })
                        setIsEditing(false)
                      }}
                      className='rounded-md bg-transparent py-1 text-lg outline-2 outline-offset-0 outline-black transition-all focus-within:px-1 hover:px-1 hover:outline active:outline dark:outline-white'
                      ref={inputRef}
                    />
                    <div className='flex items-start gap-2'>
                      <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>
                        {t('Created By')}
                      </p>
                      <p>{data.data.createdBy}</p>
                    </div>
                    <div className='flex items-start gap-2'>
                      <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>
                        {t('Created At')}
                      </p>
                      <p className='capitalize'>
                        {moment(data.data.createdAt)
                          .add('hour', 1)
                          .format('ddd DD MMMM YYYY, HH:mm')}
                      </p>
                    </div>
                    <div className='flex items-start gap-2'>
                      <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>
                        {t('Last Update By')}
                      </p>
                      <p>{data.data.lastUpdatedBy}</p>
                    </div>
                    <div className='flex items-start gap-2'>
                      <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>
                        {t('Assignee')}
                      </p>
                      <p>{data.data.assignedTo || t('No Assignee')}</p>
                    </div>
                    <div className='flex items-start gap-2'>
                      <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>{t('Type')}</p>
                      <div className='flex items-center gap-2'>
                        {DEALTYPES.map((item) => (
                          <Button
                            variant='outlined'
                            className='!rounded-md !px-2 !py-1 !text-xs'
                            intent={type === item.value ? 'secondary' : 'default'}
                            startIcon={
                              type === item.value ? (
                                <Icon icon='ic:round-check' />
                              ) : (
                                <Icon icon='carbon:dot-mark' />
                              )
                            }
                            onClick={() => {
                              editDeal({
                                ...data.data,
                                boardId,
                                leadIds: data.data.leads.map((lead) => lead.id),
                                type: item.value,
                              })
                              setType(item.value)
                            }}
                          >
                            {t(item.label)}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className='flex items-start gap-2'>
                      {type === 1 && (
                        <>
                          <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>
                            {t('Leads')}
                          </p>
                          <div className='flex-1'>
                            <AutoComplete name='leadIds'>
                              <Select
                                options={leads}
                                isMulti
                                isLoading={isLeadLoading}
                                getOptionLabel={(option) => option.fullName}
                                getOptionValue={(option) => option.id}
                                onChange={(newValue) => {
                                  setDealLeads(
                                    newValue.map((item) => ({
                                      fullName: item.fullName,
                                      id: item.id,
                                      imageFile: item.picture,
                                    }))
                                  )
                                  editDeal({
                                    ...data.data,
                                    boardId,
                                    leadIds: newValue.map((item) => item.id),
                                    leads: newValue.map((item) => ({
                                      fullName: item.fullName,
                                      id: item.id,
                                      imageFile: item.picture,
                                    })),
                                  })
                                }}
                                value={leads.filter((item) =>
                                  dealLeads.find((lead) => lead.id === item.id)
                                )}
                                placeholder={t('Select leads')}
                                className='react-select-container'
                                classNamePrefix='react-select'
                              />
                            </AutoComplete>
                          </div>
                        </>
                      )}
                      {type === 2 && (
                        <>
                          <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>
                            {t('Contacts')}
                          </p>
                          <div className='flex-1'>
                            <AutoComplete name='leadIds'>
                              <Select
                                options={contacts}
                                isMulti
                                isLoading={isContactsLoading}
                                onChange={(newValue) => {
                                  setDealLeads(
                                    newValue.map((item) => ({
                                      fullName: item.fullName,
                                      id: item.id,
                                      imageFile: item.picture,
                                    }))
                                  )
                                  editDeal({
                                    ...data.data,
                                    boardId,
                                    leadIds: newValue.map((item) => item.id),
                                    leads: newValue.map((item) => ({
                                      fullName: item.fullName,
                                      id: item.id,
                                      imageFile: item.picture,
                                    })),
                                  })
                                }}
                                value={contacts.filter((item) =>
                                  dealLeads.find((contact) => contact.id === item.id)
                                )}
                                placeholder={t('Select contacts')}
                                className='react-select-container'
                                classNamePrefix='react-select'
                              />
                            </AutoComplete>
                          </div>
                        </>
                      )}
                    </div>

                    <div className='flex items-start gap-2'>
                      <p className='w-36 text-sm text-gray-500 dark:text-gray-400'>
                        {t('Description')}
                      </p>
                      <div className='flex-1'>
                        <TextArea
                          defaultValue={data.data.description}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          onBlur={(e) => {
                            if (
                              (e.target.value !== '' && e.target.value.trim() === '') ||
                              e.target.value === data.data.title
                            ) {
                              setIsEditing(false)
                              e.target.value = data.data.description
                              return
                            }
                            editDeal({
                              ...data.data,
                              boardId,
                              leadIds: data.data.leads.map((lead) => lead.id),
                              description: e.target.value.trim(),
                            })
                            setIsEditing(false)
                          }}
                          rows={description.split('\n').length || 1}
                          className='h-auto rounded-md bg-transparent py-1 transition-all focus-within:px-1 hover:px-1'
                          inputClassName='resize-none'
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>Error</div>
                )}
              </div>
            )}
            <div className='flex items-start gap-5 border-t border-gray-400 p-4 dark:border-gray-600'>
              <div className='relative h-10 w-10'>
                <Icon
                  icon='heroicons:user-circle-20-solid'
                  className='absolute top-0 right-0 transition-all group-hover:scale-110 motion-reduce:transition-none'
                  height={40}
                  width={40}
                />
                <Image
                  alt='avatar'
                  width={40}
                  height={40}
                  src={`${PIVOTPOINT_API.profilePicUrl}/${user?.profilePicture}`}
                  className='aspect-square rounded-full object-cover transition-all group-hover:scale-110 motion-reduce:transition-none'
                />
              </div>
              <div className='flex flex-1 flex-col rounded-lg border border-gray-400 py-2 px-3 dark:border-gray-600'>
                <textarea
                  className='w-full resize-none bg-transparent outline-none'
                  placeholder={t('Type a comment')}
                />
                <div className='flex justify-end'>
                  <Button>{t('Comment')}</Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <AlertDialog
        title={t('Confirm Delete')}
        description={
          <p className='py-1 text-sm text-red-500 dark:text-red-400'>
            {t('This action cannot be undone. This will permanently delete this deal.')}
          </p>
        }
        cancelText={t('Cancel')}
        confirmText={t('Yes, Delete')}
        onConfirm={handleDelete}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        buttonProps={{ intent: 'error' }}
      />
    </>
  )
}
