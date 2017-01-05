'use strict';

var TodoItem = require("../models/todoItem");

module.exports = {

    create: function(req, res) {
        console.log("req.body", req.body);
        var item = new TodoItem(req.body);
        item.save(function(err, result) {
            res.json(result);
        });
    },

    update: function(req, res) {
        TodoItem.findById({
            "title": req.params.title
        }, function(err, result) {
            console.log("req.body", req.body);
            res.status(204).send();
            /*result.remove(function(err) {
                if (err) {
                    res.send(err);
                }
                res.status(204).send();
            })*/
        })
    },

    load: function(req, res) {
        TodoItem.find({}, function(err, result) {
            res.json(result);
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
