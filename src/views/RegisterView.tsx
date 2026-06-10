import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

export default function RegisterView() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!acceptedTerms) {
      setError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    try {
      await register(fullName, email, password);
      navigate('/archive');
    } catch {
      setError('Unable to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-md font-body text-body-md text-on-surface antialiased">
      <main className="w-full max-w-[420px] bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.03)] border border-outline-variant/40 p-xl flex flex-col gap-xl">

        {/* Header / Brand */}
        <header className="flex flex-col items-center gap-sm">
          <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center text-primary mb-xs">
            <span className="material-symbols-outlined" style={{ fontSize: '28px', fontVariationSettings: '"FILL" 1' }}>
              inventory_2
            </span>
          </div>
          <h1 className="font-headline text-headline-lg text-on-surface text-center">Vault &amp; Vellum</h1>
          <p className="font-body text-body-md text-on-surface-variant text-center">Create your secure digital vault.</p>
        </header>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-lg">
          <div className="flex flex-col gap-md">
            {/* Full Name */}
            <div className="flex flex-col gap-xs">
              <label className="font-body text-label-md text-on-surface font-medium" htmlFor="fullName">
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                  person
                </span>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-[44px] pr-md py-[10px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors placeholder:text-outline disabled:opacity-60"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-xs">
              <label className="font-body text-label-md text-on-surface font-medium" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                  mail
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-[44px] pr-md py-[10px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors placeholder:text-outline disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-xs">
              <label className="font-body text-label-md text-on-surface font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-[44px] pr-[44px] py-[10px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors placeholder:text-outline disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={isLoading}
                  className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors disabled:opacity-60"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-xs">
              <label className="font-body text-label-md text-on-surface font-medium" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                  verified_user
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-[44px] pr-md py-[10px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors placeholder:text-outline disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-sm cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              disabled={isLoading}
              className="mt-[2px] h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 disabled:opacity-60"
            />
            <span className="font-body text-body-md text-on-surface-variant">
              I agree to the{' '}
              <a href="#" className="font-body text-label-md text-primary hover:text-primary-container transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-body text-label-md text-primary hover:text-primary-container transition-colors">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-sm p-sm rounded-lg bg-error-container text-on-error-container font-body text-label-md">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col gap-md pt-sm">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary font-body text-label-md font-semibold py-[12px] px-md rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Switch */}
        <footer className="text-center pt-md border-t border-surface-variant">
          <p className="font-body text-body-md text-on-surface-variant">
            Already have a vault?{' '}
            <Link to="/" className="font-body text-label-md text-primary hover:text-primary-container transition-colors">
              Sign In
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
