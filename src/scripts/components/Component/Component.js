export default class Component {
  constructor(props) {
    this.props = props;
    this.index = null;
  }
  setParentSelector(parentSelector) {
    this.parentSelector = parentSelector;
  }
  setPositionElementInParent(index) {
    this.index = index;
  }
  mount() {
    if (this.index === null) {
      this.parentSelector.innerHTML = "";
      this.parentSelector.append(this.render().render());
    } else {
      const el = this.parentSelector.children[this.index];
      this.parentSelector.replaceChild(this.render().render(), el);
    }
  }
}
