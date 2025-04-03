import { Routes, Route } from 'react-router-dom';
import SecretPage from './pages/SecretPage';
import MainPage from './pages/MainPage';

/**
 * Componente principal de la aplicación.
 * Define las rutas principales de la aplicación.
 */
function App() {
  return (
    <Routes>
      {/* Ruta principal */}
      <Route path='/' element={<MainPage />} />
      {/* Ruta para la página secreta */}
      <Route path='/secret' element={<SecretPage />} />
    </Routes>
  );
}

export default App;
