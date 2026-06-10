# Informacje o Projekcie: Vault & Vellum

## 1. Cel główny i Grupa docelowa

Głównym celem aplikacji jest digitalizacja i automatyczne porządkowanie baz domowych dokumentów (faktury, gwarancje, umowy). Rozwiązanie łączy wspólną bazę plików dla rodzin ze strefą prywatną, z inteligentną kategoryzacją po analizie OCR.

Docelowi odbiorcy: gospodarstwa domowe wieloosobowe oraz użytkownicy indywidualni eliminujący papierowe dokumenty.

## 2. Podział ról i Uprawnień

- **Współdzielenie hybrydowe:** Dokumenty prywatne (`/archive`) i współdzielone (`/shared`).
- **Manage Access:** Dostępne tylko dla dokumentów udostępnionych **przez** zalogowanego użytkownika (`owner === archivist@...`), nie dla dokumentów „shared with me”.
- **Move to Private:** Dostępne w widoku Shared dla dokumentów współdzielonych.

## 3. Ścieżki Użytkownika (User Flow)

1. **Autoryzacja**
   - Logowanie (`/`) lub rejestracja (`/register`) → mock `authService` (800 ms) → `/archive`.
2. **Upload Dokumentów** (`/upload`)
   - Drag & drop / Select Files + placeholder QR (upload mobilny).
   - Modal postępu uploadu → auto `/processing`.
3. **Proces OCR** (`/processing`)
   - Animacja analizy (4.5 s) → auto `/verification`.
4. **Weryfikacja** (`/verification`)
   - Kolejka z błędami (format, jakość) i plikami gotowymi.
   - Tryb `edit-tags`: wybór folderu/tagów (2–3 propozycje AI + custom tags).
   - Approve → `/success`.
5. **Archiwum i Wyszukiwanie**
   - `/archive` — dokumenty prywatne, filtry typu i daty, wyszukiwarka TopNav.
   - `/shared` — dokumenty współdzielone, filtry „with me” / „by me”, filtr typu.

## 4. Ograniczenia i Scope

- Frontend SPA **bez backendu** — mocki przez `setTimeout`.
- Brak sumowania budżetów — wyłącznie archiwizacja i wyszukiwanie.
- Placeholdery: Forgot password, Terms/Privacy, QR upload (wizualny).
