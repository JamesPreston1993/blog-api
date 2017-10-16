var router = require('express').Router();
var controller = require('../../src').controller;

router.get('/', controller.viewMany);

router.get('/:id', controller.view);

router.post('/', controller.create);

router.patch('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;