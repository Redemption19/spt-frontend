'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  label?: string
  showPercentage?: boolean
  duration?: number
  className?: string
}

export function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#8A0F3C',
  backgroundColor = '#e5e7eb',
  label,
  showPercentage = true,
  duration = 2,
  className = ''
}: CircularProgressProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative inline-flex flex-col items-center ${className}`}
    >
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ 
              duration, 
              ease: "easeOut",
              delay: 0.2
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            {showPercentage && (
              <div className="text-2xl font-bold text-foreground">
                {percentage}%
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-3 text-sm font-medium text-center text-muted-foreground"
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  )
} 