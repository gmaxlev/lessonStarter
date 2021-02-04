const renderItemCalendar = (dayName, dayNumber, isDayOff) => {
  const component = document.createElement("td");
  const monthName = document.createElement("span");
  const monthNumber = document.createElement("span");
  monthName.innerText = dayName.substr(0, 2);
  monthNumber.innerText = String(dayNumber);
  component.append(monthName, monthNumber);
  if (isDayOff) {
    component.classList.add("calendarTable__dayOff");
  }
  return component;
};

const renderCalendar = ({ appElement, store }) => {
  const componentRoot = document.createElement("div");
  componentRoot.setAttribute("id", "calendar");
  componentRoot.classList.add("container");
  const calendarTableRoot = document.createElement("table");
  calendarTableRoot.classList.add("calendarTable");
  const calendarHead = document.createElement("thead");
  const calendarHeadTr = document.createElement("tr");

  const dates = store.getDaysOfActivePeriod();
  dates.forEach((item) => {
    calendarHeadTr.append(renderItemCalendar(item.dayName, item.date, item.isDayOff));
  });

  const calendar = store.getCalendar();
  const testComponent = document.createElement("div");
  if (calendar !== null) {
    testComponent.innerText = "Loaded";
  } else {
    testComponent.innerText = "Loading";
  }

  calendarHead.append(calendarHeadTr);
  calendarTableRoot.prepend(calendarHead);
  componentRoot.append(calendarTableRoot);
  componentRoot.append(testComponent);

  const componentRootCheck = document.getElementById("calendar");
  if (componentRootCheck === null) {
    appElement.prepend(componentRoot);
  } else {
    componentRootCheck.parentNode.insertBefore(componentRoot, componentRootCheck.nextSibling);
    componentRootCheck.parentNode.removeChild(componentRootCheck);
  }
};

export default renderCalendar;
