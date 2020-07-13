import React from "react";
import MainContainer from "./components/MainContainer";
import menu from "./menu";

/**
 * Ukol 2
 * 1. zapojení modulu workers
 *    - do src/App je potřeba zapojit kontejner exportovaný modulem workers
 * Úkol 3
 * 9. zapojení modulu workers
 *    - do src/App je potřeba zapojit kontejner exportovaný modulem workers
 */
export default () => (
  <MainContainer>
    <menu.Container storage={null} /> {/* TODO insert storage container instead of null */}
      {/* TODO insert storage container */}
  </MainContainer>
);
