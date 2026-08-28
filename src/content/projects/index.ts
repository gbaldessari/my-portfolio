import { TFunction } from 'i18next';
import { projectMeta, ProjectCategoryKey } from './meta';
import { Project } from './types';

export type { Project } from './types';

function categoriesOverlap(a: ProjectCategoryKey[], b: ProjectCategoryKey[]): boolean {
  return a.some((category) => b.includes(category));
}

function getProjectFields(t: TFunction, slug: string) {
  const base = `projects.items.${slug}`;
  return {
    title: t(`${base}.title`),
    shortTitle: t(`${base}.shortTitle`),
    subtitle: t(`${base}.subtitle`),
    excerpt: t(`${base}.excerpt`),
    description: t(`${base}.description`),
    problem: t(`${base}.problem`),
    solution: t(`${base}.solution`),
    result: t(`${base}.result`),
    metrics: t(`${base}.metrics`, { returnObjects: true }) as string[],
  };
}

function mapMetaToProject(t: TFunction, meta: (typeof projectMeta)[number]): Project {
  return {
    slug: meta.slug,
    tags: meta.tags,
    cover: meta.cover,
    category: meta.category.map((key) => t(`projects.categories.${key}`)),
    categoryShort: meta.category.map((key) => t(`projects.categoriesShort.${key}`)),
    statusKey: meta.status,
    status: t(`projects.status.${meta.status}`),
    ...getProjectFields(t, meta.slug),
  };
}

export function getAllProjects(t: TFunction): Project[] {
  return projectMeta.map((meta) => mapMetaToProject(t, meta));
}

export function getProjectBySlug(t: TFunction, slug: string): Project | undefined {
  const meta = projectMeta.find((item) => item.slug === slug);
  if (!meta) return undefined;
  return mapMetaToProject(t, meta);
}

export function getRelatedProjects(t: TFunction, slug: string, limit = 2): Project[] {
  const current = projectMeta.find((item) => item.slug === slug);
  if (!current) return getAllProjects(t).slice(0, limit);

  return projectMeta
    .filter((item) => item.slug !== slug && categoriesOverlap(item.category, current.category))
    .slice(0, limit)
    .map((meta) => mapMetaToProject(t, meta));
}
