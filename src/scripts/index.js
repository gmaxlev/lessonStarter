import "../styles/index.scss";
import renderApp from "./components/renderApp/renderApp";

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}

renderApp();
