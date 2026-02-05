import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { IndexPage } from '../pages/IndexPage';
import { AutomationsPage } from '../pages/AutomationsPage';
import { ChecklistPage } from '../pages/ChecklistPage';
import { OperationsPage } from '../pages/OperationsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LIVE: Slides-based landing page */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/automations" element={<AutomationsPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/operations" element={<OperationsPage />} />

        {/*
          ⚠️ WIP - NOT PRODUCTION READY ⚠️
          HomePage (Framer design) - DO NOT make this "/" until design is complete
          Preview at: /home-preview
        */}
        <Route path="/home-preview" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
