import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import clsx from "clsx"
// hooks
import useTranslate from "hooks/useTranslate"
// utils
import getActivePath from "utils/getActivePath"
// components
import { Icon as Iconify } from "@iconify/react"
import { Badge } from "components"

type Props = {
  name: string
  href: string
  icon: string
  disabled: boolean
  isCollapsed: boolean
  badge?: {
    color?: "primary" | "secondary" | "info" | "warning" | "error" | "success" | "default"
    label: string
  }
}

export default function SubNavItemTwo({ name, href, icon, badge, disabled, isCollapsed }: Props) {
  const { pathname, asPath } = useRouter()
  const active = getActivePath(href, pathname, asPath)
  const { t } = useTranslate()

  return (
    <Link
      href={disabled ? "" : href}
      className={clsx(
        "group flex w-full items-center gap-2 rounded-lg p-4 hover:bg-gray-500/10 dark:text-white",
        active && "bg-primary-600/20 text-primary-900 hover:!bg-primary-500/25",
        disabled &&
          "pointer-events-none cursor-not-allowed opacity-40 hover:bg-gray-100/40 dark:hover:bg-secondary-100/60"
      )}
    >
      <div className='ltr:mr-2 rtl:ml-2'>
        <Iconify icon={icon} height={24} width={24} />
      </div>
      <label
        className={clsx(
          "flex-1 cursor-pointer font-medium capitalize",
          isCollapsed
            ? "whitespace-pre-wrap text-[0px] opacity-0 transition-all duration-300 group-hover:text-xs group-hover:opacity-100"
            : "text-xs",
          disabled && "cursor-not-allowed"
        )}
      >
        {name}
      </label>
      {badge && (
        <Badge
          label={t(badge?.label)}
          intent={badge?.color}
          className={clsx("truncate text-[10px]", isCollapsed && "scale-0 group-hover:scale-100")}
        />
      )}
    </Link>
  )
}
