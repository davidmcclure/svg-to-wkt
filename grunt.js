
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.initConfig({

    jasmine: {
      src: 'svg-to-wkt.js',
      specs: 'tests/*.spec.js',
      helpers: [
        'components/jquery/jquery.js',
        'components/underscore/underscore.js',
        'components/sinon.js/sinon.js'
      ],
      server: {
        port: 1337
      }
    }

  });

  grunt.registerTask('default', 'jasmine');

};
