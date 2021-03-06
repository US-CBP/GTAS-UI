<!--
 All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).

 Please see license.txt for details.
-->

**The component is in-progress, currently stubbed with mock French data.**

Xl8 Translate examples:

Expecting to have it handle translations at the component level so that any child components containing an **`xid`** and an **`xname`** prop are handled without requiring their own xl8 tags. This will simplify the code, but further testing needs to be done to see how it impacts performance and upcoming features like Suspense and code splitting.

```js
import LabelledInput from "../labelledInput/LabelledInput.js";
import Checkbox from "../inputs/checkbox/Checkbox.js";
import "./Xl8.css";
// import "../../i18n";
import "../../locales/en/translation.json";
import "../../locales/fr/translation.json";
import { Suspense } from "react";

const cb = () => {};

<section className="section card message is-primary">
  <Suspense fallback="loading">
    <Xl8>
      <div>
        <Checkbox
          name="cb1"
          inputtype="checkbox"
          xid="1"
          xname="inputval"
          inputval="Mangoes"
          callback={cb}
        />
        <div>
          <LabelledInput
            name="chkboxfield"
            callback={cb}
            xid="xx"
            xname="inputval"
            inputtype="checkbox"
            inputval="Strawberry (not translated)"
            alt="Checkbox is available"
            selected="true"
          />
        </div>
        <Checkbox
          name="cb2"
          inputtype="checkbox"
          xid="2"
          xname="inputval"
          inputval="Carrots"
          callback={cb}
        />
        <Checkbox
          name="cb3"
          inputtype="checkbox"
          xid="3"
          xname="inputval"
          inputval="Onions"
          callback={cb}
          selected="true"
        />
      </div>
    </Xl8>
    <br />
    <Xl8>
      <div>
        <LabelledInput
          name="txtfield"
          className="checkbox"
          xid="x"
          xname="labelText"
          callback={cb}
          alt="text input field"
          labelText="This text will not be translated"
          inputtype="text"
          inputval=" the xid is invalid"
          selected="true"
        />
        <br />
        <Checkbox
          name="r1"
          inputtype="radio"
          xid="4"
          xname="inputval"
          inputval="Green"
          callback={cb}
        />
        <Checkbox
          name="r2"
          inputtype="radio"
          xid="5"
          xname="inputval"
          inputval="Yellow"
          callback={cb}
        />
        <Checkbox
          name="r3"
          inputtype="radio"
          xid="6"
          xname="inputval"
          inputval="Blue"
          callback={cb}
          selected="true"
        />
      </div>
    </Xl8>
  </Suspense>
</section>;
```

---

---
