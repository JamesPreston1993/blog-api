var CommentSchema = require('./../src/comment.schema');
var assert = require('chai').assert;
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment', CommentSchema);

describe('comment schema', function () {
    describe('validators', function () {
        describe('required', function () {
            it('error if content not set', function () {
                var comment = new Comment({
                    creator: '59e4b174dd43050d9418bfde'
                });

                var error = comment.validateSync();

                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Comment validation failed: content: Path `content` is required.');
            });

            it('error if creator not set', function () {
                var comment = new Comment({
                    content: 'A nice comment!'
                });

                var error = comment.validateSync();

                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Comment validation failed: creator: Path `creator` is required.');
            });
        });
        describe('notEmpty', function () {
            it('error if content is empty', function () {
                var comment = new Comment({
                    content: '   ',
                    creator: '59e4b174dd43050d9418bfde'
                });

                var error = comment.validateSync();

                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Comment validation failed: content: Cannot be empty.');
            });
        });
    });
});