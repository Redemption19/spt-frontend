'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { timelineEvents } from '@/lib/constants'

// Enhanced scroll reveal component with more sophisticated animations
function ScrollReveal({ children, delay = 0, direction = 'up' }: { 
  children: React.ReactNode, 
  delay?: number,
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const getInitialState = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 50, scale: 0.95 }
      case 'down': return { opacity: 0, y: -50, scale: 0.95 }
      case 'left': return { opacity: 0, x: -50, scale: 0.95 }
      case 'right': return { opacity: 0, x: 50, scale: 0.95 }
      case 'scale': return { opacity: 0, scale: 0.8 }
      default: return { opacity: 0, y: 30, scale: 0.95 }
    }
  }

  const getAnimateState = () => {
    return { opacity: 1, x: 0, y: 0, scale: 1 }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  )
}

export default function TimelineContent() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
          <ScrollReveal direction="scale">
            <section className="mb-12 md:mb-16 text-center bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 border border-red-200/40 overflow-hidden relative">
              {/* Animated background elements */}
              <motion.div
                className="absolute inset-0 opacity-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2, delay: 1 }}
              >
                <div className="absolute top-10 left-10 w-20 h-20 bg-red-300 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-300 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-200 rounded-full blur-lg"></div>
              </motion.div>
              
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground relative z-10"
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100
                }}
              >
                Unified Strength: Four Strategic Mergers Building Tomorrow's Pension Leadership
              </motion.h1>
              
              <motion.p 
                className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto mb-6 relative z-10"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80
                }}
              >
                Through four strategic mergers and acquisitions, we've consolidated expertise, expanded to over 2,000 employers, about 150,000-member network across 19 industries, and strengthened our position as trusted pension trustees.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm relative z-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {[
                  { number: "2,000+", label: "Employers", delay: 0.7 },
                  { number: "150,000+", label: "Members", delay: 0.8 },
                  { number: "19", label: "Industries", delay: 0.9 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white px-3 sm:px-4 py-2 rounded-full border border-red-200 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: item.delay,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="font-semibold text-red-700">{item.number}</span> {item.label}
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </ScrollReveal>
          
                     {/* Timeline Section - Fully Responsive Design */}
           <section className="mb-16 relative">
             {/* Animated vertical line - Responsive positioning */}
             <motion.div 
               className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-border to-transparent z-0"
               initial={{ scaleY: 0 }}
               animate={{ scaleY: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
             />
             
             {/* Small mobile timeline line - Left aligned */}
             <motion.div 
               className="sm:hidden absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-border to-transparent z-0"
               initial={{ scaleY: 0 }}
               animate={{ scaleY: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
             />
             
             <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20 w-full relative z-10">
               {timelineEvents.map((event, index) => (
                 <ScrollReveal key={index} delay={index * 0.3} direction={index % 2 === 0 ? 'left' : 'right'}>
                   <motion.div 
                     className="relative group"
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.3 }}
                   >
                                         {/* Mobile & Tablet Layout */}
                     <div className="lg:hidden flex items-start">
                       <motion.div 
                         className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-4 border-background flex-shrink-0 mt-2 relative ${
                           event.color === 'blue' ? 'bg-blue-500' :
                           event.color === 'gray' ? 'bg-gray-500' :
                           event.color === 'light-gray' ? 'bg-gray-400' :
                           event.color === 'orange' ? 'bg-orange-500' :
                           event.color === 'dark-blue' ? 'bg-blue-700' :
                           event.color === 'green' ? 'bg-green-500' :
                           event.color === 'purple' ? 'bg-purple-500' :
                           event.color === 'red' ? 'bg-red-500' :
                           'bg-primary'
                         }`}
                         initial={{ scale: 0, rotate: -180 }}
                         animate={{ scale: 1, rotate: 0 }}
                         transition={{ 
                           duration: 0.8, 
                           delay: 0.5 + index * 0.1, 
                           type: "spring",
                           stiffness: 200,
                           damping: 15
                         }}
                         whileHover={{ 
                           scale: 1.3,
                           rotate: 5,
                           transition: { duration: 0.3 }
                         }}
                         whileTap={{ scale: 0.95 }}
                       >
                         {/* Animated pulse ring */}
                         <motion.div
                           className="absolute inset-0 rounded-full border-2 border-current opacity-0"
                           animate={{ 
                             scale: [1, 1.5, 1],
                             opacity: [0, 0.3, 0]
                           }}
                           transition={{ 
                             duration: 2,
                             repeat: Infinity,
                             delay: index * 0.2
                           }}
                         />
                         <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-background relative z-10"></div>
                       </motion.div>
                       <motion.div 
                         className="ml-4 sm:ml-6 flex-1 min-w-0"
                         initial={{ opacity: 0, x: -30 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                       >
                         <motion.h3 
                           className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2"
                           whileHover={{ scale: 1.05 }}
                           transition={{ duration: 0.2 }}
                         >
                           {event.year}
                         </motion.h3>
                         <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                           <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full capitalize w-fit">
                             {event.type}
                           </span>
                           {event.date && (
                             <span className="text-xs text-muted-foreground">
                               {event.date}
                             </span>
                           )}
                         </div>
                         <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-foreground">{event.title}</h4>
                         <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{event.description}</p>
                       </motion.div>
                     </div>

                                         {/* Desktop Layout */}
                     <div className="hidden lg:flex items-center w-full">
                       <div className={`w-1/2 flex ${index % 2 === 0 ? 'justify-end pr-8 xl:pr-12' : 'justify-start pl-8 xl:pl-12'}`}>
                         <motion.div 
                           className="w-full max-w-sm xl:max-w-md"
                           initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                           whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                         >
                           <motion.h3 
                             className="text-2xl xl:text-3xl font-bold text-primary mb-2"
                             whileHover={{ scale: 1.05 }}
                             transition={{ duration: 0.2 }}
                           >
                             {event.year}
                           </motion.h3>
                           <div className="flex items-center gap-2 mb-2">
                             <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full capitalize">
                               {event.type}
                             </span>
                             {event.date && (
                               <span className="text-xs text-muted-foreground">
                                 {event.date}
                               </span>
                             )}
                           </div>
                           <h4 className="text-xl xl:text-2xl font-semibold mb-2 text-foreground">{event.title}</h4>
                           <p className="text-muted-foreground text-sm xl:text-base">{event.description}</p>
                         </motion.div>
                       </div>
                       
                       <div className="w-0 flex justify-center relative">
                         <motion.div 
                           className={`w-8 h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center border-4 border-background relative ${
                             event.color === 'blue' ? 'bg-blue-500' :
                             event.color === 'gray' ? 'bg-gray-500' :
                             event.color === 'light-gray' ? 'bg-gray-400' :
                             event.color === 'orange' ? 'bg-orange-500' :
                             event.color === 'dark-blue' ? 'bg-blue-700' :
                             event.color === 'green' ? 'bg-green-500' :
                             event.color === 'purple' ? 'bg-purple-500' :
                             event.color === 'red' ? 'bg-red-500' :
                             'bg-primary'
                           }`}
                           initial={{ scale: 0, rotate: -180 }}
                           animate={{ scale: 1, rotate: 0 }}
                           transition={{ 
                             duration: 0.8, 
                             delay: 0.5 + index * 0.1, 
                             type: "spring",
                             stiffness: 200,
                             damping: 15
                           }}
                           whileHover={{ 
                             scale: 1.3,
                             rotate: 5,
                             transition: { duration: 0.3 }
                           }}
                           whileTap={{ scale: 0.95 }}
                         >
                           {/* Animated pulse ring */}
                           <motion.div
                             className="absolute inset-0 rounded-full border-2 border-current opacity-0"
                             animate={{ 
                               scale: [1, 1.5, 1],
                               opacity: [0, 0.3, 0]
                             }}
                             transition={{ 
                               duration: 2,
                               repeat: Infinity,
                               delay: index * 0.2
                             }}
                           />
                           <div className="w-3 h-3 xl:w-4 xl:h-4 rounded-full bg-background relative z-10"></div>
                         </motion.div>
                       </div>
                       
                       <div className="w-1/2"></div>
                     </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </section>
          
                     {/* Strategic Impact Section */}
           <ScrollReveal delay={0.5} direction="up">
             <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-lg p-6 sm:p-8 shadow-sm text-left overflow-hidden relative">
               {/* Animated background elements */}
               <motion.div
                 className="absolute inset-0 opacity-5"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.05 }}
                 transition={{ duration: 2, delay: 1 }}
               >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-300 rounded-full blur-3xl"></div>
               </motion.div>
               
               <motion.h2 
                 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-foreground relative z-10"
                 initial={{ opacity: 0, y: -30, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ 
                   duration: 0.8, 
                   ease: [0.25, 0.46, 0.45, 0.94],
                   type: "spring",
                   stiffness: 100
                 }}
               >
                 Strategic Impact & Market Position
               </motion.h2>
               <motion.p 
                 className="text-base sm:text-lg text-muted-foreground mb-6 relative z-10"
                 initial={{ opacity: 0, y: 30, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ 
                   duration: 0.8, 
                   delay: 0.2,
                   ease: [0.25, 0.46, 0.45, 0.94],
                   type: "spring",
                   stiffness: 80
                 }}
               >
                 Our strategic mergers and acquisitions have positioned Standard Pensions Trust as a market leader in Ghana's pension industry. The consolidation has delivered:
               </motion.p>
                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-foreground">Operational Excellence</h3>
                  <ul className="space-y-3">
                                         {[
                       "Consolidated expertise from four leading pension administrators",
                       "Streamlined processes and improved operational efficiency",
                       "Enhanced risk management and compliance frameworks",
                       "Unified technology platforms and member services"
                     ].map((item, index) => (
                       <motion.li 
                         key={index}
                         className="flex items-start group"
                         initial={{ opacity: 0, x: -30, scale: 0.9 }}
                         animate={{ opacity: 1, x: 0, scale: 1 }}
                         transition={{ 
                           duration: 0.6, 
                           delay: 0.4 + index * 0.15,
                           ease: [0.25, 0.46, 0.45, 0.94],
                           type: "spring",
                           stiffness: 100
                         }}
                         whileHover={{ 
                           x: 8,
                           scale: 1.02,
                           transition: { duration: 0.3 }
                         }}
                       >
                         <motion.div 
                           className="bg-blue-500/10 p-2 rounded-full mr-3 mt-1 flex-shrink-0 group-hover:bg-blue-500/20 transition-colors duration-300"
                           whileHover={{ 
                             scale: 1.2,
                             rotate: 5,
                             transition: { duration: 0.2 }
                           }}
                           whileTap={{ scale: 0.9 }}
                         >
                           <motion.div 
                             className="w-2 h-2 rounded-full bg-blue-500"
                             animate={{ 
                               scale: [1, 1.2, 1],
                               opacity: [1, 0.8, 1]
                             }}
                             transition={{ 
                               duration: 2,
                               repeat: Infinity,
                               delay: index * 0.2
                             }}
                           />
                         </motion.div>
                         <p className="text-muted-foreground text-sm sm:text-base group-hover:text-foreground transition-colors duration-300">{item}</p>
                       </motion.li>
                     ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-foreground">Market Leadership</h3>
                  <ul className="space-y-3">
                                         {[
                       "Dominant market share across 19 diverse industries",
                       "Comprehensive service portfolio for all business sizes",
                       "Innovative digital solutions and member experience",
                       "Strong regulatory relationships and compliance track record"
                     ].map((item, index) => (
                       <motion.li 
                         key={index}
                         className="flex items-start group"
                         initial={{ opacity: 0, x: -30, scale: 0.9 }}
                         animate={{ opacity: 1, x: 0, scale: 1 }}
                         transition={{ 
                           duration: 0.6, 
                           delay: 0.6 + index * 0.15,
                           ease: [0.25, 0.46, 0.45, 0.94],
                           type: "spring",
                           stiffness: 100
                         }}
                         whileHover={{ 
                           x: 8,
                           scale: 1.02,
                           transition: { duration: 0.3 }
                         }}
                       >
                         <motion.div 
                           className="bg-indigo-500/10 p-2 rounded-full mr-3 mt-1 flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors duration-300"
                           whileHover={{ 
                             scale: 1.2,
                             rotate: 5,
                             transition: { duration: 0.2 }
                           }}
                           whileTap={{ scale: 0.9 }}
                         >
                           <motion.div 
                             className="w-2 h-2 rounded-full bg-indigo-500"
                             animate={{ 
                               scale: [1, 1.2, 1],
                               opacity: [1, 0.8, 1]
                             }}
                             transition={{ 
                               duration: 2,
                               repeat: Infinity,
                               delay: index * 0.2
                             }}
                           />
                         </motion.div>
                         <p className="text-muted-foreground text-sm sm:text-base group-hover:text-foreground transition-colors duration-300">{item}</p>
                       </motion.li>
                     ))}
                  </ul>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
} 