<!--
 All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).

 Please see license.txt for details.
-->

Checkbox and Radio examples:

```js
import Checkbox from "./Checkbox.js";

const cb = () => {};

<section className="section card message is-info">
  <div>
    <Checkbox
      name="cb1"
      inputtype="checkbox"
      alt="cb1"
      inputval="Mangoes"
      callback={cb}
    />
    <Checkbox
      name="cb2"
      inputtype="checkbox"
      alt="cb2"
      inputval="Carrots"
      callback={cb}
    />
    <Checkbox
      name="cb3"
      inputtype="checkbox"
      alt="cb3"
      inputval="Onions"
      callback={cb}
      selected="true"
    />
  </div>
  <br />
  <div>
    <Checkbox name="r1" inputtype="radio" alt="r1" inputval="Orange" callback={cb} />
    <Checkbox name="r2" inputtype="radio" alt="r2" inputval="Yellow" callback={cb} />
    <Checkbox
      name="r3"
      inputtype="radio"
      alt="r3"
      inputval="Blue"
      callback={cb}
      selected="true"
    />
  </div>
</section>;
```

---

---
