
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


describe('circle', function() {

  it('should construct a closed POLYGON WKT shape', function() {

    // Create circle with radius of 1.2 and 1 point-per-pixel-of-length.
    // The radius of this circle is ~7.53, which is rounded to 8, meaning
    // that the second, fourth, sixth, and eighth points are in the first,
    // second, third, and fourth quadrants, respectively, allowing us to
    // check that the circle is being constructed properly.
    var circle = SVGtoWKT.circle(0, 0, 1.2).match(/\(\(([\s\S]+)\)\)/);
    var points = circle[1].split(',');

    // Should have 9 points.
    expect(points.length).toEqual(9);
    // WKT polygon should be closed.
    expect(points[0]).toEqual(points[8]);

    // Quadrant 1 point.
    var p1 = points[1].split(' ');
    expect(p1[0]).toBeGreaterThan(0);
    expect(p1[1]).toBeGreaterThan(0);

    // Quadrant 2 point.
    var p3 = points[3].split(' ');
    expect(p3[0]).toBeLessThan(0);
    expect(p3[1]).toBeGreaterThan(0);

    // Quadrant 3 point.
    var p5 = points[5].split(' ');
    expect(p5[0]).toBeLessThan(0);
    expect(p5[1]).toBeLessThan(0);

    // Quadrant 4 point.
    var p7 = points[7].split(' ');
    expect(p7[0]).toBeGreaterThan(0);
    expect(p7[1]).toBeLessThan(0);

  });

});
