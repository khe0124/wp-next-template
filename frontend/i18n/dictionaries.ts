import type { Locale } from "./config";
import koDict from "./locales/ko.json";
import enDict from "./locales/en.json";

type PageMeta = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    type: "website" | "profile" | "article";
  };
};

type Experience = {
  company: string;
  period: string;
  role: string;
  summary: string;
  details: string[];
};

type SkillGroup = {
  title: string;
  items: string[];
};

type TimelineItem = {
  title: string;
  period: string;
};

type CertificateItem = {
  title: string;
  issuer: string;
  year: string;
};

type Project = {
  title: string;
  year: string;
  period?: string;
  impact: string;
  summary: string;
  stack: string[];
  thumbnail?: string;
};

type ContactChannel = {
  label: string;
  value: string;
  href?: string;
};

type ContactPreference = string;

type BlogPost = {
  title: string;
  date: string;
  category: string;
  summary: string;
};

export type Dictionary = {
  common: {
    brand: string;
    nav: {
      home: string;
      resume: string;
      project: string;
      contact: string;
      blog: string;
    };
    footer: {
      crafted: string;
    };
    languagesLabel: string;
  };
  home: {
    metadata: PageMeta;
    roleTag: string;
    headline: string[];
    description: string[];
    cards: { label: string; href: string }[];
  };
  resume: {
    metadata: PageMeta;
    heroTitle: string;
    heroDescription: string;
    experiences: Experience[];
    skillGroups: SkillGroup[];
    educations: TimelineItem[];
    certificates: CertificateItem[];
  };
  project: {
    metadata: PageMeta;
    heroTitle: string;
    heroDescription: string;
    projects: Project[];
  };
  contact: {
    metadata: PageMeta;
    heroTitle: string;
    heroDescription: string;
    channels: ContactChannel[];
    sections: {
      channels: string;
      collaboration: string;
      form: string;
    };
    preferenceIntro: string;
    preferences: ContactPreference[];
    form: {
      nameLabel: string;
      emailLabel: string;
      messageLabel: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
    };
  };
  blog: {
    metadata: PageMeta;
    heroTitle: string;
    heroDescription: string;
    posts: BlogPost[];
    dateLocale: string;
    readMoreLabel: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  ko: koDict as Dictionary,
  en: enDict as Dictionary,
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale] ?? dictionaries.ko;

