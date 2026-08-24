/**
 * Site-wide configuration and brand details.
 * Modify these settings to rebrand or customize the entire platform without touching components.
 */
export const siteConfig = {
  brand: {
    name: "TechFromTECHIE",
    tagline: "From Learning to Leading",
    subTagline: "Build Skills. Build Projects. Become Industry Ready.",
    badge: "Industry-Oriented Training Academy",
    demoBadge: "Free One-to-One Demo",
  },
  navigation: [
    { name: "Home", href: "#hero" },
    { name: "Courses", href: "#courses" },
    { name: "Instructors", href: "#instructors" },
    { name: "Why Us", href: "#why-us" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Demo", href: "#demo" },
    { name: "FAQ", href: "#faq" },
  ],
  trustStats: [
    {
      value: "12+",
      label: "Years Industry Experience",
      subtext: "Seasoned technology professionals",
      icon: "ShieldCheck",
    },
    {
      value: "100%",
      label: "Live Interactive Classes",
      subtext: "Real-time doubt solving & mentorship",
      icon: "Video",
    },
    {
      value: "8+",
      label: "Career-Focused Programs",
      subtext: "Java, AI, Full Stack, Cloud & more",
      icon: "FolderGit2",
    },
    {
      value: "Free",
      label: "One-to-One Demo",
      subtext: "Experience before you commit",
      icon: "Sparkles",
    },
  ],
  heroProof: {
    studentCount: "Growing Community",
    rating: "Industry Mentored",
    ratingText: "by senior technology professionals",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    ],
  },
  demoPerks: [
    "Meet an industry mentor one-to-one",
    "Understand the course and curriculum in detail",
    "Explore practical projects and real-world applications",
    "Experience a live coding demonstration",
    "Discuss your career goals and technology path",
    "Choose the right program for your journey",
  ],
  contact: {
    email: "info@techfromtechie.com",
    supportEmail: "info@techfromtechie.com",
    phone: "+91-8121240941",
    whatsapp: "+91-8121240941",
    location: "262, Shree Nagar Extension, Indore, Madhya Pradesh",
    hours: "Mon - Sat: 9:00 AM - 8:00 PM IST",
  },
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/techfromtechie", icon: "Instagram" },
    { name: "Facebook", href: "https://www.facebook.com/techfromtechie", icon: "Facebook" },
    { name: "LinkedIn", href: "#", icon: "Linkedin" },
    { name: "YouTube", href: "#", icon: "Youtube" },
  ],
  footerLinks: {
    courses: [
      { name: "Corporate Elite Technology Program", href: "#courses" },
      { name: "Advanced Java & Spring Boot", href: "#courses" },
      { name: "Enterprise Full Stack Engineering", href: "#courses" },
      { name: "Generative AI & AI Engineering", href: "#courses" },
      { name: "Python, AI & Machine Learning", href: "#courses" },
      { name: "Cloud & DevOps Professional", href: "#courses" },
    ],
    company: [
      { name: "About TechFromTECHIE", href: "#why-us" },
      { name: "Our Instructors", href: "#instructors" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Student Stories", href: "#testimonials" },
    ],
    support: [
      { name: "Book Free Demo", href: "#demo" },
      { name: "Frequently Asked Questions", href: "#faq" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Contact Support", href: "#contact" },
    ]
  }
};
