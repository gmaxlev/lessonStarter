export default class Element {
  constructor(type = "div", attributes = {}, children = [], innerText = "", events = {}) {
    this.type = type;
    this.attrs = attributes;
    this.children = children;
    this.textContent = innerText;
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
    if (this.textContent !== undefined) {
      element.textContent = this.textContent;
    }
    return element;
  }
}
