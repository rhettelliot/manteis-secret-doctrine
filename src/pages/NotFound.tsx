import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <div className="mono-data text-signal mb-3">404 // PROTOCOL_NOT_FOUND</div>
      <p className="text-ink-2 mb-6">This path does not exist in the doctrine.</p>
      <Link to="/" className="mono-data text-ink hover:text-signal transition-colors">
        ← RETURN_TO_INDEX
      </Link>
    </div>
  );
}
