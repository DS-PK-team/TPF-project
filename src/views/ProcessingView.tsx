import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Step = 'done' | 'active' | 'pending';

interface OcrStep {
  label: string;
  state: Step;
}

const INITIAL_STEPS: OcrStep[] = [
  { label: 'Upload complete',          state: 'done'    },
  { label: 'Extracting metadata',      state: 'active'  },
  { label: 'Applying secure encryption', state: 'pending' },
];

export default function ProcessingView() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<OcrStep[]>(INITIAL_STEPS);

  useEffect(() => {
    // After 2s advance to step 3 active
    const t1 = setTimeout(() => {
      setSteps([
        { label: 'Upload complete',          state: 'done'   },
        { label: 'Extracting metadata',      state: 'done'   },
        { label: 'Applying secure encryption', state: 'active' },
      ]);
    }, 2000);

    // After 4.5s complete all and redirect
    const t2 = setTimeout(() => {
      setSteps([
        { label: 'Upload complete',          state: 'done' },
        { label: 'Extracting metadata',      state: 'done' },
        { label: 'Applying secure encryption', state: 'done' },
      ]);
      setTimeout(() => navigate('/verification', { state: { mode: 'queue' } }), 400);
    }, 4500);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate]);

  return (
    <div className="flex-1 flex items-center justify-center p-12 bg-surface-container-low/50 min-h-full">
      <div className="w-full max-w-4xl bg-surface-container-lowest rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-outline-variant/30 overflow-hidden flex h-[500px]">

        {/* Left: Document Skeleton + Scan Animation */}
        <div className="w-1/2 bg-surface-container p-12 flex items-center justify-center relative overflow-hidden border-r border-outline-variant/20">
          {/* Scan line */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <div className="scan-line w-full h-[150px] bg-gradient-to-b from-primary/0 via-primary/10 to-primary/0 shadow-[0_0_15px_rgba(0,90,113,0.1)]" />
          </div>

          {/* Document skeleton */}
          <div className="bg-surface-container-lowest shadow-2xl rounded-xl p-8 w-full aspect-[3/4] relative z-0 transform -rotate-2">
            <div className="space-y-4 opacity-20">
              <div className="h-4 w-2/3 bg-surface-variant rounded" />
              <div className="space-y-2">
                <div className="h-2 w-full bg-surface-variant rounded" />
                <div className="h-2 w-full bg-surface-variant rounded" />
                <div className="h-2 w-4/5 bg-surface-variant rounded" />
              </div>
              <div className="h-32 w-full border-2 border-dashed border-surface-container-high rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-surface-container-high">image</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-surface-variant rounded" />
                <div className="h-2 w-5/6 bg-surface-variant rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-surface-variant rounded" />
                <div className="h-2 w-3/4 bg-surface-variant rounded" />
                <div className="h-2 w-full bg-surface-variant rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status Panel */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary relative">
              <span className="material-symbols-outlined text-2xl animate-pulse">document_scanner</span>
            </div>
            <h2 className="font-headline text-headline-sm text-on-surface tracking-tight">Analyzing document...</h2>
          </div>

          <p className="font-body text-body-md text-on-surface-variant mb-8 leading-relaxed">
            Securely extracting text, identifying structural elements, and preparing your document for the archive.
          </p>

          {/* Steps checklist */}
          <div className="space-y-4 mb-10">
            {steps.map((step, i) => (
              <div key={i} className={`flex items-center gap-3 ${
                step.state === 'done'    ? 'text-primary' :
                step.state === 'active'  ? 'text-on-surface' :
                                           'text-outline-variant'
              }`}>
                {step.state === 'done' && (
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                )}
                {step.state === 'active' && (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
                {step.state === 'pending' && (
                  <span className="material-symbols-outlined text-xl">radio_button_unchecked</span>
                )}
                <span className="font-body font-semibold text-sm">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Cancel */}
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 text-outline hover:text-error transition-colors font-body text-sm font-semibold group self-start"
          >
            <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">close</span>
            Cancel processing
          </button>
        </div>
      </div>
    </div>
  );
}
