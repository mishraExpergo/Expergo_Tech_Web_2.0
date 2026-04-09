"use client";

import { motion } from "framer-motion";

const features = [
  { id: 1, title: "Signal Detected", desc: "Early Warning captured in statutory register" },
  { id: 2, title: "SOP Mapped", desc: "Regulatory expectations linked to signa" },
  { id: 3, title: "Ownership Assigned", desc: "Accountable person defined for action" },
  { id: 4, title: "Evidence Captured", desc: "Documentation and approvals recorded" },
  { id: 5, title: "Inspection Ready", desc: "Complete audit trail available on demand" },
];

export default function ComplianceSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[16px] uppercase mb-2  text-blue-500"
          >
           Overview
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="es-heading-hero font-bold text-gray-900"
          >
            Compliance captured at the moment <br />
            <span className="text-[#01AEE4]">risk appears</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 text-[20px] leading-relaxed font-poppins">
            REGULUS is a compliance control system designed for institutions operating under RBI and NHB supervision. It serves as the Statutory Early Warning Register, ensuring that every qualifying Early Warning Signal is formally recorded, reviewed, and closed with documented evidence.By capturing ownership, timelines, supporting documentation, and supervisory actions, REGULUS ensures that institutions can demonstrate how risks were handled — not just that they were detected.            </p>
          </motion.div>

          {/* Right List */}
          <div className="space-y-4 ">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 60 }}
                className="group flex flex-col  justify-center relative p-4 pl-12   rounded-r-xl transition-all hover:bg-cyan-50/30 cursor-pointer"
              >
               <div className="absolute  text-[50px] left-1 py-2 leading-none font-bold text-gray-400/40  pointer-events-none select-none tracking-tighter">
                 {feature.id}
              </div>
                <img
                  src="/line.svg"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none z-50 absolute left-11 top-12  h-[20rem] w-auto  -translate-y-1/2 object-contain object-left"
                />
                <div className="relative z-10 pl-4 ">
                  <h3 className="text-[20px] font-bold text-[#15B5C1] transition-colors group-hover:text-[#01AEE4]">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
