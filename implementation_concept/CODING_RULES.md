# Vault & Vellum — Szczegółowe Reguły Kodowania React/TypeScript

> Dokument uzupełniający `CLAUDE.md`. Zawiera konkretne reguły i wzorce używane przy konwersji szablonów HTML → React.

---

## 1. Reguły Ogólne — React & TypeScript

### 1.1 Struktura komponentu (obowiązujący szablon)

```tsx
// Kolejność sekcji w każdym pliku .tsx:
// 1. Importy (React, router, komponenty, typy, serwisy)
// 2. Definicja interface Props (jeśli komponent przyjmuje props)
// 3. Definicja komponentu (funkcja strzałkowa, NIGDY function declaration)
// 4. Export default na końcu

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DocumentCardProps } from '../types';

// Props zawsze jako osobny interface PRZED komponentem
interface DocumentCardProps {
  id: string;
  title: string;
  // ...
}

const DocumentCard = ({ id, title, uploadDate, tags = [] }: DocumentCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
};

export default DocumentCard;
```

### 1.2 Zakazane praktyki

```tsx
// ❌ ZAKAZANE — function declaration
function DocumentCard() { ... }

// ❌ ZAKAZANE — klasy
class DocumentCard extends React.Component { ... }

// ❌ ZAKAZANE — inline style (poza wyjątkami Material Symbols)
<div style={{ color: '#005a71' }}>

// ❌ ZAKAZANE — hardkodowane kolory HEX w className
<div className="bg-[#005a71]">  // tylko jako OSTATECZNOŚĆ gdy token nie istnieje

// ❌ ZAKAZANE — any w TypeScript
const data: any = ...

// ❌ ZAKAZANE — console.log w kodzie produkcyjnym (mock debugowanie OK)
```

### 1.3 Dopuszczalne wyjątki inline style

Jedyny dozwolony przypadek `style={}` to ustawienie wariantów fontów Material Symbols:
```tsx
// ✅ OK — wymagane przez specyfikację Material Symbols
<span 
  className="material-symbols-outlined"
  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
>
  inventory_2
</span>
```

---

## 2. Konwersja HTML → TSX — Zasady Transformacji

### 2.1 Mapowanie atrybutów HTML → JSX

| HTML | TSX |
|---|---|
| `class=""` | `className=""` |
| `for=""` | `htmlFor=""` |
| `onclick=""` | `onClick={}` |
| `onchange=""` | `onChange={}` |
| `tabindex=""` | `tabIndex={}` |
| `<!-- komentarz -->` | `{/* komentarz */}` |
| `style="font-size:20px"` | `style={{ fontSize: '20px' }}` |
| `<img>` | `<img />` (self-closing) |
| `<input>` | `<input />` (self-closing) |
| `<br>` | `<br />` (self-closing) |
| `&amp;` | `&` (JSX obsługuje natywnie) |

### 2.2 Jak korzystać z szablonów HTML

Przed napisaniem komponentu **zawsze** sprawdź odpowiedni szablon HTML:

| Komponent / Widok | Plik szablonu |
|---|---|
| LoginView | `templates/login.html` |
| ArchiveView | `templates/archive.html` |
| ArchiveView (z context menu) | `templates/archive-context.html` |
| UploadView (drag&drop) | `templates/upload-documents.html` |
| UploadView (progress) | `templates/upload-progress.html` |
| ProcessingView | `templates/processing.html` |
| VerificationView (kolejka) | `templates/upload-queue.html` |
| VerificationView (edit tags) | `templates/edit-tags.html` |
| SuccessView | `templates/success.html` |
| SharedView | `templates/shared.html` |
| Design system / stany | `templates/design-system.html` |

**Procedura konwersji szablonu:**
1. Otwórz plik HTML szablonu
2. Skopiuj strukturę JSX do komponentu React (konwertując atrybuty)
3. Zamień hardkodowane dane na props / dane z serwisu
4. Zamień statyczne `href="#"` na `<Link to="...">` z react-router-dom
5. Zamień statyczne `class` active states na warunkowe `className`
6. Dodaj obsługę zdarzeń (`onClick`, `onChange`)

### 2.3 Wzorzec aktywnego linku w SideNavBar

```tsx
// ❌ Hardkodowane w HTML:
<a class="bg-cyan-50 text-cyan-700" href="#">Archive</a>  {/* aktywny */}
<a class="text-slate-600" href="#">Upload</a>              {/* nieaktywny */}

// ✅ Poprawnie w React:
import { NavLink } from 'react-router-dom';

<NavLink
  to="/archive"
  className={({ isActive }) =>
    isActive
      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 rounded-lg flex items-center gap-3 px-3 py-2.5 transition-all font-[\'Manrope\'] text-sm font-semibold'
      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg flex items-center gap-3 px-3 py-2.5 transition-all font-[\'Manrope\'] text-sm font-semibold'
  }
>
  <span className="material-symbols-outlined">inventory_2</span>
  Archive
</NavLink>
```

