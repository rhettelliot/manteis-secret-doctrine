import { Link } from 'react-router-dom';
import { chapters } from '../lib/chapters';

export default function Landing() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Hero */}
      <section className="mb-20">
        <div className="mono-label mb-6">SDTR // COGNITIVE SOVEREIGNTY PROTOCOLS</div>
        <h2 className="text-4xl md:text-6xl font-bold text-ink tracking-tight mb-6 max-w-3xl">
          Seven Protocols<br /><span className="text-signal">for Cognitive Sovereignty.</span>
        </h2>
        <p className="text-lg text-ink-2 max-w-2xl leading-relaxed mb-8">
          Ancient cosmological architecture, reframed as seven operational protocols for
          cognitive sovereignty. Written for secular knowledge workers who feel the system eating them
          and need practical frameworks, not theology.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/distinctions"
            className="mono-data border border-signal text-signal px-6 py-3 hover:bg-signal hover:text-canvas transition-colors"
          >
            ENTER_PROTOCOLS →
          </Link>
          <span className="mono-data text-ink-3">{chapters.length} CHAPTERS // 607K WORDS SOURCE</span>
        </div>
      </section>

      {/* Chapter grid */}
      <section>
        <div className="mono-label mb-6">PROTOCOL_INDEX</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {chapters.map((ch) => (
            <Link
              key={ch.id}
              to={`/distinctions/${ch.id}`}
              className="bg-canvas hover:bg-surface p-6 transition-colors group"
            >
              <div className="mono-label mb-2">{`PROTOCOL_${String(ch.number).padStart(2, '0')}`}</div>
              <div className="text-xl font-bold text-ink mb-2 group-hover:text-signal transition-colors">
                {ch.title}
              </div>
              <div className="mono-data text-ink-3 mb-3">{ch.principle.toUpperCase()}</div>
              <p className="text-sm text-ink-2">{ch.threatVector}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
