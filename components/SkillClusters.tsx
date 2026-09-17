import { skillClusters } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { Stagger, StaggerItem } from "./Reveal";

export function SkillClusters() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="Skills"
        title="Grouped by what they're for, not scored out of 100."
        description="Skills prioritized for Applied AI, LLM/GenAI, and production-engineering roles."
      />

      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillClusters.map((cluster) => (
          <StaggerItem key={cluster.label}>
            <div className="glass h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-sm font-semibold text-foreground">{cluster.label}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {cluster.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-surface-border bg-background/40 px-2.5 py-1 text-xs text-foreground-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
