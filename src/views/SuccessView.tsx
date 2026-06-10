import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessView() {
  const navigate = useNavigate();

  // Auto-redirect to archive after 8s if user does nothing
  useEffect(() => {
    const t = setTimeout(() => navigate('/archive'), 8000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-md">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.03)] p-xl flex flex-col items-center text-center">

        {/* Animated check icon */}
        <div className="mb-lg relative">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
          <span
            className="material-symbols-outlined text-primary relative z-10"
            style={{ fontSize: '80px', fontVariationSettings: '"FILL" 1' }}
          >
            check_circle
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-headline text-headline-lg text-on-surface mb-sm">
          Document saved
        </h1>
        <p className="font-body text-body-md text-on-surface-variant mb-xl max-w-xs">
          Your document has been securely encrypted and added to your archive.
        </p>

        {/* Summary chip */}
        <div className="flex items-center gap-sm px-md py-sm bg-surface-container rounded-full border border-outline-variant/30 mb-xl">
          <span className="material-symbols-outlined text-secondary text-[18px]">folder</span>
          <span className="font-body text-label-md text-on-surface-variant">Financial Records / Q3_2023</span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col w-full gap-md sm:flex-row">
          <button
            onClick={() => navigate('/archive')}
            className="flex-1 py-3 px-6 rounded-lg font-body text-label-md text-on-surface bg-transparent hover:bg-surface-variant transition-colors duration-200 border border-outline-variant"
          >
            Go to Archive
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="flex-1 py-3 px-6 rounded-lg font-body text-label-md bg-primary text-on-primary shadow-sm hover:bg-primary-container transition-colors duration-200"
          >
            Upload next
          </button>
        </div>

        {/* Auto-redirect hint */}
        <p className="mt-lg font-body text-label-sm text-outline">
          Redirecting to Archive in 8 seconds…
        </p>
      </div>
    </div>
  );
}
