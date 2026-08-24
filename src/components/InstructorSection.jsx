import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { instructors } from '../data/instructors';
import { InstructorCard } from './InstructorCard';
import { SectionHeading } from './UI/SectionHeading';
import { useReveal } from '../lib/useReveal';

/**
 * Instructor section — static 2-card centered layout.
 * With only 2 real instructors, a marquee would look repetitive,
 * so we display them in a clean, centered grid.
 */
export const InstructorSection = () => {
  const headingRef = useReveal();

  return (
    <section id="instructors" className="relative py-20 sm:py-28 overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-brand-indigo/[0.07] blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} data-reveal>
          <SectionHeading
            eyebrow="Industry Mentors"
            eyebrowIcon={ShieldCheck}
            title={<>Learn From <span className="gradient-text-cyan-purple">Expert Mentors</span></>}
            subtitle="Direct access to seasoned technology professionals with 12+ years of real-world software engineering experience."
          />
        </div>

        {/* Static centered 2-card grid */}
        <div className="flex justify-center mt-14">
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-2xl w-full">
            {instructors.map((instructor, i) => (
              <InstructorCardSlot key={instructor.id} instructor={instructor} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const InstructorCardSlot = ({ instructor, index }) => {
  const ref = useReveal({ delay: index * 80 });
  return (
    <div ref={ref} data-reveal className="h-full">
      <InstructorCard instructor={instructor} />
    </div>
  );
};
