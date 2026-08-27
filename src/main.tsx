import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import Landing from './pages/Landing';
import './index.css';

const Distinctions = lazy(() => import('./pages/Distinctions'));
const Chapter = lazy(() => import('./pages/Chapter'));
const Audit = lazy(() => import('./pages/Audit'));
const Spectrum = lazy(() => import('./pages/Spectrum'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

function PageLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32 flex items-center gap-3 mono-data text-ink-3">
      <div className="w-1.5 h-1.5 bg-signal blink" /> LOADING_PROTOCOL…
    </div>
  );
}

class RouteErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <div className="mono-data text-signal mb-3">MODULE_LOAD_FAILURE</div>
        <p className="text-ink-2">Protocol chunk failed to load. Refresh to retry.</p>
      </div>
    );
  }
}

export default function Main() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteErrorBoundary>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Landing />} />
            <Route path="/distinctions" element={<Suspense fallback={<PageLoading />}><Distinctions /></Suspense>} />
            <Route path="/distinctions/:chapterId" element={<Suspense fallback={<PageLoading />}><Chapter /></Suspense>} />
            <Route path="/audit" element={<Suspense fallback={<PageLoading />}><Audit /></Suspense>} />
            <Route path="/spectrum" element={<Suspense fallback={<PageLoading />}><Spectrum /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<PageLoading />}><NotFound /></Suspense>} />
          </Route>
        </Routes>
      </RouteErrorBoundary>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
