import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { chapterById, adjacent } from '../lib/chapters';

type BodyState =
  | { status: 'loading' }
  | { status: 'ready'; text: string }
  | { status: 'missing' }
  | { status: 'error' };

export default function Chapter() {
  const { chapterId } = useParams();
  const chapter = chapterId ? chapterById(chapterId) : undefined;

  const [body, setBody] = useState<BodyState>({ status: 'loading' });
  useEffect(() => {
    if (!chapter) return;
    if (!chapter.body) { setBody({ status: 'missing' }); return; }
    let cancelled = false;
    setBody({ status: 'loading' });
    chapter.body()
      .then((text) => { if (!cancelled) setBody({ status: 'ready', text }); })
      .catch(() => { if (!cancelled) setBody({ status: 'error' }); });
    return () => { cancelled = true; };
  }, [chapter]);

  if (!chapter) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <div className="mono-data text-signal mb-3">PROTOCOL_NOT_FOUND</div>
        <Link to="/distinctions" className="text-ink hover:text-signal transition-colors mono-data">
          ← Return to Index
        </Link>
      </div>
    );
  }

  const { prev, next } = adjacent(chapter.id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to="/distinctions"
        className="inline-flex items-center gap-2 mono-data text-ink-3 hover:text-ink transition-colors mb-8"
      >
        <ArrowLeft className="w-3 h-3" /> INDEX // {chapter.principle.toUpperCase()}
      </Link>

      <header className="border-b border-border pb-8 mb-10">
        <div className="mono-label mb-3">{`PROTOCOL_${String(chapter.number).padStart(2, '0')} // ${chapter.operationalClass.toUpperCase()}`}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">{chapter.title}</h2>
        <div className="flex items-center gap-4 mono-data text-ink-3">
          <span className="text-signal">{`P${String(chapter.number).padStart(2, '0')}`}</span>
          <span>{chapter.principle.toUpperCase()}</span>
          <span className="text-signal-dim">|</span>
          <span>THREAT: {chapter.threatVector.toUpperCase()}</span>
        </div>
      </header>

      {body.status === 'loading' && (
        <div className="flex items-center gap-3 mono-data text-ink-3 py-12">
          <div className="w-1.5 h-1.5 bg-signal blink" /> LOADING_PROTOCOL…
        </div>
      )}

      {body.status === 'ready' && (
        <article className="prose-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            h1: ({ children }) => <h2 className="text-2xl font-bold text-ink mt-10 mb-4">{children}</h2>,
            h2: ({ children }) => <h3 className="text-xl font-bold text-ink mt-8 mb-3">{children}</h3>,
            h3: ({ children }) => <h4 className="text-lg font-bold text-ink mt-6 mb-2">{children}</h4>,
            p: ({ children }) => <p className="text-ink-2 leading-relaxed mb-4">{children}</p>,
            strong: ({ children }) => <strong className="text-ink font-semibold">{children}</strong>,
            em: ({ children }) => <em className="text-signal">{children}</em>,
            blockquote: ({ children }) => <blockquote className="border-l-2 border-signal pl-4 my-4 text-ink-2 italic">{children}</blockquote>,
            code: ({ children }) => <code className="font-mono text-signal text-sm bg-surface px-1.5 py-0.5">{children}</code>,
            ul: ({ children }) => <ul className="list-none space-y-2 mb-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>,
            li: ({ children }) => <li className="text-ink-2 leading-relaxed">{children}</li>,
            hr: () => <hr className="border-border my-8" />,
            table: ({ children }) => <table className="w-full border-collapse my-6">{children}</table>,
            th: ({ children }) => <th className="border border-border px-4 py-2 text-ink font-semibold text-left mono-data">{children}</th>,
            td: ({ children }) => <td className="border border-border px-4 py-2 text-ink-2">{children}</td>,
          }}>
            {body.text}
          </ReactMarkdown>
        </article>
      )}

      {body.status === 'missing' && (
        <div className="mono-data text-ink-3 py-12">PROTOCOL_BODY_PENDING_DEPLOYMENT</div>
      )}

      {/* Navigation */}
      {(prev || next) && (
        <nav className="flex items-center justify-between border-t border-border mt-12 pt-6">
          {prev ? (
            <Link to={`/distinctions/${prev.id}`} className="inline-flex items-center gap-2 mono-data text-ink-3 hover:text-ink transition-colors">
              <ChevronLeft className="w-4 h-4" /> P{String(prev.number).padStart(2, '0')} {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/distinctions/${next.id}`} className="inline-flex items-center gap-2 mono-data text-ink-3 hover:text-ink transition-colors">
              P{String(next.number).padStart(2, '0')} {next.title} <ChevronRight className="w-4 h-4" />
            </Link>
          ) : <span />}
        </nav>
      )}
    </div>
  );
}
