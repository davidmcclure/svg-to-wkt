
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('convert', function() {


  afterEach(function() {
    SVGtoWKT.PRECISION = 3;
  });


  it('should parse a <polygon>', function() {
    expect(SVGtoWKT.convert('<svg><polygon points="1,2 3,4 5,6" /></svg>')).toEqual(
      'GEOMETRYCOLLECTION(POLYGON((1 2,3 4,5 6,1 2)))'
    );
  });


  it('should parse a <polyline>', function() {
    expect(SVGtoWKT.convert('<svg><polyline points="1,2 3,4 5,6" /></svg>')).toEqual(
      'GEOMETRYCOLLECTION(LINESTRING(1 2,3 4,5 6))'
    );
  });


  it('should parse a <line>', function() {
    expect(SVGtoWKT.convert('<svg><line x1="1" y1="2" x2="3" y2="4" /></svg>')).toEqual(
      'GEOMETRYCOLLECTION(LINESTRING(1 2,3 4))'
    );
  });


  it('should parse a <rect>', function() {
    expect(SVGtoWKT.convert('<svg><rect x="0" y="0" width="1" height="1" /></svg>')).toEqual(
      'GEOMETRYCOLLECTION(POLYGON((0 0,1 0,1 1,0 1,0 0)))'
    );
  });


  it('should parse a <circle>', function() {
    SVGtoWKT.PRECISION = 1;
    expect(SVGtoWKT.convert('<svg><circle cx="0" cy="0" r="1.2" /></svg>')).toEqual(
      'GEOMETRYCOLLECTION(POLYGON((1.2 0,0.8 0.8,0 1.2,-0.8 0.8,-1.2 0,-0.8 -0.8,0 -1.2,0.8 -0.8,1.2 0)))'
    );
  });


  it('should parse a <ellipse>');


  it('should parse a <path>');


  it('should parse multiple elements');


});
