var TodoItem = require("../models/todoItem");

module.exports = function() {
    TodoItem.count().exec((err, count) => {
        if (count > 0) {
            return;
        }
        const item1 = new TodoItem({
            title: 'First Item',
            completed: false
        });
        const item2 = new TodoItem({
            title: 'Second Item',
            completed: true
        });

        TodoItem.create([item1, item2], (error) => {
            if (!error) {
                console.log("initial todo items seeded!");
            }
        });
    });
}
