import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SideNavBarProps {
  onNewDocument?: () => void;
}

export default function SideNavBar({ onNewDocument }: SideNavBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleNewDocument = () => {
    if (onNewDocument) {
      onNewDocument();
    } else {
      navigate('/upload');
    }
  };

  const menuItems = [
    { label: 'Archiwum', path: '/archive', icon: 'inventory_2' },
    { label: 'Dodaj pliki', path: '/upload', icon: 'upload_file' },
    { label: 'Współdzielone', path: '/shared', icon: 'folder_shared' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-outline-variant flex flex-col h-screen select-none shrink-0">
      {/* Logo */}
      <div className="p-lg border-b border-outline-variant flex items-center gap-sm">
        <span className="material-symbols-outlined text-[32px] text-primary">
          folder_managed
        </span>
        <span className="font-headline text-headline-sm font-bold text-primary">
          Vault & Vellum
        </span>
      </div>

      {/* Action Button */}
      <div className="p-md">
        <button
          onClick={handleNewDocument}
          className="w-full flex items-center justify-center gap-sm bg-primary text-white py-sm px-md rounded-lg font-headline font-semibold hover:bg-primary-container transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined select-none text-[20px]">add</span>
          New Document
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-sm space-y-xs">
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-md px-md py-sm rounded-lg text-body-md font-medium transition-colors ${
                isActive
                  ? 'bg-secondary-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Status & Logout */}
      <div className="p-md border-t border-outline-variant space-y-sm">
        {/* Sync Status */}
        <div className="flex items-center gap-sm px-sm text-label-md text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          All files synced
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-md px-md py-sm rounded-lg text-body-md font-medium text-error hover:bg-error-container hover:text-error transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">logout</span>
          Wyloguj się
        </button>
      </div>
    </aside>
  );
}
