var Blog = require('./../src/blog.model');
var assert = require('chai').assert;

describe('blog model', function () {
    describe('instance methods', function () {
        describe('markAsUpdated', function () {
            it('populates lastUpdatedOn', function () {
                var currentDate = new Date(new Date().getTime() - 10);
                var blog = new Blog({
                    title: 'My Blog',
                    content: 'My blog contents',
                    creator: 'username1'
                });

                blog.markAsUpdated();

                assert.notTypeOf(blog.lastUpdatedOn, 'undefined');
                assert.isAbove(blog.lastUpdatedOn.getTime(),
                currentDate.getTime()
            );
            });
        });
    });
    
    describe('validators', function () {
        it('no error when all properties are valid', function () {
            var blog = new Blog({
                title: 'My Blog',
                content: 'My blog contents',
                creator: 'username1'
            });

            var error = blog.validateSync();

            assert.typeOf(error, 'undefined');
        });

        describe('required', function () {
            it('error if title not set', function () {
                var blog = new Blog({
                    content: 'My blog contents',
                    creator: 'username1'
                });

                var error = blog.validateSync();

                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Blog validation failed: title: Path `title` is required.');
            });

            it('error if content not set', function () {
                var blog = new Blog({
                    title: 'My Blog',
                    creator: 'username1'
                });

                var error = blog.validateSync();

                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Blog validation failed: content: Path `content` is required.');
            });

            it('error if creator not set', function () {
                var blog = new Blog({
                    title: 'My Blog',
                    content: 'My blog contents'
                });

                var error = blog.validateSync();

                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Blog validation failed: creator: Path `creator` is required.');
            });
        });

        describe('notEmpty', function () {
            it('error if title is empty', function () {
                var blog = new Blog({
                    title: '   ',
                    content: 'My blog contents',
                    creator: 'username1'
                });

                var error = blog.validateSync();

                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Blog validation failed: title: Cannot be empty.');
            });

            it('error if content is empty', function () {
                var blog = new Blog({
                    title: 'My Blog',
                    content: '   ',
                    creator: 'username1'
                });

                var error = blog.validateSync();

                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Blog validation failed: content: Cannot be empty.');
            });

            it('error if creator is empty', function () {
                var blog = new Blog({
                    title: 'My Blog',
                    content: 'My blog contents',
                    creator: '   '
                });

                var error = blog.validateSync();

                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Blog validation failed: creator: Cannot be empty.');
            });
        });
    });
});