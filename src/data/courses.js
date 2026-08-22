/**
 * Comprehensive Course Catalog Configuration.
 * Fully configurable: Add, edit, or remove courses here.
 */
export const courses = [
  {
    id: "full-stack-web-dev",
    title: "Full Stack Web Development (MERN & Next.js)",
    category: "Web Development",
    badge: "Most Popular",
    shortDescription: "Master modern full-stack development from frontend UI architecture to scalable backend microservices.",
    description: "Designed and delivered by senior software engineers with 14+ years of industry experience. Build production-grade full stack applications using React, Next.js, Node.js, PostgreSQL, Docker, and AWS deployment.",
    level: "Beginner to Advanced",
    duration: "16 Weeks • 120+ Hours",
    mode: "Live Classes + Recorded Access",
    instructorId: "inst-1",
    rating: 4.95,
    studentsCount: "3,400+",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    technologies: ["React 18", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS", "Redis"],
    curriculum: [
      {
        week: "Weeks 1-4",
        title: "Modern JavaScript, React 18 & State Architecture",
        topics: ["ESNext, Async/Await & Event Loop", "React Hooks & Custom Hooks Lifecycle", "Tailwind CSS & Component Systems", "Zustand & Redux Toolkit State Management"]
      },
      {
        week: "Weeks 5-8",
        title: "Full Stack Next.js App Router & Server Actions",
        topics: ["Next.js Server vs Client Components", "API Routes & Server Actions", "Auth.js & Role-Based Access Control", "Optimistic UI Updates & Streaming SSR"]
      },
      {
        week: "Weeks 9-12",
        title: "Backend Microservices, Databases & Security",
        topics: ["Node.js / Express Architecture", "PostgreSQL & Prisma ORM Modeling", "Redis Caching & Rate Limiting", "JWT, OAuth2 & Data Sanitization"]
      },
      {
        week: "Weeks 13-16",
        title: "DevOps, CI/CD & Production Capstone",
        topics: ["Docker Containerization", "GitHub Actions CI/CD Pipeline", "AWS ECS / Vercel Deployments", "Live Architecture Code Review & Mock Interviews"]
      }
    ],
    projects: [
      "Multi-tenant SaaS Workspace with Stripe Billing & Webhooks",
      "Real-time Collaborative Whiteboard with WebSockets",
      "High-throughput E-commerce Platform with Redis Queue"
    ],
    outcomes: [
      "Build & deploy enterprise-scale full stack web applications independently",
      "Architect relational databases with Prisma & PostgreSQL",
      "Confidently pass Senior Frontend & Full Stack coding interviews"
    ],
    demoIncluded: true
  },
  {
    id: "cisco-networking-security",
    title: "Cisco Enterprise Networking & Cyber Infrastructure",
    category: "Networking",
    badge: "Industry Certified",
    shortDescription: "Enterprise routing, switching, wireless security, and network automation aligned with CCNP/CCIE standards.",
    description: "Taught by a Cisco-certified Network Architect with 15+ years of datacenter infrastructure experience. Hands-on packet tracer labs, BGP, OSPF, SD-WAN, and Python network automation.",
    level: "Intermediate to Pro",
    duration: "14 Weeks • 100+ Hours",
    mode: "Live Hands-on Labs + Recorded Sessions",
    instructorId: "inst-2",
    rating: 4.92,
    studentsCount: "2,100+",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80",
    technologies: ["Cisco IOS-XE", "BGP / OSPF", "SD-WAN", "Python Netmiko", "Wireshark", "Ansible", "VPN IPsec"],
    curriculum: [
      {
        week: "Weeks 1-3",
        title: "Advanced IP Routing & High Availability",
        topics: ["Enterprise OSPF Multi-Area Design", "BGP Path Selection & Route Filtering", "FHRP Protocols (HSRP/VRRP)", "IPv6 Migration & Dual-Stack"]
      },
      {
        week: "Weeks 4-7",
        title: "Enterprise Switching & Campus Design",
        topics: ["Spanning Tree Protocols (RSTP/MST)", "VLAN Trunks, VTP & QinQ", "EtherChannel & LACP Configurations", "Cisco Catalyst 9000 Architecture"]
      },
      {
        week: "Weeks 8-11",
        title: "Network Security, VPNs & SD-WAN",
        topics: ["Site-to-Site & DMVPN IPsec Tunnels", "802.1X Network Access Control", "Cisco SD-WAN Controller Architecture", "Threat Mitigation & ACLs"]
      },
      {
        week: "Weeks 12-14",
        title: "Network Programmability & Automation",
        topics: ["REST APIs & JSON/YANG Data Models", "Python Automation with Netmiko/NAPALM", "Ansible Playbooks for Switch Provisioning", "Lab Simulation Final Project"]
      }
    ],
    projects: [
      "Enterprise Multi-site SD-WAN & BGP Data Center Interconnect",
      "Automated Configuration Backup & Compliance Bot via Python",
      "High-Availability Secure Campus LAN with Zero Trust 802.1X"
    ],
    outcomes: [
      "Design and troubleshoot Tier-3 enterprise enterprise networks",
      "Master network automation using Python and Ansible",
      "Prepare thoroughly for Cisco CCNP Enterprise certification exams"
    ],
    demoIncluded: true
  },
  {
    id: "azure-cloud-devops",
    title: "Microsoft Azure Cloud Architect & DevOps Engineering",
    category: "Cloud",
    badge: "High Demand",
    shortDescription: "Master Azure cloud solutions, Kubernetes clusters, Terraform infrastructure-as-code, and Azure DevOps CI/CD.",
    description: "Learn directly from a Microsoft-experienced Solutions Architect with 13+ years in cloud computing. Practical real-world cloud migrations, ARM/Bicep templates, AKS clusters, and hybrid networking.",
    level: "Intermediate to Advanced",
    duration: "14 Weeks • 110+ Hours",
    mode: "Live Interactive + Cloud Lab Access",
    instructorId: "inst-3",
    rating: 4.96,
    studentsCount: "2,800+",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    technologies: ["Azure Cloud", "Terraform", "Kubernetes (AKS)", "Azure DevOps", "Docker", "Bicep", "Prometheus", "Helm"],
    curriculum: [
      {
        week: "Weeks 1-4",
        title: "Azure Core Infrastructure & Networking",
        topics: ["Virtual Networks, Subnets & Peering", "Azure Load Balancers & Application Gateways", "Virtual Machine Scale Sets & Storage Accounts", "Azure Active Directory / Entra ID Governance"]
      },
      {
        week: "Weeks 5-8",
        title: "Infrastructure as Code with Terraform & Bicep",
        topics: ["Terraform State Management & Modules", "Automated Multi-environment Provisioning", "Azure Resource Manager (ARM) & Bicep", "Security Compliance Policies & Cost Guardrails"]
      },
      {
        week: "Weeks 9-11",
        title: "Azure Kubernetes Service (AKS) & Container Workloads",
        topics: ["Docker Image Optimization & ACR", "AKS Cluster Deployment & Ingress Controllers", "Helm Charts & GitOps with ArgoCD", "Monitoring with Azure Monitor & Prometheus"]
      },
      {
        week: "Weeks 12-14",
        title: "Azure DevOps CI/CD & Cloud Migration Capstone",
        topics: ["YAML Pipelines for Multi-stage Releases", "Zero-downtime Blue/Green & Canary Deployments", "On-premise to Cloud Migration Strategy", "Architecture Review & Disaster Recovery"]
      }
    ],
    projects: [
      "End-to-end Automated AKS Microservice Platform via Terraform",
      "Multi-region Disaster Recovery & Failover Pipeline in Azure",
      "Enterprise CI/CD Governance Pipeline with Automated Security Scanning"
    ],
    outcomes: [
      "Architect resilient, fault-tolerant Azure cloud environments",
      "Deploy and manage containerized microservices in Kubernetes",
      "Achieve deep preparation for AZ-104 and AZ-305 Architect certifications"
    ],
    demoIncluded: true
  },
  {
    id: "python-data-engineering",
    title: "Python Data Engineering & Distributed Systems",
    category: "Data / AI",
    badge: "Career Track",
    shortDescription: "Build high-speed data pipelines with Apache Spark, Kafka, Python, Airflow, and Snowflake datalakes.",
    description: "Learn modern big data architectures from an MNC Principal Data Engineer with 12+ years of experience in distributed stream processing, batch pipelines, and analytics engineering.",
    level: "Beginner to Advanced",
    duration: "14 Weeks • 105+ Hours",
    mode: "Live Practical + Cloud Datalake Labs",
    instructorId: "inst-4",
    rating: 4.88,
    studentsCount: "1,950+",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    technologies: ["Python 3.12", "Apache Spark", "Apache Kafka", "Apache Airflow", "Snowflake", "dbt", "PostgreSQL", "Pandas"],
    curriculum: [
      {
        week: "Weeks 1-3",
        title: "Advanced Python for Data & OOP Patterns",
        topics: ["Generators, Decorators & Multiprocessing", "Vectorized Computing with NumPy & Pandas", "SQL Mastery: Window Functions & Query Plan Analysis", "Data Modeling: Star Schema vs Data Vault 2.0"]
      },
      {
        week: "Weeks 4-7",
        title: "Distributed Data Processing with Apache Spark",
        topics: ["PySpark RDDs, DataFrames & Catalyst Optimizer", "Handling Data Skew & Partitioning Strategies", "Spark Streaming with Delta Lake Lakehouse", "Performance Tuning & Memory Management"]
      },
      {
        week: "Weeks 8-11",
        title: "Real-time Streaming with Kafka & Orchestration with Airflow",
        topics: ["Kafka Producers, Consumers & Consumer Groups", "Schema Registry & Avro Serialization", "Building DAGs & Custom Operators in Airflow", "Data Quality Testing with Great Expectations & dbt"]
      },
      {
        week: "Weeks 12-14",
        title: "Cloud Datalake with Snowflake & Capstone",
        topics: ["Snowflake Virtual Warehouses & Snowpipe", "End-to-end Lakehouse Architecture", "Production Pipeline Monitoring & Alerting", "Live Capstone Defense & Mock Interviews"]
      }
    ],
    projects: [
      "Real-time Financial Fraud Detection Pipeline using Kafka & Spark",
      "Automated E-commerce ELT Data Warehouse using dbt & Snowflake",
      "Airflow Automated Multi-source Weather & Sensor Ingestion Lakehouse"
    ],
    outcomes: [
      "Design end-to-end distributed data pipelines processing millions of events",
      "Master Apache Spark, Kafka, and Apache Airflow orchestration",
      "Transition into high-paying Data Engineer and Big Data roles"
    ],
    demoIncluded: true
  },
  {
    id: "ai-machine-learning",
    title: "Applied AI, LLMs & Machine Learning Engineering",
    category: "Data / AI",
    badge: "Trending",
    shortDescription: "Build and deploy generative AI agents, RAG pipelines, fine-tuned LLMs, and PyTorch deep learning models.",
    description: "Deep dive into Applied AI from fundamentals of Machine Learning to Generative AI architectures, LangChain, Vector Databases (Pinecone/Chroma), and production model inference servers.",
    level: "Intermediate to Advanced",
    duration: "16 Weeks • 125+ Hours",
    mode: "Live Coding + GPU Cloud Environments",
    instructorId: "inst-1",
    rating: 4.98,
    studentsCount: "3,100+",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
    technologies: ["PyTorch", "LangChain", "OpenAI / Llama 3", "Vector DBs", "FastAPI", "HuggingFace", "Docker", "MLflow"],
    curriculum: [
      {
        week: "Weeks 1-4",
        title: "Machine Learning Foundations & Supervised Models",
        topics: ["Feature Engineering & Exploratory Analysis", "Regression, Decision Trees & Random Forests", "Gradient Boosting (XGBoost & LightGBM)", "Hyperparameter Optimization with Optuna"]
      },
      {
        week: "Weeks 5-8",
        title: "Deep Learning & Computer Vision / NLP with PyTorch",
        topics: ["Neural Networks, Backpropagation & Optimizers", "CNNs & Vision Transformers", "RNNs, Transformers & Attention Mechanism", "Model Evaluation & Loss Function Design"]
      },
      {
        week: "Weeks 9-12",
        title: "Generative AI, LLMs & Retrieval-Augmented Generation (RAG)",
        topics: ["OpenAI API & Local Open-Source LLMs (Llama 3)", "LangChain & LlamaIndex Frameworks", "Vector Embeddings & Semantic Search (Pinecone/Qdrant)", "Advanced RAG: HyDE, Re-ranking & Context Compression"]
      },
      {
        week: "Weeks 13-16",
        title: "AI Agents, Model Deployment & MLOps",
        topics: ["Autonomous Multi-Agent Systems (CrewAI)", "Serving Models with FastAPI & Triton", "Quantization (LoRA / QLoRA Fine-tuning)", "Production MLOps Pipeline Capstone"]
      }
    ],
    projects: [
      "Enterprise Multi-modal RAG Assistant for Legal & Technical Docs",
      "Autonomous Market Research AI Agent Swarm with Tool Calling",
      "Fine-tuned Domain-Specific LLM on Specialized Customer Data"
    ],
    outcomes: [
      "Build commercial GenAI applications, autonomous agents, and RAG systems",
      "Fine-tune and deploy open-source LLMs in cloud production",
      "Bridge the gap between theoretical AI research and production AI engineering"
    ],
    demoIncluded: true
  },
  {
    id: "cyber-security-defense",
    title: "Cyber Security Defense & Ethical Penetration Testing",
    category: "Security",
    badge: "Essential Track",
    shortDescription: "Hands-on vulnerability assessment, penetration testing, SIEM SOC operations, and enterprise defense.",
    description: "Taught by a senior enterprise security consultant with 14+ years in cyber defense and penetration testing. Live labs covering web application security, Active Directory attacks, and threat hunting.",
    level: "Beginner to Advanced",
    duration: "14 Weeks • 95+ Hours",
    mode: "Live Virtual Cyber Labs + Mentorship",
    instructorId: "inst-2",
    rating: 4.91,
    studentsCount: "1,800+",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    technologies: ["Kali Linux", "Burp Suite Pro", "Wireshark", "Metasploit", "Splunk SIEM", "Active Directory", "Python"],
    curriculum: [
      {
        week: "Weeks 1-4",
        title: "Network Security & Cyber Reconnaissance",
        topics: ["TCP/IP Protocol Attacks & Wireshark Analysis", "OSINT & Active/Passive Reconnaissance", "Nmap Port Scanning & Vulnerability Mapping", "Firewalls, IDS/IPS Configuration & Bypass"]
      },
      {
        week: "Weeks 5-8",
        title: "Web Application Penetration Testing (OWASP Top 10)",
        topics: ["SQL Injection & Cross-Site Scripting (XSS)", "Authentication & Session Management Flaws", "CSRF, SSRF & IDOR Vulnerability Exploitation", "API Security Testing with Burp Suite Pro"]
      },
      {
        week: "Weeks 9-11",
        title: "Enterprise Active Directory & Network Exploitation",
        topics: ["Kerberoasting & AS-REP Roasting", "Pass-the-Hash & Lateral Movement Techniques", "Privilege Escalation in Windows & Linux", "Defensive Hardening & Group Policy Objects"]
      },
      {
        week: "Weeks 12-14",
        title: "SOC Operations, SIEM Threat Hunting & Incident Response",
        topics: ["Splunk SIEM Log Analysis & Detection Rules", "MITRE ATT&CK Framework Mapping", "Incident Response Playbooks & Forensics", "Simulated Red Team vs Blue Team CTF"]
      }
    ],
    projects: [
      "Complete Vulnerability Assessment & Penetration Test of a FinTech App",
      "Active Directory Domain Compromise & Hardening Blueprint",
      "Custom SIEM Alerting System with Splunk for Ransomware Detection"
    ],
    outcomes: [
      "Conduct professional penetration tests and write executive audit reports",
      "Detect, investigate, and remediate advanced persistent cyber threats",
      "Prepare for CEH, OSCP, and CompTIA Security+ certifications"
    ],
    demoIncluded: true
  }
];

export const courseCategories = [
  "All Courses",
  "Web Development",
  "Cloud",
  "Networking",
  "Data / AI",
  "Security"
];
