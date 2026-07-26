export const siteConfig = {
  name: "David Okoye",
  firstName: "David",
  role: "Full-Stack TypeScript Developer building SaaS dashboards, authentication systems, and business workflow tools.",
  shortRole: "Full-Stack TypeScript Developer",
  email: "okoyedav7@gmail.com",
  phone: "(+234) 916 380 8118",
  location: "Abuja, Nigeria",
  website: "https://okoye-david.vercel.app",
  github: "https://github.com/okoyedavid",
  resume: "/Resume.pdf",
  summary:
    "Frontend-heavy full-stack TypeScript developer with 3+ years of hands-on frontend experience and growing backend/product architecture depth through SaaS-style builds like Aurex. I build clean React and Next.js product interfaces, Node.js/Express APIs, authentication flows, RBAC, dashboard UIs, REST API integrations, and business workflow systems without overcomplicating the user experience.",
  seoDescription:
    "Portfolio of David Okoye, a frontend-heavy full-stack TypeScript developer focused on React, Next.js, Node.js, SaaS dashboards, authentication systems, RBAC, API integrations, and product engineering.",
  keywords: [
    "David Okoye",
    "Full-Stack TypeScript Developer",
    "Frontend-heavy Full-Stack Developer",
    "React Node.js Developer",
    "SaaS Dashboard Developer",
    "Product Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Authentication Systems",
    "RBAC",
    "Portfolio",
    "Nigeria Developer",
  ],
} as const;

export const stats: Array<{ num: number; text: string; suffix?: string }> = [
  { num: 3, suffix: "+", text: "Years of Experience" },
  { num: 3, text: "Hands-on Roles" },
  { num: 2, text: "Certifications" },
  { num: 6, text: "Core Delivery Areas" },
];

export const experienceItems = [
  {
    company: "Various Projects",
    position: "Freelance Frontend / TypeScript Developer",
    duration: "2022 - Present",
    summary:
      "Delivered responsive React and Next.js interfaces, API-connected product flows, dashboard screens, and production-minded frontend features for client and portfolio work.",
  },
  {
    company: "Aurex",
    position: "Full-Stack TypeScript Product Build",
    duration: "2025 - Present",
    summary:
      "Built a SaaS-style business platform with separate frontend and backend architecture, authentication, session handling, roles and permissions, workspace management, and payment workflow planning.",
  },
  {
    company: "Raadaa Partners International",
    position: "Frontend Developer (Industrial Training Internship)",
    duration: "April 2024 - October 2024",
    summary:
      "Worked on frontend implementation and real-world product delivery during industrial training.",
  },
] as const;

export const educationItems = [
  {
    institution: "Enugu State University, Nigeria",
    href: null,
    degree: "Bachelor of Science in Computer Science",
    duration: "November 2022 - Present",
  },
  {
    institution: "Government Secondary School Pyakasa, Abuja",
    href: null,
    degree: "Senior School Certificate (SSCE)",
    duration: "October 2017 - November 2020",
  },

  {
    institution: "Responsive Web Design",
    degree: "freeCodeCamp",
    duration: "June 17 2022",
    href: "https://www.freecodecamp.org/certification/okoyedavid7/responsive-web-design",
  },
  {
    institution: "JavaScript Algorithms and Data Structures",
    degree: "freeCodeCamp",
    duration: "December 18 2022",
    href: "https://www.freecodecamp.org/certification/okoyedavid7/javascript-algorithms-and-data-structures",
  },
] as const;

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "REST APIs",
  "Tailwind CSS",
  "Authentication",
  "RBAC / Permissions",
  "Dashboard UI",
  "API Integration",
  "Payment Workflow Integration",
  "Responsive Product UX",
] as const;

export const serviceItems = [
  {
    num: "01",
    title: "SaaS Dashboard Development",
    description:
      "React and Next.js dashboard interfaces for data-heavy product screens, admin tools, and business workflows.",
  },
  {
    num: "02",
    title: "Full-Stack Applications",
    description:
      "Frontend-heavy TypeScript builds connected to Node.js/Express APIs, REST data flows, and maintainable product structure.",
  },
  {
    num: "03",
    title: "Authentication & Account Systems",
    description:
      "Login, forgot-password, reset-password, account updates, session handling, and secure user-facing auth flows.",
  },
  {
    num: "04",
    title: "API Integration & Payment Workflows",
    description:
      "Product flows that connect clean interfaces to external APIs, payment planning, and balance-funded transfer workflows.",
  },
  {
    num: "05",
    title: "Role-Based Access Control",
    description:
      "Permission-aware interfaces and workflows for teams, system roles, custom roles, and protected dashboard actions.",
  },
  {
    num: "06",
    title: "Frontend Performance & Product UX",
    description:
      "Responsive, polished product interfaces with clear states, reusable components, and practical interaction design.",
  },
] as const;

