// form
import { FieldValues, FormProvider as Form, UseFormReturn } from "react-hook-form"

// ----------------------------------------------------------------------

interface FormProviderProps {
  children: React.ReactNode | React.ReactNode[]
  methods: UseFormReturn<FieldValues, unknown>
  onSubmit?: () => void
}

export default function FormProvider({ children, onSubmit, methods }: FormProviderProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className='h-full'>
        {children}
      </form>
    </Form>
  )
}
