import React, { useEffect, useState } from "react"
// motion
// redux
import { useAppDispatch, useAppSelector } from "store/hooks"
import { closePreviewDeal } from "store/slices/dealPreviewSlice"
import {
  useDeleteDealMutation,
  useEditDealMutation,
  useGetDealQuery,
} from "store/api/crm/sales-pipeline/dealsBoardsApi"
import { useGetContactsQuery, useGetLeadsQuery } from "store/api/crm/contact-leads/leadApis"
import { skipToken } from "@reduxjs/toolkit/dist/query"
// config
import { DEALTYPES, PIVOTPOINT_API } from "config"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// components
import Select from "react-select"
import { Icon } from "@iconify/react"
import IconButton from "components/IconButton"
import LoadingIndicator from "components/LoadingIndicator"
import TextArea from "components/TextArea"
import Image from "components/Image"
import Button from "components/Button"
import AutoComplete from "components/FieldContainer"
import Tooltip from "components/Tooltip"
import AlertDialog from "components/AlertDialog"
import { Deal, Lead } from "types"
import moment from "moment"
import TextField from "components/TextField"
import Sheet from "components/Sheet"

export default function DealPreview({ boardId }: { boardId: string }) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState(0)
  const [potentialDealValue, setPotentialDealValue] = useState<string | number>("")
  const [successProbability, setSuccessProbability] = useState<string | number>("")
  const [dealLeads, setDealLeads] = useState<Deal["leads"]>([])
  const { isOpen, dealId } = useAppSelector((state) => state.dealPreview)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { user } = useAppSelector((state) => state.session)

  // Query
  const { data, isLoading, isSuccess } = useGetDealQuery(dealId || skipToken)
  const {
    data: leadsResponse,
    isSuccess: isLeadSuccess,
    isLoading: isLeadLoading,
  } = useGetLeadsQuery({ PageNumber: 1, PageSize: 50 })
  const {
    data: contactsResponse,
    isSuccess: isContactsSuccess,
    isLoading: isContactsLoading,
  } = useGetContactsQuery({ PageNumber: 1, PageSize: 50 })

  // Mutation
  const [editDeal, { isError: isEditError, isSuccess: isEditSuccess }] = useEditDealMutation()
  const [deleteDeal, { isError: isDeleteError, isSuccess: isDeleteSuccess }] =
    useDeleteDealMutation()

  const [leads, setLeads] = useState<Lead[]>(isLeadSuccess ? leadsResponse?.data : [])
  const [contacts, setContacts] = useState<Lead[]>(isContactsSuccess ? contactsResponse?.data : [])

  const handleDelete = () => {
    deleteDeal({ dealId: dealId || "", boardId })
  }

  useEffect(() => {
    if (isLeadSuccess) setLeads(leadsResponse?.data)
  }, [isLeadLoading])

  useEffect(() => {
    if (isContactsSuccess) setContacts(contactsResponse?.data)
  }, [isContactsLoading])

  useEffect(() => {
    if (isSuccess) {
      setTitle(data.data.title)
      setDescription(data.data.description)
      setType(data.data.type)
      setDealLeads(data.data.leads)
      setPotentialDealValue(data.data.potentialDealValue)
      setSuccessProbability(data.data.successProbability)
    }
  }, [isLoading, data])

  useEffect(() => {
    if (isEditError) {
      open({
        message: t("Sorry, Deal not updated, A problem has occurred."),
        autoHideDuration: 4000,
        type: "error",
        variant: "contained",
      })
    }
    if (isEditSuccess) {
      open({
        message: t("Deal Updated Successfully."),
        autoHideDuration: 4000,
        type: "success",
        variant: "contained",
      })
    }
  }, [isEditError, isEditSuccess])

  useEffect(() => {
    if (isDeleteError) {
      open({
        message: t("Sorry, Deal not deleted, A problem has occurred."),
        autoHideDuration: 4000,
        type: "error",
        variant: "contained",
      })
    }
    if (isDeleteSuccess) {
      open({
        message: t("Deal Deleted Successfully."),
        autoHideDuration: 4000,
        type: "success",
        variant: "contained",
      })
      dispatch(closePreviewDeal())
      setOpenDeleteDialog(false)
    }
  }, [isDeleteError, isDeleteSuccess])

  return (
    <>
      <Sheet
        title={t("Deal Preview")}
        isOpen={isOpen}
        handleClose={() => dispatch(closePreviewDeal())}
        actions={
          <Tooltip title={t("Delete")}>
            <IconButton onClick={() => setOpenDeleteDialog(true)}>
              <Icon icon='ic:round-delete' height={20} className='text-red-600 dark:text-red-400' />
            </IconButton>
          </Tooltip>
        }
        className='sm:w-[500px]'
      >
        {isLoading ? (
          <div className='flex h-full w-full flex-1 items-center justify-center'>
            <LoadingIndicator />
          </div>
        ) : (
          <div className='flex flex-1 flex-col gap-5 overflow-y-scroll px-4 py-2'>
            {isSuccess && data.data ? (
              <>
                <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {t("Title")}
                  </p>
                  <TextField
                    type='text'
                    defaultValue={data.data.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value === "" || e.target.value === data.data.title) {
                        setTitle(data.data.title)
                        return
                      }
                      editDeal({
                        ...data.data,
                        boardId,
                        leadIds: data.data.leads.map((lead) => lead.id),
                        title: e.target.value,
                      })
                    }}
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      {t("Created By")}
                    </p>
                    <p className='font-bold'>{data.data.createdBy}</p>
                  </div>
                  <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      {t("Created At")}
                    </p>
                    <p className='font-bold'>
                      {moment(data.data.createdAt).add("hour", 1).format("ddd DD MMMM YYYY, HH:mm")}
                    </p>
                  </div>
                  {data.data.lastUpdatedBy && (
                    <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                      <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                        {t("Last Update By")}
                      </p>
                      <p className='font-bold'>{data.data.lastUpdatedBy}</p>
                    </div>
                  )}
                  <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      {t("Assignee")}
                    </p>
                    <p className='font-bold'>{data.data.assignedTo || t("No Assignee")}</p>
                  </div>
                  <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      {t("Potential Deal Value")}
                    </p>
                    <TextField
                      type='number'
                      defaultValue={data.data.potentialDealValue}
                      value={potentialDealValue}
                      onChange={(e) =>
                        setPotentialDealValue(Number(e.target.value !== "" ? e.target.value : 0))
                      }
                      onBlur={(e) => {
                        if (
                          e.target.value === "" ||
                          e.target.value === data.data.potentialDealValue.toString()
                        ) {
                          return
                        }
                        editDeal({
                          ...data.data,
                          boardId,
                          leadIds: data.data.leads.map((lead) => lead.id),
                          potentialDealValue: Number(e.target.value !== "" ? e.target.value : 0),
                        })
                      }}
                      className='!border-0 font-bold'
                    />
                  </div>
                  <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      {t("Success Probability")}
                    </p>
                    <TextField
                      type='number'
                      defaultValue={data.data.successProbability}
                      value={successProbability}
                      onChange={(e) =>
                        setSuccessProbability(Number(e.target.value !== "" ? e.target.value : 0))
                      }
                      onBlur={(e) => {
                        if (
                          e.target.value === "" ||
                          e.target.value === data.data.successProbability.toString()
                        ) {
                          return
                        }
                        editDeal({
                          ...data.data,
                          boardId,
                          leadIds: data.data.leads.map((lead) => lead.id),
                          successProbability: Number(e.target.value !== "" ? e.target.value : 0),
                        })
                      }}
                      className='!border-0 font-bold'
                    />
                  </div>
                </div>
                <div className='space-y-2 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {t("Type")}
                  </p>
                  <div className='flex items-center gap-2'>
                    {DEALTYPES.map((item) => (
                      <Button
                        variant='outlined'
                        className='!rounded-md !px-3 !py-2 !text-xs'
                        intent={type === item.value ? "secondary" : "default"}
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
                {type === 1 && (
                  <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      {t("Leads")}
                    </p>
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
                        placeholder=''
                        className='react-select-container'
                        classNamePrefix='react-select'
                      />
                    </AutoComplete>
                  </div>
                )}
                {type === 2 && (
                  <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                    <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                      {t("Contacts")}
                    </p>
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
                        placeholder=''
                        className='react-select-container'
                        classNamePrefix='react-select'
                      />
                    </AutoComplete>
                  </div>
                )}
                <div className='space-y-1 rounded-md bg-gray-100 p-2 dark:bg-paper-dark-contrast '>
                  <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
                    {t("Description")}
                  </p>
                  <TextArea
                    defaultValue={data.data.description}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={(e) => {
                      if (
                        (e.target.value !== "" && e.target.value.trim() === "") ||
                        e.target.value === data.data.title
                      ) {
                        e.target.value = data.data.description
                        return
                      }
                      editDeal({
                        ...data.data,
                        boardId,
                        leadIds: data.data.leads.map((lead) => lead.id),
                        description: e.target.value.trim(),
                      })
                    }}
                    rows={description.split("\n").length || 1}
                    className='h-auto rounded-md bg-transparent py-1 font-bold transition-all focus-within:px-1 hover:px-1'
                    inputClassName='resize-none'
                  />
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
          <div className='flex flex-1 flex-col rounded border border-gray-400 py-2 px-3 dark:border-gray-600'>
            <textarea
              className='w-full resize-none bg-transparent outline-none'
              placeholder={t("Type a comment")}
            />
            <div className='flex justify-end'>
              <Button>{t("Comment")}</Button>
            </div>
          </div>
        </div>
      </Sheet>
      <AlertDialog
        title={t("Confirm Delete")}
        description={
          <p className='py-1 text-sm text-red-500 dark:text-red-400'>
            {t("This action cannot be undone. This will permanently delete this deal.")}
          </p>
        }
        cancelText={t("Cancel")}
        confirmText={t("Yes, Delete")}
        onConfirm={handleDelete}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        buttonProps={{ intent: "error" }}
      />
    </>
  )
}
