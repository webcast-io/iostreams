
'use strict';

//
// Module Dependencies
//

var knox = require('knox');

//
// Opens a stream from wherever the destined input is
// @param  {String | Object}   config
// @param  {Function} callback (err, inputStream)
// @return {Void}
//
var getInputStream = function(config, callback) {
  var client = knox.createClient(config);
  client.getFile(config.path, callback);
};

//
// Opens a stream to wherever the destined output is
// @param  {String | Object}   config
// @param  {Function} callback (err, outputStream)
// @return {Void}
//
var getOutputStream = function(config, callback) {
  var client = knox.createClient(config);
  var req = client.put(config.path, config.headers, callback);
  callback(null, req);
};

//
// Exports
//

module.exports.getInputStream  = getInputStream;
module.exports.getOutputStream = getOutputStream;
module.exports.protocol = 's3:';