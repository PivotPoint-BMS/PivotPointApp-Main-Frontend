import React, { forwardRef } from "react"
import { Root, TabsProps } from "@radix-ui/react-tabs"

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(({ children, ...props }, ref) => (
  <Root ref={ref} {...props}>
    {children}
  </Root>
))

export default TabsRoot
