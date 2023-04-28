// redux
import { useAppDispatch } from 'store/hooks'
import { closeSnackbar, openSnackbar } from 'store/slices/snackbarSlice'
import { SnackbarOptions } from 'types'

const useSnackbar = () => {
  const dispatch = useAppDispatch()

  const open = (options: Omit<SnackbarOptions, 'id'>) => dispatch(openSnackbar(options))

  const close = (id: string) => dispatch(closeSnackbar(id))

  return { open, close }
}

export default useSnackbar
