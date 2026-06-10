# Architektura Projektu (React + Mocks)

Projekt opiera się na **React 18, TypeScript oraz Tailwind CSS**.
Głównym założeniem jest odizolowanie logiki UI od (symulowanego) źródła danych tak, aby w przyszłości łatwo było podmienić mocki na realne zapytania API.

## Ogólna Struktura Plików

```text
src/
 ├── components/             # Reużywalne komponenty UI i layout
 │   ├── AppShell.tsx        # Layout + Settings modal + SearchProvider
 │   ├── SideNavBar.tsx
 │   ├── TopNavBar.tsx
 │   ├── DocumentCard.tsx
 │   ├── ManageAccessModal.tsx
 │   └── Toast.tsx
 ├── context/
 │   └── SearchContext.tsx   # Wspólny stan wyszukiwarki TopNav
 ├── views/                  # Widoki odpowiadające routingowi
 │   ├── LoginView.tsx
 │   ├── RegisterView.tsx
 │   ├── ArchiveView.tsx
 │   ├── SharedView.tsx
 │   ├── UploadView.tsx
 │   ├── ProcessingView.tsx
 │   ├── VerificationView.tsx
 │   └── SuccessView.tsx
 ├── routes/
 │   └── AppRouter.tsx
 ├── types/
 │   └── index.ts
 ├── services/
 │   ├── authService.ts      # login(), register() — setTimeout 800ms
 │   └── documentsService.ts # getPersonalDocuments(), getSharedDocuments()
 └── mocks/
     └── documents.ts        # PERSONAL_DOCUMENTS, SHARED_DOCUMENTS
```

> **Uwaga:** `UploadZone` nie jest osobnym komponentem — logika drag & drop jest zaimplementowana inline w `UploadView.tsx`.

## Przepływ Informacji (Data Flow)

1. **Widok** wywołuje funkcję z `services/` i ustawia stan ładowania.
2. **Serwis** zwraca dane z `mocks/` opóźnione `setTimeout()` (600–800 ms).
3. **Widok** re-renderuje UI na podstawie odpowiedzi.

Wyszukiwarka w `TopNavBar` działa przez `SearchContext` — stan `searchQuery` jest podnoszony w `AppShell` i konsumowany w `ArchiveView` / `SharedView`.

## Nawigacja — react-router-dom

Wszystkie trasy zagnieżdżone w `AppShell` (layout decyduje o widoczności nav):

| Trasa | Widok | Shell |
|---|---|---|
| `/` | LoginView | brak nav |
| `/register` | RegisterView | brak nav |
| `/archive` | ArchiveView | SideNav + TopNav |
| `/shared` | SharedView | SideNav + TopNav |
| `/upload` | UploadView | SideNav + TopNav |
| `/processing` | ProcessingView | SideNav only (brak TopNav) |
| `/verification` | VerificationView | SideNav + TopNav |
| `/success` | SuccessView | brak nav |
| `*` | redirect → `/` | — |

## User Flow (zaimplementowany)

```
Login ──→ /archive          Register ──→ /archive
  ↑                              │
  └──── "Create an account" ─────┘

/archive ──→ /upload (New Document)
/upload ──→ /processing (auto po zakończeniu uploadu)
/processing ──→ /verification (auto po 4.5s, state: { mode: 'queue' })
/verification ──→ /success (Approve) lub /upload (Cancel)
/success ──→ /archive (auto 8s lub przycisk) lub /upload
```

## Mapowanie szablonów HTML

| Szablon | Faktyczna treść | Widok React |
|---|---|---|
| `login.html` | Login | LoginView |
| `archive.html` | Archiwum | ArchiveView |
| `archive-context.html` | Menu kontekstowe karty | DocumentCard (dropdown) |
| `shared.html` | **Upload** (nie Shared!) | UploadView |
| `upload-documents.html` | **Settings modal** | AppShell |
| `upload-progress.html` | Overlay postępu uploadu | UploadView (stan) |
| `upload-queue.html` | Kolejka weryfikacji | VerificationView (queue) |
| `edit-tags.html` | Edycja tagów/folderu | VerificationView (edit-tags) |
| `processing.html` | Animacja OCR | ProcessingView |
| `success.html` | Ekran sukcesu | SuccessView |
| `design-system.html` | **Shared Documents** | SharedView |
