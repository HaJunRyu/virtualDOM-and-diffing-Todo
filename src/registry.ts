import { TodoState, Component, Events } from './typing';

const registry = {};

const renderWrapper = (component: Component) => {
  return (targetElement: Element, state: TodoState, events: Events) => {
    const element = component(targetElement, state, events);

    const childComponents: NodeListOf<HTMLElement> = element.querySelectorAll('[data-component]');

    Array.from(childComponents).forEach(target => {
      const name = target.dataset.component;

      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target, state, events));
    });

    return element;
  };
};

const add = (name: string, component: Component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root: Element, state: TodoState, events: Events) => {
  const cloneComponent = (root: Element) => {
    return root.cloneNode(true) as Element;
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export default {
  add,
  renderRoot
};
