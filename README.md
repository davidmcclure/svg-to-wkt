# SVG-to-WKT.js

SVG-to-WKT converts [SVG](https://developer.mozilla.org/en-US/docs/SVG) (Scalable Vector Graphics) geometry data and XML documents into [WKT](http://en.wikipedia.org/wiki/Well-known_text) (Well-Known Text), a markup language for representing vector geometry on maps implemented by spatially-enabled databases like PostGIS and MySQL.

SVG-to-WKT implements 7 of the 10 SVG graphic elements: ```<circle>```, <ellipse>, <line>, <path>, <polygon>, <polyline>, and <rect>. <image>, <text>, and <use>, which do not encode geometric data, are not parsed. SVG styles are ignored, since WKT has no notion of appearance, only shape.

SVG paths are converted to WKT POLYGONs using the getPointAtLength() method on <path> elements.

## Quick Example

```javascript
SVGtoWKT.convert('<svg><polygon points="1,2 3,4 5,6" /></svg>');

>>> "GEOMETRYCOLLECTION(POLYGON((1 2,3 4,5 6,1 2)))"
```

## In the Browser

## Documentation

* [convert](#convert)
* [line](#line)
* [polyline](#polyline)
* [rect](#rect)
* [circle](#circle)
* [ellipse](#ellipse)
* [path](#path)
