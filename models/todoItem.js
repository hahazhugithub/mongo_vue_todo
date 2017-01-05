'use strict';

var mongoose = require("mongoose");

module.exports = mongoose.model("TodoItem", {
    title: String,
    content: String,
    isDone: {
        type: Boolean,
        default: false
    }
});
