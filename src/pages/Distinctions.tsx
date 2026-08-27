import { Link } from 'react-router-dom';
import { chapters } from '../lib/chapters';

export default function Distinctions() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mono-label mb-4">PROTOCOL_INDEX</div>
      <h2 className="text-3xl font-bold text-ink mb-8">Seven Operating Principles</h2>
      <div className="space-y-px bg-border">
        {chapters.map((ch) => (
          <Link
            key={ch.id}
            to={`/distinctions/${ch.id}`}
            className="block bg-canvas hover:bg-surface p-5 transition-colors group"
          >
            <div className="flex items-baseline gap-4">
              <span className="mono-data text-signal">{`P${String(ch.number).padStart(2, '0')}`}</span>
              <div className="flex-1">
                <div className="text-lg font-bold text-ink group-hover:text-signal transition-colors">
                  {ch.title}
                </div>
                <div className="mono-data text-ink-3 mt-1">
                  {ch.principle.toUpperCase()} // {ch.operationalClass.toUpperCase()}
                </div>
              </div>
              <span className="mono-data text-ink-3 group-hover:text-ink transition-colors">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
