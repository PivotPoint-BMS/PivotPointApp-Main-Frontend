export default interface SnackbarOptions {
  id: string
  message?: string
  type?: 'error' | 'warning' | 'success' | 'info'
  autoHideDuration?: number
  variant?: 'contained' | 'outlined'
  closeButton?: boolean
}
