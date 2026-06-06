import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/data";
import { getLocalizedProjectBySlug } from "@/content/localized";
import { getCurrentLocale, getMessages } from "@/lib/i18n";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.5 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.97c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const project = getLocalizedProjectBySlug(locale, slug);
  const messages = getMessages(locale).projectDetail;

  if (!project) {
    return {
      title: messages.notFound,
    };
  }

  return {
    title: `${project.name} | ${messages.titleSuffix}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const project = getLocalizedProjectBySlug(locale, slug);
  const messages = getMessages(locale).projectDetail;

  if (!project) {
    notFound();
  }

  const isClientWork = "label" in project && Boolean(project.label);
  const isReady = project.status === "Ready" || project.status === "Disponible";
  const repositoryUrl =
    "repositoryUrl" in project ? project.repositoryUrl : undefined;

  return (
    <main className="container pb-24 pt-20 sm:pt-28">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-base font-medium text-black no-underline dark:text-zinc-100"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        {messages.back}
      </Link>

      <section className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <Image
            src={project.image}
            alt={`${project.name} project image`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 32rem, 100vw"
            priority
          />
        </div>

        <div>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-500 sm:text-base">
            {project.platform} / {project.year}
            {"label" in project ? ` / ${project.label}` : ""}
          </p>
          <h1 className="mt-4 text-5xl font-medium tracking-[-0.05em] text-black dark:text-zinc-50 sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-3xl text-2xl leading-10 text-black dark:text-zinc-300">
            {project.summary}
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-medium text-black dark:text-zinc-50">
              {messages.objective}
            </h2>
            <p className="mt-3 max-w-3xl">{project.objective}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-medium text-black dark:text-zinc-50">
              {messages.keyFeatures}
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              {project.keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div
            className={`mt-10 grid gap-8 ${
              isClientWork ? "" : "sm:grid-cols-2"
            }`}
          >
            <div>
              <h2 className="text-2xl font-medium text-black dark:text-zinc-50">
                {messages.techStack}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-base text-black dark:border-zinc-800 dark:text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {!isClientWork ? (
              <div>
                <h2 className="text-2xl font-medium text-black dark:text-zinc-50">
                  {messages.status}
                </h2>
                <p className="mt-3 font-semibold text-black dark:text-zinc-100">
                  {project.status}
                </p>
                {project.statusDescription ? (
                  <p className="mt-2">{project.statusDescription}</p>
                ) : null}
              </div>
            ) : null}
          </div>

          {repositoryUrl || isReady ? (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {repositoryUrl ? (
                <a
                  href={repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-5 py-3 text-base font-semibold text-white no-underline transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-200/70 dark:border-zinc-100 dark:bg-zinc-100 dark:text-black dark:hover:shadow-black/30"
                >
                  <GitHubIcon />
                  {messages.repository}
                </a>
              ) : null}
              {isReady ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-2xl font-medium tracking-[-0.03em] text-black dark:text-zinc-50"
                >
                  {messages.visit}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
