export default interface SnackbarOptions {
  message?: string
  type?: 'error' | 'warning' | 'success' | 'info'
  autoHideDuration?: number
  side?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-left'
    | 'bottom-left'
    | 'top-right'
    | 'bottom-right'
  variant?: 'contained' | 'outlined'
}
