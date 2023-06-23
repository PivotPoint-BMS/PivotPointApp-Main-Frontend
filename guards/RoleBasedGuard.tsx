import Image from 'components/Image'
import { ReactNode } from 'react'
import { useAppSelector } from 'store/hooks'
import forbidden from 'public/403.png'
// ----------------------------------------------------------------------

interface RoleBasedGuardProp {
  accessibleRoles: string[] // Example ['admin', 'leader']
  children: ReactNode
}

export default function RoleBasedGuard({ accessibleRoles, children }: RoleBasedGuardProp) {
  const { user } = useAppSelector((state) => state.session)

  if (user?.position.every((item) => !accessibleRoles?.includes(item))) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
        <h1 className='text-4xl font-bold'>Permission Denied</h1>
        <p className='text-lg'> You do not have permission to access this page</p>
        <Image src={forbidden.src} height={400} width={400} />
      </div>
    )
  }

  return <>{children}</>
}
