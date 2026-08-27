import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CornerFrame } from '../components/CornerFrame';

const KEY = 'sdtr:spectrum';

// Every state is a position on a spectrum, not a thing to eliminate.
// Bands run pole-to-pole, left → right.
interface Band {
  label: string;
  directive: string;
}

interface Spec {
  id: string;
  name: string;
  axis: string;
  bands: Band[];
}

const SPECTRA: Spec[] = [
  {
    id: 'substrate',
    name: 'Substrate Depth',
    axis: 'FOUNDATION INSPECTION',
    bands: [
      { label: 'SURFACE', directive: 'Operating on assumptions you have never examined. Pause and name one belief you inherited without testing.' },
      { label: 'SHALLOW', directive: 'You have noticed the substrate but not mapped it. Begin a written inventory: values, defaults, loyalties, fears.' },
      { label: 'EXAMINED', directive: 'Foundations under active review. Cross-check one core assumption against lived evidence this week.' },
      { label: 'MAPPED', directive: 'Substrate structure is legible. Use the map to predict failure modes before they become emergencies.' },
      { label: 'INTEGRATED', directive: 'Foundations are stable enough to build on. Re-audit when conditions shift; the map is alive, not laminated.' },
    ],
  },
  {
    id: 'cycle',
    name: 'Active Cycle Phase',
    axis: 'ENERGY PERIODICITY',
    bands: [
      { label: 'RECOVERY', directive: 'Depletion phase. Do not negotiate identity here — reduce load, stabilize sleep and nutrition, log only.' },
      { label: 'DESCENT', directive: 'Capacity contracting. Expected, not exceptional. Shorten horizons, drop discretionary commitments.' },
      { label: 'NEUTRAL', directive: 'Flat energy. Good ground for planning and maintenance; make decisions here before the next swing.' },
      { label: 'ASCENT', directive: 'Capacity returning. Build reserves and prepare staging; do not expand exposure faster than recovery.' },
      { label: 'PEAK', directive: 'Maximum usable output. Execute high-leverage work now and pre-commit the contraction plan.' },
      { label: 'OVERDRIVE', directive: 'Output beyond sustainable range. You are borrowing from recovery. Set a hard stop and downshift deliberately.' },
    ],
  },
  {
    id: 'boundary',
    name: 'Boundary Integrity',
    axis: 'PERIMETER STATUS',
    bands: [
      { label: 'POROUS', directive: 'Boundaries exist in theory only. Pick one intrusion pattern and interrupt it this week.' },
      { label: 'LEAKING', directive: 'Known breaches are recurring. Identify the leak source and close it with a single concrete rule.' },
      { label: 'MAINTAINED', directive: 'Perimeter holds under normal load. Monitor the exceptions; they reveal where the structure still softens.' },
      { label: 'SOLID', directive: 'Boundaries are reliable. Shift attention from defense to maintenance and targeted reinforcement.' },
      { label: 'FORTIFIED', directive: 'Perimeter is redundant and tested. Audit it after any major life change; strength can become rigidity.' },
    ],
  },
];

interface Saved {
  specId: string;
  pos: number; // 0–100
}

function readSaved(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { specId: 'substrate', pos: 50 };
    const parsed = JSON.parse(raw);
    if (SPECTRA.some((s) => s.id === parsed.specId) && typeof parsed.pos === 'number') return parsed;
  } catch { /* fall through */ }
  return { specId: 'substrate', pos: 50 };
}

export default function Spectrum() {
  const [saved, setSaved] = useState<Saved>(readSaved);
  const spec = SPECTRA.find((s) => s.id === saved.specId) ?? SPECTRA[0];

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(saved));
  }, [saved]);

  const bandIdx = Math.min(spec.bands.length - 1, Math.floor((saved.pos / 100) * spec.bands.length));
  const band = spec.bands[bandIdx];
  // Position 0–100 mapped to solar accent → amber → cream.
  const color = saved.pos < 34 ? '#FFE566' : saved.pos < 67 ? '#FF5500' : '#F4F3EE';

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader
        num="SPC"
        icon={<SlidersHorizontal className="text-signal w-7 h-7" />}
        title="Spectrum Console"
        sub="There are no opposites — only poles. Locate your current position on the spectrum, then transmute by degree. You cannot destroy a pole; you can only move the needle."
      />

      {/* Spectrum selector */}
      <div className="flex flex-wrap gap-0 border border-border mb-10 w-fit">
        {SPECTRA.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSaved({ specId: s.id, pos: 50 })}
            aria-pressed={s.id === spec.id}
            className={`px-6 py-3 mono-data transition-colors ${i < SPECTRA.length - 1 ? 'border-r border-border' : ''} ${
              s.id === spec.id ? 'bg-ink text-canvas' : 'text-ink-3 hover:text-ink hover:bg-surface'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dial */}
        <div className="lg:col-span-7">
          <CornerFrame className="p-8 bg-surface">
            <div className="flex justify-between items-center mb-10">
              <div className="mono-data text-ink-3">{spec.axis} // POSITION</div>
              <div className="font-mono text-lg" style={{ color }}>{saved.pos}</div>
            </div>

            {/* Band markers */}
            <div className="flex justify-between mb-2">
              {spec.bands.map((b, i) => (
                <span
                  key={b.label}
                  className={`mono-data transition-colors ${i === bandIdx ? '' : 'text-ink-ghost'}`}
                  style={i === bandIdx ? { color } : undefined}
                >
                  {b.label}
                </span>
              ))}
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={saved.pos}
              onChange={(e) => setSaved({ ...saved, pos: Number(e.target.value) })}
              aria-label={`Position on the ${spec.name} spectrum`}
              className="slider-tactical w-full h-1 appearance-none cursor-pointer bg-ink-ghost"
              style={{
                '--thumb': color,
                background: `linear-gradient(to right, #FFE566 0%, #FF5500 50%, #F4F3EE 100%)`,
              } as React.CSSProperties}
            />
            <div className="flex justify-between mono-data text-ink-3 mt-2">
              <span>POLE_A</span>
              <span>CENTER</span>
              <span>POLE_B</span>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <div className="mono-data mb-3" style={{ color }}>
                BAND {String(bandIdx + 1).padStart(2, '0')} / {String(spec.bands.length).padStart(2, '0')} — {band.label}
              </div>
              <p className="text-lg text-ink leading-relaxed">{band.directive}</p>
            </div>
          </CornerFrame>
        </div>

        {/* Doctrine */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-border p-6">
            <div className="mono-data text-signal mb-3">DOCTRINE // TRANSMUTATION</div>
            <p className="text-sm text-ink-2 leading-relaxed mb-4">
              The Reactive Human eliminates; the Sovereign Operator transmutes. Attempting to destroy a pole anchors
              you to its spectrum. Slide by degree: alter the frequency of the charge, and the state follows.
            </p>
          </div>
          <div className="border border-border p-6">
            <div className="mono-data text-signal mb-3">THREAT // POLARITY ENTRAPMENT</div>
            <p className="text-sm text-ink-2 leading-relaxed">
              The harder you push against a pole, the more you anchor yourself to it. If you find yourself fighting a
              state instead of relocating along its spectrum, stop pushing. Return to the console. Move the needle.
            </p>
          </div>
          <div className="border border-border p-6">
            <div className="mono-data text-signal mb-3">LINKED_SYSTEM // SDTR PROTOCOLS</div>
            <p className="text-sm text-ink-2 leading-relaxed">
              Substrate Depth links to d01/d03, Active Cycle Phase to d02/d04/d05, and Boundary Integrity to d06. Run the
              Protocol Audit to identify which installation is weakest before attempting spectrum shifts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
