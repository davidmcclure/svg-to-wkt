
/**
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = {

  tests: {
    src: 'svg-to-wkt.js',
    options: {
      specs: 'tests/spec/*.spec.js',
      helpers: [
        'bower_components/jquery/jquery.js',
        'bower_components/lodash/dist/lodash.js',
        'tests/helpers.js'
      ]
    }
  }

};
