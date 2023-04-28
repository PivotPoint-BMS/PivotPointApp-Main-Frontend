// redux
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closeSnackbar, openSnackbar } from 'store/slices/snackbarSlice'
import { SnackbarOptions } from 'types'

const useSnackbar = () => {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector((state) => state.snackbar)

  const open = (options: SnackbarOptions) => {
    if (!isOpen) dispatch(openSnackbar(options))
  }
  const close = () => {
    if (isOpen) dispatch(closeSnackbar())
  }

  return { open, close }
}

export default useSnackbar
