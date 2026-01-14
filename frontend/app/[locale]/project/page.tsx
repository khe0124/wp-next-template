import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/seo/meta";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

const path = "/project";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return buildLocalizedMetadata(locale, path, dictionary.project.metadata);
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          {dictionary.common.nav.project}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          {dictionary.project.heroTitle}
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          {dictionary.project.heroDescription}
        </p>
      </header>

      <section
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        aria-label="프로젝트 목록"
      >
        {dictionary.project.projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 shadow-sm transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:shadow-zinc-900/50 dark:hover:border-zinc-700 dark:hover:shadow-zinc-800/50"
            style={{
              backgroundColor: "var(--card-bg)",
            }}
          >
            {/* 섬네일 이미지 영역 */}
            <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} 프로젝트 썸네일`}
                  width={400}
                  height={192}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  aria-label={`${project.title} 썸네일 없음`}
                >
                  <div className="text-center">
                    <div
                      className="mx-auto mb-2 h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700"
                      aria-hidden="true"
                    />
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      {project.year}
                    </p>
                  </div>
                </div>
              )}
              <div
                className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-black/40"
                aria-hidden="true"
              />
            </div>

            {/* 카드 내용 */}
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {project.period || project.year}
                </p>
                <h2
                  className="mt-2 text-xl font-semibold leading-tight transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                  style={{
                    color: "var(--heading-color, rgb(24 24 27))",
                  }}
                >
                  {project.title}
                </h2>
              </div>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {project.summary}
              </p>

              {project.stack && project.stack.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {dictionary.project.projects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            아직 등록된 프로젝트가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
