"use client"

import { Github, Linkedin } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import FuzzyText from "@/components/FuzzyText"
import MetaBalls from "@/components/ui/MetaBalls"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/marvinmody", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/marvinrm", icon: Linkedin },
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" })
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hoveredLink, setHoveredLink] = useState<number | null>(null)
  const [isSubmitHovered, setIsSubmitHovered] = useState(false)

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[90vh] items-center bg-black px-4 py-24 sm:min-h-screen sm:px-6 sm:py-32"
    >
      {/* Interactive background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/5 rounded-full"
        animate={{
          scale: focusedField ? 1.2 : 1,
          opacity: focusedField ? 0.1 : 0.05,
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Left Column */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-10 font-serif text-4xl tracking-tight text-white sm:text-5xl md:text-6xl">
                <motion.span 
                  className="italic inline-block"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  let's
                </motion.span>
                <br />
                <motion.span 
                  className="inline-block"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  connect
                </motion.span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
              >
                I'm always interested in discussing new projects, creative ideas, or opportunities to be part of
                something meaningful.
              </motion.p>

              {/* Social Links - Interactive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-white/40">Find me online</p>
                <div className="flex flex-col gap-3">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 py-3 border-b border-white/5 cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      onHoverStart={() => setHoveredLink(index)}
                      onHoverEnd={() => setHoveredLink(null)}
                    >
                      <motion.span
                        className="font-mono text-sm uppercase tracking-[0.35em] text-white/50"
                        animate={{
                          x: hoveredLink === index ? 8 : 0,
                          color: hoveredLink === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {link.label}
                      </motion.span>
                      <motion.span
                        className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/80"
                        animate={{
                          scale: hoveredLink === index ? 1.05 : 1,
                          opacity: hoveredLink === index ? 1 : 0.6,
                        }}
                      >
                        <link.icon className="h-4 w-4" strokeWidth={1.5} />
                      </motion.span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Email - Interactive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-white/40 mb-2">Direct</p>
                <motion.a
                  href="mailto:themarvinmody@gmail.com"
                  className="font-serif text-xl text-white inline-block relative group"
                  whileHover={{ x: 4 }}
                >
                  themarvinmody@gmail.com
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:pt-12"
          >
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase tracking-wider text-white/40 block">
                  Your Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="name@example.com"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-0 focus:border-transparent caret-white/60"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-white/60 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs uppercase tracking-wider text-white/40 block">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-0 focus:border-transparent resize-none caret-white/60"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-white/60 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="group relative font-mono text-xs uppercase tracking-wider py-4 px-8 border border-white/20 text-white overflow-hidden"
                onHoverStart={() => setIsSubmitHovered(true)}
                onHoverEnd={() => setIsSubmitHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span 
                  className="relative z-10 flex items-center gap-3"
                  animate={{
                    x: isSubmitHovered ? 4 : 0,
                  }}
                >
                  Send Message
                  <motion.span
                    animate={{
                      x: isSubmitHovered ? 4 : 0,
                    }}
                  >
                    →
                  </motion.span>
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-white/5"
                  initial={{ x: "-100%" }}
                  animate={{ x: isSubmitHovered ? "0%" : "-100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>

            <motion.div
              className="relative mt-16 h-64 overflow-visible sm:h-72 lg:h-80"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 -left-8 z-0 w-[130%] sm:-left-12 sm:w-[135%] md:-left-16 md:w-[140%]">
                <MetaBalls
                  color="#ffffff"
                  cursorBallColor="#ffffff"
                  cursorBallSize={2.2}
                  ballCount={18}
                  animationSize={28}
                  enableMouseInteraction
                  enableTransparency
                  hoverSmoothness={0.06}
                  clumpFactor={1}
                  speed={0.28}
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 border-t border-white/5 py-10 sm:mt-32 sm:py-12"
        >
          <div className="flex justify-center">
            <FuzzyText
              fontSize="clamp(1.25rem, 3vw, 1.5rem)"
              fontWeight={500}
              fontFamily="'Space Grotesk', sans-serif"
              color="#9ca3af"
              baseIntensity={0.12}
              hoverIntensity={0.32}
            >
              © 2025 marvin mody. crafted with intention.
            </FuzzyText>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
