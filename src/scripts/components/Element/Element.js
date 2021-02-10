export default class Element {
  constructor(type = "div", attrs = {}, children = [], innerText = "", events = {}) {
    this.type = type;
    this.attrs = attrs;
    this.children = children;
    this.innerText = innerText;
    this.events = events;
    this.component = null;
  }
  render() {
    if (typeof this.type === "function") {
      return this;
    }
    const element = document.createElement(this.type);
    Object.entries(this.attrs).forEach(([key, value]) => {
      if (typeof value === "function" || (typeof value === "string" && value.trim() !== "")) {
        element.setAttribute(key, typeof value === "string" ? value.trim() : value);
      }
    });
    Object.entries(this.events).forEach(([key, value]) => {
      element.addEventListener(key, value);
    });
    if (this.innerText !== undefined) {
      element.innerText = this.innerText;
    }
    return element;
  }
}
