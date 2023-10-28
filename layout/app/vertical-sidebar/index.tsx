/* eslint-disable no-constant-condition */
import clsx from "clsx"
// next
import { useRouter } from "next/router"
import { useTheme } from "next-themes"
import Image from "next/image"
// config
import { NAVBAR, PIVOTPOINT_API } from "config"
// hooks
import useTranslate from "hooks/useTranslate"
// redux
import { useAppDispatch, useAppSelector } from "store/hooks"
import { collapse, extend } from "store/slices/sideBarSlice"
import { logout } from "store/slices/sessionSlice"
// routes
import { PATH_ACCOUNT, PATH_AUTH } from "routes/paths"
// components
import { Icon } from "@iconify/react"
import { Button, DropdownMenu, IconButton, Scrollbar } from "components"
import NavItem from "./NavItem"
import CollapsedNavItem from "./CollapsedNavItem"

function SidebarVertical() {
  const { setTheme } = useTheme()
  const { push, pathname, query, asPath } = useRouter()
  const { user } = useAppSelector((state) => state.session)
  const { items, isCollapsed } = useAppSelector((state) => state.sideBar)
  const dispatch = useAppDispatch()

  const { t, locale } = useTranslate()

  const changeLocale = (nextLocale: string) => {
    push({ pathname, query }, asPath, { locale: nextLocale })
  }

  const toggleCollapse = () => {
    if (isCollapsed) {
      dispatch(extend())
    } else {
      dispatch(collapse())
    }
  }
  return (
    <div
      style={{
        width: isCollapsed ? NAVBAR.VERTICAL_NAVBAR_COLLAPSE_WIDTH : NAVBAR.VERTICAL_NAVBAR_WIDTH,
      }}
    >
      <div
        className='fixed'
        style={{
          width: isCollapsed ? NAVBAR.VERTICAL_NAVBAR_COLLAPSE_WIDTH : NAVBAR.VERTICAL_NAVBAR_WIDTH,
        }}
      >
        <IconButton
          className='absolute top-3 z-10 border border-dashed bg-gray-50 !p-1.5 ltr:right-0 ltr:translate-x-1/2 rtl:left-0 rtl:-translate-x-1/2 dark:border-gray-600 dark:bg-dark'
          onClick={toggleCollapse}
        >
          <Icon
            icon='system-uicons:window-collapse-left'
            className={clsx(
              "transition-all group-hover/collapse:scale-110 rtl:rotate-180 motion-reduce:transition-none",
              isCollapsed && "ltr:rotate-180 rtl:rotate-0"
            )}
            height={16}
            width={16}
          />
        </IconButton>
        <Scrollbar
          className={clsx(
            "h-screen w-full border-dashed  ltr:border-r rtl:border-l dark:border-gray-600",
            isCollapsed ? "px-2" : "px-4"
          )}
        >
          <DropdownMenu
            className='w-full'
            contentProps={
              isCollapsed
                ? {
                    align: "center",
                    side: locale === "ar" ? "left" : "right",
                  }
                : {
                    align: locale === "ar" ? "end" : "start",
                  }
            }
            trigger={
              <Button
                variant='outlined'
                intent='default'
                className={clsx(
                  "my-3 w-full !justify-start rounded border border-dashed transition-all dark:border-gray-600",
                  isCollapsed && "aspect-square border-none"
                )}
              >
                {isCollapsed ? (
                  <div className='relative'>
                    {user && user?.profilePicture && user?.profilePicture !== "" ? (
                      <Image
                        alt='profilePicture'
                        width={50}
                        height={50}
                        src={`${PIVOTPOINT_API.profilePicUrl}/${user?.profilePicture}`}
                        className='aspect-square rounded-full object-cover'
                      />
                    ) : (
                      <Icon
                        icon='heroicons:user-circle-20-solid'
                        className='absolute top-0 right-0'
                        height={50}
                        width={50}
                      />
                    )}
                  </div>
                ) : (
                  <div className='flex w-full items-center justify-start gap-4'>
                    <div className='relative'>
                      {user && user?.profilePicture && user?.profilePicture !== "" ? (
                        <Image
                          alt='profilePicture'
                          width={50}
                          height={50}
                          src={`${PIVOTPOINT_API.profilePicUrl}/${user?.profilePicture}`}
                          className='aspect-square rounded-full object-cover'
                        />
                      ) : (
                        <Icon
                          icon='heroicons:user-circle-20-solid'
                          className='absolute top-0 right-0'
                          height={50}
                          width={50}
                        />
                      )}
                    </div>
                    <div>
                      <p className='text-start text-sm font-semibold'>
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className='text-start text-xs text-gray-500 dark:text-gray-400'>
                        Company Name
                      </p>
                      {/* <p className='text-xs text-gray-500 dark:text-gray-400'>{user?.company}</p> */}
                    </div>
                  </div>
                )}
              </Button>
            }
            items={[
              {
                type: "button",
                label: t("Profile"),
                icon: <Icon icon='ion:person-circle' height={22} width={22} />,
                onClick: () => {
                  push(PATH_ACCOUNT.profile)
                },
              },
              {
                ...(user?.isOwner
                  ? {
                      type: "button",
                      label: t("Company"),
                      icon: <Icon icon='ion:settings' height={22} width={22} />,
                      onClick: () => {
                        push(PATH_ACCOUNT.company)
                      },
                    }
                  : { type: "text", className: "hidden" }),
              },
              { type: "separator" },
              {
                type: "dropdown",
                label: t("Language"),
                icon: <Icon icon='mdi:translate-variant' height={22} width={22} />,
                subItems: [
                  { type: "button", label: "English", onClick: () => changeLocale("en") },
                  { type: "button", label: "العربية", onClick: () => changeLocale("ar") },
                  { type: "button", label: "Français", onClick: () => changeLocale("fr") },
                ],
              },
              {
                type: "dropdown",
                label: t("Theme"),
                icon: <Icon icon='mdi:theme-light-dark' height={22} width={22} />,
                subItems: [
                  {
                    type: "button",
                    label: t("Light"),
                    onClick: () => setTheme("light"),
                  },
                  {
                    type: "button",
                    label: t("Dark"),
                    onClick: () => setTheme("dark"),
                  },
                ],
              },
              { type: "separator" },
              {
                type: "button",
                label: t("Logout"),
                onClick: () => {
                  dispatch(logout())
                  push(PATH_AUTH.login)
                },
                icon: <Icon icon='ion:exit' height={22} width={22} />,
              },
            ]}
          />
          <nav className='flex w-full flex-1 flex-col items-start gap-2'>
            {items.map((item, i) =>
              isCollapsed ? (
                <CollapsedNavItem
                  key={i}
                  name={t(item.name)}
                  icon={<Icon icon={item.icon} height={22} width={22} />}
                  href={item.href}
                  asLink
                  subItems={item.subItems}
                  disabled={item.disabled}
                  roles={item.roles}
                  root={item.root}
                />
              ) : (
                <NavItem
                  key={i}
                  name={t(item.name)}
                  icon={<Icon icon={item.icon} height={22} width={22} />}
                  href={item.href}
                  asLink
                  subItems={item.subItems}
                  disabled={item.disabled}
                  roles={item.roles}
                  root={item.root}
                />
              )
            )}
          </nav>
        </Scrollbar>
      </div>
    </div>
  )
}

export default SidebarVertical
