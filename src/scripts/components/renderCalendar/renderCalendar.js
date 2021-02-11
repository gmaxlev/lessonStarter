import Component from "../Component";
import TeamComponent from "../teamComponent";
import Element from "../Element";
import Button from "../Button";

export default class TableComponent extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(properties) {
    super(properties);
  }
  render() {
    if (this.props.teams === null) {
      return new Element("div", { class: "loading" }, [], "Loading");
    }
    const tableHeadCells = this.props.allDays.map((item) => {
      return new Element("td", { class: item.isDayOff ? "calendarTable__dayOff" : "" }, [
        new Element("span", {}, [], `${item.dayName}`),
        new Element("span", {}, [], `${item.date}`),
      ]);
    });

    const teamsGroups = [];

    this.props.teams.teams.forEach((teamGroup) => {
      teamsGroups.push(new Element(TeamComponent, { teamGroup, allDays: this.props.allDays, date: this.props.date }));
    });

    return new Element("table", { class: "calendarTable" }, [
      new Element("thead", {}, [
        new Element("tr", {}, [
          new Element("td", { class: "calendarTable__addVocation" }, [new Element(Button, { text: "Add Vacation" })]),
          ...tableHeadCells,
        ]),
      ]),
      ...teamsGroups,
    ]);
  }
}
