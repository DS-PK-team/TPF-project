# Widok: Ekran Autoryzacji (Login)

## Trasa (Route): `/`

## Odpowiedzialność

Ekran kontroli dostępu — pierwszy punkt wejścia do aplikacji. Brak SideNavBar i TopNavBar (ekran liniowy).

## Elementy na Ekranie

- Header marki: logo `inventory_2`, tytuł „Vault & Vellum”, tagline „Secure digital permanence.”
- Formularz: Email, Password (Forgot password? — placeholder `href="#"`)
- Przycisk **Sign In** z animacją ładowania
- Banner błędu przy nieudanym `login()`
- Footer: link **Create an account** → `/register`

## Symulowany User Flow

```ts
await login(email, password); // authService.ts — 800ms
navigate('/archive');
```

## Szablon HTML

`../../templates/login.html`
