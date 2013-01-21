
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
        $(line).attr('x1'),
        $(line).attr('y1'),
        $(line).attr('x2'),
        $(line).attr('y2')
      ));
    });

    // POLYGON
    xml.find('polygon').each(function(i, poly) {
      els.push(__polygon($(poly).attr('points')));
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

    return wkt + pts.join() + '))';

  };


})();
