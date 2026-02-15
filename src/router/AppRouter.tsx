import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AutomationsPage } from '../pages/AutomationsPage';
import { ChecklistPage } from '../pages/ChecklistPage';
import { OperationsPage } from '../pages/OperationsPage';
import { DemoPage } from '../pages/DemoPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LIVE: Operations page as home */}
        <Route path="/" element={<OperationsPage />} />
        <Route path="/automations" element={<AutomationsPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/demo" element={<DemoPage />} />

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
