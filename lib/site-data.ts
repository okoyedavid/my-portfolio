export const siteConfig = {
  name: "David Okoye",
  firstName: "David",
  role: "Frontend Developer | Next.js & React Specialist",
  shortRole: "Frontend Developer",
  email: "okoyedav7@gmail.com",
  phone: "(+234) 916 380 8118",
  location: "Abuja, Nigeria",
  website: "https://okoye-david.vercel.app",
  github: "https://github.com/okoyedavid",
  resume: "/Resume.pdf",
  summary:
    "Self-driven Frontend Developer with 3+ years of hands-on experience building production-ready applications with Next.js, React, and TypeScript. Proven track record of delivering responsive, performant, and user-friendly interfaces for real-world clients. Experienced in the full development lifecycle from API integration to testing and deployment, with strong problem-solving abilities and clear communication.",
  seoDescription:
    "Portfolio of David Okoye, a frontend developer focused on Next.js, React, TypeScript, performance, and production-ready user interfaces.",
  keywords: [
    "David Okoye",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Portfolio",
    "Nigeria Developer",
  ],
} as const;

export const stats: Array<{ num: number; text: string; suffix?: string }> = [
  { num: 3, suffix: "+", text: "Years of Experience" },
  { num: 3, text: "Hands-on Roles" },
  { num: 2, text: "Certifications" },
  { num: 5, text: "Core Delivery Areas" },
];

export const experienceItems = [
  {
    company: "Various Projects",
    position: "Freelance Frontend Developer",
    duration: "2022 - Present",
    summary:
      "Delivered responsive frontend builds, API-connected interfaces, and production-ready features for client work.",
  },
  {
    company: "Enugu State University",
    position: "Collaborative Academic Projects",
    duration: "2022 - Present",
    summary:
      "Built academic product work with a focus on practical interfaces, usability, and team collaboration.",
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
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "Node.js",
  "API Integration",
  "Testing",
  "Deployment",
  "Responsive UI",
] as const;

export const serviceItems = [
  {
    num: "01",
    title: "Frontend Engineering",
    description:
      "Production-ready React and Next.js interfaces built for speed, clarity, and maintainability.",
  },
  {
    num: "02",
    title: "TypeScript Product Builds",
    description:
      "Typed application development that keeps features safer to extend and easier to ship with confidence.",
  },
  {
    num: "03",
    title: "API Integration",
    description:
      "Frontend systems connected to real data sources with reliable state handling and clean user flows.",
  },
  {
    num: "04",
    title: "Performance and SEO Tuning",
    description:
      "Interface polish that improves responsiveness, discoverability, accessibility, and production readiness.",
  },
] as const;

export const featuredProject = {
  title: "University Portal App",
  subtitle: "ESUT Pharmacy Department",
  duration: "Academic Project",
  summary:
    "A university portal experience built to support departmental workflows with a clean, responsive interface and practical frontend architecture.",
  highlights: [
    "Built with the same frontend focus highlighted across the resume: Next.js, React, and TypeScript.",
    "Designed for responsive use across different screen sizes and day-to-day academic workflows.",
    "Implemented with production-minded concerns including API integration, testing awareness, and deployment readiness.",
  ],
} as const;

export const deliveryAreas = [
  "Responsive marketing and product pages",
  "Reusable component-based UI systems",
  "Data-driven dashboards and portals",
  "Performance-focused frontend refinement",
] as const;
