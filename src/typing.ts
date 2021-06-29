export interface Todo {
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  currentFilter: 'All' | 'Completed' | 'Active';
}

export interface Events {
  [name: string]: Function;
}

export interface Component {
  (root: Element, state: TodoState, events: Events): Element;
}
