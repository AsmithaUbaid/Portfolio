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

      <Stagger className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillClusters.map((cluster) => (
          <StaggerItem key={cluster.label}>
            <div className="border-t border-surface-border pt-4">
              <h3 className="text-sm font-semibold text-foreground">{cluster.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {cluster.skills.join(" · ")}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
