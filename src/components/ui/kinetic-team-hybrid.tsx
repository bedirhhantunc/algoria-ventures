'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';

/* ---------- Types ---------- */

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  linkedin?: string;
}

/* ---------- Main Component ---------- */

export default function KineticTeamHybrid({
  members,
  title = "Creative Talent",
  subtitle = "Selected Works '24",
  viewAllText,
  viewAllHref
}: {
  members: TeamMember[];
  title?: string;
  subtitle?: string;
  viewAllText?: string;
  viewAllHref?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position resources (Global for the floating card)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics for the floating card
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Detect mobile for conditional rendering logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    // Offset the cursor card so it doesn't block the text
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full cursor-default px-6 py-24 text-gray-900 dark:text-white md:px-12"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />

      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-4">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-white/70 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </motion.header>

        {/* The List */}
        <div className="flex flex-col">
          {members.map((member, index) => (
            <TeamRow
              key={member.id}
              data={member}
              index={index}
              isActive={activeId === member.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
            />
          ))}
        </div>

        {/* View All Button */}
        {viewAllText && viewAllHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <a
              href={viewAllHref}
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-900 dark:border-accent text-gray-900 dark:text-accent hover:bg-gray-900 dark:hover:bg-accent hover:text-white dark:hover:text-primary transition-all duration-300 rounded-full font-semibold group"
            >
              {viewAllText}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        )}
      </div>

      {/* DESKTOP ONLY: Global Floating Cursor Image */}
      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {activeId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative h-64 w-80 overflow-hidden rounded-xl border border-gray-300 dark:border-accent/20 bg-white dark:bg-primary/90 shadow-2xl"
              >
                {/* Find the active image */}
                <img
                  src={members.find((t) => t.id === activeId)?.image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />

                {/* Overlay Metadata */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-white/90 dark:from-primary/90 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-accent animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-900 dark:text-white/80">Active</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

/* ---------- Row Component ---------- */

function TeamRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
}: {
  data: TeamMember;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
}) {
  const isDimmed = isAnyActive && !isActive;

  const handleClick = () => {
    if (isMobile) {
      setActiveId(isActive ? null : data.id)
    } else if (data.linkedin) {
      window.open(data.linkedin, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      layout // This enables smooth height animation on mobile
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        y: 0,
        backgroundColor: isActive && isMobile ? 'rgba(255,255,255,0.03)' : 'transparent'
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={handleClick}
      className={`group relative border-t border-gray-200 dark:border-white/10 transition-colors duration-500 last:border-b hover:border-gray-400 dark:hover:border-accent/30 cursor-pointer`}
    >
      <div className="relative z-10 flex flex-col py-8 md:flex-row md:items-center md:justify-between md:py-12">

        {/* Name & Index Section */}
        <div className="flex items-baseline gap-6 md:gap-12 pl-4 md:pl-0 transition-transform duration-500 group-hover:translate-x-4">
          <span className="font-mono text-xs text-gray-400 dark:text-white/40">
            0{index + 1}
          </span>
          <h2 className="text-3xl font-medium tracking-tight text-gray-500 dark:text-white/70 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-accent md:text-6xl">
            {data.name}
          </h2>
        </div>

        {/* Role & Icon Section */}
        <div className="mt-4 flex items-center justify-between pl-12 pr-4 md:mt-0 md:justify-end md:gap-12 md:pl-0 md:pr-0">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-white/50 transition-colors group-hover:text-gray-900 dark:group-hover:text-accent">
            {data.position}
          </span>

          {/* Mobile Toggle Icon */}
          <div className="block md:hidden text-gray-500 dark:text-white/50 group-hover:text-gray-900 dark:group-hover:text-accent transition-colors">
            {isActive ? <Minus size={18} /> : <Plus size={18} />}
          </div>

          {/* Desktop Arrow */}
          <motion.div
             animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
             className="hidden md:block text-gray-900 dark:text-accent"
          >
             <ArrowUpRight size={28} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* MOBILE ONLY: Inline Accordion Image */}
      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-gray-100 dark:bg-white/5"
          >
            <div className="p-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-300 dark:border-accent/20">
                <img
                  src={data.image}
                  alt={data.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                   <p className="text-xs uppercase tracking-widest text-gray-900 dark:text-accent font-semibold">View Profile</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
