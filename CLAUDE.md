# Vault & Vellum — Project Rules for AI Agents

> **ZAWSZE czytaj ten plik na początku każdej sesji przed pisaniem jakiegokolwiek kodu.**

---

## 1. Co to jest ten projekt?

**Vault & Vellum** to frontendowa aplikacja webowa do archiwizacji i automatycznego porządkowania dokumentów domowych (faktury, gwarancje, umowy, rachunki). Aplikacja jest budowana jako **React SPA bez backendu** — cała logika serwera jest symulowana przez warstwę mocków z `setTimeout`.

Projekt jest realizowany w ramach **Politechniki Krakowskiej – TPF** (Techniki Prezentacji i Fontu / Technologie Projektowania Frontendu).

---

## 2. Stack technologiczny

| Warstwa | Technologia |
|---|---|
| Framework | **React 18** + **TypeScript** |
| Build tool | **Vite** |
| Stylowanie | **Tailwind CSS** (z rozszerzonym config – patrz sekcja 5) |
| Routing | **react-router-dom v6** |
| Ikony | **Google Material Symbols Outlined** (via Google Fonts CDN) |
| Czcionki | **Manrope** (nagłówki) + **Inter** (body/labels) |
| Mocki | Natywny `setTimeout` + JSON — **BEZ MSW, BEZ Axios** |
| Testy | Brak w tej fazie — projekt frontendowy/demonstracyjny |

---

## 3. Lokalizacja kluczowych zasobów

```
d:\PolitechnikaKrakowska\TPF\TPF tmp\
├── CLAUDE.md                          ← TEN PLIK (reguły projektu)
├── implementation_concept/            ← Specs komponentów i widoków
│   ├── project-info.md                ← Opis projektu, user flow, grupy docelowe
│   ├── project-structure.md           ← Architektura React, routing, data flow
│   ├── CODING_RULES.md                ← Szczegółowe reguły pisania kodu
│   ├── components/                    ← TypeScript props + opisy komponentów
│   │   ├── DocumentCard.md
│   │   ├── SideNavBar.md
│   │   ├── TopNavBar.md
│   │   └── UploadZone.md
│   └── views/                         ← Opisy widoków, logika, routing
│       ├── LoginView.md
│       ├── ArchiveView.md
│       ├── UploadView.md
│       ├── ProcessingView.md
│       └── VerificationView.md
├── templates/                         ← Gotowe szablony HTML (źródło prawdy dla UI)
│   ├── login.html
│   ├── archive.html
│   ├── archive-context.html
│   ├── design-system.html
│   ├── edit-tags.html
│   ├── processing.html
│   ├── shared.html
│   ├── success.html
│   ├── upload-documents.html
│   ├── upload-progress.html
│   └── upload-queue.html
└── SoTs/
    └── System do archiwizacji...pdf   ← Specyfikacja wymagań (SoT)
```

> ⚠️ **Szablony HTML w `templates/` są źródłem prawdy dla wyglądu UI.** Każdy komponent React musi wizualnie odpowiadać swojemu szablonowi.

---

## 4. Routing aplikacji

```
/              → LoginView
/archive       → ArchiveView (domyślny widok po zalogowaniu)
/shared        → SharedView
/upload        → UploadView (drag&drop + QR placeholder)
/processing    → ProcessingView (animacja OCR)
/verification  → VerificationView (kolejka + tagowanie)
/success       → SuccessView (ekran po zapisie)
```

---

## 5. Design System — tokeny Tailwind

**Nigdy nie używaj surowych kolorów HEX ani klas Tailwind niezwiązanych z design systemem projektu.**
Zawsze korzystaj z tokenów zdefiniowanych w `tailwind.config.ts`:

### Paleta kolorów (Material Design 3 – Teal/Slate)
```
primary:                  #005a71
primary-container:        #0e7490
on-primary:               #ffffff
primary-fixed:            #b9eaff
primary-fixed-dim:        #81d1f0
inverse-primary:          #81d1f0

secondary:                #505f76
secondary-container:      #d0e1fb
on-secondary-container:   #54647a
secondary-fixed:          #d3e4fe

tertiary:                 #794602
tertiary-container:       #965e1c
tertiary-fixed:           #ffdcbd
tertiary-fixed-dim:       #ffb86f

surface:                  #f7f9fb
surface-bright:           #f7f9fb
surface-dim:              #d8dadc
surface-container-lowest: #ffffff
surface-container-low:    #f2f4f6
surface-container:        #eceef0
surface-container-high:   #e6e8ea
surface-container-highest:#e0e3e5
surface-variant:          #e0e3e5

on-surface:               #191c1e
on-surface-variant:       #3f484c
outline:                  #6f787d
outline-variant:          #bec8cd

error:                    #ba1a1a
error-container:          #ffdad6
on-error:                 #ffffff
on-error-container:       #93000a

background:               #f7f9fb
inverse-surface:          #2d3133
inverse-on-surface:       #eff1f3
```

