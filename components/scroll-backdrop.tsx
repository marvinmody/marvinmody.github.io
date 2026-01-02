"use client"

import { MotionValue, motion, useMotionTemplate, useTransform } from "framer-motion"

type ScrollBackdropProps = {
  progress: MotionValue<number>
}

export default function ScrollBackdrop({ progress }: ScrollBackdropProps) {
  const reveal = useTransform(progress, [0.18, 0.4], [0, 1])
  const accentIntensity = useTransform(progress, [0.18, 0.75], [0, 0.65])
  const baseIntensity = useTransform(progress, [0.2, 0.9], [0, 0.45])
  const accentHue = useTransform(progress, [0.2, 1], [210, 320])
  const baseHue = useTransform(progress, [0.25, 1], [190, 260])

  const accentGradient = useMotionTemplate`radial-gradient(120% 140% at 78% 22%, hsla(${accentHue}, 95%, 65%, ${accentIntensity}), transparent)`
  const baseGradient = useMotionTemplate`radial-gradient(140% 140% at 18% 82%, hsla(${baseHue}, 80%, 25%, ${baseIntensity}), transparent)`

  const blur = useTransform(progress, [0.25, 0.8], [0, 32])
  const blurFilter = useMotionTemplate`blur(${blur}px)`
  const rotate = useTransform(progress, [0.2, 1], [0, 14])
  const scale = useTransform(progress, [0.18, 0.7], [0.9, 1.12])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-black via-black/95 to-black"
        style={{ opacity: reveal }}
      />
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{ opacity: reveal, scale, rotate, filter: blurFilter }}
      >
        <motion.div className="absolute inset-0" style={{ backgroundImage: accentGradient }} />
        <motion.div className="absolute inset-0" style={{ backgroundImage: baseGradient }} />
      </motion.div>
    </div>
  )
}
