# Reużywalny Komponent: TopNavBar

## Zastosowanie

Górna horyzontalna płaszczyzna dokująca. Odpowiedzialna za elementy wyszukiwania, preferencji w profilu przypiętym w rogu okna lub wyświetlania notyfikacji. Posiada szklany flat efekt po którym nie scrolluje się layout tablic/katalogów poniżej.

## Budowa propsów w TSX/React

```ts
interface TopNavBarProps {
	onSearchQueryChange?: (val: string) => void;
	avatarUrl?: string; // Domyślna ścieżka do ikonografii użytkownika
}
```

## Komponenty zależne

Z `TopNavBar` korzystają niemal wszystkie widoki archiwum (`/archive`, `/shared`, oraz niekiedy wykreowany `/upload` i `/verification`).
Pozwala pominąć ucinający i zapychający w każdym dokumencie tagowy stóg HTML wywodzący się z sekcji `<header class="docked full-width top-0..." >`.
