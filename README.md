# React workshop aplikace

* installace
`yarn install`

* spuštění aplikace na localhost:3000 
`yarn start`

* spuštění testů
`yarn run test`

* update Jest snapshotů
`yarn run test:update-snapshots`


# Popis aplikace
cílem je doplnit existující React web aplikaci/hru za využití reduxu a ság, tak aby reflektovala zadání.

# Základní jednotky
* dřevo
* jídlo 
* pracovníci
* kapacita domů (maximální počet pracovníků)

# Základní mechanismus
* cílem hry je dosáhnout 100 populace
    * hráč musí stavět domy a produkovat jídlo aby dosáhl vyšší populace
* každých 45s přijdou 3 nových pracovníci
    * pracovníci se zabydlí pokud je dostatečný housing limit, ti kteří jsou nad limit odejdou
    * nový pracovník nemá pracovní zařazení
* pracovníci můžou pracovat bud na pile nebo na poli
    * pila produkuje každých 30s 1 dřevo za každého pracovníka
    * pole produkuje každých 30s 1 jídlo za každého pracovníka
* každý pracovník musí jíst
    * zaměstnaný 1 jídlo za 1m
    * nezaměstnaný 1 jídlo za 80s
    * pokud nemá pracovník co jíst začne hladovět
    * pokud nemá hladovějící pracovník co jíst umírá
* hráč může
    * přiřazovat nezařazeným pracovníkům pozici
    * stavět domy - dům má kapacitu 5 pracovníků a stojí dvě dřeva
* hráč začíná s 10 pracovníky a 3 domy
# GUI
* hráč vidí v horní liště
    * obsah skladiště (dřevo  jídlo)
    * počet pracovníků
    * kapacitu domů pro pracovníky
    * čas do příchodu nových pracovníků
    * tlačítko na postavení domu
        * je aktivní pouze pokud má dostatek dřeva
* přehled nezařazených pracovníků
* přehled pracovníků pracujících na pile
* tlačítko na přiřazení nezařazeného pracovníka na pilu
* přehled pracovníků pracujících na poli
* tlačítko na přiřazení nezařazeného pracovníka na pole
# Zadání workshopových úkolů
_pozn. mechanismy aplikace mimo zadání budu již připravené._

## Úkol 1 -  Přidání react komponenty
### Cíl úkolu
Přidání komponenty, která nám bude ukazovat čas do příchodu nových pracovníků do horní lišty

### Co si zkusíme?
implementace komponenty, hooky, theming, testování komponenty

### Postup
Je připravena kostra komponenty /src/components/DecreasingSecondCounter.tsx

1. pro rozhraní použijeme propsy msg, startValue, isDarkTheme, onCounterReset
    * komponenta je již zapojená do stránky i na redux a startValue, isDarkTheme, onCounterReset obsahují příslušné data
    * typování není zatím třeba řešit
2. aktuální hodnotu counteru máme uloženou pomocí hooku useState https://reactjs.org/docs/hooks-state.html
3. za pomoci useEffect hooku budem odečítat čas a když dojdem na nulu, resetujeme na startValue https://reactjs.org/docs/hooks-effect.html
    * hook závisí na propsech startValue a onCounterReset (a výstupu useState)
    * dokud nedojdem s counterem na nulu, tak snižujeme hodnotu counteru
    * ve chvíli kdy dojdem na nulu nastavíme hodnotu counteru na startValue a zároveň zavoláme onCounterReset
    * pro nastavení timeoutu na v vteřinu je vhodné použít funkce setTimeout nebo setInterval
