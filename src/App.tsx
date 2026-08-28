import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AboutPage from './pages/AboutPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="proyectos" element={<ProjectsPage />} />
        <Route path="proyectos/:slug" element={<CaseStudyPage />} />
        <Route path="sobre-mi" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage />} />

        <Route path="en" element={<HomePage />} />
        <Route path="en/projects" element={<ProjectsPage />} />
        <Route path="en/projects/:slug" element={<CaseStudyPage />} />
        <Route path="en/about" element={<AboutPage />} />
        <Route path="en/contact" element={<ContactPage />} />

        <Route path="404" element={<NotFoundPage />} />
        <Route path="en/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
