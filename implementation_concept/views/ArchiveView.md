# Widok: Główne Archiwum

## Trasa (Route): `/archive`

## Odpowiedzialność

Centralna sekcja aplikacji — repozytorium dokumentów prywatnych w układzie siatki.

## Budowa Layoutu

- **AppShell:** SideNavBar + TopNavBar
- **TopNavBar search:** filtrowanie po tytule przez `SearchContext` (`useSearch()`)
- **Content:** siatka `DocumentCard` z danymi z `getPersonalDocuments()`

## Elementy interaktywne

- **Filtry typu:** All Files, Invoices, Contracts, Receipts, Blueprints, Reports (chipy)
- **Filtr daty:** dropdown Any Date / Today / This Week / This Month / This Year
- **DocumentCard menu:** Download, Manage Access (`ManageAccessModal`), Delete
- **New Document** → `/upload`
- **Toast** przy download/share/delete
- Stany: skeleton loading (6 kart), empty state z „Clear filters”

## DocumentCard — akcje w archiwum

| Akcja | Efekt |
|---|---|
| Download | Toast „Download started…” |
| Manage Access | Modal → udostępnienie (zmiana `isPrivate: false`) |
| Delete | Usunięcie z listy + toast |

## Szablony HTML

- `../../templates/archive.html` — widok główny
- `../../templates/archive-context.html` — menu kontekstowe (Download, Manage access, Delete)
