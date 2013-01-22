# SVG-to-WKT.js

SVG-to-WKT converts [SVG](https://developer.mozilla.org/en-US/docs/SVG) (Scalable Vector Graphics) geometry data and XML documents into [WKT](http://en.wikipedia.org/wiki/Well-known_text) (Well-Known Text), a markup language for representing vector geometry on maps implemented by spatially-enabled databases like PostGIS and MySQL.

SVG-to-WKT supports all SVG graphic elements that directly encode geometric data: ```<circle>```, ```<ellipse>```, ```<line>```, ```<path>```, ```<polygon>```, ```<polyline>```, and ```<rect>```. SVG styles are ignored, since WKT has no notion of presentation, only shape.

SVG paths are converted to "frozen" WKT ```POLYGON```'s using the ```getPointAtLength``` method on ```<path>``` elements - curves are interpolated at a customizable density level and written as a series of fixed points.

## Quick Example

```js
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

---

<a name="convert" />
### SVGtoWKT.convert(svg)

Top-level routine that takes a raw SVG document and returns a WKT string.

__Arguments__

* {String} svg - A valid SVG document.

__Example__

```js
SVGtoWKT.convert('<svg><polygon points="1,2 3,4 5,6" /></svg>');
>>> "GEOMETRYCOLLECTION(POLYGON((1 2,3 4,5 6,1 2)))"

---

<a name="line" />
### SVGtoWKT.line(x1, y1, x2, y2)

Constructs a WKT ```LINESTRING``` element from two points.

__Arguments__

* {Number} x1 - The X coordinate of the start point.
* {Number} y1 - The Y coordinate of the start point.
* {Number} x2 - The X coordinate of the end point.
* {Number} y2 - The Y coordinate of the end point.

__Example__

```js
SVGtoWKT.line(1, 2, 3, 4);
>>> "LINESTRING(1 2,3 4)"
```

## Credits

The ```path``` method follows the approach described by Guilherme Mussi on his blog: "[Converting SVG paths to polygons](http://whaticode.com/2012/02/01/converting-svg-paths-to-polygons)."

This document follows the layout used by Caolan McMahon (@caolan) in projects like @caolan/async.
