import type { Locale } from "./config";

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
  impact: string;
  summary: string;
  stack: string[];
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

type Dictionary = {
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
  ko: {
    common: {
      brand: "Haeun Portfolio",
      nav: {
        home: "Home",
        resume: "Resume",
        project: "Project",
        contact: "Contact",
        blog: "Blog",
      },
      footer: {
        crafted: "Design & Code crafted with Next.js",
      },
      languagesLabel: "언어",
    },
    home: {
      metadata: {
        title: "홈",
        description:
          "UI디자인과 자바스크립트를 사랑하는 프론트엔드 개발자 강하은의 포트폴리오.",
        openGraph: {
          title: "Frontend Developer Haeun",
          description:
            "UI를 정확하게 구현하고 협업을 즐기는 프론트엔드 개발자 강하은의 포트폴리오.",
          type: "website",
        },
      },
      roleTag: "Frontend Developer",
      headline: ["UI디자인과 자바스크립트를 좋아하는", "개발자 강하은입니다."],
      description: [
        "다양한 형태의 UI를 정확하게 구현하고, 기획자·디자이너와 능동적으로 협업합니다.",
        "끊임없이 배우고 성장하며 제품 경험의 디테일을 책임집니다.",
      ],
      cards: [
        { label: "📕 RESUME", href: "/resume" },
        { label: "💻 PROJECT", href: "/project" },
        { label: "📮 CONTACT", href: "/contact" },
        { label: "🔗 BLOG", href: "/blog" },
      ],
    },
    resume: {
      metadata: {
        title: "Resume",
        description:
          "프론트엔드 개발자 강하은의 경력, 기술 스택, 교육·자격 정보를 확인하세요.",
        openGraph: {
          title: "Haeun Resume",
          description:
            "에너지·공유주방·의료 서비스 경험과 다양한 UI 기술을 갖춘 프론트엔드 개발자입니다.",
          type: "profile",
        },
      },
      heroTitle: "UI디자인과 자바스크립트를 사랑하는 프론트엔드 개발자",
      heroDescription:
        "다양한 형태의 UI를 정확히 구현하고, 기획·디자인과 유연하게 소통하며 제품 완성도를 끌어올립니다.",
      experiences: [
        {
          company: "(주)에이치에너지",
          period: "2020.05 - 2022.08",
          role: "프론트엔드 개발자",
          summary:
            "공유옥상 태양광 발전 플랫폼 ‘모햇’과 발전량 예측·입찰 서비스 VPP의 UI 전반을 책임졌습니다.",
          details: [
            "백엔드 REST API 연동 및 Pug/Stylus 기반 UI 개발",
            "Chart.js로 출자 수량·발전량 통계 그래프와 SVG 지도 표기 구현",
            "Kakao Map API, SNS 공유 기능, 프로모션 정적 페이지 개발",
          ],
        },
        {
          company: "㈜긱스패밀리(ICT-glab)",
          period: "2019.12 - 2020.04",
          role: "프론트엔드 개발자",
          summary:
            "공유주방·배달창업 SaaS 파트너스를 위한 어드민, POS UI를 구축했습니다.",
          details: [
            "Javascript, jQuery, SCSS로 어드민 UI · 통계 페이지 개발",
            "Chart.js 기반 주문·배달량 시각화와 데이터 대시보드 제작",
            "Jira, Wiki, Slack, Zeplin을 통한 협업 프로세스 운영",
          ],
        },
        {
          company: "㈜파인인사이트(베스티안병원)",
          period: "2016.08 - 2019.01",
          role: "UI/UX 디자이너",
          summary:
            "의료 정보 시스템과 모바일 앱, 온·오프라인 홍보물 디자인을 담당했습니다.",
          details: [
            "화상치료 자문 앱 ‘위피아스’ UI 디자인",
            "임상시험·건강검진 센터 웹사이트 PC/모바일 UI 제작",
            "사보·브로셔·옥외 광고 등 홍보물 디자인",
          ],
        },
      ],
      skillGroups: [
        { title: "Markup", items: ["HTML/CSS", "SCSS", "Pug", "Stylus"] },
        {
          title: "Frontend",
          items: [
            "JavaScript",
            "TypeScript",
            "React",
            "Redux",
            "Redux Toolkit",
            "Vue2",
            "Vue3",
            "jQuery",
          ],
        },
        { title: "Backend", items: ["Node.js", "Python"] },
        {
          title: "Tools",
          items: ["Figma", "Zeplin", "Adobe CC", "Slack", "Jira", "Confluence"],
        },
      ],
      educations: [
        { title: "국민대학교 공업디자인학과 학사", period: "2019.12 - 2020.04" },
        {
          title: "솔데스크 자바 웹 개발자 과정 수료",
          period: "2019.05 - 2019.11",
        },
      ],
      certificates: [
        { title: "정보처리기사", issuer: "한국산업인력공단", year: "2019.08" },
        { title: "정보처리산업기사", issuer: "한국산업인력공단", year: "2019.08" },
      ],
    },
    project: {
      metadata: {
        title: "Project",
        description:
          "실험 자동화, 온보딩 개선, 디자인 시스템 운영 등 대표 프로젝트를 소개합니다.",
        openGraph: {
          title: "Haeun Projects",
          description:
            "데이터 기반 실험, SaaS 온보딩, Design System Ops 사례를 확인하세요.",
          type: "article",
        },
      },
      heroTitle: "문제를 정의하고 데이터로 검증한 프로젝트",
      heroDescription:
        "실험 가능한 가설을 세우고, 디자인과 코드를 동시에 운영한 사례를 정리했습니다.",
      projects: [
        {
          title: "실험 파이프라인 자동화",
          year: "2024",
          impact: "전환율 +14%",
          summary:
            "Growth 실험 운영 프로세스를 자동화하여 테스트 횟수를 3배 확장했습니다.",
          stack: ["Next.js", "TypeScript", "Design Token", "Zustand"],
        },
        {
          title: "SaaS 온보딩 재설계",
          year: "2023",
          impact: "활성화율 +28%",
          summary:
            "세그먼트별 플로우로 온보딩을 분리하고 인앱 가이드를 리디자인했습니다.",
          stack: ["Figma", "Amplitude", "React", "Storybook"],
        },
        {
          title: "Design System Ops",
          year: "2022",
          impact: "UI 일관성 +40%",
          summary:
            "토큰 소스와 코드 배포를 연결해 실시간으로 반영되는 시스템을 구축했습니다.",
          stack: ["Style Dictionary", "GitHub Actions", "Chromatic"],
        },
      ],
    },
    contact: {
      metadata: {
        title: "Contact",
        description:
          "협업, 커피챗, 스피커 제안 등 문의 채널과 선호 협업 유형을 안내합니다.",
        openGraph: {
          title: "Haeun Contact",
          description: "프로젝트 제안과 협업 문의를 위한 채널 안내",
          type: "website",
        },
      },
      heroTitle: "다음 대화를 기다리고 있어요",
      heroDescription:
        "프로젝트 킥오프부터 캐주얼 커피챗까지, 한 주 안에 답변드리고 있습니다.",
      channels: [
        { label: "이메일", value: "hello@haeun.dev", href: "mailto:hello@haeun.dev" },
        { label: "슬랙", value: "haeunpark" },
        { label: "링크드인", value: "linkedin.com/in/haeunpark", href: "https://linkedin.com/in/haeunpark" },
      ],
    sections: {
      channels: "바로 연결",
      collaboration: "선호 협업 유형",
      form: "간단한 소개",
    },
      preferenceIntro: "B2B SaaS, 실험 문화가 자리 잡은 팀과 잘 맞습니다.",
      preferences: [
        "제품 전략/디자인 시스템 컨설팅 (4-6주)",
        "Growth 실험 설계 및 실행 동행",
        "워크숍 & 팀 진단 세션",
      ],
      form: {
        nameLabel: "이름",
        emailLabel: "이메일",
        messageLabel: "문의 내용",
        namePlaceholder: "홍길동",
        emailPlaceholder: "you@example.com",
        messagePlaceholder: "협업하고 싶은 내용이나 일정 등 자유롭게 적어주세요.",
        submit: "메시지 보내기",
      },
    },
    blog: {
      metadata: {
        title: "Blog",
        description: "실험 문화, 디자인 시스템, 협업 인사이트를 기록합니다.",
        openGraph: {
          title: "Haeun Blog",
          description: "프로덕트 디자인과 프런트엔드 실무 인사이트",
          type: "article",
        },
      },
      heroTitle: "기록하고 공유하는 실험 노트",
      heroDescription:
        "팀이 겪는 문제를 언어화하고 해결 방법을 다듬으며 남긴 기록입니다.",
      posts: [
        {
          title: "실험 속도를 높이는 디자인 핸드오프 전략",
          date: "2024-10-28",
          category: "Experiment Ops",
          summary:
            "디자인 산출물을 스쿼드가 빠르게 활용하도록 시스템화한 워크플로를 공개합니다.",
        },
        {
          title: "Design Token으로 시작하는 프런트-디자인 협업",
          date: "2024-07-12",
          category: "Design System",
          summary:
            "토큰 싱크 파이프라인을 구축하며 마주한 이슈와 해결 과정을 정리했습니다.",
        },
        {
          title: "SaaS 온보딩에서 데이터가 말해준 것들",
          date: "2023-12-03",
          category: "Growth",
          summary:
            "정량/정성 데이터를 결합해 문제를 좁혀나가는 과정을 실제 사례로 풀어냈습니다.",
        },
      ],
      dateLocale: "ko-KR",
      readMoreLabel: "글 읽기 →",
    },
  },
  en: {
    common: {
      brand: "Haeun Portfolio",
      nav: {
        home: "Home",
        resume: "Resume",
        project: "Projects",
        contact: "Contact",
        blog: "Blog",
      },
      footer: {
        crafted: "Design & Code crafted with Next.js",
      },
      languagesLabel: "Language",
    },
    home: {
      metadata: {
        title: "Home",
        description:
          "Portfolio of Haeun, a frontend developer who loves UI design and JavaScript.",
        openGraph: {
          title: "Frontend Developer Haeun",
          description:
            "A frontend engineer who brings UI details to life and collaborates seamlessly.",
          type: "website",
        },
      },
      roleTag: "Frontend Developer",
      headline: [
        "I'm Haeun, a developer who loves UI design",
        "and JavaScript.",
      ],
      description: [
        "I translate diverse UI into reliable interfaces and partner closely with product teams.",
        "Always learning, always refining the details of the product experience.",
      ],
      cards: [
        { label: "📕 RESUME", href: "/resume" },
        { label: "💻 PROJECTS", href: "/project" },
        { label: "📮 CONTACT", href: "/contact" },
        { label: "🔗 BLOG", href: "/blog" },
      ],
    },
    resume: {
      metadata: {
        title: "Resume",
        description:
          "Explore Haeun's frontend experience, skill set, education, and certifications.",
        openGraph: {
          title: "Haeun Resume",
          description:
            "Frontend engineer with experience across energy, shared kitchen, and healthcare services.",
          type: "profile",
        },
      },
      heroTitle:
        "Frontend engineer who enjoys both UI design and JavaScript",
      heroDescription:
        "I deliver pixel-perfect UI, communicate smoothly with product partners, and care deeply about craft.",
      experiences: [
        {
          company: "H Energy",
          period: "May 2020 - Aug 2022",
          role: "Frontend Engineer",
          summary:
            "Owned the UI for rooftop solar platform Mohaet and VPP forecasting services.",
          details: [
            "Implemented REST API integrations with Pug/Stylus-based UI",
            "Visualized investment and generation data using Chart.js and SVG maps",
            "Built Kakao Map integrations, social sharing, and promotional pages deployed via Firebase",
          ],
        },
        {
          company: "Geeks Family (ICT-glab)",
          period: "Dec 2019 - Apr 2020",
          role: "Frontend Engineer",
          summary:
            "Developed admin dashboards and POS UI for shared kitchen and delivery founders.",
          details: [
            "Created admin UI and analytics pages with JavaScript, jQuery, and SCSS",
            "Delivered Chart.js dashboards for orders and delivery metrics",
            "Collaborated through Jira, Wiki, Slack, and Zeplin with cross-functional partners",
          ],
        },
        {
          company: "Fine Insight (Bestian Hospital)",
          period: "Aug 2016 - Jan 2019",
          role: "UI/UX Designer",
          summary:
            "Designed healthcare information systems, mobile apps, and brand assets.",
          details: [
            "Crafted the UI for burn-care tele-consult app ‘WeePias’",
            "Designed PC/mobile sites for clinical trial and health screening centers",
            "Produced brochures, magazines, and large-format promotional materials",
          ],
        },
      ],
      skillGroups: [
        { title: "Markup", items: ["HTML/CSS", "SCSS", "Pug", "Stylus"] },
        {
          title: "Frontend",
          items: [
            "JavaScript",
            "TypeScript",
            "React",
            "Redux",
            "Redux Toolkit",
            "Vue2",
            "Vue3",
            "jQuery",
          ],
        },
        { title: "Backend", items: ["Node.js", "Python"] },
        {
          title: "Tools",
          items: ["Figma", "Zeplin", "Adobe CC", "Slack", "Jira", "Confluence"],
        },
      ],
      educations: [
        {
          title: "Kookmin University · Industrial Design B.A.",
          period: "Dec 2019 - Apr 2020",
        },
        {
          title: "Soldesk · Java Web Developer Bootcamp",
          period: "May 2019 - Nov 2019",
        },
      ],
      certificates: [
        {
          title: "Engineer Information Processing",
          issuer: "HRD Korea",
          year: "Aug 2019",
        },
        {
          title: "Industrial Engineer Information Processing",
          issuer: "HRD Korea",
          year: "Aug 2019",
        },
      ],
    },
    project: {
      metadata: {
        title: "Projects",
        description:
          "Case studies covering experiment automation, onboarding redesign, and design system ops.",
        openGraph: {
          title: "Haeun Projects",
          description:
            "Explore experiment ops, SaaS onboarding, and design system automation work.",
          type: "article",
        },
      },
      heroTitle: "Defining problems and validating with data",
      heroDescription:
        "Case studies where I shaped hypotheses, designed the experience, and shipped code.",
      projects: [
        {
          title: "Experiment Pipeline Automation",
          year: "2024",
          impact: "+14% conversion",
          summary:
            "Automated growth experiment workflows and tripled the number of tests the team could ship.",
          stack: ["Next.js", "TypeScript", "Design Token", "Zustand"],
        },
        {
          title: "SaaS Onboarding Redesign",
          year: "2023",
          impact: "+28% activation",
          summary:
            "Segmented onboarding journeys and redesigned in-app guides for clarity.",
          stack: ["Figma", "Amplitude", "React", "Storybook"],
        },
        {
          title: "Design System Ops",
          year: "2022",
          impact: "+40% UI consistency",
          summary:
            "Connected token sources to deployment pipelines for real-time updates across surfaces.",
          stack: ["Style Dictionary", "GitHub Actions", "Chromatic"],
        },
      ],
    },
    contact: {
      metadata: {
        title: "Contact",
        description:
          "Reach out for collaborations, coffee chats, or speaking invitations.",
        openGraph: {
          title: "Haeun Contact",
          description: "Preferred contact channels and collaboration styles.",
          type: "website",
        },
      },
      heroTitle: "Let's start the next conversation",
      heroDescription:
        "Project kickoffs, casual chats, and speaking invites all get a reply within a week.",
      channels: [
        { label: "Email", value: "hello@haeun.dev", href: "mailto:hello@haeun.dev" },
        { label: "Slack", value: "haeunpark" },
        {
          label: "LinkedIn",
          value: "linkedin.com/in/haeunpark",
          href: "https://linkedin.com/in/haeunpark",
        },
      ],
    sections: {
      channels: "Direct channels",
      collaboration: "Preferred collaborations",
      form: "Quick intro",
    },
      preferenceIntro: "Best fit with B2B SaaS teams that embrace experimentation.",
      preferences: [
        "Product strategy or design system consulting (4-6 weeks)",
        "Growth experiment planning and delivery",
        "Workshops and team diagnostics",
      ],
      form: {
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        namePlaceholder: "Jane Doe",
        emailPlaceholder: "you@example.com",
        messagePlaceholder: "Share the project context, goals, or timeline.",
        submit: "Send message",
      },
    },
    blog: {
      metadata: {
        title: "Blog",
        description:
          "Notes on experiment culture, design systems, and cross-functional collaboration.",
        openGraph: {
          title: "Haeun Blog",
          description: "Product design and frontend insights from real projects.",
          type: "article",
        },
      },
      heroTitle: "Working notes from real experiments",
      heroDescription:
        "Documenting problems the team faced and the paths we took to solve them.",
      posts: [
        {
          title: "Design handoff tactics that keep experiment velocity high",
          date: "2024-10-28",
          category: "Experiment Ops",
          summary:
            "A workflow that lets squads consume design output faster without losing fidelity.",
        },
        {
          title: "Bridging design-dev with Design Tokens",
          date: "2024-07-12",
          category: "Design System",
          summary:
            "Lessons learned while wiring a token sync pipeline end to end.",
        },
        {
          title: "What the data told us about SaaS onboarding",
          date: "2023-12-03",
          category: "Growth",
          summary:
            "Combining quantitative and qualitative insights to narrow down the real blocker.",
        },
      ],
      dateLocale: "en-US",
      readMoreLabel: "Read article →",
    },
  },
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale] ?? dictionaries.ko;

