# Widok: Rejestracja Konta (Register)

## Trasa (Route): `/register`

## Odpowiedzialność

Ekran tworzenia konta. Brak SideNavBar i TopNavBar (ekran liniowy). Wizualnie spójny z `LoginView`.

## Elementy na Ekranie

- Header marki: ten sam blok co Login, tagline „Create your secure digital vault.”
- Formularz:
  - Full Name (ikona `person`)
  - Email Address (ikona `mail`)
  - Password (ikona `lock` + toggle visibility)
  - Confirm Password (ikona `verified_user`)
  - Checkbox: Terms of Service + Privacy Policy (linki placeholder)
- Przycisk **Create Account →** z animacją ładowania
- Walidacja: zgodność haseł, wymagany checkbox regulaminu
- Footer: link **Sign In** → `/`

## Symulowany User Flow

```ts
await register(fullName, email, password); // authService.ts — 800ms
navigate('/archive');
```

## Szablon HTML

Brak dedykowanego szablonu w `templates/` — widok zaimplementowany w React na podstawie `LoginView` i mockupu projektowego.
