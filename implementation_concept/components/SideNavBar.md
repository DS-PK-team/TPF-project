# Reużywalny Komponent: SideNavBar

## Zastosowanie

Główna, pionowa nawigacja używana na desktopach. Oparta na układzie elastycznym, przyklejona zazwyczaj po lewej stronie do pełnej puli wysokości ekranu (`h-screen`).

## Właściwości / Props

- `activeRoute` (string) - Informacja zwrotna o obecnym stanie routera (zaznacza jasnoniebieski background w Tailwind z ciemnoniebieską ikoną).
- `onNewDocument` (function) - Funkcja wywoływana przy wciśnięciu przycisku "New Document" (wyzwala przepierowanie z routera na ścieżkę `/upload`).

## Klasy bazowe z HTML'a

(Będą konwertowane na `className`)
`w-64 border-r border-slate-100 bg-white flex flex-col h-full...`

## Pozycje w nawigacji

1.  Przycisk (CTA) - **New Document** (Niebieski przycisk akcji ze znakiem '+').
2.  Zwykłe linki:
    - **Archive** (`/archive`)
    - **Upload** (`/upload`)
    - **Shared** (`/shared`)
3.  Dolna sekcja (settings, logout) oddzielona cienkim szarym znacznikiem z dodatkowym statusem _"All files synced"_ (wskaźnik świetlno-zielony).
