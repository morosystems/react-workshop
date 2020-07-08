
/**
 * Řešení pro typově bezpečné n-tice dat pro jest.each funkci, které nezvládli dát do oficiálních typingů
 * https://github.com/DefinitelyTyped/DefinitelyTyped/pull/26603#discussion_r195921761
 */

interface It extends jest.It {
    each: Each;
}
interface Each extends jest.Each {
    <V1, V2>(cases: ReadonlyArray<[V1, V2]>): (name: string, fn: (v1: V1, v2: V2) => any, timeout?: number) => void;
    <V1, V2, V3>(cases: ReadonlyArray<[V1, V2, V3]>): (name: string, fn: (v1: V1, v2: V2, v3: V3) => any, timeout?: number) => void;
    <V1, V2, V3, V4>(cases: ReadonlyArray<[V1, V2, V3, V4]>): (name: string, fn: (v1: V1, v2: V2, v3: V3, v4: V4) => any, timeout?: number) => void;
    <V1, V2, V3, V4, V5>(cases: ReadonlyArray<[V1, V2, V3, V4, V5]>): (name: string, fn: (v1: V1, v2: V2, v3: V3, v4: V4, v5: V5) => any, timeout?: number) => void;
}

declare var it: It;
declare var fit: It;
declare var xit: It;
declare var test: It;
declare var xtest: It;
