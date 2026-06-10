import { useNavigate } from 'react-router-dom';

export default function UploadView() {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/processing');
  };

  return (
    <div className="p-lg max-w-xl">
      <h1 className="text-headline-lg font-headline text-primary mb-sm">
        Dodaj Nowe Dokumenty
      </h1>
      <p className="text-body-md text-on-surface-variant mb-lg">
        Przeciągnij i upuść pliki PDF lub obrazy, aby automatycznie je przetworzyć.
      </p>
      
      <div className="border-2 border-dashed border-outline-variant rounded-xl p-xl flex flex-col items-center justify-center bg-surface-container-low mb-lg">
        <span className="material-symbols-outlined text-[48px] text-outline mb-md select-none">
          upload_file
        </span>
        <p className="text-body-md font-semibold text-on-surface mb-xs">
          Wybierz pliki z dysku lub przeciągnij je tutaj
        </p>
        <p className="text-label-md text-on-surface-variant">
          Obsługiwane formaty: PDF, PNG, JPG (maks. 10MB)
        </p>
      </div>

      <button
        onClick={handleProceed}
        className="bg-primary text-white py-md px-lg rounded-lg font-semibold hover:bg-primary-container transition-colors"
      >
        Rozpocznij analizę (Dalej)
      </button>
    </div>
  );
}
