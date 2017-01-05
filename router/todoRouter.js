'use strict';

var router = require('express').Router(),
    todoCtrl = require("../handler/todoController");

router.get('/', todoCtrl.load);
router.put('/:title', todoCtrl.update)
router.post('/', todoCtrl.create);
router.delete('/:id', todoCtrl.remove);

module.exports = router;
