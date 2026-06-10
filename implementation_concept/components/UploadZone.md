# Reużywalny Komponent: UploadZone (Drag & Drop)

## Zastosowanie

Sekcja o dużych rozmiarach ramki przerywanej, nasłuchująca zdarzeń przeciągnięcia przez internautów swoich wektorów do systemu archiwizacji podpinając w HTML5 events (`onDragOver`, `onDragLeave`, `onDrop`).

## Działanie zorientowane na FrontEnd

Ponieważ brak jest Backend'u do którego streamowalibyśmy zrzucone dane form-data, na froncie Reacta wystarczy zapamiętać nazwę upuszczonego pliku, jego rozmiar (wyciągnąć to przy pomocy obieków File z natywnego JS) i ustawić do globalnego state:

```ts
const [uploadedFile, setUploadedFile] = useState<File | null>(null);

function handleDrop(event) {
	const files = event.dataTransfer.files;
	setUploadedFile(files[0] || null);
}
```

Używany w głównym widoku UploadView. Odrzucony "drag&drop" uaktywni przycisk `Wyślij w kolejkę (Proceed)`, rozpoczynając sekwencję User Flow opisaną w podaniu procesowym.
