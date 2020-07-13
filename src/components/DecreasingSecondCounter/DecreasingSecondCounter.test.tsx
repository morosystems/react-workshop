import React from 'react';
import {mount, shallow} from "enzyme";
import { act } from 'react-dom/test-utils';

import {DecreasingSecondCounter, DecreasingSecondCounterProps} from "./DecreasingSecondCounter";

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
        const sharedProps: Pick<DecreasingSecondCounterProps, "onCounterReset" | "msg"> = {
            onCounterReset: () => {},
            msg: "seconds",
        };
        it("Renders Text \"30 seconds\" in dark theme", () => {
            const props: DecreasingSecondCounterProps = {...sharedProps, isDarkTheme: true, startValue: 30}
            expect(shallow(<DecreasingSecondCounter{...props} />)).toMatchSnapshot();
        });
        it("Renders Text \"40 seconds\" in light theme", () => {
            const props: DecreasingSecondCounterProps = {...sharedProps, isDarkTheme: false, startValue: 40}
            expect(shallow(<DecreasingSecondCounter{...props} />)).toMatchSnapshot();
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
        const onCounterResetMock = jest.fn();
        const props: DecreasingSecondCounterProps = {
            msg: "counter text",
            startValue: 2,
            isDarkTheme: false,
            onCounterReset: onCounterResetMock,
        };

        // provedeme na mountování komponenty
        const component = mount(
            <DecreasingSecondCounter {...props} />
        );
        // po namountování by nemělo dojít k provolání callbacku
        expect(onCounterResetMock).not.toBeCalled();

        // počet cyklů setTimout o které se chceme posunout
        const numberOfCycles = 2;
        // posuneme timery setTimeout, setInterval funcí
        // pokud chceme simulovat přesné chování reactu musíme obalit do act
        act(() => {
            jest.advanceTimersByTime(1000 * props.startValue * numberOfCycles);
        });

        // po uplynutí dvou cyklů by mělo dojít k stejnému počtu provolání
        expect(onCounterResetMock).toBeCalledTimes(numberOfCycles);
        // unmountujeme komponentu aby neběžela v pozadí ostatních testů
        component.unmount();
    });
});
