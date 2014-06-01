
/**
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('polyline', function() {


  beforeEach(function() {
    T.reset();
  });


  it('should create a LINESTRING shape', function() {
    expect(SVGtoWKT.polyline('1,2 3,4 5,6')).toEqual(
      'LINESTRING(1 -2,3 -4,5 -6)'
    );
  });


  it('should trim empty whitespace on `points` string', function() {
    expect(SVGtoWKT.polyline(' 1,2 3,4 5,6 ')).toEqual(
      'LINESTRING(1 -2,3 -4,5 -6)'
    );
  });


});
