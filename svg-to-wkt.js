
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// (c) 2013 David McClure
// http://dclure.org


(function() {


  var SVGNS = 'http://www.w3.org/2000/svg';
  var SVGtoWKT = {};


  /**
   * The number of decimal places computed during curve interpolation when
   * generating points for `<circle>`, `<ellipse>`, and `<path>` elements.
   *
   * @public
   */
  SVGtoWKT.PRECISION = 3;


  /**
   * The number of points computed during curve interpolation per unit of
   * linear pixel length. For example, if a a path is 10px in length, and
   * `DENSITY` is set to 2, the path will be rendered with 20 points.
   *
   * @public
   */
  SVGtoWKT.DENSITY = 1;


  /**
   * SVG => WKT.
   *
   * @param   {String} svg: SVG markup.
   * @return  {String}: Generated WKT.
   *
   * @public
   */
  SVGtoWKT.convert = function(svg) {

    var wkt = 'GEOMETRYCOLLECTION(';
    var els = [];

    // Parse the raw XML.
    var xml = $($.parseXML(svg));

    // POLYGON
    xml.find('polygon').each(function(i, polygon) {
      els.push(SVGtoWKT.polygon($(polygon).attr('points')));
    });

    // POLYLINE
    xml.find('polyline').each(function(i, polyline) {
      els.push(SVGtoWKT.polyline($(polyline).attr('points')));
    });

    // LINE
    xml.find('line').each(function(i, line) {
      els.push(SVGtoWKT.line(
        parseInt($(line).attr('x1'), 10),
        parseInt($(line).attr('y1'), 10),
        parseInt($(line).attr('x2'), 10),
        parseInt($(line).attr('y2'), 10)
      ));
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


  /**
   * Construct a WKT line from SVG start/end point coordinates.
   *
   * @param   {Number} x1:  Start X.
   * @param   {Number} y1:  Start Y.
   * @param   {Number} x2:  End X.
   * @param   {Number} y2:  End Y.
   * @return  {String}: Generated WKT.
   *
   * @public
   */
  SVGtoWKT.line = function(x1, y1, x2, y2) {
    return 'LINESTRING('+x1+' '+y1+','+x2+' '+y2+')';
  };


  /**
   * Construct a WKT linestrimg from SVG `points` attribute value.
   *
   * @param   {String} points:  <polyline> `points` attribute value.
   * @return  {String}:         Generated WKT.
   *
   * @public
   */
  SVGtoWKT.polyline = function(points) {

    var wkt = 'LINESTRING(';
    var pts = [];

    // "1,2 3,4 " => "1 2,3 4"
    _.each(points.trim().split(' '), function(pt) {
      pts.push(pt.replace(',', ' '));
    });

    return wkt + pts.join() + ')';

  };


  /**
   * Construct a WKT polygon from SVG `points` attribute value.
   *
   * @param   {String} points:  <polygon> `points` attribute value.
   * @return  {String}:         Generated WKT.
   *
   * @public
   */
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


  /**
   * Construct a WKT polygon from SVG rectangle origin and dimensions.
   *
   * @param   {Number} x:       Top left X.
   * @param   {Number} y:       Top left Y.
   * @param   {Number} width:   Rectangle width.
   * @param   {Number} height:  Rectangle height.
   * @param   {Number} rx:      Horizontal corner radius.
   * @param   {Number} ry:      Vertical corner radius.
   * @return  {String}:         Generated WKT.
   *
   * @public
   */
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


  /**
   * Construct a WKT polygon for a circle from origin and radius.
   *
   * @param   {Number} cx:      Center X.
   * @param   {Number} cy:      Center Y.
   * @param   {Number} r:       Radius.
   * @return  {String} wkt:     Generated WKT.
   *
   * @public
   */
  SVGtoWKT.circle = function(cx, cy, r) {

    var wkt = 'POLYGON((';
    var pts = [];

    // Compute number of points.
    var circumference = Math.PI * 2 * r;
    var point_count = Math.round(circumference * SVGtoWKT.DENSITY);

    // Compute angle between points.
    var interval_angle = 360 / point_count;

    // Genrate the circle.
    _(point_count).times(function(i) {
      var angle = (interval_angle * i) * (Math.PI / 180);
      var x = __round(cx + r * Math.cos(angle));
      var y = __round(cy + r * Math.sin(angle));
      pts.push(String(x)+' '+String(y));
    });

    // Close.
    pts.push(pts[0]);

    return wkt + pts.join() + '))';

  };


  /**
   * Construct a WKT polygon for an ellipse from origin and radii.
   *
   * @param   {Number} cx:      Center X.
   * @param   {Number} cy:      Center Y.
   * @param   {Number} rx:      Horizontal radius.
   * @param   {Number} ry:      Vertical radius.
   * @return  {String} wkt:     Generated WKT.
   *
   * @public
   */
  SVGtoWKT.ellipse = function(cx, cy, rx, ry) {

    var wkt = 'POLYGON((';
    var pts = [];

    // Approximate the circumference.
    var circumference = 2 * Math.PI * Math.sqrt(
      (Math.pow(rx, 2) + Math.pow(ry, 2)) / 2
    );

    // Compute number of points and angle between points.
    var point_count = Math.round(circumference * SVGtoWKT.DENSITY);
    var interval_angle = 360 / point_count;

    // Generate the ellipse.
    _(point_count).times(function(i) {
      var angle = (interval_angle * i) * (Math.PI / 180);
      var x = __round(cx + rx * Math.cos(angle));
      var y = __round(cy + ry * Math.sin(angle));
      pts.push(String(x)+' '+String(y));
    });

    // Close.
    pts.push(pts[0]);

    return wkt + pts.join() + '))';

  };


  /**
   * Construct a WKT polygon from a SVG path string. Approach from:
   * http://whaticode.com/2012/02/01/converting-svg-paths-to-polygons/
   *
   * @param   {String} d:   <path> `d` attribute value.
   * @return  {String} wkt: Generated WKT.
   *
   * @public
   */
  SVGtoWKT.path = function(d) {

    var wkt = 'POLYGON(';
    var parts = [];

    // Create component <path> elements.
    var paths = _.map(d.trim().match(/([^Z]+Z)/g), function(p) {
      return __path(p.trim()+'Z');
    });

    // Generate polygon parts.
    _.each(paths, function(path) {

      var part = '(';
      var pts = [];

      // Get number of points.
      var length = path.getTotalLength();
      var point_count = Math.round(length * SVGtoWKT.DENSITY);

      // Render points.
      _(point_count).times(function(i) {
        var distance = (length * i) / point_count;
        var point = path.getPointAtLength(distance);
        pts.push(String(__round(point.x))+' '+String(__round(point.y)));
      });

      parts.push(part + pts.join() + ')');

    });

    return wkt + parts.join() + ')';

  };


  /**
   * Construct a SVG path element.
   *
   * @param   {String} d:       <path> `d` attribute value.
   * @return  {SVGPathElement}: The new <path> element.
   *
   * @private
   */
  var __path = function(d) {
    var path = document.createElementNS(SVGNS, 'path');
    path.setAttributeNS(null, 'd', d);
    return path;
  };


  /**
   * Round a number to the number of decimal places in `PRECISION`..
   *
   * @param   {Number} val: The number to round.
   * @return  {Number}:     The rounded value.
   *
   * @private
   */
  var __round = function(val) {
    var root = Math.pow(10, SVGtoWKT.PRECISION);
    return Math.round(val * root) / root;
  };


  this.SVGtoWKT = SVGtoWKT;


})();
