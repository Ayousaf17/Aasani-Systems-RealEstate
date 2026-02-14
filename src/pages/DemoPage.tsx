import { useState, lazy, Suspense, useCallback } from 'react';
import { DemoLayout } from '../components/demo/DemoLayout';

const SystemOverview = lazy(() => import('../components/demo/SystemOverview').then(m => ({ default: m.SystemOverview })));
const SystemLeadResponse = lazy(() => import('../components/demo/SystemLeadResponse').then(m => ({ default: m.SystemLeadResponse })));
const SystemLeadScoring = lazy(() => import('../components/demo/SystemLeadScoring').then(m => ({ default: m.SystemLeadScoring })));
const SystemCrmFollowUp = lazy(() => import('../components/demo/SystemCrmFollowUp').then(m => ({ default: m.SystemCrmFollowUp })));
const SystemScheduling = lazy(() => import('../components/demo/SystemScheduling').then(m => ({ default: m.SystemScheduling })));
const SystemTransactions = lazy(() => import('../components/demo/SystemTransactions').then(m => ({ default: m.SystemTransactions })));
const SystemClientComms = lazy(() => import('../components/demo/SystemClientComms').then(m => ({ default: m.SystemClientComms })));
const SystemReviews = lazy(() => import('../components/demo/SystemReviews').then(m => ({ default: m.SystemReviews })));

function DemoFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function DemoPage() {
  const [activeSystem, setActiveSystem] = useState(0);

  // Overview needs to pass navigation to drill into individual systems
  const handleOverviewNavigate = useCallback((systemIndex: number) => {
    // +1 because overview is index 0, individual systems start at 1
    setActiveSystem(systemIndex + 1);
  }, []);

  return (
    <DemoLayout activeSystem={activeSystem} onSystemChange={setActiveSystem}>
      <Suspense fallback={<DemoFallback />}>
        {activeSystem === 0 && <SystemOverview onSystemChange={handleOverviewNavigate} />}
        {activeSystem === 1 && <SystemLeadResponse />}
        {activeSystem === 2 && <SystemLeadScoring />}
        {activeSystem === 3 && <SystemCrmFollowUp />}
        {activeSystem === 4 && <SystemScheduling />}
        {activeSystem === 5 && <SystemTransactions />}
        {activeSystem === 6 && <SystemClientComms />}
        {activeSystem === 7 && <SystemReviews />}
      </Suspense>
    </DemoLayout>
  );
}
