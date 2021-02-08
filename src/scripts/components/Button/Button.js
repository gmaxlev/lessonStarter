import plusIcon from "../../../images/plus.svg";
import Component from "../Component";
import Element from "../Element";

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return new Element("button", { class: "button button_a" }, [
      new Element("img", {
        src: plusIcon,
      }),
      new Element("span", {}, [], this.props.text),
    ]);
  }
}
