
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('polygon', function() {


  beforeEach(function() {
    _t.reset();
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
