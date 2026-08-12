export const siteConfig = {
  name: "David Okoye",
  firstName: "David",
  role: "Frontend-Heavy Full-Stack TypeScript Developer",
  shortRole: "Frontend-Heavy Full-Stack TypeScript Developer",
  email: "okoyedav7@gmail.com",
  emailHref: "mailto:okoyedav7@gmail.com",
  phone: "(+234) 916 380 8118",
  location: "Abuja, Nigeria",
  website: "https://okoyedavid.com",
  github: "https://github.com/okoyedavid",
  linkedin: "https://www.linkedin.com/in/okoyedavid7",
  resume: "/resume",
  summary:
    "Frontend-heavy full-stack TypeScript developer with hands-on experience building React and Next.js interfaces, Node.js APIs, secure account systems, multi-tenant authorization and asynchronous business workflows.",
  seoDescription:
    "Portfolio of David Okoye, a frontend-heavy full-stack TypeScript developer building React, Next.js and Node.js applications, secure account systems, multi-tenant APIs and SaaS workflows.",
  keywords: [
    "David Okoye",
    "Frontend-Heavy Full-Stack TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "SaaS Dashboard Developer",
    "Authentication",
    "Multi-tenant RBAC",
    "REST APIs",
  ],
} as const;

export const coreEngineeringAreas = [
  "SaaS dashboards",
  "Authentication and sessions",
  "Multi-tenant RBAC",
  "REST API development",
  "Background jobs and retries",
  "Responsive product interfaces",
] as const;

export const experienceItems = [
  {
    company: "Various projects",
    position: "Freelance Frontend / TypeScript Developer",
    duration: "2022 to present",
    responsibilities: [
      "Built responsive React and Next.js applications across SaaS, media, education, logistics and commerce.",
      "Implemented API integrations, authentication interfaces, dashboards, state management and reusable product components.",
      "Developed separate frontend and backend applications with TypeScript-based contracts and business workflows.",
    ],
  },
  {
    company: "Raadaa Partners International",
    position: "Frontend Developer, Industrial Training",
    duration: "April 2024 to October 2024",
    responsibilities: [
      "Developed and maintained Next.js and TypeScript interfaces.",
      "Integrated frontend applications with REST APIs.",
      "Implemented loading, error and user-feedback states.",
      "Wrote unit and integration tests with Jest.",
      "Collaborated through Git and GitLab workflows.",
    ],
  },
] as const;

export const educationItems = [
  {
    institution: "Enugu State University, Nigeria",
    degree: "B.Sc. Computer Science",
    duration: "November 2022 to present",
  },
] as const;

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "REST APIs",
  "Tailwind CSS",
  "TanStack Query",
  "Authentication",
  "RBAC and permissions",
  "Vitest",
  "Supertest",
] as const;

export const serviceItems = [
  {
    num: "01",
    title: "Frontend product development",
    description:
      "Responsive React and Next.js interfaces with reusable components, clear application states and accessible interactions.",
  },
  {
    num: "02",
    title: "SaaS dashboard development",
    description:
      "Data-rich dashboards and admin interfaces for teams, records, permissions and day-to-day business operations.",
  },
  {
    num: "03",
    title: "Full-stack TypeScript applications",
    description:
      "Separate Next.js frontends and Node.js/Express backends connected through typed, validated REST API contracts.",
  },
  {
    num: "04",
    title: "Authentication and account systems",
    description:
      "Sign-in, verification, password recovery, protected routes and revocable session flows with practical security controls.",
  },
  {
    num: "05",
    title: "Role-based access control",
    description:
      "Multi-tenant authorization for system and custom roles, explicit permissions and guarded administrative actions.",
  },
  {
    num: "06",
    title: "API integration and background workflows",
    description:
      "Third-party API integrations and durable background work with persisted status, retry eligibility and failure handling.",
  },
] as const;

