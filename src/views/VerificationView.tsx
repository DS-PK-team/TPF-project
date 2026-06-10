import { useNavigate } from 'react-router-dom';

export default function VerificationView() {
  const navigate = useNavigate();

  const handleApprove = () => {
    navigate('/success');
  };

  return (
    <div className="p-lg max-w-xl">
      <h1 className="text-headline-lg font-headline text-primary mb-sm">
        Weryfikacja Dokumentu
      </h1>
      <p className="text-body-md text-on-surface-variant mb-lg">
        Sprawdź odczytane dane i zaakceptuj sugerowany folder oraz tagi przed zapisaniem w archiwum.
      </p>

      <div className="bg-surface-container border border-outline-variant rounded-xl p-lg mb-lg">
        <h2 className="text-headline-sm text-primary mb-md">Sugerowane Dane</h2>
        <div className="space-y-sm">
          <div>
            <span className="text-label-sm text-on-surface-variant block">Nazwa dokumentu:</span>
            <span className="text-body-md font-semibold text-on-surface">faktura_vat_2026_06_10.pdf</span>
          </div>
          <div>
            <span className="text-label-sm text-on-surface-variant block">Sugerowany folder:</span>
            <span className="text-body-md font-semibold text-on-surface">Faktury / Media</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleApprove}
        className="bg-primary text-white py-md px-lg rounded-lg font-semibold hover:bg-primary-container transition-colors"
      >
        Zatwierdź i zapisz (Zapisz)
      </button>
    </div>
  );
}
