var sha1_file = require('../sha1_file.js'),
    fs = require('fs'),
    assert = require('assert')

var filePath = process.argv[1] || './sha1_file.js'
var stat = fs.statSync(filePath)
var size = stat['size']

describe('sha1_file', function(){
  it('should generate a sha1 without error', function(done){
    sha1_file(filePath, function(err, sha1) {
      assert.ok(!err, err)
      assert.ok(sha1)
      assert.equal(40, sha1.length)
      done()
    })
  })
})

describe('sha1_file_buffered', function(){
  it('should generate a sha1 without error', function(done){
    sha1_file.buffered(filePath, function(err, sha1) {
      assert.ok(!err, err)
      assert.ok(sha1)
      assert.equal(40, sha1.length)
      done()
    })
  })
})