---

## 3. Warstwa Mocków i Serwisów

### 3.1 Struktura pliku mock

```ts
// src/mocks/routes/documents.ts

import type { Document } from '../../types';

export const mockDocuments: Document[] = [
  {
    id: 'doc-001',
    title: 'Q3 Marketing Retainer Invoice',
    thumbnailUrl: 'https://lh3.googleusercontent.com/...',  // URL z szablonu HTML
    documentType: 'PDF',
    fileSize: '2.4 MB',
    tags: ['Invoices'],
    uploadDate: 'Oct 12, 2023',
    isPrivate: true,
  },
  // ... więcej dokumentów
];
```

### 3.2 Struktura pliku serwisu API

```ts
// src/services/api/documentsApi.ts

import { mockDocuments } from '../../mocks/routes/documents';
import type { Document } from '../../types';

// ZAWSZE zwracaj Promise — symuluj sieć
export const getPersonalDocuments = (): Promise<Document[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDocuments);
    }, 800); // 800ms = realistyczne opóźnienie sieciowe
  });
};

export const saveFinalDocument = (doc: Partial<Document>): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1200);
  });
};
```

### 3.3 Opóźnienia (timing konwencje)

| Operacja | setTimeout delay |
|---|---|
| Logowanie (auth) | 1000–1500ms |
| Pobranie listy dokumentów | 600–900ms |
| OCR Processing (ProcessingView) | **4500ms** (ustalony w specyfikacji) |
| Zapis dokumentu | 1000–1500ms |
| Proste mock odpowiedzi | 300–500ms |

### 3.4 Wzorzec użycia serwisu w widoku (useEffect)

```tsx
// src/views/ArchiveView.tsx

const ArchiveView = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPersonalDocuments()
      .then(setDocuments)
      .catch(() => setError('Failed to load documents'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingSkeleton />;  // zawsze obsługuj stan ładowania
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="...">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} {...doc} />
      ))}
    </div>
  );
};
```

---

## 4. Typy TypeScript

### 4.1 Główne interfejsy projektu (`src/types/index.ts`)

```ts
// Dokument — podstawowy model danych
export interface Document {
  id: string;
  title: string;
  thumbnailUrl: string;
  documentType: 'PDF' | 'JPG' | 'PNG';
  fileSize?: string;
  tags?: string[];
  category?: DocumentCategory;
  owner?: UserSummary;
  uploadDate: string;           // format: 'Oct 12, 2023'
  isPrivate: boolean;
  folderId?: string;
}

// Kategorie dokumentów (zgodnie z SoT)
export type DocumentCategory =
  | 'Invoice'
  | 'Contract'
  | 'Warranty'
  | 'Medical'
  | 'Receipt'
  | 'Blueprint'
  | 'Other';

// Status w kolejce uploadów
export type UploadStatus =
  | 'pending'
  | 'processing'
  | 'ready'
  | 'error_format'     // nieobsługiwany format (np. .exe)
  | 'error_quality'    // niska jakość obrazu
  | 'error_failed';    // ogólny błąd

// Element w kolejce upload
export interface UploadQueueItem {
  id: string;
  file: File;
  status: UploadStatus;
  errorMessage?: string;
  suggestedFolders?: SuggestedFolder[];
  tags?: string[];
  previewUrl?: string;
}

// Sugerowany folder (po OCR)
export interface SuggestedFolder {
  id: string;
  name: string;
  isRecommended: boolean;
}

// Użytkownik (uproszczony)
export interface UserSummary {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
}

// Auth response mock
export interface AuthResponse {
  token: string;
  user: UserSummary;
}
```

---

## 5. Routing — AppRouter

```tsx
// src/routes/AppRouter.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from '../views/LoginView';
import ArchiveView from '../views/ArchiveView';
import SharedView from '../views/SharedView';
import UploadView from '../views/UploadView';
import ProcessingView from '../views/ProcessingView';
import VerificationView from '../views/VerificationView';
import SuccessView from '../views/SuccessView';
import AppShell from '../components/AppShell';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Ekrany bez shella */}
      <Route path="/" element={<LoginView />} />
      <Route path="/success" element={<SuccessView />} />

      {/* Ekrany z shellem (SideNavBar + TopNavBar) */}
      <Route element={<AppShell />}>
        <Route path="/archive" element={<ArchiveView />} />
        <Route path="/shared" element={<SharedView />} />
        <Route path="/upload" element={<UploadView />} />
        <Route path="/processing" element={<ProcessingView />} />
        <Route path="/verification" element={<VerificationView />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
```

