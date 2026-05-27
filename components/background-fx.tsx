"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { useEffect } from "react"

const particles = [
  { x: "6%", y: "24%", size: 18, delay: 0, duration: 11 },
  { x: "14%", y: "68%", size: 14, delay: 0.7, duration: 13 },
  { x: "26%", y: "38%", size: 22, delay: 1.3, duration: 14 },
  { x: "74%", y: "20%", size: 16, delay: 0.5, duration: 12 },
  { x: "84%", y: "58%", size: 20, delay: 1.8, duration: 15 },
  { x: "92%", y: "34%", size: 12, delay: 2.3, duration: 10 },
]

export function BackgroundFx() {
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100)
      mouseY.set((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mouseX, mouseY])

  const glow = useMotionTemplate`radial-gradient(560px circle at ${mouseX}% ${mouseY}%, oklch(0.58 0.22 25 / 0.09), transparent 45%)`

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ background: glow }} />
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundImage: "url('/goatedmarket-logo.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              filter: "drop-shadow(0 0 12px oklch(0.58 0.22 25 / 0.18))",
            }}
            animate={{ y: [0, -20, 0], rotate: [0, 8, -6, 0], opacity: [0.1, 0.22, 0.1] }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  )
}
