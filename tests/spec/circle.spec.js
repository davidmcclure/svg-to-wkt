
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Tests for `circle`.
 *
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('circle', function() {


  beforeEach(function() {
    T.reset();
  });


  it('should create a circular POLYGON shape', function() {
    SVGtoWKT.PRECISION = 1;
    expect(SVGtoWKT.circle(0, 0, 1.2)).toEqual(
      'POLYGON(('+
        '1.2 0,'+
        '0.8 -0.8,'+
        '0 -1.2,'+
        '-0.8 -0.8,'+
        '-1.2 0,'+
        '-0.8 0.8,'+
        '0 1.2,'+
        '0.8 0.8,'+
        '1.2 0'+
      '))'
    );
  });


  it('should react to different density settings', function() {
    SVGtoWKT.DENSITY = 1;
    var c1 = T.countPoints(SVGtoWKT.circle(0, 0, 1.2, 1));
    SVGtoWKT.DENSITY = 2;
    var c2 = T.countPoints(SVGtoWKT.circle(0, 0, 1.2, 1));
    expect(c2).toBeGreaterThan(c1);
  });


});
