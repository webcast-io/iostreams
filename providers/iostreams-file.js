
'use strict';

//
// Module Dependencies
//

var fs     = require('fs');
var mkdirp = require('mkdirp');

//
// Opens a stream from wherever the destined input is
// @param  {Object}   config
// @param  {Function} callback (err, inputStream)
// @return {Void}
//
var getInputStream = function(config, callback) {

  var stream = fs.createReadStream(config.path);
  stream.on('error', callback);
  stream.on('open', function() {
    callback(null, stream);
  });

};

//
// Opens a stream to wherever the destined output is
// @param  {Object}   config
// @param  {Function} callback (err, outputStream)
// @return {Void}
//
var getOutputStream = function(config, callback) {


  mkdirp(config.path.substr(0, config.path.lastIndexOf('/')), function(err) {
    if(err) {
      return callback(err);
    }
    var stream = fs.createWriteStream(config.path);
    stream.on('error', callback);
    stream.on('open', function() {
      callback(null, stream);
    });
  });

};

//
// Exports
//

module.exports.getInputStream  = getInputStream;
module.exports.getOutputStream = getOutputStream;
module.exports.protocol        = 'file:';
