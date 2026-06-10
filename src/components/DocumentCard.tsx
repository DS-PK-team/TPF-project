import type { Document, DocumentType } from '../types';

interface DocumentCardProps {
  document: Document;
  onClick?: (id: string) => void;
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
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function DocumentCard({ document, onClick }: DocumentCardProps) {
  const badge = TYPE_BADGE[document.documentType];

  return (
    <article
      onClick={() => onClick?.(document.id)}
      className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.03)] border border-outline-variant/30 overflow-hidden flex flex-col group hover:shadow-[0px_10px_25px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-surface-container-low relative overflow-hidden border-b border-outline-variant/20">
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
          <button
            aria-label="Document options"
            onClick={(e) => e.stopPropagation()}
            className="text-outline hover:text-primary transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>

        <div className="font-body text-label-sm text-on-surface-variant flex items-center justify-between mt-auto pt-2">
          <span>{formatDate(document.uploadDate)}</span>
          <span>{document.fileSize}</span>
        </div>

        <div className="mt-1 flex flex-wrap gap-1">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full font-body text-label-sm w-fit border ${badge.className}`}
          >
            {badge.label}
          </span>
          {document.isPrivate && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-body text-label-sm bg-surface-container text-outline border border-outline-variant/30">
              <span className="material-symbols-outlined text-[12px]">lock</span>
              Private
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
