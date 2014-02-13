
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
  client.getFile(config.path, function(err, res) {
    if(err) {
      return callback(err, res);
    } else if(res.statusCode !== 200) {
      return callback(new Error('S3 Responded with a non 200 status code: ' + res.statusCode), res);
    } else {
      return callback(err || null, res);
    }
  });
};

//
// Opens a stream to wherever the destined output is
// @param  {String | Object}   config
// @param  {Function} callback (err, outputStream)
// @return {Void}
//
var getOutputStream = function(config, callback) {
  var client = knox.createClient(config);
  var req = client.put(config.path, config, callback);
  callback(null, req);
};

//
// Exports
//

module.exports.getInputStream  = getInputStream;
module.exports.getOutputStream = getOutputStream;
module.exports.protocol = 's3:';