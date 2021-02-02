/**
 * Month names
 * @type {string[]}
 */
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Days of the week
 * @type {string[]}
 */
const NAME_OF_DATE = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Returns month names by number
 * @param {number} monthNumber The month as number without a leading zero (1-12).
 * @returns {string} Month name
 */
function getMonthName(monthNumber) {
  return MONTH_NAMES[monthNumber];
}

/**
 * Returns day of the week names by number
 * @param {number} monthNumber The month as number without a leading zero (1-12).
 * @returns {string} Month name
 */
function getDayName(monthNumber) {
  return NAME_OF_DATE[monthNumber];
}

/**
 * Mini Store
 */
const store = () => {
  /**
   * Change listeners
   * @type {function[]}
   */
  const listeners = [];

  /**
   * Active period in calendar
   * @type {Date}
   */
  let activePeriod = new Date();

  return {
    /**
     * Returns info about active period
     * @returns {{fullYear: number, monthName: string}}
     */
    getActivePeriod() {
      return {
        fullYear: activePeriod.getFullYear(),
        monthName: getMonthName(activePeriod.getMonth()),
      };
    },
    /**
     * Change active period to next month
     */
    nextMonth() {
      activePeriod = new Date(activePeriod.setMonth(activePeriod.getMonth() + 1));
    },
    /**
     * Change active period to prev month
     */
    prevMonth() {
      activePeriod = new Date(activePeriod.setMonth(activePeriod.getMonth() - 1));
    },
    /**
     * Returns array of days of active period
     * @returns {{dayName: string, date: number, isDayOff: boolean}[]}
     */
    getDaysOfActivePeriod() {
      const year = activePeriod.getFullYear();
      const month = activePeriod.getMonth();
      const date = new Date(year, month, 1);
      const days = [];
      while (date.getMonth() === month) {
        let item = new Date(date);
        days.push({
          dayName: getDayName(item.getDay()),
          date: item.getDate(),
          isDayOff: item.getDay() === 0 || item.getDay() === 6,
        });
        date.setDate(date.getDate() + 1);
      }
      return days;
    },
    /**
     * Adds a change listener
     * @param {function} listener
     */
    subscribe(listener) {
      listeners.push(listener);
    },
    /**
     * Dispatches an action and call listeners
     * @param {function} action
     */
    dispatch(action) {
      action();
      for (let i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
  };
};

export default store();
