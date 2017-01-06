// app Vue instance
var app = new Vue({
    // app initial state
    data: {
        todos: [],
        newTodo: '',
        editedTodo: null,
        visibility: 'all'
    },

    // watch todos change for localStorage persistence
    watch: {
        todos: {
            handler: function(todos) {},
            deep: true
        }
    },

    created: function() {
        var self = this;
        todoRepository.loadAll().then(function(response) {
            self.todos = response.data;
        });
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
        filteredTodos: function() {
            return this.todos.length === 0 ? [] :
                filters[this.visibility](this.todos);
        },
        remaining: function() {
            return this.todos.length === 0 ? 0 :
                filters.active(this.todos).length
        },
        allDone: {
            get: function() {
                return this.remaining === 0
            },
            set: function(value) {
                this.todos.forEach(function(todo) {
                    todo.completed = value
                })
            }
        }
    },

    filters: {
        pluralize: function(n) {
            return n === 1 ? 'item' : 'items';
        }
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
        addTodo: function() {
            var _this = this,
                value = _this.newTodo && _this.newTodo.trim();

            if (!value) {
                return;
            }

            todoRepository.createTodoItem({
                title: value,
                completed: false
            }).then(function(result) {
                _this.todos.push(result.data);
            });
            _this.newTodo = '';
        },

        removeTodo: function(todo) {
            var _this = this;

            todoRepository.deleteTodoItem(todo).then(function() {
                _this.todos.splice(_this.todos.indexOf(todo), 1);
            });
        },

        editTodo: function(todo) {
            this.beforeEditCache = todo.title;
            this.editedTodo = todo;
        },

        doneEdit: function(todo) {
            var _this = this;

            if (!_this.editedTodo) {
                return;
            }

            todoRepository.updateTodoItem(todo).then(function() {
                _this.editedTodo = null;
                todo.title = todo.title.trim();
                if (!todo.title) {
                    _this.removeTodo(todo);
                };
            });
        },

        cancelEdit: function(todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        },

        removeCompleted: function() {
            //This is not going to BE for now
            this.todos = filters.active(this.todos);
        },

        updateCompleted: function(todo) {
            todo.completed = !todo.completed;
            todoRepository.updateTodoItem(todo).then(function() {
                console.log("completed status changed for", todo._id);
            });
        }
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        'todo-focus': function(el, value) {
            if (value) {
                el.focus();
            }
        }
    }
})

$(document).ready(function() {
    // handle routing
    function onHashChange() {
        var visibility = window.location.hash.replace(/#\/?/, '')
        if (filters[visibility]) {
            app.visibility = visibility
        } else {
            window.location.hash = ''
            app.visibility = 'all'
        }
    }

    window.addEventListener('hashchange', onHashChange);
    onHashChange();

    // mount
    app.$mount('.todoapp');
});
