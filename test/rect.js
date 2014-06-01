
/**
 * SVG-to-WKT.js
 *
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var SVGtoWKT = require('../svg-to-wkt');
var expect = require('chai').expect;


describe('SVGtoWKT.rect()', function() {

  it('should create a closed POLYGON shape', function() {
    expect(SVGtoWKT.rect(1, 2, 3, 4)).to.equal(
      'POLYGON((1 -2,4 -2,4 -6,1 -6,1 -2))'
    );
  });

  it('should default to origin at 0,0', function() {
    expect(SVGtoWKT.rect(undefined, undefined, 3, 4)).to.equal(
      'POLYGON((0 0,3 0,3 -4,0 -4,0 0))'
    );
  });

});
