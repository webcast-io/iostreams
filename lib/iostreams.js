
'use strict';

//
// Module Dependencies
//

var url   = require('url');
var async = require('async');
var _     = require('underscore');

//
// IOStreams provides a grouping and generic linking functions
// for input and output stream connectors/generators
//
var IOStreams = function () {

  this.providers = [];

  return this;
};

//
// A method to add providers to IOStreams
// @param  {Object} provider Should have to callable functions getInputStream(config) and getOutputStream(config)
// @return {Number}          Number of providers now available
//
IOStreams.prototype.use = function(provider) {
  return this.providers.push(provider);
};

//
// Geds a provider that supports a certain protocol
// @param  {String} protocol e.g 'file:', 'http:' or 's3:'
// @return {Object}          A provider object
//
IOStreams.prototype.getProviderByProtocol = function(protocol) {

  var provider = _.find(this.providers, function(provider) {
    return provider.protocol === protocol;
  });

  if(!provider) {
    throw new Error('No provider found supporting the protocol `' + protocol + '`');
  }

  return provider;

};

//
// Parse config into a consistent structure
// @param  {String | Object} config
// @return {Object}
//
IOStreams.prototype.parseConfig = function(config) {
  if(typeof config === 'string') {
    config = url.parse(config);
  }
  return config;
};

//
// Opens a stream from wherever the destined input is
// @param  {String | Object}   config
// @param  {Function} callback (err, inputStream)
// @return {Void}
//
IOStreams.prototype.getInputStream = function(config, callback) {

  config = this.parseConfig(config);

  var provider;

  try {
    provider = this.getProviderByProtocol(config.protocol);
  } catch (err) {
    return callback(err);
  }

  return provider.getInputStream(config, callback);

};

//
// Opens a stream to wherever the destined output is
// @param  {String | Object}   config
// @param  {Function} callback (err, outputStream)
// @return {Void}
//
IOStreams.prototype.getOutputStream = function(config, callback) {

  config = this.parseConfig(config);

  var provider;

  try {
    provider = this.getProviderByProtocol(config.protocol);
  } catch (err) {
    return callback(err);
  }

  return provider.getOutputStream(config, callback);

};

//
// Lazy function to get Input and Output Streams
// @param  {String | Object}   inputConfig
// @param  {String | Object}   outputConfig [description]
// @param  {Function} callback     (err, inputStream, outputStream)
// @return {Void}
//
IOStreams.prototype.getInputOutputStreams = function(inputConfig, outputConfig, callback) {

  var self = this;

  async.parallel([
    function(callback) {
      self.getInputStream(inputConfig, callback);
    },
    function(callback) {
      self.getOutputStream(outputConfig, callback);
    }
  ], function(err, results) {
    callback(err, results[0], results[1]);
  });

};

//
// Create an instance of IOStreams
// @return {IOStreams}
//
var createInstance = function() {
  return new IOStreams();
};

//
// Exports
//

module.exports           = createInstance;
module.exports.IOStreams = IOStreams;