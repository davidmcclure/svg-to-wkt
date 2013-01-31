# SVG-to-WKT.js

SVG-to-WKT converts [SVG](https://developer.mozilla.org/en-US/docs/SVG) (Scalable Vector Graphics) into [WKT](http://en.wikipedia.org/wiki/Well-known_text) (Well-Known Text), a markup language for representing vector geometry on maps implemented by spatially-enabled databases like PostGIS and MySQL.

 - SVG-to-WKT supports all SVG elements that directly encode geometric data: ```<circle>```, ```<ellipse>```, ```<line>```, ```<path>```, ```<polygon>```, ```<polyline>```, and ```<rect>```. SVG styles are ignored, since WKT has no notion of presentation, only shape.

 - SVG paths are converted to frozen WKT polygons using the browser's ```getPointAtLength``` method on ```<path>``` elements. Curves are interpolated at a customizable density level and written as a series of fixed points.

 - All point coordinates are reflected over the Y-axis so that geometries created in standard documents (where the Y-axis increases "south," towards the bottom of the screen) keep the same orientation when rendered against spatial coordinate systems (where the Y-axis increases to the north).

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

### Methods

* **[convert](#convert)**
* [line](#line)
* [polyline](#polyline)
* [polygon](#polygon)
* [rect](#rect)
* [circle](#circle)
* [ellipse](#ellipse)
* [path](#path)

### Settings

* [PRECISION](#PRECISION)
* [DENSITY](#DENSITY)

---

<a name="convert" />
### SVGtoWKT.convert(svg)

Converts an SVG document into a WKT string.

__Arguments__

* {String} **svg** - A valid SVG document.

__Returns__

* {String} **wkt** - A WKT ```GEOMETRYCOLLECTION```.

__Example__

```js
SVGtoWKT.convert('<svg><polygon points="1,2 3,4 5,6" /><line x1="7" y1="8" x2="9" y2="10" /></svg>');
>>> "GEOMETRYCOLLECTION(POLYGON((1 2,3 4,5 6,1 2)),LINESTRING(7 8,9 10))"
```

---

<a name="line" />
### SVGtoWKT.line(x1, y1, x2, y2)

Constructs a WKT ```LINESTRING``` element from two points.

__Arguments__

* {Number} **x1** - The X coordinate of the start point.
* {Number} **y1** - The Y coordinate of the start point.
* {Number} **x2** - The X coordinate of the end point.
* {Number} **y2** - The Y coordinate of the end point.

__Returns__

* {String} **wkt** - A WKT ```LINESTRING```.

__Example__

```js
SVGtoWKT.line(1, 2, 3, 4);
>>> "LINESTRING(1 2,3 4)"
```

---

<a name="polyline" />
### SVGtoWKT.polyline(points)

Constructs a WKT ```LINESTRING``` element from the value of the ```points``` attribute on a SVG ```polyline``` element.

__Arguments__

* {String} **points** - The value of the ```points``` attribute on a SVG ```polyline``` element.

__Returns__

* {String} **wkt** - A WKT ```LINESTRING```.

__Example__

```js
SVGtoWKT.polyline('1,2 3,4');
>>> "LINESTRING(1 2,3 4)"
```

---

<a name="polygon" />
### SVGtoWKT.polygon(points)

Constructs a WKT ```POLYGON``` element from the value of the ```points``` attribute on a SVG ```polygon``` element.

__Arguments__

* {String} **points** - The value of the ```points``` attribute on a SVG ```polygon``` element.

__Returns__

* {String} **wkt** - A WKT ```POLYGON```.

__Example__

```js
SVGtoWKT.polygon('1,2 3,4');
>>> "POLYGON((1 2,3 4,1 2))"
```

---

<a name="rect" />
### SVGtoWKT.rect(x, y, width, height, rx, ry)

Constructs a WKT ```POLYGON``` element from the coordinates of the top-left corner of a rectangle and the height/width.

__Arguments__

* {Number} **x** - The X coordinate of the top-left corner.
* {Number} **y** - The Y coordinate of the top-left corner.
* {Number} **width** - The width of the rectangle.
* {Number} **height** - The height of the rectangle.
* {Number} **rx** (UNIMPLEMENTED) - The horizontal border radius.
* {Number} **ry** (UNIMPLEMENTED) - The vertical border radius.

__Returns__

* {String} **wkt** - A WKT ```POLYGON```.

__Example__

```js
SVGtoWKT.rect(1, 2, 3, 4);
>>> "POLYGON((1 2,4 2,4 6,1 6,1 2))"
```

---

<a name="circle" />
### SVGtoWKT.circle(cx, cy, r, density)

Constructs a WKT ```POLYGON``` element from a circle center point and radius.

__Arguments__

* {Number} **cx** - The center X coordinate.
* {Number} **cy** - The center Y coordinate.
* {Number} **r** - The radius.
* {Number} **density** (optional, defaults to 1) - The number of ```POLYGON``` points that should be rendered per unit of linear pixel length. Higher density results in more points, higher resolution.

__Returns__

* {String} **wkt** - A WKT ```POLYGON```.

__Example__

```js
SVGtoWKT.circle(0, 0, 10);
>>> "POLYGON((10 0,9.95 0.996,9.802 1.981,9.556 2.948,9.215 3.884,8.782 4.783,8.262 5.633,7.66 6.428,6.982 7.159,6.235 7.818,5.425 8.4,4.562 8.899,3.653 9.309,2.708 9.626,1.736 9.848,0.747 9.972,-0.249 9.997,-1.243 9.922,-2.225 9.749,-3.185 9.479,-4.113 9.115,-5 8.66,-5.837 8.119,-6.617 7.498,-7.331 6.802,-7.971 6.038,-8.533 5.214,-9.01 4.339,-9.397 3.42,-9.691 2.468,-9.888 1.49,-9.988 0.498,-9.988 -0.498,-9.888 -1.49,-9.691 -2.468,-9.397 -3.42,-9.01 -4.339,-8.533 -5.214,-7.971 -6.038,-7.331 -6.802,-6.617 -7.498,-5.837 -8.119,-5 -8.66,-4.113 -9.115,-3.185 -9.479,-2.225 -9.749,-1.243 -9.922,-0.249 -9.997,0.747 -9.972,1.736 -9.848,2.708 -9.626,3.653 -9.309,4.562 -8.899,5.425 -8.4,6.235 -7.818,6.982 -7.159,7.66 -6.428,8.262 -5.633,8.782 -4.783,9.215 -3.884,9.556 -2.948,9.802 -1.981,9.95 -0.996,10 0))"
```

---

<a name="ellipse" />
### SVGtoWKT.ellipse(cx, cy, rx, ry, density)

Constructs a WKT ```POLYGON``` element from a ellipse center point, horizontal radius, and vertical radius.

__Arguments__

* {Number} **cx** - The center X coordinate.
* {Number} **cy** - The center Y coordinate.
* {Number} **rx** - The horizontal radius.
* {Number} **ry** - The vertical radius.
* {Number} **density** (optional, defaults to 1) - The number of ```POLYGON``` points that should be rendered per unit of linear pixel length. Higher density results in more points, higher resolution.

__Returns__

* {String} **wkt** - A WKT ```POLYGON```.

__Example__

```js
SVGtoWKT.ellipse(0, 0, 10, 20);
>>> "POLYGON((10 0,9.98 1.268,9.92 2.532,9.819 3.785,9.679 5.023,9.501 6.241,9.284 7.433,9.029 8.596,8.738 9.724,8.413 10.813,8.053 11.858,7.66 12.856,7.237 13.802,6.785 14.692,6.306 15.523,5.801 16.292,5.272 16.995,4.723 17.629,4.154 18.193,3.569 18.683,2.969 19.098,2.358 19.436,1.736 19.696,1.108 19.877,0.476 19.977,-0.159 19.997,-0.792 19.937,-1.423 19.796,-2.048 19.576,-2.665 19.277,-3.271 18.9,-3.863 18.447,-4.441 17.92,-5 17.321,-5.539 16.651,-6.056 15.915,-6.549 15.115,-7.015 14.254,-7.453 13.335,-7.861 12.363,-8.237 11.341,-8.58 10.274,-8.888 9.165,-9.161 8.019,-9.397 6.84,-9.595 5.635,-9.754 4.406,-9.874 3.16,-9.955 1.901,-9.995 0.635,-9.995 -0.635,-9.955 -1.901,-9.874 -3.16,-9.754 -4.406,-9.595 -5.635,-9.397 -6.84,-9.161 -8.019,-8.888 -9.165,-8.58 -10.274,-8.237 -11.341,-7.861 -12.363,-7.453 -13.335,-7.015 -14.254,-6.549 -15.115,-6.056 -15.915,-5.539 -16.651,-5 -17.321,-4.441 -17.92,-3.863 -18.447,-3.271 -18.9,-2.665 -19.277,-2.048 -19.576,-1.423 -19.796,-0.792 -19.937,-0.159 -19.997,0.476 -19.977,1.108 -19.877,1.736 -19.696,2.358 -19.436,2.969 -19.098,3.569 -18.683,4.154 -18.193,4.723 -17.629,5.272 -16.995,5.801 -16.292,6.306 -15.523,6.785 -14.692,7.237 -13.802,7.66 -12.856,8.053 -11.858,8.413 -10.813,8.738 -9.724,9.029 -8.596,9.284 -7.433,9.501 -6.241,9.679 -5.023,9.819 -3.785,9.92 -2.532,9.98 -1.268,10 0))"
```

---

<a name="path" />
### SVGtoWKT.path(d, density)

Constructs a WKT ```POLYGON``` element from a SVG path string. If the path has "holes" - closed paths inside of closed paths (eg, letters) - they are translated to the WKT subtracted-polygon syntax (```POLYGON((outerX1 outerY1,...),(innerX1 innerY1,...))```).

__Arguments__

* {Number} **d** - A SVG path string, usually from the ```d``` attribute on a ```<path>``` element.
* {Number} **density** (optional, defaults to 1) - The number of ```POLYGON``` points that should be rendered per unit of linear pixel length. Higher density results in more points, higher resolution.

__Returns__

* {String} **wkt** - A WKT ```POLYGON```.

__Example__

```js
SVGtoWKT.path('M10 10 C 20 20, 40 20, 50 10Z');
>>> "POLYGON((10 10,10.722 10.689,11.474 11.344,12.255 11.964,13.062 12.551,13.894 13.102,14.747 13.62,15.62 14.103,16.51 14.552,17.417 14.968,18.339 15.35,19.273 15.7,20.219 16.018,21.175 16.304,22.139 16.558,23.112 16.782,24.09 16.974,25.075 17.137,26.064 17.269,27.056 17.371,28.051 17.443,29.048 17.486,30.045 17.5,31.043 17.484,32.04 17.438,33.035 17.363,34.027 17.258,35.015 17.123,35.999 16.958,36.977 16.763,37.949 16.536,38.913 16.279,39.868 15.99,40.813 15.67,41.746 15.317,42.666 14.931,43.571 14.512,44.461 14.06,45.332 13.574,46.183 13.053,47.012 12.498,47.817 11.909,48.595 11.285,49.345 10.627,49.909 10,48.911 10,47.914 10,46.916 10,45.918 10,44.92 10,43.923 10,42.925 10,41.927 10,40.929 10,39.932 10,38.934 10,37.936 10,36.939 10,35.941 10,34.943 10,33.945 10,32.948 10,31.95 10,30.952 10,29.954 10,28.957 10,27.959 10,26.961 10,25.964 10,24.966 10,23.968 10,22.97 10,21.973 10,20.975 10,19.977 10,18.98 10,17.982 10,16.984 10,15.986 10,14.989 10,13.991 10,12.993 10,11.995 10,10.998 10))"
```

---

<a name="PRECISION" />
### SVGtoWKT.PRECISION

The value used to determine the number of decimal places computed during point interpolation while converting ```<circle>```, ```<ellipse>```, and ```<path>``` elements. The default value is 3.

__Example__

```js
// With 2 decimal places:
SVGtoWKT.PRECISION = 2;
SVGtoWKT.circle(0, 0, 1);
>>> "POLYGON((1 0,0.5 0.87,-0.5 0.87,-1 0,-0.5 -0.87,0.5 -0.87,1 0))"

// With 5 decimal places:
SVGtoWKT.PRECISION = 5;
SVGtoWKT.circle(0, 0, 1);
>>> "POLYGON((1 0,0.5 0.86603,-0.5 0.86603,-1 0,-0.5 -0.86603,0.5 -0.86603,1 0))"
```

---

<a name="DENSITY" />
### SVGtoWKT.DENSITY

The value used to determine the number of points to interpolate per linear pixel of path distance while converting ```<circle>```, ```<ellipse>```, and ```<path>``` elements. The default value is 1.

__Arguments__

* {Number} **density** - The number of points per linear pixel of distance.

__Example__

```js
// 1 point per pixel.
SVGtoWKT.DENSITY = 1;
SVGtoWKT.circle(0, 0, 1);
>>> "POLYGON((1 0,0.5 0.866,-0.5 0.866,-1 0,-0.5 -0.866,0.5 -0.866,1 0))"

// 2 points per pixel (more points).
SVGtoWKT.DENSITY = 2;
SVGtoWKT.circle(0, 0, 1);
>>> "POLYGON((1 0,0.885 0.465,0.568 0.823,0.121 0.993,-0.355 0.935,-0.749 0.663,-0.971 0.239,-0.971 -0.239,-0.749 -0.663,-0.355 -0.935,0.121 -0.993,0.568 -0.823,0.885 -0.465,1 0))"

// 0.5 points per pixel (fewer points).
SVGtoWKT.DENSITY = 0.5;
SVGtoWKT.circle(0, 0, 1);
>>> "POLYGON((1 0,-0.5 0.866,-0.5 -0.866,1 0))"
```

---

## Credits

The ```path``` method follows the approach described by Guilherme Mussi on his blog: "[Converting SVG paths to polygons](http://whaticode.com/2012/02/01/converting-svg-paths-to-polygons)."

This document follows the layout used by Caolan McMahon ([caolan](https://github.com/caolan)) in projects like [async](https://github.com/caolan/async).
