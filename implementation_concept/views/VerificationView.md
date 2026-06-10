# Widok: Weryfikacja Plików / Kolejka (Upload Queue & Edit Tags)

## Trasa (Route): `/verification` lub `/upload-queue`

## Odpowiedzialność

System "nie jest alfą i omegą" – nie podejmuje decyzji archiwizacyjnej automatycznie. Dokument, o którym AI (OCR) wyciągnęło informacje w poprzednim kroku `/processing`, przesyłany jest do ostatecznej edycji (edycja tagów, edycja wymuszonego folderu binarnego - np. "Financial Records").

## Składowe ekranu (UX)

1. Prawa lub centralna kolumna z dokładną kartą rozbitą po analizie wgranego obiektu.
2. Etykiety "Suggested by AI" obok dropdownów.
3. System wymusza potwierdzenie zapisu – do czasu naduszenia przycisku "Zatwierdź", zdigitalizowany plik widnieje w stanie zapamiętanym wyłącznie jako roboczy plik lokalnej maszyny Frontendowej.
4. Oznaczenia błędów, jeśli wgrany został błędny lub nieobsługiwany format np. `.exe` (przykład błędnego dokumentu z oryginalnego `index.html` z Upload Queue).

## Wyjście Routera

Kluczowy przycisk wywołuje mock `services/api/saveFinalDocument()` a następnie wyjawia na pół sekundy ekran `/success` lub wypuszczając od razu na powrót do `/archive`.

## Szablon HTML
Ten widok został wyekstrahowany i znajduje się w pliku: ../../templates/upload-queue.html oraz ../../templates/edit-tags.html (stan edycji metadanych). Po weryfikacji kierujemy na ekran sukcesu zawarty w ../../templates/success.html.
