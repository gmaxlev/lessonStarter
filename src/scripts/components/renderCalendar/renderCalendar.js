/**
 * Creates and returns HTML TD element of head calendar table
 * @param dayName {string} Day name
 * @param dayNumber {number} day of the month (from 1 to 31)
 * @param isDayOff {boolean} True if it's holiday
 * @returns {HTMLTableDataCellElement}
 */
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

/**
 * Creates or updates calendar
 * @param {HTMLElement} appElement Root app element
 * @param {Object} store Store
 */
const renderCalendar = ({ appElement, store }) => {
  const componentRoot = document.createElement("div");
  componentRoot.setAttribute("id", "calendar");
  componentRoot.classList.add("container");
  const calendarTableRoot = document.createElement("table");
  calendarTableRoot.classList.add("calendarTable");
  const calendarHead = document.createElement("thead");
  const calendarHeadTr = document.createElement("tr");

  // Get all days days of the active period from store
  const dates = store.getDaysOfActivePeriod();
  dates.forEach((item) => {
    calendarHeadTr.append(renderItemCalendar(item.dayName, item.date, item.isDayOff));
  });

  calendarHead.append(calendarHeadTr);
  calendarTableRoot.prepend(calendarHead);
  componentRoot.append(calendarTableRoot);

  const componentRootCheck = document.getElementById("calendar");
  if (componentRootCheck === null) {
    appElement.prepend(componentRoot);
  } else {
    componentRootCheck.parentNode.insertBefore(componentRoot, componentRootCheck.nextSibling);
    componentRootCheck.parentNode.removeChild(componentRootCheck);
  }
};

export default renderCalendar;
