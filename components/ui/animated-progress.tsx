'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedProgressProps {
  value: number
  label?: string
  color?: 'primary' | 'accent' | 'green' | 'blue' | 'orange' | 'purple'
  height?: 'sm' | 'md' | 'lg'
  duration?: number
  showPercentage?: boolean
  className?: string
}

export function AnimatedProgress({
  value,
  label,
  color = 'primary',
  height = 'md',
  duration = 1.5,
  showPercentage = true,
  className = ''
}: AnimatedProgressProps) {
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

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn('w-full', className)}
    >
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showPercentage && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm font-semibold text-primary"
            >
              {value}%
            </motion.span>
          )}
        </div>
      )}
      
      <div className={cn(
        'w-full bg-secondary rounded-full overflow-hidden',
        heightClasses[height]
      )}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ 
            duration, 
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2
          }}
          className={cn(
            'h-full rounded-full relative overflow-hidden',
            colorClasses[color]
          )}
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