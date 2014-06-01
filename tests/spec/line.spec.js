
/**
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('line', function() {


  beforeEach(function() {
    T.reset();
  });


  it('should create a LINESTRING shape', function() {
    expect(SVGtoWKT.line(1, 2, 3, 4)).toEqual(
      'LINESTRING(1 -2,3 -4)'
    );
  });


});
