
/**
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  // Read `package.json`:
  var pkg = grunt.file.readJSON('package.json');

  // Load the task configurations.
  require('load-grunt-config')(grunt, {
    data: {
      pkg: pkg
    }
  });

};
