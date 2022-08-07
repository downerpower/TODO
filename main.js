window.addEventListener('load', () => {
   todos = JSON.parse(localStorage.getItem('todos')) || [];
   const nameInput = document.querySelector('#name');
   const newTodoForm = document.querySelector('#new-todo-form');
   const dateInput  = document.querySelector('#date');

   const username = localStorage.getItem('username') || '';
   const currentDate = localStorage.getItem('currentDate') || '';

   nameInput.value = username;
   dateInput.value = currentDate

   nameInput.addEventListener('change', evt => {
      localStorage.setItem('username', evt.target.value);
   })

   dateInput.addEventListener('change', evt => {
      localStorage.setItem('currentDate', evt.target.value);
   })

   newTodoForm.addEventListener('submit', evt => {
      evt.preventDefault();

      const todo = {
         content: evt.target.elements.content.value,
         category: evt.target.elements.category.value,
         done: false,
         createAt: new Date().getTime()
      }

      todos.push(todo);

      localStorage.setItem('todos', JSON.stringify(todos));

      evt.target.reset();

      displayTodos();
   }) 

   displayTodos();
})

function displayTodos () {
   const todoList = document.querySelector('#todo-list');

   todoList.innerHTML = '';

   todos.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');

      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');
      const content = document.createElement('div');
      const actions = document.createElement('div');
      const editButton = document.createElement('button');
      const deleteButton = document.createElement('button');

      input.type = 'checkbox';
      input.checked = todo.done;
      span.classList.add('bubble');

      switch (todo.category) {
         case 'reading': 
           span.classList.add('reading');
           break;
         case 'listening':
           span.classList.add('listening');
            break;
         case 'writing': 
           span.classList.add('writing');
            break;
         case 'speaking': 
           span.classList.add('speaking');
      }

      content.classList.add('todo-content');
      actions.classList.add('actions');
      editButton.classList.add('edit');
      deleteButton.classList.add('delete');

      content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
      editButton.innerHTML = 'edit';
      deleteButton.innerHTML = 'delete';

      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);

      todoList.appendChild(todoItem);

      if (todo.done) {
         todoItem.classList.add('done');
      }

      input.addEventListener('click', evt => {
         todo.done = evt.target.checked;
         localStorage.setItem('todos', JSON.stringify(todos));

         if (todo.done) {
             todoItem.classList.add('done');
         } else {
            todoItem.classList.remove('done');
         }

         displayTodos(); 
      })

      editButton.addEventListener('click', evt => {
         const input = content.querySelector('input');
         input.removeAttribute('readonly');
         input.focus();
         input.addEventListener('blur', evt => {
            input.setAttribute('readonly', true);
            todo.content = evt.target.value;
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
         })
      })

      deleteButton.addEventListener('click', evt => {
         todos = todos.filter(td => td != todo);
         localStorage.setItem('todos', JSON.stringify(todos));
         displayTodos();
      })
   })
}