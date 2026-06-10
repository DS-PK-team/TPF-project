# Widok: Ekran Przetwarzania (Processing / OCR Engine)

## Trasa (Route): `/processing`

## Odpowiedzialność

Makieta animacji dla analizującego "wąskiego gardła". Użytkownik widzi wizualną reprezentację odczytującego się przez OCR dokumentu. Ze względów informacyjnych dostarcza ona paski postępu ("Analizowanie tekstu", "Klasyfikacja", "Generowanie miniatur", etc).

## Logika w FE Mocks

Ten widok opiera się na komponencie React bazującym z dużej mierze na timerach asynchronicznych:

```ts
useEffect(() => {
	// udajemy opóźnienie serwera 3 - 5 sekund
	const timeout = setTimeout(() => {
		navigate("/verification"); // Przełącz na akceptację przez human-touch.
	}, 4500);
}, []);
```

Nie musimy tutaj odwoływać się do bazy API, jest to widok strikte przemyślany pod User Experience zaprezentowany w ankietach (gdzie narzekano na zamykanie użytkownika w niewiadomym stanie przetwarzania "pudełkowanego").

## Szablon HTML
Ten widok został wyekstrahowany i znajduje się w pliku: ../../templates/processing.html.
