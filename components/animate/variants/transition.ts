// ----------------------------------------------------------------------
interface HoverProps {
  duration?: number
  ease?: [number, number, number, number]
}

export const varTranHover = (props?: HoverProps) => {
  const duration = props?.duration || 0.32
  const ease = props?.ease || [0.43, 0.13, 0.23, 0.96]

  return { duration, ease }
}

interface EnterProps {
  durationIn?: number
  easeIn?: [number, number, number, number]
}

export const varTranEnter = (props?: EnterProps) => {
  const duration = props?.durationIn || 0.64
  const ease = props?.easeIn || [0.43, 0.13, 0.23, 0.96]

  return { duration, ease }
}

interface ExitProps {
  durationOut?: number
  easeOut?: [number, number, number, number]
}

export const varTranExit = (props?: ExitProps) => {
  const duration = props?.durationOut || 0.48
  const ease = props?.easeOut || [0.43, 0.13, 0.23, 0.96]

  return { duration, ease }
}
