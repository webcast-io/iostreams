'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {

      options: {
        jshintrc: '.jshintrc',
        ignores: [
          '*.min.js',
          'node_modules/**/*',
          'dist/**/*',
          'coverage/**/*'
        ]
      },
      all: [
        '*.js',
        '**/*.js'
      ]

    },

    mochaTest: {
      serverTest: {
        options: {
          reporter: 'dot',
        },
        src: ['test/**/*.js']
      }
    }

  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  // By default, lint and run all tests.
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('mocha', ['mochaTest']);
  grunt.registerTask('default', ['jshint', 'mocha']);

  if(process.env.TEST_CMD) {
    grunt.registerTask('travis', process.env.TEST_CMD);
  }

};
