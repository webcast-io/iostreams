
'use strict';

var assert     = require('assert');
var http       = require('http');
var ioStream   = require('../../lib/iostreams')();
var ioStreamS3 = require('../../providers/iostreams-s3');
var _          = require('underscore');
var fs         = require('fs');

ioStream.use(ioStreamS3);

var baseConfig = {
  protocol: 's3:',
  key: process.env.S3_KEY,
  secret: process.env.S3_SECRET,
  bucket: process.env.S3_BUCKET,
  region: 'eu-west-1'
};


describe('iostreams-file', function() {

  describe('getProviderByProtocol', function() {

    it('should return a file instance based on the file: protocol', function() {
      assert.deepEqual(ioStream.getProviderByProtocol('s3:'), ioStreamS3);
    });

  });

  describe('getInputStream', function() {

    it('should provide a stream given a correct config', function(done) {
      ioStream.getInputStream(_.extend(baseConfig, { path: '/webcastio-gravatar.png' }), function(err, stream) {
        assert.ifError(err);
        assert(stream instanceof http.IncomingMessage);
        done();
      });
    });
    it('should provide an error given a file config with no file at path', function(done) {
      ioStream.getInputStream(_.extend(baseConfig, { path: '/non-existent-file.png' }), function(err) {
        assert(err instanceof Error);
        done();
      });
    });
    it('should provide an error given a correct object input');
    it('should provide an error given a file object with no file at path');

  });

  describe('getOutputStream', function() {

    var fileSize, filePath = __dirname + '/../assets/testfile1.flv';

    before(function(done) {
      fs.stat(filePath, function(err, stats) {
        if(err) return done(err);
        fileSize = stats.size;
        done();
      });
    });

    it('should provide a stream given a correct file string', function(done) {

      ioStream.getOutputStream(_.extend(baseConfig, {
        path: '/file-to-be-created.flv',
        'Content-Length': fileSize,
        'Content-Type':   'video/flv',
        'x-amz-acl':      'public-read'
      }), function(err, stream) {
        assert.ifError(err);
        assert(stream instanceof http.OutgoingMessage);

        var fileStream = fs.createReadStream(filePath);

        stream.on('response', function(awsRes) {
          if(awsRes.statusCode !== 200) {
            return done(new Error('Non 200 statuscode'))
          } else {
            return done();
          }
        });

        fileStream.pipe(stream);

      });
    });
    it('should provide an error given a icorrect object input');

  });

});
