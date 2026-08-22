export const siteConfig = {
  name: "David Okoye",
  firstName: "David",
  role: "Full-Stack TypeScript Developer",
  shortRole: "Full-Stack TypeScript Developer",
  email: "okoyedav7@gmail.com",
  emailHref: "mailto:okoyedav7@gmail.com",
  phone: "(+234) 916 380 8118",
  location: "Abuja, Nigeria",
  website: "https://okoyedavid.com",
  github: "https://github.com/okoyedavid",
  linkedin: "https://www.linkedin.com/in/okoyedavid7",
  resume: "/Resume.pdf",
  summary:
    "full-stack TypeScript developer with hands-on experience building React and Next.js interfaces, Node.js APIs, secure account systems, multi-tenant authorization and asynchronous business workflows.",
  seoDescription:
    "Portfolio of David Okoye, a full-stack TypeScript developer building React, Next.js and Node.js applications, secure account systems, multi-tenant APIs and SaaS workflows.",
  keywords: [
    "David Okoye",
    "Full-Stack TypeScript Developer",
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

export type ProjectStoryItem =
  | {
      type: "image";
      source: string;
      alt: string;
      caption: string;
    }
  | {
      type: "narrative";
      eyebrow: string;
      title: string;
      body: string;
    }
  | {
      type: "video";
      source: string;
      title: string;
      poster?: string;
    };

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
    note: "Payment permissions, employee records and workflow models are implemented. Payment execution is planned and remains under development.",
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
      "/assets/work/aurex/aurex.png",
      "/assets/work/aurex/aurex2.png",
      "/assets/work/aurex/aurex3.png",
      "/assets/work/aurex/aurex4.png",
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
    story: [
      {
        type: "image",
        source: "/assets/work/aurex/aurex.png",
        alt: "Aurex public landing page",
        caption: "Public product introduction",
      },
      {
        type: "image",
        source: "/assets/work/aurex/aurex2.png",
        alt: "Aurex product positioning page",
        caption: "Product positioning and feature discovery",
      },
      {
        type: "narrative",
        eyebrow: "From promise to product",
        title: "A clear route into a protected workspace.",
        body: "The public experience explains the operational promise before asking anyone to create an account. From there, authentication becomes the controlled boundary between product discovery and sensitive business data.",
      },
      {
        type: "image",
        source: "/assets/work/aurex/aurex3.png",
        alt: "Aurex secure sign-in interface",
        caption: "Authentication and protected account access",
      },
      {
        type: "narrative",
        eyebrow: "The operational centre",
        title: "One dashboard for the work that keeps a business moving.",
        body: "I designed the workspace to surface team access, employee operations, invitations, notifications and audit activity without making the user assemble the state of the business from separate tools.",
      },
      {
        type: "image",
        source: "/assets/work/aurex/aurex4.png",
        alt: "Aurex business operations dashboard",
        caption: "Multi-tenant business workspace overview",
      },
      {
        type: "narrative",
        eyebrow: "Engineering goal",
        title: "Durable workflows, not decorative dashboard screens.",
        body: "Behind the interface are rotating sessions, multi-tenant permissions, atomic job claiming, persisted retry state and auditable operations. The goal was a system that remains understandable to users and recoverable when background work fails.",
      },
    ] satisfies readonly ProjectStoryItem[],
  },
  {
    num: "02",
    category: "Academic operations and identity platform",
    title: "AureScore",
    status: "Active build",
    summary:
      "AureScore is a full-stack academic result infrastructure for secure score entry, automatic GPA computation, multi-level approval and institution-wide result workflows.",
    contribution:
      "I designed and built the product experience, institutional workspace model, authentication system and backend services across separate frontend and NestJS applications.",
    features: [
      "Role-specific workspaces for departments, faculties and universities",
      "Score entry, GPA computation and traceable multi-level approval",
      "HTTP-only cookie sessions with refresh rotation and replay detection",
      "Google authentication and optional email two-factor authentication",
      "OpenID Connect provider with Authorization Code and PKCE",
      "Security audit history and device-session management",
    ],
    architecture:
      "The API uses NestJS, PostgreSQL, Prisma and Redis. Authentication combines short-lived access credentials, rotating refresh sessions, rate-limited verification challenges and an OpenID Connect provider for external applications.",
    note: null,
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "OpenID Connect",
      "Resend",
    ],
    images: [
      "/assets/work/aurescore/aurescore.webp",
      "/assets/work/aurescore/aurescore2.jpg",
      "/assets/work/aurescore/aurescore 3.png",
      "/assets/work/aurescore/aurescore 4.png",
      "/assets/work/aurescore/aurescore 5.png",
    ],
    links: [
      { label: "Open application", href: "https://aurescore.okoyedavid.com" },
      {
        label: "Backend API",
        href: "https://api.aurescore.okoyedavid.com",
      },
      {
        label: "Frontend source",
        href: "https://github.com/okoyedavid/aurescore",
      },
      {
        label: "Backend source",
        href: "https://github.com/okoyedavid/aurescore-backend",
      },
    ],
    story: [
      {
        type: "image",
        source: "/assets/work/aurescore/aurescore.webp",
        alt: "AureScore public landing page",
        caption: "Academic result infrastructure",
      },
      {
        type: "image",
        source: "/assets/work/aurescore/aurescore2.jpg",
        alt: "AureScore institutional audiences page",
        caption: "One workflow across institutional levels",
      },
      {
        type: "narrative",
        eyebrow: "The product goal",
        title:
          "Replace disconnected spreadsheets with one traceable result path.",
        body: "AureScore is designed around the way academic work changes hands. Departments enter and review scores, faculties coordinate approvals, universities retain oversight, and students receive access only after results are approved.",
      },
      {
        type: "image",
        source: "/assets/work/aurescore/aurescore 3.png",
        alt: "Sign in with AureScore OpenID Connect documentation",
        caption: "AureScore as an OpenID Connect provider",
      },
      {
        type: "narrative",
        eyebrow: "Identity infrastructure",
        title: "Authentication became a platform capability of its own.",
        body: "The system supports secure account access, device sessions, optional email 2FA and standards-based OpenID Connect. External server-side applications can integrate Sign in with AureScore through Authorization Code flow with mandatory PKCE.",
      },
      {
        type: "image",
        source: "/assets/work/aurescore/aurescore 4.png",
        alt: "AureScore account sign-in page",
        caption: "Protected access to academic workspaces",
      },
      {
        type: "image",
        source: "/assets/work/aurescore/aurescore 5.png",
        alt: "AureScore workspace dashboard",
        caption: "Institutional and private result workspaces",
      },
      {
        type: "narrative",
        eyebrow: "Inside the workspace",
        title: "The dashboard starts with context, ownership and pending work.",
        body: "Users can move between institutional and private workspaces, see invitations and assigned reviews, and continue the next academic task without losing sight of the role under which they are acting.",
      },
    ] satisfies readonly ProjectStoryItem[],
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
      "/assets/work/aurela/aurela.png",
      "/assets/work/aurela/aurela2.png",
      "/assets/work/aurela/aurela3.png",
      "/assets/work/aurela/aurela4.png",
    ],
    links: [
      { label: "Open application", href: "https://aurela.okoyedavid.com" },
      { label: "View source", href: "https://github.com/okoyedavid/Aurela" },
    ],
    story: [
      {
        type: "image",
        source: "/assets/work/aurela/aurela.png",
        alt: "Aurela editorial commerce landing page",
        caption: "Editorial product discovery",
      },
      {
        type: "narrative",
        eyebrow: "Experience goal",
        title: "Make shopping feel composed, not crowded.",
        body: "Aurela explores a quieter commerce experience where editorial imagery establishes the mood and the interface gives products enough space to feel considered rather than reduced to a dense catalogue grid.",
      },
      {
        type: "image",
        source: "/assets/work/aurela/aurela2.png",
        alt: "Aurela focused product browsing interface",
        caption: "Focused product browsing",
      },
      {
        type: "image",
        source: "/assets/work/aurela/aurela3.png",
        alt: "Aurela member sign-in page",
        caption: "Member access and account continuity",
      },
      {
        type: "narrative",
        eyebrow: "Commerce interaction",
        title: "Editorial presentation still has to support decisive actions.",
        body: "The visual system carries through authentication and detailed product views, while availability, variants, reviews and purchase actions remain clear at the moment the user needs them.",
      },
      {
        type: "image",
        source: "/assets/work/aurela/aurela4.png",
        alt: "Aurela detailed product page",
        caption: "Product detail and purchase decisions",
      },
    ] satisfies readonly ProjectStoryItem[],
  },
] as const;
