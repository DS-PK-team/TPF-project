import { useNavigate } from 'react-router-dom';

export default function SuccessView() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/archive');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-lg">
      <div className="bg-surface-container border border-outline-variant rounded-xl p-xl max-w-sm w-full shadow-lg text-center">
        <span className="material-symbols-outlined text-[64px] text-primary mb-md select-none">
          check_circle
        </span>
        <h1 className="text-headline-lg font-headline text-primary mb-sm">
          Sukces!
        </h1>
        <p className="text-body-md text-on-surface-variant mb-lg">
          Dokument został poprawnie zapisany w Twoim archiwum.
        </p>
        <button
          onClick={handleReturn}
          className="w-full bg-primary text-white py-md px-lg rounded-lg font-semibold hover:bg-primary-container transition-colors"
        >
          Wróć do archiwum
        </button>
      </div>
    </div>
  );
}
