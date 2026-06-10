import { useState, useRef, useEffect } from 'react';
import type { Document, DocumentType } from '../types';

export interface DocumentCardProps {
  document: Document;
  isShared?: boolean;
  onDownload?: (id: string) => void;
  onManageAccess?: (id: string) => void;
  onMoveToPrivate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TYPE_BADGE: Record<DocumentType, { label: string; className: string }> = {
  Invoice:   { label: 'Invoice',   className: 'bg-secondary-container/50 text-on-secondary-container border-secondary-container' },
  Contract:  { label: 'Contract',  className: 'bg-tertiary-container/20 text-tertiary border-tertiary-container/30' },
  Receipt:   { label: 'Receipt',   className: 'bg-surface-container-high text-on-surface-variant border-outline-variant/50' },
  Blueprint: { label: 'Blueprint', className: 'bg-primary-fixed/30 text-on-primary-fixed border-primary-fixed' },
  Report:    { label: 'Report',    className: 'bg-secondary-fixed/30 text-secondary border-secondary-fixed/50' },
  Other:     { label: 'Other',     className: 'bg-surface-container text-on-surface-variant border-outline-variant/30' },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export default function DocumentCard({
  document,
  isShared = false,
  onDownload,
  onManageAccess,
  onMoveToPrivate,
  onDelete,
}: DocumentCardProps) {
  const badge = TYPE_BADGE[document.documentType];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const handleCardClick = () => {
    if (menuOpen) return;
    onDownload?.(document.id); // clicking card triggers download notification
  };

  return (
    <article
      onClick={handleCardClick}
      className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.03)] border border-outline-variant/30 flex flex-col group hover:shadow-[0px_10px_25px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer relative"
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-surface-container-low relative overflow-hidden border-b border-outline-variant/20 rounded-t-xl">
        <img
          src={document.thumbnailUrl}
          alt={document.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-body text-body-md font-semibold text-on-surface line-clamp-1 flex-1"
            title={document.title}
          >
            {document.title}
          </h3>

          {/* ⋮ Menu button + dropdown */}
          <div ref={menuRef} className="relative shrink-0" onClick={e => e.stopPropagation()}>
            <button
              aria-label="Document options"
              onClick={() => setMenuOpen(v => !v)}
              className={`text-outline hover:text-primary transition-colors rounded-full p-0.5 ${menuOpen ? 'text-primary bg-primary-fixed/30' : ''}`}
            >
              <span className="material-symbols-outlined text-[18px]">more_vert</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-7 z-50 bg-surface-container-lowest border border-surface-variant rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] w-48 py-1 overflow-hidden">
                <button
                  onClick={() => { setMenuOpen(false); onDownload?.(document.id); }}
                  className="w-full flex items-center gap-sm px-md py-sm hover:bg-surface-container transition-colors text-on-surface font-body text-label-md text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">download</span>
                  Download
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onManageAccess?.(document.id); }}
                  className="w-full flex items-center gap-sm px-md py-sm hover:bg-surface-container transition-colors text-on-surface font-body text-label-md text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">person_add</span>
                  Manage Access
                </button>
                {isShared && (
                  <button
                    onClick={() => { setMenuOpen(false); onMoveToPrivate?.(document.id); }}
                    className="w-full flex items-center gap-sm px-md py-sm hover:bg-surface-container transition-colors text-primary font-body text-label-md text-left border-t border-surface-container-high mt-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                    Move to Private
                  </button>
                )}
                {!isShared && onDelete && (
                  <>
                    <div className="h-px bg-outline-variant/20 my-1 mx-md" />
                    <button
                      onClick={() => { setMenuOpen(false); onDelete(document.id); }}
                      className="w-full flex items-center gap-sm px-md py-sm hover:bg-error-container/20 transition-colors text-error font-body text-label-md text-left"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="font-body text-label-sm text-on-surface-variant flex items-center justify-between mt-auto pt-2">
          <span>{formatDate(document.uploadDate)}</span>
          <span>{document.fileSize}</span>
        </div>

        <div className="mt-1 flex flex-wrap gap-1">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-body text-label-sm w-fit border ${badge.className}`}>
            {badge.label}
          </span>
          {document.isPrivate && !isShared && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-body text-label-sm bg-surface-container text-outline border border-outline-variant/30">
              <span className="material-symbols-outlined text-[12px]">lock</span>
              Private
            </span>
          )}
          {isShared && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-body text-label-sm bg-secondary-container/40 text-secondary border border-secondary-container/30">
              <span className="material-symbols-outlined text-[12px]">group</span>
              Shared
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
