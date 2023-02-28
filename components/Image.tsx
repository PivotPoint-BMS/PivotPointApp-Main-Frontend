import clsx from 'clsx'
import { Effect, LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component'

// ----------------------------------------------------------------------

interface ImageProps extends LazyLoadImageProps {
  disabledEffect?: boolean
  effect?: Effect
  imageClass?: string
}

export default function Image({
  disabledEffect = false,
  effect = 'blur',
  className,
  imageClass,
  ...other
}: ImageProps) {
  return (
    <span className={clsx('block overflow-hidden', className)}>
      <LazyLoadImage
        wrapperClassName='wrapper'
        effect={disabledEffect ? undefined : effect}
        placeholderSrc='https://zone-assets-api.vercel.app/assets/img_placeholder.svg'
        className={imageClass}
        {...other}
      />
    </span>
  )
}

// ----------------------------------------------------------------------
