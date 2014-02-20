
'use strict';

//
// Module Dependencies
//

var https = require('https');

//
// Opens a stream from wherever the destined input is
// @param  {Object}   config
// @param  {Function} callback (err, inputStream)
// @return {Void}
//
var getInputStream = function(config, callback) {

  var req = https.get(config);

  req.on('error', function(err) {
    callback(err);
  });

  req.on('response', function(res) {
    callback(null, res);
  });

};

//
// Opens a stream to wherever the destined output is
// @param  {Object}   config
// @param  {Function} callback (err, outputStream)
// @return {Void}
//
var getOutputStream = function(config, callback) {

  config.method = config.method || 'POST';

  var req = https.request(config);

  req.on('error', function(err) {
    callback(err);
  });

  req.on('response', function(res) {
    callback(null, res);
  });

};

//
// Exports
//

module.exports.getInputStream  = getInputStream;
module.exports.getOutputStream = getOutputStream;
module.exports.protocol = 'https:';