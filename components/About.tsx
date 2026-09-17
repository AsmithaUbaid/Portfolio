import { GraduationCap, Award, BadgeCheck, BookOpen } from "lucide-react";
import { education, publications, awards, certifications, profile } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <SectionHeader
        eyebrow="About"
        title="Grounded in systems engineering, specializing in applied AI."
        description={profile.summary}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-blue">
            <GraduationCap size={14} />
            Education
          </div>
          <div className="mt-4 space-y-4">
            {education.map((e) => (
              <div key={e.school} className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{e.degree}</h3>
                  <span className="text-xs text-foreground-subtle">
                    {e.start} – {e.end}
                  </span>
                </div>
                <p className="mt-1 text-sm text-accent-blue">{e.school}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{e.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-blue">
            <BadgeCheck size={14} />
            Certifications
          </div>
          <div className="mt-4 space-y-3">
            {certifications.map((c) => (
              <div
                key={c.title}
                className="flex items-center justify-between rounded-2xl border border-surface-border px-5 py-4"
              >
                <span className="text-sm font-medium text-foreground">{c.title}</span>
                <span className="text-xs text-foreground-subtle">{c.period}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-blue">
            <BookOpen size={14} />
            Publications
          </div>
          <Stagger className="mt-4 space-y-3">
            {publications.map((p) => (
              <StaggerItem key={p.title}>
                <div className="glass rounded-2xl p-5">
                  <p className="text-sm font-medium leading-snug text-foreground">{p.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-surface-border px-2.5 py-0.5 text-xs text-foreground-muted">
                      {p.venue}
                    </span>
                    {p.note && (
                      <span className="rounded-full bg-accent-cyan/15 px-2.5 py-0.5 text-xs font-medium text-accent-cyan">
                        {p.note}
                      </span>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent-blue">
            <Award size={14} />
            Awards
          </div>
          <div className="mt-4 space-y-3">
            {awards.map((a) => (
              <div key={a.title} className="rounded-2xl border border-surface-border px-5 py-4">
                <p className="text-sm font-medium text-foreground">{a.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{a.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
