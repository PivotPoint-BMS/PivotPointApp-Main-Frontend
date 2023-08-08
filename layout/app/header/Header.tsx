import React from "react"
// redux
import { useAppDispatch } from "store/hooks"
import { open } from "store/slices/sideBarSlice"
// config
import { HEADER } from "config"
// components
import { Icon as Iconify } from "@iconify/react"
import { IconButton } from "components"

// const categories = ['crm', 'hrm', 'pm', 'im', 'scm', 'fm']

export default function Header() {
  // const { pathname } = useRouter()
  // const isDesktop = useResponsive('lg', 'up')
  const dispatch = useAppDispatch()
  // const { isCollapsed } = useAppSelector((state) => state.sideBar)
  // const isSecondSidebar = Boolean(categories.includes(pathname.split('/')[2]))

  return (
    <div
      className='fixed top-0 z-10 flex w-screen items-center justify-between gap-5 bg-gray-50/50 px-5 backdrop-blur-lg ltr:right-0 rtl:left-0 dark:bg-dark/60'
      style={{
        height: HEADER.DESKTOP_HEIGHT,
      }}
    >
      <IconButton
        className='group rounded-full p-2 outline-0 hover:bg-secondary-500/10 dark:hover:bg-secondary-300/10'
        onClick={() => dispatch(open())}
      >
        <Iconify icon='ion:menu' height={24} width={24} />
      </IconButton>
    </div>
    // <div
    //   className='fixed top-0 z-10 flex items-center justify-between gap-5 bg-gray-50/50 px-5 backdrop-blur-lg ltr:right-0 rtl:left-0 dark:bg-dark/60'
    //   style={{
    //     height: HEADER.DESKTOP_HEIGHT,
    //     width: isDesktop
    //       ? `calc(100% - ${
    //           // eslint-disable-next-line no-nested-ternary
    //           isSecondSidebar
    //             ? (isCollapsed
    //                 ? NAVBAR.SECONDARY_NAVBAR_COLLAPSE_WIDTH
    //                 : NAVBAR.SECONDARY_NAVBAR_WIDTH) + NAVBAR.MAIN_NAVBAR_WIDTH
    //             : NAVBAR.MAIN_NAVBAR_WIDTH
    //         }px)`
    //       : '100vw',
    //   }}
    // >
    //   {!isDesktop && (
    //     <IconButton
    //       className='group rounded-full p-2 outline-0 hover:bg-secondary-500/10 dark:hover:bg-secondary-300/10'
    //       onClick={() => dispatch(open())}
    //     >
    //       <Iconify icon='ion:menu' height={24} width={24} />
    //     </IconButton>
    //   )}
    //   <div className='flex flex-1 items-center justify-end gap-5'>
    //     <LanguageDropdown />

    //     <NotificationDropdown />

    //     <AccountDropdown />
    //   </div>
    // </div>
  )
}
