import { lazy, ComponentType } from 'react'
import { LucideProps } from 'lucide-react'

// Loading component for dynamic imports
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

// Error boundary for dynamic imports
export const DynamicImportError = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="text-red-500 mb-4">
      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold mb-2">Failed to load component</h3>
    <p className="text-muted-foreground mb-4">There was an error loading this component.</p>
    <button 
      onClick={retry}
      className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
    >
      Try Again
    </button>
  </div>
)

// Utility function to create dynamic imports with loading and error states
export function createDynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    loading?: ComponentType
    error?: ComponentType<{ error: Error; retry: () => void }>
  } = {}
) {
  const LazyComponent = lazy(importFn)
  
  return {
    Component: LazyComponent,
    Loading: options.loading || LoadingSpinner,
    Error: options.error || DynamicImportError,
  }
}

// Pre-configured dynamic imports for heavy components
export const DynamicPensionCalculator = createDynamicImport(
  () => import('@/components/pension-calculator').then((mod) => ({ default: mod.PensionCalculator })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading calculator...</span>
      </div>
    )
  }
)

export const DynamicPensionCalculatorAI = createDynamicImport(
  () => import('@/components/pension-calculator-ai').then((mod) => ({ default: mod.PensionCalculatorAI })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading AI calculator...</span>
      </div>
    )
  }
)

export const DynamicChatAnalytics = createDynamicImport(
  () => import('@/components/admin/chat-analytics'),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading analytics...</span>
      </div>
    )
  }
)

export const DynamicGlobalSearch = createDynamicImport(
  () => import('@/components/global-search').then((mod) => ({ default: mod.GlobalSearch })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2 text-sm text-muted-foreground">Loading search...</span>
      </div>
    )
  }
)

// Chart components (heavy due to recharts)
export const DynamicChartComponents = {
  LineChart: createDynamicImport(() => import('recharts').then(mod => ({ default: mod.LineChart }))),
  BarChart: createDynamicImport(() => import('recharts').then(mod => ({ default: mod.BarChart }))),
  AreaChart: createDynamicImport(() => import('recharts').then(mod => ({ default: mod.AreaChart }))),
  PieChart: createDynamicImport(() => import('recharts').then(mod => ({ default: mod.PieChart }))),
}

// Icon lazy loading utility
export function createDynamicIcon(iconName: string) {
  return lazy(() => 
    import('lucide-react').then((mod) => {
      const Icon = (mod as any)[iconName] as ComponentType<LucideProps>
      if (!Icon) {
        throw new Error(`Icon ${iconName} not found`)
      }
      return { default: Icon }
    })
  )
}

// Preload function for critical components
export function preloadComponent(importFn: () => Promise<any>) {
  if (typeof window !== 'undefined') {
    // Preload on idle or after a short delay
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => importFn())
    } else {
      setTimeout(() => importFn(), 100)
    }
  }
}

// Preload critical components
if (typeof window !== 'undefined') {
  // Preload commonly used components
  preloadComponent(() => import('@/components/global-search'))
  preloadComponent(() => import('@/components/ui/chart'))
}