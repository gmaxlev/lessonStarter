  
import Component from "../Component";
import Element from "../Element";

export default class NavigationComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return new Element("div", { class: "calendarBar" }, [
      new Element("button", { class: "calendarBar__nav calendarBar__nav_prev" }, [], "", {
        click: this.props.prev,
      }),
      new Element(
        "span",
        { class: "calendarBar__current" },
        [],
        `${this.props.date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
      ),
      new Element("button", { class: "calendarBar__nav calendarBar__nav_next" }, [], "", {
        click: this.props.next,
      }),
    ]);
  }
}