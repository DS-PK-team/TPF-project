# Widok: Proces Wgrywania (Upload)

## Trasa (Route): `/upload`

## Odpowiedzialność

Ten zestaw kafelków pełni zaawansowaną interaktywność i jest głównym elementem wejściowym dla każdego digitalizowanego pliku w systemie. Aplikacja udostępnia tutaj dwie popularne ścieżki załadunku:

### Elementy / Podział

1.  **Dramatycznie wyrysowana strefa z "Drag & Drop":** Skrzynka o zaznaczonej granicy czekająca na pliki (reagująca np. w React state hover).
2.  **QR Skaner Area:** Odseparowany kafel obok z instrukcją mobilną i kodem QR, co w perspektywie architektonicznej generowało by wejście via Socket - u nas na frontendzie stanowić może wyłącznie placeholder ubezpieczający makietę do symulacji tej ścieżki w widoku demonstracyjnym.
3.  Pasek boczny "Upload Rules": zasady co do limitu per image.

### Kontynuacja trasy Flow

Po udanej "weryfikacji" wrzucenia pliku drag & drop (na zasadzie wyselekcjonowania tablicy File w Reakcie z mockowanymi rozszerzeniami), przycisk "Proceed" wykonuje push ścieżki na router do sekcji **`/processing`**.

## Szablon HTML
Ten widok został wyekstrahowany i znajduje się w pliku: ../../templates/upload-documents.html oraz stanu uploadu: ../../templates/upload-progress.html.
