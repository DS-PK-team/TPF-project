import { useState, useRef, useEffect } from 'react';

interface TopNavBarProps {
  onSearchQueryChange?: (val: string) => void;
  avatarUrl?: string;
  onOpenSettings?: () => void;
}

const today = new Date();
const formatTs = (d: Date) =>
  d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

const NOTIFICATIONS = [
  { id: 'n1', icon: 'cloud_done',    title: 'All data synced',                  desc: 'Your vault is up to date.',          time: formatTs(today) },
  { id: 'n2', icon: 'upload_file',   title: 'Q3 Financial Audit uploaded',       desc: 'Successfully encrypted and saved.',  time: '18:42' },
  { id: 'n3', icon: 'share',         title: 'NDA shared with family',            desc: 'Anna Kowalska can now view the file.','time': '17:10' },
  { id: 'n4', icon: 'auto_awesome',  title: 'AI suggested 3 tags',              desc: 'For "Office Expansion Floorplan V2".', time: '16:55' },
];

export default function TopNavBar({ onSearchQueryChange, avatarUrl, onOpenSettings }: TopNavBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [notifOpen]);

  return (
    <header className="h-16 bg-white border-b border-outline-variant flex items-center justify-between px-lg select-none shrink-0 sticky top-0 z-10">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-md text-[20px] text-on-surface-variant pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Szukaj dokumentów, tagów, kwot..."
            onChange={e => onSearchQueryChange?.(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-[44px] pr-md py-sm text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-sm">

        {/* Notification Bell + Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(v => !v)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors relative ${notifOpen ? 'bg-surface-container-low text-primary' : ''}`}
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {hasUnread && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 z-50 w-80 bg-surface-container-lowest border border-surface-variant rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between px-md pt-md pb-sm border-b border-surface-container-high">
                <h3 className="font-headline text-headline-sm text-on-surface">Notifications</h3>
                <span className="font-body text-label-sm text-on-surface-variant">
                  {today.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
              </div>
              {/* Notification items */}
              <div className="flex flex-col">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className="flex items-start gap-sm px-md py-sm hover:bg-surface-container-low transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary-fixed/50 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">{n.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-label-md font-semibold text-on-surface">{n.title}</p>
                      <p className="font-body text-label-sm text-on-surface-variant truncate">{n.desc}</p>
                    </div>
                    <span className="font-body text-label-sm text-outline shrink-0 pt-0.5">{n.time}</span>
                  </div>
                ))}
              </div>
              {/* Footer */}
              <div className="px-md py-sm border-t border-surface-container-high">
                <button
                  onClick={() => { setHasUnread(false); setNotifOpen(false); }}
                  className="w-full text-center font-body text-label-md text-primary hover:text-primary-container transition-colors"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings gear */}
        <button
          onClick={onOpenSettings}
          aria-label="Open settings"
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">settings</span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-sm border-l border-outline-variant pl-md">
          <div className="text-right">
            <p className="text-body-md font-semibold text-on-surface">Jan Kowalski</p>
            <p className="text-label-md text-on-surface-variant">jan.kowalski@example.com</p>
          </div>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-outline-variant" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center text-body-lg font-bold select-none">
              JK
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
