import { Deal, DealStatus } from 'types'

export const getTasksByStatus = (tasks: Deal[], status: DealStatus) =>
  tasks.filter((task) => task.status === status)

export const getTaskById = (tasks: Deal[], id: string) => tasks.find((task) => task.id === id)
