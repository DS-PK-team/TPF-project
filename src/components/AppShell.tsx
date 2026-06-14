import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import { SearchProvider, useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';

type SyncStatus = 'idle' | 'syncing' | 'synced';

function AppShellInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { searchQuery, setSearchQuery } = useSearch();
  const { user } = useAuth();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');

  // Reset inner states whenever modal is closed
  const closeSettings = () => {
    setIsSettingsOpen(false);
    setIsChangingPassword(false);
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    setSyncStatus('idle');
  };

  const handleSync = () => {
    if (syncStatus !== 'idle') return;
    setSyncStatus('syncing');
    setTimeout(() => setSyncStatus('synced'), 2500);
  };

  useEffect(() => {
    if (path !== '/archive' && path !== '/shared') {
      setSearchQuery('');
    }
  }, [path, setSearchQuery]);

  const isNoNavRoute = path === '/' || path === '/register' || path === '/success';
  const isProcessingRoute = path === '/processing';

  if (isNoNavRoute) {
    return (
      <main className="min-h-screen bg-background">
        <Outlet />
      </main>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background relative">
      <SideNavBar onOpenSettings={() => setIsSettingsOpen(true)} />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {!isProcessingRoute && (
          <TopNavBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}
        <main className="flex-1 overflow-y-auto bg-background flex flex-col">
          <Outlet />
        </main>
      </div>

      {/* ── Settings Modal Overlay ── */}
      {isSettingsOpen && (
        <div
          className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
          onClick={closeSettings}
        >
          <div
            className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_25px_rgba(0,0,0,0.08)] w-full max-w-md overflow-hidden border border-surface-variant relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-lg pb-md border-b border-surface-container-highest">
              <h2 className="font-headline text-headline-md text-on-surface">Settings</h2>
              <button
                onClick={closeSettings}
                className="text-on-surface-variant hover:text-on-surface transition-colors rounded-full p-xs hover:bg-surface-container focus:outline-none"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-lg flex flex-col gap-lg">

              {/* Account Info */}
              <section>
                <h3 className="font-body text-label-md text-secondary uppercase tracking-wider mb-sm">Account Information</h3>
                <div className="bg-surface rounded-lg p-md border border-surface-variant flex items-center gap-md">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">person</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-body text-body-lg text-on-surface truncate">{user?.email ?? '—'}</p>
                    {user?.name && (
                      <p className="font-body text-body-sm text-on-surface-variant truncate">{user.name}</p>
                    )}
                  </div>
                </div>
              </section>

              <hr className="border-surface-container-high" />

              {/* Security & Data */}
              <section className="flex flex-col gap-sm">
                <h3 className="font-body text-label-md text-secondary uppercase tracking-wider mb-xs">Security &amp; Data</h3>

                {/* ── Change Password ── */}
                <div className="bg-surface-container-lowest border border-surface-variant rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsChangingPassword(v => !v)}
                    className="w-full flex items-center justify-between p-md hover:bg-surface-container transition-colors group"
                  >
                    <div className="flex items-center gap-sm text-on-surface">
                      <span className="material-symbols-outlined text-outline">password</span>
                      <span className="font-body text-body-md font-medium">Change Password</span>
                    </div>
                    <span className={`material-symbols-outlined text-outline group-hover:text-on-surface transition-all duration-200 ${isChangingPassword ? 'rotate-90' : ''}`}>
                      chevron_right
                    </span>
                  </button>

                  {/* Inline password form */}
                  {isChangingPassword && (
                    <div className="px-md pb-md flex flex-col gap-sm border-t border-surface-container-highest">
                      <div className="pt-sm flex flex-col gap-xs">
                        <label className="font-body text-label-md text-on-surface-variant font-medium" htmlFor="cur-pwd">
                          Current Password
                        </label>
                        <input
                          id="cur-pwd"
                          type="password"
                          placeholder="••••••••"
                          value={currentPwd}
                          onChange={e => setCurrentPwd(e.target.value)}
                          className="w-full bg-surface border border-outline-variant rounded-lg px-md py-[8px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors placeholder:text-outline"
                        />
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-body text-label-md text-on-surface-variant font-medium" htmlFor="new-pwd">
                          New Password
                        </label>
                        <input
                          id="new-pwd"
                          type="password"
                          placeholder="••••••••"
                          value={newPwd}
                          onChange={e => setNewPwd(e.target.value)}
                          className="w-full bg-surface border border-outline-variant rounded-lg px-md py-[8px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors placeholder:text-outline"
                        />
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="font-body text-label-md text-on-surface-variant font-medium" htmlFor="confirm-pwd">
                          Confirm Password
                        </label>
                        <input
                          id="confirm-pwd"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPwd}
                          onChange={e => setConfirmPwd(e.target.value)}
                          className="w-full bg-surface border border-outline-variant rounded-lg px-md py-[8px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors placeholder:text-outline"
                        />
                      </div>
                      <button
                        onClick={() => { setIsChangingPassword(false); setCurrentPwd(''); setNewPwd(''); setConfirmPwd(''); }}
                        className="mt-xs w-full bg-primary text-on-primary font-body text-label-md font-semibold py-[9px] rounded-lg hover:bg-primary-container transition-colors"
                      >
                        Save New Password
                      </button>
                    </div>
                  )}
                </div>

                {/* ── Sync Data ── */}
                <button
                  onClick={handleSync}
                  className="w-full flex items-center justify-between p-md bg-surface-container-lowest border border-surface-variant rounded-lg hover:bg-surface-container transition-colors group"
                >
                  <div className="flex items-center gap-sm text-on-surface">
                    <span className={`material-symbols-outlined text-outline ${syncStatus === 'syncing' ? 'animate-spin' : ''}`}>
                      sync
                    </span>
                    <span className="font-body text-body-md font-medium">Sync Data</span>
                  </div>
                  {syncStatus === 'idle' && (
                    <span className="font-body text-label-sm text-outline bg-surface-variant px-2 py-1 rounded-full">
                      Up to date
                    </span>
                  )}
                  {syncStatus === 'syncing' && (
                    <span className="font-body text-label-sm text-primary bg-primary-fixed px-2 py-1 rounded-full animate-pulse">
                      Sync in progress...
                    </span>
                  )}
                  {syncStatus === 'synced' && (
                    <span className="font-body text-label-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                      Up to date
                    </span>
                  )}
                </button>
              </section>
            </div>

            {/* Footer */}
            <div className="p-lg bg-surface pt-md border-t border-surface-container-highest">
              <button
                onClick={async () => {
                  closeSettings();
                  await logout();
                  navigate('/');
                }}
                className="w-full bg-error text-on-error font-body font-medium py-3 rounded-lg hover:bg-error/90 transition-colors flex items-center justify-center gap-sm focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AppShell() {
  return (
    <SearchProvider>
      <AppShellInner />
    </SearchProvider>
  );
}
