'use strict'

var hash_file = require('../hash_file.js'),
    fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    async = require('async'),
    exec = require('child_process').exec

var dummyfileMegs = 20
var filePath = path.join(process.cwd, 'test', 'testData')

describe('hash_file module', function(){
  beforeEach(function(done){
    exec('dd if=/dev/urandom of='+ filePath +' bs=1m count='+dummyfileMegs, done)
  })
  after(function(done){
    fs.unlink(filePath, done)
  })
  it('should generate a md5 hash without error', function(done){
    console.time('md5')
    hash_file(filePath, 'md5', function(err, hash) {
      console.timeEnd('md5')
      assert.ok(!err, err)
      assert.ok(hash)
      assert.equal(32, hash.length)
      done()
    })
  })
  it('should generate the same md5 hash multiple times for the same file', function(done) {
    hash_file(filePath, 'md5', function(err, hash_first) {
      hash_file(filePath, 'md5', function(err, hash_second) {
        assert.equal(hash_first, hash_second)
        done()
      })
    })
  })
  it('should generate a sha1 hash without error', function(done){
    console.time('sha1')
    hash_file(filePath, 'sha1', function(err, hash) {
      console.timeEnd('sha1')
      assert.ok(!err, err)
      assert.ok(hash)
      assert.equal(40, hash.length)
      done()
    })
  })
  it('should generate the same sha1 hash multiple times for the same file', function(done) {
    hash_file(filePath, 'sha1', function(err, hash_first) {
      hash_file(filePath, 'sha1', function(err, hash_second) {
        assert.equal(hash_first, hash_second)
        done()
      })
    })
  })
  it('should generate a sha256 hash without error', function(done){
    console.time('sha256')
    hash_file(filePath, 'sha256', function(err, hash) {
      console.timeEnd('sha256')
      assert.ok(!err, err)
      assert.ok(hash)
      assert.equal(64, hash.length)
      done()
    })
  })
  it('should generate the same sha256 hash multiple times for the same file', function(done) {
    hash_file(filePath, 'sha256', function(err, hash_first) {
      hash_file(filePath, 'sha256', function(err, hash_second) {
        assert.equal(hash_first, hash_second)
        done()
      })
    })
  })
})


