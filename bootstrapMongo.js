"use strict";

module.exports = () => {
    var mongoose = require('mongoose');
    var db = mongoose.connection;
    var seed = require("./seed/seedTodoList");

    mongoose.connect(require("./config").mongo_address());

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("connected....");
        seed();
    });
}
