# SVG-to-WKT.js

SVG-to-WKT converts [SVG](https://developer.mozilla.org/en-US/docs/SVG) (Scalable Vector Graphics) geometry data and XML documents into [WKT](http://en.wikipedia.org/wiki/Well-known_text) (Well-Known Text), a markup language for representing vector geometry on maps implemented by spatially-enabled databases like PostGIS and MySQL.

SVG-to-WKT implements all SVG graphic elements that directly encode geometric data: ```<circle>```, ```<ellipse>```, ```<line>```, ```<path>```, ```<polygon>```, ```<polyline>```, and ```<rect>```. SVG styles are ignored, since WKT has no notion of presentation, only shape.

SVG paths are converted to "frozen" WKT ```POLYGON```'s using the ```getPointAtLength``` method on ```<path>``` elements (curves are interpolated at a customizable density level and written as a series of fixed points).

## Quick Example

```javascript
SVGtoWKT.convert('<svg><polygon points="1,2 3,4 5,6" /><line x1="7" y1="8" x2="9" y2="10" /></svg>');

>>> "GEOMETRYCOLLECTION(POLYGON((1 2,3 4,5 6,1 2)),LINESTRING(7 8,9 10))"
```

## In the Browser

SVG-to-WKT uses jQuery (for XML parsing) and Underscore (for sanity).

```html
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="underscore.js"></script>
<script type="text/javascript" src="svg-to-wkt.js"></script>
```

## Documentation

* [convert](#convert)
* [line](#line)
* [polyline](#polyline)
* [rect](#rect)
* [circle](#circle)
* [ellipse](#ellipse)
* [path](#path)

## Credits

The implementation of the ```path``` follows the approach described by Guilherme Petterle Silveira Mussi on his blog: "[Converting SVG paths to polygons](http://whaticode.com/2012/02/01/converting-svg-paths-to-polygons)."
