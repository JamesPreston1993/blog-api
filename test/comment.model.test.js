var Comment = require('./../src/comment.model').model;
var assert = require('chai').assert;

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
    describe('instance methods', function () {
        describe('markAsUpdated', function () {
            it('populates lastUpdatedOn', function () {
                var currentDate = new Date(new Date().getTime() - 10);
                var comment = new Comment({
                    content: 'My comment',
                    creator: '59e4b174dd43050d9418bfde'
                });

                comment.markAsUpdated();

                assert.notTypeOf(comment.lastUpdatedOn, 'undefined');
                assert.isAbove(comment.lastUpdatedOn.getTime(),
                    currentDate.getTime());
            });
        });
        describe('updateContent', function () {
            it('sets content', function () {
                var comment = new Comment({
                    content: 'My comment',
                    creator: '59e4b174dd43050d9418bfde'
                });

                comment.updateContent('My updated comment');

                assert.equal(comment.content, 'My updated comment');
            });
        });
        describe('reply', function () {
            it('adds comment to replies array', function () {
                var comment = new Comment({
                    content: 'My comment',
                    creator: '59e4b174dd43050d9418bfde'
                });

                var reply = new Comment({
                    content: 'My reply',
                    creator: '59e4b174dd43050d9418bfde'
                });
                
                comment.reply(reply);

                assert.equal(comment.replies.length, 1);
            });
        });
    });
});