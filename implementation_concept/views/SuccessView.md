# Widok: Potwierdzenie Zapisu (Success)

## Trasa (Route): `/success`

## Odpowiedzialność

Ekran potwierdzenia po zatwierdzeniu dokumentów w kolejce weryfikacji. Brak SideNavBar i TopNavBar (ekran liniowy).

## Elementy na Ekranie

- Animowana ikona `check_circle` (80px, filled)
- Nagłówek „Document saved”
- Opis szyfrowania i dodania do archiwum
- Chip podsumowania: „Financial Records / Q3_2023” (statyczny mock)
- **Go to Archive** → `/archive`
- **Upload next** → `/upload`
- Auto-redirect do `/archive` po 8 sekundach

## Szablon HTML

`../../templates/success.html`

> W szablonie HTML widoczny jest pełny shell (nav). W React zgodnie z regułą projektu SuccessView renderuje się **bez** nav barów.
