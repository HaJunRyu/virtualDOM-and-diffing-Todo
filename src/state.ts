import { TodoState } from './typing';

const INITIAL_STATE: TodoState = {
  todos: [],
  currentFilter: 'All'
};

const getState = (state = INITIAL_STATE) => {
  return state;
};

export default getState;
