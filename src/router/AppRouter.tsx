import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IndexPage } from '../pages/IndexPage';
import { AutomationsPage } from '../pages/AutomationsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/automations" element={<AutomationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
