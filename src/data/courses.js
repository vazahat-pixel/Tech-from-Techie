/**
 * Comprehensive Course Catalog Configuration.
 * All 8 courses from TechFromTECHIE's official course offerings.
 */
export const courses = [
  {
    id: "corporate-elite",
    title: "Corporate Elite Technology Program",
    category: "Technology",
    badge: "Flagship",
    shortDescription: "Our flagship career-focused program combining technology learning, projects, mentorship, and career preparation.",
    description: "A comprehensive career-oriented program designed to make you industry-ready. Combines structured learning across multiple technology tracks with hands-on projects, industry mentorship, and career preparation.",
    level: "Beginner to Advanced",
    duration: "Customized by Track",
    mode: "Offline & Online",
    instructorId: "inst-1",
    rating: 4.9,
    studentsCount: "Growing",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
    technologies: ["Generative AI", "Full Stack", "Python AI/ML", "Cloud & DevOps", "Communication"],
    curriculum: [
      {
        week: "Track 1",
        title: "Generative AI Engineering",
        topics: ["LLMs & Prompt Engineering", "AI Agents & Agentic AI", "RAG & Vector Databases", "AI Application Development"]
      },
      {
        week: "Track 2",
        title: "Enterprise Full Stack Engineering",
        topics: ["Frontend & Backend Development", "REST APIs & Databases", "Authentication & Security", "Docker & Deployment"]
      },
      {
        week: "Track 3",
        title: "Python AI/ML",
        topics: ["Python & OOP Fundamentals", "Data Analysis & Visualization", "Machine Learning & Deep Learning", "Model Evaluation & Feature Engineering"]
      },
      {
        week: "Track 4",
        title: "Cloud & DevOps + Communication Skills",
        topics: ["Docker, Kubernetes & CI/CD", "AWS/Azure & Monitoring", "Professional Communication", "Interview & Presentation Skills"]
      }
    ],
    projects: [
      "Build real-world projects across your chosen technology track",
      "Portfolio development with industry-standard practices",
      "Capstone project with mentor code review"
    ],
    outcomes: [
      "Become industry-ready across your chosen technology specialization",
      "Build a professional portfolio with real-world projects",
      "Receive career guidance, mock interviews, and mentorship"
    ],
    demoIncluded: true
  },
  {
    id: "advanced-java-spring",
    title: "Advanced Java, Spring Boot, Microservices & Spring AI",
    category: "Technology",
    badge: "Enterprise Grade",
    shortDescription: "Build enterprise-ready backend and AI applications using modern Java and Spring technologies.",
    description: "Master the Java ecosystem from core fundamentals to advanced Spring Boot, Microservices architecture, and cutting-edge Spring AI integration with LLMs. Designed for building production-grade enterprise applications.",
    level: "Intermediate to Advanced",
    duration: "To be finalized",
    mode: "Offline & Online",
    instructorId: "inst-1",
    rating: 4.9,
    studentsCount: "Growing",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    technologies: ["Core Java", "Spring Boot", "Microservices", "Kafka", "Docker", "Spring AI", "REST APIs"],
    curriculum: [
      {
        week: "Module 1",
        title: "Core & Advanced Java Foundations",
        topics: ["Core Java & OOP Principles", "Java 8+ Features & Streams", "Collections Framework Deep Dive", "Multithreading & Concurrency"]
      },
      {
        week: "Module 2",
        title: "Spring Boot & REST API Development",
        topics: ["Spring Boot Architecture", "Building REST APIs", "JPA/Hibernate & Database Integration", "Spring Security & Authentication"]
      },
      {
        week: "Module 3",
        title: "Microservices Architecture",
        topics: ["Microservices Design Patterns", "Apache Kafka Integration", "Docker Containerization", "Service Communication & Discovery"]
      },
      {
        week: "Module 4",
        title: "Spring AI & LLM Integration",
        topics: ["Spring AI Framework", "LLM Integration Patterns", "Building AI-Powered Applications", "Production Deployment Strategies"]
      }
    ],
    projects: [
      "Enterprise microservices application with Spring Boot",
      "AI-powered application using Spring AI and LLMs",
      "Full production deployment with Docker and Kafka"
    ],
    outcomes: [
      "Build enterprise-ready Java backend applications",
      "Design and implement microservices architectures",
      "Integrate AI capabilities into Spring applications"
    ],
    demoIncluded: true
  },
  {
    id: "full-stack-engineering",
    title: "Enterprise Full Stack Engineering",
    category: "Technology",
    badge: "Most Popular",
    shortDescription: "Learn to design and build complete web applications from frontend to backend, database, security, testing, and deployment.",
    description: "Comprehensive full stack development covering multiple technology paths — Java Full Stack, Python Full Stack, MERN, and MEAN. From HTML to deployment, build production-ready applications end to end.",
    level: "Beginner to Advanced",
    duration: "To be finalized",
    mode: "Offline & Online",
    instructorId: "inst-1",
    rating: 4.9,
    studentsCount: "Growing",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
    technologies: ["HTML/CSS", "JavaScript", "React/Angular", "Node.js", "SQL/NoSQL", "Docker", "Git"],
    curriculum: [
      {
        week: "Module 1",
        title: "Frontend Foundations",
        topics: ["HTML, CSS & JavaScript", "TypeScript Fundamentals", "React or Angular Framework", "Responsive Design & UI Architecture"]
      },
      {
        week: "Module 2",
        title: "Backend Development",
        topics: ["Backend with Java/Python/Node.js", "REST API Design & Implementation", "SQL & NoSQL Databases", "Authentication & Security"]
      },
      {
        week: "Module 3",
        title: "DevOps & Deployment",
        topics: ["Git & GitHub Workflows", "Testing & Quality Assurance", "Docker Containerization", "Cloud Deployment"]
      },
      {
        week: "Module 4",
        title: "Advanced Full Stack & AI Integration",
        topics: ["Full Stack Architecture Patterns", "AI Integration in Web Apps", "Performance Optimization", "Production-Ready Applications"]
      }
    ],
    projects: [
      "Full stack web application with authentication and database",
      "REST API-driven application with modern frontend",
      "Deployed production application with CI/CD pipeline"
    ],
    outcomes: [
      "Design and build complete web applications end to end",
      "Master frontend, backend, database, and deployment",
      "Choose and excel in your preferred technology stack"
    ],
    demoIncluded: true
  },
  {
    id: "generative-ai",
    title: "Generative AI & AI Engineering",
    category: "AI & Data",
    badge: "Trending",
    shortDescription: "Learn to build practical AI applications using modern LLM technologies and AI workflows.",
    description: "Master the full spectrum of Generative AI — from prompt engineering to building autonomous AI agents. Learn LLM APIs, embeddings, vector databases, RAG pipelines, function calling, and agentic AI application development.",
    level: "Beginner to Advanced",
    duration: "To be finalized",
    mode: "Offline & Online",
    instructorId: "inst-1",
    rating: 4.9,
    studentsCount: "Growing",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
    technologies: ["Generative AI", "LLMs", "Prompt Engineering", "RAG", "Vector DBs", "AI Agents", "Agentic AI"],
    curriculum: [
      {
        week: "Module 1",
        title: "Generative AI & LLM Foundations",
        topics: ["Understanding Generative AI", "Large Language Models (LLMs)", "Prompt Engineering Techniques", "LLM APIs & Integration"]
      },
      {
        week: "Module 2",
        title: "Embeddings & Retrieval Systems",
        topics: ["Text Embeddings & Vector Representations", "Vector Databases", "Retrieval-Augmented Generation (RAG)", "Semantic Search & Similarity"]
      },
      {
        week: "Module 3",
        title: "AI Workflows & Function Calling",
        topics: ["Function Calling Patterns", "AI Workflow Design", "Chaining & Orchestration", "Building AI Applications"]
      },
      {
        week: "Module 4",
        title: "AI Agents & Agentic AI",
        topics: ["AI Agent Architecture", "Autonomous Agent Systems", "Agentic AI Patterns", "Production AI Application Development"]
      }
    ],
    projects: [
      "Build a RAG-powered knowledge assistant",
      "Create an autonomous AI agent with tool calling",
      "Develop an AI-powered application for real-world use"
    ],
    outcomes: [
      "Build practical AI applications using modern LLM technologies",
      "Design and implement RAG pipelines and AI agents",
      "Develop production-ready agentic AI systems"
    ],
    demoIncluded: true
  },
  {
    id: "python-ai-ml",
    title: "Python, AI & Machine Learning",
    category: "AI & Data",
    badge: "Career Track",
    shortDescription: "Build strong foundations in Python, data analysis, machine learning, and AI application development.",
    description: "From Python fundamentals to advanced machine learning — master data analysis, visualization, statistical modeling, and deep learning. Build real ML models for regression, classification, and clustering.",
    level: "Beginner to Advanced",
    duration: "To be finalized",
    mode: "Offline & Online",
    instructorId: "inst-1",
    rating: 4.9,
    studentsCount: "Growing",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    technologies: ["Python", "NumPy", "Pandas", "Machine Learning", "Deep Learning", "Data Visualization"],
    curriculum: [
      {
        week: "Module 1",
        title: "Python & Data Foundations",
        topics: ["Python Programming & OOP", "NumPy & Pandas", "Data Cleaning & Preparation", "Data Analysis Techniques"]
      },
      {
        week: "Module 2",
        title: "Data Visualization & Statistics",
        topics: ["Data Visualization Libraries", "Statistical Foundations", "Exploratory Data Analysis", "Feature Engineering"]
      },
      {
        week: "Module 3",
        title: "Machine Learning",
        topics: ["Regression & Classification", "Clustering Algorithms", "Model Evaluation & Tuning", "Ensemble Methods"]
      },
      {
        week: "Module 4",
        title: "Deep Learning & Advanced ML",
        topics: ["Neural Network Foundations", "Deep Learning Architectures", "Advanced Model Techniques", "Production ML Pipelines"]
      }
    ],
    projects: [
      "End-to-end data analysis and visualization project",
      "Machine learning model for real-world prediction",
      "Deep learning application with production deployment"
    ],
    outcomes: [
      "Master Python for data science and AI applications",
      "Build and evaluate machine learning models",
      "Develop end-to-end AI/ML solutions"
    ],
    demoIncluded: true
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Professional",
    category: "Technology",
    badge: "High Demand",
    shortDescription: "Learn how modern applications are developed, deployed, automated, and operated in production.",
    description: "From Linux fundamentals to Kubernetes orchestration — master the complete DevOps lifecycle including Docker, CI/CD pipelines, cloud platforms, monitoring, and production deployment practices.",
    level: "Intermediate to Advanced",
    duration: "To be finalized",
    mode: "Offline & Online",
    instructorId: "inst-2",
    rating: 4.9,
    studentsCount: "Growing",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    technologies: ["Linux", "Docker", "Kubernetes", "CI/CD", "AWS/Azure", "Jenkins", "GitHub Actions"],
    curriculum: [
      {
        week: "Module 1",
        title: "Linux, Networking & Version Control",
        topics: ["Linux Fundamentals & Administration", "Networking Concepts", "Git & GitHub Workflows", "Shell Scripting"]
      },
      {
        week: "Module 2",
        title: "Containerization & Orchestration",
        topics: ["Docker Containerization", "Kubernetes Architecture", "Container Orchestration", "Helm & Package Management"]
      },
      {
        week: "Module 3",
        title: "CI/CD & Automation",
        topics: ["Jenkins Pipeline Setup", "GitHub Actions Workflows", "Automated Testing & Deployment", "Infrastructure as Code"]
      },
      {
        week: "Module 4",
        title: "Cloud Platforms & Monitoring",
        topics: ["AWS/Azure Cloud Services", "Cloud Deployment Strategies", "Monitoring & Observability", "DevOps Best Practices"]
      }
    ],
    projects: [
      "Automated CI/CD pipeline with Docker and Kubernetes",
      "Cloud-deployed application with monitoring",
      "Infrastructure automation with modern DevOps tools"
    ],
    outcomes: [
      "Master containerization and cloud deployment",
      "Design and implement CI/CD pipelines",
      "Operate production-grade cloud infrastructure"
    ],
    demoIncluded: true
  },
  {
    id: "campus-placement",
    title: "Campus Placement Training",
    category: "Career",
    badge: "Essential",
    shortDescription: "Prepare for technical and non-technical stages of the campus placement journey.",
    description: "Comprehensive placement preparation covering programming, DSA, aptitude, logical reasoning, technical and HR interviews, mock interviews, resume building, and career guidance — everything you need to crack campus placements.",
    level: "Beginner to Advanced",
    duration: "To be finalized",
    mode: "Offline & Online",
    instructorId: "inst-2",
    rating: 4.9,
    studentsCount: "Growing",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    technologies: ["Programming", "DSA", "SQL", "Aptitude", "Interview Prep", "Resume Building"],
    curriculum: [
      {
        week: "Module 1",
        title: "Programming & DSA Foundations",
        topics: ["Programming Fundamentals", "Data Structures & Algorithms", "OOP Concepts", "SQL & Database Queries"]
      },
      {
        week: "Module 2",
        title: "Coding Practice & Problem Solving",
        topics: ["Competitive Coding Practice", "Pattern Recognition", "Time & Space Complexity", "Problem-Solving Strategies"]
      },
      {
        week: "Module 3",
        title: "Aptitude & Reasoning",
        topics: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation"]
      },
      {
        week: "Module 4",
        title: "Interview Preparation & Career Guidance",
        topics: ["Technical Interview Prep", "HR Interview Techniques", "Mock Interview Sessions", "Resume Building & Career Guidance"]
      }
    ],
    projects: [
      "Build a strong coding portfolio on platforms",
      "Resume optimization and LinkedIn profile setup",
      "Complete mock interview series with feedback"
    ],
    outcomes: [
      "Crack technical and HR rounds of campus placements",
      "Build a professional resume and online presence",
      "Develop strong problem-solving and communication skills"
    ],
    demoIncluded: true
  },
  {
    id: "communication-skills",
    title: "Communication Skills & Personality Development",
    category: "Career",
    badge: "Professional Growth",
    shortDescription: "Develop professional communication, confidence, interview skills, and workplace readiness.",
    description: "Build the soft skills that set you apart — spoken English, professional communication, presentation skills, group discussions, interview communication, and personality development for workplace success.",
    level: "Beginner to Advanced",
    duration: "To be finalized",
    mode: "Offline & Online",
    instructorId: "inst-2",
    rating: 4.9,
    studentsCount: "Growing",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    technologies: ["Spoken English", "Presentation Skills", "Interview Skills", "Group Discussion", "Confidence"],
    curriculum: [
      {
        week: "Module 1",
        title: "Spoken English & Communication",
        topics: ["Spoken English Fundamentals", "Professional Communication", "Active Listening Skills", "Workplace Etiquette"]
      },
      {
        week: "Module 2",
        title: "Interview & Presentation Skills",
        topics: ["Interview Communication", "Presentation Techniques", "Storytelling & Persuasion", "Body Language & Confidence"]
      },
      {
        week: "Module 3",
        title: "Group Discussions & Team Skills",
        topics: ["Group Discussion Strategies", "Team Collaboration", "Conflict Resolution", "Leadership Communication"]
      },
      {
        week: "Module 4",
        title: "Personality Development",
        topics: ["Confidence Building", "Personal Branding", "Professional Networking", "Continuous Self-Improvement"]
      }
    ],
    projects: [
      "Deliver a professional presentation with feedback",
      "Participate in simulated group discussions",
      "Complete a mock interview series"
    ],
    outcomes: [
      "Communicate professionally in workplace settings",
      "Present ideas with confidence and clarity",
      "Excel in interviews and group discussions"
    ],
    demoIncluded: true
  }
];

export const courseCategories = [
  "All Courses",
  "Technology",
  "AI & Data",
  "Career"
];
