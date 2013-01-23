
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('path', function() {

  afterEach(function() {
    SVGtoWKT.DENSITY = 1;
  });

  it('should create a LINESTRING when path is open');
  it('should create a POLYGON when path is closed with `z`');
  it('should create a POLYGON when path is closed with `Z`');
  it('should create a POLYGON with holes when multiple `z`s');
  it('should react to different density settings');

});
