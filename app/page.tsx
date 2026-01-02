"use client"

import { useCallback, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import Navigation from "@/components/navigation"
import ScrollBackdrop from "@/components/scroll-backdrop"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ 
    container: containerRef,
    // Use passive scroll listener for performance
  })
  const [showNav, setShowNav] = useState(false)
  // Optimized spring with lower stiffness for smoother GPU-accelerated animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  })

  const handleScrollToTop = useCallback(() => {
    const node = containerRef.current
    if (!node) return
    node.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  useMotionValueEvent(smoothProgress, "change", (value) => {
    const showThreshold = 0.08
    const hideThreshold = 0.04

    setShowNav((prev) => {
      if (prev) {
        return value > hideThreshold
      }
      return value > showThreshold
    })
  })

  return (
    <main
      id="top"
      ref={containerRef}
      className="relative h-screen overflow-y-auto overflow-x-hidden bg-black"
      style={{
        // Enable GPU acceleration for scroll container
        transform: 'translateZ(0)',
        willChange: 'scroll-position',
        // Smooth scrolling with native performance
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <ScrollBackdrop progress={smoothProgress} />

      <div className="relative z-20">
        <Navigation visible={showNav} onTopClick={handleScrollToTop} />

        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>

      {/* GPU-accelerated scroll progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-white/5 z-50">
        <motion.div
          className="h-full bg-white/30 origin-left will-change-transform"
          style={{ 
            scaleX: smoothProgress,
            // Force GPU layer
            transform: 'translateZ(0)',
          }}
        />
      </div>
    </main>
  )
}
