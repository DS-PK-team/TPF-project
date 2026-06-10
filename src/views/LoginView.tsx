import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/archive');
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-md font-body-md text-body-md text-on-surface antialiased">
      <main className="w-full max-w-[420px] bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.03)] border border-outline-variant/40 p-xl flex flex-col gap-xl">
        {/* Header / Brand */}
        <header className="flex flex-col items-center gap-sm">
          <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center text-primary mb-xs">
            <span className="material-symbols-outlined" style={{ fontSize: '28px', fontVariationSettings: '"FILL" 1' }}>
              inventory_2
            </span>
          </div>
          <h1 className="font-headline text-headline-lg text-on-surface text-center">Vault &amp; Vellum</h1>
          <p className="font-body text-body-md text-on-surface-variant text-center">Secure digital permanence.</p>
        </header>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          <div className="flex flex-col gap-md">
            {/* Email Field */}
            <div className="flex flex-col gap-xs">
              <label className="font-body text-label-md text-on-surface font-medium" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="archivist@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-[10px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors placeholder:text-outline"
              />
            </div>
            {/* Password Field */}
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between items-end">
                <label className="font-body text-label-md text-on-surface font-medium" htmlFor="password">
                  Password
                </label>
                <a href="#" className="font-body text-label-md text-primary hover:text-primary-container transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-[10px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors placeholder:text-outline"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-md pt-sm">
            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-body text-label-md font-semibold py-[12px] px-md rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-sm"
            >
              Sign In
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
            </button>
          </div>
        </form>

        {/* Footer Switch */}
        <footer className="text-center pt-md border-t border-surface-variant">
          <p className="font-body text-body-md text-on-surface-variant">
            New to the vault?
            <a href="#" className="font-body text-label-md text-primary hover:text-primary-container transition-colors ml-xs">
              Create an account
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
