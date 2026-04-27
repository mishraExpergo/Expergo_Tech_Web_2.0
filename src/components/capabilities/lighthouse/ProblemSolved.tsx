"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const RADAR_AXES = [
  {
    label: "Faster Resolution",
    lighthouse: 95,
    traditional: 42,
    cx: 50,
    cy: 10,
  },
  {
    label: "Visibility Scaling",
    lighthouse: 90,
    traditional: 55,
    cx: 85,
    cy: 35,
  },
  {
    label: "Continuous Analysis",
    lighthouse: 92,
    traditional: 48,
    cx: 80,
    cy: 85,
  },
  {
    label: "Cost Reduction",
    lighthouse: 88,
    traditional: 50,
    cx: 20,
    cy: 85,
  },
  {
    label: "Integration Ease",
    lighthouse: 85,
    traditional: 38,
    cx: 10,
    cy: 40,
  },
] as const;

export default function ProblemSolved() {
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, textShadow: "0px 0px 0px rgba(0,0,0,0)" }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="mb-4"
          >
             <span className=" px-3 py-1 tracking-widest text-[#01AEE4] ">
                SOLUTION
             </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] mb-6 font-bold text-gray-900"
          >
            What Problem it <span className="text-[#01AEE4]">Solves?</span>
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
           
           {/* Left Radar Chart */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6 }}
             className="flex-1 w-full max-w-[500px]"
           >
              <div className="bg-white rounded-xl p-8 flex flex-col items-center">
                 
                 <div className="relative w-64 h-64 mb-10">
                    <AnimatePresence>
                      {hoveredAxis !== null && (
                        <motion.div
                          key={hoveredAxis}
                          role="tooltip"
                          initial={{ opacity: 0, y: 6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="pointer-events-none absolute z-20 min-w-[9.5rem] rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-left shadow-lg"
                          style={{
                            left: `${RADAR_AXES[hoveredAxis].cx}%`,
                            top: `${RADAR_AXES[hoveredAxis].cy}%`,
                            transform: "translate(-50%, calc(-100% - 14px))",
                          }}
                        >
                          <p className="text-[11px] font-bold uppercase tracking-wide text-gray-900">
                            {RADAR_AXES[hoveredAxis].label}
                          </p>
                          <div className="mt-2 space-y-1.5 text-[11px]">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-gray-500">Lighthouse</span>
                              <span className="font-semibold tabular-nums text-[#01AEE4]">
                                {RADAR_AXES[hoveredAxis].lighthouse}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-gray-500">Traditional</span>
                              <span className="font-semibold tabular-nums text-red-500">
                                {RADAR_AXES[hoveredAxis].traditional}%
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* SVG Radar Base Grid */}
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                       {/* Pentagon Grid lines */}
                       <polygon points="50,5 95,35 75,90 25,90 5,35" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                       <polygon points="50,15 85,40 70,80 30,80 15,40" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                       <polygon points="50,25 75,45 65,70 35,70 25,45" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                       <polygon points="50,35 65,50 60,60 40,60 35,50" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                       
                       {/* Center lines */}
                       <line x1="50" y1="50" x2="50" y2="5" stroke="#E5E7EB" strokeWidth="1" />
                       <line x1="50" y1="50" x2="95" y2="35" stroke="#E5E7EB" strokeWidth="1" />
                       <line x1="50" y1="50" x2="75" y2="90" stroke="#E5E7EB" strokeWidth="1" />
                       <line x1="50" y1="50" x2="25" y2="90" stroke="#E5E7EB" strokeWidth="1" />
                       <line x1="50" y1="50" x2="5" y2="35" stroke="#E5E7EB" strokeWidth="1" />
                       
                       {/* Traditional Data Path (Red) */}
                       <motion.polygon 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 1 }}
                          points="50,30 65,45 60,75 35,65 25,40" 
                          fill="none" 
                          stroke="#EF4444" 
                          strokeWidth="1.5"
                          className="pointer-events-none"
                       />

                       {/* Lighthouse Data Path (Blue) */}
                       <motion.polygon 
                          initial={{ opacity: 0, scale: 0.5, transformOrigin: 'center' }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                          points="50,10 85,35 80,85 20,85 10,40" 
                          fill="#01AEE4" 
                          fillOpacity="0.2"
                          stroke="#01AEE4" 
                          strokeWidth="2"
                          className="pointer-events-none"
                       />

                       {RADAR_AXES.map((axis, i) => (
                         <g
                           key={axis.label}
                           className="cursor-pointer outline-none"
                           onMouseEnter={() => setHoveredAxis(i)}
                           onMouseLeave={() => setHoveredAxis(null)}
                           onFocus={() => setHoveredAxis(i)}
                           onBlur={() => setHoveredAxis(null)}
                           tabIndex={0}
                         >
                           <title>
                             {axis.label}: Lighthouse {axis.lighthouse}%, Traditional {axis.traditional}%
                           </title>
                           <circle
                             cx={axis.cx}
                             cy={axis.cy}
                             r="12"
                             fill="transparent"
                             className="pointer-events-auto"
                           />
                           <motion.circle
                             cx={axis.cx}
                             cy={axis.cy}
                             fill="#01AEE4"
                             stroke="white"
                             className="pointer-events-none"
                             animate={{
                               r: hoveredAxis === i ? 4 : 2.5,
                               strokeWidth: hoveredAxis === i ? 1.5 : 0,
                             }}
                             transition={{ type: "spring", stiffness: 420, damping: 28 }}
                           />
                         </g>
                       ))}
                    </svg>
                    
                    {/* Axis Labels */}
                    <span className="md:px-0 px-4 absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-500 uppercase tracking-tight whitespace-nowrap">Faster Resolution</span>
                    <span className="md:px-0 px-4 absolute top-[25%] -right-16 text-[10px] font-bold text-gray-500 uppercase tracking-tight whitespace-nowrap text-right">Visibility<br/>Scaling</span>
                    <span className="md:px-0 px-4 absolute -bottom-6 -right-6 text-[10px] font-bold text-gray-500 uppercase tracking-tight whitespace-nowrap">Continuous<br/>Analysis</span>
                    <span className="md:px-0 px-4 absolute -bottom-6 -left-6 text-[10px] font-bold text-gray-500 uppercase tracking-tight whitespace-nowrap text-right">Cost<br/>Reduction</span>
                    <span className="md:px-0 px-4 absolute top-[25%] -left-16 text-[10px] font-bold text-gray-500 uppercase tracking-tight whitespace-nowrap">Integration<br/>Ease</span>
                 </div>

                 {/* Legend */}
                 <div className="flex justify-center gap-6 w-full pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-red-500 rounded-sm" />
                       <span className="text-[10px] font-bold text-gray-600 uppercase">Traditional</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 bg-[#01AEE4] rounded-sm" />
                       <span className="text-[10px] font-bold text-gray-600 uppercase">Lighthouse</span>
                    </div>
                 </div>

              </div>
           </motion.div>

           {/* Right Text */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.5 }}
             className="flex-1 max-w-xl"
           >
              <h3 className=" mb-4 font-bold text-[24px]">
                 Traditional <span className="text-[#15B5C1]"> Dashboards VS Lighthouse</span>
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
              Most institutions rely on dashboards that show overdue positions but miss how risk develops before delinquency. Lighthouse solves this by connecting risk detection, case handling, and resolution tracking into a single structured control framework. 
              </p>
           </motion.div>
        </div>

      </div>
    </section>
  );
}