export const featuredProject = {
  title: "Aurex",
  subtitle: "SaaS-style business management platform",
  duration: "Featured Project",
  summary:
    "Aurex is a full-stack TypeScript business management platform with separate frontend and backend architecture, authentication, workspace management, RBAC, employee payment records, and payment workflow planning.",
  highlights: [
    "Separate frontend and backend structure with TypeScript-focused implementation.",
    "Authentication flows include forgot password, reset password, revocable sessions, refresh-token rotation, login metadata, and suspicious login alerts.",
    "Business workflow coverage includes workspaces, team members, system/custom roles, employee payment records, and Paystack Balance-funded payout planning.",
  ],
} as const;

export const deliveryAreas = [
  "SaaS dashboards and admin portals",
  "Authentication and account systems",
  "RBAC and permission-aware workflows",
  "API integrations and payment workflow UI",
] as const;

export const projectItems = [
  {
    num: "01",
    category: "Featured full-stack",
    title: "Aurex",
    status: "Active portfolio build",
    summary:
      "A full-stack SaaS-style business management platform with separate frontend and backend architecture for authentication, business/workspace management, roles, employee payment records, and payment workflow planning.",
    features: [
      "Authentication with forgot-password and reset-password flows",
      "Revocable session handling, refresh-token rotation, rate limiting, login metadata, and suspicious login alerts",
      "User account updates for avatar, email, and password",
      "Business/workspace creation, team members, system roles, and custom roles",
      "Employee payment records with salary-style payout batch planning around Paystack Balance-funded transfers",
      "Audit-friendly checks for unusual payment changes",
      "Dashboard dark mode",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "RBAC",
      "Paystack-style workflow planning",
    ],
    images: [
      "/assets/work/aurex.png",
      "/assets/work/aurex2.png",
      "/assets/work/aurex3.png",
      "/assets/work/aurex4.png",
    ],
    live: "https://aurex.okoyedavid.com",
    github: "",
  },
  {
    num: "02",
    category: "Media product",
    title: "Animex",
    status: "Portfolio project",
    summary:
      "An anime-focused product interface for browsing, discovering, and interacting with anime content through a clean responsive UI.",
    features: [
      "Anime browsing and discovery experience",
      "Search-focused navigation",
      "Top-rated anime presentation using Jikan-powered content",
      "Watchlist navigation visible in the product UI",
      "Responsive media-first interface with loading-ready content sections",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "API Integration",
      "Responsive UI",
    ],
    images: [
      "/assets/work/animex.png",
      "/assets/work/animex2.png",
      "/assets/work/animex3.png",
      "/assets/work/animex4.png",
    ],
    live: "https://animex.okoyedavid.com",
    github: "",
  },
  {
    num: "03",
    category: "E-commerce",
    title: "Aurela",
    status: "Portfolio project",
    summary:
      "A fashion marketplace platform bringing independent shops and personal style together, with product discovery, shoppable video reels, and a considered editorial experience.",
    features: [
      "Product marketplace with multi-category browsing",
      "Shoppable video reels for styling and product discovery",
      "Cart, checkout, and order tracking flows",
      "Seller onboarding with listing terms and restrictions",
      "Newsletter and editorial content system",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Database Management",
      "Product UI",
    ],
    images: [
      "/assets/work/aurela.png",
      "/assets/work/aurela2.png",
      "/assets/work/aurela3.png",
      "/assets/work/aurela4.png",
    ],
    live: "https://aurela.okoyedavid.com",
    github: "",
  },
  {
    num: "04",
    category: "Productivity app",
    title: "Zentry Task Manager",
    status: "Portfolio project",
    summary:
      "A task management application focused on organizing work and managing tasks through a clean dashboard-style product interface.",
    features: [
      "Authentication screens for sign-in and account creation",
      "Dashboard-style task management direction",
      "Clean product UX with a focused dark interface",
      "Reusable frontend structure and responsive layout direction",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Product UI"],
    images: ["/assets/work/zentry.png"],
    live: "",
    github: "",
  },
] as const;
