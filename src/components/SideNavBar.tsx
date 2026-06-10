import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SideNavBarProps {
  onNewDocument?: () => void;
  onOpenSettings?: () => void;
}

export default function SideNavBar({ onNewDocument, onOpenSettings }: SideNavBarProps) {
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
    { label: 'Archive', path: '/archive', icon: 'inventory_2' },
    { label: 'Upload', path: '/upload', icon: 'upload_file' },
    { label: 'Shared', path: '/shared', icon: 'group' },
  ];

  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col h-screen select-none shrink-0 shadow-[4px_0_12px_rgba(0,0,0,0.03)]">
      {/* Logo */}
      <div className="flex items-center gap-sm px-md py-lg mb-xs">
        <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center text-on-primary shrink-0">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
            inventory_2
          </span>
        </div>
        <div>
          <h1 className="font-headline text-headline-sm text-on-surface font-bold leading-tight">Vault & Vellum</h1>
          <p className="font-body text-label-sm text-on-surface-variant opacity-80">Secure Storage</p>
        </div>
      </div>

      {/* New Document Button */}
      <div className="px-md pb-md">
        <button
          onClick={handleNewDocument}
          className="w-full flex items-center justify-center gap-sm bg-primary text-on-primary py-[10px] px-md rounded-lg font-body text-label-md font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Document
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-xs px-sm">
        {menuItems.map((item) => {
          const isActive = currentPath === item.path || (item.path === '/upload' && (currentPath === '/processing' || currentPath === '/verification'));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-sm px-sm py-[10px] rounded-lg font-body text-label-md font-semibold transition-all group active:opacity-80 ${
                isActive
                  ? 'bg-secondary-container text-primary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-colors ${
                  isActive ? 'text-primary' : 'text-outline group-hover:text-on-surface'
                }`}
                style={isActive ? { fontVariationSettings: '"FILL" 1' } : {}}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer: Sync Status, Settings, Logout */}
      <div className="mt-auto pt-md border-t border-outline-variant/30 flex flex-col gap-xs px-sm pb-sm">
        {/* Sync Status */}
        <div className="flex items-center gap-sm px-sm py-xs text-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[16px] text-emerald-500">cloud_done</span>
          All files synced
        </div>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-sm px-sm py-[10px] rounded-lg font-body text-label-md font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors group w-full text-left"
        >
          <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface transition-colors">
            settings
          </span>
          Settings
        </button>

        {/* Logout */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-sm px-sm py-[10px] rounded-lg font-body text-label-md font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors group w-full text-left"
        >
          <span className="material-symbols-outlined text-[20px] text-outline group-hover:text-on-surface transition-colors">
            logout
          </span>
          Log Out
        </button>
      </div>
    </aside>
  );
}
