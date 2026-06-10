# Reużywalny Komponent: ManageAccessModal

## Zastosowanie

Modal zarządzania uprawnieniami do dokumentu. Używany w `ArchiveView` i `SharedView`.

## Props

```ts
interface ManageAccessModalProps {
  documentTitle: string;
  onConfirm: (userIds: string[]) => void;
  onCancel: () => void;
}
```

## Zachowanie

- Lista 4 mockowych użytkowników z checkboxami
- **Share** disabled gdy nic nie wybrano
- **Cancel** zamyka modal

## Kontekst Shared

W `SharedView` modal otwiera się tylko dla dokumentów „shared by me” (`onManageAccess` przekazywane warunkowo).
