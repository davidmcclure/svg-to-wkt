
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('ellipse', function() {


  beforeEach(function() {
    _t.reset();
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
    var c1 = _t.countPoints(SVGtoWKT.ellipse(0, 0, 1, 1.6));
    SVGtoWKT.DENSITY = 2;
    var c2 = _t.countPoints(SVGtoWKT.ellipse(0, 0, 1, 1.6));
    expect(c2).toBeGreaterThan(c1);
  });


});
