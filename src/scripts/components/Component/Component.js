import Element from "../Element";
export default class Component {
  constructor(props) {
    this.props = props;
    this.__VDOM = null;
    this.__parentSelector = null;
    this.__positionElementInParen = 0;
  }
  setParentSelector(parent) {
    this.__parentSelector = parent;
  }
  setPositionElementInParent(index) {
    this.__positionElementInParen = index;
  }
  rerender(rootElement, currNode, nextNode, index = 0) {
    debugger;
    if (!nextNode) {
      if (index >= rootElement.children.length) {
        return rootElement.removeChild(rootElement.lastChild);
      } else {
        return rootElement.removeChild(rootElement.childNodes[index]);
      }
    }

    if (!currNode) {
      if (typeof nextNode.type === "string") {
        rootElement.appendChild(nextNode.render());
      } else {
        const component = new nextNode.type(nextNode.attrs);
        nextNode.component = component;
        component.setParentSelector(rootElement);
        component.setPositionElementInParent(rootElement.children.length);
        component.update();
      }
      for (let i = 0; i < nextNode.children.length; i++) {
        this.rerender(rootElement.childNodes[index], null, nextNode.children[i], i);
      }
      return;
    }

    if (this.changed(currNode, nextNode)) {
      if (typeof nextNode.type === "string") {
        const replace = nextNode.render();
        rootElement.replaceChild(replace, rootElement.childNodes[index]);

        for (let i = 0; i < nextNode.children.length; i++) {
          this.rerender(rootElement.childNodes[index], null, nextNode.children[i], i);
        }
      } else if (typeof nextNode.type === "function") {
        const component = new nextNode.type(nextNode.attrs);
        component.setParentSelector(rootElement.childNodes[index]);
        component.update();
      }
    } else {
      if (typeof currNode.type === "string" && typeof nextNode.type === "string") {
        if (currNode.innerText !== nextNode.innerText) {
          rootElement.childNodes[index].innerText = nextNode.innerText;
        }
        const mergedProps = { ...currNode.attrs, ...nextNode.attrs };
        Object.keys(mergedProps).forEach((key) => {
          if (currNode.attrs[key] !== nextNode.attrs[key]) {
            if (nextNode.attrs[key] == null || nextNode.attrs[key] === false || nextNode.attrs[key].trim() === "") {
              rootElement.childNodes[index].removeAttribute(key);
            } else {
              rootElement.childNodes[index].setAttribute(key, nextNode.attrs[key]);
            }
          }
        });
      } else if (typeof currNode.type === "function" && typeof nextNode.type === "function") {
        nextNode.component = currNode.component;
        const mergedProps = { ...currNode.attrs, ...nextNode.attrs };
        let status = false;
        Object.keys(mergedProps).forEach((key) => {
          if (currNode.attrs[key] !== nextNode.attrs[key]) {
            status = true;
          }
        });
        if (status) {
          currNode.component.update(mergedProps);
        }
      }
      for (let i = 0; i < Math.max(currNode.children.length, nextNode.children.length); i++) {
        this.rerender(rootElement.childNodes[index], currNode.children[i], nextNode.children[i], i);
      }
    }
  }
  changed(nodeA, nodeB) {
    if (nodeA.type !== nodeB.type) {
      return true;
    }
  }
  update(newProps) {
    if (newProps) {
      this.props = newProps;
    }
    const __VDOM = this.render();
    this.rerender(this.__parentSelector, this.__VDOM, __VDOM, this.__positionElementInParen);
    this.__VDOM = __VDOM;
  }
}
