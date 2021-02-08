import Component from "../Component/Component";
export default class Element {
  constructor(tagName = "div", attrs = {}, children = [], innerText, events = {}) {
    this.tagName = tagName;
    this.attrs = attrs;
    this.children = children;
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
    this.children.forEach((child, index) => {
      if (child instanceof Element) {
        element.appendChild(child.render());
      } else if (child instanceof Component) {
        child.setParentSelector(element);
        child.setPositionElementInParent(index);
        element.appendChild(child.render().render());
      }
    });
    return element;
  }
}
