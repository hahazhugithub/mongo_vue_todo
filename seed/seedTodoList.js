var TodoItem = require("../models/todoItem");

module.exports = function() {
    TodoItem.count().exec((err, count) => {
        if (count > 0) {
            return;
        }
        const item1 = new TodoItem({
            title: 'First',
            content: 'todo item #1',
            isDone: false
        });
        const item2 = new TodoItem({
            title: 'Second',
            content: 'todo item #2',
            isDone: true
        });

        TodoItem.create([item1, item2], (error) => {
            if (!error) {
                console.log("initial todo items seeded!");
            }
        });
    });
}
