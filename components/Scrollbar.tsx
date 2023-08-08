import React from "react"
import SimpleBarReact, { Props } from "simplebar-react"

type ScrollbarProps = Props & {
  children: React.ReactNode | React.ReactNode[]
}

export default function Scrollbar({ children, ...other }: ScrollbarProps) {
  return (
    <SimpleBarReact clickOnTrack={false} {...other}>
      {children}
    </SimpleBarReact>
  )
}
