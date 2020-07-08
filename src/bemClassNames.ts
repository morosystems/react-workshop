import { withNaming } from "@bem-react/classname";

/**
 * Funkce z knihovny @bem-react/classname přizpůsobená projektové konvenci zápisu css tříd.
 * @internal
 */
export const bemClassNames = withNaming({ n: '', e: '__', m: '--', v: '-' });
