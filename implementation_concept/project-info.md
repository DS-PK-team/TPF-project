# Informacje o Projekcie: System Archiwizacji

## 1. Cel główny i Grupa docelowa

Głównym celem aplikacji jest digitalizacja i automatyczne porządkowanie baz domowych dokumentów np. faktur, gwarancji czy umów. Rozwiązanie łączy w sobie wspólną bazę plików dla wybranych osób i całych rodzin ze strefą zupełnie prywatną, udostępniając inteligentną kategoryzację połączoną z analizą OCR.

Docelowi obiorcy to gospodarstwa domowe wieloosobowe (dzielący opłaty domowe, czynsz, etc.) oraz wymagający użytkownicy indywidualni nastawieni na wyeliminowanie papierowych dokumentów.

## 2. Podział ról i Uprawnień

- **Współdzielenie hybrydowe:** Przechowywanie prywatnych plików i dedykowana przestrzeń "współdzielona", np. opłaty domowe.
- **Uprawnienia:** System wyróżnia role na podstawie przypisania dostępu jako widz "podgląd" lub możliwości modyfikacji informacji, "edycję".

## 3. Ścieżki Użytkownika (User Flow) na podstawie załączonego badania

Interakcja zaprojektowana celem zminimalizowania ilości decyzji narzucanych de facto użytkownikowi.

1.  **Autoryzacja (Logowanie & Rejestracja)**
    - Weryfikacja hasłem (ewentualny ekran z logowaniem/rejestracją).
2.  **Upload Dokumentów**
    - **Drag & Drop** do przestrzeni webowej wyselekcjonowanych plików z komputera osobistego,
    - Szybkie dodawanie z pomocą skanowania **Kodu QR** (użycie smarftona jako skanera dla plików wprost na wersję desktopową),
    - Masowe wgrywanie (obsługa całych "teczek").
3.  **Proces Analizy, przetwarzanie systemowe OCR**
    - Widoczny ogólny status dla każdej uploadowanej paczki plików.
    - Rozpoznanie poszczególnych rodzajów obrazów cyfrowych lub plików PDF i nakładanie warstwy tekstowej jako bazy nowej wyszukiwarki plików.
4.  **Inteligentne Tagowanie (Bramka decyzji)**
    - Zamiast twardego samodecydującego AI – maszyna wytycza rekomendowany wybór w zakresie **2–3 proponowanych folderów docelowych**.
    - Interwencja użytkownika ograniczona do weryfikacji i ostatecznego zatwierdzenia plików (możliwość zmiany w Dropdown w przypadku pomyłki OCR).
5.  **Dostęp (Archiwum i Pełnotekstowe Wyszukiwanie)**
    - Przejście do głównego archiwum i tablic.
    - Różnorodne struktury podglądowe – Siatka miniatur dla przeglądu pobieżnego dokumentów tekstowych z grafiką vs zagnieżdżona Lista (layout menadżera OS Windows/macOS).
    - Wszelkie parametry tekstowe z indeksu poddane wyszukiwarce.

## 4. Ograniczenia i Scope na moment wdrożenia (Decyzje biznesowe)

Wersja Front-Endowa wybudowana zostanie bez rzeczywistego połączonego zaplecza – logika serwisu symulować będzie odpowiedzi poprzez wirtualizację mockową dla zapotrzebowań aplikacji.

Pominięto skomplikowaną analitykę – aplikacja nie powinna sumować budżetu dla umów i kosztów faktur (skupiona jest surowo wokół modułu archiwizacji i łatwości wyszukiwania starych dokumentów).
