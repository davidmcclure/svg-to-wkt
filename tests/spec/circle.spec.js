
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('circle', function() {


  beforeEach(function() {
    _t.reset();
  });


  it('should create a circular POLYGON shape', function() {
    SVGtoWKT.PRECISION = 1;
    expect(SVGtoWKT.circle(0, 0, 1.2)).toEqual(
      'POLYGON((1.2 0,0.8 0.8,0 1.2,-0.8 0.8,-1.2 0,-0.8 -0.8,0 -1.2,0.8 -0.8,1.2 0))'
    );
  });


  it('should react to different density settings', function() {

    SVGtoWKT.DENSITY = 1;
    var raw = SVGtoWKT.circle(0, 0, 1.2, 1).match(/\(\(([\s\S]+)\)\)/);
    var points1 = raw[1].split(',');

    SVGtoWKT.DENSITY = 2;
    raw = SVGtoWKT.circle(0, 0, 1.2, 1).match(/\(\(([\s\S]+)\)\)/);
    var points2 = raw[1].split(',');

    // Should be more points when density is higher.
    expect(points2.length).toBeGreaterThan(points1.length);

  });


});
