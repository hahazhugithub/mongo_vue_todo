var todoRepository = {
    loadAll: function() {
        return axios.get("/api/todo/all");
    },

    createTodoItem: function(todoItem) {
        return axios.post('/api/todo', todoItem);
    },

    updateTodoItem: function(todoItem) {
        return axios.put('/api/todo/' + todoItem._id, todoItem);
    },

    deleteTodoItem: function(todoItem) {
        return axios.delete('/api/todo/' + todoItem._id);
    },
};

var filters = {
    all: function(todos) {
        return todos;
    },
    active: function(todos) {
        return todos.filter(function(todo) {
            return !todo.completed
        });
    },
    completed: function(todos) {
        return todos.filter(function(todo) {
            return todo.completed
        });
    }
};
