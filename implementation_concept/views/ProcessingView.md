# Widok: Ekran Przetwarzania (Processing / OCR)

## Trasa (Route): `/processing`

## Odpowiedzialność

Animacja analizy OCR po uploadzie. Brak TopNavBar (focus na animacji). SideNavBar widoczny.

## Elementy UI

- **Lewy panel:** skeleton dokumentu + animacja scan-line (`@keyframes scan`)
- **Prawy panel:** status „Analyzing document…”, checklist 3 kroków (auto-advance)
- **Cancel processing** → `/upload`

## Logika w FE

```ts
useEffect(() => {
  const timeout = setTimeout(() => {
    navigate('/verification', { state: { mode: 'queue' } });
  }, 4500);
  return () => clearTimeout(timeout);
}, [navigate]);
```

## Szablon HTML

`../../templates/processing.html`
