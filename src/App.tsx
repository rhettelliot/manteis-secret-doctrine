import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLink = ({ isActive }: { isActive: boolean }) =>
  `transition-colors ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`;

const NAV_ITEMS = [
  { to: '/distinctions', label: 'Protocols' },
  { to: '/audit', label: 'Audit' },
  { to: '/spectrum', label: 'Spectrum' },
];

declare const __BUILD_DATE__: string;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <div className="min-h-screen bg-canvas text-ink-2 flex flex-col">
      <div className="sticky top-0 z-50">
        <nav className="border-b border-border px-6 py-3 flex items-center justify-between bg-canvas">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-signal blink" />
            <NavLink to="/" end className="mono-data text-ink hover:text-signal transition-colors">
              SDTR
            </NavLink>
            <span className="mono-data text-ink-3 hidden sm:inline">{`// SDTR // COGNITIVE SOVEREIGNTY PROTOCOLS // V.${__BUILD_DATE__.slice(0, 7)}`}</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLink}>
                <span className="mono-data">{item.label}</span>
              </NavLink>
            ))}
          </div>
          <button className="md:hidden text-ink-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden border-b border-border bg-canvas px-6 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLink} onClick={() => setMenuOpen(false)}>
                <span className="mono-data">{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border px-6 py-10 mt-auto bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-signal blink" />
              <span className="mono-data text-ink">SDTR</span>
            </div>
            <p className="text-sm text-ink-3 leading-relaxed">
              Secret Doctrine Tactical Reframing — cognitive sovereignty protocols for secular operators.
            </p>
          </div>
          <div className="space-y-3">
            <div className="mono-data text-ink-3 mb-2">NAVIGATION</div>
            <ul className="space-y-2 text-sm text-ink-2">
              <li><NavLink to="/distinctions" className="hover:text-ink transition-colors">Protocols</NavLink></li>
              <li><NavLink to="/audit" className="hover:text-ink transition-colors">Audit</NavLink></li>
              <li><NavLink to="/spectrum" className="hover:text-ink transition-colors">Spectrum</NavLink></li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="mono-data text-ink-3 mb-2">SYSTEM</div>
            <ul className="space-y-2 text-sm text-ink-2">
              <li><span className="mono-data">BUILD: {__BUILD_DATE__}</span></li>
              <li><span className="mono-data">VERSION: {__BUILD_DATE__.slice(0, 7)}</span></li>
              <li><span className="mono-data">STATUS: OPERATIONAL</span></li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="mono-data text-ink-3 mb-2">COPYRIGHT</div>
            <p className="text-sm text-ink-3 leading-relaxed">
              © {new Date().getFullYear()} Manteis Egregore.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="mono-data text-ink-3">SDTR // MANTEIS EGREGORE // COGNITIVE SOVEREIGNTY PROTOCOLS</span>
          <span className="mono-data text-ink-3">{__BUILD_DATE__}</span>
        </div>
      </footer>
    </div>
  );
}
