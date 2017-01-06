'use strict';

var mongoose = require("mongoose");

module.exports = mongoose.model("TodoItem", {
    title: String,
    completed: {
        type: Boolean,
        default: false
    }
});
