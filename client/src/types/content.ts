export type HeroStat = {
  id: string;
  value: string;
  label: string;
};

export type HeroContent = {
  headline: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  stats: HeroStat[];
};

export type MissionValue = {
  id: string;
  title: string;
  detail: string;
};

export type MissionContent = {
  mission: string;
  values: MissionValue[];
  differentiators: string[];
};

export type NewsItem = {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
};

export type DomainProduct = {
  id: string;
  name: string;
  category: string;
  price?: number;
  rating?: number;
  badge?: string;
  description: string;
  image: string;
};

export type DomainCollection = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type DomainExpert = {
  id: string;
  name: string;
  title: string;
  experience: string;
  avatar: string;
};

export type DomainService = {
  id: string;
  title: string;
  description: string;
};

export type TailorFormField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
};

export type TailorServiceConfig = {
  highlights: string[];
  formFields: TailorFormField[];
};

export type BusinessDomain = {
  id: string;
  title: string;
  summary: string;
  quickLinks: string[];
  products?: DomainProduct[];
  blog?: { id: string; title: string; readingTime: string; image: string }[];
  collections?: DomainCollection[];
  services?: DomainService[] | TailorServiceConfig;
  experts?: DomainExpert[];
  insights?: { id: string; title: string; tag: string; image: string }[];
};

export type AboutContent = {
  story: string;
  timeline: { year: number; event: string }[];
  vision: string;
  mission: string;
  values: MissionValue[];
  founders: { id: string; name: string; role: string; expertise: string }[];
};

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  category: string;
  image?: string | null;
  publishedAt: string;
};

export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  mapSrc?: string;
};

export type SpecialtyPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    stats?: HeroStat[];
  };
  highlights: string[];
  products: (DomainProduct & { benefits?: string[] })[];
  rituals?: { title: string; steps: string[] }[];
  articles: BlogPost[];
};

