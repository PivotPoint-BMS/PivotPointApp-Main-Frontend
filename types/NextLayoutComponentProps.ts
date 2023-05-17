import { AppProps } from 'next/app'

type NextLayoutComponentType = AppProps['Component'] & {
  getLayout: (page: JSX.Element) => JSX.Element
}

export default NextLayoutComponentType
