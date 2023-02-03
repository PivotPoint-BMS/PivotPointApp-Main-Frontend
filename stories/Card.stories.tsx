import React from 'react'
import { Meta, Story } from '@storybook/react'
import Card, { CardProps } from '../components/Card'

const meta: Meta = {
  title: 'INPUT/Card',
  component: Card,
  argTypes: {
    children: {
      control: {
        type: 'Card',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<CardProps> = (args) => (
  <Card {...args} title='Title'>
    Card
  </Card>
)

export const Contained = Template.bind({})

Contained.args = {}
