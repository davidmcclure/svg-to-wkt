
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('path', function() {


  beforeEach(function() {
    _t.reset();
  });


  it('should create a LINESTRING when path is open', function() {
    expect(SVGtoWKT.path('M0 0L0 1L1 1L1 2')).toEqual(
      'LINESTRING(0 0,0 1,1 1,1 2)'
    );
  });


  it('should create a POLYGON when path is closed with `z`', function() {
    expect(SVGtoWKT.path('M0 0L0 1L1 1L1 0z')).toEqual(
      'POLYGON((0 0,0 1,1 1,1 0,0 0))'
    );
  });


  it('should create a POLYGON when path is closed with `Z`', function() {
    expect(SVGtoWKT.path('M0 0L0 1L1 1L1 0Z')).toEqual(
      'POLYGON((0 0,0 1,1 1,1 0,0 0))'
    );
  });


  it('should create a POLYGON with holes when multiple `z`s', function() {
    expect(SVGtoWKT.path('M0 0L0 3L3 3L3 0ZM1 1L1 2L2 2L2 1Z')).toEqual(
      'POLYGON((0 0,0 1,0 2,0 3,1 3,2 3,3 3,3 2,3 1,3 0,2 0,1 0,0 0),(1 1,1 2,2 2,2 1,1 1))'
    );
  });


  it('should react to different density settings', function() {

    SVGtoWKT.DENSITY = 1;
    var raw = SVGtoWKT.path('M0 0L0 1').match(/\(([\s\S]+)\)/);
    var points1 = raw[1].split(',');

    SVGtoWKT.DENSITY = 2;
    raw = SVGtoWKT.path('M0 0L0 1').match(/\(([\s\S]+)\)/);
    points2 = raw[1].split(',');

    // Should be more points when density is higher.
    expect(points2.length).toBeGreaterThan(points1.length);

  });


});
