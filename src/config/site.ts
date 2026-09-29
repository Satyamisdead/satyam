export const siteConfig = {
  name: "Satyam Tiwari",
  title: "Satyam Tiwari | Full Stack Developer, Mobile App Developer & Cyber Security Consultant",
  author: "Satyam Tiwari",
  description: "Satyam Tiwari is a Full Stack Developer and Cyber Security Consultant from Mumbai, India. Explore premium mobile apps, modern websites, React Native projects, Next.js applications, cybersecurity services, and real-world products like StockDox, Curbi, and Flat Rate Bookkeeping.",
  keywords: [
    "Satyam Tiwari", 
    "Full Stack Developer", 
    "React Developer", 
    "React Native Developer", 
    "Next.js Developer", 
    "Mobile App Developer", 
    "Website Developer", 
    "Cyber Security Consultant", 
    "Penetration Testing", 
    "Security Audit", 
    "Android Developer", 
    "Freelancer India", 
    "Mumbai Developer", 
    "Portfolio", 
    "Golewah",
    "School Management SaaS",
    "SaaS Developer",
    "Cameroon SaaS",
    "StockDox", 
    "Curbi", 
    "Flat Rate Bookkeeping"
  ],
  url: "https://satyamtiwari.vercel.app", // Default canonical URL
  ogImage: "https://satyamtiwari.vercel.app/og-image.jpg",
  whatsappNumber: "919322336638", // Editable WhatsApp number (placeholder)
  email: "cosmosecuria@gmail.com", // Contact email placeholder
  resumeUrl: "/Satyam_Tiwari_Resume.pdf",
  
  socials: {
    linkedin: "https://linkedin.com/in/satyamtiwarime",
    github: "https://github.com/Satyamisdead",
    instagram: "https://instagram.com/satyam.unseen",
  },

  hero: {
    heading: "Building Ideas Into Reality.",
    subheading: [
      "Full Stack Developer",
      "SaaS Architect",
      "Mobile App Developer",
      "Web Developer",
      "Cyber Security Consultant"
    ],
    description: "I help startups and enterprises transform ideas into powerful, battle-tested digital products — including Multi-tenant SaaS Systems, Mobile Apps, High-scale Web Apps, and Hardened Security Solutions.",
    avatarUrl: "/satyam.jpg"
  },

  about: {
    name: "Satyam Tiwari",
    role: "Founder | Full Stack & SaaS Architect",
    experienceYears: "7+",
    description: "I specialize in building custom high-performance applications, multi-tenant SaaS platforms (like Golewah in Cameroon), securing enterprise infrastructures, and launching modern web & mobile apps. With over 7 years in the software industry, I blend full-stack engineering and cybersecurity to build scalable, beautiful products that are resilient from day one.",
    skillsList: [
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "SaaS Multi-tenancy",
      "Firebase",
      "Android",
      "Cyber Security",
      "Cloud Deployment"
    ],
    counters: [
      { value: 160, suffix: "+", label: "Projects Delivered" },
      { value: 35, suffix: "+", label: "International Clients" },
      { value: 7, suffix: "+", label: "Years Experience" }
    ]
  },

  projects: [
    {
      title: "Golewah",
      tagline: "School Management SaaS • Cameroon",
      url: "https://golewah.com",
      description: "All-in-one multi-tenant School Management SaaS engineered for educational institutions across Cameroon (Central Africa). Manages student enrollment, fee collections, real-time attendance, automated academic report cards, and role-based portals for school administrators, teachers, and parents.",
      tech: ["Next.js", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "Prisma", "SaaS"],
      status: "live",
      featured: true,
      badge: "Flagship SaaS • Cameroon"
    },
    {
      title: "StockDox",
      tagline: "FinTech & AI Market Platform",
      url: "https://stockdox.vercel.app",
      description: "Real-time US Stocks and Crypto Market platform featuring AI-powered market insights, watchlists, finance news and portfolio tracking.",
      tech: ["React", "TypeScript", "TailwindCSS", "Finnhub API", "CoinGecko API"],
      status: "live",
      featured: false,
      badge: "FinTech App"
    },
    {
      title: "Curbi",
      tagline: "Smart Parking & Geolocation Platform",
      url: "https://curbi.tech",
      description: "Smart Parking Finder helping users locate available street parking with maps, location services and navigation.",
      tech: ["Next.js", "Google Maps", "Firebase", "TailwindCSS"],
      status: "live",
      featured: false,
      badge: "GeoTech"
    },
    {
      title: "Flat Rate Bookkeeping",
      tagline: "US Accounting & Automation Platform",
      url: "https://flatratebookkeeping.us",
      description: "Professional bookkeeping platform for US businesses with modern UI, CRM integration and financial workflows.",
      tech: ["Next.js", "TailwindCSS", "React Flow", "Framer Motion"],
      status: "live",
      featured: false,
      badge: "Enterprise SaaS"
    },
    {
      title: "BigMo Classified",
      tagline: "Swipe-to-Trade Mobile Marketplace",
      url: "#",
      description: "Modern marketplace inspired by Tinder swipe experience for buying and selling. Swipe right to like, left to skip.",
      tech: ["React Native", "Expo", "Node.js", "Supabase"],
      status: "coming_soon",
      featured: false,
      badge: "Mobile App"
    }
  ],

  services: [
    {
      category: "Development",
      items: [
        { title: "Mobile App Development", desc: "Build native Android and iOS mobile applications with high-fidelity performance." },
        { title: "Android Development", desc: "High performance native Android apps using Java, Kotlin, or cross-platform architectures." },
        { title: "React Native Development", desc: "Cross-platform mobile apps for iOS & Android with a single clean codebase." },
        { title: "Website Development", desc: "Premium, responsive and SEO-friendly corporate websites and web apps." },
        { title: "Admin Panel Development", desc: "Custom back-office solutions to manage user data, operations, and analytics." },
        { title: "API Development", desc: "Secure, optimized RESTful and GraphQL backend APIs built for horizontal scaling." }
      ]
    },
    {
      category: "Security & Optimization",
      items: [
        { title: "Cyber Security Assessment", desc: "Full penetration testing services and posture reviews to discover vulnerabilities." },
        { title: "Website Security Audit", desc: "Rigorous analysis of application source code and deployment configurations." },
        { title: "Bug Hunting", desc: "Identifying vulnerabilities and security flaws before malicious threat actors find them." },
        { title: "Performance Optimization", desc: "Auditing websites to hit perfect 100/100 Lighthouse performance metrics." },
        { title: "Cloud Deployment", desc: "Secure cloud server orchestration, serverless hosting, and CI/CD pipelines." }
      ]
    }
  ],

  securityBanner: {
    title: "Secure Your Website Before Hackers Do.",
    description: "Protect your business from vulnerabilities, malware, data leaks and cyber attacks.",
    offer: "Free Initial Security Scan"
  },

  skills: {
    frontend: ["React", "Next.js", "React Native", "TypeScript", "TailwindCSS", "Flutter"],
    backend: ["Node.js", "PostgreSQL", "Prisma", "SaaS Multi-tenancy", "Firebase", "MongoDB", "Supabase", "REST APIs"],
    toolsAndSecurity: ["Cyber Security", "Penetration Testing", "Git", "Docker", "Java", "Android"]
  },

  testimonials: [
    {
      quote: "Satyam rebuilt Flat Rate Bookkeeping from scratch. The interface is stunning and load speeds are unmatched. Highly recommended!",
      author: "Karsten Vaeth",
      role: "Founder, Flatrate Bookkeeping LLC",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Karsten"
    },
    {
      quote: "Satyam built a real-time market tracker with amazing speed. His technical ability and clean engineering made StockDox a reality.",
      author: "Alston Tahir",
      role: "Founder, StockDox",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alston"
    },

    {
      quote: "Satyam engineered our swipe-based classified marketplace. The user experience is incredibly fluid, and his backend optimization is top-notch. Exceptional developer!",
      author: "Shubham Tiwari",
      role: "Founder, BigMo",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Shubham"
    }
  ]
};
