import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { IndexPage } from '../pages/IndexPage';
import { AutomationsPage } from '../pages/AutomationsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<IndexPage />} />
        <Route path="/automations" element={<AutomationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