4. přidáme podporu dark themingu (barva textu #696969 pro light theme, #cacaca pro dark theme)
    * pro tvorbu classname použijeme util funkci /src/bemClassNames rozšiřující https://www.npmjs.com/package/@bem-react/classname
    * do souboru /src/components/DecreasingSecondCounter.css přidáme
        * styl pro základní classname (použité pro light theme) - barva textu je #696969
        * styl pro classname s parametrem dark theme - barva textu je #cacaca
5. napíšeme unit test v components/DecreasingSecondCounter/DecreasingSecondCounter.test.tsx
    * Snapshot testy
        * otestujeme zda komponenta renderuje text obsahující počáteční počet vteřin v light theme i dark theme módu.
        1. napíšeme test pomocí expect(...) https://jestjs.io/docs/en/expect#expectvalue testujeme námi vygenerovaný DOM se snapshotem
        2. na porovnání se snapshotem použijeme expect(...).toMatchSnapshot() https://jestjs.io/docs/en/expect#tomatchsnapshotpropertymatchers-hint
        3. pomocí enzyme funkce shallow provedeme shallow render DecreasingSecondCounter https://enzymejs.github.io/enzyme/docs/api/shallow.html
        4. vygenerujeme/updatujeme snapshoty pomocí příkazové řádky npm run test:update-snapshots
    * Unit test
        * otestujeme že námi předaný callback je provolán po uplnynutí dané doby
             1. vytvoříme mock callbacku pomocí jest.fn() (přiřadíme do proměnné např. onCounterResetMock)
             2. vytvoříme shallow render komponenty stejně jako v bodu 3, předáme mock
             3. po uplynutí danné doby otestujem, že náš mock byl provolán
                * na otestování použíjeme expect(...).toBe(1)
                * počet provolání zjístíme přímo z mocku onCounterResetMock.mock.calls.length
             4. unmountujeme komponentycomponent.unmount();
## Úkol 2 - zapojení modulu pracovníků
### Cíl úkolu
zobrazení pracovníků v aplikaci

### Co si zkusíme?
definování rozhraní modulu, zapojení konterjneru modulu, napojení kontejneru na redux

### Postup
1. definice rozhraní v souboru /src/workers/index.ts
    * exportujme modul - používáme named exporty export const workers = { ... }
    * je třeba exportovat NAME (název modulu uložený v konstantách), ságu, reducer a Container
2. zapojení modulu workers
    * do src/App je potřeba zapojit kontejner exportovaný workers modulem
    * do src/reducers je potřeba zapojit reducer exportovaného workers modulem
    * v src/saga je potřeba spustit ságu exportovanou workers modulem
3. doplnění kontejneru src/workers/containers/UnemployedWorkers" bude zobrazovat přehled nezaměstnaných pracovníků
    * použití připravených komponent
        * WorkerListHeader - zobrazuje lokalizovaný nadpis, použijeme selektor i18n.getMessage(state, "unemployed")
        * WorkerList - zobrazuje jména nezměstnaných pracovníků, ty získáme ze stavu pomocí selektoru z definovaného v src/workers/selecectors.ts
## Úkol 3 - vytvoření modulu skladiště
### Cíl úkolu
vytvoření modulu skladiště 

### Co si zkusíme?
vytvoření modulu, akcí, reduceru, selectoru

### Postup
1. v souboru src/storage/types.ts
    * vytvoření interface pro sklad IStorage bude obsahovat množství dřeva a jídla
    * vytvoření interface IResourcesState stav našeho modulu, bude obsahovat typování skladu a kapacity provníků
2. v souboru  src/resources/reducer.ts doplnění defaultních hodnot pro reducery storage a workerCapacity
3. vytvoření selektorů getWoodAmount, getFoodAmount, getWorkerCapacity v src/storage/selectors.ts
4. zapojení getWoodAmount, getFoodAmount, getWorkerCapacity  v src/storage/Container.tsx 
5. vytvoření akcí WOOD_PRODUCED, FOOD_PRODUCED, REMOVE_FOOD, BUILD_HOUSE v src/storage/constants.ts
6. vytvoření action creatorů actionWoodProducedCreator(amount), actionFoodProducedCreator(amount), actionRemoveWoodCreator(amount), actionBuildHouseCreator(capacity, cost) v src/stroage/actions.ts
7. aplikování akcí v src/storage/reducer.ts
8. exportujeme NAME (název modulu uložený v konstantách), ságu, reducer a Container /src/storage/index.ts
9. zapojení modulu workers
    * do src/App je potřeba zapojit kontejner exportovaný workers modulem
    * do src/reducers je potřeba zapojit reducer exportovaného workers modulem
    * v src/saga je potřeba spustit ságu exportovanou workers modulem
## Úkol 4 - ságy
### Cíl úkolu
generování surovin 

### Co si zkusíme?
tvorba ságy, efekty, tvorba util funkce, testy na ságu a util funkci

### Postup
1. v src/storage/saga doplníme ságy pro genrerování surovin
2. ságy pro dřevo/jídlo budou mít stejné chování, jen počítat s jinými hodnotami
3. v nekonečném cyklu budem opakovat
    * načtení aktuální konfigurace z config.getGameConfig
    * pomocí effektu delay počkáme daný počet milisekund (je potřeba převést hodnotu z konfigurace z sekund na ms)
    * ze stavu vybereme aktuální pracovníků na dané pozici
    * pokud jsou na dané pozici někteří pracovníci přidáme tolik suroviny kolik je pracovníků
4. napíšeme testy na obě ságy
    * integrační test
        * pomocí expectSaga provedeme integrační test hlavní ságy
        * definujeme providery v rootSagaProviders
        * provider je pole, kde první prvek pole je daný efekt a druhý jsou jeho parametry (pokud nepředáváme parametry nastavíme druhý prvek na null)
        * nastavíme providery expect ságy pomocí .provide(rootSagaProviders)
        * otestujeme dílčí efekty nad expect ságou
        * nakonec zavoláme .silentRun() abychom se vyhli warningů ohledně nekonečného cyklu
    * jednotkový test
        * pomocí testSaga provedeme jednotkový test initStorageSaga
        * na začátku testu je třeba napsat .next()
        * otestujeme dané efekty, select, put, delay..
        * každý další efekt krokujeme pomocí next
        * pokud potřebujem předat výsledek do proměnné předáme jako parametr následujícího .next()
        * ujistíme se že sága doběhla pomocí .isDone()
        * pokud je sága v nekončeném cyklu, testujeme jeden cyklus a ukončíme ji pomocí .finish()
## Úkol 5 - optimalizace
### Cíl úkolu
Optimalizace překreslování

### Co si zkusíme?
normalizace stavu a překreslování

### Postup
1. normalizovat stav pracovníků, každá z podskupin by měla mít vlastní reducer obsahující id dané podskupiny. (např. unemployedWorkerIds)
2. List komponenta bude napojená a iterovat přes list id vytvořený v prvním bodu
3. Komponenta řádku obdrží id daného řádku a pak pomocí reselectu na základě daného id vybere příslušný záznam z workers
## Úkol 6 - samostatná práce
1. výherní podmínka (více samostatná práce)
    * napsání komponenty pro informování hráče o tom, že vyhrál.
    * ošetření podmínky v sáze
    * přidání komponenty do DOMu po splnění výherní podmínky
