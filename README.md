# IOStreams

Quick amnd easy input & output streams from a bit of JSON.

[![Build Status](https://travis-ci.org/webcast-io/iostreams.png?branch=master)](https://travis-ci.org/webcast-io/iostreams)
[![Coverage Status](https://coveralls.io/repos/webcast-io/iostreams/badge.png?branch=master)](https://coveralls.io/r/webcast-io/iostreamsbranch=master)
[![Dependency Status](https://david-dm.org/webcast-io/iostreams.png)](https://david-dm.org/webcast-io/iostreams)

## Example

Get an input stream from the filesystem, compile your [stylus](http://learnboost.github.io/stylus/) and output stream to S3.

```js
iostreams.getInputOutputStreams(
  'file:' + __dirname + '/stylus/style.stylus',
  's3://mybucket.s3.amazonaws.com/css/style.css'
, function (err, inputStream, outputStream) {
  if(err) throw err;
  inputStream.pipe(require('gulp-stylus')).pipe(outputStream);
});
```

## Usage

First you're going to need to import the module, and create an instance (by calling as a function):

```js
var ioStreams = require('iostreams')();
```

Then add some [providers](https://github.com/webcast-io/iostreams/tree/master/providers)

```js
iostreams.use(require('iostreams/providers/iostreams-file'));
iostreams.use(require('iostreams/providers/iostreams-s3'));
iostreams.use(require('iostreams/providers/iostreams-http'));
```

Now you can use the three functions to get your input and output streams:

```js
iostreams.getInputStream(config, function(err, inputStream) { });
iostreams.getOutputStream(config, function(err, outputStream) { });
iostreams.getInputOutputStreams(inputConfig, outputConfig, function(err, inputStream, outputStream) { });
```

`config`, `inputConfig` & `outputConfig` can be objects or URIs (strings).


## Licence

MIT
