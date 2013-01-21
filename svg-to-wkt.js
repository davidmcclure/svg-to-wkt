
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// http://dclure.org
// (c) 2013 David McClure


(function() {

  var SVGtoWKT = {};
  var root = this;

  // Alias the original jQuery variable.
  var $ = root.$;

  // If we're in Node.js, import jQuery.
  if (typeof $ == 'undefined') $ = require('jquery');

  // Expose AMD / RequireJS module.
  if (typeof define !== 'undefined' && define.amd) {
    define('SVGtoWKT', ['jquery'], function() {
      return SVGtoWKT;
    });
  }

  // Export Node.js module.
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVGtoWKT;
  }

  // If we're in the browser, add `SVGtoWKT` as a global.
  else root.SVGtoWKT = SVGtoWKT;


  SVGtoWKT.convert = function(svg) {

    var wkt = 'GEOMETRYCOLLECTION(';
    var els = [];

    // Parse the raw XML.
    var xml = $($.parseXML(svg));

    // POLYGON
    xml.find('polygon').each(function(p) {
      // TODO|dev
      console.log(p);
    });

    return wkt + ')';

  };


})();
