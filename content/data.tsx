export const profile = {
  name: "Masinjaka",
  initials: "MA",
  role: "Mobile, Web & IoT Developer",
  location: "Based in Antananarivo, Madagascar",
  headline: "I build performant Flutter apps and connected digital products.",
  summary:
    "I build cross-platform mobile apps, web applications, and embedded hardware systems. I focus on turning complex ideas into clean, functional products tailored exactly to your needs.",
  email: "amasinjaka@gmail.com",
  whatsapp: {
    label: "wa.me/261346431818",
    href: "https://wa.me/261346431818",
  },
  contactBlurb:
    "Got a real-world problem you need fixed? Let’s build the solution together. Choose the contact option that works best for you:",
  contactFormOption: "Or leave a message in the contact form below.",
};

export const quickFacts = ["4+ years","Mobile & Web", "IoT & Firmware"];

export const proficiencies = {
  groups: [
    {
      title: "Languages",
      items: [
        {
          name: "Dart",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        },
        {
          name: "Java",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        },
        {
          name: "Kotlin",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
        },
        {
          name: "C++",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        },
      ],
    },
    {
      title: "Framework",
      items: [
        {
          name: "Flutter",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
        },
        {
          name: "React Native",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        },
        {
          name: "Expo",
          icon: "https://cdn.simpleicons.org/expo/000020",
        },
        {
          name: "Next.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        },
        {
          name: "FastAPI",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
        },
        {
          name: "Spring Boot",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        },
      ],
    },
    {
      title: "Services & Database",
      items: [
        {
          name: "Supabase",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
        },
        {
          name: "Firebase",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
        },
        {
          name: "PayloadCMS",
          icon: "https://payloadcms.com/favicon.ico",
        },
        {
          name: "PowerSync",
          icon: "https://www.powersync.com/favicon.ico",
        },
        {
          name: "PostgreSQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MongoDB",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        },
        {
          name: "GitHub",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        },
        {
          name: "GitLab",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg",
        },
        {
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        },
        {
          name: "VS Code",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
        },
        {
          name: "GitHub Actions",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg",
        },
        {
          name: "Sentry",
          icon: "https://cdn.simpleicons.org/sentry/362D59",
        },
        {
          name: "Notion",
          icon: "https://cdn.simpleicons.org/notion/000000",
        },
        {
          name: "Figma",
          icon: "https://cdn.simpleicons.org/figma/F24E1E",
        },
        {
          name: "Codex",
          icon: "https://cdn.simpleicons.org/openai/412991",
        },
        {
          name: "Claude",
          icon: "https://cdn.simpleicons.org/anthropic/D97757",
        },
        {
          name: "GitHub Copilot",
          icon: "https://cdn.simpleicons.org/githubcopilot/000000",
        },
      ],
    },
  ],
};

export const platforms = [
  {
    name: "GitHub",
    url: "https://github.com/Masinjaka",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/masinjaka-andrianomentsoa",
  },
  {
    name: "Email",
    url: "mailto:amasinjaka@gmail.com",
  },
];

export const projects = [
  {
    slug: "sekoly-note",
    name: "Gradr",
    subtitle: "A teacher grading app",
    platform: "mobile",
    image: "/images/projects/mobile/sekoly-note.png",
    url: "https://example.com",
    summary:
      "A mobile app for teachers to manage assigned classes, enter student grades, and sync marks back to the school system.",
    objective:
      "Make grade entry practical outside the office by giving teachers a mobile workflow for viewing assigned classes, entering marks by subject and exam session, and syncing results when connectivity is available.",
    year: "2024",
    label: "Client work",
    role: "Flutter app development, offline data handling, and mobile sync implementation",
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "GoRouter",
      "ObjectBox",
      "Firebase",
      "Google Drive API",
      "Mobile Scanner",
      "CSV",
      "Sentry",
    ],
    keyFeatures: [
      "QR-based teacher enrollment and login flow.",
      "Class, student, and subject assignment sync from the school backend.",
      "Grade entry by class, subject, exam session, and period.",
      "Offline local storage for classes, students, subjects, grades, and sync jobs.",
      "Grade push sync back to the school API with synced/unsynced tracking.",
      "CSV and Google Drive import/export support for fallback school data workflows.",
    ],
    status: "Ongoing",
    statusDescription: "",
  },
  {
    slug: "tentron",
    name: "Tentron",
    subtitle: "A wearable companion",
    platform: "mobile",
    image: "/images/projects/mobile/tentron.svg",
    url: "https://example.com",
    summary:
      "Tentron Technologies' official mobile app for connecting wearable devices, streaming motion data, and managing firmware updates.",
    objective:
      "Build a reliable companion app for Tentron wearable hardware, giving users a clear way to discover devices, connect armbands and remotes, collect motion data, and keep firmware update flows accessible from mobile.",
    year: "2024",
    label: "Client work",
    role: "Flutter development, BLE integration, MQTT streaming, and firmware update support",
    stack: [
      "Flutter",
      "Dart",
      "Provider",
      "Flutter Reactive BLE",
      "MQTT",
      "Supabase",
      "Android DFU",
      "C++",
      "HTTP",
      "Connectivity Plus",
    ],
    keyFeatures: [
      "BLE scanning and connection for left armband, right armband, and remote devices.",
      "Motion data collection from accelerometer and gyroscope streams.",
      "MQTT publishing for armband motion data and remote device events.",
      "OTA firmware release lookup and Android DFU update support.",
      "Connected-device screens for discovery, status, and device-specific flows.",
    ],
    status: "Available soon on app stores",
    statusDescription:
      "The mobile app is being prepared for store availability after final release checks.",
  },
  {
    slug: "drala",
    name: "Drala",
    subtitle: "A budgeting app",
    platform: "mobile",
    image: "/images/projects/mobile/drala.png",
    url: "https://example.com",
    repositoryUrl: "https://github.com/Masinjaka/Drala",
    summary:
      "A personal finance app for tracking income, expenses, budgets, savings goals, and monthly reports with offline-first sync.",
    objective:
      "I needed a simple way to track my own expenses, and that personal tool grew into a fuller budgeting app for organizing daily spending, planning goals, and understanding money habits over time.",
    year: "2025",
    role: "Flutter app development, offline-first architecture, and mobile UI implementation",
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "GoRouter",
      "Supabase",
      "PowerSync",
      "Firebase Cloud Messaging",
      "Hive",
      "Sentry",
    ],
    keyFeatures: [
      "Expense and income tracking with categories and subcategories.",
      "Budget planning and savings goal management.",
      "Monthly reports with chart-based summaries.",
      "Offline-first local caching with deferred sync back to Supabase.",
      "Currency selection using synced exchange rates.",
      "Budget warnings and daily reminder notifications.",
    ],
    status: "Available soon on app stores",
    statusDescription: "",
  },
  {
    slug: "rohy",
    name: "Rohy",
    subtitle: "A bookmarking and link vault app",
    platform: "mobile",
    image: "/images/projects/mobile/rohy.svg",
    url: "https://example.com",
    repositoryUrl: "https://github.com/Masinjaka/Links",
    summary:
      "A link vault app for saving, previewing, organizing, and revisiting useful links through a local-first Flutter experience.",
    objective:
      "Create a focused place to keep important links from getting lost across chats, browser tabs, and scattered notes, while making saved resources easier to search, group, and reopen later.",
    year: "2026",
    role: "Flutter app development, local database architecture, and mobile UI implementation",
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "GoRouter",
      "Drift",
      "Dio",
      "Cached Network Image",
      "Share Plus",
      "URL Launcher",
    ],
    keyFeatures: [
      "Save links with normalized URLs, titles, domains, descriptions, preview images, favicons, and reading-time metadata.",
      "Generate AI summaries to make saved links easier to review later.",
      "Organize saved links with tags and custom collections.",
      "Browse a main link feed with search, filters, and archive support.",
      "View link details with preview panels and quick actions for opening or sharing saved resources.",
    ],
    status: "Ongoing",
    statusDescription: "",
  },
  {
    slug: "gasydia",
    name: "GasyDia",
    subtitle: "Car rental - Driver and guide service",
    platform: "web",
    image: "/images/projects/web/gasydia-logo.svg",
    url: "https://www.gasydia.com/",
    summary:
      "A web experience for a car rental, driver, and guide service, built around clear travel storytelling and service discovery.",
    objective:
      "Present car rental, driver, and guide services through a responsive web experience that makes travel options easy to discover and compare.",
    year: "2026",
    label: "Client work",
    role: "Web design and frontend implementation",
    stack: [
      "Java",
      "Spring Boot",
      "Thymeleaf",
      "Spring Data JPA",
      "PostgreSQL",
      "Bootstrap",
      "jQuery",
      "Maven",
    ],
    keyFeatures: [
      "Responsive web layout for wide travel and service imagery.",
      "Clear service sections for quick scanning.",
      "Simple navigation for rental, driver, and guide discovery.",
    ],
    status: "Ongoing",
    statusDescription:
      "The website is still in progress and will be available soon.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const experience = [
  {
    period: "2024—2026",
    role: "Mobile Developer",
    company: "Exponent",
    location: "Switzerland",
    workMode: "remote",
    summary:
      "Developing and deploying mobile applications, collaborating with design, backend, and product teams, optimizing existing apps for rendering performance and responsiveness, and managing release workflows for iOS and Android stores.",
  },
  {
    period: "2022—2024",
    role: "Mobile & IoT Developer",
    company: "Tentron Technologies",
    location: "United States",
    workMode: "remote",
    summary:
      "Built cross-platform Flutter applications for controlling and monitoring the company’s IoT solutions, while contributing firmware for reliable connected-device operation.",
  },
  {
    period: "2022—2023",
    role: "Software & IoT Developer",
    company: "Smart Teknolojia",
    location: "Fianarantsoa",
    workMode: "on-site",
    summary:
      "Led development of internal desktop tools and maintained firmware for IoT devices, improving team productivity and device reliability.",
  },
];

export const writing = [
  {
    year: "2026",
    title: "Keeping a portfolio honest",
    description:
      "A note on writing case studies that explain decisions instead of only presenting polished outcomes.",
  },
  {
    year: "2025",
    title: "Simple interfaces age better",
    description:
      "Thoughts on why reduced visual noise usually improves both usability and long-term maintainability.",
  },
];
