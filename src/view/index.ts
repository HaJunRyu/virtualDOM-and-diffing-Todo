import { Events, TodoState } from '../typing';

let template: HTMLTemplateElement;

const getTemplate = () => {
  if (!template) {
    template = document.getElementById('todo-app') as HTMLTemplateElement;
  }

  return template.content.firstElementChild.cloneNode(true) as Element;
};

const addEvents = (targetElement: Element, events: Events) => {
  targetElement.querySelector('.new-todo').addEventListener('keypress', e => {
    const event = e as KeyboardEvent;
    const { target } = event;
    const inputElement = target as HTMLInputElement;
    if (event.key === 'Enter') {
      events.addItem(inputElement.value);
      inputElement.value = '';
    }
  });
};

export default (targetElement: Element, state: TodoState, events: Events) => {
  const newApp = targetElement.cloneNode(true) as Element;

  newApp.innerHTML = '';
  newApp.appendChild(getTemplate());

  addEvents(newApp, events);

  return newApp;
};
