import teamIcon from "../../../images/team.svg";

const renderHeadItem = ({ dayName, dayNumber, isDayOff }) => {
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

const renderTableRow = ({ name, sumMembers, isDayOff, percentageOfAbsent }) => {
  const component = document.createElement("td");
  const componentContent = document.createElement("div");
  component.append(componentContent);

  if (name !== undefined) {
    const nameElement = document.createElement("span");
    nameElement.classList.add("calendarTable__team-name");
    nameElement.innerHTML = name;
    componentContent.append(nameElement);
  }
  if (sumMembers !== undefined) {
    const sumMembersElement = document.createElement("span");
    sumMembersElement.classList.add("calendarTable__team-count");
    const numberOfTimersIcon = document.createElement("img");
    numberOfTimersIcon.setAttribute("src", teamIcon);
    const numberOfTimersText = document.createElement("span");
    numberOfTimersText.innerHTML = sumMembers;
    sumMembersElement.append(numberOfTimersIcon, numberOfTimersText);
    componentContent.append(sumMembersElement);
  }

  if (percentageOfAbsent !== undefined) {
    const percentageElement = document.createElement("span");
    percentageElement.classList.add("calendarTable__percentage");
    percentageElement.innerHTML = percentageOfAbsent;
    componentContent.append(percentageElement);
  }

  if (name !== undefined || sumMembers !== undefined) {
    componentContent.classList.add("calendarTable__team-title");
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
    calendarHeadTr.append(renderHeadItem({ dayName: item.dayName, dayNumber: item.date, isDayOff: item.isDayOff }));
  });

  const calendar = store.getCalendar();
  const preloaderElement = document.createElement("div");

  if (calendar !== null) {
    calendar.teams.forEach((item, index, array) => {
      const calendarBodyTr = document.createElement("tr");
      calendarBodyTr.classList.add("calendarTable__team-header");
      calendarBody.append(calendarBodyTr);
      calendarBodyTr.append(
        renderTableRow({
          name: item.name,
          sumMembers: item.members.length,
          percentageOfAbsent: item.percentageOfAbsent[store.getActivePeriod().monthNumber],
        }),
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
    preloaderElement.innerText = "Loading";
  }

  calendarHead.append(calendarHeadTr);
  calendarTableRoot.prepend(calendarHead);
  calendarTableRoot.append(calendarBody);
  componentRoot.append(calendarTableRoot);
  componentRoot.append(preloaderElement);

  const componentRootCheck = document.getElementById("calendar");
  if (componentRootCheck === null) {
    appElement.prepend(componentRoot);
  } else {
    componentRootCheck.parentNode.insertBefore(componentRoot, componentRootCheck.nextSibling);
    componentRootCheck.parentNode.removeChild(componentRootCheck);
  }
};

export default renderCalendar;
