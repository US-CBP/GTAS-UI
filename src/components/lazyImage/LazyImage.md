<!--
 All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).

 Please see license.txt for details.
-->

** LazyImage handles lazy loading of images in the public folder under root **

It currently handles images for the LK types defined in /utils/constants. The type prop
must resolve to one of the LK types, currently "carrier" or "country", and the key must resolve
to the id field of the type, eg the IATA code.

FlightBadge example:

```js
<div>
  <LazyImage val="UA" type="carrier"></LazyImage>
</div>
```

---

---
