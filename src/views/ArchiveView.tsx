import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentCard from '../components/DocumentCard';
import Toast from '../components/Toast';
import ManageAccessModal from '../components/ManageAccessModal';
import { useSearch } from '../context/SearchContext';
import { getPersonalDocuments } from '../services/documentsService';
import type { Document, DocumentType } from '../types';

type Filter = 'All' | DocumentType;
type DateFilter = 'any' | 'today' | 'week' | 'month' | 'year';

const FILTERS: Filter[] = ['All', 'Invoice', 'Contract', 'Receipt', 'Blueprint', 'Report'];
const DATE_OPTIONS: { value: DateFilter; label: string }[] = [
  { value: 'any',   label: 'Any Date' },
  { value: 'today', label: 'Today' },
  { value: 'week',  label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year',  label: 'This Year' },
];

function isWithinRange(iso: string, range: DateFilter): boolean {
  if (range === 'any') return true;
  const d = new Date(iso);
  const now = new Date();
  if (range === 'today') {
    return d.toDateString() === now.toDateString();
  }
  if (range === 'week') {
    const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
    return d >= weekAgo;
  }
  if (range === 'month') {
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }
  if (range === 'year') {
    return d.getFullYear() === now.getFullYear();
  }
  return true;
}

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

export default function ArchiveView() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [dateFilter, setDateFilter] = useState<DateFilter>('any');
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; icon: string } | null>(null);
  const [manageDoc, setManageDoc] = useState<Document | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPersonalDocuments().then((docs) => { setDocuments(docs); setIsLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchesType   = activeFilter === 'All' || doc.documentType === activeFilter;
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate   = isWithinRange(doc.uploadDate, dateFilter);
      return matchesType && matchesSearch && matchesDate;
    });
  }, [documents, activeFilter, searchQuery, dateFilter]);

  const showToast = useCallback((message: string, icon = 'download') => {
    setToast({ message, icon });
  }, []);

  const handleDownload = useCallback((_id: string) => {
    showToast('Download started…', 'download');
  }, [showToast]);

  const handleManageAccess = useCallback((id: string) => {
    const doc = documents.find(d => d.id === id) ?? null;
    setManageDoc(doc);
  }, [documents]);

  const handleConfirmShare = useCallback((_userIds: string[]) => {
    if (!manageDoc) return;
    setDocuments(prev => prev.map(d =>
      d.id === manageDoc.id ? { ...d, isPrivate: false } : d
    ));
    showToast('Document shared successfully', 'share');
    setManageDoc(null);
  }, [manageDoc, showToast]);

  const handleDelete = useCallback((id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    showToast('Document deleted', 'delete');
  }, [showToast]);

  const dateLabel = DATE_OPTIONS.find(o => o.value === dateFilter)?.label ?? 'Any Date';

  return (
    <div className="flex-1 overflow-y-auto p-xl">
      <div className="max-w-container-max mx-auto w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
          <div>
            <h1 className="font-headline text-headline-lg text-on-surface tracking-tight">Archive</h1>
            <p className="font-body text-body-md text-on-surface-variant mt-1">
              Browse and manage your securely stored documents.
            </p>
          </div>

          {/* Filter Chips + Date Picker */}
          <div className="flex items-center gap-sm flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-full font-body text-label-sm transition-colors ${
                  activeFilter === f
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-outline-variant'
                }`}
              >
                {f === 'All' ? 'All Files' : f + 's'}
              </button>
            ))}

            {/* Date Picker Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDateDropdownOpen(v => !v)}
                className={`ml-2 px-3 py-1.5 rounded-lg border font-body text-label-sm flex items-center gap-2 transition-colors ${
                  dateFilter !== 'any'
                    ? 'bg-primary text-on-primary border-primary shadow-sm'
                    : 'bg-surface-container-lowest border-outline-variant text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                {dateLabel}
                <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
              </button>
              {dateDropdownOpen && (
                <div className="absolute right-0 top-10 z-40 bg-surface-container-lowest border border-surface-variant rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] w-44 py-1 overflow-hidden">
                  {DATE_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setDateFilter(opt.value); setDateDropdownOpen(false); }}
                      className={`w-full flex items-center gap-sm px-md py-sm hover:bg-surface-container transition-colors font-body text-label-md text-left ${
                        dateFilter === opt.value ? 'text-primary font-semibold' : 'text-on-surface'
                      }`}
                    >
                      {dateFilter === opt.value && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Document Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-[64px] text-outline-variant mb-4">folder_open</span>
            <h3 className="font-headline text-headline-sm text-on-surface mb-2">No documents found</h3>
            <p className="font-body text-body-md text-on-surface-variant mb-6">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : `No documents match the selected filter${dateFilter !== 'any' ? ` in "${dateLabel}"` : ''}.`}
            </p>
            <button
              onClick={() => { setActiveFilter('All'); setSearchQuery(''); setDateFilter('any'); }}
              className="px-4 py-2 rounded-lg bg-primary text-on-primary font-body text-label-md hover:bg-primary-container transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg">
            {filtered.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                isShared={false}
                onDownload={handleDownload}
                onManageAccess={handleManageAccess}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Stats footer */}
        {!isLoading && filtered.length > 0 && (
          <div className="mt-xl pt-lg border-t border-outline-variant/30 flex items-center justify-between">
            <p className="font-body text-label-md text-on-surface-variant">
              Showing <span className="text-on-surface font-semibold">{filtered.length}</span> of{' '}
              <span className="text-on-surface font-semibold">{documents.length}</span> documents
            </p>
            <button
              onClick={() => navigate('/upload')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-body text-label-md hover:bg-primary-container transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Document
            </button>
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
