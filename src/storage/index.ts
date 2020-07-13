import {Action} from 'redux';
/**
 * Úkol 3
 * 8. exportujeme NAME (název modulu uložený v konstantách), ságu, reducer a Container /src/storage/index.ts
 * 9. zapojení modulu workers
 *  - do src/App je potřeba zapojit kontejner exportovaný workers modulem
 *  - do src/reducers je potřeba zapojit reducer exportovaného workers modulem
 *  - v src/saga je potřeba spustit ságu exportovanou workers modulem
 */
export const storage = {
    //TODO replace mocks with real selectors and action creators
    getWoodAmount: (state:any) => Number.NaN,
    actionBuildHouseCreator: (a:any, b:any): Action<any> => ({type: ""}),
};
