/**
 * Site-wide configuration and brand details.
 * Modify these settings to rebrand or customize the entire platform without touching components.
 */
export const siteConfig = {
  brand: {
    name: "LearnPro",
    tagline: "Learn From Industry Experts. Build Your Future.",
    subTagline: "Master in-demand skills with experienced professionals from Microsoft, Cisco, and leading MNCs.",
    badge: "Learn From Industry Experts",
    demoBadge: "Free 3-Day Live Demo",
  },
  navigation: [
    { name: "Home", href: "#hero" },
    { name: "Courses", href: "#courses" },
    { name: "Instructors", href: "#instructors" },
    { name: "Why Us", href: "#why-us" },
    { name: "Learning", href: "#learning" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ],
  trustStats: [
    {
      value: "12-15+",
      label: "Years Experience",
      subtext: "Microsoft, Cisco & MNC Mentors",
      icon: "ShieldCheck",
    },
    {
      value: "100%",
      label: "Live Interactive Classes",
      subtext: "Direct real-time doubt solving",
      icon: "Video",
    },
    {
      value: "25+",
      label: "Industry Projects",
      subtext: "Enterprise-grade portfolio",
      icon: "FolderGit2",
    },
    {
      value: "3 Days",
      label: "Free Trial Demo",
      subtext: "Zero commitment required",
      icon: "Sparkles",
    },
  ],
  heroProof: {
    studentCount: "10,000+",
    rating: "4.9/5",
    ratingText: "from 2,500+ student reviews",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    ],
  },
  demoPerks: [
    "3 Days Full Live Class Access with Lead Instructor",
    "Interactive Q&A and Real-time Doubt Clearing",
    "Hands-on Code & Architecture Walkthrough",
    "Curriculum Roadmap & Career Guidance Session",
    "No Credit Card Required • Instant Confirmation",
  ],
  contact: {
    email: "admissions@learnpro.edu",
    supportEmail: "support@learnpro.edu",
    phone: "+1 (800) 555-0199",
    whatsapp: "+1 (800) 555-0199",
    location: "Tech Innovation Hub, Silicon Valley, CA",
    hours: "Mon - Sat: 9:00 AM - 8:00 PM EST",
  },
  socials: [
    { name: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { name: "YouTube", href: "https://youtube.com", icon: "Youtube" },
    { name: "GitHub", href: "https://github.com", icon: "Github" },
    { name: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  ],
  footerLinks: {
    courses: [
      { name: "Full Stack Web Development", href: "#courses" },
      { name: "Python & Data Engineering", href: "#courses" },
      { name: "AWS Cloud Practitioner", href: "#courses" },
      { name: "Cisco Networking & Security", href: "#courses" },
      { name: "Microsoft Azure Architect", href: "#courses" },
      { name: "AI & Machine Learning", href: "#courses" },
    ],
    company: [
      { name: "About LearnPro", href: "#why-us" },
      { name: "Our Instructors", href: "#instructors" },
      { name: "Learning Methodology", href: "#learning" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Student Stories", href: "#testimonials" },
    ],
    support: [
      { name: "Book Free 3-Day Demo", href: "#demo" },
      { name: "Frequently Asked Questions", href: "#faq" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Contact Support", href: "#contact" },
    ]
  }
};
