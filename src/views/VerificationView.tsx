import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type ViewMode = 'queue' | 'edit-tags';

interface QueueItem {
  id: string;
  name: string;
  icon: string;
  status: 'error-format' | 'error-quality' | 'ready';
  errorLabel?: string;
  errorDesc?: string;
  tags: string[];
  meta?: string;
}

const QUEUE_ITEMS: QueueItem[] = [
  {
    id: '1', name: 'Q3_Financial_Projections.exe', icon: 'block',
    status: 'error-format', errorLabel: 'Unsupported Format',
    errorDesc: 'Executables are not permitted for security reasons.',
    tags: ['Archive', 'Finances'],
  },
  {
    id: '2', name: 'Lunch_Receipt_Oct23.jpg', icon: 'warning',
    status: 'error-quality', errorLabel: 'Low Quality',
    errorDesc: 'This image appears blurry. Text extraction may fail.',
    tags: ['Archive', 'Receipts'],
  },
  {
    id: '3', name: 'Client_Agreement_V2.pdf', icon: 'description',
    status: 'ready', meta: '2.4 MB • 12 Pages',
    tags: ['Client Docs', 'Agreements'],
  },
  {
    id: '4', name: 'Resume_Update_2024.jpg', icon: 'image',
    status: 'ready', meta: '1.1 MB • Image Scan',
    tags: ['Career', 'Personal'],
  },
];

const TAG_OPTIONS = [
  { label: 'Financial Records', tags: ['#Q3_2023', '#Finance', '#Reports'], aiSuggested: true },
  { label: 'Active Projects',   tags: ['#Project_X', '#Audit'],             aiSuggested: false },
  { label: 'Archive General',   tags: ['#Unsorted', '#2023'],               aiSuggested: false },
];

