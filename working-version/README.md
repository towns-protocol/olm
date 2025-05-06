# working version

It was built using -sMODULARIZE=1, -sEXPORT_ES6=1, with manual changes to olm_pre.js (node uses crypto, browser uses window.crypto)

It was builded twice. One set of changes was to add -sENVIRONMENT=web,worker and olm_pre.js was changed to use window.crypto.
The other set of changes was to add -sENVIRONMENT=node and olm_pre.js was changed to use nodeCrypto.

Then, I pasted the olm_web.mjs and olm_node.mjs into the pls_work folder and changed the package.json to use the new files.

# issues of this version

Types.

Usage looks like the following:

```js
import initOlm from "./olm_web.mjs";

const olm = await initOlm();
const account = new olm.Account();
```

That's horrible.

I want to do this:

```js
import { Account, initAsync, Session, ... } from "./olm_web.mjs";

await initAsync();
const account = new Account();
```

or

```js
import * as Olm from "./olm_web.mjs";

await Olm.initAsync();
const account = new Olm.Account();
```