---

## 6. Material Symbols — Reguły Używania

```tsx
// ✅ Zawsze używaj span z className="material-symbols-outlined"
<span className="material-symbols-outlined">inventory_2</span>

// ✅ Rozmiar przez inline style (jedyny dozwolony wyjątek)
<span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
  add
</span>

// ✅ Filled variant (wypełniony)
<span 
  className="material-symbols-outlined"
  style={{ fontVariationSettings: "'FILL' 1" }}
>
  assured_workload
</span>

// ✅ Kolor przez Tailwind className
<span className="material-symbols-outlined text-primary">check_circle</span>
```

### Mapa ikon projektu

| Element | Ikona Material |
|---|---|
| Logo/Brand | `assured_workload` (FILL 1) |
| Archive nav | `inventory_2` (FILL 1 gdy aktywny) |
| Upload nav | `upload_file` |
| Shared nav | `group` |
| Settings | `settings` |
| Logout | `logout` |
| New Document | `add` |
| Search | `search` |
| Notifications | `notifications` |
| Menu/More | `more_vert` |
| Error/Block | `block` |
| Warning | `warning` |
| Success | `check_circle` |
| Delete | `delete` |
| Retry | `refresh` |
| Edit Tags | `edit_location` |
| Synced | `cloud_done` |
| Calendar | `calendar_month` |
| Arrow | `arrow_forward`, `arrow_drop_down` |

---

## 7. AppShell — Wzorzec Layoutu

```tsx
// src/components/AppShell.tsx
// SearchProvider opakowuje AppShellInner

// Trasy bez nav: /, /register, /success → sam <Outlet />
// Trasy z nav: SideNavBar + TopNavBar (TopNav ukryty na /processing)
// Settings modal: account, change password, sync, logout
// TopNavBar dostaje searchQuery + setSearchQuery z SearchContext
```

**Shell Visibility Rule:**
- `LoginView`, `RegisterView`, `SuccessView` → brak nav
- `ProcessingView` → SideNav only
- Pozostałe → pełny shell

---

## 8. ProcessingView — Specjalne Reguły

ProcessingView jest **jedynym widokiem sterowanym timerem**. Obowiązkowy wzorzec:

```tsx
// src/views/ProcessingView.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProcessingView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 4500ms — ustalony w specyfikacji projektu, NIE ZMIENIAĆ
    const timer = setTimeout(() => {
      navigate('/verification', { state: { mode: 'queue' } });
    }, 4500);

    // ZAWSZE czyść timer przy unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    // UI z templates/processing.html
    // Paski postępu: "Analysing text", "Classification", "Generating thumbnails"
    <div>...</div>
  );
};
```

---

## 9. UploadView — Drag & Drop Wzorzec

Logika drag & drop jest w `src/views/UploadView.tsx` (nie w osobnym `UploadZone.tsx`).

Layout 2-kolumnowy wg `templates/shared.html`. Po `startUpload()` → modal postępu → `/processing`.

Dropdowny filtrów (np. w SharedView) renderuj poza kontenerami z `overflow-x-auto`, aby uniknąć przycinania.

---

## 10. Walidacja formatów plików

Zgodnie z SoT — obsługiwane formaty to: **PDF, JPG, PNG**.
Wszystkie inne pliki (np. `.exe`, `.doc`) muszą zostać odrzucone z błędem `error_format`.

```ts
// src/services/fileValidationService.ts

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

export const validateFileType = (file: File): boolean => {
  return ALLOWED_TYPES.includes(file.type);
};

export const getFileTypeLabel = (file: File): 'PDF' | 'JPG' | 'PNG' | null => {
  const map: Record<string, 'PDF' | 'JPG' | 'PNG'> = {
    'application/pdf': 'PDF',
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
  };
  return map[file.type] ?? null;
};
```

---

## 11. Checklist przed commitem

Przed każdym commitem upewnij się:

- [ ] Wszystkie nowe komponenty mają poprawnie zdefiniowane TypeScript props
- [ ] Żaden komponent nie używa `any`
- [ ] Klasy Tailwind korzystają z tokenów design systemu (nie surowych kolorów)
- [ ] Wygląd komponentu odpowiada szablonowi HTML z `templates/`
- [ ] Material Symbols nie używają `<i>` ani `<svg>` — tylko `<span className="material-symbols-outlined">`
- [ ] Każdy `setTimeout` w mockach jest czyszczony przez `clearTimeout` w cleanup funkcji `useEffect`
- [ ] Nie ma `console.log` poza plikami mock/debug
- [ ] Routy w `<Link>` odpowiadają routingowi z `AppRouter.tsx` (`/`, `/register`, `/archive`, `/shared`, `/upload`, `/processing`, `/verification`, `/success`)
