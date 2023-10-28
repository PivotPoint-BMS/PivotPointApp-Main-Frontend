import clsx from "clsx"
// redux
import { useAppDispatch, useAppSelector } from "store/hooks"
import { setThemeLayout } from "store/slices/settingsSlice"
// hooks
import useTranslate from "hooks/useTranslate"
// components
import Card from "components/Card"
import CardContent from "components/CardContent"

export default function ProfileLayout() {
  const { t } = useTranslate()
  const dispatch = useAppDispatch()
  const { themeLayout } = useAppSelector((state) => state.settings)

  return (
    <Card className='col-span-2 !w-full'>
      <CardContent className='flex items-center gap-10 p-5'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <button
            className='flex h-28 w-28 divide-x divide-dashed rounded border border-dashed dark:divide-gray-600 dark:border-gray-600'
            onClick={() => dispatch(setThemeLayout("vertical"))}
          >
            <div className='items-starts flex h-full w-8 flex-col gap-2 p-1'>
              <div
                className={clsx(
                  "h-3 w-3 rounded-full bg-gradient-to-br",
                  themeLayout === "vertical"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-1 w-6 rounded-full bg-gradient-to-r",
                  themeLayout === "vertical"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-1 w-6 rounded-full bg-gradient-to-r",
                  themeLayout === "vertical"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-1 w-6 rounded-full bg-gradient-to-r",
                  themeLayout === "vertical"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
            </div>
            <div className='h-full w-full flex-1 p-1'>
              <div
                className={clsx(
                  "h-full w-full rounded-md bg-gradient-to-b",
                  themeLayout === "vertical"
                    ? "from-primary-100/50 to-primary-700/50"
                    : "bg-gray-300 dark:bg-gray-600"
                )}
              ></div>
            </div>
          </button>
          <label>{t("Vertical")}</label>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <button
            className='flex h-28 w-28 divide-x divide-dashed rounded border border-dashed dark:divide-gray-600 dark:border-gray-600'
            onClick={() => dispatch(setThemeLayout("double"))}
          >
            <div className='items-starts flex h-full w-4 flex-col gap-2 p-1'>
              <div
                className={clsx(
                  "h-2 w-2 rounded-full bg-gradient-to-br",
                  themeLayout === "double"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-2 w-2 rounded-sm bg-gradient-to-r",
                  themeLayout === "double"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-2 w-2 rounded-sm bg-gradient-to-r",
                  themeLayout === "double"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-2 w-2 rounded-sm bg-gradient-to-r",
                  themeLayout === "double"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
            </div>
            <div className='items-starts flex h-full w-6 flex-col gap-2 p-1 pt-4'>
              <div
                className={clsx(
                  "h-1 w-4 rounded-full bg-gradient-to-r",
                  themeLayout === "double"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-1 w-4 rounded-full bg-gradient-to-r",
                  themeLayout === "double"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-1 w-4 rounded-full bg-gradient-to-r",
                  themeLayout === "double"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
            </div>
            <div className='h-full w-full flex-1 p-1'>
              <div
                className={clsx(
                  "h-full w-full rounded-md bg-gradient-to-b",
                  themeLayout === "double"
                    ? "from-primary-100/50 to-primary-700/50"
                    : "bg-gray-300 dark:bg-gray-600"
                )}
              ></div>
            </div>
          </button>
          <label>{t("Double Side Bar")}</label>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <button
            className='flex h-28 w-28 flex-col divide-y divide-dashed rounded border border-dashed dark:divide-gray-600 dark:border-gray-600'
            // onClick={() => dispatch(setThemeLayout('horizontal'))}
          >
            <div className='items-starts flex h-4 w-full items-end gap-2 p-1'>
              <div
                className={clsx(
                  "h-2 w-2 rounded-full bg-gradient-to-br",
                  themeLayout === "horizontal"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-1 w-4 rounded-full bg-gradient-to-r",
                  themeLayout === "horizontal"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>{" "}
              <div
                className={clsx(
                  "h-1 w-4 rounded-full bg-gradient-to-r",
                  themeLayout === "horizontal"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
              <div
                className={clsx(
                  "h-1 w-4 rounded-full bg-gradient-to-r",
                  themeLayout === "horizontal"
                    ? "from-primary-100 to-primary-700"
                    : "from-gray-200 to-gray-400"
                )}
              ></div>
            </div>
            <div className='h-full w-full flex-1 p-1'>
              <div
                className={clsx(
                  "h-full w-full rounded-md bg-gradient-to-b",
                  themeLayout === "horizontal"
                    ? "from-primary-100/50 to-primary-700/50"
                    : "bg-gray-300 dark:bg-gray-600"
                )}
              ></div>
            </div>
          </button>
          <label>{t("Horizontal")}</label>
        </div>
      </CardContent>
    </Card>
  )
}
