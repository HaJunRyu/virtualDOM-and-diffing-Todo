import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import './css/style.css';
import todosView from './view/todos';
import counterView from './view/counter';
import filtersView from './view/filter';
import appView from './view/';
import applyDiff from './applyDiff';

import registry from './registry';
import getState from './state';

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = getState();

const events = {
  deleteItem: (index: number) => {
    state.todos.splice(index, 1);
    render();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false
    });
    render();
  }
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');

    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

render();
