import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';
import { redirectHomeToEnglishIfNeeded } from './i18n/localePreference';
import './index.css';

if (!redirectHomeToEnglishIfNeeded()) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>,
  );
}
