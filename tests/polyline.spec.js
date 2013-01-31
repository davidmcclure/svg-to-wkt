
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('polyline', function() {


  it('should create a LINESTRING shape', function() {
    expect(SVGtoWKT.polyline('1,2 3,4 5,6')).toEqual(
      'LINESTRING(1 2,3 4,5 6)'
    );
  });


  it('should trim empty whitespace on `points` string', function() {
    expect(SVGtoWKT.polyline(' 1,2 3,4 5,6 ')).toEqual(
      'LINESTRING(1 2,3 4,5 6)'
    );
  });


});
