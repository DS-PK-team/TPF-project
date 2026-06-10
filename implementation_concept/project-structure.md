# Architektura Projektu (React + Mocks)

Projekt opiera się na **React, TypeScript oraz Tailwind CSS**.
Głównym założeniem jest odizolowanie logiki UI od (symulowanego) źródła danych tak, aby w przyszłości łatwo było podmienić paczki `mocks` na realne zapytania API.

## Ogólna Struktura Plików

```text
src/
 ├── assets/                 # Zasoby graficzne, ikony
 ├── components/             # Reużywalne, współdzielone komponenty (UI, layout)
 ├── views/                  # Główne szablony stron (odpowiadające routingowi)
 ├── routes/                 # Definicja tras (react-router-dom)
 ├── types/                  # Interfejsy i typy TypeScript (np. Modele DTO)
 ├── services/               # Serwisy odpowiadające za logikę biznesową i dane
 │   └── api/                # Warstwa zapytań udająca klienta HTTP
 └── mocks/                  # Zbudowana struktura fałszywych responsów
     └── routes/             # Podfoldery odpowiadające endpointom np. /documents, /auth
```

## Przepływ Informacji (Data Flow)

Gdy użytkownik wejdzie w interakcję (np. kliknie przycisk "Upload", logowanie):

1.  **Widok (View / Component)** wysyła wywołanie akcji i aktualizuje stan ładowania.
2.  Odnosimy się do funkcji z **`services`** (np. `UploadService.processFiles()`).
3.  Serwis biznesowy deleguje zadanie głębiej do **`services/api`** (np. `api.post('/documents')`).
4.  W warstwie API umieszczona jest wstrzyknięta atrapa – odpowiedź zostaje załadowana ze ścieżki **`mocks/routes/...`**. Znajdą się w nich interfejsy zwracające JSON i sztucznie ubrane w polecenie asynchroniczne (np. `setTimeout()` symulujące kilkusekundowe OCR'y lub logowanie HTTP).
5.  Wynik asynchroniczny wraca do interfejsu (View), który re-renderuje strukturę wyświetlając odpowiednie miniatury.

## Nawigacja - react-router-dom

Przejścia pomiędzy wyekstrahowanymi widokami obsługiwać będzie dedykowany kontext react routera:

- `/` -> Panel logowania
- `/archive` -> Siatka osobistego archiwum
- `/shared` -> Osobny widok dedykowany "wspólnym strefom"
- `/upload` -> Ręczny transfer plików + QR upload
- `/upload/processing` -> Animowany widok przejścia symulujący wyliczanie przez sztuczną inteligencję (OCR)
- `/upload/verify` -> Propozycje folderów i edycja kategorii do rąk użytkownika

Struktura zaprojektowana idealnie pod przejście pomiędzy statycznymi szablonami HTML a frameworkiem.
