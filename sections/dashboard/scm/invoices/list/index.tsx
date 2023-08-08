/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react"
import { min } from "lodash"
import clsx from "clsx"
import moment from "moment"
// next
import { useRouter } from "next/router"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// redux
import { wrapper } from "store"
import { changePageNumber, changePageSize } from "store/slices/paginationSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { PATH_DASHBOARD } from "routes/paths"
// api
import {
  getInvoices,
  getRunningQueriesThunk,
  useArchiveInvoiceMutation,
  useCompletedInvoiceMutation,
  useGetInvoicesQuery,
  usePaidInvoiceMutation,
  usePendingInvoiceMutation,
} from "store/api/scm/invoices/invoicesApis"
// types
import { Invoice } from "types"
// components
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  RowSelectionState,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
import {
  AlertDialog,
  Backdrop,
  LoadingIndicator,
  IconButton,
  TextField,
  DropdownMenu,
  Tooltip,
  Select as MySelect,
  IndeterminateCheckbox,
  Badge,
} from "components"
import { Icon, Icon as Iconify } from "@iconify/react"
import InvoiceTableToolbar from "./InvoicesTableToolbar"
import InvoicePreview from "./InvoicesPreview"

export default function InvoicesList() {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const dispatch = useAppDispatch()
  const { isFallback, push } = useRouter()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [idToArchive, setIdToArchive] = useState<string | null>(null)
  // Pagination
  const { PageSize, PageNumber } = useAppSelector((state) => state.pagination)
  // Filters
  const [searchValue, setSearchValue] = useState("")

  // Query Params
  const [SearchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  // Queries
  const { data, isLoading, isSuccess, isFetching } = useGetInvoicesQuery(
    {
      SearchTerm,
      PageNumber,
      PageSize,
    },
    { skip: isFallback, refetchOnMountOrArgChange: true }
  )

  // Mutation
  const [
    deleteInvoice,
    { isLoading: isArchiveInvoiceLoading, isError: isArchiveError, isSuccess: isArchiveSuccess },
  ] = useArchiveInvoiceMutation()
  const [pendingInvoice, { isLoading: isInTransmitInvoiceLoading }] = usePendingInvoiceMutation()
  const [paidInvoice, { isLoading: isArrivedInvoiceLoading }] = usePaidInvoiceMutation()
  const [completedInvoice, { isLoading: isCompletedInvoiceLoading }] = useCompletedInvoiceMutation()

  const columnHelper = createColumnHelper<Invoice>()

  const columns = [
    columnHelper.accessor("id", {
      id: "select",
      size: 24,
      enableSorting: false,
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    }),
    columnHelper.accessor("invoiceTitle", {
      id: "invoiceTitle",
      header: () => t("Title"),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("created", {
      id: "created",
      header: () => t("Created"),
      cell: (created) => moment(created.getValue()).format("LL"),
    }),
    columnHelper.accessor("due", {
      id: "due",
      header: () => t("Start Address"),
      cell: (due) => due.getValue(),
    }),
    columnHelper.accessor("total", {
      id: "total",
      header: () => t("Amount"),
      cell: (total) => `${total.getValue()} ${t("Da")}`,
    }),

    columnHelper.accessor("status", {
      id: "status",
      header: () => t("Status"),
      cell: (status) => {
        if (status.getValue() === 1)
          return <Badge variant='ghost' intent='warning' size='small' label={t("Pending")} />
        if (status.getValue() === 2)
          return <Badge variant='ghost' intent='success' size='small' label={t("Paid")} />
        if (status.getValue() === 3)
          return <Badge variant='ghost' intent='success' size='small' label={t("Completed")} />
        if (status.getValue() === 4)
          return <Badge variant='ghost' intent='info' size='small' label={t("Overdue")} />
        return <Badge variant='ghost' intent='info' size='small' label={t("Created")} />
      },
    }),
    columnHelper.accessor((row) => row, {
      id: "actions",
      size: 1,
      enableSorting: false,
      header: () => <p className='w-full text-right'>{t("Actions")}</p>,
      cell: (invoice) => (
        <div className='flex items-center justify-end gap-2'>
          <Tooltip title={t("View Details")} side='bottom'>
            <IconButton
              onClick={() => push(PATH_DASHBOARD.scm.invoices.invoice(invoice.getValue().id))}
            >
              <Iconify icon='mingcute:external-link-fill' height={18} />
            </IconButton>
          </Tooltip>
          <DropdownMenu
            trigger={
              <div>
                <Tooltip title={t("More")} side='bottom'>
                  <IconButton>
                    <Iconify icon='material-symbols:more-vert' height={20} />
                  </IconButton>
                </Tooltip>
              </div>
            }
            items={[
              {
                type: "dropdown",
                label: t("Change Status"),
                icon: <Iconify icon='ic:round-change-circle' height={18} />,
                subItems: [
                  {
                    type: "button",
                    label: t("Pending"),
                    icon: (
                      <Icon
                        icon={
                          invoice.getValue().status !== 1 ? "tabler:point-filled" : "ic:round-check"
                        }
                        className='text-orange-400'
                        height={18}
                      />
                    ),
                    onClick: () => {
                      if (invoice.getValue().status !== 1)
                        pendingInvoice({ id: invoice.getValue().id, PageNumber, PageSize })
                    },
                  },
                  {
                    type: "button",
                    label: t("Paid"),
                    icon: (
                      <Icon
                        icon={
                          invoice.getValue().status !== 2 ? "tabler:point-filled" : "ic:round-check"
                        }
                        className='text-primary-400'
                        height={18}
                      />
                    ),
                    onClick: () => {
                      if (invoice.getValue().status !== 2)
                        paidInvoice({ id: invoice.getValue().id, PageNumber, PageSize })
                    },
                  },
                  {
                    type: "button",
                    label: t("Completed"),
                    icon: (
                      <Icon
                        icon={
                          invoice.getValue().status !== 3 ? "tabler:point-filled" : "ic:round-check"
                        }
                        className='text-green-400'
                        height={18}
                      />
                    ),
                    onClick: () => {
                      if (invoice.getValue().status !== 3)
                        completedInvoice({ id: invoice.getValue().id, PageNumber, PageSize })
                    },
                  },
                ],
              },
              {
                type: "button",
                label: t("Edit"),
                icon: <Iconify icon='ic:round-edit' height={18} />,
                onClick: () => push(PATH_DASHBOARD.scm.invoices.edit(invoice.getValue().id)),
              },
              {
                type: "button",
                label: t("Archive"),
                icon: <Iconify icon='ic:round-archive' height={18} />,
                className: "text-red-600 dark:text-red-400",
                loading: isArchiveInvoiceLoading,
                onClick: () => setIdToArchive(invoice.getValue().id),
              },
            ]}
          />
        </div>
      ),
    }),
  ]

  useEffect(() => {
    if (isArchiveError) {
      open({
        message: t("A problem has occurred."),
        autoHideDuration: 4000,
        type: "error",
        variant: "contained",
      })
    }
    if (isArchiveSuccess) {
      open({
        message: t("Invoice Archived Successfully."),
        autoHideDuration: 4000,
        type: "success",
        variant: "contained",
      })
    }
  }, [isArchiveError, isArchiveSuccess])

  useEffect(() => {
    if (isSuccess) dispatch(changePageSize(data.pageSize))
  }, [isLoading, isFetching])

  const table = useReactTable({
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    data: data?.data || [],
    columns,
    state: {
      rowSelection,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })

  useEffect(() => {
    setSelectedIds(
      data?.data
        .map((invoice, i) => (Object.keys(rowSelection).includes(i.toString()) ? invoice.id : ""))
        .filter((item) => item !== "") || []
    )
  }, [rowSelection])

  return (
    <>
      <div className='flex items-center justify-center gap-6 p-3 '>
        <TextField
          placeholder={t("Search...")}
          endAdornment={
            <IconButton onClick={() => setSearchTerm(searchValue === "" ? undefined : searchValue)}>
              <Iconify icon='ion:search-outline' height={18} className='text-gray-500' />
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
      {isLoading || isFetching ? (
        <div className='flex h-56 w-full items-center justify-center'>
          <LoadingIndicator />
        </div>
      ) : (
        <>
          {data?.data && data?.data.length > 0 ? (
            <>
              <div className='w-full overflow-x-scroll'>
                <div className='w-max min-w-full'>
                  <table className='w-full'>
                    <thead className='bg-gray-100 ltr:text-left rtl:text-right dark:!bg-paper-dark-contrast dark:text-white'>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className='border-none text-sm'>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              className='whitespace-nowrap p-4 text-sm font-semibold'
                              style={{
                                width: header.getSize() !== 0 ? header.getSize() : undefined,
                              }}
                            >
                              {header.isPlaceholder ? null : (
                                <div
                                  {...{
                                    className: header.column.getCanSort()
                                      ? "cursor-pointer select-none flex items-center gap-2"
                                      : "",
                                    onClick: header.column.getToggleSortingHandler(),
                                  }}
                                >
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                  {{
                                    asc: (
                                      <Icon
                                        icon='material-symbols:arrow-drop-up-rounded'
                                        fontSize={24}
                                      />
                                    ),
                                    desc: (
                                      <Icon
                                        icon='material-symbols:arrow-drop-down-rounded'
                                        fontSize={24}
                                      />
                                    ),
                                  }[header.column.getIsSorted() as string] ?? null}
                                </div>
                              )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          className={clsx(
                            "cursor-pointer border-b last-of-type:border-b-0 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-paper-hover-dark",
                            row.getIsSelected() && "bg-gray-50 dark:bg-paper-hover-dark/80"
                          )}
                          // onDoubleClick={() => dispatch(previewInvoice(row.original))}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className='px-4 py-2'
                              style={{
                                width:
                                  cell.column.getSize() !== 0 ? cell.column.getSize() : undefined,
                              }}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='flex w-max min-w-full items-center justify-end divide-x border-t p-4 rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600'>
                    <div className='flex items-center justify-center gap-2 px-2'>
                      <p className='text-sm'>{t("Row per page : ")}</p>
                      <MySelect
                        items={["10", "25", "50"].map((item) => ({ label: item, value: item }))}
                        onValueChange={(page) => dispatch(changePageSize(Number(page)))}
                        value={String(PageSize)}
                        buttonProps={{ intent: "default" }}
                      />
                    </div>
                    <div className='flex h-full items-center justify-center gap-2 p-2 '>
                      <p className='text-sm'>
                        {(data.pageNumber - 1) * (data.pageSize + 1) === 0
                          ? 1
                          : (data.pageNumber - 1) * (data.pageSize + 1)}{" "}
                        - {min([data.pageNumber * data.pageSize, data.totalRecords])} {t("of")}{" "}
                        {data.totalRecords}
                      </p>
                    </div>
                    <div className='flex items-center justify-center gap-2 px-2'>
                      <Tooltip side='bottom' title={t("First page")}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() => dispatch(changePageNumber(1))}
                          disabled={PageNumber === 1}
                        >
                          <Icon
                            icon='fluent:chevron-double-left-20-filled'
                            className='rtl:rotate-180'
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip side='bottom' title={t("Previous page")}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() =>
                            dispatch(changePageNumber(PageNumber > 1 ? PageNumber - 1 : 1))
                          }
                          disabled={PageNumber === 1}
                        >
                          <Icon icon='fluent:chevron-left-20-filled' className='rtl:rotate-180' />
                        </IconButton>
                      </Tooltip>
                      <p className='text-sm'>
                        {t("Page")} {PageNumber} {t("of")} {data.totalPages}
                      </p>
                      <Tooltip side='bottom' title={t("Next page")}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() =>
                            dispatch(
                              changePageNumber(
                                PageNumber < data.totalPages ? PageNumber + 1 : data.totalPages
                              )
                            )
                          }
                          disabled={PageNumber === data.totalPages}
                        >
                          <Icon icon='fluent:chevron-right-20-filled' className='rtl:rotate-180' />
                        </IconButton>
                      </Tooltip>
                      <Tooltip side='bottom' title={t("Last page")}>
                        <IconButton
                          className='border dark:border-gray-600'
                          onClick={() => dispatch(changePageNumber(data.totalPages))}
                          disabled={PageNumber === data.totalPages}
                        >
                          <Icon
                            icon='fluent:chevron-double-right-20-filled'
                            className='rtl:rotate-180'
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <InvoiceTableToolbar
                  selectedCount={Object.keys(rowSelection).length}
                  selectedIds={selectedIds}
                  setRowSelection={setRowSelection}
                />
                <InvoicePreview />
              </div>
            </>
          ) : (
            <div className='flex h-56 flex-col items-center justify-center gap-2 px-4 py-2'>
              <h1 className='text-xl font-semibold'>{t("No Invoice Found")}</h1>
            </div>
          )}
        </>
      )}
      <Backdrop
        open={
          isArchiveInvoiceLoading ||
          isInTransmitInvoiceLoading ||
          isArrivedInvoiceLoading ||
          isCompletedInvoiceLoading
        }
        loading={
          isArchiveInvoiceLoading ||
          isInTransmitInvoiceLoading ||
          isArrivedInvoiceLoading ||
          isCompletedInvoiceLoading
        }
      />
      <AlertDialog
        title={t("Confirm Archive")}
        description={
          <p className='my-2 text-red-500 dark:text-red-400'>
            {t("Are you sure you want to archive this invoice?")}
          </p>
        }
        cancelText={t("Cancel")}
        confirmText={t("Yes, Archive")}
        onConfirm={() => {
          deleteInvoice({ id: idToArchive || "", PageNumber, PageSize })
          setIdToArchive(null)
        }}
        open={idToArchive !== null}
        onClose={() => setIdToArchive(null)}
        buttonProps={{ intent: "error" }}
      />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  if (store.getState().session.token)
    store.dispatch(getInvoices.initiate({ PageSize: 10, PageNumber: 1 }))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
