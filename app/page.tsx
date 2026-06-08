import Image from "next/image";
import Link from "next/link";
import { ContentBar } from "@/components/content_bar";
import { ContactForm } from "@/components/contact-form";
import profilePhoto from "@/public/images/nobacks.png";
import { StackGroup } from "@/components/stack-group";
import { getPortfolioContent } from "@/content/localized";
import { getCurrentLocale, getMessages } from "@/lib/i18n";

type PortfolioContent = ReturnType<typeof getPortfolioContent>;
type HomeMessages = ReturnType<typeof getMessages>["home"];

const githubUrl = "https://github.com/Masinjaka";
const linkedInUrl = "https://linkedin.com/in/masinjaka-andrianomentsoa";

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.5 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.97c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.68H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.33 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.55V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function StickySection({
  title,
  id,
  variant = "default",
  radius = "auto",
  children,
}: {
  title: string;
  id: string;
  variant?: "default" | "alternate";
  radius?: "auto" | "top-right";
  children: React.ReactNode;
}) {
  const backdropClassName =
    variant === "alternate"
      ? "seera-grain-surface seera-grain-surface-white scroll-mt-24 transition-colors"
      : "seera-grain-surface seera-grain-surface-muted scroll-mt-24 transition-colors";
  const radiusClassName =
    variant === "alternate"
      ? "rounded-l-[2.5rem] sm:rounded-l-[4rem]"
      : radius === "top-right"
        ? "rounded-tr-[2.5rem] sm:rounded-tr-[4rem]"
        : "rounded-r-[2.5rem] sm:rounded-r-[4rem]";
  const sectionClassName =
    variant === "alternate"
      ? `seera-grain-surface seera-grain-surface-muted py-8 transition-colors sm:py-10 ${radiusClassName}`
      : `seera-grain-surface seera-grain-surface-white py-8 transition-colors sm:py-10 ${radiusClassName}`;

  return (
    <section className={backdropClassName} id={id}>
      <div className={sectionClassName}>
        <div className="container">
          <div className="split-section">
            <div className="h-fit lg:sticky lg:top-[5.25rem] lg:self-start">
              <p className="w-fit text-base font-semibold tracking-[-0.02em] text-black dark:text-zinc-50 sm:text-xl lg:text-2xl">
                {title}
              </p>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro({
  profile,
  quickFacts,
  introPrefix,
}: {
  profile: PortfolioContent["profile"];
  quickFacts: PortfolioContent["quickFacts"];
  introPrefix: string;
}) {
  // Adjust hero spacing here. The responsive classes override from left to right:
  // base -> sm (640px+) -> lg (1024px+).
  const heroTopSpacing = "pt-18 sm:pt-25 lg:pt-20";
  const heroBottomSpacing = "pb-18 sm:pb-25 lg:pb-20";

  return (
    <section
      className="seera-grain-surface seera-grain-surface-muted transition-colors"
      id="presentation"
    >
      <div
        className={`seera-grain-surface seera-grain-surface-white rounded-br-[2.5rem] transition-colors sm:rounded-br-[4rem] ${heroTopSpacing} ${heroBottomSpacing}`}
      >
        <div className="container grid gap-12 sm:gap-16 lg:grid-cols-[8.75rem_1fr] lg:items-start lg:gap-24">
          <div className="max-w-4xl lg:order-last">
            <h1 className="text-xl font-semibold tracking-[-0.02em] text-black dark:text-zinc-50 sm:text-2xl lg:text-3xl">
              {introPrefix} {profile.name}
            </h1>
            <p className="mt-4 text-xl font-medium text-black dark:text-zinc-100">
              {profile.role}
            </p>
            <p className="mt-6 max-w-3xl whitespace-pre-line">
              {profile.summary}
            </p>
            <ContentBar items={quickFacts} />
          </div>
          <div className="order-first lg:order-first">
            <div className="relative isolate h-[9rem] w-[9rem] max-w-full sm:h-[18rem] sm:w-[12rem] lg:h-[15rem] lg:w-[10rem]">
              {/*
            <div
              aria-hidden="true"
              className="absolute -inset-4 translate-x-2 translate-y-2.5 overflow-hidden rounded-full opacity-30 blur-2xl saturate-115 dark:opacity-25 sm:rounded-[2.5rem]"
            >
              <Image
                src={profilePhoto}
                alt=""
                fill
                className="scale-[1.08] object-cover"
                sizes="(min-width: 1024px) 18rem, 12rem"
              />
            </div>
            */}
              <div className="relative z-10 h-full overflow-hidden rounded-full border border-black/5 bg-white shadow-2xl shadow-zinc-300/40 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40 sm:rounded-[2rem]">
                <Image
                  src={profilePhoto}
                  alt={`${profile.name} profile picture`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 10rem, 100vw"
                  placeholder="blur"
                  priority
                />
              </div>
            </div>
            <div className="mt-5 flex w-[9rem] max-w-full items-center justify-center gap-3 sm:w-[12rem] lg:w-[10rem]">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white text-black no-underline shadow-sm shadow-zinc-200/60 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:no-underline hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:shadow-black/25 dark:hover:border-zinc-500"
              >
                <GitHubIcon />
              </a>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white text-black no-underline shadow-sm shadow-zinc-200/60 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:no-underline hover:shadow-md dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:shadow-black/25 dark:hover:border-zinc-500"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Work({
  experience,
  title,
}: {
  experience: PortfolioContent["experience"];
  title: string;
}) {
  const jobTitleClassName =
    "text-xl font-medium tracking-[-0.03em]";

  return (
    <StickySection id="work" title={title} variant="alternate">
      <div>
        {experience.map((item) => (
          <article
            key={`${item.company}-${item.role}`}
            className="border-b border-zinc-200 py-6 first:pt-0 last:border-b-0 last:pb-0 dark:border-zinc-800"
          >
            <div>
              <h2 className={jobTitleClassName}>
                {item.role} <span className="text-zinc-400 dark:text-zinc-500">@</span>{" "}
                {item.company}
              </h2>
              <p className="mt-2 text-base font-semibold leading-7 text-zinc-500 dark:text-zinc-400">
                {item.period} · {item.location} · {item.workMode}
              </p>
              <p className="mt-2">{item.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </StickySection>
  );
}

function Stack({
  proficiencies,
  title,
}: {
  proficiencies: PortfolioContent["proficiencies"];
  title: string;
}) {
  return (
    <StickySection id="stack" title={title}>
      <div>
        {proficiencies.groups.map((group, index) => (
          <StackGroup
            key={index}
            storageKey={`stack-group-${index}`}
            title={group.title}
            items={group.items}
          />
        ))}
      </div>
    </StickySection>
  );
}

function Projects({
  projects,
  messages,
}: {
  projects: PortfolioContent["projects"];
  messages: HomeMessages;
}) {
  const projectCardSize = "h-20 w-full max-w-full sm:w-auto";
  const projectImageSize = "w-20";
  const projectPanelSize = "min-w-0 flex-1 sm:w-40 sm:flex-none";
  const projectGroups = [
    {
      title: messages.projectGroups.mobile,
      items: projects.filter((project) => project.platform === "mobile"),
    },
    {
      title: messages.projectGroups.web,
      items: projects.filter((project) => project.platform === "web"),
    },
  ];

  return (
    <StickySection id="projects" title={messages.sections.projects} variant="alternate">
      <div>
        {projectGroups.map((group, index) => (
          <div
            key={group.title}
            className={index > 0 ? "pt-8" : ""}
          >
            <h2 className="text-xl font-medium tracking-[-0.03em] text-black dark:text-zinc-50">
              {group.title}
            </h2>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5 sm:justify-start sm:gap-3">
              {group.items.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  aria-label={messages.projects.viewProjectDetails.replace(
                    "{name}",
                    project.name
                  )}
                  className={`group relative flex ${projectCardSize} min-w-0 items-center justify-start overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 no-underline shadow-zinc-200/0 transition-[border-color,box-shadow] hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/70 focus-visible:border-zinc-300 focus-visible:shadow-xl focus-visible:shadow-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-950/80 dark:hover:border-zinc-700 dark:hover:shadow-black/30 dark:focus-visible:border-zinc-700 dark:focus-visible:shadow-black/30`}
                >
                  <span
                    className={`relative h-full ${projectImageSize} shrink-0 overflow-hidden rounded-2xl bg-white p-2 dark:bg-zinc-950`}
                  >
                    <span className="relative block h-full w-full overflow-hidden rounded-lg">
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="5rem"
                      />
                    </span>
                  </span>
                  <span
                    className={`pointer-events-none relative flex h-full ${projectPanelSize} flex-col items-start justify-center overflow-hidden py-2 pl-2.5 pr-3 sm:py-2 sm:pr-3`}
                  >
                    <span className="flex w-full flex-col justify-center sm:transition sm:duration-200 sm:group-hover:-translate-y-1 sm:group-hover:opacity-0 sm:group-focus-visible:-translate-y-1 sm:group-focus-visible:opacity-0">
                      <span className="block text-[0.875rem] font-semibold leading-5 tracking-[-0.02em] text-black dark:text-zinc-50 sm:text-[0.9375rem]">
                        {project.name}
                      </span>
                      <span className="mt-1.5 flex min-w-0 items-center justify-between gap-2">
                        <span className="min-w-0 flex-1 text-xs leading-4 text-zinc-700 dark:text-zinc-300">
                          {project.subtitle}
                        </span>
                          <span
                            aria-hidden="true"
                            className="inline-flex shrink-0 items-center justify-center rounded-full border border-black px-2 py-0.5 text-[0.625rem] font-semibold leading-4 text-black dark:border-zinc-100 dark:text-zinc-100 sm:hidden"
                          >
                            {messages.projects.viewDetails}
                          </span>
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute left-2.5 top-1/2 hidden w-fit -translate-y-[calc(50%-0.25rem)] items-center justify-center rounded-full border border-black px-3 py-1 text-[0.6875rem] font-semibold leading-4 text-black opacity-0 transition duration-200 dark:border-zinc-100 dark:text-zinc-100 sm:inline-flex sm:group-hover:-translate-y-1/2 sm:group-hover:opacity-100 sm:group-focus-visible:-translate-y-1/2 sm:group-focus-visible:opacity-100"
                    >
                      {messages.projects.viewDetails}
                    </span>
                  </span>
                  <span className="sr-only">{project.name}</span>
                </Link>
              ))}
            </div>
            <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800" />
          </div>
        ))}
      </div>
    </StickySection>
  );
}

function Contact({
  profile,
  title,
}: {
  profile: PortfolioContent["profile"];
  title: string;
}) {
  return (
    <StickySection id="contact" title={title} radius="top-right">
      <div>
        <p className="max-w-2xl">
          {profile.contactBlurb.opening}{" "}
          <strong className="font-bold text-black dark:text-zinc-50">
            {profile.contactBlurb.emphasis}
          </strong>
          <span className="mt-4 block">{profile.contactBlurb.prompt}</span>
        </p>
        <ul className="mt-8 flex list-none flex-wrap items-center gap-x-8 gap-y-5 p-0">
          <li>
            <a
              href={profile.whatsapp.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-black dark:text-zinc-50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white p-2.5 shadow-sm shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
                <Image
                  src="https://cdn.simpleicons.org/whatsapp/25D366"
                  alt=""
                  width={26}
                  height={26}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </span>
              <span>{profile.whatsapp.label}</span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 text-black dark:text-zinc-50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white p-2.5 shadow-sm shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
                <Image
                  src="https://cdn.simpleicons.org/gmail/EA4335"
                  alt=""
                  width={26}
                  height={26}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </span>
              <span>{profile.email}</span>
            </a>
          </li>
          <li className="basis-full pt-2">{profile.contactFormOption}</li>
        </ul>
        <ContactForm />
      </div>
    </StickySection>
  );
}

export default async function Home() {
  const locale = await getCurrentLocale();
  const content = getPortfolioContent(locale);
  const messages = getMessages(locale).home;

  return (
    <main className="flex flex-col pb-20">
      <Intro
        profile={content.profile}
        quickFacts={content.quickFacts}
        introPrefix={messages.introPrefix}
      />
      <Work
        experience={content.experience}
        title={messages.sections.work}
      />
      <Stack
        proficiencies={content.proficiencies}
        title={messages.sections.stack}
      />
      <Projects projects={content.projects} messages={messages} />
      <Contact profile={content.profile} title={messages.sections.contact} />
    </main>
  );
}
