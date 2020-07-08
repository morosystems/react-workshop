import React from "react";
import MainContainer from "./components/MainContainer";
import menu from "./menu";
import { workers } from "./workers";
import { storage } from "./storage";

/**
 * Ukol 2
 * 1. zapojení modulu workers
 *    - do src/App je potřeba zapojit kontejner exportovaný modulem workers
 */
export default () => (
  <MainContainer>
    <menu.Container storage={<storage.Container />} />
    <workers.Container />
  </MainContainer>
);
