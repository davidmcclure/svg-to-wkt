
/**
 * Tests for `polygon`.
 *
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('polygon', function() {


  beforeEach(function() {
    T.reset();
  });


  it('should create a closed POLYGON shape', function() {
    expect(SVGtoWKT.polygon('1,2 3,4 5,6')).toEqual(
      'POLYGON((1 -2,3 -4,5 -6,1 -2))'
    );
  });


  it('should trim empty whitespace on `points` string', function() {
    expect(SVGtoWKT.polygon(' 1,2 3,4 5,6 ')).toEqual(
      'POLYGON((1 -2,3 -4,5 -6,1 -2))'
    );
  });


});
