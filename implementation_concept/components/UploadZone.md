# UploadZone (Drag & Drop)

## Status implementacji

Logika drag & drop jest zaimplementowana **inline w `UploadView.tsx`**, nie jako osobny komponent `UploadZone.tsx`.

## Zachowanie w UploadView

```ts
const [isDragging, setIsDragging] = useState(false);

// onDragOver → highlight border-primary
// onDrop / file input onChange → startUpload()
// startUpload() → modal postępu → navigate('/processing')
```

## Layout

Dwukolumnowy grid (8/4) zgodny z `templates/shared.html`:

- Lewa: dropzone + Select Files
- Prawa: QR placeholder + Upload Guidelines

## Przyszła ekstrakcja (opcjonalna)

Jeśli komponent zostanie wydzielony, sugerowany interfejs:

```ts
interface UploadZoneProps {
  onUploadStart: () => void;
  isDragging: boolean;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent) => void;
}
```
