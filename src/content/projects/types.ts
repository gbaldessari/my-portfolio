import { ProjectStatusKey } from './meta';

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: string[];
  categoryShort: string[];
  status: string;
  statusKey: ProjectStatusKey;
  tags: string[];
  cover: string;
  excerpt: string;
  description: string;
  metrics: string[];
  problem: string;
  solution: string;
  result: string;
  liveUrl?: string;
}
