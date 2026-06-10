# Widok: Dokumenty Współdzielone (Shared)

## Trasa (Route): `/shared`

## Odpowiedzialność

Przeglądanie dokumentów udostępnionych rodzinie/współdomownikom. Rozróżnienie dokumentów „udostępnionych mi” vs „udostępnionych przeze mnie”.

## Budowa Layoutu

- **AppShell:** SideNavBar + TopNavBar
- **TopNavBar search:** filtrowanie po tytule przez `SearchContext`
- **Content:** siatka `DocumentCard` z `getSharedDocuments()`

## Filtry

### Kierunek udostępniania (toggle, domyślnie oba wyłączone = wszystko)

| Filtr | Logika |
|---|---|
| **Shared with me** | `owner !== archivist@vaultandvellum.io` |
| **Shared by me** | `owner === archivist@vaultandvellum.io` |
| Oba wyłączone | wszystkie dokumenty |
| Oba włączone | wszystkie dokumenty (suma zbiorów) |

### Filtr typu dokumentu

Przycisk **Filter** (`filter_list`) → dropdown: All types, Invoices, Contracts, Receipts, Blueprints, Reports, Other.

> Dropdown renderowany poza kontenerem z `overflow-x-auto`, aby uniknąć przycinania listy.

## Elementy dodatkowe

- **Invite flow:** inline formularz e-mail z toastem potwierdzenia
- **Banner** z instrukcją zarządzania uprawnieniami
- **Stats footer:** liczba wyświetlanych dokumentów

## DocumentCard — akcje w Shared

| Akcja | Warunek | Efekt |
|---|---|---|
| Download | zawsze | Toast |
| Manage Access | tylko `owner === CURRENT_USER` | `ManageAccessModal` |
| Move to Private | zawsze | Usunięcie z listy shared + toast |

Dokumenty „shared with me” **nie mają** opcji Manage Access.

## Szablon HTML

`../../templates/design-system.html` (plik `shared.html` w `templates/` to layout Upload — nie mylić!)
