# Widok: Proces Wgrywania (Upload)

## Trasa (Route): `/upload`

## Odpowiedzialność

Główny punkt wejścia dla nowych dokumentów. Layout dwukolumnowy (8/4) z drag & drop i sekcją mobilną.

## Elementy / Podział

### Lewa kolumna (8/12) — Dropzone

- Drag & drop z highlightem (`isDragging`)
- Ukryty `<input type="file" multiple>`
- Przycisk **Select Files**
- Pill z dozwolonymi formatami

### Prawa kolumna (4/12)

1. **Upload via Mobile** — karta QR + badge „End-to-end encrypted”
2. **Upload Guidelines** — limit 25 MB, auto-organizacja dat, notatka o PDF

### Modal postępu uploadu

- Overlay z globalnym paskiem postępu i listą plików
- Po osiągnięciu 100% → auto `navigate('/processing')` (600 ms opóźnienia)

## Kontynuacja Flow

```
/upload → (upload complete) → /processing
```

## Szablony HTML

- `../../templates/shared.html` — layout 2-kolumnowy + QR + guidelines
- `../../templates/upload-progress.html` — overlay postępu uploadu

> **Uwaga:** `upload-documents.html` to modal Settings w AppShell, nie widok Upload.
