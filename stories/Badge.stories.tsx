import React from "react"
import { Meta, Story } from "@storybook/react"
import Badge, { BadgeProps } from "../components/Badge"

const meta: Meta = {
  title: "INPUT/Badge",
  component: Badge,
  argTypes: {
    children: {
      control: {
        type: "Badge",
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<BadgeProps> = (args) => <Badge {...args} label='Badge' />

export const Contained = Template.bind({})
export const Outlined = Template.bind({})

Contained.args = {
  variant: "contained",
}
Outlined.args = {
  variant: "outlined",
}
