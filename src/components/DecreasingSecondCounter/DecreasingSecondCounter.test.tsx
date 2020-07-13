import { act } from 'react-dom/test-utils';

import {DecreasingSecondCounterProps} from "./DecreasingSecondCounter";

// protože chceme testovat setTimeout, seInterval funkce
jest.useFakeTimers();

describe("DecreasingSecondCounter", () => {
    /**
     * 5. Snapshot testy
     * otestujeme zda komponenta renderuje text obsahující počáteční počet vteřin v light theme i dark theme módu.
     * 1. napíšeme test pomocí expect(...) https://jestjs.io/docs/en/expect#expectvalue testujeme námi vygenerovaný DOM se snapshotem
     * 2. na porovnání se snapshotem použijeme expect(...).toMatchSnapshot() https://jestjs.io/docs/en/expect#tomatchsnapshotpropertymatchers-hint
     * 3. pomocí enzyme funkce shallow provedeme shallow render DecreasingSecondCounter https://enzymejs.github.io/enzyme/docs/api/shallow.html
     * 4. vygenerujeme/updatujee snapshoty pomocí příkazové řádky npm run test:update-snapshots
     */
    describe("Snapshot", () => {
        // @ts-ignore
        const sharedProps: Pick<DecreasingSecondCounterProps, "onCounterReset" | "msg"> = {
            onCounterReset: () => {},
            msg: "seconds",
        };
        it("Renders Text \"30 seconds\" in dark theme", () => {
            // TODO
        });
        it("Renders Text \"40 seconds\" in light theme", () => {
            // TODO
        });
    });

    /**
     * 5. Unit test
     * otestujeme že námi předaný callback je provolán po uplnynutí dané doby
     *  - vytvoříme mock callbacku pomocí jest.fn() (přiřadíme do proměnné např. onCounterResetMock)
     *  - vytvoříme shallow render komponenty stejně jako v bodu 3, předáme mock
     *  - po uplynutí danné doby otestujem, že náš mock byl provolán
     *      - na otestování použíjeme expect(...).toBe(1)
     *      - počet provolání zjístíme přímo z mocku onCounterResetMock.mock.calls.length
     *      component.unmount();
     *      https://jestjs.io/docs/en/timer-mocks
     */
    it("On counter reset callback is called after startValue seconds", () => {
        // vytvoříme mock callbacku pomocí jest.fn() (přiřadíme do proměnné např. onCounterResetMock)

        // provedeme na mountování komponenty

        // po namountování by nemělo dojít k provolání callbacku ozkoušíme pomocí not.toBeCalled()

        // počet cyklů setTimout o které se chceme posunout
        // @ts-ignore
        const numberOfCycles = 2;

        // pokud chceme simulovat přesné chování reactu musíme obalit do act
        act(() => {
            // posuneme timery setTimeout, setInterval funcí jest.advanceTimersByTime()
        });

        // po uplynutí dvou cyklů by mělo dojít k stejnému počtu provolání

        // unmountujeme komponentu aby neběžela v pozadí ostatních testů

    });
});
