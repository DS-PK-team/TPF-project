# Reużywalny Komponent: Toast

## Zastosowanie

Krótkie powiadomienie overlay (download, share, delete, invite). Używany w `ArchiveView` i `SharedView`.

## Props

```ts
interface ToastProps {
  message: string;
  icon?: string;  // Material Symbol name, default: 'download'
  onClose: () => void;
}
```

## Zachowanie

- Auto-dismiss po 3 sekundach
- Przycisk zamknięcia (X)
