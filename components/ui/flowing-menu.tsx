"use client"

import React, { useMemo, useRef } from "react"
import { gsap } from "gsap"

type MenuItemProps = {
  link: string
  text: string
  image: string
  index: number
  onActiveChange?: (index: number) => void
}

type FlowingMenuProps = {
  items?: Array<{
    link: string
    text: string
    image: string
  }>
  onActiveChange?: (index: number) => void
}

const animationDefaults = { duration: 0.6, ease: "expo" as const }

const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
  const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2
  const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2
  return topEdgeDist < bottomEdgeDist ? "top" : "bottom"
}

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image, index, onActiveChange }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)

  const handleEnter = (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLAnchorElement>
      | React.TouchEvent<HTMLAnchorElement>,
  ) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return

    const rect = itemRef.current.getBoundingClientRect()
    let edge: "top" | "bottom" = "top"

    if ("clientX" in event) {
      edge = findClosestEdge(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height)
    }

    if ("touches" in event && event.touches.length > 0) {
      const touch = event.touches[0]
      edge = findClosestEdge(touch.clientX - rect.left, touch.clientY - rect.top, rect.width, rect.height)
    }

    const tl = gsap.timeline({ defaults: animationDefaults })
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" })

    onActiveChange?.(index)
  }

  const handleLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return

    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height)

    const tl = gsap.timeline({ defaults: animationDefaults })
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, "<")
  }

  const repeatedContent = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, repeatIndex) => (
        <React.Fragment key={repeatIndex}>
          <span className="p-[0.75vh_2vw_0] text-[clamp(1rem,3.4vw,1.75rem)] font-normal tracking-[0.2em] leading-[1.2] text-[#060010]">
            {text}
          </span>
          <div
            className="mx-[2vw] my-[1.5em] h-[8vh] min-h-16 w-auto bg-center bg-no-repeat sm:h-[9vh]"
            style={{ 
              backgroundImage: `url(${image})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              aspectRatio: 'auto',
              width: 'auto',
              minWidth: '120px',
              maxWidth: '280px',
            }}
          />
        </React.Fragment>
      )),
    [image, text],
  )

  return (
    <div
      className="relative flex-1 overflow-hidden border-b border-white/15 text-center last:border-b-0"
      ref={itemRef}
    >
      <a
        className="relative flex h-full items-center justify-center gap-2 px-4 py-6 text-[clamp(1.05rem,3.4vw,1.85rem)] font-light tracking-[0.25em] uppercase text-white no-underline transition-colors duration-300 hover:text-[#060010] focus-visible:text-[#060010]"
        href={link}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onTouchStart={handleEnter}
        onClick={() => onActiveChange?.(index)}
      >
        {text}
      </a>
      <div
        className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden bg-white translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="flex h-full w-[200%]" ref={marqueeInnerRef}>
          <div className="relative flex h-full w-[200%] items-center will-change-transform animate-flowing-marquee">
            {repeatedContent}
          </div>
        </div>
      </div>
    </div>
  )
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [], onActiveChange }) => {
  return (
    <div className="h-full w-full overflow-hidden">
      <nav className="flex h-full flex-col p-0">
        {items.map((item, index) => (
          <MenuItem key={`${item.text}-${index}`} {...item} index={index} onActiveChange={onActiveChange} />
        ))}
      </nav>
    </div>
  )
}

export default FlowingMenu
