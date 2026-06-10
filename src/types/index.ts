// ─── Domain Types ───────────────────────────────────────────────────────────

export type DocumentType =
  | 'Invoice'
  | 'Contract'
  | 'Receipt'
  | 'Blueprint'
  | 'Report'
  | 'Other';

export interface Document {
  id: string;
  title: string;
  thumbnailUrl: string;
  documentType: DocumentType;
  /** Human-readable size, e.g. "2.4 MB" */
  fileSize: string;
  tags: string[];
  owner: string;
  /** ISO date string, e.g. "2023-10-12" */
  uploadDate: string;
  isPrivate: boolean;
}

export interface Folder {
  id: string;
  name: string;
  documentCount: number;
  /** user ids that have access */
  sharedWith: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
