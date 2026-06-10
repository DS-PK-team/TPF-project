import { useNavigate } from 'react-router-dom';

export default function LoginView() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/archive');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-lg">
      <div className="bg-surface-container border border-outline-variant rounded-xl p-xl max-w-sm w-full shadow-lg text-center">
        <h1 className="text-headline-lg font-headline text-primary mb-md">
          Vault & Vellum
        </h1>
        <p className="text-body-md text-on-surface-variant mb-lg">
          Zaloguj się do swojego osobistego archiwum dokumentów.
        </p>
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-md px-lg rounded-lg font-semibold hover:bg-primary-container transition-colors"
        >
          Zaloguj się
        </button>
      </div>
    </div>
  );
}
