import React from 'react'
// types
import { Deal } from 'types'
// components
import Card from 'components/Card'
import CardContent from 'components/CardContent'

interface Props {
  deal: Deal
}

export default function DealItem({ deal }: Props) {
  return (
    <Card className='!w-56 shadow-md' variant='elevated'>
      <CardContent>{deal.title}</CardContent>
    </Card>
  )
}
