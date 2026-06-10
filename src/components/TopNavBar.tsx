import React from 'react';

interface TopNavBarProps {
  onSearchQueryChange?: (val: string) => void;
  avatarUrl?: string;
}

export default function TopNavBar({ onSearchQueryChange, avatarUrl }: TopNavBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchQueryChange) {
      onSearchQueryChange(e.target.value);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-outline-variant flex items-center justify-between px-lg select-none shrink-0 sticky top-0 z-10">
      {/* Search Section */}
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-md text-[20px] text-on-surface-variant pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Szukaj dokumentów, tagów, kwot..."
            onChange={handleSearchChange}
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-[44px] pr-md py-sm text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* User Actions & Profile */}
      <div className="flex items-center gap-md">
        {/* Notification bell */}
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors relative">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-sm border-l border-outline-variant pl-md">
          <div className="text-right">
            <p className="text-body-md font-semibold text-on-surface">Jan Kowalski</p>
            <p className="text-label-md text-on-surface-variant">jan.kowalski@example.com</p>
          </div>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-outline-variant"
            />
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
