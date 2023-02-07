import React from 'react'
import { Meta, Story } from '@storybook/react'
import Alert, { AlertProps } from '../components/Alert'

const meta: Meta = {
  title: 'INPUT/Alert',
  component: Alert,
  argTypes: {
    children: {
      control: {
        type: 'Alert',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<AlertProps> = (args) => (
  <Alert {...args}>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </Alert>
)

export const Contained = Template.bind({})
export const Outlined = Template.bind({})

Contained.args = {
  variant: 'contained',
}
Outlined.args = {
  variant: 'outlined',
}
