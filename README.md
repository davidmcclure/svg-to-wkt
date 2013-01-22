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

* **[convert](#convert)**
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

__Returns__

* {String} wkt - A WKT ```GEOMETRYCOLLECTION```.

__Example__

```js
SVGtoWKT.convert('<svg><polygon points="1,2 3,4 5,6" /></svg>');
>>> "GEOMETRYCOLLECTION(POLYGON((1 2,3 4,5 6,1 2)))"
```

---

<a name="line" />
### SVGtoWKT.line(x1, y1, x2, y2)

Constructs a WKT ```LINESTRING``` element from two points.

__Arguments__

* {Number} x1 - The X coordinate of the start point.
* {Number} y1 - The Y coordinate of the start point.
* {Number} x2 - The X coordinate of the end point.
* {Number} y2 - The Y coordinate of the end point.

__Returns__

* {String} wkt - A WKT ```LINESTRING```.

__Example__

```js
SVGtoWKT.line(1, 2, 3, 4);
>>> "LINESTRING(1 2,3 4)"
```

---

<a name="polyline" />
### SVGtoWKT.polyline()

Constructs a WKT ```LINESTRING``` element from the value of the ```points``` attribute on a SVG ```polyline``` element.

__Arguments__

* {String} points - The value of the ```points``` attribute on a SVG ```polyline``` element.

__Returns__

* {String} wkt - A WKT ```LINESTRING```.

__Example__

```js
SVGtoWKT.polyline('1,2 3,4');
>>> "LINESTRING(1 2,3 4)"
```

---

<a name="rect" />
### SVGtoWKT.rect()

Constructs a WKT ```POLYGON``` element from the coordinates of the top-left corner of a rectangle, the height/width, and (**TODO**) border radii.

__Arguments__

* {Number} x - The X coordinate of the top-left corner.
* {Number} y - The Y coordinate of the top-left corner.
* {Number} width - The width of the rectangle.
* {Number} height - The height of the rectangle.
* {Number} rx (**TODO**) - The horizontal border radius.
* {Number} ry (**TODO**) - The vertical border radius.

__Returns__

* {String} wkt - A WKT ```POLYGON```.

__Example__

```js
SVGtoWKT.rect(1, 2, 3, 4);
>>> "POLYGON((1 2,4 2,4 6,1 6,1 2))"
```

---

<a name="circle" />
### SVGtoWKT.circle()

Constructs a WKT ```POLYGON``` element from a circle center point and radius.

__Arguments__

* {Number} cx - The center X coordinate.
* {Number} cy - The center Y coordinate.
* {Number} r - The radius.
* {Number} density (optional, defaults to 1) - The number of polygon points that should be rendered per linear pixel. Higher density results in more points, higher resolution.

__Returns__

* {String} wkt - A WKT ```POLYGON```.

__Example__

```js
SVGtoWKT.circle(0, 0, 10);
>>> "POLYGON((10 0,9.950307753654014 0.9956784659581666,9.801724878485437 1.9814614319939758,9.555728057861407 2.947551744109042,9.214762118704076 3.8843479627469475,8.782215733702285 4.782539786213182,8.262387743159948 5.63320058063622,7.66044443118978 6.4278760968653925,6.982368180860728 7.158668492597185,6.2348980185873355 7.818314824680298,5.425462638657594 8.400259231507714,4.562106573531629 8.898718088114686,3.65341024366395 9.308737486442043,2.7084046814300518 9.62624246950012,1.7364817766693041 9.84807753012208,0.7473009358642417 9.972037971811801,-0.24930691738072913 9.996891820008162,-1.2434370464748516 9.92239206600172,-2.2252093395631434 9.749279121818237,-3.1848665025168432 9.479273461671319,-4.112871031306115 9.115058523116732,-4.999999999999998 8.660254037844387,-5.837436722347899 8.119380057158564,-6.6168583759685955 7.497812029677341,-7.330518718298263 6.801727377709193,-7.9713250722292255 6.038044103254774,-8.532908816321555 5.214352033794981,-9.00968867902419 4.338837391175582,-9.396926207859083 3.420201433256689,-9.69077286229078 2.4675739769029343,-9.888308262251286 1.4904226617617429,-9.987569212189223 0.4984588566069748,-9.987569212189223 -0.4984588566069723,-9.888308262251286 -1.4904226617617446,-9.69077286229078 -2.467573976902936,-9.396926207859085 -3.4202014332566866,-9.009688679024192 -4.33883739117558,-8.532908816321555 -5.214352033794984,-7.971325072229226 -6.038044103254771,-7.330518718298262 -6.801727377709195,-6.616858375968594 -7.497812029677342,-5.837436722347898 -8.119380057158565,-5.000000000000004 -8.660254037844384,-4.112871031306116 -9.115058523116732,-3.184866502516841 -9.479273461671319,-2.225209339563137 -9.749279121818237,-1.2434370464748494 -9.92239206600172,-0.24930691738073157 -9.996891820008162,0.7473009358642436 -9.972037971811801,1.7364817766692997 -9.848077530122081,2.708404681430051 -9.62624246950012,3.653410243663954 -9.308737486442041,4.562106573531628 -8.898718088114686,5.425462638657597 -8.400259231507713,6.234898018587334 -7.818314824680299,6.98236818086073 -7.158668492597183,7.660444431189778 -6.427876096865396,8.262387743159948 -5.6332005806362195,8.782215733702287 -4.782539786213178,9.214762118704076 -3.8843479627469475,9.555728057861408 -2.9475517441090386,9.801724878485437 -1.9814614319939772,9.950307753654013 -0.9956784659581729))"
```

---

## Credits

The ```path``` method follows the approach described by Guilherme Mussi on his blog: "[Converting SVG paths to polygons](http://whaticode.com/2012/02/01/converting-svg-paths-to-polygons)."

This document follows the layout used by Caolan McMahon (@caolan) in projects like @caolan/async.
