import { Mail, Linkedin, FileDown, MapPin } from "lucide-react";
import { profile, experience, projects, skillClusters } from "@/lib/data";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

const topProjects = projects.filter((p) => p.featured).concat(projects.filter((p) => !p.featured)).slice(0, 3);
const allSkills = skillClusters.flatMap((c) => c.skills);

export function RecruiterView() {
  return (
    <section className="relative mx-auto max-w-4xl px-4 pb-28 pt-40 sm:px-6">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-foreground-muted">
          <MapPin size={12} className="text-accent-cyan" />
          Recruiter View — condensed for fast scanning
        </span>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-1 text-base font-medium text-accent-blue">{profile.tagline}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-muted">
          {profile.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <MagneticButton
            href={profile.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            <FileDown size={15} /> Resume
          </MagneticButton>
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-surface-border px-5 py-2.5 text-sm font-medium text-foreground"
          >
            <Mail size={15} /> {profile.email}
          </MagneticButton>
          <MagneticButton
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-surface-border px-5 py-2.5 text-sm font-medium text-foreground"
          >
            <Linkedin size={15} /> LinkedIn
          </MagneticButton>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-14">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-accent-blue">Experience</h2>
        <div className="mt-4 space-y-3">
          {experience.map((e) => (
            <div key={e.role + e.start} className="glass rounded-xl px-5 py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {e.role} · <span className="text-accent-blue">{e.company}</span>
                </span>
                <span className="text-xs text-foreground-subtle">
                  {e.start} – {e.end}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{e.summary}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-14">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-accent-blue">
          Strongest AI Systems
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {topProjects.map((p) => (
            <div key={p.slug} className="glass rounded-xl p-4">
              <h3 className="text-sm font-semibold leading-snug text-foreground">{p.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{p.oneLiner}</p>
              <p className="mt-3 text-xs font-medium text-accent-cyan">{p.result}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-14">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-accent-blue">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {allSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-surface-border px-2.5 py-1 text-xs text-foreground-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
