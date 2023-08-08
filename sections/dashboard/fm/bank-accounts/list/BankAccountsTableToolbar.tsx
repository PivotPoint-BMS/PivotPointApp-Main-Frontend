import React, { useState } from "react"
// motion
import { Variant, motion } from "framer-motion"
// api
// import { useBulkDeleteSupplierMutation } from 'store/api/scm/products-service/suppliersApis'
// hooks
import useTranslate from "hooks/useTranslate"
// import useSnackbar from 'hooks/useSnackbar'
import { RowSelectionState } from "@tanstack/react-table"
// components
import { Icon as Iconify } from "@iconify/react"
import Button from "components/Button"
import AlertDialog from "components/AlertDialog"

interface SupplierTableToolbarProps {
  selectedCount: number
  selectedIds: string[]
  setRowSelection: (value: RowSelectionState) => void
}

export default function SupplierTableToolbar({
  selectedCount,
  // selectedIds,
  setRowSelection,
}: SupplierTableToolbarProps) {
  const { t } = useTranslate()
  // const { open } = useSnackbar()
  const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false)
  // const [bulkDeleteSupplier, { isLoading, isSuccess, isError }] = useBulkDeleteSupplierMutation()
  const variants: { [key: string]: Variant } = {
    closed: { y: "200%", x: "-50%" },
    opened: { y: "0%", x: "-50%" },
  }

  const handleBulkDelete = () => {
    // bulkDeleteSupplier(selectedIds)
    setRowSelection({})
    setOpenBulkDeleteDialog(false)
  }

  // useEffect(() => {
  //   if (isError) {
  //     open({
  //       message: t('A problem has occurred.'),
  //       autoHideDuration: 4000,
  //       type: 'error',
  //       variant: 'contained',
  //     })
  //   }
  //   if (isSuccess) {
  //     open({
  //       message: t('Suppliers Deleted Successfully.'),
  //       autoHideDuration: 4000,
  //       type: 'success',
  //       variant: 'contained',
  //     })
  //   }
  // }, [isError, isSuccess])

  return (
    <>
      <motion.div
        initial='closed'
        animate={selectedCount > 0 ? "opened" : "closed"}
        variants={variants}
        transition={{ type: "spring", duration: 0.6 }}
        className='fixed bottom-10 left-1/2 z-50 h-14 max-w-full px-4'
      >
        <div className='overflow-x-scroll'>
          <div className='flex h-full w-max flex-wrap items-center justify-center divide-x whitespace-pre-wrap rounded-lg border border-r bg-white py-1 px-4 drop-shadow-xl rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600 dark:bg-paper-dark'>
            <p className='font-medium ltr:mr-10 rtl:ml-10'>
              {selectedCount} {t("Items Selected")}
            </p>
            <div className='px-1'>
              <Button
                variant='text'
                intent='error'
                startIcon={<Iconify icon='ic:round-delete' height={20} />}
                onClick={() => setOpenBulkDeleteDialog(true)}
                // loading={isLoading}
              >
                {t("Delete")}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      <AlertDialog
        title={t("Confirm Delete")}
        description={
          <p className='py-1 text-sm text-red-500 dark:text-red-400'>
            {t("This action cannot be undone. This will permanently delete these suppliers.")}
          </p>
        }
        cancelText={t("Cancel")}
        confirmText={t("Yes, Delete")}
        onConfirm={handleBulkDelete}
        open={openBulkDeleteDialog}
        onClose={() => setOpenBulkDeleteDialog(false)}
        buttonProps={{ intent: "error" }}
      />
    </>
  )
}
