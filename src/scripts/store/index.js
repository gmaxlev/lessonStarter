const store = () => {
  const listeners = [];

  let activePeriod = new Date();
  let tasks = [];

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
    subscribe(listener) {
      listeners.push(listener);
    },
    dispatch(action) {
      action();
      for (let i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
  };
};

export default store();
