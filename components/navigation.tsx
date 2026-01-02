"use client"

import { motion } from "framer-motion"
import GlassSurface from "@/components/ui/glass-surface"

type NavItem = {
  label: string
  href: string
  variant?: "brand" | "default"
}

const navItems: NavItem[] = [
  { label: "M", href: "#top", variant: "brand" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

type NavigationProps = {
  visible?: boolean
  onTopClick?: () => void
}

export default function Navigation({ visible = true, onTopClick }: NavigationProps) {
  return (
    <motion.nav
      className="sticky top-5 z-50 flex w-full justify-center px-4"
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!visible}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <GlassSurface
        width="auto"
        height="auto"
        borderRadius={999}
        borderWidth={0.14}
        brightness={60}
        opacity={0.82}
        blur={18}
        backgroundOpacity={0.18}
        saturation={1.55}
        displace={10}
        distortionScale={-130}
        redOffset={5}
        greenOffset={18}
        blueOffset={28}
        mixBlendMode="screen"
        className="pointer-events-auto px-8 py-2.5"
        style={{ minWidth: "min(90vw, 480px)" }}
      >
        <div className="flex items-center gap-9">
          {navItems.map((item) => {
            const isBrand = item.variant === "brand"
            return (
              <a
                key={`${item.label}-${item.href}`}
                href={item.href}
                onClick={(event) => {
                  if (isBrand && onTopClick) {
                    event.preventDefault()
                    onTopClick()
                  }
                }}
                className={
                  isBrand
                    ? "font-serif text-2xl italic tracking-[0.4em] text-white/90 transition-colors duration-300 hover:text-white"
                    : "font-mono text-[11px] uppercase tracking-[0.35em] text-white/75 transition-colors duration-300 hover:text-white"
                }
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </GlassSurface>
    </motion.nav>
  )
}
