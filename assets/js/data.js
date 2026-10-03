const PORTFOLIO = {
  skills: [
    {
      icon: "frontend",
      title: "Frontend Architecture",
      level: 95,
      summary: "Component systems that survive three years of feature requests without turning into spaghetti.",
      tags: ["React", "TypeScript", "Next.js", "CSS Architecture"],
    },
    {
      icon: "performance",
      title: "Performance",
      level: 92,
      summary: "Core Web Vitals budgets, bundle triage, rendering forensics. Usually the fastest wins are the boring ones.",
      tags: ["Lighthouse", "Web Vitals", "Code Splitting", "Caching"],
    },
    {
      icon: "backend",
      title: "Backend & Data",
      level: 88,
      summary: "APIs, background jobs, and schemas designed so the third year of growth doesn't need a rewrite.",
      tags: ["Node.js", "PostgreSQL", "Redis", "GraphQL"],
    },
    {
      icon: "cloud",
      title: "Cloud & DevOps",
      level: 80,
      summary: "Terraform, containers, and CI pipelines that give a small team the leverage of a large one.",
      tags: ["AWS", "Docker", "Terraform", "GitHub Actions"],
    },
    {
      icon: "a11y",
      title: "Accessibility",
      level: 86,
      summary: "WCAG 2.2 AA as the default, not a retrofit. Keyboard users are users.",
      tags: ["ARIA", "Screen Readers", "Audit", "Inclusive Design"],
    },
    {
      icon: "testing",
      title: "Testing & DX",
      level: 85,
      summary: "Fast suites, typed contracts, and lint rules that argue for me so humans don't have to.",
      tags: ["Vitest", "Playwright", "Testing Library", "ESLint"],
    },
  ],

  projects: [
    {
      title: "Web Sling",
      category: "Dev Tools",
      year: "2026",
      tags: ["TypeScript", "Open Source", "Tooling"],
      summary:
        "A 3KB zero-dependency utility for scroll-linked web-sling animations. Pointer-agnostic, GPU-composited, and 100% tree-shakeable.",
      repo: "https://github.com/brohitech",
      demo: "https://brohitech.github.io",
    },
    {
      title: "Querysmith",
      category: "Backend",
      year: "2025",
      tags: ["Node.js", "PostgreSQL", "Performance"],
      summary:
        "Explains slow Postgres queries in plain English. Parses EXPLAIN ANALYZE output and maps the plan back to the line of code that caused it.",
      repo: "https://github.com/brohitech",
      demo: null,
    },
    {
      title: "Halftone UI",
      category: "Design",
      year: "2025",
      tags: ["React", "CSS", "Design System"],
      summary:
        "A comic-book inspired design system with 40 accessible components. Every token ships with a tested light and dark value.",
      repo: "https://github.com/brohitech",
      demo: "https://brohitech.github.io",
    },
    {
      title: "Contour",
      category: "Dev Tools",
      year: "2024",
      tags: ["Python", "ML", "CLI"],
      summary:
        "Command-line tool that profiles a repo and outputs an ASCII architecture map of its dependency graph and hotspots.",
      repo: "https://github.com/brohitech",
      demo: null,
    },
    {
      title: "Nightwatch",
      category: "Backend",
      year: "2024",
      tags: ["TypeScript", "Observability", "Open Source"],
      summary:
        "Lightweight tracing layer for Node services. One-line setup, OpenTelemetry-compatible, ships under 12KB gzipped.",
      repo: "https://github.com/brohitech",
      demo: null,
    },
    {
      title: "Daily Bugle",
      category: "Frontend",
      year: "2023",
      tags: ["Next.js", "GraphQL", "Full Stack"],
      summary:
        "Full-stack news reader built for speed: statically rendered, incremental static regeneration, sub-second navigation.",
      repo: "https://github.com/brohitech",
      demo: "https://brohitech.github.io",
    },
  ],

  quotes: [
    "With great power there must also come — great responsibility.",
    "Your spider-senses should tingle when something's wrong.",
    "The hardest battles are the ones you fight within yourself.",
    "Anyone can wear the mask. It takes more to be a hero.",
  ],
};
