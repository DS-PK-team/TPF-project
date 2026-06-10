import type { Document } from '../types';
import { PERSONAL_DOCUMENTS, SHARED_DOCUMENTS } from '../mocks/documents';

/** Simulates an async API call to retrieve personal documents. */
export function getPersonalDocuments(): Promise<Document[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...PERSONAL_DOCUMENTS]), 600);
  });
}

/** Simulates an async API call to retrieve shared documents. */
export function getSharedDocuments(): Promise<Document[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...SHARED_DOCUMENTS]), 600);
  });
}
