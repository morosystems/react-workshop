import * as React from "react";
import { render } from "react-dom";

import StoreProvider from "./StoreProvider";
import "react-toggle/style.css";

const rootElement = document.getElementById("root");
render(<StoreProvider />, rootElement);
