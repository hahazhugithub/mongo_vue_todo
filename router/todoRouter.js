'use strict';

var router = require('express').Router(),
    todoCtrl = require("../handler/todoController");

router.get('/all', todoCtrl.load);
router.put('/:id', todoCtrl.update)
router.post('/', todoCtrl.create);
router.delete('/:id', todoCtrl.remove);

module.exports = router;
