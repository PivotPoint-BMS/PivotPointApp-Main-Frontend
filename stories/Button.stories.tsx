import React from "react"
import { Meta, Story } from "@storybook/react"
import Button, { ButtonProps } from "../components/Button"

const meta: Meta = {
  title: "INPUT/Button",
  component: Button,
  argTypes: {
    children: {
      control: {
        type: "Button",
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const Contained = Template.bind({})
export const Outlined = Template.bind({})

Contained.args = {
  variant: "contained",
}
Outlined.args = {
  variant: "outlined",
}
