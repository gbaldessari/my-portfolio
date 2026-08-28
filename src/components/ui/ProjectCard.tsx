import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Project } from '../../content/projects/types';
import { useLocalizedPath } from '../../hooks/useLocalizedPath';
import Tag from './Tag';
import './project-card.css';

interface ProjectCardProps {
  project: Project;
  variant?: 'grid' | 'featured';
}

function ProjectCard({ project, variant = 'grid' }: ProjectCardProps) {
  const { t } = useTranslation();
  const paths = useLocalizedPath();

  return (
    <article className={`project-card-link${variant === 'featured' ? ' project-card-link--featured' : ''}`}>
      <Link to={paths.project(project.slug)} className="project-card-inner">
        <div className="project-card-image">
          <img
            src={project.cover}
            alt={project.shortTitle}
            loading="lazy"
            width={1600}
            height={500}
          />
        </div>
        <div className="project-card-body">
          <div className="project-card-meta">
            <div className="project-card-categories">
              {project.categoryShort.map((label) => (
                <Tag key={label} label={label} variant="category" />
              ))}
            </div>
            <Tag
              label={project.status}
              variant="status"
              tone={project.statusKey}
              className="project-card-status"
            />
          </div>
          <h2 className="project-card-title">{project.shortTitle}</h2>
          <p className="project-card-excerpt">{project.excerpt}</p>
          <p className="project-card-outcome">{project.metrics[0] ?? ''}</p>
          <span className="project-card-cta">{t('common.viewCaseStudy')}</span>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
