import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/seo/meta";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

const path = "/resume";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return buildLocalizedMetadata(locale, path, dictionary.resume.metadata);
}

export default async function ResumePage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          {dictionary.common.nav.resume}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          {dictionary.resume.heroTitle}
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          {dictionary.resume.heroDescription}
        </p>
      </header>

      <section
        className="space-y-6"
        aria-labelledby="experience-heading"
      >
        <h2 id="experience-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Experience
        </h2>
        {dictionary.resume.experiences.map((exp) => (
          <article
            key={`${exp.company}-${exp.period}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {exp.company}
                </h3>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{exp.role}</p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {exp.period}
              </p>
            </div>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{exp.summary}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-300" role="list">
              {exp.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section
        className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800"
        aria-labelledby="skills-heading"
      >
        <h2 id="skills-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Skills
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {dictionary.resume.skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {group.title}
              </h3>
              <ul
                className="mt-2 flex flex-wrap gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                role="list"
                aria-label={`${group.title} 기술 목록`}
              >
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-600 dark:text-zinc-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        className="grid gap-6 md:grid-cols-2"
        aria-label="교육 및 자격증"
      >
        <div
          className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800"
          aria-labelledby="education-heading"
        >
          <h2 id="education-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Education
          </h2>
          <ul className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-300" role="list">
            {dictionary.resume.educations.map((edu) => (
              <li key={edu.title}>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">{edu.title}</p>
                <time className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {edu.period}
                </time>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800"
          aria-labelledby="certificate-heading"
        >
          <h2 id="certificate-heading" className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Certificate
          </h2>
          <ul className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-300" role="list">
            {dictionary.resume.certificates.map((cert) => (
              <li key={cert.title}>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">{cert.title}</p>
                <p className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  <time>{cert.year}</time> · {cert.issuer}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

