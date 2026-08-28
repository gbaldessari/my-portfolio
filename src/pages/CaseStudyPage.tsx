import { Link, Navigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getProjectBySlug, getRelatedProjects } from '../content/projects';
import ProjectCard from '../components/ui/ProjectCard';
import Tag from '../components/ui/Tag';
import Reveal from '../components/ui/Reveal';
import JsonLd from '../components/seo/JsonLd';
import { toAbsoluteUrl } from '../config/site';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { usePageSeo } from '../hooks/usePageSeo';
import { createBreadcrumbSchema, createProjectSchema } from '../seo/jsonLd';
import './page.css';
import '../components/sections/sections.css';

function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const paths = useLocalizedPath();
  const project = slug ? getProjectBySlug(t, slug) : undefined;
  const relatedProjects = slug ? getRelatedProjects(t, slug) : [];

  usePageSeo({
    titleKey: project ? `projects.items.${project.slug}.title` : 'meta.notFound.title',
    descriptionKey: project ? `projects.items.${project.slug}.excerpt` : 'meta.notFound.description',
    ogImage: project?.cover,
    noindex: !project,
  });

  const structuredData = useMemo(() => {
    if (!project) return null;

    const projectPath = paths.project(project.slug);

    return [
      createProjectSchema({
        name: project.title,
        description: project.excerpt,
        url: toAbsoluteUrl(projectPath),
        image: project.cover,
        technologies: project.tags,
      }),
      createBreadcrumbSchema([
        { name: t('nav.home'), url: toAbsoluteUrl(paths.home) },
        { name: t('nav.projects'), url: toAbsoluteUrl(paths.projects) },
        { name: project.shortTitle, url: toAbsoluteUrl(projectPath) },
      ]),
    ];
  }, [project, paths, t]);

  if (!project) {
    return <Navigate to={paths.notFound} replace />;
  }

  return (
    <div className="page">
      <JsonLd data={structuredData} />
      <div className="content-container page-stack">
        <Reveal>
          <section className="case-study-hero">
            <div className="case-study-meta">
              {project.category.map((label) => (
                <Tag key={label} label={label} variant="category" />
              ))}
              <Tag label={project.status} variant="status" tone={project.statusKey} />
            </div>
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
            <p>{project.excerpt}</p>
            <p>{project.description}</p>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <div className="case-study-cover">
            <img src={project.cover} alt={project.shortTitle} />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <section className="case-study-block">
            <h2>{t('caseStudy.problem')}</h2>
            <p>{project.problem}</p>
          </section>
        </Reveal>

        <Reveal delay={120}>
          <section className="case-study-block">
            <h2>{t('caseStudy.solution')}</h2>
            <p>{project.solution}</p>
          </section>
        </Reveal>

        <Reveal delay={140}>
          <section className="case-study-block">
            <h2>{t('caseStudy.result')}</h2>
            <p>{project.result}</p>
            {project.metrics.length > 0 && (
              <ul className="metrics-list">
                {project.metrics.map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            )}
          </section>
        </Reveal>

        <Reveal delay={160}>
          <section className="case-study-block">
            <h2>{t('caseStudy.stack')}</h2>
            <div className="case-study-tags">
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </section>
        </Reveal>

        <div className="case-study-actions">
          <Link to={paths.projects} className="btn btn-secondary">{t('caseStudy.viewAll')}</Link>
          <Link to={paths.contact} className="btn btn-primary">{t('common.contact')}</Link>
        </div>

        {relatedProjects.length > 0 && (
          <Reveal>
            <section className="related-projects">
              <h2>{t('caseStudy.related')}</h2>
              <div className="projects-grid">
                {relatedProjects.map((related) => (
                  <ProjectCard key={related.slug} project={related} />
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </div>
  );
}

export default CaseStudyPage;
