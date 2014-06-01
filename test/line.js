
/**
 * SVG-to-WKT.js
 *
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var SVGtoWKT = require('../svg-to-wkt');
var expect = require('chai').expect;


describe('SVGtoWKT.line()', function() {

  it('should create a LINESTRING shape', function() {
    expect(SVGtoWKT.line(1, 2, 3, 4)).to.equal(
      'LINESTRING(1 -2,3 -4)'
    );
  });

});
