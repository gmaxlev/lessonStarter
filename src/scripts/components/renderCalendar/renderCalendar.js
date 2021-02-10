import teamIcon from "../../../images/team.svg";
import toggleIcon from "../../../images/toggle.svg";
import Component from "../Component";
import Element from "../Element";
import Button from "../Button";

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.teams === null) {
      return new Element("div", { class: "loading" }, [], "Loading");
    }
    const tableHeadCells = this.props.allDays.map((item) => {
      return new Element("td", { class: item.isDayOff ? "calendarTable__dayOff" : "" }, [
        new Element("span", {}, [], `${item.dayName.substr(0, 2)}`),
        new Element("span", {}, [], `${item.date}`),
      ]);
    });

    const teamsGroups = [];

    this.props.teams.teams.forEach((teamGroup) => {
      teamsGroups.push(new TeamComponent({ teamGroup: teamGroup, allDays: this.props.allDays, date: this.props.date }));
    });

    return new Element("table", { class: "calendarTable" }, [
      new Element("thead", {}, [
        new Element("tr", {}, [
          new Element("td", { class: "calendarTable__addVocation" }, [new Button({ text: "Add Vacation" })]),
          ...tableHeadCells,
        ]),
      ]),
      ...teamsGroups,
    ]);
  }
}

class TeamComponent extends Component {
  constructor(props) {
    super(props);
    this.isOpen = true;
  }
  vacationsDays(vacation, date) {
    let result = false;
    vacation.forEach((item) => {
      let startDate = item.startDate.split(".");
      let newStartDate = [startDate[2],`${ +startDate[1] -1 }`,  startDate[0]];
      let endDate = item.endDate.split(".");
      let newEndDate = [endDate[2],`${ +endDate[1] -1 }`,  endDate[0]];
      if (new Date(...newStartDate) <= date && new Date(...newEndDate) >= date)  {
        result = true;
      }
    });
    console.log(result);
    return result;
  }
  membersDaysCells(vacation) {
    return this.props.allDays.map((item) => {
      return new Element("td", { class: `${item.isDayOff ? "calendarTable__dayOff" : ""} ${this.vacationsDays(vacation.vacations, item.fullDate) ? "calendarTable__vacations" : ""}`});
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
                  this.mount();
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
            ...this.membersDaysCells(member),
          ]),
        ),
      );
    }
    return new Element("tbody", {}, tableRows);
  }
}
