import { Todo, TodoState } from '../typing';

const getTodoCount = (todos: Todo[]) => {
  const notCompleted = todos.filter(todo => !todo.completed);

  const { length } = notCompleted;

  return `${length} Items left`;
};

export default (targetElement: Element, { todos }: TodoState) => {
  const newCounter = targetElement.cloneNode(true) as Element;
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};
