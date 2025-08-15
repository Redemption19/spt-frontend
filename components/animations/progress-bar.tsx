'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ProgressBarProps {
  percentage: number
  label?: string
  color?: string
  height?: string
  duration?: number
  showPercentage?: boolean
  className?: string
}

export function ProgressBar({
  percentage,
  label,
  color = 'primary',
  height = 'h-3',
  duration = 1.5,
  showPercentage = true,
  className = ''
}: ProgressBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const colorClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full ${className}`}
    >
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showPercentage && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm font-semibold text-primary"
            >
              {percentage}%
            </motion.span>
          )}
        </div>
      )}
      
      <div className={`w-full ${height} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ 
            duration, 
            ease: "easeOut",
            delay: 0.2
          }}
          className={`${height} ${colorClasses[color as keyof typeof colorClasses]} rounded-full relative overflow-hidden`}
        >
          {/* Shimmer effect */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '200%' } : { x: '-100%' }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.5,
              repeat: 1
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  )
} 