### Spacing tokens
```
xs: 4px   sm: 8px   md: 16px   lg: 24px   xl: 40px
unit: 4px   gutter: 20px   container-max: 1280px
```

### Typography tokens
| Token | Font | Size | Weight |
|---|---|---|---|
| `headline-lg` | Manrope | 30px / lh:40px | 700 |
| `headline-md` | Manrope | 24px / lh:32px | 600 |
| `headline-sm` | Manrope | 18px / lh:26px | 600 |
| `body-lg` | Inter | 16px / lh:24px | 400 |
| `body-md` | Inter | 14px / lh:20px | 400 |
| `label-md` | Inter | 12px / lh:16px | 500 |
| `label-sm` | Inter | 11px / lh:14px | 600 |

Użycie: `font-headline-lg text-headline-lg`, `font-body-md text-body-md` etc.

### Border radius
```
DEFAULT: 4px   lg: 8px   xl: 12px   full: 9999px
```

---

## 6. Kluczowe założenia projektowe (z SoT)

1. **System nie podejmuje decyzji samodzielnie** — zawsze proponuje 2–3 foldery i czeka na potwierdzenie użytkownika.
2. **Desktop-first** — główne środowisko to szeroki ekran; telefon pełni rolę pomocniczą (QR upload).
3. **Minimalizacja decyzji użytkownika** — interfejs automatycznie sugeruje kategorie, tagi i foldery.
4. **Brak prawdziwego backendu** — cała logika jest symulowana przez mocki z `setTimeout`.
5. **Prywatne + współdzielone** — każdy dokument jest albo prywatny albo w folderze współdzielonym (rodzina/domownicy).
6. **Obsługa błędów bez blokowania** — błędy widoczne przy pliku, nie przerywają całego procesu.
7. **Widoczność statusu systemu** — użytkownik zawsze wie co system robi (wgrywa / analizuje / zapisuje).

---

## 7. Hierarchia Komponentów

```
App (Router)
├── LoginView                     (brak nav)
├── AppShell (SideNavBar + TopNavBar)
│   ├── ArchiveView
│   ├── SharedView
│   ├── UploadView
│   ├── ProcessingView            (brak TopNavBar)
│   ├── VerificationView
│   └── SuccessView               (brak nav)
```

**Shell Visibility Rule:**
- Ekrany linearne/transakcyjne: `LoginView`, `SuccessView` → **brak SideNavBar i TopNavBar**
- Ekrany pośrednie: `ProcessingView` → brak TopNavBar (focus na animacji)
- Ekrany główne: `ArchiveView`, `SharedView`, `UploadView`, `VerificationView` → pełny shell

---

## 8. Nazewnictwo plików i folderów

```
src/
├── components/
│   ├── DocumentCard.tsx          ← PascalCase dla komponentów
│   ├── SideNavBar.tsx
│   ├── TopNavBar.tsx
│   └── UploadZone.tsx
├── views/
│   ├── LoginView.tsx
│   ├── ArchiveView.tsx
│   ├── SharedView.tsx
│   ├── UploadView.tsx
│   ├── ProcessingView.tsx
│   ├── VerificationView.tsx
│   └── SuccessView.tsx
├── services/
│   ├── authService.ts            ← camelCase dla serwisów
│   └── api/
│       ├── documentsApi.ts
│       └── authApi.ts
├── mocks/
│   └── routes/
│       ├── documents.ts
│       └── auth.ts
├── types/
│   └── index.ts                  ← wszystkie interfejsy w jednym pliku (lub per-domain)
└── routes/
    └── AppRouter.tsx
```

---

## 9. Szybkie przypomnienie user flow

```
Login → /archive
        ↓ klik "New Document"
      /upload (drag&drop pliku lub QR)
        ↓ "Proceed"
      /processing (animacja 4.5s)
        ↓ auto-redirect
      /verification (zatwierdzenie tagów/folderu)
        ↓ "Approve"
      /success → /archive
```
