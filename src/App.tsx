import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ROUTE_PATHS } from './routes';
import Layout from './components/Layout';
import NotFoundPage from './pages/NotFound';
import AboutPage from './components/AboutPage';
import DetailsPage from './pages/DetailsPage';

export default function App() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.HOME} element={<Layout />}>
        <Route path={ROUTE_PATHS.HOME} element={<HomePage />}>
          <Route path={ROUTE_PATHS.DETAILS} element={<DetailsPage />} />
        </Route>
        <Route path={ROUTE_PATHS.ABOUT} element={<AboutPage />} />
        <Route path={ROUTE_PATHS.NOTFOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
