
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// http://dclure.org
// (c) 2013 David McClure


(function() {

  var SVGtoWKT = {};


  // Expose AMD / RequireJS module.
  if (typeof define !== 'undefined' && define.amd) {
    define('SVGtoWKT', ['jquery'], function() {
      return SVGtoWKT;
    });
  }

  // If we're in the browser, add `SVGtoWKT` as a global.
  else this.SVGtoWKT = SVGtoWKT;


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
      els.push(__line(
        parseInt($(line).attr('x1'), 10),
        parseInt($(line).attr('y1'), 10),
        parseInt($(line).attr('x2'), 10),
        parseInt($(line).attr('y2'), 10)
      ));
    });

    // POLYLINE
    xml.find('polyline').each(function(i, polyline) {
      els.push(__polyline($(polyline).attr('points')));
    });

    // POLYGON
    xml.find('polygon').each(function(i, polygon) {
      els.push(__polygon($(polygon).attr('points')));
    });

    // RECT
    xml.find('rect').each(function(i, rect) {
      els.push(__rect(
        parseInt($(rect).attr('x'),       10),
        parseInt($(rect).attr('y'),       10),
        parseInt($(rect).attr('width'),   10),
        parseInt($(rect).attr('height'),  10),
        parseInt($(rect).attr('rx'),      10),
        parseInt($(rect).attr('ry'),      10)
      ));
    });

    // PATH
    xml.find('path').each(function(i, path) {
      els.push(__path(path));
    });

    return wkt + els.join(',') + ')';

  };


  // Construct a WKT line from SVG start/end point coordinates.
  // @param   {Number} x1
  // @param   {Number} y1
  // @param   {Number} x2
  // @param   {Number} y2
  // @return  {String} wkt
  var __line = function(x1, y1, x2, y2) {
    return 'LINESTRING('+x1+' '+y1+','+x2+' '+y2+')';
  };


  // Construct a WKT linestrimg from SVG `points` attribute value.
  // @param   {String} points
  // @return  {String} wkt
  var __polyline = function(points) {

    var wkt = 'LINESTRING(';
    var pts = [];

    // "1,2 3,4 " => "1 2,3 4"
    _.each(points.trim().split(' '), function(pt) {
      pts.push(pt.replace(',', ' '));
    });

    return wkt + pts.join() + ')';

  };


  // Construct a WKT polygon from SVG `points` attribute value.
  // @param   {String} points
  // @return  {String} wkt
  var __polygon = function(points) {

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


  // Construct a WKT polygon from SVG rectangle origin and dimensions.
  // @param   {Number} x
  // @param   {Number} y
  // @param   {Number} width
  // @param   {Number} height
  // @param   {Number} rx
  // @param   {Number} ry
  // @return  {String} wkt
  var __rect = function(x, y, width, height, rx, ry) {

    var wkt = 'POLYGON((';
    var pts = [];

    // 0,0 origin by default.
    if (_.isNaN(x)) x = 0;
    if (_.isNaN(y)) y = 0;

    // No corner rounding.
    if (_.isNaN(rx) || _.isNaN(ry)) {
      // Top left.
      pts.push([x, y]);
      // Top right.
      pts.push([x+width, y]);
      // Bottom right.
      pts.push([x+width, y+height]);
      // Bottom left.
      pts.push([x, y+height]);
      // Close.
      pts.push([x, y]);
    }

    // TODO|dev: Corner rounding.

    return wkt + pts.join() + '))';

  };


  // Construct a WKT line from a SVGPathElement.
  // @param   {SVGPathElement} path
  // @return  {String} wkt
  var __path = function(path) {

  };


})();
