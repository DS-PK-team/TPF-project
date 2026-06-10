import { useState } from 'react';

interface MockUser {
  id: string;
  name: string;
  email: string;
  initials: string;
}

const MOCK_USERS: MockUser[] = [
  { id: 'u1', name: 'Anna Kowalska',  email: 'anna@family.home',   initials: 'AK' },
  { id: 'u2', name: 'Piotr Nowak',   email: 'piotr@family.home',  initials: 'PN' },
  { id: 'u3', name: 'Katarzyna Maj', email: 'kasia@family.home',  initials: 'KM' },
  { id: 'u4', name: 'Marek Wiśniewski', email: 'marek@work.com', initials: 'MW' },
];

interface ManageAccessModalProps {
  documentTitle: string;
  onConfirm: (userIds: string[]) => void;
  onCancel: () => void;
}

export default function ManageAccessModal({ documentTitle, onConfirm, onCancel }: ManageAccessModalProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="fixed inset-0 z-[80] bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.1)] w-full max-w-sm overflow-hidden border border-surface-variant"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-lg pb-md border-b border-surface-container-highest">
          <div>
            <h2 className="font-headline text-headline-sm text-on-surface">Manage Access</h2>
            <p className="font-body text-label-md text-on-surface-variant mt-0.5 truncate max-w-[200px]">{documentTitle}</p>
          </div>
          <button onClick={onCancel} className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* User List */}
        <div className="p-lg flex flex-col gap-sm">
          <p className="font-body text-label-md text-secondary uppercase tracking-wider mb-xs">Select people to share with</p>
          {MOCK_USERS.map(user => {
            const isSelected = selected.includes(user.id);
            return (
              <label
                key={user.id}
                className={`flex items-center gap-md p-sm rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected ? 'border-primary bg-primary-fixed/20' : 'border-surface-variant hover:border-outline-variant'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(user.id)}
                  className="sr-only"
                />
                <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-body text-label-md font-bold shrink-0">
                  {user.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-body-md font-semibold text-on-surface truncate">{user.name}</p>
                  <p className="font-body text-label-sm text-on-surface-variant truncate">{user.email}</p>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  isSelected ? 'border-primary bg-primary' : 'border-outline-variant'
                }`}>
                  {isSelected && <span className="material-symbols-outlined text-on-primary text-[14px]">check</span>}
                </div>
              </label>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex gap-sm px-lg pb-lg">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg border border-outline-variant font-body text-label-md text-on-surface hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selected)}
            disabled={selected.length === 0}
            className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary font-body text-label-md hover:bg-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-sm"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share ({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
}
