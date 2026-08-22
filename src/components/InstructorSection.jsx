import React, { memo } from 'react';
import { ShieldCheck } from 'lucide-react';
import { instructors } from '../data/instructors';
import { InstructorCard } from './InstructorCard';
import { SectionHeading } from './UI/SectionHeading';
import { useReveal } from '../lib/useReveal';

export const InstructorSection = () => (
  <section id="instructors" className="relative py-20 sm:py-28 overflow-hidden bg-grid-pattern">
    <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-brand-purple/[0.09] blur-[120px] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Verified Enterprise Mentors"
        eyebrowIcon={ShieldCheck}
        title={<>Learn From The <span className="gradient-text-cyan-purple">Best Industry Experts</span></>}
        subtitle="Direct access to seasoned tech architects and engineering leaders with 12–15+ years of live industry experience."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-14">
        {instructors.map((instructor, i) => (
          <InstructorSlot key={instructor.id} instructor={instructor} index={i} />
        ))}
      </div>
    </div>
  </section>
);

const InstructorSlot = memo(function InstructorSlot({ instructor, index }) {
  const ref = useReveal({ delay: (index % 4) * 45 });
  return (
    <div ref={ref} data-reveal className="h-full">
      <InstructorCard instructor={instructor} />
    </div>
  );
});
