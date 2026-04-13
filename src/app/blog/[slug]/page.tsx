"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react"; // To map easily if needed

const unsplashIds = [
  "1556740738-f6050b1df9bc", // POS terminal
  "1601597177367-e6ce8a202d6c", // Phone finance app
  "1556742049-0cfed4f6a45d", // Square reader
  "1460925895917-afdab1d51a02", // Laptop and charts
];

const relatedBlogs = Array.from({ length: 4 }).map((_, i) => ({
  id: i,
  image: `https://images.unsplash.com/photo-${unsplashIds[i]}?w=600&h=400&fit=crop&q=80`,
  title: "Insights That Help You Detect Risk Early",
  href: `/blog/${i}`,
}));

export default function BlogDetailPage() {
  return (
    <main className="min-h-screen bg-white font-sans pb-32">
      
      {/* Blog Detail Article Section */}
      <section className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1E293B] leading-[1.25] mb-10 tracking-tight"
          >
            Detecting Risk Early: Why Proactive Intelligence Is <br className="hidden md:block" /> the <span className="text-[#01AEE4]">Future of Housing Finance</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full h-[300px] sm:h-[400px] md:h-[480px] rounded-[24px] overflow-hidden mb-12 shadow-sm"
          >
            <img 
              src="https://images.unsplash.com/photo-1556741533-6d11eea9fe86?w=1200&h=800&fit=crop&q=80" 
              alt="Payment Terminal" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Article Content */}
          <motion.article 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#475569] text-[17px] leading-[1.8] tracking-wide max-w-[850px] space-y-10"
          >
            <p>
              In housing finance and loan-against-property (LAP) portfolios, risk rarely appears overnight. It builds silently—through small delays, subtle behavioral changes, incomplete documentation, or early stress indicators that traditional systems often overlook. Yet, many financial institutions still respond to risk after it has already materialized. This is where early risk intelligence becomes critical.
            </p>

            <div>
              <h2 className="text-[#01AEE4] text-2xl font-bold mb-4">The Challenge with Traditional Risk Management</h2>
              <p className="mb-4">Most legacy risk frameworks are built around:</p>
              <ul className="mb-6 space-y-1 pl-1">
                <li>- Periodic reviews</li>
                <li>- Manual interventions</li>
                <li>- Siloed data across teams</li>
                <li>- Reactive collections and recovery processes</li>
              </ul>
              <p className="mb-6">
                By the time a loan is flagged as &apos;high risk,&apos; value erosion has already begun impacting asset quality, compliance posture, and operational efficiency. In a regulated environment, this approach creates three major problems:
              </p>
              <ul className="space-y-1.5 pl-1 text-[#1E293B] font-semibold">
                <li>1. Delayed detection of stress</li>
                <li>2. Unstructured resolution workflows</li>
                <li>3. Weak audit and governance visibility</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#01AEE4] text-2xl font-bold mb-4">Why Early Detection Changes Everything</h2>
              <p className="mb-4">
                Early detection is not just about identifying bad loans—it&apos;s about recognizing early warning signals before they become irreversible. <br className="hidden md:block"/>
                These signals may include:
              </p>
              <ul className="space-y-1 pl-1">
                <li>- Changes in repayment behavior</li>
                <li>- Deterioration in borrower profiles</li>
                <li>- Field-level observations</li>
                <li>- Documentation inconsistencies</li>
                <li>- Portfolio-level risk patterns</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#01AEE4] text-2xl font-bold mb-4">When identified early, institutions gain:</h2>
              <ul className="space-y-1 pl-1">
                <li>- More time to act</li>
                <li>- More options for resolution</li>
                <li>- Better outcomes for both lender and borrower</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#01AEE4] text-2xl font-bold mb-4">The Cost of Late Intervention</h2>
              <p>
                Delayed risk identification limits resolution options and increases portfolio vulnerability. Manual reviews, siloed data, and post-default actions often result in higher losses and weaker regulatory defensibility. In a highly regulated environment, late intervention also impacts governance, audit readiness, and overall confidence in risk controls.
              </p>
            </div>

            <div>
              <h2 className="text-[#01AEE4] text-2xl font-bold mb-4">A Proactive, Intelligence-Led Approach</h2>
              <p>
                EarlySafe enables financial institutions to identify early warning signals and act before risks escalate. By bringing together portfolio data, field insights, and structured workflows, EarlySafe supports timely decision-making while integrating seamlessly with existing core systems without operational disruption.
              </p>
            </div>

            <div>
              <h2 className="text-[#01AEE4] text-2xl font-bold mb-4">Built for Governance and Clarity</h2>
              <p>
                Every action within EarlySafe is structured, traceable, and audit-ready. This ensures clear accountability, transparent workflows, and regulator-defensible governance, helping institutions manage risk with confidence and consistency.
              </p>
            </div>

          </motion.article>

        </div>
      </section>

      {/* Ideas That Matter (Related Blogs) */}
      <section className="pt-10 pb-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1E293B] tracking-tight"
            >
              Ideas That <span className="text-[#01AEE4]">Matter</span>
            </motion.h2>
          </div>

          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ delay: 0.1, duration: 0.6 }}
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8"
          >
            {relatedBlogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (idx % 4) * 0.1, duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-[14px] overflow-hidden border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group cursor-pointer h-full"
              >
                {/* Card Image */}
                <div className="h-44 w-full overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={blog.image}
                    alt="Blog thumbnail"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="text-[#1A202C] font-semibold text-[15px] leading-snug mb-5 tracking-wide">
                    {blog.title}
                  </h3>
                  
                  <div className="mt-auto">
                    <Link 
                      href={blog.href} 
                      className="inline-flex items-center text-[#01AEE4] text-[13px] font-bold uppercase tracking-wider hover:text-[#008cb8] transition-colors gap-1.5 group/link"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

    </main>
  );
}
