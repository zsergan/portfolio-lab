export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutData {
  heading: string;
  paragraphs: string[];
  stats: AboutStat[];
}

export interface ExperienceEntry {
  years: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}

export interface ContactRow {
  label: string;
  value: string;
  href: string;
}

export const aboutData: AboutData = {
  heading: 'I build interfaces that hold up under real use.',
  paragraphs: [
    'Placeholder bio — a couple of sentences about your focus as an engineer, the kind of problems you like solving, and what you care about in the products you build.',
    'Replace this with your real background once it is ready.',
  ],
  stats: [
    { value: '—', label: 'Years experience' },
    { value: '—', label: 'Companies' },
    { value: '—', label: 'Shipped products' },
  ],
};

export const experienceData: ExperienceEntry[] = [
  {
    years: '20XX — Now',
    role: 'Role One',
    company: 'Company One',
    description: 'Placeholder description of impact and responsibilities in this role.',
    tags: ['React', 'TypeScript'],
  },
  {
    years: '20XX — 20XX',
    role: 'Role Two',
    company: 'Company Two',
    description: 'Placeholder description of impact and responsibilities in this role.',
    tags: ['JavaScript'],
  },
];

export const contactData: ContactRow[] = [
  { label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com' },
  { label: 'GitHub', value: 'github.com/username', href: '#' },
  { label: 'LinkedIn', value: 'linkedin.com/in/username', href: '#' },
  { label: 'Resume', value: 'Download', href: '#' },
];
