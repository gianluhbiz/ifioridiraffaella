import { motion } from 'framer-motion'
import type { Photo as PhotoData } from '../data/photos'
import { ease } from '../lib/ease'

type Props = {
  photo: PhotoData
  sizes: string
  className?: string
  priority?: boolean
  /** picture-develops: the print comes up out of the paper once, when it enters the view */
  develops?: boolean
  position?: string
}

export default function Photo({ photo, sizes, className = '', priority, develops, position }: Props) {
  const img = (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      width={photo.w}
      height={photo.h}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      style={position ? { objectPosition: position } : undefined}
      data-source="stand-in"
    />
  )

  if (!develops) return <div className={`frame ${className}`}>{img}</div>

  return (
    <div className={`frame ${className}`} data-moment="picture-develops">
      <motion.div
        className="h-full w-full"
        initial={{ filter: 'grayscale(1) contrast(0.55) brightness(1.3)', scale: 1.06 }}
        whileInView={{ filter: 'grayscale(0) contrast(1) brightness(1)', scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.6, ease }}
      >
        {img}
      </motion.div>
    </div>
  )
}
