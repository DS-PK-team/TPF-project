import { useState, useEffect, useMemo, useCallback } from 'react';
import DocumentCard from '../components/DocumentCard';
import Toast from '../components/Toast';
import ManageAccessModal from '../components/ManageAccessModal';
import { useSearch } from '../context/SearchContext';
import { getSharedDocuments } from '../services/documentsService';
import type { Document } from '../types';

function SkeletonCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-surface-container-high" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-surface-container-highest rounded w-3/4" />
        <div className="h-3 bg-surface-container-high rounded w-1/2" />
        <div className="h-5 bg-surface-container rounded w-1/4 rounded-full" />
      </div>
    </div>
  );
}

export default function SharedView() {
  const { searchQuery } = useSearch();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; icon: string } | null>(null);
  const [manageDoc, setManageDoc] = useState<Document | null>(null);

  // Invite form state
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getSharedDocuments().then((docs) => { setDocuments(docs); setIsLoading(false); });
  }, []);

  const filtered = useMemo(
    () => documents.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [documents, searchQuery]
  );

  const showToast = useCallback((message: string, icon = 'info') => {
    setToast({ message, icon });
  }, []);

  const handleDownload = useCallback((_id: string) => {
    showToast('Download started…', 'download');
  }, [showToast]);

  const handleManageAccess = useCallback((id: string) => {
    setManageDoc(documents.find(d => d.id === id) ?? null);
  }, [documents]);

  const handleMoveToPrivate = useCallback((id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast('Document moved to your private archive', 'lock');
  }, [showToast]);

  const handleConfirmShare = useCallback((_userIds: string[]) => {
    showToast('Permissions updated successfully', 'share');
    setManageDoc(null);
  }, [showToast]);

  const handleInviteConfirm = () => {
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
    showToast(`Invite sent to ${inviteEmail}`, 'send');
    setTimeout(() => {
      setInviteOpen(false);
      setInviteEmail('');
      setInviteSent(false);
    }, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto p-xl">
      <div className="max-w-container-max mx-auto w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
          <div>
            <h1 className="font-headline text-headline-lg text-on-surface tracking-tight">Shared</h1>
            <p className="font-body text-body-md text-on-surface-variant mt-1">
              Documents shared with family members and collaborators.
            </p>
          </div>

          {/* Member Avatars + Invite */}
          <div className="flex items-center gap-sm flex-wrap">
            <div className="flex -space-x-2">
              {['A', 'P', 'K'].map((initial, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-secondary-container flex items-center justify-center text-on-secondary-container font-body text-label-sm font-semibold"
                >
                  {initial}
                </div>
              ))}
            </div>
            <span className="font-body text-label-md text-on-surface-variant">3 members</span>

            {/* Invite button or inline form */}
            {!inviteOpen ? (
              <button
                onClick={() => setInviteOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-outline-variant font-body text-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                Invite
              </button>
            ) : (
              <div className="flex items-center gap-sm">
                <input
                  type="email"
                  autoFocus
                  placeholder="email@example.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleInviteConfirm(); if (e.key === 'Escape') setInviteOpen(false); }}
                  className="border border-outline-variant rounded-lg px-md py-[6px] font-body text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors w-52"
                />
                <button
                  onClick={() => { setInviteOpen(false); setInviteEmail(''); }}
                  className="px-3 py-1.5 rounded-lg border border-outline-variant font-body text-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInviteConfirm}
                  disabled={!inviteEmail.trim() || inviteSent}
                  className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-body text-label-md hover:bg-primary-container transition-colors disabled:opacity-40 flex items-center gap-1"
                >
                  {inviteSent
                    ? <span className="material-symbols-outlined text-[16px]">check</span>
                    : <span className="material-symbols-outlined text-[16px]">send</span>}
                  {inviteSent ? 'Sent!' : 'Confirm'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Shared Access Banner */}
        <div className="mb-lg p-md rounded-xl bg-secondary-container/30 border border-secondary-container/50 flex items-center gap-sm">
          <span className="material-symbols-outlined text-secondary shrink-0">lock_open</span>
          <p className="font-body text-body-md text-secondary">
            These documents are visible to all family members. To manage permissions, click the{' '}
            <span className="inline-flex items-center gap-0.5 font-semibold">
              <span className="material-symbols-outlined text-[16px]">more_vert</span>
              menu
            </span>
            {' '}on any document.
          </p>
        </div>

        {/* Document Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-[64px] text-outline-variant mb-4">group</span>
            <h3 className="font-headline text-headline-sm text-on-surface mb-2">No shared documents</h3>
            <p className="font-body text-body-md text-on-surface-variant">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : 'Share a document from your Archive to get started.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
            {filtered.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                isShared={true}
                onDownload={handleDownload}
                onManageAccess={handleManageAccess}
                onMoveToPrivate={handleMoveToPrivate}
              />
            ))}
          </div>
        )}

        {/* Stats footer */}
        {!isLoading && filtered.length > 0 && (
          <div className="mt-xl pt-lg border-t border-outline-variant/30">
            <p className="font-body text-label-md text-on-surface-variant">
              <span className="text-on-surface font-semibold">{filtered.length}</span>{' '}
              shared document{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} icon={toast.icon} onClose={() => setToast(null)} />}

      {/* Manage Access Modal */}
      {manageDoc && (
        <ManageAccessModal
          documentTitle={manageDoc.title}
          onConfirm={handleConfirmShare}
          onCancel={() => setManageDoc(null)}
        />
      )}
    </div>
  );
}
