'use client'

import React from 'react'

// Performance monitoring utilities for Core Web Vitals and custom metrics

// Global gtag declaration for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

const gtag = typeof window !== 'undefined' ? window.gtag : undefined

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  url: string
}

interface WebVitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private observers: PerformanceObserver[] = []
  private isEnabled: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.isEnabled = true
      this.initializeMonitoring()
    }
  }

  private initializeMonitoring() {
    // Only monitor Core Web Vitals in production to reduce overhead
    if (process.env.NODE_ENV === 'production') {
      this.observeWebVitals()
      this.observeNavigationTiming()
    }
    
    // Disable resource timing and long tasks monitoring to reduce overhead
    // this.observeResourceTiming()
    // this.observeLongTasks()
    // this.observeUserInteractions()
  }

  private observeWebVitals() {
    // Import web-vitals dynamically to avoid SSR issues
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(this.handleWebVital.bind(this))
        onFCP(this.handleWebVital.bind(this))
        onLCP(this.handleWebVital.bind(this))
        onTTFB(this.handleWebVital.bind(this))
        onINP(this.handleWebVital.bind(this))
      }).catch(console.error)
    }
  }

  private handleWebVital(metric: WebVitalsMetric) {
    const performanceMetric: PerformanceMetric = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
      url: window.location.href
    }

    this.metrics.push(performanceMetric)
    
    // Only report metrics in production to reduce overhead
    if (process.env.NODE_ENV === 'production') {
      this.reportMetric(performanceMetric)
    }

    // Reduce console logging frequency in development
    if (process.env.NODE_ENV === 'development' && metric.rating === 'poor') {
      console.warn(`[Performance] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta
      })
    }
  }

  private observeNavigationTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            
            // DNS lookup time
            this.recordMetric('dns-lookup', navEntry.domainLookupEnd - navEntry.domainLookupStart)
            
            // TCP connection time
            this.recordMetric('tcp-connection', navEntry.connectEnd - navEntry.connectStart)
            
            // Server response time
            this.recordMetric('server-response', navEntry.responseEnd - navEntry.requestStart)
            
            // DOM processing time
            this.recordMetric('dom-processing', navEntry.domComplete - navEntry.domContentLoadedEventStart)
            
            // Total page load time
            this.recordMetric('page-load', navEntry.loadEventEnd - navEntry.fetchStart)
          }
        }
      })
      
      observer.observe({ entryTypes: ['navigation'] })
      this.observers.push(observer)
    }
  }

  private observeResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming
          
          // Track slow resources (>1s)
          if (resourceEntry.duration > 1000) {
            this.recordMetric(`slow-resource-${this.getResourceType(resourceEntry)}`, resourceEntry.duration)
          }
          
          // Track large resources (>500KB)
          if (resourceEntry.transferSize > 500000) {
            this.recordMetric(`large-resource-${this.getResourceType(resourceEntry)}`, resourceEntry.transferSize)
          }
        }
      })
      
      observer.observe({ entryTypes: ['resource'] })
      this.observers.push(observer)
    }
  }

  private observeLongTasks() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric('long-task', entry.duration)
        }
      })
      
      try {
        observer.observe({ entryTypes: ['longtask'] })
        this.observers.push(observer)
      } catch (e) {
        // Long tasks not supported
      }
    }
  }

  private observeUserInteractions() {
    // Track click responsiveness
    document.addEventListener('click', (event) => {
      const startTime = performance.now()
      
      requestAnimationFrame(() => {
        const endTime = performance.now()
        const duration = endTime - startTime
        
        if (duration > 100) {
          this.recordMetric('slow-click-response', duration)
        }
      })
    })

    // Track form submission times
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement
      const startTime = performance.now()
      
      form.addEventListener('load', () => {
        const endTime = performance.now()
        this.recordMetric('form-submission', endTime - startTime)
      }, { once: true })
    })
  }

  private getResourceType(entry: PerformanceResourceTiming): string {
    const url = new URL(entry.name)
    const extension = url.pathname.split('.').pop()?.toLowerCase()
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
      return 'image'
    }
    if (['js', 'mjs'].includes(extension || '')) {
      return 'script'
    }
    if (['css'].includes(extension || '')) {
      return 'stylesheet'
    }
    if (['woff', 'woff2', 'ttf', 'otf'].includes(extension || '')) {
      return 'font'
    }
    
    return 'other'
  }

  public recordMetric(name: string, value: number) {
    const rating = this.getRating(name, value)
    
    const metric: PerformanceMetric = {
      name,
      value,
      rating,
      timestamp: Date.now(),
      url: window.location.href
    }
    
    this.metrics.push(metric)
    this.reportMetric(metric)
  }

  private getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, [number, number]> = {
      'dns-lookup': [100, 300],
      'tcp-connection': [100, 300],
      'server-response': [200, 600],
      'dom-processing': [800, 1800],
      'page-load': [1500, 3000],
      'slow-click-response': [100, 300],
      'form-submission': [1000, 3000],
      'long-task': [50, 100]
    }
    
    const [good, poor] = thresholds[name] || [100, 300]
    
    if (value <= good) return 'good'
    if (value <= poor) return 'needs-improvement'
    return 'poor'
  }

  private reportMetric(metric: PerformanceMetric) {
    // Send to analytics service (implement based on your analytics provider)
    if (process.env.NODE_ENV === 'production') {
      // Example: Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'performance_metric', {
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
          page_url: metric.url
        })
      }
      
      // Example: Custom analytics endpoint
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric)
      }).catch(() => {}) // Silently fail
    }
  }

  // Public methods
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  public getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter(m => m.name === name)
  }

  public getAverageMetric(name: string): number {
    const metrics = this.getMetricsByName(name)
    if (metrics.length === 0) return 0
    
    return metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length
  }

  public clearMetrics(): void {
    this.metrics = []
  }

  public startCustomTimer(name: string): () => void {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      this.recordMetric(name, endTime - startTime)
    }
  }

  public markFeatureUsage(featureName: string): void {
    this.recordMetric(`feature-usage-${featureName}`, 1)
  }

  public destroy(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    this.metrics = []
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor()
  }
  return performanceMonitor
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const monitor = getPerformanceMonitor()
  
  return {
    recordMetric: (name: string, value: number) => monitor.recordMetric(name, value),
    startTimer: (name: string) => monitor.startCustomTimer(name),
    markFeatureUsage: (featureName: string) => monitor.markFeatureUsage(featureName),
    getMetrics: () => monitor.getMetrics(),
    getAverageMetric: (name: string) => monitor.getAverageMetric(name)
  }
}

// Performance-aware component wrapper
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function PerformanceMonitoredComponent(props: P) {
    const monitor = getPerformanceMonitor()
    
    React.useEffect(() => {
      const endTimer = monitor.startCustomTimer(`component-render-${componentName}`)
      return endTimer
    }, [])
    
    return React.createElement(Component, props)
  }
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  getPerformanceMonitor()
}