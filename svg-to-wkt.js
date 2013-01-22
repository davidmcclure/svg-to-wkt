
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


(function() {


  var SVGtoWKT = {};


  // ----------------------------------------------------------------------
  // SVG => WKT.
  // @param   {String} svg
  // @return  {String} wkt
  SVGtoWKT.convert = function(svg) {

    var wkt = 'GEOMETRYCOLLECTION(';
    var els = [];

    // Parse the raw XML.
    var xml = $($.parseXML(svg));

    // LINE
    xml.find('line').each(function(i, line) {
      els.push(SVGtoWKT.line(
        parseInt($(line).attr('x1'), 10),
        parseInt($(line).attr('y1'), 10),
        parseInt($(line).attr('x2'), 10),
        parseInt($(line).attr('y2'), 10)
      ));
    });

    // POLYLINE
    xml.find('polyline').each(function(i, polyline) {
      els.push(SVGtoWKT.polyline($(polyline).attr('points')));
    });

    // POLYGON
    xml.find('polygon').each(function(i, polygon) {
      els.push(SVGtoWKT.polygon($(polygon).attr('points')));
    });

    // RECT
    xml.find('rect').each(function(i, rect) {
      els.push(SVGtoWKT.rect(
        parseInt($(rect).attr('x'),       10),
        parseInt($(rect).attr('y'),       10),
        parseInt($(rect).attr('width'),   10),
        parseInt($(rect).attr('height'),  10),
        parseInt($(rect).attr('rx'),      10),
        parseInt($(rect).attr('ry'),      10)
      ));
    });

    // CIRCLE
    xml.find('circle').each(function(i, circle) {
      els.push(SVGtoWKT.circle(
        parseInt($(circle).attr('cx'),  10),
        parseInt($(circle).attr('cy'),  10),
        parseInt($(circle).attr('r'),   10)
      ));
    });

    // ELLIPSE
    xml.find('ellipse').each(function(i, circle) {
      els.push(SVGtoWKT.ellipse(
        parseInt($(circle).attr('cx'),  10),
        parseInt($(circle).attr('cy'),  10),
        parseInt($(circle).attr('rx'),  10),
        parseInt($(circle).attr('ry'),  10)
      ));
    });

    // PATH
    xml.find('path').each(function(i, path) {
      els.push(SVGtoWKT.path($(path).attr('d')));
    });

    return wkt + els.join(',') + ')';

  };


  // ----------------------------------------------------------------------
  // Construct a WKT line from SVG start/end point coordinates.
  // @param   {Number} x1
  // @param   {Number} y1
  // @param   {Number} x2
  // @param   {Number} y2
  // @return  {String} wkt
  SVGtoWKT.line = function(x1, y1, x2, y2) {
    return 'LINESTRING('+x1+' '+y1+','+x2+' '+y2+')';
  };


  // ----------------------------------------------------------------------
  // Construct a WKT linestrimg from SVG `points` attribute value.
  // @param   {String} points
  // @return  {String} wkt
  SVGtoWKT.polyline = function(points) {

    var wkt = 'LINESTRING(';
    var pts = [];

    // "1,2 3,4 " => "1 2,3 4"
    _.each(points.trim().split(' '), function(pt) {
      pts.push(pt.replace(',', ' '));
    });

    return wkt + pts.join() + ')';

  };


  // ----------------------------------------------------------------------
  // Construct a WKT polygon from SVG `points` attribute value.
  // @param   {String} points
  // @return  {String} wkt
  SVGtoWKT.polygon = function(points) {

    var wkt = 'POLYGON((';
    var pts = [];

    // "1,2 3,4 " => "1 2,3 4"
    _.each(points.trim().split(' '), function(pt) {
      pts.push(pt.replace(',', ' '));
    });

    // Close.
    pts.push(pts[0]);

    return wkt + pts.join() + '))';

  };


  // ----------------------------------------------------------------------
  // Construct a WKT polygon from SVG rectangle origin and dimensions.
  // @param   {Number} x
  // @param   {Number} y
  // @param   {Number} width
  // @param   {Number} height
  // @param   {Number} rx
  // @param   {Number} ry
  // @return  {String} wkt
  SVGtoWKT.rect = function(x, y, width, height, rx, ry) {

    var wkt = 'POLYGON((';
    var pts = [];

    // 0,0 origin by default.
    if (!_.isNumber(x)) x = 0;
    if (!_.isNumber(y)) y = 0;

    // No corner rounding.
    if (!_.isNumber(rx) || !_.isNumber(ry)) {
      pts.push(String(x)+' '+String(y));              // top left
      pts.push(String(x+width)+' '+String(y));        // top right
      pts.push(String(x+width)+' '+String(y+height)); // bottom right
      pts.push(String(x)+' '+String(y+height));       // bottom left
      pts.push(String(x)+' '+String(y));              // close
    }

    // TODO|dev: Corner rounding.

    return wkt + pts.join() + '))';

  };


  // ----------------------------------------------------------------------
  // Construct a WKT polygon for a circle from origin and radius.
  // @param   {Number} cx
  // @param   {Number} cy
  // @param   {Number} r
  // @param   {Number} pts_per_unit
  // @return  {String} wkt
  SVGtoWKT.circle = function(cx, cy, r, pts_per_unit) {

    pts_per_unit = pts_per_unit || 1;
    var wkt = 'POLYGON((';
    var pts = [];

    // Compute number of points.
    var circumference = Math.PI * 2 * r;
    var point_count = Math.round(circumference * pts_per_unit);

    // Compute angle between points.
    var interval_angle = 360 / point_count;

    // Genrate the circle.
    _(point_count).times(function(i) {
      var angle = (interval_angle * i) * (Math.PI / 180);
      var x = cx + r * Math.cos(angle);
      var y = cy + r * Math.sin(angle);
      pts.push(String(x)+' '+String(y));
    });

    return wkt + pts.join() + '))';

  };


  // ----------------------------------------------------------------------
  // Construct a WKT polygon for an ellipse from origin and radii.
  // @param   {Number} cx
  // @param   {Number} cy
  // @param   {Number} rx
  // @param   {Number} ry
  // @param   {Number} pts_per_unit
  // @return  {String} wkt
  SVGtoWKT.ellipse = function(cx, cy, rx, ry, pts_per_unit) {

    pts_per_unit = pts_per_unit || 1;
    var wkt = 'POLYGON((';
    var pts = [];

    // Approximate the circumference.
    var circumference = 2 * Math.PI * Math.sqrt(
      (Math.pow(rx, 2) + Math.pow(ry, 2)) / 2
    );

    // Compute number of points and angle between points.
    var point_count = Math.round(circumference * pts_per_unit);
    var interval_angle = 360 / point_count;

    // Generate the ellipse.
    _(point_count).times(function(i) {
      var angle = (interval_angle * i) * (Math.PI / 180);
      var x = cx + rx * Math.cos(angle);
      var y = cy + ry * Math.sin(angle);
      pts.push(String(x)+' '+String(y));
    });

    return wkt + pts.join() + '))';

  };


  // ----------------------------------------------------------------------
  // Construct a WKT polygon from a SVG path string.
  // @param   {String} d
  // @param   {Number} pts_per_unit
  // @return  {String} wkt
  SVGtoWKT.path = function(d, pts_per_unit) {

    pts_per_unit = pts_per_unit || 1;
    var wkt = 'POLYGON(';

    // Create component <path> elements.
    var paths = _.map(d.trim().split('z'), function(p) {
      return $('<path />').attr('d', p.trim()+'z');
    });

  };


  this.SVGtoWKT = SVGtoWKT;


})();
