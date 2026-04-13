"use client";

import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const unsplashIds = [
  "1556740738-f6050b1df9bc", // POS terminal
  "1601597177367-e6ce8a202d6c", // Phone finance app
  "1556742049-0cfed4f6a45d", // Square reader
  "1460925895917-afdab1d51a02", // Laptop and charts
  "1563013598-af2e25dd408a", // Phone and card
  "1573164713619-2045abfe6e63", // Laptop typing
  "1551288049-bebda4e38f71", // Desk flatlay
  "1526304640581-d334cdbbf45e", // Payment terminal blue
  "1580514107144-8da8ef70f90c", // Phone wallet scan
  "1556742502-c706fe54728f", // Handing card
  "1486312308709-ae4928f60da1", // Newspaper and glasses
  "1461181211158-9c1724cc18dd", // Chart on desk
  "1563986768404-0ea500f4ee37", // Card swiping
  "1593672715438-d88a70629abe", // Holding multiple cards
  "1563013598-af2e25dd408a", // 3D cards
  "1556741533-6d11eea9fe86", // Mobile checkout touching 
  "1612831455359-200f2e022bfe", // Keyboard and coffee
  "1556740738-f6050b1df9bc", // Green check POS
  "1611162617474-5b21e879e113", // Phone chart
  "1581091226825-a6a2a5aee158", // Desktop dual screens
];

export default function BlogsPage() {
  const blogs = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    image: `https://images.unsplash.com/photo-${unsplashIds[i % unsplashIds.length]}?w=600&h=400&fit=crop&q=80`,
    title: "Insights That Help You Detect Risk Early",
    href: `/blog/${i}`,
  }));

  return (
    <>
    <Header />    
    <main className="min-h-screen bg-white font-sans pb-32">
      {/* Title Section */}
      <section className="pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-[44px] font-bold text-[#1E293B] tracking-tight"
        >
          Ideas That <span className="text-[#01AEE4]">Matter</span>
        </motion.h1>
      </section>

      {/* Grid Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.1, duration: 0.6 }}
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8"
        >
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
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
      </section>
    </main>
    </>
  );
}
