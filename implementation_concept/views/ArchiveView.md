# Widok: Główne Archiwum

## Trasa (Route): `/archive`

## Odpowiedzialność

Centralna sekcja aplikacji webowej. Ekran przedstawiający zintegrowane repozytorium zapisanych plików (prywatnych w tym widoku, w domyślnym podziale na siatkę).

## Budowa Layoutu

- **Menu boczne (SideNavBar):** Nawigacja.
- **Menu górne (TopNavBar):** Posiada m.in. belkę systemową z pełnotekstowym wyszukiwaniem (indeks z zapamiętanego archiwum OCR) wyszukującym wśród mocków po ich polu danych. Widnieje tam również sekcja z dzwoneczkiem (notyfikacje - nieaktywne) i profil avatar.
- **Lista/Siatka (Content):** Obszar mapujący kolekcję pobraną z `services/api/getPersonalDocuments()` używając komponentów wielorazowych `DocumentCard`.

## Przeznaczenie Flow

To główna tablica na którą użytkownik trafia zaraz po restarcie/odświeżeniu czy powrocie z dodawania. Pozwala w sposób filtrowany przeglądać dodane już faktury/umowy. Obsługuje przełączenie statusu na widok folderów/ścieżek lub układów siatki (Siatki kafelkowej).

## Szablon HTML
Ten widok został wyekstrahowany i znajduje się w pliku: ../../templates/archive.html oraz wersji alternatywnej ../../templates/archive-context.html.
