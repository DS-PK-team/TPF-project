# Widok: Ekran Autoryzacji (Login)

## Trasa (Route): `/` lub `/login`

## Odpowiedzialność

System domowy z zamierzenia udostępnia również współdzielone tablice, co wymusza wprowadzenie ekranu kontroli dostępu.

## Elementy na Ekranie

- Pole do wprowadzenia e-maila / hasła,
- Przycisk wejścia z wywołaniem w warstwie `services/auth` i wyzwoleniem `mock` w `mocks/routes/auth`,
- (Opcjonalnie) Opcja na darmowe generowanie/utworzenie konta użytkownika celem powielenia funkcjonalności w pełni działającej SPA.

## Symulowany User Flow (Frontend)

Po udanym wpisaniu danych (bez faktycznego obciążenia logiką walidacji), wyzwalany jest stan pobierający fikcyjny Token lub sesję, a react-router z opóźnieniem `setTimeout` (udającym zapytanie sieciowe) przekierowuje użytkownika na bazowy endpoint `/archive`.

## Szablon HTML
Ten widok został wyekstrahowany i znajduje się w pliku: ../../templates/login.html.
