import clsx from 'clsx'
// redux
import { useAppSelector } from 'store/hooks'
// components
import Snackbar from './Snackbar'

export default function SnackbarProvider({
  children,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const { snackbars } = useAppSelector((state) => state.snackbar)
  return (
    <div>
      {children}
      {snackbars.length > 0 && (
        <div
          className={clsx(
            'fixed bottom-0 left-0 z-[9999] ml-5 mb-5 flex flex-col-reverse flex-wrap items-center justify-center gap-4'
          )}
        >
          {snackbars.map(({ id, autoHideDuration, message, type, variant }) => (
            <Snackbar
              key={`snackbar-${id}`}
              id={id}
              message={message}
              autoHideDuration={autoHideDuration}
              type={type}
              variant={variant}
            />
          ))}
        </div>
      )}
    </div>
  )
}
