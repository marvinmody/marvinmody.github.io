"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"

const achievements = [
  { label: "GPA", value: "3.9", suffix: "/4.0" },
  { label: "Dean's List", value: "6", suffix: " semesters" },
  { label: "Research Papers", value: "3", suffix: " published" },
]

const courses = [
  "Systems Architecture",
  "Machine Learning",
  "Distributed Computing",
  "Algorithm Design",
  "Data Structures",
  "Computer Networks",
]

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" })
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null)
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotateShape = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <section
      ref={sectionRef}
      id="education"
      className="min-h-screen flex items-center relative px-6 py-24 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute right-0 top-1/4 w-[40vw] h-[60vh] opacity-[0.03]" 
        style={{ y: parallaxY }}
      >
        <motion.div 
          className="w-full h-full border border-foreground"
          style={{ rotate: rotateShape }}
        />
      </motion.div>

      {/* Interactive corner accent */}
      <motion.div
        className="absolute bottom-12 left-12 w-32 h-32"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        <motion.div
          className="w-full h-full border-l border-b border-foreground/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/40 mb-4">02 / Education</p>
              <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-foreground">
                <motion.span 
                  className="italic inline-block"
                  whileHover={{ letterSpacing: "0.05em" }}
                  transition={{ duration: 0.3 }}
                >
                  Stevens
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  whileHover={{ letterSpacing: "0.02em" }}
                  transition={{ duration: 0.3 }}
                >
                  Institute
                </motion.span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {[
                { label: "Degree", value: "B.S. Computer Science" },
                { label: "Focus Areas", value: "Systems Engineering, Machine Learning" },
                { label: "Location", value: "Hoboken, New Jersey" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="group cursor-pointer"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-2 group-hover:text-foreground/60 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-lg text-foreground group-hover:text-foreground/80 transition-colors">
                    {item.value}
                  </p>
                  <motion.div
                    className="w-0 h-px bg-foreground/20 mt-2 group-hover:w-full transition-all duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Achievement Cards - Interactive */}
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative cursor-pointer group"
                  onHoverStart={() => setHoveredAchievement(index)}
                  onHoverEnd={() => setHoveredAchievement(null)}
                >
                  <motion.div
                    className="border border-foreground/5 p-6 text-center transition-colors duration-300"
                    animate={{
                      borderColor: hoveredAchievement === index ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)",
                      backgroundColor: hoveredAchievement === index ? "rgba(0,0,0,0.02)" : "transparent",
                    }}
                  >
                    <motion.div 
                      className="font-serif text-3xl md:text-4xl text-foreground mb-1"
                      animate={{
                        scale: hoveredAchievement === index ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.value}
                      <span className="text-foreground/30 text-lg">{item.suffix}</span>
                    </motion.div>
                    <motion.p 
                      className="font-mono text-[10px] uppercase tracking-wider text-foreground/40"
                      animate={{
                        color: hoveredAchievement === index ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.4)",
                      }}
                    >
                      {item.label}
                    </motion.p>
                  </motion.div>
                  
                  {/* Hover accent */}
                  <motion.div
                    className="absolute inset-0 border-2 border-foreground/0 pointer-events-none"
                    animate={{
                      borderColor: hoveredAchievement === index ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0)",
                      scale: hoveredAchievement === index ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Coursework - Interactive tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="font-mono text-xs uppercase tracking-wider text-foreground/40 mb-6">Key Coursework</p>
              <div className="flex flex-wrap gap-3">
                {courses.map((course, index) => (
                  <motion.span
                    key={course}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="relative font-mono text-xs px-4 py-2 border border-foreground/10 text-foreground/60 cursor-pointer overflow-hidden"
                    onHoverStart={() => setHoveredCourse(index)}
                    onHoverEnd={() => setHoveredCourse(null)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="relative z-10"
                      animate={{
                        color: hoveredCourse === index ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.6)",
                      }}
                    >
                      {course}
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-foreground/5"
                      initial={{ x: "-100%" }}
                      animate={{ x: hoveredCourse === index ? "0%" : "-100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Timeline accent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 pt-8"
            >
              <motion.div 
                className="w-2 h-2 bg-foreground/20 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="flex-1 h-px bg-foreground/10" />
              <span className="font-mono text-xs text-foreground/30">2020 — Present</span>
              <div className="flex-1 h-px bg-foreground/10" />
              <motion.div 
                className="w-2 h-2 border border-foreground/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section indicator */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-px h-8 transition-all duration-300 ${i === 1 ? "bg-foreground/60" : "bg-foreground/10"}`}
          />
        ))}
      </motion.div>
    </section>
  )
}
