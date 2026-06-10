# Reużywalny Komponent: DocumentCard

## Zastosowanie

Dokument reprezentowany w postaci interaktywnej "karty" / "kafelki" w siatce układu Archiwum (`/archive` lub `/shared`). Powinien renderować miniaturę zdjęcia czy PDFa oraz prezentować podstawowe Metadane wygenerowane w fazie analizy.

## Akcje

Karta powinna pozwalać na:

- Podstawowy podgląd/wyświetlenie parametrów pliku (otwarcie po kliknięciu głównego pola),
- Otwarcie okienka pobocznego Context Menu z poleceniami (Usunięcie, Przeniesienie, Zmiana tagów) dzięki okienkom po kliknięciu w dodatkowe wielokropki lub menu relatywne do boku obiektu.

## Przyjmowane Props

```ts
interface DocumentCardProps {
	id: string;
	title: string;
	thumbnailUrl: string; // Ścieżka do podglądu, pobierana z Mocks (warstwa OCR).
	documentType: "PDF" | "JPG" | "PNG"; // Zależnie od typu – zróżnicowana etykieta / plakietka.
	fileSize?: string;
	tags?: string[];
	owner?: {
		name: string;
		initials: string; // Dla widoku domowników na współdzielonym kafelku avatara.
	};
	uploadDate: string; // 'Oct 01, 2023'
}
```

## Opis struktury Tailwind

Górna połowa to przestrzeń absolutna / relatywna ze zdjęciem dopasowanym przez `object-cover`.
Nałożona na miniatury dodatkowa sztywna informacja dotycząca rozszerzenia w prawym górnym rogu.
Dolna warstwa tekstowa to miejsce na tytuł, miniaturkę właściciela ('owner') w zintegrowanym kółku i linię oddzielającą z informacją "Oct 01, 2023 • 14 Items" etc.
