import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ROUTE_PATHS } from './routes';

export default function App() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
    </Routes>
  );
}
