import { getCollection, type CollectionEntry } from "astro:content";

const visible = (entry: { data: { draft?: boolean } }) =>
  import.meta.env.DEV || !entry.data.draft;

export async function getProjects(): Promise<CollectionEntry<"projects">[]> {
  const projects = await getCollection("projects", visible);
  return projects.sort(
    (a, b) => a.data.order - b.data.order || b.data.year - a.data.year,
  );
}

export async function getFeaturedProjects(limit = 3) {
  const projects = await getProjects();
  return projects.filter((project) => project.data.featured).slice(0, limit);
}

export async function getProject(id: string) {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export async function getWriting(): Promise<CollectionEntry<"writing">[]> {
  const writing = await getCollection("writing", visible);
  return writing.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

export async function getWritingEntry(id: string) {
  const writing = await getWriting();
  return writing.find((entry) => entry.id === id);
}

export async function getExperience() {
  const experience = await getCollection("experience");
  return experience.sort((a, b) => a.data.order - b.data.order);
}

export async function getServices() {
  const services = await getCollection("services");
  return services.sort((a, b) => a.data.order - b.data.order);
}

export async function getSkillGroups() {
  const groups = await getCollection("skills");
  return groups.sort((a, b) => a.data.order - b.data.order);
}

export async function getEducation() {
  const education = await getCollection("education");
  return education.sort((a, b) => a.data.order - b.data.order);
}

export async function getLanguages() {
  const languages = await getCollection("languages");
  return languages.sort((a, b) => a.data.order - b.data.order);
}

export async function getFaq(limit?: number) {
  const faq = await getCollection("faq");
  const sorted = faq.sort((a, b) => a.data.order - b.data.order);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}
