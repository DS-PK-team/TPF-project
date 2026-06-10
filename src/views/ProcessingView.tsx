import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProcessingView() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/verification');
    }, 3000); // Automatyczne przekierowanie po 3 sekundach symulacji

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="p-lg min-h-[50vh] flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-lg"></div>
      <h1 className="text-headline-md font-headline text-primary mb-sm">
        Trwa analizowanie dokumentu...
      </h1>
      <p className="text-body-md text-on-surface-variant text-center max-w-sm">
        Sztuczna inteligencja odczytuje dane z Twojego dokumentu (OCR) i sugeruje foldery oraz tagi.
      </p>
    </div>
  );
}
