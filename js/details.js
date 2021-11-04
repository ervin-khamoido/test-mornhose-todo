const todoDetailsContainer = document.querySelector('.todo-details-container');

const todoId = localStorage.getItem('lastOpenedTodo');

if (todoId) {
   getTodo(todoId);
} else {
   const item = `
      <h1 class="title error">Error!</h1>
      <a class="todo-element__button" href="/">Back</a>
   `;
   todoDetailsContainer.insertAdjacentHTML('beforeend', item);
}

async function getTodo(id) {
   const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => res.json());

   renderTodo(response, todoDetailsContainer);
}

function renderTodo(todo, selector) {
   const item = `
      <div class="todo-element">
         <h1 class="title">#${todo.id} todo detail</h1>
         <div class="todo-element__info">
            <p class="todo-element__title title">${todo.title}</p>

            <a class="todo-element__button" href="/">Back</a>
         </div>
      </div>
   `;

   selector.insertAdjacentHTML('beforeend', item);
}