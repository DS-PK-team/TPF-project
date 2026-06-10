# Reużywalny Komponent: SideNavBar

## Zastosowanie

Pionowa nawigacja desktopowa (`w-64`, `h-screen`). Renderowana przez `AppShell` na wszystkich trasach z nav (nie na `/`, `/register`, `/success`).

## Props

```ts
interface SideNavBarProps {
  onNewDocument?: () => void;
  onOpenSettings?: () => void;
}
```

## Pozycje nawigacji

1. **Brand:** Vault & Vellum / Secure Storage
2. **CTA:** New Document → `/upload` (lub `onNewDocument` callback)
3. **Linki:** Archive (`/archive`), Upload (`/upload`), Shared (`/shared`)
   - Upload aktywny też na `/processing` i `/verification`
4. **Footer:** status sync „All files synced”, Settings (otwiera modal w AppShell), Log Out → `/`

## Klasy

Tokeny design systemu: `bg-surface-container-lowest`, `border-outline-variant/30`, `bg-primary` dla CTA.