export const projectItems = [
  {
    num: "01",
    category: "Featured full-stack platform",
    title: "Aurex",
    status: "Active build",
    summary:
      "Aurex is a full-stack, multi-tenant business operations platform with separate frontend and backend applications. It includes authentication, persistent sessions, business workspaces, system and custom roles, team membership, employee records, invitation delivery, bank-account verification, notifications and audit trails.",
    contribution:
      "I designed and implemented the product interface, REST API, authentication and authorization model, MongoDB data workflows, and polling workers across separate TypeScript applications.",
    features: [
      "Short-lived access tokens and rotating refresh sessions with individual session revocation",
      "Suspicious-login monitoring",
      "Multi-tenant RBAC with system and custom roles, explicit grants and denials, and privilege-escalation protection",
      "Atomic MongoDB-backed job claiming for durable employee bank-account verification",
      "Fixed worker polling with persisted per-job retry backoff",
      "Invitation-email delivery using recursive timeouts, adaptive idle polling and jitter",
      "Persistent retry state that survives process restarts",
      "Rate limiting, Zod validation and security middleware",
      "Vitest and Supertest coverage",
    ],
    architecture:
      "Aurex uses MongoDB-backed polling workers rather than an external queue service at its current scale. Jobs are claimed atomically, and status, attempt counts and retry eligibility are persisted so queued work can recover after a process restart.",
    note:
      "Payment permissions, employee records and workflow models are implemented. Payment execution is planned and remains under development.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Zod",
      "Vitest",
      "Supertest",
    ],
    images: [
      "/assets/work/aurex.png",
      "/assets/work/aurex2.png",
      "/assets/work/aurex3.png",
      "/assets/work/aurex4.png",
    ],
    links: [
      { label: "Open application", href: "https://aurex.okoyedavid.com" },
      {
        label: "API Status",
        href: "https://api.aurex.okoyedavid.com/status",
        hint: "Render free tier; a cold start may take a moment.",
      },
      {
        label: "Frontend source",
        href: "https://github.com/okoyedavid/Aurex",
      },
      {
        label: "Backend source",
        href: "https://github.com/okoyedavid/aurex-backend",
      },
    ],
  },
  {
    num: "02",
    category: "Media discovery platform",
    title: "Animex",
    status: "Completed portfolio project",
    summary:
      "Animex is an anime discovery platform combining public Jikan API data with authentication, account management, protected routes and browser-based watchlists.",
    contribution:
      "I built the responsive discovery interface, server-backed account flows, protected dashboard, API integration and client-side request caching.",
    features: [
      "Search and content discovery with detailed anime information",
      "Guest watchlists",
      "Email verification plus Google and GitHub authentication",
      "Protected dashboard with profile and session management",
      "Cached requests with TanStack Query",
      "Responsive loading and error states",
    ],
    architecture: null,
    note: null,
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Axios",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    images: [
      "/assets/work/animex.png",
      "/assets/work/animex2.png",
      "/assets/work/animex3.png",
      "/assets/work/animex4.png",
    ],
    links: [
      { label: "Open application", href: "https://animex.okoyedavid.com" },
      {
        label: "Frontend source",
        href: "https://github.com/okoyedavid/animex",
      },
      {
        label: "Backend source",
        href: "https://github.com/okoyedavid/animex-backend",
      },
    ],
  },
  {
    num: "03",
    category: "Fashion commerce interface",
    title: "Aurela",
    status: "Completed portfolio project",
    summary:
      "Aurela is a responsive fashion-commerce experience focused on product discovery, editorial presentation and modern marketplace interactions.",
    contribution:
      "I built the responsive interface and component architecture, shaping the product presentation and interaction design across browsing and commerce flows.",
    features: [
      "Responsive product discovery and category browsing",
      "Reusable component architecture",
      "Editorial product presentation",
      "Marketplace-focused interaction design",
    ],
    architecture: null,
    note: null,
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    images: [
      "/assets/work/aurela.png",
      "/assets/work/aurela2.png",
      "/assets/work/aurela3.png",
      "/assets/work/aurela4.png",
    ],
    links: [
      { label: "Open application", href: "https://aurela.okoyedavid.com" },
      { label: "View source", href: "https://github.com/okoyedavid/Aurela" },
    ],
  },
] as const;
