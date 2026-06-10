# Reużywalny Komponent: DocumentCard

## Zastosowanie

Interaktywna karta dokumentu w siatce `ArchiveView` (`/archive`) i `SharedView` (`/shared`).

## Akcje (menu ⋮)

| Akcja | Archive | Shared | Warunek |
|---|---|---|---|
| Download | ✓ | ✓ | zawsze |
| Manage Access | ✓ | ✓ | Shared: tylko gdy `onManageAccess` przekazany (dok. „by me”) |
| Move to Private | — | ✓ | `isShared={true}` |
| Delete | ✓ | — | `onDelete` przekazany |

Kliknięcie karty (poza menu) wywołuje `onDownload`.

## Props (zaimplementowane)

```ts
interface DocumentCardProps {
  document: Document;
  isShared?: boolean;
  onDownload?: (id: string) => void;
  onManageAccess?: (id: string) => void;
  onMoveToPrivate?: (id: string) => void;
  onDelete?: (id: string) => void;
}
```

`Document` pochodzi z `src/types/index.ts` — pola: `id`, `title`, `thumbnailUrl`, `documentType`, `fileSize`, `tags`, `owner`, `uploadDate`, `isPrivate`.

## Badge typu dokumentu

Invoice, Contract, Receipt, Blueprint, Report, Other — każdy z własnymi tokenami kolorów Tailwind.

## Szablon HTML

- `../../templates/archive.html` — karta w siatce
- `../../templates/archive-context.html` — dropdown menu
