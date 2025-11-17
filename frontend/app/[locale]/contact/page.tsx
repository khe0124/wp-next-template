import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/seo/meta";

type PageProps = {
  params: { locale: Locale };
};

const path = "/contact";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;
  const dictionary = await getDictionary(locale);

  return buildLocalizedMetadata(locale, path, dictionary.contact.metadata);
}

export default async function ContactPage({ params }: PageProps) {
  const dictionary = await getDictionary(params.locale);

  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm font-semibold text-zinc-500">
          {dictionary.common.nav.contact}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900">
          {dictionary.contact.heroTitle}
        </h1>
        <p className="mt-3 text-base text-zinc-600">
          {dictionary.contact.heroDescription}
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            {dictionary.contact.sections.channels}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            {dictionary.contact.channels.map((channel) => (
              <li key={channel.label}>
                {channel.label}:{" "}
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="font-semibold text-zinc-900 underline-offset-2 hover:underline"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <span className="font-semibold text-zinc-900">
                    {channel.value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            {dictionary.contact.sections.collaboration}
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            {dictionary.contact.preferenceIntro}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-600">
            {dictionary.contact.preferences.map((pref) => (
              <li key={pref}>{pref}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          {dictionary.contact.sections.form}
        </h2>
        <form className="mt-4 grid gap-4 text-sm">
          <label className="space-y-2">
            <span className="font-medium text-zinc-700">
              {dictionary.contact.form.nameLabel}
            </span>
            <input
              type="text"
              placeholder={dictionary.contact.form.namePlaceholder}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-zinc-900 focus:outline-none"
            />
          </label>
          <label className="space-y-2">
            <span className="font-medium text-zinc-700">
              {dictionary.contact.form.emailLabel}
            </span>
            <input
              type="email"
              placeholder={dictionary.contact.form.emailPlaceholder}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-zinc-900 focus:outline-none"
            />
          </label>
          <label className="space-y-2">
            <span className="font-medium text-zinc-700">
              {dictionary.contact.form.messageLabel}
            </span>
            <textarea
              rows={4}
              placeholder={dictionary.contact.form.messagePlaceholder}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-zinc-900 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            {dictionary.contact.form.submit}
          </button>
        </form>
      </section>
    </div>
  );
}

