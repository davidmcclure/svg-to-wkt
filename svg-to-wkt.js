
/**
 * SVG-to-WKT.
 *
 * @package     svg-to-wkt
 * @copyright   2012 David McClure
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


var xml2js = require('xml2js');
var _ = require('lodash');


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
   * @param {String} svg: SVG markup.
   * @param {Function} cb: A callback.
   * @return {String}: Generated WKT.
   *
   * @public
   */
  SVGtoWKT.convert = function(svg, cb) {

    // Halt if svg is undefined or empty.
    if (_.isUndefined(svg) || _.isEmpty(svg.trim())) {
      throw new Error('Empty XML.');
    }

    // Strip out tabs and linebreaks.
    svg = svg.replace(/\r\n|\r|\n|\t/g, '');

    // Parse the XML.
    xml2js.parseString(svg, function(err, result) {

      if (err) cb(err);

      var els = [];
      _.each(result.svg, function(element, type) {

        var attrs = element[0].$;

        switch (type) {

          // Match `<polygon>` elements.
          case 'polygon':
            els.push(SVGtoWKT.polygon(
              attrs.points
            ));
            break;

          // Match `<polyline>` elements.
          case 'polyline':
            els.push(SVGtoWKT.polyline(
              attrs.points
            ));
            break;

          // Match `<line>` elements.
          case 'line':
            els.push(SVGtoWKT.line(
              attrs.x1,
              attrs.y1,
              attrs.x2,
              attrs.y2
            ));
            break;

          // Match `<rect>` elements.
          case 'rect':
            els.push(SVGtoWKT.rect(
              attrs.x,
              attrs.y,
              attrs.width,
              attrs.height
            ));
            break;

          // Match `<circle>` elements.
          case 'circle':
            els.push(SVGtoWKT.circle(
              attrs.cx,
              attrs.cy,
              attrs.r
            ));
            break;

          // Match `<ellipse>` elements.
          case 'ellipse':
            els.push(SVGtoWKT.ellipse(
              attrs.cx,
              attrs.cy,
              attrs.rx,
              attrs.ry
            ));
            break;

          // Match `<path>` elements.
          case 'path':
            els.push(SVGtoWKT.path(element.$.d));
            break;

        }

        // Wrap into a single `GEOMETRYCOLLECTION`.
        cb(null, 'GEOMETRYCOLLECTION(' + els.join(',') + ')');

      });

    });

  };


  /**
   * Construct a WKT line from SVG start/end point coordinates.
   *
   * @param {Number} x1: Start X.
   * @param {Number} y1: Start Y.
   * @param {Number} x2: End X.
   * @param {Number} y2: End Y.
   * @return {String}: Generated WKT.
   *
   * @public
   */
  SVGtoWKT.line = function(x1, y1, x2, y2) {
    return 'LINESTRING('+x1+' '+-y1+','+x2+' '+-y2+')';
  };


  /**
   * Construct a WKT linestrimg from SVG `points` attribute value.
   *
   * @param {String} points: <polyline> `points` attribute value.
   * @return {String}: Generated WKT.
   *
   * @public
   */
  SVGtoWKT.polyline = function(points) {

    // "1,2 3,4 " => "1 2,3 4"
    var pts = _.map(points.trim().split(' '), function(pt) {
      pt = pt.split(','); pt[1] = -pt[1];
      return pt.join(' ');
    });

    return 'LINESTRING(' + pts.join() + ')';

  };


  /**
   * Construct a WKT polygon from SVG `points` attribute value.
   *
   * @param {String} points: <polygon> `points` attribute value.
   * @return {String}: Generated WKT.
   *
   * @public
   */
  SVGtoWKT.polygon = function(points) {

    // "1,2 3,4 " => "1 2,3 4"
    var pts = _.map(points.trim().split(' '), function(pt) {
      pt = pt.split(','); pt[1] = -pt[1];
      return pt.join(' ');
    });

    // Close.
    pts.push(pts[0]);

    return 'POLYGON((' + pts.join() + '))';

  };


  /**
   * Construct a WKT polygon from SVG rectangle origin and dimensions.
   *
   * @param {Number} x: Top left X.
   * @param {Number} y: Top left Y.
   * @param {Number} width: Rectangle width.
   * @param {Number} height: Rectangle height.
   * @return {String}: Generated WKT.
   *
   * @public
   */
  SVGtoWKT.rect = function(x, y, width, height) {

    var pts = [];

    // 0,0 origin by default.
    if (!_.isNumber(x)) x = 0;
    if (!_.isNumber(y)) y = 0;

    // No corner rounding.
    pts.push(String(x)+' '+String(-y));              // top left
    pts.push(String(x+width)+' '+String(-y));        // top right
    pts.push(String(x+width)+' '+String(-y-height)); // bottom right
    pts.push(String(x)+' '+String(-y-height));       // bottom left
    pts.push(String(x)+' '+String(-y));              // close

    // TODO: Corner rounding.

    return 'POLYGON((' + pts.join() + '))';

  };


  /**
   * Construct a WKT polygon for a circle from origin and radius.
   *
   * @param {Number} cx: Center X.
   * @param {Number} cy: Center Y.
   * @param {Number} r: Radius.
   * @return {String} wkt: Generated WKT.
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
      pts.push(String(x)+' '+String(-y));
    });

    // Close.
    pts.push(pts[0]);

    return wkt + pts.join() + '))';

  };


  /**
   * Construct a WKT polygon for an ellipse from origin and radii.
   *
   * @param {Number} cx: Center X.
   * @param {Number} cy: Center Y.
   * @param {Number} rx: Horizontal radius.
   * @param {Number} ry: Vertical radius.
   * @return {String} wkt: Generated WKT.
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
      pts.push(String(x)+' '+String(-y));
    });

    // Close.
    pts.push(pts[0]);

    return wkt + pts.join() + '))';

  };


  /**
   * Construct a WKT polygon from a SVG path string. Approach from:
   * http://whaticode.com/2012/02/01/converting-svg-paths-to-polygons/
   *
   * @param {String} d: <path> `d` attribute value.
   * @return {String}: Generated WKT.
   *
   * @public
   */
  SVGtoWKT.path = function(d) {

    // Try to extract polygon paths closed with 'Z'.
    var polys = _.map(d.trim().match(/[^z|Z]+[z|Z]/g), function(p) {
      return __pathElement(p.trim()+'z');
    });

    // If closed polygon paths exist, construct a `POLYGON`.
    if (!_.isEmpty(polys)) {

      var parts = [];
      _.each(polys, function(poly) {
        parts.push('(' + __pathPoints(poly).join() + ')');
      });

      return 'POLYGON(' + parts.join() + ')';

    }

    // Otherwise, construct a `LINESTRING` from the unclosed path.
    else {
      var line = __pathElement(d);
      return 'LINESTRING(' + __pathPoints(line).join() + ')';
    }

  };


  /**
   * Construct a SVG path element.
   *
   * @param {String} d: <path> `d` attribute value.
   * @return {SVGPathElement}: The new <path> element.
   *
   * @private
   */
  var __pathElement = function(d) {
    var path = document.createElementNS(SVGNS, 'path');
    path.setAttributeNS(null, 'd', d);
    return path;
  };


  /**
   * Construct a SVG path element.
   *
   * @param {SVGPathElement} path: A <path> element.
   * @param {Boolean} closed: True if the path should be closed.
   * @return array: An array of space-delimited coords.
   *
   * @private
   */
  var __pathPoints = function(path, closed) {

    closed = closed || false;
    var pts = [];

    // Get number of points.
    var length = path.getTotalLength();
    var count = Math.round(length * SVGtoWKT.DENSITY);

    // Interpolate points.
    _(count+1).times(function(i) {
      var point = path.getPointAtLength((length * i) / count);
      pts.push(String(__round(point.x))+' '+String(__round(-point.y)));
    });

    if (closed) pts.push(pts[0]);
    return pts;

  };


  /**
   * Round a number to the number of decimal places in `PRECISION`.
   *
   * @param {Number} val: The number to round.
   * @return {Number}: The rounded value.
   *
   * @private
   */
  var __round = function(val) {
    var root = Math.pow(10, SVGtoWKT.PRECISION);
    return Math.round(val * root) / root;
  };


  // Node.js:
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVGtoWKT;
  }

  // Browser:
  else {
    this.SVGtoWKT = SVGtoWKT;
  }


}.call(this));
