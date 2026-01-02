"use client"

import { motion } from "framer-motion"
import { useState, memo, useCallback } from "react"
import dynamic from "next/dynamic"

// Lazy load Particles with SSR disabled for WebGL
const Particles = dynamic(() => import("./Particles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
})

// Memoized letter component for performance
const AnimatedLetter = memo(function AnimatedLetter({
  letter,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  totalLetters,
}: {
  letter: string
  index: number
  isHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  totalLetters: number
}) {
  const centerIndex = (totalLetters - 1) / 2
  const distanceFromCenter = Math.abs(index - centerIndex)
  const delay = 0.15 + distanceFromCenter * 0.05

  return (
    <motion.span
      className="inline-block cursor-default will-change-transform"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      initial={{
        opacity: 0,
        y: 24,
        rotateX: 45,
        filter: 'blur(6px)',
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
      }}
      transition={{
        delay,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {letter}
    </motion.span>
  )
})

export default function HeroSection() {
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null)

  const fullName = "Marvin Mody"

  const handleHoverStart = useCallback((index: number) => {
    setHoveredLetter(index)
  }, [])

  const handleHoverEnd = useCallback(() => {
    setHoveredLetter(null)
  }, [])

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-black px-4 py-20 sm:min-h-screen sm:px-6">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={150}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          particleHoverFactor={0.4}
          alphaParticles={true}
          disableRotation={false}
          sizeRandomness={0.5}
          cameraDistance={20}
        />
      </div>

      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Single line italicized name with responsive sizing */}
        <motion.h1
          className="font-serif tracking-tight text-white font-light whitespace-nowrap italic"
          style={{
            fontSize: 'clamp(1.8rem, 8vw, 5rem)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="inline-flex" style={{ transformStyle: 'preserve-3d' }}>
            {fullName.split("").map((letter, i) => (
              <AnimatedLetter
                key={i}
                letter={letter === " " ? "\u00A0" : letter}
                index={i}
                isHovered={hoveredLetter === i}
                totalLetters={fullName.length}
                onHoverStart={() => handleHoverStart(i)}
                onHoverEnd={handleHoverEnd}
              />
            ))}
          </span>
        </motion.h1>
      </motion.div>
    </section>
  )
}
