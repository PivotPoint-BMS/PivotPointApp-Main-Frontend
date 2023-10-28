import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
// radix
// hooks
import useTranslate from "hooks/useTranslate"
import { useAppSelector } from "store/hooks"
// utils
import getActivePath from "utils/getActivePath"
// utils
import { Icon } from "@iconify/react"
import DropdownMenu, { MenuItemProps } from "components/DropdownMenu"
import { concat } from "lodash"

export type CollapsedNavItemProps =
  | {
      href: string
      root: string
      name: string
      icon: React.ReactElement
      asLink?: boolean
      disabled?: boolean
      onClick?: () => void
      roles?: string[]
      subItems?: {
        name: string
        href?: string
        icon?: string
        disabled?: boolean
        badge?: {
          color?: "primary" | "secondary" | "info" | "warning" | "error" | "success" | "default"
          label: string
        }
        onClick?: () => void
      }[]
    }
  | {
      name: string
      icon: React.ReactElement
      onClick?: () => void
      asLink?: never
      roles?: string[]
      disabled?: boolean
      href?: never
      root: never
      subItems?: never
      badge?: never
    }

function CollapsedNavItem({
  name,
  icon,
  asLink = false,
  disabled,
  href = "",
  root,
  onClick,
  subItems,
  roles,
}: CollapsedNavItemProps) {
  const { pathname, asPath, push } = useRouter()
  const { t } = useTranslate()
  const active = getActivePath(root, pathname, asPath)
  const { user } = useAppSelector((state) => state.session)

  return asLink ? (
    <DropdownMenu
      className='w-full'
      contentProps={{ align: "center", side: "right" }}
      trigger={
        <div
          className={clsx(
            "flex aspect-square w-full cursor-pointer items-center justify-center rounded p-3 hover:bg-gray-500/10",
            active &&
              "bg-primary-600/20 text-primary-900 hover:!bg-primary-500/25 dark:bg-primary-800/25 dark:text-primary-100",
            disabled ||
              (roles && user?.position.every((item) => !roles?.includes(item)) && "opacity-40")
          )}
        >
          {subItems ? (
            <div
              className={clsx(
                "flex flex-1 items-center justify-center whitespace-normal",
                (disabled || (roles && user?.position.every((item) => !roles?.includes(item)))) &&
                  "pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10"
              )}
            >
              {icon}
            </div>
          ) : (
            <Link
              href={href}
              className={clsx(
                "flex flex-1 items-center justify-center whitespace-normal",
                (disabled || (roles && user?.position.every((item) => !roles?.includes(item)))) &&
                  "pointer-events-none cursor-not-allowed opacity-40 hover:bg-secondary-500/10 dark:hover:bg-gray-300/10"
              )}
              onClick={onClick}
            >
              {icon}
            </Link>
          )}
        </div>
      }
      items={concat<MenuItemProps>(
        [{ type: "text", label: t(name), className: "font-bold text-sm" }],
        subItems?.map((item) => ({
          type: "button",
          icon: <Icon icon={item.icon || ""} height={18} width={18} />,
          label: t(item.name),
          onClick: () => push(item.href || ""),
          disabled: item.disabled,
          badge: item.badge,
          className: "font-normal",
        })) || []
      )}
    />
  ) : (
    <button
      className='relative flex w-full items-center rounded p-4 text-secondary-900 transition-colors dark:text-white'
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default CollapsedNavItem
