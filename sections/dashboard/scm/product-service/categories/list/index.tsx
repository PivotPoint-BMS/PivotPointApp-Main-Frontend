import React, { useEffect, useState } from "react"
import clsx from "clsx"
// hooks
import useTranslate from "hooks/useTranslate"
import useSnackbar from "hooks/useSnackbar"
// redux
import { wrapper } from "store"
import {
  getCategories,
  getRunningQueriesThunk,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "store/api/scm/products-service/productsApi"
// types
import { Category } from "types"
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
import { Icon } from "@iconify/react"
import {
  LoadingIndicator,
  IconButton,
  Tooltip,
  Backdrop,
  Dialog,
  AlertDialog,
  IndeterminateCheckbox,
} from "components"
// sections
import CategoriesTableToolbar from "./CategoriesTableToolbar"
import CreateEditCategoryForm from "../create/CreateEditCategoryForm"

export default function CategoriesList({
  openAddDialog,
  setOpenAddDialog,
}: {
  openAddDialog: boolean
  setOpenAddDialog: (value: boolean) => void
}) {
  const { t } = useTranslate()
  const { open } = useSnackbar()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)
  const [idToDelete, setIdToDelete] = useState<string | null>(null)
  // Query Params
  const { data, isLoading, isFetching } = useGetCategoriesQuery(undefined, {
    refetchOnFocus: true,
  })

  const [deleteCategory, { isLoading: isDeleteLeading, isSuccess, isError }] =
    useDeleteCategoryMutation()

  const columnHelper = createColumnHelper<Category>()
  const columns = [
    columnHelper.accessor("id", {
      id: "select",
      enableSorting: false,
      size: 24,
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
    columnHelper.accessor("name", {
      id: "name",
      header: () => t("Name"),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor((row) => row, {
      id: "actions ",
      enableSorting: false,
      size: 50,
      header: () => <p className='w-full text-right'>{t("Actions")}</p>,
      cell: (category) => (
        <div className='flex items-center justify-end gap-2'>
          <Tooltip title={t("Delete")} side='bottom'>
            <IconButton onClick={() => setIdToDelete(category.getValue().id || "")}>
              <Icon className='text-red-600 dark:text-red-400' icon='ic:round-delete' height={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("Edit")} side='bottom'>
            <IconButton
              onClick={() => {
                setCategoryToEdit(category.row.original)
                setOpenEditDialog(true)
              }}
            >
              <Icon icon='ic:round-edit' height={20} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    }),
  ]

  useEffect(() => {
    if (isError) {
      open({
        message: t("A problem has occurred."),
        autoHideDuration: 4000,
        type: "error",
        variant: "contained",
      })
    }
    if (isSuccess) {
      open({
        message: t("Category Deleted Successfully."),
        autoHideDuration: 4000,
        type: "success",
        variant: "contained",
      })
    }
  }, [isError, isSuccess])

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
        .filter((item) => item.id && Object.keys(rowSelection).includes(item.id))
        .map((item) => item.id || "") || []
    )
  }, [rowSelection])

  return (
    <>
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
                </div>
              </div>
            </>
          ) : (
            <div className='flex h-56 flex-col items-center justify-center gap-2 px-4 py-2'>
              <h1 className='text-xl font-semibold'>{t("No Categories Found")}</h1>
            </div>
          )}
        </>
      )}
      <CategoriesTableToolbar
        selectedCount={Object.keys(rowSelection).length}
        selectedIds={selectedIds}
        setRowSelection={setRowSelection}
      />
      <Backdrop loading={isDeleteLeading} />
      <Dialog
        open={openEditDialog || openAddDialog}
        title={openEditDialog ? t("Edit Category") : t("Add Category")}
      >
        <CreateEditCategoryForm
          isEdit={openEditDialog}
          currentCategory={categoryToEdit}
          onSuccess={() => {
            setOpenAddDialog(false)
            setOpenEditDialog(false)
          }}
          onFailure={() => {
            setOpenAddDialog(false)
            setOpenEditDialog(false)
          }}
        />
      </Dialog>
      <AlertDialog
        title={t("Confirm Delete")}
        description={t("This action cannot be undone. This will permanently delete this category.")}
        cancelText={t("Cancel")}
        confirmText={t("Yes, Delete")}
        onConfirm={() => {
          deleteCategory(idToDelete || "")
          setIdToDelete(null)
        }}
        open={idToDelete !== null}
        onClose={() => setIdToDelete(null)}
        buttonProps={{ intent: "error" }}
      />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getCategories.initiate())

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})
