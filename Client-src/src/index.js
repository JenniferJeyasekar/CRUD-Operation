import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

//Render react element into DOM
ReactDOM.render(
    <App />, document.getElementById("root"));


serviceWorker.unregister();
