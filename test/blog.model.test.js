var Blog = require('./../src/blog.model');
var assert = require('chai').assert;

describe('blog model', function () {
    describe('required validator', function () {
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
});