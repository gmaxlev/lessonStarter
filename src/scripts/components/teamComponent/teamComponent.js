import Component from "../Component";
import Element from "../Element";
import teamIcon from "../../../images/team.svg";
import toggleIcon from "../../../images/toggle.svg";

export default class TeamComponent extends Component {
  constructor(properties) {
    super(properties);
    this.isOpen = true;
  }
  static checkVacationsDate(vacations, date) {
    let result = false;
    vacations.forEach((item) => {
      const startDateNumbers = item.startDate.split(".");
      const startDate = `${startDateNumbers[2]}/${startDateNumbers[1]}/${startDateNumbers[0]}`;
      const endDateNumbers = item.endDate.split(".");
      const endDate = `${endDateNumbers[2]}/${endDateNumbers[1]}/${endDateNumbers[0]}`;
      if (date >= new Date(startDate) && date <= new Date(endDate)) {
        result = true;
      }
    });
    return result;
  }
  memberRow(vacations) {
    return this.props.allDays.map((item) => {
      return new Element("td", {
        class: `${item.isDayOff ? "calendarTable__dayOff" : ""} ${
          TeamComponent.checkVacationsDate(vacations, item.fullDate) ? "calendarTable__vacations" : ""
        }`,
      });
    });
  }
  render() {
    const daysCells = this.props.allDays.map((item) => {
      return new Element("td", { class: item.isDayOff ? "calendarTable__dayOff" : "" });
    });
    const tableRows = [];
    tableRows.push(
      new Element("tr", { class: "calendarTable__team-header" }, [
        new Element("td", {}, [
          new Element("div", { class: "calendarTable__team-title" }, [
            new Element("span", { class: "calendarTable__team-name" }, [], this.props.teamGroup.name),
            new Element("span", { class: "calendarTable__team-count" }, [
              new Element("img", { src: teamIcon }, []),
              new Element("span", {}, [], this.props.teamGroup.members.length),
            ]),
            new Element(
              "span",
              { class: "calendarTable__percentage" },
              [],
              `${this.props.teamGroup.percentageOfAbsent[this.props.date.getMonth()]}%`,
            ),
            new Element(
              "button",
              {
                class: `calendarTable__team-toogle ${this.isOpen ? "calendarTable__team-toogle_open" : ""}`,
              },
              [
                new Element("img", {
                  src: toggleIcon,
                }),
              ],
              "",
              {
                click: () => {
                  this.isOpen = !this.isOpen;
                  this.update();
                },
              },
            ),
          ]),
        ]),
        ...daysCells,
      ]),
    );
    if (this.isOpen) {
      this.props.teamGroup.members.forEach((member) =>
        tableRows.push(
          new Element("tr", {}, [
            new Element("td", {}, [new Element("div", { class: "calendarTable__team-title" }, [], member.name)]),
            ...this.memberRow(member.vacations),
          ]),
        ),
      );
    }
    return new Element("tbody", {}, tableRows);
  }
}
