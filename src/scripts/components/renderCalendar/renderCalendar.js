const renderItemCalendar = ({dayName, dayNumber, isDayOff}) => {
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

const renderTableRow = ({name, sumTimers, isDayOff}) => {
  const component = document.createElement("td");
  const row = document.createElement("span");
  const numberOfTimers = document.createElement("span");

  if (name !== undefined) {
    row.innerHTML = name;
  };
  if (sumTimers !== undefined) {
    numberOfTimers.innerHTML = sumTimers;
  };
  component.append(row);
  component.append(numberOfTimers);
  if (isDayOff) {
    component.classList.add("calendarTable__dayOff");
  }
  return component;
};

const renderCalendar = ({appElement, store }) => {
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
  calendarHeadTr.append(addVocationBtn);

  const dates = store.getDaysOfActivePeriod();
  dates.forEach((item) => {
    calendarHeadTr.append(renderItemCalendar(item));
  });

  const calendarDataResponce = store.getCalendarData();
  const preloaderComponent = document.createElement("div");

  if (calendarDataResponce !== null) {
    calendarDataResponce.teams.forEach((item) => {

      const calendarBodyTr = document.createElement("tr");
      calendarBody.append(calendarBodyTr);
      calendarBodyTr.append(renderTableRow({name: item.name, sumTimers: item.members.length}));
      dates.forEach((item) => {
        calendarBodyTr.append(renderTableRow({isDayOff: item.isDayOff}));
      });
      item.members.forEach((item) => {
        const calendarBodyTr = document.createElement("tr");
        calendarBody.append(calendarBodyTr);
        calendarBodyTr.append(renderTableRow({name: item.name}));
        dates.forEach((item) => {
          calendarBodyTr.append(renderTableRow({isDayOff: item.isDayOff}));
        });
      });
    });
  } else {
    preloaderComponent.innerText = "Loading";
  }



  calendarHead.append(calendarHeadTr);
  calendarTableRoot.prepend(calendarHead);
  calendarTableRoot.append(calendarBody);
  componentRoot.append(calendarTableRoot);
  componentRoot.append(preloaderComponent);

  const componentRootCheck = document.getElementById("calendar");
  if (componentRootCheck === null) {
    appElement.prepend(componentRoot);
  } else {
    componentRootCheck.parentNode.insertBefore(componentRoot, componentRootCheck.nextSibling);
    componentRootCheck.parentNode.removeChild(componentRootCheck);
  }
};

export default renderCalendar;