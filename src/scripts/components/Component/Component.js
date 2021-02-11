export default class Component {
  constructor(properties) {
    this.props = properties;
    this.virtualDom = null;
    this.parentSelector = null;
    this.positionElementInParen = 0;
  }
  setParentSelector(parent) {
    this.parentSelector = parent;
  }

  setPositionElementInParent(index) {
    this.positionElementInParen = index;
  }
  // eslint-disable-next-line consistent-return
  rerender(rootElement, currentNode, nextNode, index = 0) {
    if (!nextNode) {
      return index >= rootElement.children.length
        ? rootElement.lastChild.remove()
        : rootElement.childNodes[index].remove();
    }

    if (!currentNode) {
      if (typeof nextNode.type === "string") {
        if (rootElement.childNodes[index]) {
          rootElement.replaceChild(nextNode.render(), rootElement.childNodes[index]);
        } else {
          rootElement.append(nextNode.render());
        }
      } else {
        // eslint-disable-next-line new-cap
        const component = new nextNode.type(nextNode.attrs);
        // eslint-disable-next-line no-param-reassign
        nextNode.component = component;
        component.setParentSelector(rootElement);
        component.setPositionElementInParent(rootElement.children.length);
        component.update();
      }
      for (let indexChild = 0; indexChild < nextNode.children.length; indexChild++) {
        this.rerender(rootElement.childNodes[index], null, nextNode.children[indexChild], indexChild);
      }
      // eslint-disable-next-line consistent-return
      return;
    }

    if (Component.changed(currentNode, nextNode)) {
      if (typeof nextNode.type === "string") {
        const replace = nextNode.render();
        rootElement.replaceChild(replace, rootElement.childNodes[index]);

        for (let indexChild = 0; indexChild < nextNode.children.length; indexChild++) {
          this.rerender(rootElement.childNodes[index], null, nextNode.children[indexChild], indexChild);
        }
      } else if (typeof nextNode.type === "function") {
        // eslint-disable-next-line new-cap
        const component = new nextNode.type(nextNode.attrs);
        component.setParentSelector(rootElement);
        component.setPositionElementInParent(index);
        component.update();
      }
    } else {
      if (typeof currentNode.type === "string" && typeof nextNode.type === "string") {
        if (currentNode.textContent !== nextNode.textContent) {
          // eslint-disable-next-line no-param-reassign
          rootElement.childNodes[index].textContent = nextNode.textContent;
        }
        const mergedProperties = { ...currentNode.attrs, ...nextNode.attrs };
        Object.keys(mergedProperties).forEach((key) => {
          if (currentNode.attrs[key] !== nextNode.attrs[key]) {
            if (nextNode.attrs[key] == null || nextNode.attrs[key] === false || nextNode.attrs[key].trim() === "") {
              rootElement.childNodes[index].removeAttribute(key);
            } else {
              rootElement.childNodes[index].setAttribute(key, nextNode.attrs[key]);
            }
          }
        });
      } else if (typeof currentNode.type === "function" && typeof nextNode.type === "function") {
        // eslint-disable-next-line no-param-reassign
        nextNode.component = currentNode.component;
        const mergedProperties = { ...currentNode.attrs, ...nextNode.attrs };
        let status = false;
        Object.keys(mergedProperties).forEach((key) => {
          if (currentNode.attrs[key] !== nextNode.attrs[key]) {
            status = true;
          }
        });
        if (status) {
          currentNode.component.update(mergedProperties);
        }
      }
      for (
        let indexChild = 0;
        indexChild < Math.max(currentNode.children.length, nextNode.children.length);
        indexChild++
      ) {
        this.rerender(
          rootElement.childNodes[index],
          currentNode.children[indexChild],
          nextNode.children[indexChild],
          indexChild,
        );
      }
    }
  }
  // eslint-disable-next-line consistent-return
  static changed(nodeA, nodeB) {
    if (nodeA.type !== nodeB.type) {
      return true;
    }
  }
  update(newProperties) {
    if (newProperties) {
      this.props = newProperties;
    }
    const virtualDom = this.render();
    this.rerender(this.parentSelector, this.virtualDom, virtualDom, this.positionElementInParen);
    this.virtualDom = virtualDom;
  }
}
