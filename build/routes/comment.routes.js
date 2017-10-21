var router = require('express').Router();
var controller = require('../../src').comment.controller;

router.get('/:blogId/comment', controller.viewMany);

router.get('/:blogId/comment/:commentId', controller.view);

router.post('/:blogId/comment', controller.create);

router.patch('/:blogId/comment/:commentId', controller.update);

router.delete('/:blogId/comment/:commentId', controller.delete);

module.exports = router;