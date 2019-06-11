import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//Components
import App from "./App";
import ContextMenu from "./Components/contextmenu";
import * as serviceWorker from "./serviceWorker";

//Styles
import "./Styles/navi.css";
import "./Styles/preloader.css";
import "./Styles/gallery.css";

ReactDOM.render(
  <BrowserRouter>
      <ContextMenu />
      <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register(); //unregister(); //