import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/seo/meta";

type PageProps = {
  params: { locale: Locale };
};

const path = "/project";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;
  const dictionary = await getDictionary(locale);

  return buildLocalizedMetadata(locale, path, dictionary.project.metadata);
}

export default async function ProjectPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold text-zinc-500">
          {dictionary.common.nav.project}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900">
          {dictionary.project.heroTitle}
        </h1>
        <p className="mt-3 text-base text-zinc-600">
          {dictionary.project.heroDescription}
        </p>
      </header>

      <section className="space-y-6">
        {dictionary.project.projects.map((project) => (
          <article
            key={project.title}
            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  {project.year}
                </p>
                <h2 className="text-2xl font-semibold text-zinc-900">
                  {project.title}
                </h2>
              </div>
              <span className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">
                {project.impact}
              </span>
            </div>
            <p className="mt-4 text-sm text-zinc-600">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-zinc-500">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-zinc-200 px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

