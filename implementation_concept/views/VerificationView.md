# Widok: Weryfikacja Plików / Kolejka (Upload Queue & Edit Tags)

## Trasa (Route): `/verification`

## Odpowiedzialność

Bramka decyzji użytkownika po OCR. System proponuje 2–3 zestawy tagów/folderów — użytkownik zatwierdza. Dwa wewnętrzne tryby (`ViewMode`).

## Tryb `queue` (domyślny)

- Lista 4 mockowych pozycji: 2 błędy (format `.exe`, jakość JPG) + 2 gotowe
- Per item: Edit Tags, Remove; dla błędu jakości: **Retry Upload** (mock 1.2s → status `ready`)
- Dolny pasek akcji:
  - Cancel → `/upload`
  - Remove all files with errors
  - Approve N valid files → `/success`

## Tryb `edit-tags`

Otwierany z konkretnego elementu kolejki (`editingItemId`):

- **Back to Upload Queue** → powrót do `queue`
- Podgląd dokumentu powiązany z wybranym itemem (nazwa, ikona, tagi)
- 3 radio zestawy tagów (pierwszy z badge „Suggested by AI”)
- Custom tags: input + `add_circle` / Enter
- Zoom in/out na podglądzie (75–150%)
- **Confirm & Save** — zapis tagów do elementu kolejki

## Wyjście Routera

```
Approve → /success
Cancel  → /upload
```

## Szablony HTML

- `../../templates/upload-queue.html` — tryb queue
- `../../templates/edit-tags.html` — tryb edit-tags
- `../../templates/success.html` — ekran po zatwierdzeniu (`SuccessView`)
