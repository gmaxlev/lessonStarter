import teamIcon from "../../../images/team.svg";

const renderItemCalendar = ({ dayName, dayNumber, isDayOff }) => {
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

const renderTableRow = ({ name, sumTimers, isDayOff, percentageOfAbsent }) => {
  const component = document.createElement("td");
  const componentContent = document.createElement("div");
  component.append(componentContent);

  if (name !== undefined) {
    const row = document.createElement("span");
    row.classList.add("calendarTable__team-name");
    row.innerHTML = name;
    componentContent.append(row);
  }
  if (sumTimers !== undefined) {
    const numberOfTimers = document.createElement("span");
    numberOfTimers.classList.add("calendarTable__team-count");
    const numberOfTimersIcon = document.createElement("img");
    numberOfTimersIcon.setAttribute("src", teamIcon);
    const numberOfTimersText = document.createElement("span");
    numberOfTimersText.innerHTML = sumTimers;
    numberOfTimers.append(numberOfTimersIcon, numberOfTimersText);
    componentContent.append(numberOfTimers);
  }

  if (name !== undefined || sumTimers !== undefined) {
    componentContent.classList.add("calendarTable__team-title");
  }

  if (percentageOfAbsent !== undefined) {
    const percentage = document.createElement("span");
    percentage.classList.add("calendarTable__percentage");
    percentage.innerHTML = percentageOfAbsent;
    componentContent.append(percentage);
  }

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
  const calendarBody = document.createElement("tbody");
  const calendarHeadTr = document.createElement("tr");
  const addVocationBtn = document.createElement("button");
  addVocationBtn.innerHTML = "+ Add Vacation";
  addVocationBtn.classList.add("button", "button_a");
  const addVocationTd = document.createElement("td");
  addVocationTd.classList.add("calendarTable__addVocation");
  addVocationTd.append(addVocationBtn);
  calendarHeadTr.append(addVocationTd);

  const dates = store.getDaysOfActivePeriod();
  dates.forEach((item) => {
    calendarHeadTr.append(renderItemCalendar({ dayName: item.dayName, dayNumber: item.date, isDayOff: item.isDayOff }));
  });

  const calendar = store.getCalendar();
  const testComponent = document.createElement("div");

  if (calendar !== null) {
    calendar.teams.forEach((item, index, array) => {
      const calendarBodyTr = document.createElement("tr");
      calendarBodyTr.classList.add("calendarTable__team-header");
      calendarBody.append(calendarBodyTr);
      calendarBodyTr.append(
        renderTableRow({ name: item.name, sumTimers: item.members.length, percentageOfAbsent: "333" }),
      );
      dates.forEach((item) => {
        calendarBodyTr.append(renderTableRow({ isDayOff: item.isDayOff }));
      });
      item.members.forEach((item) => {
        const calendarBodyTr = document.createElement("tr");
        calendarBody.append(calendarBodyTr);
        calendarBodyTr.append(renderTableRow({ name: item.name }));
        dates.forEach((item) => {
          calendarBodyTr.append(renderTableRow({ isDayOff: item.isDayOff }));
        });
      });
      if (index !== array.length - 1) {
        const emptyRow = document.createElement("tr");
        emptyRow.classList.add("calendarTable__empty");
        dates.forEach((item) => {
          emptyRow.append(document.createElement("td"));
        });
        calendarBody.append(emptyRow);
      }
    });
  } else {
    testComponent.innerText = "Loading";
  }

  calendarHead.append(calendarHeadTr);
  calendarTableRoot.prepend(calendarHead);
  calendarTableRoot.append(calendarBody);
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
