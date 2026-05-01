"use client";
 
import { motion } from "framer-motion";
import { Users, CreditCard, RefreshCw, Activity, PieChart, Clock, Radar } from "lucide-react";
 
export default function BetterMonitoringSection() {
  return (
    <section className="bg-white md:pb-12 pb-[-100px]">
      <div className="relative mx-auto my-12 max-w-[1440px] overflow-visible lg:overflow-hidden 2xl:rounded-3xl">
       
        {/* ROW 1 */}
        <div className="relative flex   bg-[#1E293B] flex-col lg:flex-row min-h-[500px]">
          {/* Backgrounds */}
          <div className="absolute inset-0 pointer-events-none z-0 flex flex-col lg:flex-row">
            {/* <div className="w-full lg:w-[55%] " /> */}
            {/* <div className="w-[65%] lg:flex-1 bg-[#1E293B] border-4 border-blue-500 absolute lg:relative inset-0" /> */}
            <div className="hidden lg:block w-full h-full bg-blue-50 w-[70%] lg:w-[75%] translate-x-[35rem] rounded-l-[120px]"></div>
          </div>
         
          {/* Content Left */}
          <div className="w-full lg:w-[45%] relative z-10 p-10 lg:p-20 xl:p-24 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-[#1677FF] text-white text-[10px] md:text-xs font-bold px-4 py-1.5 uppercase tracking-widest rounded-full w-fit mb-6 inline-block">
                PROBLEM
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-[1.15]">
                Better <span className="text-[#01AEE4]">Portfolio<br/> Monitoring</span> with<br/> External Signals
              </h2>
              <p className="text-[#94A3B8] text-[15px] leading-relaxed max-w-md mt-6 mb-20%">
                Most institutions use bureau data at specific points in the credit lifecycle, but lack a structured way to monitor how borrower behaviour evolves across lenders over time. This creates gaps such as:
              </p>
            </motion.div>
          </div>
 
          {/* Content Right (White Card) */}
          <div className="flex-1 relative z-30 p-8 pt-0 lg:p-12 lg:pl-0 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="block bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 md:p-12 w-full max-w-[700px] lg:-mr-12 border border-gray-100/50"
            >
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                <div className="flex items-start gap-4">
                  <Users className="w-5 h-5 text-[#1677FF] mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-gray-700 leading-snug">
                    External borrower exposure remains difficult to interpret
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <CreditCard className="w-5 h-5 text-[#1677FF] mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-gray-700 leading-snug">
                    Credit-seeking activity is visible, but not continuously monitored
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <RefreshCw className="w-5 h-5 text-[#1677FF] mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-gray-700 leading-snug">
                    Trade line growth and leverage build-up are not structured into portfolio insights
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <Activity className="w-5 h-5 text-[#1677FF] mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-gray-700 leading-snug">
                    Behaviour shifts across segments, geographies, and channels remain fragmented
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
 
        {/* ROW 2 — mobile: blue copy → white card → quote; lg+: unchanged grid */}
        <div className="relative flex max-md:mb-0 max-md:pb-16 flex-col bg-[#1E293B] md:mb-12 lg:grid lg:min-h-[450px] lg:grid-cols-[55%_minmax(0,1fr)] lg:items-stretch">
          {/* Backgrounds */}
          <div className="absolute inset-0 pointer-events-none z-0 flex flex-col-reverse lg:flex-row">
            {/* <div className="w-full lg:w-[45%] bg-[#F4F5F7] absolute lg:relative inset-0" />
            <div className="w-full lg:flex-1 bg-[#1E293B] rounded-t-[100px] lg:rounded-t-none lg:rounded-tl-[250px] relative z-10 lg:z-20 shadow-[-10px_0_40px_rgba(0,0,0,0.1)]" /> */}
             <div className="hidden lg:block w-full h-full bg-blue-50 w-[70%] lg:w-[75%] -translate-x-[15rem] rounded-r-[190px]"></div>
          </div>
 
          {/* Content Left (White Card) */}
          <div className="order-2 relative z-30 flex w-full flex-none items-center justify-end p-8 pb-10 max-lg:min-h-0 lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:min-h-0 lg:p-12 lg:pb-16 lg:pr-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block w-full shrink-0 rounded-2xl border border-gray-100/50 bg-white p-8 pb-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:p-12 lg:-ml-12 lg:pb-12"
            >
              <div className="grid gap-y-8 md:grid-cols-2 md:gap-y-10 lg:gap-y-10">
                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-[#1677FF] shrink-0" />
                  <p className="text-sm font-medium text-gray-700">
                    Cross-lender exposure patterns
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <CreditCard className="w-5 h-5 text-[#1677FF] shrink-0" />
                  <p className="text-sm font-medium text-gray-700">
                    Behaviour shifts across borrower segments
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <RefreshCw className="w-5 h-5 text-[#1677FF] shrink-0" />
                  <p className="text-sm font-medium text-gray-700">
                    External leverage build-up
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-[#1677FF] shrink-0" />
                  <p className="text-sm font-medium text-gray-700">
                    Evolving credit activity beyond the internal book
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Radar className="w-5 h-5 text-[#1677FF] shrink-0" />
                  <p className="text-sm font-medium text-gray-700">
                    Portfolio-level concentration trends
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
 
          {/* Content Right — body (mobile first in this row) */}
          <div className="relative z-30 order-1 flex flex-none flex-col justify-center p-10 pb-6 pl-10 lg:order-none lg:col-start-2 lg:row-start-1 lg:p-20 lg:pb-0 xl:p-24 lg:pl-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="mb-8 max-w-sm text-[15px] font-medium leading-relaxed text-[#94A3B8] max-md:mt-0 md:mt-5">
                As a result, bureau signals often remain isolated observations rather than part of a continuous monitoring framework.
                <br/><br/>
                BUREAU 360° solves this by converting raw bureau activity into structured borrower behaviour intelligence, enabling institutions to monitor:
              </p>
            </motion.div>
          </div>

          {/* Quote — last on mobile, second row of text column on lg+ */}
          <div className="relative z-30 order-3 flex flex-none flex-col px-10 pb-10 pt-0 pl-10 max-md:pb-2 lg:order-none lg:col-start-2 lg:row-start-2 lg:self-start lg:px-20 xl:px-24 lg:pb-20 lg:pl-32 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
            >
              <p className="text-[#ffffff] text-xs italic leading-relaxed max-w-sm font-medium border-l-[3px] border-[#01AEE4] pl-4">
                This helps lenders move from static bureau review to continuous bureau-led portfolio visibility.
              </p>
            </motion.div>
          </div>
 
        </div>
 
      </div>
    </section>
  );
}
 
 