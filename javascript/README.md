# @towns-protocol/olm

> This package only exports ESM modules.

Note: before using any of the olm functions, you must call `initAsync()`, and
wait for the promise to resolve, otherwise you will get errors like:
`Uncaught TypeError: Olm.Account is not a constructor`

Example:

```js
import { initAsync, Account, Session } from "@towns-protocol/olm";
initAsync();

const alice = new Account();
alice.create();

const bob = new Account();
bob.create();
bob.generate_one_time_keys(1);

const bobs_id_keys = JSON.parse(bob.identity_keys());
const bobs_id_key = bobs_id_keys.curve25519;

let bobs_ot_key;
for (const key in bobs_ot_keys.curve25519) {
  bobs_ot_key = bobs_ot_keys.curve25519[key];
}

const alice_session = new Session();
alice_session.create_outbound(alice, bobs_id_key, bobs_ot_key);
const alice_message = alice_session.encrypt("Hello");

const bob_session = new Session();
bob_session.create_inbound(bob, alice_message);
const plaintext = bob_session.decrypt(alice_message.type, alice_message);
bob.remove_one_time_keys(bob_session);
```

Group chat:

```js
import {
  initAsync,
  OutboundGroupSession,
  InboundGroupSession,
} from "@towns-protocol/olm";
initAsync();

const outbound_session = new OutboundGroupSession();
outbound_session.create();

// exchange these over a secure channel
const session_id = group_session.session_id();
const session_key = group_session.session_key();
const message_index = group_session.message_index();

const inbound_session = new InboundGroupSession();
inbound_session.create(message_index, session_key);

const ciphertext = outbound_session.encrypt("Hello");
const plaintext = inbound_session.decrypt(ciphertext);
```
