import renderBar from "../renderBar";
import renderCalendar from "../renderCalendar";
import store from "../../store";

const renderApp = () => {
  const appElement = document.getElementById("appRoot");
  renderCalendar({ appElement, store });
  renderBar({ appElement, store });
};

store.subscribe(renderApp);

window.addEventListener("load", () => store.dispatch(store.fetchCalendar));

export default renderApp;
