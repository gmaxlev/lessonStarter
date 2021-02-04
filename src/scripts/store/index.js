function store() {
  const listeners = [];
  const callListeners = () => {
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  };

  let activePeriod = new Date();
  let calendar = null;

  return {
    getActivePeriod() {
      return {
        fullYear: activePeriod.getFullYear(),
        monthName: activePeriod.toLocaleDateString("en-US", { month: "long" }),
      };
    },
    nextMonth() {
      activePeriod = new Date(activePeriod.setMonth(activePeriod.getMonth() + 1));
    },
    prevMonth() {
      activePeriod = new Date(activePeriod.setMonth(activePeriod.getMonth() - 1));
    },
    getDaysOfActivePeriod() {
      const year = activePeriod.getFullYear();
      const month = activePeriod.getMonth();
      const date = new Date(year, month, 1);
      const days = [];
      while (date.getMonth() === month) {
        let item = new Date(date);
        days.push({
          dayName: item.toLocaleDateString("en-US", { weekday: "long" }),
          date: item.getDate(),
          isDayOff: item.getDay() === 0 || item.getDay() === 6,
        });
        date.setDate(date.getDate() + 1);
      }
      return days;
    },
    fetchCalendar() {
      const departmentTeams = {
        teams: [
          {
            name: "Frontend Team",
            percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
            members: [
              {
                name: "FE_Team_User1",
                vacations: [
                  { startDate: "20.12.2020", endDate: "22.12.2020", type: "Paid" },
                  { startDate: "20.11.2020", endDate: "22.11.2020", type: "Paid" },
                ],
              },
              {
                name: "FE_Team_User1",
                vacations: [
                  { startDate: "20.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                  { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                ],
              },
            ],
          },
          {
            name: "Backend Team",
            percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
            members: [
              {
                name: "FE_Team_User1",
                vacations: [
                  { startDate: "15.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                  { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                ],
              },
              {
                name: "FE_Team_User1",
                vacations: [
                  { startDate: "20.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                  { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                ],
              },
            ],
          },
        ],
      };

      return fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        body: JSON.stringify(departmentTeams),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => (calendar = json))
        .catch((error) => alert(error));
    },
    getCalendar() {
      return calendar;
    },
    subscribe(listener) {
      listeners.push(listener);
    },
    dispatch(action) {
      const result = action();
      if (result && typeof result.then === "function") {
        result.then(callListeners);
      }
      callListeners();
    },
  };
}

export default store();
