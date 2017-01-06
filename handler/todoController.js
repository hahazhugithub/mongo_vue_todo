'use strict';

var TodoItem = require("../models/todoItem");

module.exports = {
    load: function(req, res) {
        TodoItem.find({}, function(err, result) {
            res.json(result);
        })
    },

    create: function(req, res) {
        var item = new TodoItem(req.body);
        item.save(function(err, result) {
            res.json(result);
        });
    },

    update: function(req, res) {
        TodoItem.findById(req.params.id, function(err, result) {
            console.log("req.body", req.body);
            result.title = req.body.title;
            result.completed = req.body.completed;

            result.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.status(204).send();
            });
        })
    },

    remove: function(req, res) {
        TodoItem.findById(req.params.id, function(err, result) {
            result.remove(function(err) {
                if (err) {
                    res.send(err);
                }
                res.status(204).send();
            })
        })
    }
};
