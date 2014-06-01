
/**
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('path', function() {


  beforeEach(function() {
    T.reset();
  });


  it('should create a LINESTRING when path is open', function() {
    expect(SVGtoWKT.path('M0 0L0 1L1 1L1 2')).toEqual(
      'LINESTRING(0 0,0 -1,1 -1,1 -2)'
    );
  });


  it('should create a POLYGON when path is closed with `z`', function() {
    expect(SVGtoWKT.path('M0 0L0 1L1 1L1 0z')).toEqual(
      'POLYGON((0 0,0 -1,1 -1,1 0,0 0))'
    );
  });


  it('should create a POLYGON when path is closed with `Z`', function() {
    expect(SVGtoWKT.path('M0 0L0 1L1 1L1 0Z')).toEqual(
      'POLYGON((0 0,0 -1,1 -1,1 0,0 0))'
    );
  });


  it('should create a POLYGON with holes when multiple `z`s', function() {
    expect(SVGtoWKT.path('M0 0L0 3L3 3L3 0ZM1 1L1 2L2 2L2 1Z')).toEqual(
      'POLYGON('+
        '(0 0,0 -1,0 -2,0 -3,1 -3,2 -3,3 -3,3 -2,3 -1,3 0,2 0,1 0,0 0),'+
        '(1 -1,1 -2,2 -2,2 -1,1 -1)'+
      ')'
    );
  });


  it('should react to different density settings', function() {
    SVGtoWKT.DENSITY = 1;
    var c1 = T.countPoints(SVGtoWKT.path('M0 0L0 1'));
    SVGtoWKT.DENSITY = 2;
    var c2 = T.countPoints(SVGtoWKT.path('M0 0L0 1'));
    expect(c2).toBeGreaterThan(c1);
  });


});
