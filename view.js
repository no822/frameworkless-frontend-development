// frameworkless frontene development
// chapter1 ~ chapter2

// todo: { text: string; completed: boolean };
const getTodoElement = todo => {
  const {text, completed} = todo;

  return `
     <li ${completed ? 'class="completed"' : ''}>
        <div class="view">
            <input 
                ${completed ? 'checked' : ''}
                class="toggle"
                type="checkbox" 
            >
            <label>${text}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}">
     </li> 
  `
};

const getTodoCount = todos => {
  const notCompleted = todos.filter(todo => !todo.completed);

  const {length} = notCompleted;

  if (length === 1) {
    return `1 item left`;
  }

  return `${length} Items left`;
}

// state: {todos: Array<todo>, currentFilter: string}
export default (targetElement, state) => {
  const {todos, currentFilter} = state;

  const element = targetElement.cloneNode(true);
  const list = element.querySelector('.todo-list');
  const counter = element.querySelector('.todo-count');
  const filters = element.querySelector('.filters');

  list.innerHTML = todos.map(getTodoElement).join("");
  counter.textContent = getTodoCount(todos);

  Array.from(filters.querySelectorAll('li a')).forEach(a => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected');
    }
  });

  return element;
}
