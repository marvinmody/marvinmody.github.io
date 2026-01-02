"use client"

import { motion, useInView } from "framer-motion"
import { useRef, memo } from "react"
import Image from "next/image"

// GPU-optimized animation variants using only transform and opacity
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

const scaleIn = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-15%", amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-[90vh] items-center bg-black px-4 py-24 sm:min-h-screen sm:px-6 sm:py-32"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Subtle dark texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center will-change-transform sm:mb-16"
        >
          <h2 className="mb-8 font-serif text-4xl font-light tracking-tight text-white sm:text-5xl md:text-7xl">
            about
          </h2>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-base leading-relaxed text-white/70 will-change-transform sm:text-lg md:text-xl"
          >
            I'm studying Computer Engineering at Stevens, driven by curiosity and a desire to grow in how I think and create. I enjoy building thoughtful, useful systems and learning along the way. Reach out anytime.
          </motion.p>
        </motion.div>

        {/* Quote with Benjamin Franklin Image */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-8 will-change-transform md:flex-row md:gap-12"
        >
          {/* Benjamin Franklin Image */}
          <motion.div
            variants={fadeInScale}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-40 w-40 shrink-0 will-change-transform sm:h-48 sm:w-48 md:h-56 md:w-56"
          >
            <Image
              src="/December 10th.png"
              alt="Benjamin Franklin"
              fill
              className="object-contain"
              priority
              quality={100}
              sizes="(max-width: 768px) 192px, 224px"
            />
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-xl leading-relaxed text-white/60 will-change-transform sm:text-2xl md:text-3xl md:text-left md:max-w-xl text-center"
          >
            "If everyone is thinking alike, then no one is thinking."
            <span className="block text-base text-white/40 mt-4 not-italic font-sans">
              — Benjamin Franklin
            </span>
          </motion.blockquote>
        </motion.div>

        {/* Minimalist accent line */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={scaleIn}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-px bg-white/20 mx-auto mt-16 origin-left will-change-transform"
        />
      </div>
    </section>
  )
}
