"use client"

import Image from "next/image"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { useCallback, useMemo, useRef, useState } from "react"
import FlowingMenu from "@/components/ui/flowing-menu"

const projects = [
  {
    label: "paev",
    heading:
      "Investment Website with AI Agents | React, Tailwind, Python, RESTful API, AI Agentic Workflow",
    bullets: [
      "Built a financial platform with 4-hour stock updates using Finnhub API, Python agentic tools, on a Next.js frontend.",
      "Deployed AI assistant leveraging agentic workflows to deliver real-time investment insights and interactive user guidance.",
    ],
    image: "/Screenshot_1-1-2026_19317_paev.vercel.app.png",
    hoverImage: "/Welcome to.png",
    link: "https://paev.vercel.app/",
  },
  {
    label: "synapse",
    heading:
      "AI-Powered Medical Logger and Assistant | React, Tailwind, Supabase Database, Machine Learning, OpenCV",
    bullets: [
      "Applied TensorFlow Vision to classify dermatological symptoms and train it across 18,000+ images with 98% accuracy.",
      "Boosted clinical review speed by 35% using automated symptom insights and real-time visual analysis via Gemini API.",
    ],
    image: "/Screenshot_1-1-2026_192829_synapsehealth.vercel.app.png",
    hoverImage: "/Screenshot_1-1-2026_19190_marvinmody.github.io.png",
    link: "https://synapsehealth.vercel.app/",
    github: "https://github.com/snigito/SkincareModel",
  },
  {
    label: "irrigation unit",
    heading:
      "Embedded Environmental Irrigation Unit | ESP32 (Arduino IDE), MQTT, C++, DHT22, Excel",
    bullets: [
      "Designed an IoT smart irrigation system automating 20 mL watering at 40% soil moisture across 4 environments.",
      "Logged 33,000+ data points at 3-second intervals with 97.4% uptime for 5 days and exported time-series telemetry for tuning.",
    ],
    image: "/Screenshot_1-1-2026_203152_docs.google.com.png",
    link: "https://docs.google.com/document/d/1sU4bxtBoCIfGUtDNDLlD1KcnlDUy5ZFOu9Ud4wyGbrM/edit?tab=t.0",
  },
  {
    label: "pid boat",
    heading:
      "Autonomous PID Boat | ESP32 (Arduino IDE), MQTT, C++, PID, MPU6050 IMU, SolidWorks",
    bullets: [
      "Innovated an ArUco-guided boat completing a 3-lap course with 12/12 waypoints in 6:14 using PID and IMU feedback.",
      "Engineered and 3D-printed a custom PLA hull with dual-fan propulsion for stable navigation and maneuverability.",
    ],
    image: "/Screenshot_1-1-2026_203438_docs.google.com.png",
    link: "https://docs.google.com/document/d/1ofeTOQ3B0zJh07dTKtYsdTawKFKTSO825JYqsHb2Jnc/edit?tab=t.0",
  },
  {
    label: "better2gether",
    heading:
      "better2gether | React Native, Expo, Firebase, WebRTC, Emotion Recognition, Push Notifications",
    bullets: [
      "Launched a social accountability app pairing users with weekly check-ins, adaptive prompts, and shared milestone tracking.",
      "Implemented WebRTC video sessions with sentiment tagging to personalize nudges and improve retention by 27%.",
      "Achieved top placement in the IBM Watsonx Orchestrate Hackathon 2025.",
    ],
    image: "/better2gether.png",
    hoverImage: "/Screenshot_1-1-2026_203713_docs.google.com.png",
    link: "https://github.com/marvinmody/better2gether?tab=readme-ov-file",
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-10%", amount: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)

  const menuItems = useMemo(
    () =>
      projects.map((project, index) => {
        const hoverImage = (project as any).hoverImage;
        const imagePath = hoverImage || project.image;
        // Properly encode spaces and special characters for CSS background-image
        const encodedImage = imagePath.replace(/ /g, '%20');
        return {
          link: `#project-${index}`,
          text: project.label,
          image: encodedImage,
        };
      }),
    [],
  )

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? prev : index))
  }, [])

  const activeProject = projects[activeIndex] ?? projects[0]

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-[90vh] bg-black px-4 py-24 sm:min-h-screen sm:px-6 sm:py-32"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 will-change-transform sm:mb-20"
        >
          <h2 className="font-serif text-4xl font-light lowercase tracking-tight text-white sm:text-5xl md:text-7xl">
            projects
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <motion.div
            className="relative h-[340px] overflow-hidden rounded-sm border border-white/12 bg-transparent px-1 py-3 backdrop-blur-sm sm:h-[420px] sm:px-1.5 sm:py-4 md:h-[520px] lg:h-[600px]"
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <FlowingMenu items={menuItems} onActiveChange={handleActiveChange} />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.heading}
              id={`project-${activeIndex}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-md border border-white/12 bg-transparent p-6 sm:min-h-[420px] sm:p-8 md:min-h-[520px] lg:min-h-[600px]"
            >
              <div className="flex h-full flex-col">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.45em] text-white/45">
                    {activeProject.label}
                  </h3>
                  <span className="ml-0 flex h-px flex-1 translate-y-px rounded bg-white/12 sm:ml-6" />
                </div>
                <p className="mt-6 font-serif text-[1.25rem] leading-snug text-white/95 sm:text-[1.45rem] md:text-[1.55rem]">
                  {activeProject.heading}
                </p>

                <div className="mt-6 flex flex-1 flex-col gap-6">
                  <div className="space-y-3 overflow-hidden rounded-sm border border-white/12 bg-transparent px-3 py-4 sm:px-4 sm:py-5">
                    <div className="max-h-40 space-y-3 overflow-y-auto pr-1 sm:max-h-48">
                      {activeProject.bullets.map((point) => (
                        <div key={point} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                          <span className="mt-[0.35rem] inline-block h-1 w-1 rounded-full bg-white/50" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className={`relative h-48 w-full overflow-hidden rounded-sm border border-white/10 sm:h-56 ${activeProject.image.includes('logo') || activeProject.image.includes('Screenshot') ? 'bg-white/5 flex items-center justify-center' : ''}`}>
                      <Image
                        src={activeProject.image}
                        alt={`${activeProject.heading} preview`}
                        fill
                        className={activeProject.image.includes('logo') || activeProject.image.includes('Screenshot') ? 'object-contain p-4' : 'object-cover'}
                        sizes="(max-width: 1024px) 100vw, 480px"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between gap-3 border-t border-white/12 pt-4 text-[0.65rem] uppercase tracking-[0.35em] text-white/45 sm:flex-row sm:items-center sm:text-xs">
                      <span className="font-mono">In-depth case</span>
                      <div className="flex items-center gap-3">
                        {(activeProject as any).github && (
                          <a
                            className="font-mono rounded-md border border-white/30 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 hover:text-white hover:shadow-lg hover:shadow-white/10"
                            href={(activeProject as any).github}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub
                          </a>
                        )}
                        <a
                          className="font-mono rounded-md border border-white/30 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 hover:text-white hover:shadow-lg hover:shadow-white/10"
                          href={activeProject.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
