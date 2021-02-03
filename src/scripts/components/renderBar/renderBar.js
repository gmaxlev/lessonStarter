const renderNavButton = (direction, onClick) => {
  const component = document.createElement("button");
  component.classList.add("calendarBar__nav", direction === "prev" ? "calendarBar__nav_prev" : "calendarBar__nav_next");
  component.addEventListener("click", onClick);
  return component;
};

const renderBar = ({ appElement, store }) => {
  const activePeriod = store.getActivePeriod();

  const calendarToolbar = document.createElement("div");
  calendarToolbar.classList.add("calendarBar");
  calendarToolbar.setAttribute("id", "bar");

  const calendarToolbarCurrent = document.createElement("p");
  calendarToolbarCurrent.classList.add("calendarBar__current");
  calendarToolbarCurrent.innerText = `${activePeriod.monthName} ${activePeriod.fullYear}`;

  calendarToolbar.append(renderNavButton("prev", () => store.dispatch(store.prevMonth)));
  calendarToolbar.append(calendarToolbarCurrent);
  calendarToolbar.append(renderNavButton("next", () => store.dispatch(store.nextMonth)));

  const renderBarComponent = document.getElementById("bar");
  if (renderBarComponent === null) {
    appElement.prepend(calendarToolbar);
  } else {
    renderBarComponent.parentNode.insertBefore(calendarToolbar, renderBarComponent.nextSibling);
    renderBarComponent.parentNode.removeChild(renderBarComponent);
  }
};

export default renderBar;
