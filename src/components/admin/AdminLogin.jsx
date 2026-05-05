import { useState } from 'react';
import { hasPassword, setPassword, checkPassword } from '../../utils/auth';

export default function AdminLogin({ onSuccess }) {
  const isFirstRun = !hasPassword();
  const [password, setPasswordValue] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isFirstRun) {
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
        if (password !== confirm) { setError('Passwords do not match.'); return; }
        await setPassword(password);
        onSuccess();
      } else {
        const ok = await checkPassword(password);
        if (ok) { onSuccess(); }
        else { setError('Incorrect password.'); }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="block h-px w-10 bg-wood-light opacity-60" />
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted">Admin</span>
            <span className="block h-px w-10 bg-wood-light opacity-60" />
          </div>
          <h1 className="font-serif font-light text-4xl text-ink mb-1">
            {isFirstRun ? 'Set Up Admin' : 'Welcome back'}
          </h1>
          <p className="font-sans text-sm text-muted font-light mt-2">
            {isFirstRun
              ? 'Create a password to protect the admin panel.'
              : 'Enter your password to continue.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPasswordValue(e.target.value)}
              required
              autoFocus
              className="w-full border border-wood/30 bg-white px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-wood transition-colors"
              placeholder={isFirstRun ? 'Choose a password (min 8 chars)' : 'Enter your password'}
            />
          </div>

          {isFirstRun && (
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-muted mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                className="w-full border border-wood/30 bg-white px-4 py-3 font-sans text-sm text-ink focus:outline-none focus:border-wood transition-colors"
                placeholder="Repeat password"
              />
            </div>
          )}

          {error && (
            <p className="font-sans text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-wood text-cream font-sans text-xs tracking-widest uppercase py-3 hover:bg-wood-dark transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Please wait…' : isFirstRun ? 'Create Password & Enter' : 'Log In'}
          </button>
        </form>

        <p className="mt-8 text-center font-sans text-xs text-muted/70">
          To reset your password, clear this site's localStorage in your browser developer tools.
        </p>

        <div className="mt-8 text-center">
          <a
            href={import.meta.env.BASE_URL}
            className="font-sans text-xs tracking-widest uppercase text-wood hover:text-wood-dark transition-colors"
          >
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
