
'use strict';

//
// Module Dependencies
//

var client = require('my-crazy-play-storage-thingy-client');

//
// Opens a stream from wherever the destined input is
// @param  {Object}   config
// @param  {Function} callback (err, inputStream)
// @return {Void}
//
var getInputStream = function(config, callback) {
  client.openInputStream(config, callback);
};

//
// Opens a stream to wherever the destined output is
// @param  {Object}   config
// @param  {Function} callback (err, outputStream)
// @return {Void}
//
var getOutputStream = function(config, callback) {
  client.openOutputStram(config, callback);
};

//
// Exports
//

module.exports.getInputStream  = getInputStream;
module.exports.getOutputStream = getOutputStream;
module.exports.protocol = 'PROTOCOL:';