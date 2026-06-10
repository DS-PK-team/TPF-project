import { useState, useEffect, useMemo } from 'react';
import DocumentCard from '../components/DocumentCard';
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
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getSharedDocuments().then((docs) => {
      setDocuments(docs);
      setIsLoading(false);
    });
  }, []);

  const filtered = useMemo(
    () => documents.filter((d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [documents, searchQuery]
  );

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

          {/* Member Avatars */}
          <div className="flex items-center gap-sm">
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
            <span className="font-body text-label-md text-on-surface-variant ml-1">3 members</span>
            <button className="ml-2 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-outline-variant font-body text-label-md text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              Invite
            </button>
          </div>
        </div>

        {/* Search (mobile) */}
        <div className="mb-lg block md:hidden">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search shared files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-outline-variant rounded-lg py-2 pl-10 pr-4 font-body text-body-md text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
        </div>

        {/* Shared Access Banner */}
        <div className="mb-lg p-md rounded-xl bg-secondary-container/30 border border-secondary-container/50 flex items-center gap-sm">
          <span className="material-symbols-outlined text-secondary shrink-0">lock_open</span>
          <p className="font-body text-body-md text-secondary">
            These documents are visible to all family members. Manage permissions in{' '}
            <button className="underline font-semibold hover:text-primary transition-colors">Settings</button>.
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
              {searchQuery ? `No results for "${searchQuery}"` : 'Share a document from your Archive to get started.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
            {filtered.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        )}

        {/* Stats footer */}
        {!isLoading && filtered.length > 0 && (
          <div className="mt-xl pt-lg border-t border-outline-variant/30">
            <p className="font-body text-label-md text-on-surface-variant">
              <span className="text-on-surface font-semibold">{filtered.length}</span> shared document{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
