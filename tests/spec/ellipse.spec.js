
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Tests for `ellipse`.
 *
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('ellipse', function() {


  beforeEach(function() {
    T.reset();
  });


  it('should create an elliptical POLYGON shape', function() {
    SVGtoWKT.PRECISION = 1;
    expect(SVGtoWKT.ellipse(0, 0, 1, 1.6)).toEqual(
      'POLYGON(('+
        '1 0,'+
        '0.7 -1.1,'+
        '0 -1.6,'+
        '-0.7 -1.1,'+
        '-1 0,'+
        '-0.7 1.1,'+
        '0 1.6,'+
        '0.7 1.1,'+
        '1 0'+
      '))'
    );
  });


  it('should react to different density settings', function() {
    SVGtoWKT.DENSITY = 1;
    var c1 = T.countPoints(SVGtoWKT.ellipse(0, 0, 1, 1.6));
    SVGtoWKT.DENSITY = 2;
    var c2 = T.countPoints(SVGtoWKT.ellipse(0, 0, 1, 1.6));
    expect(c2).toBeGreaterThan(c1);
  });


});
