export interface AboutStat {
  value: string;
  label: string;
}

export interface CurrentlyLine {
  key: string;
  value: string;
}

export interface AboutData {
  heading: string;
  paragraphs: string[];
  stats: AboutStat[];
  currentlyUpdated: string;
  currentlyLines: CurrentlyLine[];
}

export interface ExperienceEntry {
  years: string;
  /** Inclusive month count (both start and end months count as full
   * months), used for the duration label and the relative tenure bar. */
  months: number;
  role: string;
  company: string;
  client?: string;
  description: string;
  highlights?: string[];
  tags: string[];
}

export interface ContactRow {
  label: string;
  value: string;
}

export interface ContactData {
  headline: string;
  availability: string;
  rows: ContactRow[];
  footnote: string;
}

export const aboutData: AboutData = {
  heading: 'I build front ends in React & TypeScript — full-stack when the product needs it.',
  paragraphs: [
    `I'm a front-end-leaning software engineer with 5+ years of production experience, primarily in React, TypeScript, and Redux, working on enterprise B2B platforms. I'm also comfortable on the back end — Node.js, REST and GraphQL APIs, PostgreSQL — from earlier full-stack roles where I owned features end to end.`,
    `At EPAM Systems, I worked inside a 300+ engineer organization on a B2B e-commerce platform used by a distributor with 90,000+ customers across 170+ countries, and stepped in as acting team lead for a 4-engineer front-end team. Before that, I led a small front-end team at a real estate CRM startup from the ground up to production, and started my career doing full-stack work at an early-stage startup.`,
  ],
  stats: [
    { value: '5+yrs', label: 'Experience' },
    { value: '3', label: 'Companies' },
    { value: '90k+', label: 'Users Served' },
  ],
  currentlyUpdated: 'updated aug 2026',
  // "ten"/"three" are literal, matching labTools.length and its done
  // count — update this copy alongside registry.ts if that changes.
  currentlyLines: [
    { key: 'building', value: 'Lab — ten small browser-only dev tools, three shipped' },
    { key: 'reading', value: 'Refactoring UI, and everything Redux Toolkit added since v2' },
    { key: 'open to', value: 'Senior and staff front-end roles, remote or hybrid' },
  ],
};

export const experienceData: ExperienceEntry[] = [
  {
    years: 'May 2022 — Nov 2024',
    months: 31,
    role: 'Senior Software Engineer',
    company: 'EPAM Systems',
    client:
      'Global B2B distributor of industrial and material-handling parts (~$1.4B revenue, 90,000+ customers across 170+ countries)',
    description:
      "Built the customer-facing Claims module of the client's B2B e-commerce platform, inside a React/TypeScript/Redux Toolkit Nx monorepo, in a 300+ engineer org split across feature teams.",
    highlights: [
      'Implemented a multi-step claim submission flow (3–5 stages, 10+ dynamically generated form types) using React Hook Form and Zod, with i18next handling localization across multiple European locales.',
      "Designed the flow's state layer in Redux Toolkit with draft persistence and step navigation, so customers could resume an unfinished claim without losing data.",
      'Improved responsiveness of large, deeply nested forms through memoization, component decomposition, and targeted store subscriptions.',
      'Covered the module with unit and component tests (Jest, React Testing Library), working within SonarQube quality gates.',
      'Extended the shared MUI-based component library in Storybook with components reused by other feature teams.',
      'Stepped in as acting lead for a 4-engineer front-end team during the lead\'s absences; ran ~10 technical interviews for JS/TS candidates.',
    ],
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'React Hook Form', 'Zod', 'i18next', 'Material UI', 'Storybook', 'Jest', 'Nx Monorepo'],
  },
  {
    years: 'May 2021 — Apr 2022',
    months: 12,
    role: 'Front-End Team Lead',
    company: 'SDELKA Real Estate CRM Startup',
    client: 'Real estate CRM startup, in production with several regional realtor agencies',
    description:
      'Promoted from front-end developer to team lead after proposing a codebase standardization effort. Led a 3-engineer front-end team inside a 7-person product team for about a year, owning requirements, sprint planning, and task distribution.',
    highlights: [
      'Built a real estate CRM from scratch in React and Redux, taken to production and used by 4–5 realtor agencies.',
      'Designed and built a shared library of ~20 Storybook components, adopted as the single source of UI truth on the project.',
      'Standardized the design language with the product designer, optimized page rendering, and introduced unit tests in Jest.',
    ],
    tags: ['React', 'Redux', 'Storybook', 'Jest', 'Figma'],
  },
  {
    years: 'Jul 2020 — Apr 2021',
    months: 10,
    role: 'Full-Stack Developer',
    company: 'Social Techs',
    client: 'Yoga-instruction startup, serving both a web client and a companion mobile app',
    description:
      'Built the web front end and Node.js/TypeScript back end for an online yoga platform offering live one-on-one instructor sessions with in-app booking, in a 5-person team.',
    highlights: [
      'Designed a GraphQL API with Apollo Server over PostgreSQL and TypeORM, serving the web client and a companion mobile app.',
      'Owned features end-to-end, from PostgreSQL schema design to the React UI.',
      'Implemented JWT auth and social sign-in (Google, Apple, Facebook, VK), transactional email, calendar invites, and image processing.',
      'Introduced unit testing and led onboarding for new engineers.',
    ],
    tags: ['React', 'Node.js', 'GraphQL', 'Apollo Server', 'PostgreSQL', 'TypeORM', 'JWT'],
  },
];

export const contactData: ContactData = {
  headline: 'Email is fastest. Everything else works too.',
  availability: 'open to senior front-end / full-stack roles',
  rows: [
    { label: 'Email', value: 'zrsergan@gmail.com' },
    { label: 'GitHub', value: 'github.com/zsergan' },
    { label: 'LinkedIn', value: 'linkedin.com/in/zsergan' },
  ],
  footnote: 'click any row to copy · replies usually within a day',
};
