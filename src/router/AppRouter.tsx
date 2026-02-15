import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DemoPage } from '../pages/DemoPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
