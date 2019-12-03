import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";

import { createHttpClient } from "mst-gql";
import { RootStore, StoreContext } from "./models";

// 3
const rootStore = RootStore.create(undefined, {
  gqlHttpClient: createHttpClient("http://localhost:4000/graphql")
});

ReactDOM.render(
  <StoreContext.Provider value={rootStore}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
