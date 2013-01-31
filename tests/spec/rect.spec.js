
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('rect', function() {


  beforeEach(function() {
    _t.reset();
  });


  it('should create a closed POLYGON shape', function() {
    expect(SVGtoWKT.rect(1, 2, 3, 4)).toEqual(
      'POLYGON((1 -2,4 -2,4 -6,1 -6,1 -2))'
    );
  });


  it('should default to origin at 0,0', function() {
    expect(SVGtoWKT.rect(undefined, undefined, 3, 4)).toEqual(
      'POLYGON((0 0,3 0,3 -4,0 -4,0 0))'
    );
  });


});
