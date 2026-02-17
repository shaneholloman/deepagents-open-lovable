import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

const NewThread = lazy(() => import('./pages/NewThread').then(m => ({ default: m.NewThread })));
const ThreadView = lazy(() => import('./pages/ThreadView').then(m => ({ default: m.ThreadView })));

// Redirect component that preserves query params
function RedirectWithParams({ to }: { to: string }): JSX.Element {
  const location = useLocation();
  return <Navigate to={`${to}${location.search}`} replace />;
}

function App(): JSX.Element {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-luxury-900" />}>
      <Routes>
        <Route path="/" element={<RedirectWithParams to="/new" />} />
        <Route path="/new" element={<NewThread />} />
        <Route path="/thread/:threadId" element={<ThreadView />} />
      </Routes>
    </Suspense>
  );
}

export default App;
