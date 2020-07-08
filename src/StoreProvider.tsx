import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import {reducer} from "./reducers";
import MainContainer from "./components/MainContainer";
import App from "./App";
import { saga } from "./saga";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saga);

export default () => (
  <Provider store={store}>
    <MainContainer>
      <App />
    </MainContainer>
  </Provider>
);
