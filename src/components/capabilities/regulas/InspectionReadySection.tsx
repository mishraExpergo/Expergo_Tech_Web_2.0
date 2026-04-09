"use client";

import { motion } from "framer-motion";

const flipInner =
  "relative h-full min-h-[220px] w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]";

const faceBase =
  "absolute inset-0 flex flex-col justify-center overflow-hidden rounded-2xl [backface-visibility:hidden]";

export default function InspectionReadySection() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[16px] mb-2 tracking-wider text-[#1677FF]"
          >
            BUSINESS OUTCOME
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] mb-4 font-bold text-gray-900"
          >
            From reactive to inspection-ready
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            REGULUS transforms compliance from a periodic exercise into a continuous, demonstrable discipline.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1 — from left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#e9ecef] rounded-2xl p-8 hover:bg-[#dee2e6] transition-colors"
          >
            <h3 className="text-[38px] font-bold text-cyan-500">
              100%
              <br />
              <span className="text-xl font-semibold text-gray-900">Audit-ready</span>
            </h3>
            <p className="text-gray-600 text-sm">Continuous inspection readiness for regulatory reviews</p>
          </motion.div>

          {/* 2 — from left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#e9ecef] rounded-2xl p-8 hover:bg-[#dee2e6] transition-colors"
          >
            <h3 className="es-heading-section mb-4 font-light tracking-tight text-cyan-500">
              360°
              <br />
              <span className="text-xl font-semibold text-gray-900">Visibility</span>
            </h3>
            <p className="text-gray-600 text-sm">Clear documentation of how Early Warning Signals are handled</p>
          </motion.div>

          {/* 3 — from left: flip on hover (chart → 70% / Less manual work) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="min-h-[220px] perspective-[1000px]"
          >
            <div className="group h-full min-h-[220px] cursor-default">
              <div className={flipInner}>
                <div className={`${faceBase} bg-[#0b1319] p-6`}>
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-cyan-900 via-[#0b1319] to-[#0b1319] transition-opacity duration-700 group-hover:opacity-70" />
                  <div className="relative z-10 flex h-full w-full flex-col justify-between rounded-xl border border-cyan-800/50 bg-black/40 p-4 backdrop-blur-sm transition-colors group-hover:border-cyan-500">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="h-2 w-8 rounded-full bg-red-400" />
                      <div className="h-2 w-12 rounded-full bg-yellow-400" />
                    </div>
                    <div className="flex h-16 w-full items-end gap-1">
                      {[40, 70, 45, 90, 60, 100, 30].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm bg-cyan-400/80" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className={`${faceBase} transform-[rotateY(180deg)] bg-[#e9ecef] p-8 transition-colors group-hover:bg-[#dee2e6]`}
                >
                  <h3 className="font-bold text-[40px] text-cyan-500">70%</h3>
                  <p className=" text-xl font-bold text-gray-900">Less manual work</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4 — from left: flip on hover (dial → End-to-end Accountability) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="min-h-[220px] perspective-[1000px]"
          >
            <div className="group h-full min-h-[220px] cursor-default">
              <div className={flipInner}>
                <div className={`${faceBase} bg-[#0b1319] p-6`}>
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900 via-[#0b1319] to-[#0b1319] transition-opacity duration-700 group-hover:opacity-70" />
                  <div className="relative z-10 flex h-full w-full items-center justify-center rounded-xl border border-blue-800/50 bg-black/40 p-4 backdrop-blur-sm transition-colors group-hover:border-blue-500">
                    <div className="relative h-24 w-24 rounded-full border-[6px] border-gray-800 border-r-cyan-400 border-t-blue-500 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute text-xl font-bold text-white">100%</div>
                  </div>
                </div>
                <div
                  className={`${faceBase} transform-[rotateY(180deg)] bg-[#e9ecef] p-8 transition-colors group-hover:bg-[#dee2e6]`}
                >
                  <h3 className="text-[36px]  font-bold tracking-tight text-cyan-500">End-to-end </h3>
              <span className="text-xl font-bold  text-gray-900">Accountability</span>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Improved governance and accountability in risk handling
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#e9ecef] rounded-2xl p-8 hover:bg-[#dee2e6] transition-colors"
          >
            <h3 className="text-[36px]  font-bold tracking-tight text-cyan-500">Real-time </h3>
            <span className="text-xl font-bold  text-gray-900">Reporting</span>
            <p className="text-gray-600 text-sm">Stronger supervisory transparency for boards and leadership.</p>
          </motion.div>

          {/* 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-[#e9ecef] rounded-2xl p-8 hover:bg-[#dee2e6] transition-colors"
          >
            <h3 className="text-[36px]  font-bold tracking-tight text-cyan-500">Org-wide </h3>
            <span className="text-xl font-bold  text-gray-900">Coverage</span>
            <p className="text-gray-600 text-sm">Structured compliance discipline across the institution</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
