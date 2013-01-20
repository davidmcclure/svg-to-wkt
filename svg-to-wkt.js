
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

// SVG-to-WKT 0.0.1
// http://dclure.org
// (c) 2013 David McClure


(function() {

  var SVGtoWKT = {};
  var root = this;

  // TODO

  // AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define('async', [], function() {
      return SVGtoWKT;
    });
  }

  // Node.js
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVGtoWKT;
  }

  // Browser
  else root.SVGtoWKT = SVGtoWKT;

})();
