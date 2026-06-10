# Reużywalny Komponent: TopNavBar

## Zastosowanie

Górny pasek z wyszukiwarką, notyfikacjami, ustawieniami i profilem. Ukryty na `/processing`.

## Props

```ts
interface TopNavBarProps {
  searchQuery?: string;
  onSearchQueryChange?: (val: string) => void;
  avatarUrl?: string;
  onOpenSettings?: () => void;
}
```

## Integracja z SearchContext

`AppShell` opakowuje layout w `SearchProvider` i przekazuje:

```tsx
<TopNavBar
  searchQuery={searchQuery}
  onSearchQueryChange={setSearchQuery}
  onOpenSettings={() => setIsSettingsOpen(true)}
/>
```

Stan `searchQuery` jest konsumowany w `ArchiveView` i `SharedView` przez `useSearch()`. Czyszczony automatycznie przy opuszczeniu `/archive` i `/shared`.

## Elementy

- **Search** — kontrolowany input, placeholder PL
- **Notifications** — dropdown z mock listą + badge unread + „Mark all as read”
- **Settings** — otwiera modal w `AppShell`
- **Profil** — Jan Kowalski / jan.kowalski@example.com + avatar

## Widoki korzystające

`/archive`, `/shared`, `/upload`, `/verification`
