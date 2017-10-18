var Blog = require('./../src/blog.model');
var assert = require('chai').assert;

describe('blog model', function () {
    describe('properties', function () {
        describe('createdOn', function () {
            it('populated with current date by default',function () {
                var currentDate = new Date();

                var blog = new Blog({
                    title: 'My Blog',
                    content: 'My blog contents',
                    creator: 'username1'
                });

                assert.isAbove(blog.createdOn.getTime(),
                    currentDate.getTime()
                );
            });
        });
        describe('lastUpdatedOn', function () {
            it('not populated by default',function () {
                var blog = new Blog({
                    title: 'My Blog',
                    content: 'My blog contents',
                    creator: 'username1'
                });

                assert.typeOf(blog.lastUpdatedOn, 'undefined');
            });
        });
    })
    describe('validators', function (){
        it('no error when all properties are valid', function (){
            var blog = new Blog({
                title: 'My Blog',
                content: 'My blog contents',
                creator: 'username1'
            });
    
            var error = blog.validateSync();
    
            assert.typeOf(error, 'undefined');
        });

        describe('required', function () {
            it('error if title not set', function (){
                var blog = new Blog({
                    content: 'My blog contents',
                    creator: 'username1'
                });
        
                var error = blog.validateSync();
        
                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Blog validation failed: title: Path `title` is required.');
            });
        
            it('error if content not set', function (){
                var blog = new Blog({
                    title: 'My Blog',
                    creator: 'username1'
                });
        
                var error = blog.validateSync();
        
                assert.notTypeOf(error, 'undefined');
                assert.equal(error.message,
                    'Blog validation failed: content: Path `content` is required.');
            });
    
            it('error if creator not set', function (){
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