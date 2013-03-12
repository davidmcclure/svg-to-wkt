
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Gruntfile.
 *
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.initConfig({

    jasmine: {
      svg_to_wkt: {
        src: 'svg-to-wkt.js',
        options: {
          specs: 'tests/spec/*.spec.js',
          helpers: [
            'components/jquery/jquery.js',
            'components/underscore/underscore.js',
            'tests/helpers.js'
          ]
        }
      }
    }

  });

  grunt.registerTask('default', 'jasmine');

};
