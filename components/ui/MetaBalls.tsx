"use client"

import React, { useEffect, useRef } from "react"
import { Camera, Mesh, Program, Renderer, Transform, Triangle, Vec3 } from "ogl"

type MetaBallsProps = {
  color?: string
  speed?: number
  enableMouseInteraction?: boolean
  hoverSmoothness?: number
  animationSize?: number
  ballCount?: number
  clumpFactor?: number
  cursorBallSize?: number
  cursorBallColor?: string
  enableTransparency?: boolean
  className?: string
}

const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;

float getMetaBallValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / max(dist2, 0.0001);
}

void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    float m1 = 0.0;
    for (int i = 0; i < 50; i++) {
        if (i >= iBallCount) break;
        m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
    }
    float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
    float total = m1 + m2;
    float blend = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    vec3 finalColor = vec3(0.0);
    if (total > 0.0) {
        float alpha1 = m1 / total;
        float alpha2 = m2 / total;
        finalColor = iColor * alpha1 + iCursorColor * alpha2;
    }
    outColor = vec4(finalColor * blend, enableTransparency ? blend : 1.0);
}
`

const fract = (value: number) => value - Math.floor(value)

const hash31 = (value: number) => {
  const results = [value * 0.1031, value * 0.103, value * 0.0973].map(fract)
  const rotated = [results[1], results[2], results[0]]
  const dotValue = results[0] * (rotated[0] + 33.33) + results[1] * (rotated[1] + 33.33) + results[2] * (rotated[2] + 33.33)
  const adjusted = results.map((component) => fract(component + dotValue))
  return adjusted
}

const hash33 = (values: number[]) => {
  const base = [values[0] * 0.1031, values[1] * 0.103, values[2] * 0.0973].map(fract)
  const reorder = [base[1], base[0], base[2]]
  const dotValue = base[0] * (reorder[0] + 33.33) + base[1] * (reorder[1] + 33.33) + base[2] * (reorder[2] + 33.33)
  const adjusted = base.map((component) => fract(component + dotValue))
  const xxy = [adjusted[0], adjusted[0], adjusted[1]]
  const yxx = [adjusted[1], adjusted[0], adjusted[0]]
  const zyx = [adjusted[2], adjusted[1], adjusted[0]]
  return xxy.map((component, index) => fract((component + yxx[index]) * zyx[index]))
}

const parseHexColor = (hex: string): [number, number, number] => {
  const sanitized = hex.replace("#", "")
  const r = parseInt(sanitized.substring(0, 2), 16) / 255
  const g = parseInt(sanitized.substring(2, 4), 16) / 255
  const b = parseInt(sanitized.substring(4, 6), 16) / 255
  return [r, g, b]
}

type BallParams = {
  st: number
  dtFactor: number
  baseScale: number
  toggle: number
  radius: number
}

const MetaBalls: React.FC<MetaBallsProps> = ({
  color = "#ffffff",
  speed = 0.3,
  enableMouseInteraction = true,
  hoverSmoothness = 0.05,
  animationSize = 30,
  ballCount = 15,
  clumpFactor = 1,
  cursorBallSize = 2,
  cursorBallColor = "#ffffff",
  enableTransparency = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({
      dpr: 1,
      alpha: true,
      premultipliedAlpha: false,
    })
    const { gl } = renderer
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1)
    container.appendChild(gl.canvas)

    const camera = new Camera(gl, {
      left: -1,
      right: 1,
      top: 1,
      bottom: -1,
      near: 0.1,
      far: 10,
    })
    camera.position.z = 1

    const geometry = new Triangle(gl)
    const [colorR, colorG, colorB] = parseHexColor(color)
    const [cursorR, cursorG, cursorB] = parseHexColor(cursorBallColor)

    const metaBallUniforms = Array.from({ length: 50 }, () => new Vec3(0, 0, 0))

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        iMouse: { value: new Vec3(0, 0, 0) },
        iColor: { value: new Vec3(colorR, colorG, colorB) },
        iCursorColor: { value: new Vec3(cursorR, cursorG, cursorB) },
        iAnimationSize: { value: animationSize },
        iBallCount: { value: Math.min(ballCount, 50) },
        iCursorBallSize: { value: cursorBallSize },
        iMetaBalls: { value: metaBallUniforms },
        iClumpFactor: { value: clumpFactor },
        enableTransparency: { value: enableTransparency },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    const scene = new Transform()
    mesh.setParent(scene)

    const effectiveCount = Math.min(ballCount, 50)
    const params: BallParams[] = []

    for (let index = 0; index < effectiveCount; index += 1) {
      const offset = index + 1
      const seed = hash31(offset)
      const hash = hash33(seed)
      const baseline = 5 + seed[1] * 5
      const toggled = Math.floor(hash[0] * 2)
      const radius = 0.5 + hash[2] * 1.5

      params.push({
        st: seed[0] * Math.PI * 2,
        dtFactor: 0.1 * Math.PI + seed[1] * (0.4 * Math.PI - 0.1 * Math.PI),
        baseScale: baseline,
        toggle: toggled,
        radius,
      })
    }

    const mousePosition = { x: 0, y: 0 }
    let pointerInside = false
    let currentPointerX = 0
    let currentPointerY = 0

    const resize = () => {
      if (!container) return
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight)
      gl.canvas.style.width = `${clientWidth}px`
      gl.canvas.style.height = `${clientHeight}px`
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!enableMouseInteraction || !container) return
      const rect = container.getBoundingClientRect()
      const normalizedX = ((event.clientX - rect.left) / rect.width) * gl.canvas.width
      const normalizedY = (1 - (event.clientY - rect.top) / rect.height) * gl.canvas.height
      currentPointerX = normalizedX
      currentPointerY = normalizedY
    }

    const handlePointerEnter = () => {
      if (!enableMouseInteraction) return
      pointerInside = true
    }

    const handlePointerLeave = () => {
      if (!enableMouseInteraction) return
      pointerInside = false
    }

    container.addEventListener("pointermove", handlePointerMove)
    container.addEventListener("pointerenter", handlePointerEnter)
    container.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("resize", resize)
    resize()

    const startTime = performance.now()
    let frameId = 0

    const update = (time: number) => {
      frameId = requestAnimationFrame(update)
      const elapsed = (time - startTime) * 0.001
      program.uniforms.iTime.value = elapsed

      for (let index = 0; index < effectiveCount; index += 1) {
        const param = params[index]
        const delta = elapsed * speed * param.dtFactor
        const theta = param.st + delta
        const x = Math.cos(theta)
        const y = Math.sin(theta + delta * param.toggle)
        metaBallUniforms[index].set(
          x * param.baseScale * clumpFactor,
          y * param.baseScale * clumpFactor,
          param.radius,
        )
      }

      const idleX = gl.canvas.width * 0.5 + Math.cos(elapsed * speed) * gl.canvas.width * 0.15
      const idleY = gl.canvas.height * 0.5 + Math.sin(elapsed * speed) * gl.canvas.height * 0.15
      const targetX = pointerInside ? currentPointerX : idleX
      const targetY = pointerInside ? currentPointerY : idleY

      mousePosition.x += (targetX - mousePosition.x) * hoverSmoothness
      mousePosition.y += (targetY - mousePosition.y) * hoverSmoothness

      program.uniforms.iMouse.value.set(mousePosition.x, mousePosition.y, 0)
      renderer.render({ scene, camera })
    }

    frameId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", resize)
      container.removeEventListener("pointermove", handlePointerMove)
      container.removeEventListener("pointerenter", handlePointerEnter)
      container.removeEventListener("pointerleave", handlePointerLeave)
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas)
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [
    animationSize,
    ballCount,
    clumpFactor,
    color,
    cursorBallColor,
    cursorBallSize,
    enableMouseInteraction,
    enableTransparency,
    hoverSmoothness,
    speed,
  ])

  const combinedClassName = className ? `relative h-full w-full ${className}` : "relative h-full w-full"

  return <div ref={containerRef} className={combinedClassName} />
}

export default MetaBalls
