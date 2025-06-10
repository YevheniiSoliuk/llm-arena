### Opis projektu

Dana strona jest stroną, przedstawiającą platformę do przeprowadzenia eksperymentu z ewaluacji modeli opartych na architekturze Transformer.

Aby wejść na stronę użytkownik musi najpierw założyć konto, zatem zalogować się.

Platforma zawiera 2 strony główne: **Compare** oraz **Leaderboard**.
Strona **Compare** jest dostępna wyłącznie dla zalogowanych użytkowników. Natomiast **Leaderboard** dla każdego.

### Drzewo projektu:
 - **.firebase** - zawiera pliki z cachem dla serwisu Firebase.
 - **.github** - zawiera pliki do konfiguracji CI/CD w GitHub Actions.
 - **dist** - zawiera zbudowany do produkcji projekt.
 - **node_modules** - zawiera biblioteki.
 - **src** - folder z kodem projektu.
   - **api** - folder z kodem do komunikacji z Firebase, Inference API, oraz Auth0.
   - **assets** - zawiera pliki medialne.
   - **components** - UI komponenty napisane w React umieszczone na stronach.
   - **config** - zawiera opis zmiennych środowiskowych.
   - **constants** - zawiera pliki ze stałymi znaceniami.
   - **hooks** - zawiera metody w React do grupowania i wykonywania funkcjonalności.
   - **lib** - zawiera metody specyficzne dla konkretnej biblioteki.
   - **pages** - zawiera pliki z kodem stron.
   - **providers** - zawiera elementy z kontekstem dla całej aplikacji.
   - **store** - zawiera pliki opisujące globalny magazyn danych.
   - **types** - zawiera typy tworzonych struktur danych opisanych w Typescript.
   - **utils** - zawiera metody pomocnicze.
   - **other** - pliki z kodem wejściowym aplikacji globalnymi stylami i konfiguracją.
 - **other** - pliki z konfiguracją bibliotek styli, różnych serwisów oraz projektu.

```diff
!Przed uruchomieniem niezbędne śćągnięcie bibliotek opisanych w pliku "package.json" poleceniem
```

```
npm install
```

Uruchomienie panelu administratora lokalnie możliwe za pomocą komendy
```
npm start
```
