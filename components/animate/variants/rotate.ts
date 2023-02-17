import { varTranEnter, varTranExit } from './transition'

// ----------------------------------------------------------------------
interface Props {
  durationIn?: number
  durationOut?: number
  easeIn?: [number, number, number, number]
  easeOut?: [number, number, number, number]
}

const varRotate = (props?: Props) => {
  const durationIn = props?.durationIn
  const durationOut = props?.durationOut
  const easeIn = props?.easeIn
  const easeOut = props?.easeOut

  return {
    // IN
    in: {
      initial: { opacity: 0, rotate: -360 },
      animate: { opacity: 1, rotate: 0, transition: varTranEnter({ durationIn, easeIn }) },
      exit: { opacity: 0, rotate: -360, transition: varTranExit({ durationOut, easeOut }) },
    },

    // OUT
    out: {
      initial: { opacity: 1, rotate: 0 },
      animate: { opacity: 0, rotate: -360, transition: varTranExit({ durationOut, easeOut }) },
    },
  }
}

export default varRotate
