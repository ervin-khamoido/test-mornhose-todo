const todoList = document.querySelector('.todo-list');

let todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
   renderTodos(todos, todoList);
} else {
   getTodos();
}


(function() {
   todoList.addEventListener('click', event => {
      const target = event.target;

      if (target.classList.contains('todo-list__remove-button')) {
         const parent = target.parentNode;

         if (parent.classList.contains('todo-list__item')) {
            const todoId = parent.getAttribute('data-todo-id');
            const oldTodoList = JSON.parse(localStorage.getItem('todos'));
            const newTodoList = oldTodoList.filter(todo => todo.id !== +todoId);

            localStorage.setItem('todos', JSON.stringify(newTodoList));
            target.parentNode.remove();
         }
      }

      if (target.classList.contains('todo-list__link')) {
         const todoId = target.getAttribute('data-todo-id');
         localStorage.setItem('lastOpenedTodo', todoId);
      }
   });
})();

async function getTodos() {
   const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => res.json());

   localStorage.setItem('todos', JSON.stringify(response));
   todos = JSON.parse(localStorage.getItem('todos'));

   renderTodos(response, todoList);
}

function renderTodos(arr, selector) {
   arr.forEach(todo => {
      const item = `
         <li class="todo-list__item" data-todo-id="${todo.id}">
            <div class="todo-list__text">
               <h2 class="todo-list__title">
                  ${todo.title.length >= 30 ? `${todo.title.slice(0, 30).trim()}...` : todo.title}
               </h2>

               <div class="todo-list__info">
                  <div class="todo-list__id">#${todo.id}</div>
                  <a href="/pages/details.html" data-todo-id="${todo.id}" class="todo-list__link">View</a>
               </div>
            </div>

            <button class="todo-list__remove-button">&times;</button>
         </li>
      `;

      selector.insertAdjacentHTML('beforeend', item);
   });
}