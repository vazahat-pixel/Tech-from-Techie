import React from 'react';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { CourseSection } from './components/CourseSection';
import { CourseDetailModal } from './components/CourseDetailModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DemoSection } from './components/DemoSection';
import { LearningExperience } from './components/LearningExperience';
import { HowItWorks } from './components/HowItWorks';
import { InstructorSection } from './components/InstructorSection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { Toast } from './components/UI/Toast';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-ink selection:bg-accent/20 selection:text-accent">
      <a
        href="#courses"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]
                   focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-white focus:font-bold"
      >
        Skip to courses
      </a>

      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero with interactive 3D WebGL scene */}
        <Hero />

        {/* 2. Credibility / trust strip */}
        <TrustStrip />

        {/* 3. Course catalog with 3D depth cards */}
        <CourseSection />

        {/* 4. Why learn with us */}
        <WhyChooseUs />

        {/* 5. Free 3-day live demo with 3D holographic scene */}
        <DemoSection />

        {/* 6. Learning experience ecosystem */}
        <LearningExperience />

        {/* 7. Scroll-driven 3D learning journey */}
        <HowItWorks />

        {/* 8. Verified industry instructors */}
        <InstructorSection />

        {/* 9. Testimonials carousel */}
        <Testimonials />

        {/* 10. FAQ accordion */}
        <FAQSection />

        {/* 11. Final CTA */}
        <FinalCTA />
      </main>

      <Footer />

      {/* Global overlays */}
      <CourseDetailModal />
      <EnrollmentModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </ThemeProvider>
  );
}
