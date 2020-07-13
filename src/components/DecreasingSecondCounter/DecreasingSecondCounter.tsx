import React, { FunctionComponent } from "react";

export type DecreasingSecondCounterProps = {
  msg: string;
  startValue: number;
  isDarkTheme: boolean;
  onCounterReset: () => void;
};

/**
 * UKOL 1
 * 1. pro rozhraní použijeme propsy msg, startValue, isDarkTheme, onCounterReset
 *    - komponenta je již zapojená do stránky i na redux a startValue, isDarkTheme, onCounterReset obsahují příslušné data
 *    - typování není zatím třeba řešit
 * 2. aktuální hodnotu counteru máme uloženou pomocí hooku useState https://reactjs.org/docs/hooks-state.html
 * 3. za pomoci useEffect hooku budem odečítat čas a když dojdem na nulu, resetujeme na startValue https://reactjs.org/docs/hooks-effect.html
 *    - hook závisí na propsech startValue a onCounterReset (a výstupu useState)
 *    - dokud nedojdem s counterem na nulu, tak snižujeme hodnotu counteru
 *    - ve chvíli kdy dojdem na nulu nastavíme hodnotu counteru na startValue a zároveň zavoláme onCounterReset
 *    - pro nastavení timeoutu na v vteřinu je vhodné použít funkce setTimeout nebo setInterval
 * 4. přidáme styly komponenty
 *  - pro tvorbu classname použijeme util funkci /src/bemClassNames rozšiřující https://www.npmjs.com/package/@bem-react/classname
 *  - do souboru /src/components/DecreasingSecondCounter.css přidáme
 *      - styl pro základní classname (použité pro light theme) - barva textu je #696969
 *      - styl pro classname s parametrem dark theme - barva textu je #cacaca
 * 5. lokalizujeme popisek v kontejneru /src/menu/container/WorkersArrivalCounter
 */

export const DecreasingSecondCounter: FunctionComponent<
  DecreasingSecondCounterProps
> = () => <span />;
