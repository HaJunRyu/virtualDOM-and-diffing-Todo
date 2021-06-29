import { TodoState } from '../typing';

export default (targetElement: Element, { currentFilter }: TodoState) => {
  const newCounter = targetElement.cloneNode(true) as Element;
  Array.from(newCounter.querySelectorAll('li a')).forEach(a => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });
  return newCounter;
};
