import { useTranslation } from 'react-i18next';
import { getAllProjects } from '../content/projects';
import ProjectCard from '../components/ui/ProjectCard';
import Reveal from '../components/ui/Reveal';
import { usePageSeo } from '../hooks/usePageSeo';
import './page.css';
import '../components/sections/sections.css';

function ProjectsPage() {
  const { t } = useTranslation();
  usePageSeo({ titleKey: 'meta.projects.title', descriptionKey: 'meta.projects.description' });
  const projects = getAllProjects(t);

  return (
    <div className="page">
      <div className="content-container page-stack">
        <Reveal>
          <section className="page-hero">
            <span className="section-label">{t('projectsPage.label')}</span>
            <h1>{t('projectsPage.title')}</h1>
            <p>{t('projectsPage.intro')}</p>
          </section>
        </Reveal>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
