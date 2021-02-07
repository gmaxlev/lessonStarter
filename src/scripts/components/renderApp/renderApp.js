const renderApp = () => {
  const app = new AppComponent();
  app.setParentSelector(document.getElementById("appRoot"));
  app.mount();
};

class Element {
  constructor(tagName = "div", attrs = {}, childs = [], innerText, events = {}) {
    this.tagName = tagName;
    this.attrs = attrs;
    this.childs = childs;
    this.innerText = innerText;
    this.events = events;
  }
  render() {
    const element = document.createElement(this.tagName);
    Object.entries(this.attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    Object.entries(this.events).forEach(([key, value]) => {
      element.addEventListener(key, value);
    });
    if (this.innerText !== undefined) {
      element.innerText = this.innerText;
    }
    this.childs.forEach((child) => {
      if (child instanceof Element) {
        element.appendChild(child.render());
      } else if (child instanceof Component) {
        child.setParentSelector(element);
        element.appendChild(child.render().render());
      }
    });
    return element;
  }
}

class Component {
  constructor(props) {
    this.props = props;
  }
  setParentSelector(parentSelector) {
    this.parentSelector = parentSelector;
  }
  mount() {
    this.parentSelector.innerHTML = "";
    this.parentSelector.append(this.render().render());
  }
}

class NavigationComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return new Element("div", { class: "calendarBar" }, [
      new Element("button", { class: "calendarBar__nav calendarBar__nav_prev" }, [], undefined, {
        click: this.props.prev,
      }),
      new Element(
        "span",
        { class: "calendarBar__current" },
        [],
        `${this.props.date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
      ),
      new Element("button", { class: "calendarBar__nav calendarBar__nav_next" }, [], undefined, {
        click: this.props.next,
      }),
    ]);
  }
}

class TableComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.teams === null) {
      return new Element("div", { class: "loading" }, [], "Loading");
    }
    const theadTd = this.props.allDays.map((item) => {
      return new Element("td", { class: item.isDayOff ? "calendarTable__dayOff" : "" }, [
        new Element("span", {}, [], `${item.dayName.substr(0, 2)}`),
        new Element("span", {}, [], `${item.date}`),
      ]);
    });
    return new Element("table", { class: "calendarTable" }, [
      new Element("thead", {}, [
        new Element("tr", {}, [
          new Element("td", { class: "calendarTable__addVocation" }, [new Button({ text: "+ Add Vacation" })]),
          ...theadTd,
        ]),
      ]),
    ]);
  }
}

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
    this.mount();
  }
  prevMonth() {
    this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    this.mount();
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
      .then((json) => {
        this.teams = json;
        this.mount();
      })
      .catch((error) => alert(error));
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
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  render() {
    return new Element("div", { class: "container" }, [
      new NavigationComponent({ date: this.date, next: this.nextMonth, prev: this.prevMonth }),
      new TableComponent({ allDays: this.getDaysOfActivePeriod(), teams: this.teams }),
    ]);
  }
}

class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return new Element("button", { class: "button button_a" }, [], this.props.text);
  }
}

export default renderApp;
