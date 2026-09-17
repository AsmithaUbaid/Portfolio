import { projects } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { ProjectCaseStudy } from "./ProjectCaseStudy";

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-5xl px-4 py-28 sm:px-6">
      <SectionHeader
        eyebrow="AI Systems"
        title="Not demos — case studies in problem, trade-off, and evaluation."
        description="Each system below covers why AI was the right tool, what I built, how it was evaluated, and the trade-offs behind the design. Click a card to expand."
      />

      <div className="mt-12 space-y-6">
        {projects.map((project, i) => (
          <ProjectCaseStudy key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
