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

      <footer className="border-t border-border px-6 py-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="mono-data text-ink-3">SDTR // MANTEIS EGREGORE</span>
          <span className="mono-data text-ink-3">{__BUILD_DATE__}</span>
        </div>
      </footer>
    </div>
  );
}
