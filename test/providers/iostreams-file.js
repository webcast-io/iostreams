
'use strict';

var assert       = require('assert');
var fs           = require('fs');
var ioStream     = require('../../lib/iostreams')();
var ioStreamFile = require('../../providers/iostreams-file');

ioStream.use(ioStreamFile);

describe('iostreams-file', function() {

  describe('getProviderByProtocol', function() {

    it('should return a file instance based on the file: protocol', function() {
      assert.deepEqual(ioStream.getProviderByProtocol('file:'), ioStreamFile);
    });

  });

  describe('getInputStream', function() {

    it('should provide a stream given a correct file string', function(done) {
      ioStream.getInputStream('file:' + __dirname + '/../assets/testfile1.flv', function(err, stream) {
        assert.ifError(err);
        assert(stream instanceof fs.ReadStream);
        done();
      });
    });
    it('should provide an error given a file string with no file at path', function(done) {
      ioStream.getInputStream('file:' + __dirname + '/../assets/nonexistent.flv', function(err) {
        assert(err instanceof Error);
        done();
      });
    });
    it('should provide an error given a correct object input');
    it('should provide an error given a file object with no file at path');

  });

  describe('getOutputStream', function() {

    it('should provide a stream given a correct file string');
    it('should provide an error given a file string with no file at path');
    it('should provide an error given a correct object input');
    it('should provide an error given a file object with no file at path');

  });

});
