import Component from "../Component/Component";
import Element from "../Element/Element";
import TableComponent from "../renderCalendar/renderCalendar";
import NavigationComponent from "../renderBar/renderBar";

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.teams = null;
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.fetchCalendar = this.fetchCalendar.bind(this);
    this.fetchCalendar();
  }
  nextMonth() {
    this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
    this.update();
  }
  prevMonth() {
    this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    this.update();
  }
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
                { startDate: "20.02.2021", endDate: "22.03.2021", type: "Paid" },
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
      .then((json) => {
        this.teams = json;
        this.update();
      });
  }
  getDaysOfActivePeriod() {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      let item = new Date(date);
      days.push({
        dayName: item.toLocaleDateString("en-US", { weekday: "long" }),
        date: item.getDate(),
        isDayOff: item.getDay() === 0 || item.getDay() === 6,
        fullDate: item,
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  render() {
    return new Element("div", { class: "container" }, [
      new Element(NavigationComponent, { date: this.date, next: this.nextMonth, prev: this.prevMonth }),
      new Element(TableComponent, { allDays: this.getDaysOfActivePeriod(), teams: this.teams, date: this.date }),
    ]);
  }
}

const renderApp = () => {
  const app = new AppComponent();
  app.setParentSelector(document.getElementById("appRoot"));
  app.update();
};

export default renderApp;
