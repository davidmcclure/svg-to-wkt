
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('ellipse', function() {


  afterEach(function() {
    SVGtoWKT.PRECISION = 3;
    SVGtoWKT.DENSITY = 1;
  });


  it('should create an elliptical POLYGON shape', function() {
    SVGtoWKT.PRECISION = 1;
    expect(SVGtoWKT.ellipse(0, 0, 1, 1.6)).toEqual(
      'POLYGON((1 0,0.7 1.1,0 1.6,-0.7 1.1,-1 0,-0.7 -1.1,0 -1.6,0.7 -1.1,1 0))'
    );
  });


  it('should react to different density settings', function() {

    SVGtoWKT.DENSITY = 1;
    var raw = SVGtoWKT.ellipse(0, 0, 1, 1.6).match(/\(\(([\s\S]+)\)\)/);
    var points1 = raw[1].split(',');

    SVGtoWKT.DENSITY = 2;
    raw = SVGtoWKT.ellipse(0, 0, 1, 1.6).match(/\(\(([\s\S]+)\)\)/);
    points2 = raw[1].split(',');

    // Should be more points when density is higher.
    expect(points2.length).toBeGreaterThan(points1.length);

  });


});
