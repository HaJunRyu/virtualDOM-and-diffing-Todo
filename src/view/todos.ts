import { Events, Todo, TodoState } from '../typing';

let template: HTMLTemplateElement;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item') as HTMLTemplateElement;
  }

  return template.content.firstElementChild.cloneNode(true) as Element;
};

const getTodoElement = (todo: Todo, index: number) => {
  const { text, completed } = todo;

  const element = createNewTodoNode();

  const inputEdit = element.querySelector('input.edit') as HTMLInputElement;
  inputEdit.value = text;

  element.querySelector('label').textContent = text;

  if (completed) {
    element.classList.add('completed');
    const inputToggle = element.querySelector('input.toggle') as HTMLInputElement;
    inputToggle.checked = true;
  }

  const destroyButton = element.querySelector('button.destroy') as HTMLButtonElement;
  destroyButton.dataset.index = index.toString();

  return element;
};

export default (targetElement: Element, state: TodoState, events: Events) => {
  const { todos } = state;
  const { deleteItem } = events;
  const newTodoList = targetElement.cloneNode(true) as Element;

  newTodoList.innerHTML = '';

  todos
    .map((todo, index) => getTodoElement(todo, index))
    .forEach(element => {
      newTodoList.appendChild(element);
    });

  newTodoList.addEventListener('click', ({ target }) => {
    const el = target as HTMLElement;
    if (el.matches('button.destroy')) {
      deleteItem(el.dataset.index);
    }
  });

  return newTodoList;
};
