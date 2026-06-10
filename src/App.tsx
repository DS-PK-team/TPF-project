
function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-lg">
      <div className="bg-surface-container border border-outline-variant rounded-xl p-xl max-w-md w-full shadow-lg text-center">
        <span className="material-symbols-outlined text-[64px] text-primary mb-md select-none">
          domain_verification
        </span>
        <h1 className="text-headline-lg font-headline text-primary mb-sm">
          Vault & Vellum
        </h1>
        <p className="text-body-md text-on-surface-variant mb-lg">
          Środowisko zostało pomyślnie zainicjalizowane i skonfigurowane! Faza 1 zakończona powodzeniem.
        </p>
        <div className="flex justify-center gap-sm">
          <span className="bg-primary-container text-white px-md py-sm rounded text-label-md font-semibold">
            React 18
          </span>
          <span className="bg-secondary-container text-on-secondary-container px-md py-sm rounded text-label-md font-semibold">
            TypeScript
          </span>
          <span className="bg-tertiary-container text-white px-md py-sm rounded text-label-md font-semibold">
            Tailwind CSS
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
