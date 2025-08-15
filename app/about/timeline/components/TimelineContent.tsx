'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { timelineEvents } from '@/lib/constants'

// Simple scroll reveal component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
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
          <ScrollReveal>
            <section className="mb-12 md:mb-16 text-center bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 border border-red-200/40">
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Unified Strength: Four Strategic Mergers Building Tomorrow's Pension Leadership
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Through four strategic mergers and acquisitions, we've consolidated expertise, expanded to over 2,000 employers, about 150,000-member network across 19 industries, and strengthened our position as trusted pension trustees.
              </motion.p>
                             <motion.div 
                 className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
               >
                 <div className="bg-white px-3 sm:px-4 py-2 rounded-full border border-red-200 text-center">
                   <span className="font-semibold text-red-700">2,000+</span> Employers
                 </div>
                 <div className="bg-white px-3 sm:px-4 py-2 rounded-full border border-red-200 text-center">
                   <span className="font-semibold text-red-700">150,000+</span> Members
                 </div>
                 <div className="bg-white px-3 sm:px-4 py-2 rounded-full border border-red-200 text-center">
                   <span className="font-semibold text-red-700">19</span> Industries
                 </div>
               </motion.div>
            </section>
          </ScrollReveal>
          
          {/* Timeline Section - Fully Responsive Design */}
          <section className="mb-16 relative">
            {/* Vertical line - Responsive positioning */}
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border z-0"></div>
            
            {/* Small mobile timeline line - Left aligned */}
            <div className="sm:hidden absolute left-4 top-0 h-full w-0.5 bg-border z-0"></div>
            
            <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20 w-full relative z-10">
              {timelineEvents.map((event, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                                         {/* Mobile & Tablet Layout */}
                     <div className="lg:hidden flex items-start">
                       <motion.div 
                         className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-4 border-background flex-shrink-0 mt-2 ${
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
                         initial={{ scale: 0 }}
                         animate={{ scale: 1 }}
                         transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: "spring" }}
                         whileHover={{ scale: 1.2 }}
                       >
                         <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-background"></div>
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
                           className={`w-8 h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center border-4 border-background ${
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
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: "spring" }}
                           whileHover={{ scale: 1.2 }}
                         >
                           <div className="w-3 h-3 xl:w-4 xl:h-4 rounded-full bg-background"></div>
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
          <ScrollReveal delay={0.5}>
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-lg p-6 sm:p-8 shadow-sm text-left">
              <motion.h2 
                className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Strategic Impact & Market Position
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div 
                          className="bg-blue-500/10 p-2 rounded-full mr-3 mt-1 flex-shrink-0"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </motion.div>
                        <p className="text-muted-foreground text-sm sm:text-base">{item}</p>
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
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div 
                          className="bg-indigo-500/10 p-2 rounded-full mr-3 mt-1 flex-shrink-0"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        </motion.div>
                        <p className="text-muted-foreground text-sm sm:text-base">{item}</p>
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