export default function VerificationView() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialMode: ViewMode = (location.state as { mode?: ViewMode })?.mode ?? 'queue';
  const [mode, setMode] = useState<ViewMode>(initialMode);
  const [items, setItems] = useState<QueueItem[]>(QUEUE_ITEMS);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState(0);
  const [customTag, setCustomTag] = useState('');
  const [extraTags, setExtraTags] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isRetrying, setIsRetrying] = useState<string | null>(null);

  const editingItem = items.find(i => i.id === editingItemId) ?? null;
  const validCount = items.filter(i => i.status === 'ready').length;

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const openEditTags = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    setEditingItemId(id);
    setSelectedTag(0);
    setCustomTag('');
    setExtraTags([]);
    setZoomLevel(100);
    setMode('edit-tags');
  };

  const closeEditTags = () => {
    setEditingItemId(null);
    setMode('queue');
  };

  const handleRetryUpload = (id: string) => {
    setIsRetrying(id);
    setTimeout(() => {
      setItems(prev => prev.map(item =>
        item.id === id
          ? { ...item, status: 'ready' as const, icon: 'image', meta: '1.2 MB • Image Scan', errorLabel: undefined, errorDesc: undefined }
          : item
      ));
      setIsRetrying(null);
    }, 1200);
  };

  const handleAddCustomTag = () => {
    const trimmed = customTag.trim();
    if (!trimmed) return;
    const tag = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
    if (!extraTags.includes(tag) && !TAG_OPTIONS[selectedTag].tags.includes(tag)) {
      setExtraTags(prev => [...prev, tag]);
    }
    setCustomTag('');
  };

  const handleConfirmSave = () => {
    if (!editingItemId) return;
    const chosenTags = [
      ...TAG_OPTIONS[selectedTag].tags.map(t => t.replace('#', '')),
      ...extraTags.map(t => t.replace('#', '')),
    ];
    setItems(prev => prev.map(item =>
      item.id === editingItemId ? { ...item, tags: chosenTags } : item
    ));
    closeEditTags();
  };

  /* ─── QUEUE MODE ─── */
  if (mode === 'queue') {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-lg pb-32">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-headline text-headline-lg text-on-surface mb-2">Upload Queue</h1>
              <p className="font-body text-body-md text-on-surface-variant">
                Review items before finalizing upload.{' '}
                {items.filter(i => i.status !== 'ready').length} items require attention.
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.03)] border border-surface-variant overflow-hidden">
              {items.map((item, index) => {
                const isError   = item.status === 'error-format';
                const isWarning = item.status === 'error-quality';
                const isReady   = item.status === 'ready';

                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 p-5 ${index < items.length - 1 ? 'border-b border-surface-variant' : ''} ${
                      isError   ? 'bg-error-container/20' :
                      isWarning ? 'bg-tertiary-fixed/20' : ''
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                      isError   ? 'bg-error-container text-error' :
                      isWarning ? 'bg-tertiary-fixed text-tertiary' :
                                  'bg-secondary-fixed text-on-secondary-container'
                    }`}>
                      <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                    </div>

                    {isReady ? (
                      <div className="flex-1 min-w-0">
                        <h3 className="font-headline text-headline-sm text-on-surface truncate mb-1">{item.name}</h3>
                        <p className="font-body text-body-md text-on-surface-variant">
                          {item.meta} •{' '}
                          <span className="inline-flex gap-2 ml-1">
                            {item.tags.map(t => (
                              <span key={t} className="font-body text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant border border-surface-container-highest">{t}</span>
                            ))}
                          </span>
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => openEditTags(item.id)}
                            className="font-body text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit_location</span>
                            Edit Tags
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <h3 className="font-headline text-headline-sm text-on-surface truncate">{item.name}</h3>
                          <span className={`font-body text-label-sm px-2.5 py-1 rounded-full whitespace-nowrap ${
                            isError
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-tertiary-fixed text-on-tertiary-fixed'
                          }`}>
                            {item.errorLabel}
                          </span>
                        </div>
                        <p className="font-body text-body-md text-on-surface-variant mb-3">{item.errorDesc}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.tags.map(t => (
                            <span key={t} className="font-body text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant border border-surface-container-highest">{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          {isWarning && (
                            <button
                              onClick={() => handleRetryUpload(item.id)}
                              disabled={isRetrying === item.id}
                              className="font-body text-label-md text-tertiary hover:text-tertiary-container transition-colors flex items-center gap-1 disabled:opacity-60"
                            >
                              <span className={`material-symbols-outlined text-[16px] ${isRetrying === item.id ? 'animate-spin' : ''}`}>
                                {isRetrying === item.id ? 'progress_activity' : 'refresh'}
                              </span>
                              {isRetrying === item.id ? 'Retrying…' : 'Retry Upload'}
                            </button>
                          )}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="font-body text-label-md text-error hover:text-on-error-container transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            Remove
                          </button>
                          <button
                            onClick={() => openEditTags(item.id)}
                            className="font-body text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit_location</span>
                            Edit Tags
                          </button>
                        </div>
                      </div>
                    )}

                    {isReady && (
                      <div className="flex items-center gap-2 text-primary-container shrink-0">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                        <span className="font-body text-label-md hidden sm:inline">Ready</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <div className="fixed bottom-8 flex items-center gap-4 z-50 w-full justify-center left-0 right-0 px-6">
          <div className="bg-white/90 backdrop-blur-md border border-surface-variant p-1.5 rounded-xl shadow-xl hover:bg-white transition-colors cursor-pointer">
            <button
              onClick={() => navigate('/upload')}
              className="font-body text-label-md text-on-surface-variant px-6 py-2 whitespace-nowrap font-semibold"
            >
              Cancel
            </button>
          </div>
          <div className="backdrop-blur-md rounded-xl shadow-xl p-1.5 bg-error hover:bg-on-error-container transition-colors cursor-pointer">
            <button
              onClick={() => setItems(prev => prev.filter(i => i.status === 'ready'))}
              className="font-body text-label-md px-4 py-2 whitespace-nowrap font-bold text-white"
            >
              Remove all files with errors
            </button>
          </div>
          <div className="bg-primary p-1.5 rounded-xl shadow-xl hover:bg-primary-container transition-colors cursor-pointer">
            <button
              onClick={() => navigate('/success')}
              className="font-body text-label-md px-6 py-2 whitespace-nowrap font-bold text-white"
            >
              Approve {validCount} valid file{validCount !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── EDIT TAGS MODE ─── */
  const previewTags = editingItem
    ? [...TAG_OPTIONS[selectedTag].tags, ...extraTags]
    : [];

  return (
    <main className="flex-1 p-lg xl:p-xl max-w-[1280px] mx-auto w-full overflow-y-auto">
      <div className="mb-lg">
        <button
          onClick={closeEditTags}
          className="flex items-center gap-2 text-on-surface-variant mb-2 hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="font-body text-label-md">Back to Upload Queue</span>
        </button>
        <h2 className="font-headline text-headline-lg text-on-surface">Edit Destination</h2>
        {editingItem && (
          <p className="font-body text-body-md text-on-surface-variant mt-1">{editingItem.name}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xl">
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.03)] overflow-hidden flex-1 min-h-[500px] flex flex-col">
            <div className="bg-surface-container-low px-4 py-3 border-b border-outline-variant/30 flex items-center justify-between gap-sm">
              <div className="flex items-center gap-sm min-w-0">
                <span className="material-symbols-outlined text-secondary shrink-0">
                  {editingItem?.icon === 'image' ? 'image' : 'description'}
                </span>
                <span className="font-body text-label-md text-on-surface truncate">
                  {editingItem?.name ?? 'Document'}
                </span>
              </div>
              <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
                {previewTags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-surface-container p-6 flex items-center justify-center overflow-auto">
              <div
                className="w-full max-w-md aspect-[1/1.4] bg-surface-container-lowest shadow-md border border-outline-variant/20 rounded relative overflow-hidden flex flex-col p-8 transition-transform duration-200 origin-center"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                <div className="w-1/2 h-8 bg-surface-variant rounded mb-8" />
                <div className="space-y-4 w-full">
                  <div className="w-full h-4 bg-surface-container-highest rounded" />
                  <div className="w-[90%] h-4 bg-surface-container-highest rounded" />
                  <div className="w-[95%] h-4 bg-surface-container-highest rounded" />
                  <div className="w-[80%] h-4 bg-surface-container-highest rounded" />
                </div>
                <div className="mt-12 space-y-4 w-full">
                  <div className="w-full h-24 bg-surface-container rounded" />
                  <div className="w-[60%] h-4 bg-surface-container-highest rounded" />
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setZoomLevel(z => Math.min(z + 25, 150))}
                    disabled={zoomLevel >= 150}
                    className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant/20 disabled:opacity-40"
                    aria-label="Zoom in"
                  >
                    <span className="material-symbols-outlined text-sm">zoom_in</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(z => Math.max(z - 25, 75))}
                    disabled={zoomLevel <= 75}
                    className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant/20 disabled:opacity-40"
                    aria-label="Zoom out"
                  >
                    <span className="material-symbols-outlined text-sm">zoom_out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-lg">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.03)] p-6">
            <h3 className="font-headline text-headline-md text-on-surface mb-6">Edit Tags</h3>
            <div className="space-y-4">
              {TAG_OPTIONS.map((opt, i) => (
                <label key={i} className="block relative cursor-pointer group">
                  <input
                    type="radio"
                    name="tag_set"
                    checked={selectedTag === i}
                    onChange={() => setSelectedTag(i)}
                    className="peer sr-only"
                  />
                  <div className={`p-4 rounded-lg border-2 transition-all flex items-start gap-4 ${
                    selectedTag === i
                      ? 'border-primary bg-primary-fixed/20'
                      : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/50'
                  }`}>
                    <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      selectedTag === i ? 'border-primary' : 'border-outline-variant'
                    }`}>
                      {selectedTag === i && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-body text-label-md text-on-surface">{opt.label}</span>
                        {opt.aiSuggested && (
                          <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-semibold border border-primary/20">
                            <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
                            Suggested by AI
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {opt.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded bg-surface-container-high text-xs text-on-surface-variant font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {extraTags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {extraTags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-primary-fixed/30 text-primary text-xs font-medium">{tag}</span>
                ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-outline-variant/30 text-center">
              <p className="font-body text-body-md text-on-surface-variant mb-4 text-sm">Need different tags?</p>
              <div className="relative">
                <input
                  type="text"
                  value={customTag}
                  onChange={e => setCustomTag(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomTag(); } }}
                  placeholder="Add custom tags..."
                  className="w-full bg-surface-container border border-outline-variant/40 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary-container transition-colors"
                  aria-label="Add custom tag"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-sm pt-md border-t border-outline-variant/30">
            <button
              onClick={closeEditTags}
              className="px-6 py-2.5 rounded-lg font-body text-label-md text-on-surface hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/30"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSave}
              className="px-6 py-2.5 rounded-lg font-body text-label-md bg-primary text-on-primary hover:bg-primary-container shadow-sm transition-colors flex items-center gap-2"
            >
              Confirm &amp; Save
              <span className="material-symbols-outlined text-sm">check</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
