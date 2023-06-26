## ORDIT SDK
##### Wallet SDK for Bitcoin Ordinals & Inscriptions
----------------------------------------------------

The ordit JavaScript SDK provides the following __async__ `get` function:

* [ordit.sdk.get](#get-method-options-) - used to asyncronously access all wallet functions

It can access the following functions by utilizing the appropriate method:

* [ordit.sdk.wallet.get](#walletget-options-callback-) - returns a wallet object without balances
* [ordit.sdk.balance.get](#balanceget-options-callback-) - returns a wallet object after collecting balances
* [ordit.sdk.psbt.get](#psbtget-options-callback-) - used to construct unsigned PSBTs
* [ordit.sdk.txid.get](#txidget-options-callback-) - used to relay signed PSBTs

All functions other than `wallet.get` and `psbt.get` utilize the Ordit API, which exposes a single function:

* [ordit.sdk.api](#api-options-callback-) - used to access the Ordit API

The ordit JavaScript SDK also provides the following __async__ `sign` function:

* [ordit.sdk.sign](#sign-method-options-) - used to asyncronously access all sign functions

It can access the following `sign` functions by utilizing the appropriate method:

* [ordit.sdk.message.sign](#messagesign-options-callback-) - signs a text message
* [ordit.sdk.psbt.sign](#psbtsign-options-callback-) - used to sign PSBTs

The ordit JavaScript SDK also provides the following __async__ `inscribe` function:

* [ordit.sdk.inscribe](#inscribe-method-options-) - used to asyncronously access all wallet functions

It can access the following `inscription` functions by utilizing the appropriate method:

* [ordit.inscription.address](#inscriptionaddress-options-callback-) - used to generate commit addresses
* [ordit.inscription.psbt](#inscriptionpsbt-options-callback-) - used to generate reveal PSBTs

More detailed documentation regarding the Ordit API is available on [GitHub](https://github.com/sadoprotocol/utxo-api/blob/2a06b053759d9666c471d92708c35ab152180cf0/docs/README.md).

For more documentation regarding the SADO protocol, please visit [sado.space](https://sado.space).

------------------------------------------------------------------------

__If accessing this from our website, all examples can be tested using browser consoles.__

```
GETTING STARTED: 
----------------
TO BE IMPROVED WITH FULL NODEJS COMPATABILITY AND NPM MODULES SOON

TODO:
-----
PROVIDE MESSAGE SIGN AND MESSAGE VERIFY FUNCTIONS
ENABLE SPECIFIC UTXO SEND FUNCTIONALITY
ADD SUPPORT FOR HIRO (ADDRESSES ONLY)
INTEGRATE WITH SADO SDK
SUPPORT OIP-1 & OIP-2
```

For now, in order to get started, you would need to manually include the [SDK](https://github.com/sadoprotocol/ordit.io/blob/master/js/ordit/ordit-sdk.js) within your project.

If you visit the SDK [source code](https://github.com/sadoprotocol/ordit.io/blob/master/js/ordit/ordit-sdk.js), it will also highlight the necessary dependencies.

------------------------------
### get( `method`, `options` )
------------------------------

The async `get` function supports the following methods:

* __wallet__
* __balance__
* __tx__
* __signature__
* __txid__

It can be used as follows:

```
const wallet = await ordit.sdk.get('wallet', {seed: 'msmalley'});
console.log(wallet);
```

This would ultimately output the same results as (but without needing to use callbacks):

```
ordit.sdk.wallet.get({
    seed: 'msmalley' // extremely insecure example for testing only
}, function(r){console.log(r)});
```

------------------------------
### sign( `method`, `options` )
------------------------------

The async `sign` function supports the following methods:

* __message__
* __psbt__

It can be used as follows:

```
const signature = await ordit.sdk.sign('message', {seed: 'msmalley', message: 'Hello World'});
console.log(signature);
```

This would ultimately output the same results as (but without needing to use callbacks):

```
ordit.sdk.message.sign({
    connect: 'msmalley',
    message: 'Hello World'
}, function(r){console.log(r)});
```

-----------------------------------
### inscribe( `method`, `options` )
-----------------------------------

The async `inscribe` function supports the following methods:

* __address__
* __psbt__

It can be used as follows:

```
const psbt = await ordit.sdk.inscribe(
    'psbt', 
    {
        seed: 'msmalley', 
        media_content: 'Hello World', 
        destination: 'mz8CUX3TKRNf9ka77X242fWUtQhQAumxUN'
    }
);
console.log(psbt);
```

This would ultimately output the same results as (but without needing to use callbacks):

```
ordit.sdk.inscription.psbt({
    seed: 'msmalley',
    media_content: 'Hello World'
}, function(r){console.log(r)});
```

---------------------------------------
### wallet.get( `options`, `callback` )
---------------------------------------

The default options object for `wallet.get` is:

```
var options = 
{
    // only one of the following four inputs is required

    seed: false, // any string from any source
    bip39: false, // 24 word recovery key string
    key: false, // 32 or 33 byte public key hex
    connect: false, // either unisat or xverse
    
    // optionally included or modified as required 

    network: 'testnet', // can also be mainnet or regtest
    format: 'all', // can also be p2pkh, p2sh, p2wpkh or p2tr
    path: false, // an optinal array of integers for HD derivation
};
```

An example of how to use the `wallet.get` function:

```
ordit.sdk.wallet.get({
    seed: 'msmalley' // extremely insecure example for testing only
}, function(r){console.log(r)});
```
This would `console.log` the following results:

```
{
  "success": true,
  "message": "Wallet attached to data",
  "data": {
    "counts": {
      "addresses": 4
    },
    "keys": [
      {
        "pub": "02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab",
        "hd": "tpubD6NzVbkrYhZ4YHobReHyfBtzLyvGo67Y6CekqHb8xpMUSxAdW5Rt1Ke6xRRxMy1nMCnpnQTv4xXEim5WZdoG2V6UV4X2SFByHQCSSJTQfN8",
        "bip39": "guilt canyon beach panel cancel become present coin logic bring bacon casual session during sadness staff stove scorpion meat hybrid lunar apple scrap young"
      }
    ],
    "addresses": [
      {
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "format": "legacy"
      },
      {
        "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
        "format": "segwit"
      },
      {
        "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
        "format": "bech32"
      },
      {
        "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
        "xkey": "e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab",
        "format": "taproot"
      }
    ]
  }
}
```
Worth noting that this method also produces a BIP39 24 word recovery phase that can also be used as an input as follows:

```
ordit.sdk.wallet.get({
    bip39: 'guilt canyon beach panel cancel become present coin logic bring bacon casual session during sadness staff stove scorpion meat hybrid lunar apple scrap young'
}, function(r){console.log(r)})
```

Using a `seed` or a `bip39` recovery phase is a dangerous practise as both represent `private` keys.

Sharing your `seed` or your `bip39` recovery words could results in `loss of funds`.

Using BIP39 as shown above would `console.log` the following results:

```
{
  "success": true,
  "message": "Wallet attached to data",
  "data": {
    "counts": {
      "addresses": 4
    },
    "keys": [
      {
        "pub": "02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab",
        "hd": "tpubD6NzVbkrYhZ4YHobReHyfBtzLyvGo67Y6CekqHb8xpMUSxAdW5Rt1Ke6xRRxMy1nMCnpnQTv4xXEim5WZdoG2V6UV4X2SFByHQCSSJTQfN8"
      }
    ],
    "addresses": [
      {
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "format": "legacy"
      },
      {
        "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
        "format": "segwit"
      },
      {
        "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
        "format": "bech32"
      },
      {
        "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
        "xkey": "e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab",
        "format": "taproot"
      }
    ]
  }
}
```

However, it is not recommended that `seed` or `bip39` be used for anything other than testing.

They can be `extremely dangerous and result in lost funds` if not handled properly.

---

A `secure example` of how to use the `wallet.get` function is with `public keys` as follows:

```
ordit.sdk.wallet.get({
    key: '02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab'
}, function(r){console.log(r)});
```
This would `console.log` the following results:

```
{
  "success": true,
  "message": "Wallet attached to data",
  "data": {
    "counts": {
      "addresses": 4
    },
    "keys": [
      {
        "pub": "02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab"
      }
    ],
    "addresses": [
      {
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "format": "legacy"
      },
      {
        "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
        "format": "segwit"
      },
      {
        "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
        "format": "bech32"
      },
      {
        "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
        "xkey": "e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab",
        "format": "taproot"
      }
    ]
  }
}
```

Notice that if you use a 32 byte public key as follows:
```
ordit.sdk.wallet.get({
    key: 'e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab'
}, function(r){console.log(r)})
```
Only one of the addresses can be returned:

```
{
  "success": true,
  "message": "Wallet attached to data",
  "data": {
    "counts": {
      "addresses": 1
    },
    "keys": [
      {
        "pub": "e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab"
      }
    ],
    "addresses": [
      {
        "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
        "xkey": "e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab",
        "format": "taproot"
      }
    ]
  }
}
```

Similar results can be obtained with a full 33 byte public key by also specifying a specific format as follows:

```
ordit.sdk.wallet.get({
    key: '02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab',
    format: 'p2tr'
}, function(r){console.log(r)});
```

This would `console.log` the following results:

```
{
  "success": true,
  "message": "Wallet attached to data",
  "data": {
    "counts": {
      "addresses": 1
    },
    "keys": [
      {
        "pub": "02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab"
      }
    ],
    "addresses": [
      {
        "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
        "xkey": "e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab",
        "format": "taproot"
      }
    ]
  }
}
```

This same function can also be used to `connect` to external wallets as follows:

```
ordit.sdk.wallet.get({
    connect: 'unisat'
}, function(r){console.log(r)})
```

We currently support the following external wallet `extensions`:

* [Unisat](https://unisat.io/download)
* [xVerse](https://www.xverse.app/download)

The example above using `unisat` would `console.log` the following results:

```
{
    "success": true,
    "message": "Wallet attached to data",
    "data": {
        "counts": {
            "addresses": 1
        },
        "keys": [
            {
                "pub": "0207f591c4be9bfbe6a854869a088e6b763d4929559539e02cac08602d2fcdd2c3",
                "address": "tb1pkm9feqn9zthkqjj9e6xlvhuyx27kdw4wzf8teay8cvgexh3jgtjsc7p9xx",
                "format": "taproot"
            }
        ],
        "addresses": [
            {
                "pub": "0207f591c4be9bfbe6a854869a088e6b763d4929559539e02cac08602d2fcdd2c3",
                "address": "tb1pkm9feqn9zthkqjj9e6xlvhuyx27kdw4wzf8teay8cvgexh3jgtjsc7p9xx",
                "format": "taproot"
            }
        ]
    }
}
```

It is worth noticing that the keys field includes an address, which are only included with externally connected wallets and help to signify the different formats supported by the available keys. Unisat does not support 3 of the 4 addresses that can be generated by it's active account and full 33 byte public key.

However the same function for `xverse` can access multiple accounts as seen in the following results:

```
{
    "success": true,
    "message": "Wallet attached to data",
    "data": {
        "counts": {
            "addresses": 2
        },
        "keys": [
            {
                "pub": "e60aa5a5eeb26aef91da79c1ae20dc909cfcafb940576ef172d7ba6759c4e0fb",
                "address": "tb1p4jm9rryugjrkv698r0aqldfg5znsyhvcmy3t4ht5menevg7ztvqq38q585",
                "format": "taproot"
            },
            {
                "pub": "0206adb92984af8fae3b2b3e7b6411c465c31f83df615110460d54b755916f8ae0",
                "address": "2MzUyvBhr5jJJKZKHnN2KCMDxYsALQoXQ5x",
                "format": "segwit"
            }
        ],
        "addresses": [
            {
                "pub": "e60aa5a5eeb26aef91da79c1ae20dc909cfcafb940576ef172d7ba6759c4e0fb",
                "address": "tb1p4jm9rryugjrkv698r0aqldfg5znsyhvcmy3t4ht5menevg7ztvqq38q585",
                "format": "taproot"
            },
            {
                "pub": "0206adb92984af8fae3b2b3e7b6411c465c31f83df615110460d54b755916f8ae0",
                "address": "2MzUyvBhr5jJJKZKHnN2KCMDxYsALQoXQ5x",
                "format": "segwit"
            }
        ]
    }
}
```

As seen above, if different keys are used to generate different accounts there will be multiple keys returned.

The `xverse` connect function also has an optional `payload` option for updating the wallet UX as seen below:

```
ordit.sdk.wallet.get({
    connect: 'unisat',
    payload:
    {
        message: 'PLEASE SIGN ME'
    }
}, function(r){console.log(r)})
```

![XVERSE CONNECT WITH MESSAGE](../img/docs/xverse-message.png)

----------------------------------------
### balance.get( `options`, `callback` )
----------------------------------------

The `balance.get` function internally requires a wallet object generated using the same options as `wallet.get`, with the only difference then being that API calls will be made in order to lookup the balances of the addresses.

An example on how to use the balance function:

```
ordit.sdk.balance.get({
    key: '02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab'
}, function(r){console.log(r)});
```

This would `console.log` the following __extended__ wallet results:

```
{
  "success": true,
  "message": "Wallet balance attached to data",
  "data": {
    "counts": {
      "addresses": 4,
      "unspents": 5,
      "satoshis": 2013251,
      "cardinals": 2003251,
      "spendables": 4,
      "unspendables": 1,
      "ordinals": 5,
      "inscriptions": 1
    },
    "keys": [
      {
        "pub": "02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab"
      }
    ],
    "addresses": [
      {
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "format": "legacy",
        "unspents": [
          {
            "n": 0,
            "txHash": "1aeb94cf504b30f9bd2b9698363f76e82a4097fb88546eea831cebe5f534b03c",
            "blockHash": "000000000000000a7beca55b94cfa0baca28b91e4a588cdf2ffe69b0a4cf28ba",
            "blockN": 2436702,
            "sats": 13143,
            "scriptPubKey": {
              "asm": "OP_DUP OP_HASH160 988586c4efaa40e74e05c22adabc0c4c41d1c947 OP_EQUALVERIFY OP_CHECKSIG",
              "desc": "addr(muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ)#93gcuafy",
              "hex": "76a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac",
              "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
              "type": "pubkeyhash"
            },
            "txid": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de",
            "value": 0.00013143,
            "ordinals": [
              {
                "number": 1449618359923000,
                "decimal": "369847.859923000",
                "degree": "0°159847′919″859923000‴",
                "name": "dotkrtwhdev",
                "height": 369847,
                "cycle": 0,
                "epoch": 1,
                "period": 183,
                "offset": 859923000,
                "rarity": "common",
                "output": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de:0",
                "start": 1449618359923000,
                "size": 13143,
                "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
                "unspent": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de"
              }
            ],
            "inscriptions": [],
            "safeToSpend": true
          },
          {
            "n": 0,
            "txHash": "dc9e180ecf9feb84d5288ee0eaa4e8a4c560087b7654b8752b6d5f58de41dd80",
            "blockHash": "00000000000000085efe08ad8bace9c1920def9245c1ee1c8d7f662bfcf22b3b",
            "blockN": 2436708,
            "sats": 10000,
            "scriptPubKey": {
              "asm": "OP_DUP OP_HASH160 988586c4efaa40e74e05c22adabc0c4c41d1c947 OP_EQUALVERIFY OP_CHECKSIG",
              "desc": "addr(muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ)#93gcuafy",
              "hex": "76a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac",
              "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
              "type": "pubkeyhash"
            },
            "txid": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a",
            "value": 0.0001,
            "ordinals": [
              {
                "number": 1355923107503935,
                "decimal": "332369.607503935",
                "degree": "0°122369′1745″607503935‴",
                "name": "egacfigbocg",
                "height": 332369,
                "cycle": 0,
                "epoch": 1,
                "period": 164,
                "offset": 607503935,
                "rarity": "common",
                "output": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0",
                "start": 1355923107503935,
                "size": 10000,
                "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
                "unspent": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a"
              }
            ],
            "inscriptions": [
              {
                "id": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655ai0",
                "outpoint": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0",
                "owner": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
                "fee": 3440,
                "height": 2436708,
                "number": 8623,
                "sat": 1355923107503935,
                "timestamp": 1686105703,
                "media_type": "image/jpeg",
                "media_size": 868,
                "media_content": "https://testnet.ordit.io/utxo/inscriptions/d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0/d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655ai0/media",
                "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
                "unspent": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a"
              }
            ],
            "safeToSpend": false
          }
        ],
        "counts": {
          "unspents": 2,
          "satoshis": 23143,
          "cardinals": 13143,
          "spendables": 1,
          "unspendables": 1
        }
      },
      {
        "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
        "format": "segwit",
        "unspents": [
          {
            "n": 0,
            "txHash": "718cefacb757ec23b4b9bcf8be9091c281196667f63277e2ae34607ce7fa0e7c",
            "blockHash": "00000000000014d79b36a024ed9fadf6d7a867ada034f9ffaefa42b4f08ecfc9",
            "blockN": 2436701,
            "sats": 10403,
            "scriptPubKey": {
              "asm": "OP_HASH160 4e7f566a98490694b347060ca1f283e0098f3f8c OP_EQUAL",
              "desc": "addr(2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx)#0sl6295x",
              "hex": "a9144e7f566a98490694b347060ca1f283e0098f3f8c87",
              "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
              "type": "scripthash"
            },
            "txid": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309",
            "value": 0.00010403,
            "ordinals": [
              {
                "number": 1443518417160379,
                "decimal": "367407.917160379",
                "degree": "0°157407′495″917160379‴",
                "name": "dpwqebpgzoo",
                "height": 367407,
                "cycle": 0,
                "epoch": 1,
                "period": 182,
                "offset": 917160379,
                "rarity": "common",
                "output": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309:0",
                "start": 1443518417160379,
                "size": 10403,
                "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
                "unspent": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309"
              }
            ],
            "inscriptions": [],
            "safeToSpend": true
          }
        ],
        "counts": {
          "unspents": 1,
          "satoshis": 10403,
          "cardinals": 10403,
          "spendables": 1,
          "unspendables": 0
        }
      },
      {
        "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
        "format": "bech32",
        "unspents": [
          {
            "n": 0,
            "txHash": "094fa2efbef994b89499490126e68df8cb0112e445c97be4de4ef8edce140148",
            "blockHash": "000000000000000a7beca55b94cfa0baca28b91e4a588cdf2ffe69b0a4cf28ba",
            "blockN": 2436702,
            "sats": 1971705,
            "scriptPubKey": {
              "asm": "0 988586c4efaa40e74e05c22adabc0c4c41d1c947",
              "desc": "addr(tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca)#e72wzf75",
              "hex": "0014988586c4efaa40e74e05c22adabc0c4c41d1c947",
              "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
              "type": "witness_v0_keyhash"
            },
            "txid": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c",
            "value": 0.01971705,
            "ordinals": [
              {
                "number": 1542447330099256,
                "decimal": "406978.2330099256",
                "degree": "0°196978′1762″2330099256‴",
                "name": "cxqxamkvhzt",
                "height": 406978,
                "cycle": 0,
                "epoch": 1,
                "period": 201,
                "offset": 2330099256,
                "rarity": "common",
                "output": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c:0",
                "start": 1542447330099256,
                "size": 1971705,
                "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
                "unspent": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c"
              }
            ],
            "inscriptions": [],
            "safeToSpend": true
          }
        ],
        "counts": {
          "unspents": 1,
          "satoshis": 1971705,
          "cardinals": 1971705,
          "spendables": 1,
          "unspendables": 0
        }
      },
      {
        "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
        "xkey": "e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab",
        "format": "taproot",
        "unspents": [
          {
            "n": 0,
            "txHash": "62fca4964bc5615312b6b37ce509a85501be5890312b45de53664dcd43cd7158",
            "blockHash": "00000000000014d79b36a024ed9fadf6d7a867ada034f9ffaefa42b4f08ecfc9",
            "blockN": 2436701,
            "sats": 8000,
            "scriptPubKey": {
              "asm": "1 d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42",
              "desc": "rawtr(d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42)#hxsh0nqe",
              "hex": "5120d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42",
              "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
              "type": "witness_v1_taproot"
            },
            "txid": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b",
            "value": 0.00008,
            "ordinals": [
              {
                "number": 2010231744606749,
                "decimal": "972741.182106749",
                "degree": "0°132741′1029″182106749‴",
                "name": "pmvoidcito",
                "height": 972741,
                "cycle": 0,
                "epoch": 4,
                "period": 482,
                "offset": 182106749,
                "rarity": "common",
                "output": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b:0",
                "start": 2010231744606749,
                "size": 8000,
                "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
                "unspent": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b"
              }
            ],
            "inscriptions": [],
            "safeToSpend": true
          }
        ],
        "counts": {
          "unspents": 1,
          "satoshis": 8000,
          "cardinals": 8000,
          "spendables": 1,
          "unspendables": 0
        }
      }
    ],
    "spendables": [
      {
        "n": 0,
        "txHash": "1aeb94cf504b30f9bd2b9698363f76e82a4097fb88546eea831cebe5f534b03c",
        "blockHash": "000000000000000a7beca55b94cfa0baca28b91e4a588cdf2ffe69b0a4cf28ba",
        "blockN": 2436702,
        "sats": 13143,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 988586c4efaa40e74e05c22adabc0c4c41d1c947 OP_EQUALVERIFY OP_CHECKSIG",
          "desc": "addr(muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ)#93gcuafy",
          "hex": "76a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac",
          "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
          "type": "pubkeyhash"
        },
        "txid": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de",
        "value": 0.00013143,
        "ordinals": [
          {
            "number": 1449618359923000,
            "decimal": "369847.859923000",
            "degree": "0°159847′919″859923000‴",
            "name": "dotkrtwhdev",
            "height": 369847,
            "cycle": 0,
            "epoch": 1,
            "period": 183,
            "offset": 859923000,
            "rarity": "common",
            "output": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de:0",
            "start": 1449618359923000,
            "size": 13143,
            "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
            "unspent": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de"
          }
        ],
        "inscriptions": [],
        "safeToSpend": true
      },
      {
        "n": 0,
        "txHash": "718cefacb757ec23b4b9bcf8be9091c281196667f63277e2ae34607ce7fa0e7c",
        "blockHash": "00000000000014d79b36a024ed9fadf6d7a867ada034f9ffaefa42b4f08ecfc9",
        "blockN": 2436701,
        "sats": 10403,
        "scriptPubKey": {
          "asm": "OP_HASH160 4e7f566a98490694b347060ca1f283e0098f3f8c OP_EQUAL",
          "desc": "addr(2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx)#0sl6295x",
          "hex": "a9144e7f566a98490694b347060ca1f283e0098f3f8c87",
          "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
          "type": "scripthash"
        },
        "txid": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309",
        "value": 0.00010403,
        "ordinals": [
          {
            "number": 1443518417160379,
            "decimal": "367407.917160379",
            "degree": "0°157407′495″917160379‴",
            "name": "dpwqebpgzoo",
            "height": 367407,
            "cycle": 0,
            "epoch": 1,
            "period": 182,
            "offset": 917160379,
            "rarity": "common",
            "output": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309:0",
            "start": 1443518417160379,
            "size": 10403,
            "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
            "unspent": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309"
          }
        ],
        "inscriptions": [],
        "safeToSpend": true
      },
      {
        "n": 0,
        "txHash": "094fa2efbef994b89499490126e68df8cb0112e445c97be4de4ef8edce140148",
        "blockHash": "000000000000000a7beca55b94cfa0baca28b91e4a588cdf2ffe69b0a4cf28ba",
        "blockN": 2436702,
        "sats": 1971705,
        "scriptPubKey": {
          "asm": "0 988586c4efaa40e74e05c22adabc0c4c41d1c947",
          "desc": "addr(tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca)#e72wzf75",
          "hex": "0014988586c4efaa40e74e05c22adabc0c4c41d1c947",
          "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
          "type": "witness_v0_keyhash"
        },
        "txid": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c",
        "value": 0.01971705,
        "ordinals": [
          {
            "number": 1542447330099256,
            "decimal": "406978.2330099256",
            "degree": "0°196978′1762″2330099256‴",
            "name": "cxqxamkvhzt",
            "height": 406978,
            "cycle": 0,
            "epoch": 1,
            "period": 201,
            "offset": 2330099256,
            "rarity": "common",
            "output": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c:0",
            "start": 1542447330099256,
            "size": 1971705,
            "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
            "unspent": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c"
          }
        ],
        "inscriptions": [],
        "safeToSpend": true
      },
      {
        "n": 0,
        "txHash": "62fca4964bc5615312b6b37ce509a85501be5890312b45de53664dcd43cd7158",
        "blockHash": "00000000000014d79b36a024ed9fadf6d7a867ada034f9ffaefa42b4f08ecfc9",
        "blockN": 2436701,
        "sats": 8000,
        "scriptPubKey": {
          "asm": "1 d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42",
          "desc": "rawtr(d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42)#hxsh0nqe",
          "hex": "5120d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42",
          "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
          "type": "witness_v1_taproot"
        },
        "txid": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b",
        "value": 0.00008,
        "ordinals": [
          {
            "number": 2010231744606749,
            "decimal": "972741.182106749",
            "degree": "0°132741′1029″182106749‴",
            "name": "pmvoidcito",
            "height": 972741,
            "cycle": 0,
            "epoch": 4,
            "period": 482,
            "offset": 182106749,
            "rarity": "common",
            "output": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b:0",
            "start": 2010231744606749,
            "size": 8000,
            "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
            "unspent": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b"
          }
        ],
        "inscriptions": [],
        "safeToSpend": true
      }
    ],
    "unspendables": [
      {
        "n": 0,
        "txHash": "dc9e180ecf9feb84d5288ee0eaa4e8a4c560087b7654b8752b6d5f58de41dd80",
        "blockHash": "00000000000000085efe08ad8bace9c1920def9245c1ee1c8d7f662bfcf22b3b",
        "blockN": 2436708,
        "sats": 10000,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 988586c4efaa40e74e05c22adabc0c4c41d1c947 OP_EQUALVERIFY OP_CHECKSIG",
          "desc": "addr(muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ)#93gcuafy",
          "hex": "76a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac",
          "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
          "type": "pubkeyhash"
        },
        "txid": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a",
        "value": 0.0001,
        "ordinals": [
          {
            "number": 1355923107503935,
            "decimal": "332369.607503935",
            "degree": "0°122369′1745″607503935‴",
            "name": "egacfigbocg",
            "height": 332369,
            "cycle": 0,
            "epoch": 1,
            "period": 164,
            "offset": 607503935,
            "rarity": "common",
            "output": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0",
            "start": 1355923107503935,
            "size": 10000,
            "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
            "unspent": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a"
          }
        ],
        "inscriptions": [
          {
            "id": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655ai0",
            "outpoint": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0",
            "owner": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
            "fee": 3440,
            "height": 2436708,
            "number": 8623,
            "sat": 1355923107503935,
            "timestamp": 1686105703,
            "media_type": "image/jpeg",
            "media_size": 868,
            "media_content": "https://testnet.ordit.io/utxo/inscriptions/d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0/d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655ai0/media",
            "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
            "unspent": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a"
          }
        ],
        "safeToSpend": false
      }
    ],
    "ordinals": [
      {
        "number": 1449618359923000,
        "decimal": "369847.859923000",
        "degree": "0°159847′919″859923000‴",
        "name": "dotkrtwhdev",
        "height": 369847,
        "cycle": 0,
        "epoch": 1,
        "period": 183,
        "offset": 859923000,
        "rarity": "common",
        "output": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de:0",
        "start": 1449618359923000,
        "size": 13143,
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "unspent": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de"
      },
      {
        "number": 1355923107503935,
        "decimal": "332369.607503935",
        "degree": "0°122369′1745″607503935‴",
        "name": "egacfigbocg",
        "height": 332369,
        "cycle": 0,
        "epoch": 1,
        "period": 164,
        "offset": 607503935,
        "rarity": "common",
        "output": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0",
        "start": 1355923107503935,
        "size": 10000,
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "unspent": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a"
      },
      {
        "number": 1443518417160379,
        "decimal": "367407.917160379",
        "degree": "0°157407′495″917160379‴",
        "name": "dpwqebpgzoo",
        "height": 367407,
        "cycle": 0,
        "epoch": 1,
        "period": 182,
        "offset": 917160379,
        "rarity": "common",
        "output": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309:0",
        "start": 1443518417160379,
        "size": 10403,
        "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
        "unspent": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309"
      },
      {
        "number": 1542447330099256,
        "decimal": "406978.2330099256",
        "degree": "0°196978′1762″2330099256‴",
        "name": "cxqxamkvhzt",
        "height": 406978,
        "cycle": 0,
        "epoch": 1,
        "period": 201,
        "offset": 2330099256,
        "rarity": "common",
        "output": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c:0",
        "start": 1542447330099256,
        "size": 1971705,
        "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
        "unspent": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c"
      },
      {
        "number": 2010231744606749,
        "decimal": "972741.182106749",
        "degree": "0°132741′1029″182106749‴",
        "name": "pmvoidcito",
        "height": 972741,
        "cycle": 0,
        "epoch": 4,
        "period": 482,
        "offset": 182106749,
        "rarity": "common",
        "output": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b:0",
        "start": 2010231744606749,
        "size": 8000,
        "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
        "unspent": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b"
      }
    ],
    "inscriptions": [
      {
        "id": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655ai0",
        "outpoint": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0",
        "owner": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "fee": 3440,
        "height": 2436708,
        "number": 8623,
        "sat": 1355923107503935,
        "timestamp": 1686105703,
        "media_type": "image/jpeg",
        "media_size": 868,
        "media_content": "https://testnet.ordit.io/utxo/inscriptions/d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0/d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655ai0/media",
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "unspent": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a"
      }
    ]
  }
}
```

-------------------------------------
### psbt.get( `options`, `callback` )
-------------------------------------

The `psbt.get` function internally requires a wallet object generated using the same options as `wallet.get`, with the only difference then being that API calls will be made in order to create a PSBT for signing. The following options are in addition to those needed to generate a wallet object:

```
var extra_options = 
{
    ins: false, // an array of objects containing each address to use for inputs
    outs: false, // an array of objects containing each address and asset to send
}
```

An example on how to `safely` send satoshis using the send function:

```
ordit.sdk.psbt.get({
    key: '02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab', // public key
    ins: [{
        address: 'muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ' // which addresses to use to fill outputs
    }],
    outs: [{
        address: '2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx',
        cardinals: 1000 // can also be either satoshis or location
    }]
}, function(r){console.log(r)});
```

The same thing could also be done using the external wallet `connect` function as follow:

```
ordit.sdk.psbt.get({
    connect: 'unisat', // external wallet
    ins: [{
        address: 'any'
    }],
    outs: [{
        address: '2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx',
        cardinals: 1000 // can also be either satoshis or location
    }]
}, function(r){console.log(r)});
```

In all cases; using `satoshis` or `location` instead of `cardinals` may utilize __un-safe__ unspents.

An `un-safe` unspent (or `unspendable`) is an unspent that is one of the following:

* Contains an inscription
* Cannot be validated due to ord server syncing issues
* Contains an ordinal with a rarity other than common (by default)

This example demonstrates how to construct an un-spendable transaction as an alternative to message signing:

```
var op_return = { data: 'Proof I own this Ordinal! };
var inscription = { location: 'd0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0' };

ordit.sdk.psbt.get({
    key: '02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab', // public key
    ins: [inscription],
    outs: [op_return]
}, function(r){console.log(r)});

```

Whereas this example would transfer a specific unspent (which may contain inscriptions) to another address:

```
var action = { address: 'any' };
var location = 'd0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0';

ordit.sdk.psbt.get({
    key: '02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab', // public key
    ins: [action],
    outs: [{
        address: '2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx',
        location: location // can also be either cardinals or satoshis
    }]
}, function(r){console.log(r)});
```

All transaction types would ultimately `console.log` results similar to the following:

```
{
  "success": true,
  "message": "Unsigned PSBT formats attached to data",
  "data": {
    "hex": "70736274ff0100750200000001dea02c780838cbf3a6c735e3c4d9a35f3e097824c87f1a495c668a2d26ba4c390000000000ffffffff02e80300000000000017a9144e7f566a98490694b347060ca1f283e0098f3f8c8727090000000000001976a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac00000000000100fb02000000000101f7ae03f55006b6e22bcd9d8b5733112f6aa529433c300d7cafcf16d98339faf5010000001716001435c419842725ea473bb226c36bd9314dcc80c5bafeffffff0257330000000000001976a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac16042900000000001976a914b613d68ad49a98548ef5d9a13dfe3acd7e30511488ac02473044022022b3ada4611afca3817e9b844fe51b54c3717d48ddfab8ea7272c2f8429d0ad10220748b2bfb759be878423fb6f2cb5e0269a251d6eb23ff6c7f3626ad52ff7a67f7012102694990a00d91fd79101846b055c57560e5b2fb736ce31865e8963ffcbacacfbe5d2e2500000000",
    "base64": "cHNidP8BAHUCAAAAAd6gLHgIOMvzpsc148TZo18+CXgkyH8aSVxmii0mukw5AAAAAAD/////AugDAAAAAAAAF6kUTn9WaphJBpSzRwYMofKD4AmPP4yHJwkAAAAAAAAZdqkUmIWGxO+qQOdOBcIq2rwMTEHRyUeIrAAAAAAAAQD7AgAAAAABAfeuA/VQBrbiK82di1czES9qpSlDPDANfK/PFtmDOfr1AQAAABcWABQ1xBmEJyXqRzuyJsNr2TFNzIDFuv7///8CVzMAAAAAAAAZdqkUmIWGxO+qQOdOBcIq2rwMTEHRyUeIrBYEKQAAAAAAGXapFLYT1orUmphUjvXZoT3+Os1+MFEUiKwCRzBEAiAis62kYRr8o4F+m4RP5RtUw3F9SN36uOpycsL4Qp0K0QIgdIsr+3Wb6HhCP7byy14CaaJR1usj/2x/NiatUv96Z/cBIQJpSZCgDZH9eRAYRrBVxXVg5bL7c2zjGGXolj/8usrPvl0uJQAAAAA="
  }
}
```

__However__, please note that when using `xverse` an additional `inputs` array will be included within the results:

```
ordit.sdk.psbt.get({
    connect: 'xverse', // external wallet
    ins: [{
        address: 'any' // which addresses to use to fill outputs
    }],
    outs: [{
        address: '2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx',
        cardinals: 1000 // can also be either satoshis or location
    }]
}, function(r){console.log(r)});
```

The additional `inputs` array seen below is required when using `xverse` with `psbt.sign`:

```
{
    "success": true,
    "message": "Unsigned PSBT formats attached to data",
    "data": {
        "hex": "70736274ff01007e02000000019c2a203ea91c49e6a869970f83c23e87b9f421be13f802f6568570f4c10135da0000000000ffffffff02e80300000000000017a9144e7f566a98490694b347060ca1f283e0098f3f8c87280a000000000000225120acb6518c9c44876668a71bfa0fb528a0a7025d98d922badd74de679623c25b00000000000001012b401f000000000000225120acb6518c9c44876668a71bfa0fb528a0a7025d98d922badd74de679623c25b00011720e60aa5a5eeb26aef91da79c1ae20dc909cfcafb940576ef172d7ba6759c4e0fb000000",
        "base64": "cHNidP8BAH4CAAAAAZwqID6pHEnmqGmXD4PCPoe59CG+E/gC9laFcPTBATXaAAAAAAD/////AugDAAAAAAAAF6kUTn9WaphJBpSzRwYMofKD4AmPP4yHKAoAAAAAAAAiUSCstlGMnESHZminG/oPtSigpwJdmNkiut103meWI8JbAAAAAAAAAQErQB8AAAAAAAAiUSCstlGMnESHZminG/oPtSigpwJdmNkiut103meWI8JbAAEXIOYKpaXusmrvkdp5wa4g3JCc/K+5QFdu8XLXumdZxOD7AAAA",
        "inputs": [
            {
                "address": "tb1p4jm9rryugjrkv698r0aqldfg5znsyhvcmy3t4ht5menevg7ztvqq38q585",
                "signingIndexes": [
                    0
                ]
            }
        ]
    }
}
```

-------------------------------------
### txid.get( `options`, `callback` )
-------------------------------------

The default options object for `txid.get` is:

```
var options = 
{
    // required

    hex: false, // final raw TX to relay
    
    // optionally included or modified as required 

    network: 'testnet' // can also be mainnet or regtest
};
```

An example of how to use the `txid.get` function:

```
ordit.sdk.txid.get({
    hex: '020000000001019c2a203ea91c49e6a869970f83c23e87b9f421be13f802f6568570f4c10135da0000000000ffffffff02e80300000000000017a9144e7f566a98490694b347060ca1f283e0098f3f8c87280a000000000000225120acb6518c9c44876668a71bfa0fb528a0a7025d98d922badd74de679623c25b0001401c0c15101252c06e6ff830bca87602765178004418af5729b23dbe61ce40584e2ee86d7c439ae2e39cf215152380e758dde473881646da7cf99e22c34a1fab6e00000000'
}, function(r){console.log(r)});
```
This would `console.log` the following results:

```
{
    "success": true,
    "message": "Transaction ID attached to data",
    "data": {
        "txid": "c57e1c2e8fc36b17272256c255d6286e3eaa15e38994c71d7fe8ac6d64535e2e"
    }
}
```

--------------------------------------
### psbt.sign( `options`, `callback` )
--------------------------------------

The default options object for `psbt.sign` is:

```
var options = 
{
    // only one of the following three wallet inputs is required

    seed: false, // any string from any source
    bip39: false, // 24 word recovery key string
    connect: false, // either unisat or xverse
    
    // only one of the following two PSBT formats is required

    hex: false, // PSBT HEX
    base64: false, // PSBT BASE64
    
    // specifically required if using xverse and provided when using psbt.get
    
    inputs: false, // an array of objects with address and a signingIndexes array
    
    // optionally included or modified as required 

    network: 'testnet', // can also be mainnet or regtest
    path: false, // an optinal array of integers for HD derivation
};
```

An example of how to use the `sign` function in conjunction with `unisat` to sign a `base64` PSBT, which is a proces flow that is not natively supported by Unisat itself - who only support PSBT in hex format:

```
ordit.sdk.psbt.sign({
    connect: 'unisat', 
    base64: 'cHNidP8BAKcCAAAAAtpHd98ENqybz7WfEyhOPYBbGvgpQ46DS3YkWDvC+YERAQAAAAD/////d3YPKkRTKjk3ugix0B281yyeRa36Plb1ZBaJXoiWhIQBAAAAAP////8C6AMAAAAAAAAXqRROf1ZqmEkGlLNHBgyh8oPgCY8/jId4BQAAAAAAACJRILbKnIJlEu9gSkXOjfZfhDK9ZrquEk689IfDEZNeMkLlAAAAAAABAStYAgAAAAAAACJRILbKnIJlEu9gSkXOjfZfhDK9ZrquEk689IfDEZNeMkLlARcgB/WRxL6b++aoVIaaCI5rdj1JKVWVOeAsrAhgLS/N0sMAAQErQB8AAAAAAAAiUSC2ypyCZRLvYEpFzo32X4QyvWa6rhJOvPSHwxGTXjJC5QEXIAf1kcS+m/vmqFSGmgiOa3Y9SSlVlTngLKwIYC0vzdLDAAAA'
}, function(r){console.log(r)});
```

This would `console.log` the following results:

```
{
    "success": true,
    "message": "Finalized raw TX hex attached to data",
    "data": {
        "hex": "02000000000102da4777df0436ac9bcfb59f13284e3d805b1af829438e834b7624583bc2f981110100000000ffffffff77760f2a44532a3937ba08b1d01dbcd72c9e45adfa3e56f56416895e889684840100000000ffffffff02e80300000000000017a9144e7f566a98490694b347060ca1f283e0098f3f8c877805000000000000225120b6ca9c826512ef604a45ce8df65f8432bd66baae124ebcf487c311935e3242e501402c387d5af4e1af9b3d58f6ee6b1ef906e00f7b866ebcfb4521f51421565f887137527b54b5a13eb43c640737e21efa79ca3c8908a79e4b1095371ff74f30cbbe01407632103adac402f272cab818341eecbeb0fbbf2a96f6fd16469743fb57c4a333e7991a60db7375cf60e6d54db80f8be13670ffe0ed0c6d02eb02fff41ba6336b00000000",
        "psbt": false
    }
}
```

Since the `data.psbt` is `false`, this should indicate that the transaction is finalized. If the transaction is not finalized the `data.hex` will be empty and the `psbt` object should contain both `hex` and `base64` formats of the unfinalized PSBT transaction. However, if the signed PSBT is the same as the input PSBT the results should be `false`.

If the transaction is `finalized` it is ready for `txid.get`.

An example of how to use `xverse` - which requires additional input fields provided by `psbt.get`.

```
ordit.sdk.psbt.sign({
    connect: 'xverse', 
    inputs: [{
        address: 'tb1p4jm9rryugjrkv698r0aqldfg5znsyhvcmy3t4ht5menevg7ztvqq38q585',
        signingIndexes: [0]
    }],
    hex: "70736274ff01007e02000000019c2a203ea91c49e6a869970f83c23e87b9f421be13f802f6568570f4c10135da0000000000ffffffff02e80300000000000017a9144e7f566a98490694b347060ca1f283e0098f3f8c87280a000000000000225120acb6518c9c44876668a71bfa0fb528a0a7025d98d922badd74de679623c25b00000000000001012b401f000000000000225120acb6518c9c44876668a71bfa0fb528a0a7025d98d922badd74de679623c25b00011720e60aa5a5eeb26aef91da79c1ae20dc909cfcafb940576ef172d7ba6759c4e0fb000000"
}, function(r){console.log(r)});
```

-----------------------------------------
### message.sign( `options`, `callback` )
-----------------------------------------

The default options object for `api` is:

```
var options = 
{
    // only one of the following four inputs is required

    seed: false, // any string from any source
    bip39: false, // 24 word recovery key string
    key: false, // 32 or 33 byte public key hex
    connect: false, // either unisat or xverse
    
    // required function specific parameters ...
    
    message: false, // the text string / JSON message to sign
    
    // optionally included or modified as required 

    format: 'core', // to be confirmed
    network: 'testnet' // can also be mainnet or regtest
};
```

An example of how to use the `message.sign` to sign a text message:

```
ordit.sdk.message.sign({
    connect: 'metamask',
    message: 'Hello World'
}, function(r){console.log(r)});
```

This would `console.log` the following results:

```
{
  "data": {
    "hex": "1f7ed4fb8e24ab722236afdee40a0b8a3910a31d630122092b6b99b74f256f60cb18b2cc3b713eba063f00425c9307bd04af1992936e019b7ea68e7c6a6d49d40e",
    "base64": "H37U+44kq3IiNq/e5AoLijkQox1jASIJK2uZt08lb2DLGLLMO3E+ugY/AEJckwe9BK8ZkpNuAZt+po58am1J1A4=",
    "address": "mpsGk1VCe3ZTPjb96nRhFhq7o9EscHNymp"
  },
  "success": true,
  "message": "Signatures attached to data"
}
```

Notice the `address` that is returned.


------------------------------------------------
### inscription.address( `options`, `callback` )
------------------------------------------------

The default options object for `inscription.address` is:

```
var options = 
{
    // only one of the following four inputs is required

    seed: false, // any string from any source
    bip39: false, // 24 word recovery key string
    key: false, // 32 or 33 byte public key hex
    connect: false, // either unisat or xverse
    
    // specifically required for inscriptions
    
    media_content: false,
    media_type: 'text/plain;charset=utf-8', // default
    
    // optionally included or modified as required 

    meta: false, // optional object to be converted into JSON for OIP-1
    network: 'testnet', // can also be mainnet or regtest
    path: false, // an optinal array of integers for HD derivation
};
```

An example of how to use the `inscription.address` to generate a commit address:

```
ordit.sdk.inscription.address({
    connect: 'metamask',
    media_content: 'Hello World',
    network: 'regtest',
    sats_per_byte: 10 // default if not included
}, function(r){console.log(r)});
```

This would `console.log` the following results:

```
{
  "data": {
    "address": "bcrt1pe8lzakhqpgg7nrj95rm69j55n05rtv3njca05h70rmx54hactjcq45rj2f",
    "xkey": "064d600bcae45fadd3ac4cbb9c36b9749c331207e7fb5eabef62f507ddf3636b",
    "format": "inscribe",
    "fees": 2760
  },
  "success": true,
  "message": "Inscription address attached to data"
}
```

Notice that this returns a `fee` field indicating the number of `satoshis` to include in addition to the required `postage` for `inscription.psbt`, which uses the default `sats_per_byte` of __10 satoshis__.


---------------------------------------------
### inscription.psbt( `options`, `callback` )
---------------------------------------------

The default options object for `inscription.psbt` is:

```
var options = 
{
    // only one of the following four inputs is required

    seed: false, // any string from any source
    bip39: false, // 24 word recovery key string
    key: false, // 32 or 33 byte public key hex
    connect: false, // either unisat or xverse
    
    // specifically required for inscriptions
    
    media_content: false,
    media_type: 'text/plain;charset=utf-8', // default
    destination: false, // where to send the inscription
    change_address: false, // where to send any change
    fees: false, // provided when using inscription.address
    postage: 10000, // how many sats to send as inscription
    
    // optionally included or modified as required 

    meta: false, // optional object to be converted into JSON for OIP-1
    network: 'testnet', // can also be mainnet or regtest
    path: false, // an optinal array of integers for HD derivation
};
```

An example of how to use the `inscription.psbt` to generate a commit address:

```
ordit.sdk.inscription.psbt({
    connect: 'metamask',
    media_content: 'Hello World',
    network: 'regtest',
    destination: 'mz8CUX3TKRNf9ka77X242fWUtQhQAumxUN',
    fees: 2760 // provided by inscription.address
}, function(r){console.log(r)});
```

This would `console.log` the following results:

```
{
  "data": {
    "hex": "70736274ff0100800200000001b5d895ab9466ce154833df554449c11041c59016876d6b342d26df7fb9c11e1d0000000000ffffffff0210270000000000001976a914cc1ca8f56e26c16ebdd2497f8a9774f7912067f988ac2823000000000000225120c9fe2edae00a11e98e45a0f7a2ca949be835b233963afa5fcf1ecd4adfb85cb0000000000001012b204e000000000000225120c9fe2edae00a11e98e45a0f7a2ca949be835b233963afa5fcf1ecd4adfb85cb02215c1064d600bcae45fadd3ac4cbb9c36b9749c331207e7fb5eabef62f507ddf3636b5220064d600bcae45fadd3ac4cbb9c36b9749c331207e7fb5eabef62f507ddf3636bac0063036f7264010118746578742f706c61696e3b636861727365743d7574662d38000b48656c6c6f20576f726c6468c0011720064d600bcae45fadd3ac4cbb9c36b9749c331207e7fb5eabef62f507ddf3636b000000",
    "base64": "cHNidP8BAIACAAAAAbXYlauUZs4VSDPfVURJwRBBxZAWh21rNC0m33+5wR4dAAAAAAD/////AhAnAAAAAAAAGXapFMwcqPVuJsFuvdJJf4qXdPeRIGf5iKwoIwAAAAAAACJRIMn+LtrgChHpjkWg96LKlJvoNbIzljr6X88ezUrfuFywAAAAAAABASsgTgAAAAAAACJRIMn+LtrgChHpjkWg96LKlJvoNbIzljr6X88ezUrfuFywIhXBBk1gC8rkX63TrEy7nDa5dJwzEgfn+16r72L1B93zY2tSIAZNYAvK5F+t06xMu5w2uXScMxIH5/teq+9i9Qfd82NrrABjA29yZAEBGHRleHQvcGxhaW47Y2hhcnNldD11dGYtOAALSGVsbG8gV29ybGRowAEXIAZNYAvK5F+t06xMu5w2uXScMxIH5/teq+9i9Qfd82NrAAAA"
  },
  "success": true,
  "message": "Unsigned PSBT attached to data"
}
```

This output can then be signed and relayed using other functions.

However, the signing process is only supported by `seed`, `bip39` and `metamask`.

---------------------------------------
### api( `options`, `callback` )
---------------------------------------

The default options object for `api` is:

```
var options = 
{
    // required parameters

    uri: false, // relative slug for required endpoint
    data: false, // body data for accessed endpoint
    
    // optionally included or modified as required 

    network: 'testnet', // can also be mainnet or regtest
};
```

An example of how to use the `api` to fecth ordinal aware `unspents` can be seen here:

```
ordit.sdk.api({
    uri: 'utxo/unspents',
    data: {
        address: 'muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ',
        options:
        {
            allowedrarity: ['common'], // only allow common ordinals to be spent
            txhex: true // provides the full TX hex needed for PSBT legacy transactions
        }
    }
}, function(r){console.log(r)});
```
This would `console.log` the following results:

```
{
  "success": true,
  "message": "Unspents of muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
  "rdata": [
    {
      "n": 0,
      "txHash": "1aeb94cf504b30f9bd2b9698363f76e82a4097fb88546eea831cebe5f534b03c",
      "blockHash": "000000000000000a7beca55b94cfa0baca28b91e4a588cdf2ffe69b0a4cf28ba",
      "blockN": 2436702,
      "sats": 13143,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 988586c4efaa40e74e05c22adabc0c4c41d1c947 OP_EQUALVERIFY OP_CHECKSIG",
        "desc": "addr(muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ)#93gcuafy",
        "hex": "76a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac",
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "type": "pubkeyhash"
      },
      "txid": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de",
      "value": 0.00013143,
      "ordinals": [
        {
          "number": 1449618359923000,
          "decimal": "369847.859923000",
          "degree": "0°159847′919″859923000‴",
          "name": "dotkrtwhdev",
          "height": 369847,
          "cycle": 0,
          "epoch": 1,
          "period": 183,
          "offset": 859923000,
          "rarity": "common",
          "output": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de:0",
          "start": 1449618359923000,
          "size": 13143
        }
      ],
      "inscriptions": [],
      "safeToSpend": true,
      "txhex": "02000000000101f7ae03f55006b6e22bcd9d8b5733112f6aa529433c300d7cafcf16d98339faf5010000001716001435c419842725ea473bb226c36bd9314dcc80c5bafeffffff0257330000000000001976a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac16042900000000001976a914b613d68ad49a98548ef5d9a13dfe3acd7e30511488ac02473044022022b3ada4611afca3817e9b844fe51b54c3717d48ddfab8ea7272c2f8429d0ad10220748b2bfb759be878423fb6f2cb5e0269a251d6eb23ff6c7f3626ad52ff7a67f7012102694990a00d91fd79101846b055c57560e5b2fb736ce31865e8963ffcbacacfbe5d2e2500"
    },
    {
      "n": 12,
      "txHash": "46d5538a77d8b59a21c11d93248f0ff0252ad12760a3b90b1400efc147df26dc",
      "blockHash": "000000000000001229adaef12e78c23895807e69d9a60338f8e51bb72fdff3ad",
      "blockN": 2436833,
      "sats": 4286079,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 988586c4efaa40e74e05c22adabc0c4c41d1c947 OP_EQUALVERIFY OP_CHECKSIG",
        "desc": "addr(muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ)#93gcuafy",
        "hex": "76a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac",
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "type": "pubkeyhash"
      },
      "txid": "06a3e2e75d9ba7d5839c41ab26794ade2ffaaf2a3d64e8ad532e7af248407d10",
      "value": 0.04286079,
      "ordinals": [
        {
          "number": 1789468182023190,
          "decimal": "591574.682023190",
          "degree": "0°171574′886″682023190‴",
          "name": "bedzshmngbj",
          "height": 591574,
          "cycle": 0,
          "epoch": 2,
          "period": 293,
          "offset": 682023190,
          "rarity": "common",
          "output": "06a3e2e75d9ba7d5839c41ab26794ade2ffaaf2a3d64e8ad532e7af248407d10:12",
          "start": 1789468182023190,
          "size": 4286079
        }
      ],
      "inscriptions": [],
      "safeToSpend": true,
      "txhex": "02000000000101b9eb90e8434dc1b4f0a20a718583174ca7010a7ada1f282044ac17505febe0860c00000000fdffffff12ec1e5b0000000000225120d4009ee2954c965f8f9561511d5569ff34a26e113a021d9d06d69b7e137fbe095db5530000000000160014d979e4c6c4966e7e2a1d8b3030c960966e5d7bd13f4850000000000017a914c0c6a5f1c091045e56932a6e0f589bda909b42f587d0154d000000000017a914d5f89384ae7b4f32614fe1963349401ea329293c87bf743b0000000000160014d054edc61d3660b75720815a42dce0824b7300a8b28537000000000017a9140247f5e34649a97fb1bb6fedc760eda2ebeb5c7b8761e23700000000001600149558d71f8c0d364e668865ab6e7dd4ab87e4f5de435039000000000017a91415b9fe5391edda53dae486718d0e5f1af69f841d870088540000000000160014f9b97cd6ddd5f2f4d8b7be85a615a38966898c2a94a844000000000022512098812861e096d0cc209a0f3e1f07e042ca890338757202b175d35892801759a5b82a55000000000016001482c18bee7b8d30462cc40d4b6e8cfa608956be600f1e2e00000000001600143e4f534b52e1ceba0a40f4b5599e145ab32173607f664100000000001976a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac721b4a0000000000225120c90edd8fe29b9a05c2fe8c5f49bc74b5eeba4f3f8c86897307c62c0c10c3e96223805b00000000001600144d66301328074a647b0b6c5d508599de233adaa88cf44800000000001976a9144bab9ba2c47c95bf33eb090b3aa774b118e8613488ac8a33490000000000160014e8e9f91abcb23ea18d698afcf99270dd563c1c988d0fe9220c0000001600146e1cfe7e032355f2eab5563fee63c36a489d7b490247304402204307fd5ad2fa901fb12e540773b19a50cfb7fb4f157bf526d6208b843a36ab3502205c9b2324d346067db51ef7cfcc46d2f1c4674ed01c78f614fa9a9206611c7ed40121024529e5a7cffb8eb354ab17408d66c4c856670681fa561f679dc88ad192f1e151e02e2500"
    }
  ]
}
```

The `api` can also be used to fetch SADO `orderbooks` as seen below:

```
ordit.sdk.api({
    uri: 'sado/get',
    data: {
        address: '1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7',
        network: 'mainnet'
    }
}, function(r){console.log(r)});
```
This would `console.log` the following results:

```
{
  "success": true,
  "message": "Orderbook of 1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7",
  "rdata": {
    "ts": 0.017334200859069823,
    "analytics": {
      "orders": {
        "collections": {
          "For the Children!!!": {
            "count": 1,
            "floor": {
              "sat": 999999999999,
              "btc": 9999.99999999,
              "usd": 264462316.07013553
            },
            "total": {
              "sat": 999999999999,
              "btc": 9999.99999999,
              "usd": 264462316.07013553
            }
          },
          "Spellbinder": {
            "count": 1,
            "floor": {
              "sat": 1000000,
              "btc": 0.01,
              "usd": 264.4623160704
            },
            "total": {
              "sat": 1000000,
              "btc": 0.01,
              "usd": 264.4623160704
            }
          },
          "Ordifruits": {
            "count": 3,
            "floor": {
              "sat": 6969000,
              "btc": 0.06969,
              "usd": 1843.0378806946178
            },
            "total": {
              "sat": 1398069000,
              "btc": 13.98069,
              "usd": 369736.5657662281
            }
          },
          "bitchin": {
            "count": 8,
            "floor": {
              "sat": 3000000,
              "btc": 0.03,
              "usd": 793.3869482112
            },
            "total": {
              "sat": 32000000,
              "btc": 0.32,
              "usd": 8462.7941142528
            }
          },
          "doordinals": {
            "count": 4,
            "floor": {
              "sat": 12000000,
              "btc": 0.12,
              "usd": 3173.5477928448
            },
            "total": {
              "sat": 48000000,
              "btc": 0.48,
              "usd": 12694.1911713792
            }
          }
        },
        "pending": {
          "count": 17,
          "value": {
            "sat": 10200,
            "btc": 0.000102,
            "usd": 2.69751562391808
          },
          "total": {
            "sat": 1001479068999,
            "btc": 10014.79068999,
            "usd": 264853474.0835035
          }
        },
        "completed": {
          "count": 2,
          "value": {
            "sat": 1200,
            "btc": 0.000012,
            "usd": 0.31735477928448
          },
          "total": {
            "sat": 3015000,
            "btc": 0.03015,
            "usd": 797.3538829522561
          }
        },
        "count": 19,
        "value": {
          "sat": 11400,
          "btc": 0.000114,
          "usd": 3.0148704032025604
        },
        "total": {
          "sat": 1001482083999,
          "btc": 10014.82083999,
          "usd": 264854271.43738642
        }
      },
      "offers": {
        "collections": {},
        "pending": {
          "count": 0,
          "value": {
            "sat": 0,
            "btc": 0,
            "usd": 0
          },
          "total": {
            "sat": 0,
            "btc": 0,
            "usd": 0
          }
        },
        "completed": {
          "count": 3,
          "value": {
            "sat": 1800,
            "btc": 0.000018,
            "usd": 0.47603216892672
          },
          "total": {
            "sat": 6015000,
            "btc": 0.06015,
            "usd": 1590.740831163456
          }
        },
        "count": 3,
        "value": {
          "sat": 1800,
          "btc": 0.000018,
          "usd": 0.47603216892672
        },
        "total": {
          "sat": 6015000,
          "btc": 0.06015,
          "usd": 1590.740831163456
        }
      },
      "total": {
        "value": {
          "sat": 13200,
          "btc": 0.000132,
          "usd": 3.4909025721292806
        },
        "price": {
          "sat": 1001488098999,
          "btc": 10014.88098999,
          "usd": 264855862.17821762
        }
      }
    },
    "collections": [],
    "pending": {
      "orders": [
        {
          "ts": 1685122226879,
          "type": "sell",
          "location": "93d87fb87674069bdcaf9738ff03ccbf864924acb6ba57b5cfde390986dd809e:0",
          "maker": "1Q7HNWA54DzGDsvSE1pmn6GpCEopFFN5h4",
          "cardinals": 999999999999,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Two Wizard Princesses ",
            "description": "Two future Wizards that will make Bitcoin Magical Again!",
            "collection": "For the Children!!!"
          },
          "signature": "70736274ff01007e02000000019e80dd860939decfb557bab6ac244986bfcc03ff3897afdc9b067476b87fd8930000000000ffffffff010000000000000000426a403864393330653433363034386135646664366662623737303961363737623035393264656661303230323239383031353936313466313939646133386236353500000000000100fdba690200000000010157694a46a410914c05f1ac76fd50bc24d5182d2b5e9da92ceefa47d7609137d50000000000fdffffff0222020000000000001976a914fd7b0ded27d18502c1f67932730d5bdba7eeffb788ac162d0000000000001600140b4cbda81b8f7d5c2a52e4e432603e7131fcd0780340b39c8db6322c334a5c63e2221de3e862a09c500a4ccec0bc809b55f520f355b7ca084e62de91d9a443112727c8b4815cd3670d36ffa3e69b68fa1721429822a1fddd6820117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423eac06856481588801750063036f726401010a696d6167652f6a706567004d0802ffd8ffe000104a46494600010100006400640000ffdb0043000c09090b09080c0b0a0b0e0d0c0f131f1413111113261b1d171f2d28302f2c282c2b3238483d323544362b2c3e553f444a4c505150303c585e574e5e484f504dffdb0043010d0e0e131013251414254d332c334d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4dffc00011080237023703012200021101031101ffc4001b00000203010101000000000000000000000002030405060107ffc400511000020102030306070c0805030304030000020304120513220132420614235262721133367182b1b215212431343541435181919253616383a1a2d1f0253773c1c21644e10793d22654f1f264a3e2ffc4001a010002030101000000000000000000000000020103040506ffc4002d110002010205030304020301000000000000020301120411213132224171135161051423423381155291a1ffda000c03010002110311003f00cd8cd080cd534603a4a79d72d293290a9328e504aa30aa30c20c000000000000000000000040000000a030a000787a0ba5c8618456593764bf840823655ac7558eccd4ceb5777789c85f919d2cae4280c28c20a030a28c0787a7800280c2801e01e9e0122800000a7578979374be87a8e58ea712f26e97d0f51549baf93541c1fc180a311921a0c2000000028c284d0802000a300000000000a30a00028c000280c2800000001e01e9e0000a30000a787a0029e1e80001e01e9e00000000c000000280c00492527ca53cdb7d40149f294f36df5019e4dcd50f139e52fd31414bb4c328ce5e5268c849631ccec4ca4846a483159e80001078007a007800000000000007a7800028c0048a377b7100ce95fdd4a97c3a09f2624d534a1a6f5da85b0c6ced4a1560abe718c2347ba9e18cd8311a91b079addf4e7172c9d65febf69b63b32be4cbb54b312963655140004330a28c00028000a07828c0300a00028c7807a78048a75389f9354de81cc1d3e27e4d537a05526ebe4d507093c1cf0c0068308e780000028c28000000000000000a30000a00000000000028c0002800001e0a30000a030a02800000c0000028001e000001e801e01e800c4d45f2b8bd2f500517cae2f4bd40679373547b1cda97298a65aa6052c62fa93c640a4f1969949549548d49062b3d000003c0000000000003d3c0024f400f00800029e255cb470e9f1afba0ab76c32adda15717c4b9bc393078d6d2cdd53069aa65a3a949a2df52769f321c958fb45565d1a4d112dc95a3d0df6d22ad2c352b2b9aba186ed1f1ff001635e865e71468cdbe9a5bee39fa98b2dd21cce0d9a8bf814bae785b8f528aca88b6a893dceb56a9b0030a526201461400051850003c3d0003c14600185000140f0e9f13f26e97d0f51cc9d3627e4d537a0552725f26b8384d080249e0c0015463418460000140518501800000500000180000000500000018005148209d6a1e65cbb329ed27956e475eb90451e4beafad1d5742d55e9ad494061482a03c3d3c000000140000006000000140600014006014500180624a4f94a79b6fa80293e529e6dbea02893735c3c4e754b14c5726a6df214763463dc258c8a3dc258cb4ccc4ea4a44a38c5631e9e1e8100787a7800000000000000000000473cab4f0bc8db8a72d25535454e74bc46f6276c90e49cbcb742f6b6e1a638fa2bee6b816dc8959555df2b591b2dda4f19b5dcbfca4b033672371a3aea33c0f2e75590dce8b966a4d8869a9b65d0e36153db590f5105c4e792b2b1e691ef66de2bd2697d261c5492abd2ed3234451a3475a535ccec45160979c429275c90d8bd4b99c065b5b2145185248001850014061400f00f4f00000000614e9b13f26e97d0f51cc9d362be4d537a1ea289392f935c1c24f073c311a921a0c2300000a000000280000a000003000000c00000280000011bc96d8bd612ba58961cbe3de5239ea56177b92f96cb635f3fc667d4b32a65b78d7de354686b4e06b413ad542932f10e6560725b9f4adc3a94d5286e9a9448b6b0a030105629e1e83001e1e9e5c7a280001e00c7a78000001681e801e1e800012d27ca53cdb7d40149f294f36df501449b9a61e27364b06f9112c1be4296b1a51ee12c64116e13c65a6662751c451c62b18f4451800f4f04d0802f4f18000000080000000066b753015ab24b61b7ae3aadcc32adc55d550fa6328621070b47ad788b36cb2695d116f31ecb57142972eb6eb1a159efb72d0dd6a599e7a9cdea8c9629ed7465df42696d91ee2bb417760b5b90ca4ad2ab5f76f8d02f377bb80acabd6199ad4d3ff00ea65960496bd45b1bb26c74b854aad9f0f51eefc4d139ac06565c55e36fad8adfc0e94a556ce9f6306279e7ee028c2819c0518009140000050185003c03d11800f0e9715f26a97d0f51ccb1d362be4c537a1ea289392f936e1b83f839d51c894954d06118614005180006140500000000140000009000018901599634b9b7106629cf2673e5aee26f12ab736432adcd9091b2c8ef50dc5ba5678ae7cc6df2cdfd5e13d89b2d1d72f7f7998be56755e8dce8c4b4cf26d8a142cb1e329d4952d36cc0ac97271285bf44db0e858a9d5bb99313cb3140004328ac23312b10301278cc7aac44cc170a3da4f705c4570d700b68f70c4571edc00487a4570d7000e07800313527ca53cdb7d40149f294f36df501449b9aa1e27363c3be21eaef90a58c6a404ea5780994b4ccc4ea3dc44ac483158ea3087a040e078a0000000000000000664f2b34cf76e1a6bd631b13a98a852e64bddf7554ba2ad29d55344495a9ed4ced258bb8b66ea99f3c9c25abb3214932ecbf84a12ef9b572b73ec3f55d9115c1bc2ab2b0ea666968e9726a6954aad7263cb7f392d37366a9b710c4d0802cca7fef6113b2dfa42e179d3daa35d6b12ae5d0e3f0e54f9d15fb3a4eb784eadb7ce2f6b65eaea9d96f58dd828aadbb99313bd2a7a28c0064140008001460024501850205611876226024f18e9f15f2629bd0f51cb31d3e2be4bd37a1ea289392f936e1b8bf839d51c894914d073c75618519400061461851400000000000005180000000922a99f2534efbee9562ba3b32897c64d99ff00b6473c997a563bdcd1a22ea6d863cbc892b2c6fe2caf2cad7a37538427cdbfa522a9568e176388f2ceed967a50eb2aa50ceaa939c4cf22f139d4514b9d470c9d839255cc7b780e97047ccc313b0fb54e9adf652ad5cf33998c55ed4daa5f0000300adb84121658ad20015d82e19841473db8158416e01cb170d7102b125c025a3dc484370d70104a0a7800296693e529e6dbea01693e529e6dbea0289373543c4e7405020d06940c5a52853317958b0caca4aa39128e3951300aa30107a30a000300a000000000370197531ab4d7347acdadd2bcad16b5e342f56cb7372adaa623f68cf62ecbaaf2adaadbc5f2ceb1e54ae7afb0c9155f5a10280ceaa2895b7b16adddc460d439e3e9426a290545d61da40d75342dd85395c4159a8e066f48e970f6bb0fa566ea19aebb533cfc684e07a782190000000501800914562414008c898958460052263a7c57c98a3f43d4730c74f8bf93147e87a8a24e4be4db86e127839a1d443d5341cf62518453d185244d080201465000000000000001461400062391ad4242ad4b6bd5b880b9f62d89736d42e185b857d28686ae4b99bd75a83aadf98dc1ba62621539893af1cafb0d6a966686dccd6623c596976fb8f1aadb9e5b85dd4451f54d8e4fbfca61f48c75b57bc5cc366c9c4924e09748b2e4ab695bad596a74b70c41bae4aa66305c040ea4e2ba8105365109dd48ad14b5489948c9d94899481c2e1ee22180095587522524562481c623245010b149f294f36df500b49f294f36df501449b9aa1e273c03302905c58a662fc6c66c4c5d8d8752972c8eac46a32b0c504a32b11a8cac308487a787a0000004800d1ea71468e4cb01e35b982ae75a74b9bf2f58e639f54abbc6b05f2d43dd731d156731c3e99246df7d4dd6fcc6252626d5d34eb147934fc36987d76925a2ed4a54edfa6a899ee3b47726ad65468949678dacccfe629dcdc321dbb725c8c377503e9142e3c65b5eddf334b2a2575a9a512ac7ab7113ddba496dae9d72377df0555a56ea57715aba647b2d4c8d40f1b6bd6751843f870aa66ec9c73b6873acc05aec2517aafb4865a76324fc0d0018510c2000040c7807a0007878c30ac0044c2312b113012231d2e2fe4c51fa1ea39a63a4c63c97a3f43d4512725f26d8383f8399185518d073c71d48c751851d462352400000000000000014600014a55326bb7a85dddd4c64bcb73ead09787ab48e999ab0c97d4955add5d41aa599778972f5dbc0834d08024f12c89a8d6adee5f694dfa44bb80ab536c74d6f18d532b2f46b1e8209daed20b2d2af67726a955a5c513d859992dea6a5090f638ad8733ac44b5a699ee32e76d4e9e0973e9926eb296233230692ea678faafeb35236339cc916d7c89c56180520acea44c587521601958888d894f2d1472001d944207186231d40824b8f441d4914b148df094f36df500517cae2f4bd405126e6a878986c2292b0840e3a96a2629a93c4c308c5f5624208d896e1ccec3a8e44a3492450a5d3c91c3de626e0b59b6255243265e506174ff5f7ff00a6a517e58522f8aa49dc4f5529dcb970b2b7ea7487a724dcb09feaa863f4889b9598936ec1020beb50b3ec65ef91d90f972d9a7c6bfe55388ffa9f17decb8ff28dff005662ff00b3fca47ad4f9344585aa6f91d045173899e69fa68a27daab771375878a369a6b62cb4bff0029cbff00d4b886eb471e827a4e55cf4f3248d491cd670b2e91925444ca94d7e4d1e8bb36fa1d6d5e092d2d1bccd246e9c5fdfd273f3c1147e2b5f5882ab9613e20f754ebecf095fdd589bffd86c3e23a3f236a0f16bd34d06b75dc7ab2caa9aa38fd1d2c45cf206fd20cb3c4df584cab14ddf608ee4ec3b4f758bbe9dade51258eeddd0ec2bdcda949e919667b67dc7e208fa13215fa8a122b2a3ab1d5606eac93e56e686398a95b6f8db7d0d9e4d35af3c7d8d83efa98e55e83a2000039c028000000010300ac30ac002308c3b04d08028c0491b1d1635e4b51fa1ea39d63a1c73c96a3f43d9289392f936e1b8bf83998c90823627341cf3d524510f5461495405518000601800000000501800820a96b61b7ae5583b3b84d58dc257695614b9b71751a1556cccdb0ad72cbdcb0ba491b4a778a34356d588f23416270971d746a056ce99d0d16db5c8a1534cd225ca6731bb6e5a1853c73acc4bcde976cc6a45794a7df2c522e64396c579d8b104f143d1f6f4b14e29aad4d37262f92d610f6d65bd7436d749cd42fcceb757039d2b0a73b12bd54a96158f485589882823620652cb11480490328a48c28a5844ca2312b11b00e20c2b0012483911eab0105da2f95c5e97a805a26f85c5e97a80a24dcd10f1329884b0ca40c48c0346c2c6b7695285662f051f4717c26a3f957fa8accaa3ac6cfa50dd8d955331a4b13acc67557296929f4d323d4b7e5539c792bb147ba791dd7f954b5161f147db705f55f8d342ef4228f96b5249f1ec52b34c6fcdd3f66568f0f96a1ee9e4bfbcc5f58d63159d5778b570b4fdeb98debff00a532218f0d894b11d32aa6a8c656ea8eadd6342c094ec54d3bd77a88d1aaeec718f16aec0fd136e9e32e5f607b5542e660cccc72368aedd2555553cb5b845b546b982db74869ea462b0285aa03345036f471913535237d592dac2dacbf564346bed41959bdcaed87d37d54f2211351b70cf1bf79499a265d59760cabaee58ef296811bb162cb55ee50caab8f4d0802763fcac0d573af8dfe635a38d4769d637b7205fb5f660f5fe0c96acccb19b5ff00a66ef26aa69b9cea9d12564dab96da4ce96282a1ee963fca55970b8a47e824913fd415a3997e486f4a4d363e88cac787cfa1a9c5b0bf113c995d96b97f0366879628da71082cfda47fd08f56dd1b430498375d5753a663c2382a60ac4cca69d265ec8c5c636565d2a38c2a8c04011b12080311b08c4ac44c41246c6fe3de4ad1fa1ec980c6fe3fe4b51f7a3f56d289775f26dc3717f072d1964ab19614d061618f54f0f5462b2551855180061851800f406014053c1c8dd9634b9b710624a12ea771238f9c3bc7be196cdd24fa3b2588373a886baf1c8dca4b146b1a6a909167a48e645ab9e344ef147135a6f73df9dc77a70dbbd77ea39cf7367be16a98244495f62afde73f10ecbd2a6e8915ba98eb1aa606d39f07754c6c434d4bc6a6a454d051e98208d13ac73f5d2dd33c9d636459d175286e455cdc9a9b9a3bd0d1e82b21cc58ff00ff00265cfe27b4459edcdb25772fb8cb3c57352ab52e46e9caa5a7933b536f9d161d51ce68eee25d2c72cac6c60d234737665d3e9177630ce9729b8a4ca424aa41ce5062261d8819851cf0518514b0462362462360244614661481c0610f400bd87fcb21f4bd5b408f0f6f8645e97ab681449b9a23d8a8c44cb7129858e57347f03837dbc637fc41dad52c863bdb2ec57c4715bafa5a17d1c5275bff000454586e8b4d0802a50c3e9163e924f44d3dba74b7787820bbadcd52cb674210ac797a5773aa7be1d62e7dcfa5014deb6f632b67dc70650d2a0b6ef0c20cba80569345a459b6b917644db992b4770ad1cab65c491ea7ec17d63bb4f008ca5abec565666de8ec24b6d2c34644ca40f695e781a63d8e9b2d35484b75a33b2f08b6f5663762066650cdeb46332b096b16dc2067c419f102c6c46f136f05d516d524cf817eaef2369f3382c08e2b86cb55fac0baa45b40d4c175a25caa198dc230b69eacecbc161e4b14155e3d35f582e3d5d5ba25b76e175bb1476e1f3d3be6514ef77e5634a8f955574bd1e2506776b75bff002236cb482fccd32a5e666828bc2b916df7af5d333b0a1c4692bd2ea49efecf1174f9c4b476ba494d988c6a50f2a6b685d23c423e73175beb3f37d2557b2f2a14360eed63a9d988c434788d2622999493dfd65e252661eebb630b2b46d95446236246236249118ddc7fc94a3ef45ea3098dbe50f92b47de4f5144bbaf936e138bf83958d8b5194e362d46685313131e29e80c54483288a3a800c3883800c7a787a2800d1c4b33dadb82892b346972efb82a97c4bd650ac9d59eddfbf4c7f712d32e829dab7ddc65c8b4a6add352ab2aea6d6cbb0f96ace8cd1ee6e8da5bb644d25c9e3234e25256555d228c57ac6b61739f7556de37abaec9d2738f75ee0cb574ca95caa4ab516b9d482a515534959aeb3bc59957a176e32aa94dacb4a52b4d08025ccb2ea36a48af6d8588256a79924520589a47b62d61aa3d2dbc1715b29db5cada9771f50eac65e0d539d4796dbd17b2688c71e45b5ab43d622618461465015801851c462362423601c46146611882450b80f0062de1ff002c87d2f56d0170f6f8643e97ab681449b9a23d8aed2ac34cf23706a38f8aeaaac766e337b1596dc25fb4f698d85add9cc45b7cb453641d11337735208cf5f53878b4dfd4c519d97eaf78e9b56c532aadcc5877b52e6046d1714d5598b31f469ab744561d9491ad63c54b77455955b8066d5ba4dddc8b7b1e871846b6ef12acb147f57afb437cd45248f492c752cda6c92f20bd552e6339f1589a6b5a3b22ef6a11e545dea5b144ec6eb4ab1a5d3c961424c4e91b4df7f74e7ea6af9c4d6c57b9bd847262aea939c4bf068badfd0c12632dd8dd1e1aedc78eae267b628e4f48aef89457e94bcebe2c130da786d973267ed104f8461bbab059e914b6398b570743955c4aefa890f1b105bfeb0ea63c0f0fbfc58d3e154ca9e2cafef987fb353955c4e0e29091aba293ebe326aca18237329e088bd71d5f6296c250d0cd5b3ae78d27eccc76a6957c59e67d5c3c65cb8c5ef4296c254d7b97a87abb0ce871355f94c7e9296d2ba17dd743524c8ddccef0ba962d195bb644b730344cc5b7145bee4acab20acccba48f29a37d5ba3f854390dc4567e23c5dab37472ee16163ccdd19a0b7c63a20ad187a8674b4b252595542f4d08023a32757794dbc2b95d996438968fdbaffbec28b4aabc6452d0ad66a5d0fd633490778cb2f575ca4a1dcdd725cbad1f7588d8e1f0dc66a7059b265d707e8ffe5b0ece9aa60ac8526a692f562b57cfc98e581a2d77a0cc6df28fc94a3ef45ea3118dae52f92547de8bd424bba966138bf83938d8b51946362e46c5ea64909d46235187281d495481495750124831566aca6a64baa6748bbcc654fcacc3e1f179937f288ceabbd4b92095f6a1d05c31c6bf2b2b66f9252a277b514e4c431baade9ec4fca57eaddb52b5342e05fbd6943be69163de9234332a715a48d3555a25bda38df73e79b54f56ee32e1902ef6638ebeaf652f8e0893f6ccd76c66855dee9f459c233729e91776391d10cb5a3a65fa8bc7d31eec167a237e6ef5347e2f612a7158ea2b39c367bebbb2cb92f2b279376923283ea7b85b4cea8cada31774fb16a5e51d5cdf50556c4aaf79a0fe51adb4996566fab90b555dbf6119957f5283574ada5a0116aedfab359583536f0fe93ffb95faabfea664588342e92293cf8a475136734165fd52d346bc5965796995beae32a681d6b7679d46f512ba56858c2f178696b2e973329b4b1d1a62b413f8baa83d9392e630114985ddbb3fe61ad997b6667782196bbe4774bab7759e31c1ac18851ea824913fd362d45ca4c4a9f4cfd37fa8a47ab6f2a6455fe3ebfa3667602b18b4dca7a4934cf1c90ff329af14f054a5d0ce93774659154d0802b6a999e074e540611876106148d8f18f4f18824414f58f0518b586fce3079f6fb3b40f30df9ca0f3edf676815b6e6a8b630317566c31fb32dc66e16dbea742f12d443342dc5e15396a666a5a9cb93436eb0aad6cb463545d51554d86dc0b6ed4db878db8823ab36ee853a7ff00a6553d7fd89e345a356b723cab78ef51fba55bef42ce222259ba4fc77112ddc438ca2b0d98bbaa53e72ab5332cbfdfd85c48d784cdc4a2f84e647e9154f765997416e791a8b3e753663258b61951e1eb5153d3c965ba98d149d6a912de2f0295da4c9776e3773363196da6469c3ab5d53430fc3e99b16a58d63df7d4a77cb46d36f68893754e2b92cbceb19493ce77f3cbcde1b8e23b751d68d7a4a15385d347d27f31425c857b44b310aea6adaacc9e9a2a74bb4a2b4f2f9b67d1b0f9f35754b57dd1554ee97f4799bcca32a5585abd1743e9304199a9641eba068d0a1c9a967a87e9781ed63a0c4e2b699d8a9ba4b4e031293591525345e32522c419b389e8291aab6d6de88fb29e2e863937246d9c3fdfd268b4cec47575d48ba629237f48ce66598a9050cb9daa0913593344d1cd7451d89d52dc84662bd5c16a14b74d775cc4d464aaf08ea56c5b4ae9ecb59ef2dc55d6e9910cbb4bb1ae62232efa1aa291fb54cf22af735a39f3352c848b3dd7dd61919ab1f48ba1b894d1555910dd1cb77931c91dbe0916456ddd03aa0b1a2c7ba36d666342fc99dbe07b4d080254f37b7b745ee82b3711229e4b04750996c9ddb4a545595382d669d68fbcbc3229a1de20ab816a21b78f84cd3c57752ef42f89ff0056daa7594b551d6d325443bac741ca5f24a97bd1fa8f9bf262bb9bd673797727d3e9fd07d2394de495377a3f51859aeb7c8e917a557a76c8e32262e46c508d87a9c429b0f4e9dfa5fd1aef1a2e55dcc1e9b48dd26a2ea22a9aea4a3f94cf1a76779bf29cccb8ce218869a6f8353f67fa904587c4baa5e99816f7e14ffa5cb8544fe4a9ab2f2a11b4e1f4af376a4fe8519ab716aed335564a756325b72d3fe22ab5c5bf6d9f3ae65aac89c17fe95170f8d754998ec598e08e3dd48cf36ac9c2e3ea2d58917b0348d5ee3335bbc2acaac32b028f6fb08adee7b75a0ac7a0049e332aef6f8cad76e88d1ab6f0eab6ee8ba96e840d0333dcd2127365fda7789408f4d46baa56c8657bb7c9c18465ccde2556dd8466bb70b942eb48d62b46d4328ad9760b45b957eb004cb50d48d3b92da170b7036a18ac2db86cb56ded622c6dfa425515555b71aaccbdcaf2e1b4d26ee86ec955b0ea985ee824bdbb3a58d5b97881a45dd2a7c3237c0cb3bd3e4a54d8f56d3f4753d37664defc4dba5c5a92b34abe4cbd590cc755a8d3225ea50a9c2997c449e8b19da2963db5a0ecb14bbe953ad65b44398a5c5aae85f266d69d56ff006da7414d5905725d049afabc42abd2a67781935de84ac20e20c5459c37e7283cfb7d9da04d0802186fce5079f6fb3b40a9f734c3c4a56db31958be1bce3e11078de25eb1b2eb6cc4526f832dca4472551b3a1ce51d55dd1cbbc5c692de0bcb75d844159a97a197ac6436daba1d35297af59478e565d18d16abeabff0babab5010c5511cbe2dc7692de035dcb915dad98bb5a4e108999907b8f3317ae45baee47f44d705c479ab78bd25fbfa4767fec8553d8a9235ad8645d088fa885d566af9e3faa4f0962d66dd27c070d5aee74cdf556ddfc7fdce3e31726ce875306d56a6552df2234e26f1b75369f485556385c3e28a8f16a2a8835a5426c593b2c77511cc7dcea2712bd4c516f2c7afaca72757822b4d753411a39da4f119cda5c556626d561304c3798c3ab5bf117310d50ba92c0cb60b571dc8049f31c4a3f84b9770d6d1a7f28d8e416cd7294686a725ed6d05ffa947ec6b4f034c64d5d1e5ef1d169910c6ae8daf1541d4c778ed30ede99ce8dd4e7d559a6734299d865e02d40d6bda44d1aaeaea82a5efabc51aa3e933bf50d3b66be5af09a0b52aa822c11b274632d276cd71ab2ebee646656d3d89a29564dd1b55fa77482382d7d44eba4d0acddca1adec4a32b11dc1a8b6e2a3dbfbe388acdc40eeb123b305dd3a93432ee68ebee4e09765a7d77950bff00d2b4dde43e5d81d1357e2598de2a27cc90fa0f2f19bfe85a6fb5a58fd9da715abd577c9d1e96cd3e0e0ea7156bf2683ff73fa1516878a47bdc96929b9ba5dc659f0780e84d08024505dd4e6667b3a5058eedd2c4643e13dbed36af4995ba8f256b9cf14f6f8db65bc47b6b291c8611a55059558196ede17294afa89d092e5e13d154f25758f7a41eee90b7d894896ee290acd56bfa4d0555ae567b563beee2287953dcd31c4e6b66a8d9ea5077cbd2b1dee3aad5b25ab4855f768a5bf6ce5869db77a47f4416468d3547f994f162a9bee6824fa7f88f9153269cb92cb13f87f52bfbb4f71bed9fd8334332e1648278fea38f6b7e3fd0a9f0b5d25bf79109f6ae5db82e293355f147a0569e58dfc587dda0ad8672f0b7147dd265de8c916ba36de2e59d1bb94fa0ebd89dded3ccd5116581815546baed82df72c28ca44b68eac5854c496b05c2dc35c488177545d432b835ac000f12c896c9ad0cd968e4a57cea69377f329a5b435143c0afe4b52564f0361d8cad474353a25e16e1634d8e7ab30fcce9204d7c4a58c2b12ccf82cfbff56dff00131f5256d6264895e97a1d061ff2c8bd2f56d00c3fe5f17a5eada02bee247b1154efa103ef8d56d6a1134970c22962dd050974bda69c6b7214275d62b02f233e7c3a9e5d5658dd6520e67551f8b9d255eab1a56809c76347acde4cc9259a1f1d4ae9da5d4419b0c9c7abb5a4e8a291949f6c105478f811fd12cb9ebbea4fac8bd8e7160564df1d12ded9b4d8161d27d44917fa6c43ee02af88ae9d3bda8b15adec45e8dfb14e29156fee13e0356b87e2dd2fc9e5d2c33611531a689e4d080207bfacb68b2e1f5ca973471fa2c512e4f99aa091532caa6cc6ab1bd1656fa4b6b7e63b78f49c0e14eb4a8eb3c7d13be96eab6c3bb590e34ab69d98dae5cc9a765b0e6f13c41694da9e4d071b897c23108636e372bdc7e27594d5314787a48d1dfa2e33a931c96baf8da92787ab7711af4cb6c29695eb15acb8626e386c56ae55a97ca8ef7ed142a655992ecbb1f88ddc5da254fabbcc4634299df91ad8334b3536ae00ac5d64bc9fa956478585c416d713f61ff5325e3301a2b6a756e3bed3a46d473d2b5d33b76cd51adc6393a47ca56d4c4b0288adc4bc45c81741be3539d231e2cab66e6a2450fdd8c6a533b0ac32ddc40ccabbc44d550af1a0d72a82ab36d42705121e7351e228a776fe52e4580d7d47ca674a75eaaea611a5a76d42ccb9572294f571c3bc79498655e30f98dd0c1d66fefdf3a3a3c0f0fa3d56674bd690d066b8aab73f2d28236251385352bd25341430e4c1b9ed1abcb8f22f0fff005e1f67699a5fe5e790947feb45eced289e96da3fd3d99ddf3ef43855eb0d715a9a7ce4b78949d9558e9c6d72e742196d6d4755b8563d5b7755cf0b043d515dd57786ddde22cb8e411aeec32fc9ee7a9e2ceacf68bcdd7888aa2168e17652a66755cea58aaac354ceb1e98b78f61a4667ba72bd1eda686c667be56eb17f36e08a947ea62c7cd345285774546eabb9795b06a292b3108635ef17310556853b45fe47c7998b3f7369cdc64d080235ada1b709d54d4e9a87088214f166a340b93f5689d66d25a9691a486d824c97eb1cf557246a6a619b9f55f3c765d2d9b6e57a272aeb9b5a9d3aadbb156aeba0866b629e37eeb1b986d27384bb2ce5a879012b4df0c9d117f667d069a25a5872e2dc406b5416e630b13a3584c8a1a48a69a7697722d4c6de3525c73f0496df1cb1de92e96505065b496a712c1952de771a7a261cf574d23f45246e9d935ab393f87d6c29d24f4ce8b6f596d29af26208faf37698b17252ab58cc963564336a62b774dc9f0b5a3dd32e78f596ab15b299eed24611d548a5aab8eefc8a5152e56652a6552fc78932ef217209a195f7cc9b7aa7aaccce8bd535c73baefa99da256db43a1561ae29c523584b731d05739ec84b7308eedba7aac7b62f10c2ec471c8ca5859c5cb5055eb12b7508adb526dbb58c9c4a2c999265d0aded1a69b150ad5cb994cfd92a9d2f4afbd0781ad7f837793f59b6ade9e4d9e323dadb1fcfe0da065f241edc5d63e164dadfc3681cda3e9434560a675c8d3ac5d0535dc2d54b742548e4b90b0c66a41b853a9df2e536a29d62eb0ec42f22b80a021612c65c898a0ac5b89865118b8ac3a912b1229694836fa311cadadeedc4425de2bd5ea4b783df2b62f87a8a14cccc93ddbeefb4ed708ab5aac3d2ddf8ba36fb8e3574a22af8de2ec9a3844ad86d4ead692ef2ff00c8c32c77a1d8825f49f5daa75552da0e6258b2f134998e9731644d08024b9770c89e0ceac439ebd275abd4412f299bdd84c26992c66de99b84d78f066ac8732a6baf774bb7425c2209ab21ae5d155169b97aa5e9eb25547f17b99771774896b576390aae4db3533d573b8f43ede1fb0e6aba39614ba9b337f4b31da471c54baba499d3c3aa430eb25591f2d63dde2ea8ea56e95ee4182452acc8d2efba6a34b13d265c53b42f712d6562c9d23684422dd44bad52296e64758b7ec39e681a95d167ccfefec2f51e2f9d895bf50cb69b92c1054699371b55a6c893a4e74f2dad95763122a3593c54f7fa26952614b325dce9fd15218e8daf78d74542712f11770da9657c9974397a7c98e56adbd248b82c1c53d57f28fee2d171473bf7a534946b4d6a8a725b152fb9423c2f0e8f76893d2d4588d6287c5411a775496d16d0b17d84f5ddb7ad46cd0cc16d1ad001ae06615542d01c4b8dee536cd8dc8fa656d6acd17a8c1b4e8394be4851f7a2f519e7fd4db82fdfc1f2daac364a77cea4d7d93ca6aecde8e4d0c6b156a70f82ab56e3759416e46cd4d0b2abe8ff00f44d8a315da9abe0d4bf084123af8db4c9d13768d6b3a37c07a55de9a96af5dd18456bb74656e12f562ab419ad4225799780942dd77660adf032832ac89a923fca41cd72f543259d9256bb84f36348dbd6115b7fb19598a33676626625966a35b916dfe330f6af528d62dc88de897b911f3e22f5351c8c62db53a9856ba943eab1c7a08258cb916a420a4d0802c658d2e390750823b6fb4b2f170a98d4357ce2b3b085babc622a3a94a758277bfeb235bad024c8c7236547397a49d64a9b58e8f1eae58fc6663b757ac60d74714d4c93450490caff0057c4a5aa239d34547a0af5313466b727da5a8c311678ec96c22c4a2b44ee4a9c5e20d73da64d4ae5bdc6c624baee31ea9b312e354666733e56ba67ee113476c28c1c6e3aae625abb85ca6762256d16f113d3a65bdd26f09b62685d19774b3e3351a23533bb1695ae1c855d5493323eb9bd58c5550d5c2e32348bbc2e9e1b08d9e4bf709bad1adccb8ac36f1591d9b82d24ef172c852ca48ab69156496d3389b678e2de721cba9c45fa34d3fca532cab45ca9b96471eb9d7634f92115d8c2c9c2a9b57f801ab80d22d3d4d3d3a7c7b76b6d66f4768182dca942cf5ab5ad72209f5426744d6971a466429c3be3998d4a4904ac2b472658cf26605c2dbd44207aab70f9628c2296a32bdbac9a31818b91b12a90464aa3a94312104ba6c6e027239d73217515f552c81ad712055b13f98b1a63d454a66cc4bb8cb51b6669f44a90d72f2d0ad59ca09703ac4a7cbce89d2e93ff0007474753057430d541bb2a5cb71cf72bf086aca682a214e9e08bb6cd6ecfe1b3613f253158ab30c4a5dca8892db7ac73e75ee76f0cd92dbed43ad5d256ac5b93b611d4e5e9621a9ac8acd3219958d26155d3666e9952c0d1e93665ab56326aea56f2e52a72abdaa9a8e7b10ad74d0802a899e36f149c26bcf2e61cf54fca5cb90cec5aa1a6592645eba6db7bdb0e9b0b666b2197c6a6a5ee98d81c5754a5cfbdd21b912db0c322efa4572fdc6c8ce6e27d8b38841ff71070708b5302d62666e4b62ff7f7975573133b8252181746ae0d3e86df8bf02eaaff00e9cf56d3e6814552d32749e353c62976e33956d7864f3c6c5f652f8bd8c5895d6ea771ae0b8402d33a9edc1708cc171596a92ab0ccc4678cc039e9bfca5f23e8fbd17a8e76e3a2e51eae47d1f7a2f519e5dd7c9bb07c5fc1c2012e58ad18c20464fb6282a34ce91bf788232cc60173294df93f4cdaa077a77ecea5206c1f118f4c53c12a76b49b718ea4aae5b07dcbf7d7c9cccb4d5f1ef50bfeef5159a6957c623af794ecee16e1fafdc6fb95ff0053904936f0ba7e62756bb55e74ad1c526f471bfa244d4544dff6b07e51959943d74639f75cc4b47e4fb733c7e9646fd6a6e7b9741ffdaa10c986d32ea81325d774cf8956753561b1488c7d06294cbc6ab32e170c3ead6aa8a19bae9abbc64f28da5911162dfbce0fed91e9d7ab536793b48ab459926fcba8d3658974a99d493cb0d325d049b9c2576c56591fa0a4934714838a4b58cb1a6a32f3628f54453c5eb2ba4b1563bd1f7ad529e7d5afd46e27587b4965a9d461b5d6e90c55ae4b8e7a39658d126dc4735dea62921c9ccbdec2aaa8aa72f5cd7398b3ae8735eb1b5b997596aa3b1a2333c8508a9a56bd963bd04d0802b94d86ceb0dd91bc58a45cc47b772cb8d48a46e6c8bd443a1147dce34f3b6c62a61f3c888b66f787888e9a92769a6a76b2e536606d10f70aebf3abc9d92db761165de845161b359be8585c299b7a74fca588e5278e52e53134ee525c1ad4f1e9f943dc8fff0095f962343302e243d7733fdc88b8aaa71bdc8a4e2bdfbd297ae3c6616d27d77f72aa50d243bb027b458142e17a69b117336f52de1bf38c1e7dbeced00c37e7183cfb7d9da056fb9747b193985689b595639e452781ae72bb87652c9e5c78030a4d196554a31b1723909511832c755024518461d54954451d4b041ad1575120aadf57c7c22b0ca5678195f3a0d77ef465fc1a35ac99e4e93e0fe315bf59a34781b4964959a3ab1aef31ad2a454b6430476745769defcbfefb7e230362519fd35ae753a78681f2b9f62abc4b3265cbb9efaea66cb5f0f16dfb76fd9b0f96d4c15382e219d066225fa5ad65f59f586e8df33a34b3a4bb7957c1c5f87bdb0c1e5160b1d650555b1d9508f9d1dccd24b2af5adfa0665ba86e56b48b0ac722c529ad6d12a6f10d632ab9c6c4d3d0d4fd624a86cae21ce1356f98192d6362bdca7b56dd52aac65c8e3590b52c16d3698f5960a60cac625546d7e937a781a3de22c3e85ab316a58f83356eeeecf7cb14a98bd3c1cd5f9be66ba7455f1bf6af54bb4522c932656b444d418bcfce3169e65d71322dbbacbef79be233a35cb9b4e66b355d6ae6614d0802963bce8226e86d678ec47de056567b97c5226f19d4959142f6cb07a46a2ceb325cbb9d52e4955fb9ca96274aec23af428bd82d31146b73dcdc1ba4b69aa35314eda65ec201eda78586515855180acb946523624522e301aa31d1f28bc92a3ef45ea39c3a1e52e9e47d1f7a2f519e5dd7c9d0c2717f0720a33291c52139614b112a8eaa35a32a922dc3c6a4aa2a8ca3150c28c2b1241e001e6e80a0cd6f7089a4b81dae2bc8b348fe32c8bb3bcc2b16c36dda96308c41a8ea5e927f14ff00cac6dd4c0b5565dbeaf71ce652aea58cbaf8cc784c30f39d68fc4bbd179d4e4e270dfb50f4f81c651ba3b1d946d725ca452ab321528ab966851a292f47d4a5b696e430f13a7e0ca78eaefe8a4b1fba40d87ac7aa5cc99cd1924b5ee528d7572a8f7542e632b1092d86d2861f59cd6b339b8136aa91d5d4e6395198b154cecc7b3cb98eec66572b494cecbd71eaeaed47ca2861f25dd0b6bbcbe2533cad5b4d5c2f4ba2b7a26b4e9d0dbd8295340b936b6bd7a4d4b6eee1d08d7a4e14edd59959a3cbb3b0545f1d717672baaf10d688add398aa3ab05a7839516164b87b8aead692dc0168f71e330a2330123dc17110c40297b0c6ff001183cfb7d9da02e17f38c1e7dbeced02a7dcd31ec731193d36cb5c8e3527814ac7627014062b1949a390ae32b0105f8dae2652944c5a8d8751189d472253a5c2393f9889515db9c31ff51269d204b982281a56c94d08024cec3f0aa9c43c5688bf48c7494985d261a972a5f2fe91bfd8bcaf774706eafe522bb7d62d6fc4c798c57d41e6d29a50edc18348b5dea2cb3ad3a66368f68c88e76aa4aa9a5cb48bb4d6afdff4edf31162b52cdd196b0f85bdcc765ccbbdff0016b737dde1f8bce57837b665f935baf492add7a365dfb922f0ddf47bebf422ff001176591ba2bcefd3f862b97c6cedfabec4228db3912358ef7962db72dd72fbdfa47fb3f56c19a75e6cf519fbe9b19aa5577bc1c11aff00b9e90cc729ca2c21569a19b2e086589f2e45cd6924fbce71e9a5a57cb68ec7eab1dfe2f574984d1d6f39cba48aaa2cc5823f1f2b6dfb5be8395c1ab2a710acc9accbd0ebe33a46b767c7e72b75561d5ad2941536e963463ab3431ac0e9a1c9e6d1eba8f0c71b2b5ab77c7eff00ddef1cbdcd1ef14550b55cbf3c998f731a78447cce19f1368f427431f69f6ff428d361ad242f51894fcc29d3ade35bcc867e2b8d4f550a52c1d0d145e2e3fefe9fb7ed1d7a77159bd89a365e292c97df565cacbffc6dd9ea1258feb3a9c5fdfc4250d645508eadd0cb7f8bfabfbbecdbfc09996e7b7d1eefa5b3fdcd5c94cdc4209564d32ef9a302e5ea58fd2532196db245dc7356925ba9aee347394cccac59c8d38aa566defcc4bb7499cb6b6a5d0e5c864b92d63a186c76b6c871f1980ba9747b9e9e1eb2da231d8387903301e0a430ca4aa46abac651852f14e8794fe47d1f7a2f4d080251cf1d0f29fc8fa3ef45ea33cbbaf9376138bf83888d89d58a6a4aac315b2e65c561d4863626561d4a9895465114f6e1cac6b80f0f404020662476b4800518001750124b4d1674c91aff0031c9f29eaf33139bab13e5aeabbe2fd7f4ec3e8787d3351d33b7499b66dbad8b3197b27cbb155f84a2f1fbecda6dd5ddfa0c33bdd5f83d16062f4933aef53e81c8d5cee4d52f1d8efed1b2ed3aeeeb392e40e259693d136e78c53b779158e449c8edc7c4c0abab9577a393f298d3cf2c9f5721d9b5a63621a815896394964b7eaef72abe6c9bc6dbc5fb32854ab29a158a194c2aee8e123a5ba1db0c9fdb162b22664b98e8ea708c9c25e15cccd8a2491b2d7d7b7fdb617c6512135232d442922f77ba4eeb6a760c4a1abe6ee8dc12a6a5636639e09bc56ff558e84722db9773cfe262656cf7a10b4776f11b2965d48994b2d32df9915a464cca46c15196a2a92a9092ab1038e452128aca413510000082de17f38c1e7dbeced00c2fe7183cfb7d9da052fb9a22d8c055b49e01078441d87614661461400f00502c41217636b8cd877ce9301c1e5c526b9b452a6f49ff001d82bccb12d59b4a50958da46ca9b9a3c9cc2b9e4dcea78fa08b77b4c754df08ff004bda0dab1d3c294f02589d9e151db4c371e5b198b6c43e7d8ee4102c4b977336babb27a152c51ae5d1bc8dbce73cb23566276f6ce867755867857eaa2311a4e52b24cca93a3a489570cc4d0802b6cbd69c5ba7330479d5969d76ea2296a35b22d41b898d4b6f32a26935a2b32eae860fc9f1b92ad4c74e8955533e56a78f9ccab6b5bd58d3e8228da558619a78f9b3f38decacc6b7bcff0011ca72831796b1e6a4820c9a7796e6919b32497eff00a36798f58f22a988c8c6710f752b13292ca78b4c376a6ef36dfb7691d24b3d3cd0c916b789f6b2fde4b49432d53db1467638360314296cf1deee7365c4dbad4b554a0d8bd4d564b4f2408f4f1672c71b2b67b37bdf4fd2a50964f73f550c71d4de9b2d9f7b55db356cfd7f479cd7c4e25c2d32e9a08219565d9251c96eabf8ff0081cfcf495cc8f50d96efada4cbd3c3ef69fefdf3a31b2b2d2b4ee54549656a8e925cc777e262b4f05a6ed0e0cd25324997b912b113d2663da61965ebad3d8755306256a799268b7d0d4b96aa1ce8b459bdc3fcdf47dfef17eb30d586145522830f9695fc648892ef5a3c5895a0aca1040d510cead997a3dcacccadf1f6b60b49d0beadcdd62fd340b4734f0b497bbc5991f456b32ecf37bc24b06774916f954fceb97719423e8ddd58b71ead4bbe509dad8733d12e5236846ed948163316c4ea388fa46916d775f48566b92e3adf4fc4b5de9b1c7fa8e196df5177100053b0c70c7518552410bd453a0e54791b47de8bd460b1bdca8f2368fbd17a8cf2eea6fc2717f070375a3ac844c7a0297a32752ac4c58561d4a9d49d4055618b0a06b8f6e221ae022d154d0802d842fd0e193e24fd1e88977a46dd53a1a4c36928f545073997f4926e98f138d8a1d2bb9aa0c1bcdaed43170fc167aae925e862e1eb31bd4d434d43bb1d92beef1484af9923f4b3e8fd9e9209e48a3be15cb4444b9ae972ff0016f8ce357172e2a5a2ed43b7161228574d6a579e369a17568e47bf8649f2ff009b67c5f71f2dc7a2b7139fb12ed5debbf9be93eaab1ade9724166f749e2fdefd5f67d9f69f3bc6a92269a768a481f35f6c9d044d1dbf89d3af12d4dccbc2aa5a8eb12453e974953ce21465d67cad54ec793b8832a65b191d6e35c6d69d23ab294278d98d6cd5910899558a2d2f39e9e2b4cb962663a99e056284f1af08eac56ca6352614d59530c3d7737794590a90b4b1c1d2a6d55e72ccbf826cf8bcfb7df2d6034df0979ba89a7b3fdfebf88abca0595b0949a9a49f2a296e6c88ae5fcefefbfa8db11925dce4d95952df4adfff003f18cd275a3075eaff002dbecedfff003b048d595f2f2fbba6d0969a6654a6853575c96cbacb4dd932a0d336adc3a18205b2ee0123c655346d4c92e0d5f55d0a2ca46c683d1ab78afca5275657b58e8c73a4bc4e63c0f1722060b866118b052c2b5c05756b49564b8824180614062d617f3941e7dbeced00c2fe7283cfb7d9da052fb97c7b1831ea2655b4ab0317f790425b71185063c01402d03d018bf8361b2e2988253c5de93b2a7d3e3cba786d823b228b4ac6727c94839ae133d6f1d44d08023dabddd87551c99965a79cfa8cf7bd94da87630915a99f7a85cd65cdbec4edaa8dfb8452af08f03709ca361cbe10cab8e3ab7a26a4f25b0d6c8dd4b4c8c4236c3f1c49b819cd5c4b4e1ef6fd6b8cdbe6067e054d9958f23701b92b5ceebd7d24186c4b4387e636fb9e5349ce26bb8017dc0a74d855350be98ef7eb370f9bec29cf81c5553760e8278ee7b88954b9a776d6b5d45b4ab4986414696ac65a5d2e4edb85695ad4b8a2e66a818bcaabafc3da28339d257f60cb96ada6c31322927bea29f6cddd5d9c26af282ea8a9c32159f26f976fb061d332c34b86470624e9f07a985bbc7a6c0afe1532bf235308caa7c1915733526cde1a3a489b5718f8544ad8352b665f7a29632ed4d272a76b656f25abc4a9554dd320ef4cb26927977c78a3b8a2e61868a91747608a7c2e05d51464d5756b0a24716b95f4aaab711173b6e6d3c72c793509e0d3fd3f50cb7ee2e873d89657339d577d2df686834c30a94255f84bc2dbef2e637fb175db2d2ef454d6416a76b7d242281ae475f48276e853b814c5b0bd8f4629992f465f7176b003e9d2787a9a1e4ad1d5895480656206527377951e45d1f7a2f51cf5c743ca8f22e8fbd17a8cf2eebe4e96138bf838114f6d0b40427898b4a5388b4ac3295b13a8d711ab0c3948cac5aa3a46aea94862e2e2eaa95556e7b577ced708c2b98c28b27ca25d527657aa65c5e29614cfb9ab0d86699fe09f2a2a3a684d0802618a3b1387fbfb4f651b125d08dd4720bb30f22ccccd75773d22aaae9424a9e8e9b33a861524fce1e793323bde5d91af4198dfd361bb89f47863af60c2c2165f73295acabb1ef99b52c71fe26ffa72dcf98ae5cbad9b31b43df75d53bcbdadbfafabb0c1e5051cf2534355995cee8fb7a49f4afdcbb3df36f3228e1792592048a2d5d658bff9edfd7f16c3e658863d88625599dcea74447cc8751d966a2d0aad22962567cc8b5a76751770d939bcc5c8228b18b1a8e08f9ebeaa88eeb6e6fd4bf17be40d064df9ba2ceb19dbe0b958eb2927cc42c331ce5254b43a4d28eb2e33da68562d3b15da366d2bbee4ad25c68e154cab7d6cff00e9c2bd66eb7dc2a8ccd6a9ec7073786155dd6dd655cc667fa7f0fc36185518850e3136210c2904ccb4fa73e768e6bd7f87e0753032c97b45993223dad6b747ef7dafb7fdbde3e558a51c74d8b56c71d96a35cb97bbeffbe742ad629cfe45a7d5bd1c9a92ee92df6be2dbeb29e52c3f57659fb06badda4b4d56b27473e87b379775bcebf17de598e3567b57470db9ad1b7bfd9da32b2b28bc482363adc119664cb6394589977b7d0dfe4fcbf09453953ed5f82d52fd64192f719f2db2274bf98bf8e4bfe2690959e3b5c586465cab4dc592356d2bb1972c4d1bdac4469c6bd6d69baa674d1e5bda76e0c4faba57739188c37a5ad362263c3d1369acca4cb2126f14fc24b1b81268e17f3941e7dbeced03dc4d08022dbe1f079f6fb3b40a5f72f8f63968dad2ec725c5052c4456a5cea5a6100092a01bbbbe29a381d273ec668a1e0cdb9bbbb3df1246b56b5f62c55b9a943bc6816870ca5a5fd144abe91770b7b8a7894973b9261b25ae78c91ae6ab7b9de55b54bf3e97b88eeb496a575a3114ebc4a28c646348b549db2c61b1e660d4ad3effbedfcc54ac6b9cd08b4e194bdc1be03b15f10ab69132d770bb87c5970a141a3b9cd9a68ed422a29e4ba50acab696a7b788a8d25da548006628d549a2d2e3e94325e4cca9b4755024c4965c9c324832ddf9da2b5c6161fced79946b0523d4262132b5dc3ff00836f1c8a2921c2219f32c7add9a97bbb4830da3a65a345820d150fb6493bd775be8f01e9302d943432c9c8af832cb1e190ddd4dbbbde2fbb5c865e1b91656ad3666553be9bb894d283a687f98e6e2d7f2d4b578893ddd0e5477bb997555d1f4eacfce72bc635d97045ff00cf69b39715443cde592c77e1cdb58c9930aa6674e3a5a77dab1c1f56adb3e3f0fda24567ec35baebb12532c9554c9245970d8ead4ed22dabf97ecf39425c4aa6a269ed8e3bf4e64ecb96abe0ecfc7b4d29e78952e97425f699cd1ac952ff00b58954d1156eae75a08c67d34574cecd25f7bef37112d64b993246bc045048d1a4f512f5f6e5a91d12b4d30301a753a6145ec040159bf68b115812cde38889ea7818ae7aac33df12d4f2b894b256a1e85c78797169412ac874dc4d0802a6f2328fbd17a8e4ee3aae53f91347de8bd4669fb793a584e2fe0e10f05b82e244258d8b11b1554b118ca2b1655872251ee1ca4ea392d87ab5f5b2a76613a556b5f57115b0d839ae150c7c6a977e248ccb225c78fc6cad2cb53d361a3f4a2a505ab5b91d4af44bbf2370162ecc4edd850965c9a675319a4669b9f435bd454da65c74cb4f0c2b2a41a2258fa795a4f8fb3b0b18435d4554bd72a533b577ba91c597949a6368d6db8e9e06458959aa54ea731caec5d6baa529e9a492c5f0acddaecf98c082865a87b628ef3aec2b91f774957f94e8a3c1a0a77d318d2e317305531b93fc9fc9867bb7dd0bef85d35761f9997073a44b6e637e8e3557d3c466cb1ac358f1b477c52ef299e09dbd5cc96539fabc062a7a6cca693e0fc377f0f037f0dbfacc68e4b4fa46273ab6133cdd1ba737dad0c7c571c1e2b4cd0a435ad9165426c6e8ff0059d875bb5211add0b142cd50f6ee271317d67b7950f0fd5454f72adcdf769f8b6894cd1726f0f4adaed75151f51ea5febf61c873eab99e7669e4f8478c216d45f9a83b5de0e8b19e51c54f5291d3411cd51125b98d2dcaadb7b3f1784e4d959b536b77de24cad7a4bb1d1b3692a792e14ce588bf1b4922247be9c372dc6dd161b1494d6b47b84bee5e5be933ae26d60b4cea2c3fe12fd1c69af757529a985d1e4e2da770b5434cb1be98ce829a9157a4cbd6659e7babe4755394e5069c67f74a4b1c4d4d0802509711f28f4e329db88bf4dd1d1a49befc2a35d6a508335e358df2d780a1591dc998bc06bd4d3735d2de35f53149a3baf8d8d7877b5a8c51325cb5a188c78c1b74e914f4070c000520934b086ff10a7ef37b3b408f0af9ce9fbcdeced012bb97c6ba1cfc6a58452188b6aa54a58db8ca07804880753c8682ec42aaabf4515be96d3963bbe45c59783554dfa596dfc0c58e7b216346156e9685fab6e21a8db888ab182998f28768de5e921b4aedb87b04b68d3af5414539ec494d7b7fc3297fd25337105b8d45d587d2ff00a4a48c47045acd48f4a15208f596e56b5080295649695e9ba69ae2b6213ebb54d1c2e2d171204589b64c263616b9d52f21731ea9b9f2d49b04a6cb4b8b78a8a54e54cb2c3865d04964b13a48bf731cfd62d4c73634ad3d917388db4b5be33e35fbcd1c725e78f5b1e5e72454eecdde2862190d36211ad23d92d14751e96c3d0fd3d7f0ebee669791a50c6caf8a47991d99bb4970b6ba19e3ec104122b62154ab0599b1248c45492e4d49831cbf95878c6962585e69291274af95f67697bddcf014df36961ba7924796596eba2faaeb26cf3fc66dcab96972ee1972b1446f9975e65b475750fd3c92597f1757e8ff00c8b1452ad8d977bcba7babd53474b0f1adbba6957297ea39bab96e7cbe04343088f5dc65cebf0f997f6bb4dea28f2e98560229dae9ae1a3117539616314077d50f70a8c5d55b91d4a1b4ef7d3a4b4d0802a2b7d8e0fd463b65bbdc06140e89ce18ea794fe44d1f7a2f51ca1d5729bc89a0ef45ea32cfd8e8613f7f0702280122922b1346c555627560218b8ac5dc360e795f0c3d67d866c6c6ff0024e3ccc711baa9b58499ec8dabec34297bd2877cd6d866d4ab47d2445f66331eb22699e3e33c731e9068ea564b248bd2529627a6f516a63685f3a00ac6e754c9375d052483026e9a787ae84b8553735a99fb6e50c365e6f89c2dc17dbf89bd2c797302b1152cda452a9343b8232dc412244d6b91e2716b4917ae1ba599d73298746b5b3039768e099f0f56cf7cd49a998a74935353e014b5b5d49653d1f8636eb332b685d85aac7ad685d629e349696b524b57aae71b5d2e64dcc96492a696295daefd2bfc6edfedb0f5946e93191566253e2d53ce2a64beff000dabc312f54969299aa1f48987d24b58e8ab1d97ea3b5c3f0a5850e5e265a254b54c9a2c2add5965e5a36fd19b5147688caaae61f56ac3da55a481949dd6d26a65d655c42768ea529e08f9cd536acb5eaf58af93016a9a3591ee35a3e8e131b0d9d6a2fb63911d379596d65352592d42b75eacaa31c5f2964bb19a5ee6d37b0b5f81a554bb889d1fff002394c5d9aab19a58f83798eaae6a88529e0f1561a1d6d55a0a664f23544d99c05775b9cd6c4225a3a6455df32d7521746da08c61d6265d6ba958d1c5e3b66493d1330f45035c943892adaf500002d2a2f611f39d3f79bd9da02e4d080215f39d3f9dbd9da0555dcd11ec61c45b52a445b511476dcf40009100fa6727e2e6fc9aa25eba667e27cc996ed3d73eb8b1737c3e961ea45b17f94e3fd55ad4a50dd835eaad4c9aadf3c818f6a98af1b6b3cf9d436e0b8b51c999d1b146093a11a392d7b800ab88445ac3fa4c2a99ba9e15fc186c416e4bbac458235d413c7d597d6487634a08c8aba7cb4278f4a1858954ebd24015d9b3a63a15f82d1f68c6c229b3a6b8bf8bcf6f46a4f2030d979e6207436ad3d199b85535cf73163199f2e99c6af536429cdb2b4d8662f519f937a6dd453ac89566ad5e7723df86c7e8f64d16568f9355ad919dd9f48b14dc6d14764acf737fb7f03d1e06b94599964e42d15b26273aacf9df044f6761425d33397a0caf77132238d2278b6dacbd52ad62db58ea63c67f37f458bc4bf04b990946a63b4f29a5b749625e912e312f4b0e6730d1b030b1e973488643c5fe2755df34b332e12ad5b65e20fdbb4f15b31f50cc05a8232c5ac344d12a12dd719eeea2458f4ef19b2adaeea6ada51ae4b67bbac8763e9b25af55f7399f514b928dec5403c03b870cf4eb394de44d077a2f51c91d6f29bc89a0ef45ea334fd8e8613f6f07cfcf0f4f0920078d88865002d2b1d772263baa6b66eac4abf89c62b1def21a2b70daa99b8e5b7f031e39ad858d1845fcb43a576b90e7aba2b66cc5372590a13adc7973b857a6e912e5df3d78eda6b57458feb08ba172be21524d0802d4ae9245afacbd6002955c196f729d0dd9c90cdd7432f320ac85162937f74bf86b5d8622b6fc4fb544b6da925a5d28176811985562080652589ba1751380f62d28e481cb728a5e6352f1c11d9515e8bd2f77e36f6761cabe0d934d9d9f7a4513ddde63a3e54c922e334b2451e765524927f314ab27a99a8dd69292cf82738e91aed3fabcc7a68199a25f0666dcb7c96a38b99248baf429d42c76a19180c593448bd8d86f5b6c271314df96be4b53629f5fb05096ad9be4d1dffb46d31fe62d452663bf50cbc428679aff00fb9a74dd8174ab769dbecd9f66c08d55aba85736d8aad571488924f3c9359d5e8e2eefdbb7ee2f2acf4ae988ac7023d9b564cd665d1f4787e3f7c828f0dcb9b9e55c9ce6a93c5fe8e2ee6c359dad4d52477ba6d6b7b3b0b599574a032d17633a0c722bea9a9a092b2a99ee93215b2d7ecd5b4a18ad6625223f39ab830e8bf46bd249f797dd79ae2d0d4378a9539bb7ad3fe5b0c1c4a2692a67ba48e646e923eb5c688d52ece94ec214e2cd931345967ce7b2d56b6d3e814312d3d322e66b43e695952d1d4a2c126e25b71dc726236870ccea992f6729c52f719487179f3a6752b2ee04aad59596c5d7249d555f262f4885e9ca8050c4e3ccc3ddba8f718674f2c59d0bc3d74b4e58ed605ba2b43978b5d695000037988bb84fce74fde6f67680611f39d3f9dbd9da054db9a63d8c184b8a528cb71b15292fb920000c294d0802670b839d627450f5e5d87d56b98e179114cb3632f50db94f16d6f4b6fbc76b3c8703eaad73d17d8ea6117a33f7322a59af228d4b92aab391aaa9c7a9b49e392d1ee215653d69605de002f33e6535a54c1dedad9a1fd2afa88f9e40bbb21596ba38712a699772fb7f123b9274159265c272f3c99d3693671996d7b4cdc360e7559d8426a0a74387c1cde8ee32eb3a69ad366aa4cb86d53369a2b9ee25442dd247930dc60e3d3dda4e8a76b61b4e4f106ceac452c4df30a979e358f93b3ab49937c4fabd1305e3824b336ae4747c2ae6fb8ea655b70c7e833ac4dba7d139e825a96f723e03a399491b1e83e9cdf8abe4cf2ee3e0cabcf28b2a7d1cd361e621f3838611ce6fc319a0b3e0fb559bcc1897cb2e32e33f9bfa1a3d88d77cb3149c2c55ea1edd6ea325a48ceb6bda4248d2666a118b9789064e26d6d67a0a451b6bd4272834cd0b760cb898d0b15ca0a765173654b9a419aa699776490c2a36e86ded964d90fd3626a5d5ad4e6cf8c747aad29b17df12e18a3fcc5277691ee692f62363c3a7141145c6873659de5e553d000b8b4a6d063ade53790f41de8bd5b4e4198ec394fe4361fde87d46797b1bb0dfb783e7e28c280a007800048ac7d2f9288d1f26a9bb4db58f98a9f58c063c9c030f56fd17ace67d4dbf11bb06bd75f05a6562bbc8dba587662ac971e78ea9135bc465e20b74285f7562855b35996301cf563cf4ef0c94dc52a5cb4d0802f79da50cab254e211af5d58e42b3e4cfd9d5f81d0f2725824a349a0faddeef6c19b87824d958f4115a4ab231e7195904aaba0825932d0b4fa52d326b1fe0ce32a81c7e34d9d5b5ad99225987edbbef616a638a1bf2a7934e1496fdff00196b12a6aea89b10e6d97e2a3a68fb5e1f7f6fe018ad355d3a628dd1a59491c30f73e93d44192a2d3e0c6dc8bfc9d58a3a68638a491f429d2d4f4746ec73d8544b0bc2bd8537ab97e04ebd838389fe6af9342f139d56ab9ac8e924b2f7ba4eb5bfa885aae7aaac86dccf83bbe748da96df06f7bde0f0ef7c458a68d64872e5d761622822a5d31476588172a96abaaaec52acc4e4a385db22099afdb0aeab59b4f8763fbdf46d2bd5cb3d554bb32745145b7547bb2aec6d9b76f83c3faedd869474d146eecb1c697e9d234ad725bc166eb1372f6a0accacb950c47ac9da17ada9e869d2248ee5556d7b17c3effd9b36dde0f0ecf31972cb2d44c8b141243170c76e93a195ad85e3e07d2dd5336dcbd26a57a5bb145a73f3d264d6431f58ede85964c3d23ccb10e4b12d3590b760e83065bbc6eb2a9fa875351aa60a54cba68f5f58ce6cd6d3966a695fab2be95d5c654ac0c5355954c0c4e2c9ad7b771b51d24977a064638ab642dc77da74306f93f932e2573431ae03c03b4728bf847ce74fe76f67680b847ce74fe76f676815d772f8f63054b51315549a22b51d8b602a80e56761c8cc430fa386aa3a994d0802e386a257d96ddd5d8750ccb26a8a48dd3b2c7c9c78e468fc54922774e5e27e9f495eea572a9b22c4d8b91f4978edfab2bb31c2ae275d1eed5cff0098d7c0ebaaebaa5e39e791d110c2ff004d755cf3a1ae3c4d1dad379d9b84aeccc7b539b1eec8644b8854abf8c323615cd769a24d47073ec4a9a1e057ce6eeec3179ccec9aa437392d065c35b5cdbedd0afaf689e959ad466e24f89cf9d52edf94d7c0e93261b9b7f78c88e0cea93a88d72698cea2d762ad63663da3c11da25b98e5897a14b4910a1593e839e89733104b8d4a99330a34d1ff88217af4a915365d9568dee92c439681a093dc8f85c9f2491749d5bab64dab1dfd9639cc3f9dff8437348ef649a353b5f4ce15f2512ee36091c4a9862c13c937c1deeb88f135b6a4bd81c6cd0d133471a22248a55c656d98a319fcc347b1455b405c25c0ac5248f7122910f192a4187ca3dfa5fbcc988d7e51ffdafa664446d8f892a695236b72e1429b7d0baa7570cdd07131cb6ca331e1e31e1a8c0300a040c0c761ca6f21e83bd17a8e3598ecb94de43507eebd92897b1af0dc5bc1f3e0600014f000000f175693ec50d3b43474d0afd544aa7c9b0d8f3b13a58db8e5d87d8a5d2717ea6dc6874b074dea5568dbf66579337f66587915535141ea6e7d319c6b4e8892b4ffa48ccca9899b7a7fca5e766e2cb29cf2c11f8d9e34f487b580c8ac5558666ec1b3c8ea6cbc130fed2bc9f89cce2f84d08029c4b4732c1d2b5a77bc9b8d5703a29175a344b68d6b2c5af7a92c68c7168058155ee61da4b481e5282086ae533a58eea2ef9725d4846ebf062d50397a3a9a6a1c427cd924f943c6ccdbaadb7e21b94b5343ee34f44b3df2dfb37787c3f110574752c95b1f41a3108eeee8626d56b0e35d1c1f2a8edef1e9d5735a57e0c669e1f165bc2abb886fd52fc18c5a26979e74bbf79b553e24f3d89fe5af9342f13062d2eea596620b6d71e561402eb92e2bb30eb25a842eb6962815a790a45876e22bb172ec21918ccb1c7534b775369b98248b26ec91b9c972825ccac863ea2156292dd4b25868686f5254fabb46c56768a1d53c91a7798e020a99d93c7c9f9856d4fa8a9709f231d4576374cba69ba67fe530679e5a87cc964bd885463b104088ba1c99e4ab3640000693317708f9ce9fcedeced00c23e73a7f3b7b3b404aee5f1ec60a92c444a4d195a8cc59500501cac051850003a5e49c7f2a93cca73475bc965b70f76ebca67c4f03660d6e96869565a604b1ab39b558c6349be729ced31132aaa1d96170e5f276997afe193f138aa86b61763e831aaae194aabfa24f64c33b748ac414505d31ad52db919568e3d65865cc98c4a20d12dba8a75d2972592d4b4c6ab92e71d452255d0e4512db585ab6d848235f848e06a4f1e6535bb9dd321704823c96e77577d3bed91757da6cddd095ed2c8a778a992d72159558ad86e1b050a74524ef6787c634d08027da65e33aa6b8de55b52d317131d64677cdb5a916f49922b120a6914653d511475020c5e51efd2f73699319b7ca35e8695bb7b7d9312236c7c4952ec1be85e528c5be85a3a784e35f2727ea1ce9e090050359cd16e18500240ed794de41507ee7d93893b6e53790541fb9f64cf3763661b8b783e7a0004959e0a30a007aad6ea34e0e51e2f4e96c75d3dbdad465815b46afca99962c8cbb1b51e3d8a56d4a453573d8ce5f6a1ccd4d248fe91cdd235b5b0b76f61d9aae839f3c6a99654c8ec605afa573335e91634b4cd9d54d4ac6b4c496e339b6a412aab239d9ffe9e4b33726b53de8b2bdbd93849e5b6173bbffd376ffe97fdfb954abf8abe4a9ceaf530b693db6911cc2089d489752161d7415d74a0ca070d552d34d7af4f7d4625ea20c427826871065cf4e715a8aabe63620cf91f05669e04cd96493f02b51e7d43d1493c9058f57248bdaf01eb17a56863353088d9aa5e436eab70a786c7a330b358c79a99ae96a6a5e265fd704fbe7afbe44ec40a42ed6a0b3c96a0b26e15e792e7b4bd5482297db2bcb22c70bb370212cad7398dca19f270db577a57b4d11adcd90a733593b4d58f27587a66667b54ad1c771bd86d1dc6d6e919546a689b88778ad35b232d0a552c22b5c58ca55d9f18c2ecf8c63a6bc4e0cbcea000031597708f9ce9fcedeced00c23e73a7f3b7b3b404aee5f1ec622a93c6a2c6a4aaa28330caa030a488028c2800c74d08025bc9af9a7d3da72475bc9b6ff0cf4f699b13c0e8607f97fa2d5599321ad5663c872dcec3152bb4d33f70fa3c4bfe1f4bfe927b27ce311f91b9f46a66ba8a1ee2fb2619f87f654c5ba45b51d89635b751e44b6c27b235a86210a95725a64ca5fa973359ae98b540b4cba12e2355d7712329edba0802d46da0f2db8225d03b310040ed6e931b105d0e6cb2f11915db8ec5b1f2158ca1463c6d46e2b10650b41400cee502dd86237525d873f09d2e36bfe133f7d7da39988d90f1254d28f809d4822e02753ab86e35f2727ea1ce87a007971a8e71e9e0b70c2801da729fc81c3ff73ec9c3b1dcf297c81c3ff73ec944bd8d986e2de0f9e9e9e00c56028c28000a0028c32b5ba8eea092e8518e0ced70a6cec3e16ec19317c6953a9f4f6d6b41278ee33678d4da96333e78ce79d531a7a45992d37bff004f26e6e95b87b70be62998ca794353ee5e3f4b55c0fd1b153752d54a9d7b9f4c66b90f000e7880db851ac6cb85d9b5e82f15aa635912d68ef47195bab5d80e455291a6c22e824448a9dd9bb44744d0557b91d049a1269349d2f31833926cb92f44cb5d5c224586d343939599f074dab1eae1dbf19daff2315bdccd6313616bfe1f0b75d04ae6bb496b31577772cd2674edc471b93665e237f214d8b9c053974a5c5aa290cec5366b9ee25a96d085566e1342900739ca792ec98ce86e38fc4e7e75893dbb8ba4d10af50a2d0d3663f70eb6869a4d0802d4b8cdc228fac7436da968eec688d4ab398d53be6a55c96991235ce590adcc2ccd6ae620001d5380dab0c028c0217708f9ce9fcedeced00c23e73a7f3b7b3b404aee5f1ec5055188e3624205014614000518500053aae4d37f87baf5253953a6e4c374354bdb33e2781b306df94d4a931a5df366a4c59f7ce53713b7529e26df007ee9f43c11f3b0ca293ad4e9ec9f3bc56e6a3755de6d27d1301839ae1b454edf5516c530cffc54f254fc8d7662bcf20ecc5591ae73108559d8a0be38b93b14e2d5536972f102fbef8ecb6e93c6d2e3ba8803c7b87a7b1836aee0a044fa8c6c4370d776322bb70b63e42b19030ac0740acf58f061400ad89479984d52f60e52263b0ab5f81557fa5b4e3603541c49535222752bc5c04e7570dc7fb395f50e74f03dc2dc7806a39e07971e0001eb1dcf297c81c3ff0073ea3843bbe52f90387fee7d4512f63661b8b783e7a0028c52000280c0028000c755c9d9eea2cbea39ca9adc9fa9c9ad78ff004bed19e75b90db837b24a7c9d5cab719d3c66a6f15678ce59dd31a55295745994cf6ef26a34a78caadab495b68c231d9726b12f75306864fad4d2c6c1f39e49e21ee6e2d352cbe2a573e8d718a64b5ca4566118f58462a02bb11dcca4eda4849023bd8aefab49348d6a10aef8ca046cc54a9dc2c4855a9dc2d52b33a76eb15eed63cfbe42ac6a5208b12a9e67473c9c7baa72f85c0d34c69728e5d10c2bc7a4d08028b9c9fa1b53318d2bd29e4955b98daa4832610964b4b2da50ccaa96d10d052aa96e29330eec4674208fb9ccc64bfa9e81e1e9b0e580c28c005dc23e73a7ef37b3b40308f9ce9fbcdeced012bb9726c63c6c4eac55527561496dc940140914051850003a1e4c36baa5f31cf1b9c9a6f864ebd74299f854d584fe5a1d154ae83067df37ea770c09fc71c87e27708255cca9a58fad29f48c3e3b61b8f9a2dcd8e61eabd7b8fa8aae5c2609ff52a6dc476b889d6d4255229d8c8299b5721051ea7b87ab0a35e12dfd40bec48c46aa4b69500d18cc02c8004121955db86ac8655597c7b8ac6336f8a33aeb14da20ea7a78a0c48857c49f2f09aa6ec1c84474fca07cbc1a7edbec539888d9171194d44e026215dc1ce961b8d4e6e3f950f45b82e14d273c6014000198efb94be40e1ff00b9f64e04efb94be40e1ffb9f64aa4ec6a838b783e7a2800c52028c280c28000a07a7b1c8d0ba48bbe829e0162d6d3bfa1a95a885245e227963b8e5793f886449cd9f75b74eb63b590e4ca963647a0825f552e326788cf78ed37a78cc99e228652c630eb23c9a98665eeb1f44c0710f7430f466f1b1696388a9833a1752e726312e6752976e3f46dde29956e5f052c77f21130ecd71e36a300104840ca5962265180acec45ba0ed739e3169041695eafa34ed97d63b52e31f159745a591ee2b19723710823b682ad74fcde99edde7dd362a8866b47eea630ffa254d0802d27634d12c30daa6460787f358756ff11b32c96a16b7b50b916d22a992d312a65b8b5555266c8dc45b1a8b2496ae623b1e0831d355b572387235ed99e9e9e1e8c54030a30105dc23e73a7f3b7b3b40308f9ce9fcedeced012bb97c7b184a48bb48d475146a93ab12112929256028c28001afc9d6b713f4369906b727dadc4d3ef2a97854bf0dfcaa75753b873f3ef9d04fb873f53be71df63be5ce49d1ad663f3cd2eed2c5b3f36d3b9958e3790adf0fc5bab64675cfa8e7627965f0515dc2e6dd5229d6dde278d482b34a198831aa5ae72d522da8547e92634a9a3d05b50278d463d154a8925e02265bb7895544600209770cd9f539a33f54ce90b6320c69f7dc45526a9f1c42a6ff00d4acf5466d4783a92a4187ca96b70f863ebcbea312916e735794faa6a28fa9e162951c5acda9c684a969b48b70d2115def1d0c36c73b1dca835c170a069300c0004801def297c81c3ff73ec9c11def297c81c3ff0073ec94bf63441c5bc1f3d3c3d3c1ca4f0000091b4d9db23001463c0000035f92f4cb558fc2adad1536b31d7e5b52d4e4b7a2dd930f90f05d5b5537522d8bf89d755d373a874f8d4d4a71f152e535bd8ebe0fa53c94258ee336a6335206cc42b54c421d1305d6d728374359d897da34ea63b5ee33ab16e87b69a84b4a98eaf08c6f311219f7ce8236b90f9bc125d6329d561b8cc50c2ed5925889bcc6478fd842ed762b4387bdb533d84d0802f65d6dba8cb5e52c5515894f9163cbd66e139ec4f1c66c427a8963bde5f12adf54bf41891c8d23e64bae5de6372e1528bd5b8aac7d039e532bdd2cf677b48f59895252a234f3c763f5751cd52620b324fcee7921774b7a48aefc0d1a17c355f9baa50d73ef6eb46ca4fd9ab6b4a8d7277ce86a45884559479d078abed5bb8bc060e2125d317239563c3ed8b73364b7f318f2c9a1d98a563b5ea2365d8ab2cb6b91411b57565dc09ed151a492a26b608ef736a8635a586d6df342a829a2bd0a14279c27a9b4ce792e1d547ab03c9715ddae72ed141ce26d5b89a98ab50b6d4cfdf35c1c8c38a6e92218518dc72cf4f4f0f408018518082ee11f39d3f79bd9da01847ce74fde6f6768095dcb936319541761eaa8d68a4d4651d441d491461400000d4c0fe7687ef32cd1c1a4b716844938d4be0e6be4eca5dc39da9df73a29770c1ac5e98e336c7798d4e42a2ad3627371b546c5fc361d5da729c8475c9c421ead45dfc0ec17b273313cebfd148299d5d21a3235a861d64973da52a415a9a3cc9ae366352a514169a0a0cc044c491a91b6f93aada212288c3dd6892010559f4ea283e9d45d9db419f2ef972819d55e38849aa77c84dabc4ac0f54f0f577cb14839ac565cec59fa917463532da8559f4d6557fabb4b11368372f125424231e5223a10713998ae631e9e01798cf40000063bde52ff0097f87fee7d470077dca5ff002ff0cfdcfb252fd84d0802be0d9bc1f3e146614b0a80006b7880623000003c001a38da6748e3df66b5450a1d9f23e2921c3de448ef96aa5d2bd95352ae7a96a9458a4c9a85fa89174b766efb482a6867a37c339a7c9e24cb996ee1fd5fafc20f8c61f0d3552e2157254e54ba5993a55f0f0dbef7e261892295aaed4cea74fad1696f6255cd57ce963b2f7b597b4492adc84b496e214555959963bab2dc411c9726a31b375d57d8df135ca62620655d71bf5506618d2d35ae40e66ad5f31a67bb5bfd592c7885b0be6e5bcae9a57857efff0062bd647f57d2758b11e1ab1d91c51df2f0ab1a238f2d7b94b7b15638da47b9822833a67cad6e4b1c4cb53f097faadb72c7c5fd0b9165ae155ab9764f7ec685bb3b46fd8d91e16ea5dd8ab154f3599db22399376e9f57e0a5b68d64c9a858e3bd1f4aeee6a754cb58ed25cc8a34cc6df4ddea8eba0d2e1ae5e9da86a4752b9397147aefdacabe721e672ccff0992c4fd1a935355e1be3964e6d2d96b2ef0d2d644de235dc50e993666255d3519562a74b628ec29d4cb70d233711564050620791b88453d6d45ca2a4bba49770b78955c5dc3e2cb4d5c5bc6556ecb6b67ef5c6e46da1ccbc4d7c4c9e88619fafc993114ce8670c28c750e69e9e9e1e81030000105dc23e73a7ef37b3b40308f9ce9fbcdeced012bb9726c64c64a4519290430000000c28c280016b0f6b710a56eda954b149f2c87bfb056e2591f2a1ddbaf09935714d08026bb8d92acb15c7218f4267f26a4e63ca278dbc556269ef6c3bd8d8e06aa0bb7743a6a56ed1d6e0d5dee95024dc7bb22f6b61cdc4af72b6527a9733963cc72e4eb738b146bc265109e28ed1998f59ad2266661093ce32c70102aeb27e00022090141d808294e673b6b2fd4b5a507d4e68514a139113cec5735a8a7a328a32ef962907275cb6e2754bdb24837ed23a9759313aa91bafb7f80987cb9d7b3719d05e24962721d84b3b6e116c3745c0e562b9d4601462f329e81e1e8001dff297c82c33f73ec9c01df7293fcbfc37f73ec953f2a17c3c5bc1f3e0001ca80f73345a20c030a28c0280a6ef24e9b3b16ce6dca74ccf4be2d8611d2f236565c42aa1ebc577e053896658ab916c1ce87731ee146bb0b5aaa986a172f3534b69e12fc6a4a79c499a2af49d6b6e228205a74b62ef19b59064d65dc12eaf48d7b8a98847994ddb4708a46bf3af72c5e9339a3e85d8c4a9ca57ba5dc3a2dd872ce5ea7176c1e6d5047534eefd24727f7ef6d3a2ab736a5fe3723e5054c4dcd63963b1e9d1ee55eaed21f76d6b91f23458891f698f71ec5704c4ac9a812ab9d3f833331b4da602c11c95e8b86e65ccfa63e235337b111477723bdc130866c3e7cd8ef767b99bce737ca0a66c27a358ef457b735b51d2415d5d1d03c7530595a89a6d956d65fd7facf9fe275d3d4d4bad4bbe96dd15b534c0cc976ba11254c8bc77136634d0db26843c828ed746abe84d0802627e26ea96638a9a6a9f95f45f9482df50a8b02dfa642fd249f09cb2878b99ed92f4eb1b58350e87ad9f8fc5f74862997892ca52949eae4557762ab35c4aa9cf60896e9917ae6bbb5cf6aee219d491ebbba85e5d257295312b36820ab8f3a99d7a9a947de248d6e4115ad611ba94e7473c3d3b67258f400091006146002ee11f39d3f79bd9da01847ce74fde6f6768095dcb93631e362752ac6c4ea292c4a00048a000000292c0b754a2f6c42d61f1dd537750064e47711ea4b8f24087708e76b749c763d1d0ab397b9352e5d7d553fe95166fea674bd627c0dade5143da8a4532cabd3521b89d0cebac962d2334773dc7acdc2728a446d42b0d70bbce41232b0eada04551c5010476b876227618829cbb85462d4ec5396ee13428a529f7c82e259d483b26b51461977c5b7ac32adba8b14838dc46e879eb75df6aa91e1ba508b1095b10ac7b7c52bedb7ff91668a3c94d475157a48b95772c4bbe206d6bb501b635b54e44ad73d6a030a3161481e9e1e8001dff00297fcbfc3ff73ea3803bee52ff0097f867ee7d92a93950d30f16f07cf800072a1406000140614000dbe4b49cdf107a8e044b7f1310e83068b2e8b33aee2b2dcb954b63dcefd47b8c3c2312ff00b79ff76dff00136cf2d8981a17b6a75a36b9408e75b9094f245d1e99547ce85863cf746eea71fca58dacee39dd626d153c33ccdbeda4e031969eba99e48a3d17ef1d95dcd0724d08029774da4fa261587c782e1f3d7cbf2da8ff00fa93fbf8cc0e4fe00eafceaa53baa69e3956d665af18c455cab3e2ed51528cbc1bc4785e0fcfb129ebaad139babdcaadc4412d3352d35cdbefa981eba5a7a6a5c892c7e22d52b5666d8dac799a486d68e3b11f51c554bc70bdb966b55e3753225ad1ef6f1ec186c54ee9355eb95ff2a830eb464a6a59c1b0a8aaa14a8a94d1c319ab592aaa65a95f9f2c30dbb88674f24f55bba22eb155bd42b49715dba67b7813530c46ccb4e891aefb96a2819664cdef0fc4cec4f1479684eaa7b686f39999ae1008aaaa79bd35abe35f74496b1637b62d6fd6335d99b531a6081abd55d8cf2bdaba118c28c750e69e9e9e1e81030000105dc23e73a7ef37b3b40308f9ce9fbcdeced012bb9726c62464aa41192a8aa3b13a8c46a4849580000001a186ae8790cf35289b2e8ae052d8f91d6c1b89dc28e26ccb0e62efa0d85cf9946976fa6920c556ea67e0396cb93d687755ae5a54f2095710a2ce8b43a69917b42e15264e3344dfb5cbfc54c6e4c4cd4f8955432df953eeddd7d8362188733c4124837e297649f815c915da05dd27d3a420b6ed598794b5906274c95542f7c528f631c391595b2a958b6f54f2d61d94562b24155986b58653d651408588a4dc26d444f20ea4149975dc579eee142d4923369528d4b17a814a55d7a84b6ddd2558f89b710c9acc7292974c1f0997f94db1ab3e942963474aa664b24d08025889c473f89e3cb51f07a4f15c52758c9aeaea9c41fa793475784af6da74e0c2dbd4c52ce4f1699ad2d5a56ed17ed3a4aa619d886d0b49ad0b46b4cb7115a7a4996796805c21e85a00481dff00297fcbec3ff73ea3803bfe52ff0097f867ee7d92993950d30716f07cf4000b0a8518000005000240eaa896dc3e9557a872a75587eac3e1ee12a5884d69b7438968cba9f4643189780aa78127a5ac685665d8eaae06dc7398a6ab9e97c549a3aac6a458cd33699fa177fca7065fa7cb13674d686b8e5a31727a6a6ac4f84c77892c5492265b471d89c253abcf54ce8248e6a7ec94e05a9aa775692344342d7335ab10e333c547d1c5b8615246d5d53cee5f1516ef698e82b308826f94cf7f74cdc5e48a95123a6d0888381898949ceaa72578dff976104b034c8f6efa6a2f51523468f55531d97eedc538a566ac78e2d6fbabde2d5115ad6ccce682792c558ecbb56a346a659e44b7a344eb169a0a9a57baba492fddd5ecec2ab46ad7c8d9967640b59af27a68205e91ba67ed11d655b323f368ef725a3ba44d349ffb8c6c5153414fd24bae5fefe220aad32f08c21a14e775de34f63e9a6793d127c4312bb4c466be24b1a65d3477f6982d66d847652fcb22c297349621973e20d27470684eb155da5a89ae964bdcf72cba3c35bad4cace346b6a0ceba13b803cfec9ad4cd2712018502c318e7a787a040c028c0417708f9ce9fcedeced00c23e734d0802a7f3b7b3b404aee5f1ec60a92a800aa3b1328c00488300000a06941e251800652f88bd82567c26781bc36b6af0f836782e34f10d54da800e6cfccebc15ad870f5f595b43343b21976ec8f637857ded9b7597abb12a3ada68ec8da3aa936d8ebb76787c0ddefb000b535c856d333530a8b6d051c2b14ae8ebefdc9a757dc4951ca8c468dfa3a8cc5fda6cf0801a5a1475eaa1855dae26ff00aceb163e96181dbcdb7fa92af2ce5dbe32922fcfb7fa0019ab8282bfa8eb2b1345cbb811fa5c3dfd193613ece5de14ff001a54af99767f50033c980829b50b55d86ffac309fd34ff00936ff520aae56e1a9f166b7eefff0020050b828ae1af633db9634edf27a3964ef5abfee6754729ea9f6f470470afdbbdb7d6006d8f0912f62a67630ebb12a8a9db6cf532bed6fa3c3e0d85789400d2ab45d8a99aa4acbd53c7b40072091770d48f5428003c664c4ec35aa16a8016988f2d51594000148cf00051c53bee52ff0097f867ee7d900287ec6a8366f07cf0000b04185000000000240ea30ff9343dc00052d8cb87adb80039686f210ced6b800015965963f12cc8dd8dbe01b6d7547d1b7c1ddd9b000ada25af62c5765d8b1473a4d2e5d73cbb767d9b36fbc6fc587e1d03fbf1aed6fd7e1da00619528bb1ba16ab6e727ca0afba67554db6f9b618b45b569e6466e95aff00a400ad474d5f2a84d5bb1ea5fc31b2ddf66d36f0cc2aaa4579de3555fb364c6b36cf0800acd5354fd34ca84f26112ecd99b1c891ece255f099f2b6d85379e4f3ed002d45a577313356d332a56ededd2ab2adfa77400d88b4a2e86276ad58651dae002453c837cf5f71c00911f8910c0058623d3d000200600020bd837ceb4de97b3b40004aee5f1ec7ffd96821c0117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423e0000000001076b4830450221009faa55b1de722c923d2e1826bbc6117d6fe0f409190936dd0d9216bddfddd8750220673cd94a6b57889845fd1e38cbd73cc10a1be8a027068e681e8cf9074069d347012102efb8ec08dfbc390287d7b6128e92c6955db28a37aa1118692f4eeba00dfc225e0000",
          "signature_format": "psbt",
          "cid": "QmZD3AFepp8EZG4MZUQk68LQHN55xWMTF2dcz1yJTuVn2x",
          "time": {
            "block": 1685190497000,
            "order": 1685122226879,
            "ago": "13 days ago"
          },
          "ago": "13 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 999999999999,
            "btc": 9999.99999999,
            "usd": 264462316.07013553
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 987844809619583,
              "decimal": "197568.4809619583",
              "degree": "0°197568′0″4809619583‴",
              "name": "gvurtztndqw",
              "height": 197568,
              "cycle": 0,
              "epoch": 0,
              "period": 98,
              "offset": 4809619583,
              "rarity": "common",
              "output": "93d87fb87674069bdcaf9738ff03ccbf864924acb6ba57b5cfde390986dd809e:0",
              "start": 987844809619583,
              "size": 546
            }
          ],
          "inscriptions": [
            {
              "id": "93d87fb87674069bdcaf9738ff03ccbf864924acb6ba57b5cfde390986dd809ei0",
              "outpoint": "93d87fb87674069bdcaf9738ff03ccbf864924acb6ba57b5cfde390986dd809e:0",
              "owner": "1Q7HNWA54DzGDsvSE1pmn6GpCEopFFN5h4",
              "fee": 191912,
              "height": 791509,
              "number": 9287700,
              "sat": 987844809619583,
              "timestamp": 1685118252,
              "media_type": "image/jpeg",
              "media_size": 26627,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/93d87fb87674069bdcaf9738ff03ccbf864924acb6ba57b5cfde390986dd809e:0/93d87fb87674069bdcaf9738ff03ccbf864924acb6ba57b5cfde390986dd809ei0/media"
            }
          ]
        },
        {
          "ts": 1684917897203,
          "type": "sell",
          "location": "8d39c9044cd6829af1920fb51df352231de5cb4b722c0b71909d413c0ff1d35c:0",
          "maker": "1DxnANKqXnnper7he1gDgUskJ2heXpECUp",
          "cardinals": 1000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Wizard Hat",
            "description": "Unleash your inner sorcerer and venture into the extraordinary with the Spellbinder's Spectacular Wizard Hat - a mystical marvel woven with moonlit threads and adorned with shimmering spells. With its playful accents and hidden pocket of \"magic internet money,\" this hat weaves a spellbinding blend of whimsy and digital enchantment, inviting you to embrace a world where imagination knows no bounds.",
            "collection": "Spellbinder"
          },
          "signature": "70736274ff01007e02000000015cd3f10f3c419d90710b2c724bcbe51d2352f31db50f92f19a82d64c04c9398d0000000000ffffffff010000000000000000426a406236333933363536306662376661326130623230656565393262616238613934333065363962623561306234663566353266313263303632646664303832353700000000000100fd276d020000000001018b718f76f992867174be0616ff298c6ed3cce5869c073c4d6369e9e735b16a440000000000fdffffff0222020000000000001976a9148e2e16138030d76b2b342bd048b0ed2ef7e82a2a88accc56000000000000160014949e7d159fc7f0d2967c3df810a9c9ed4d2d107f0340fa50d8370bb66d4c5babb95e39ffbf30a5fc8cdf574096c728986d73902a6385525fd9829b4ffab7df504ecec5132219108e1ef3d7413dcc66ef7e6b03f343bbfd4a6c20117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423eac0601ef8b488801750063036f7264010109696d6167652f706e67004d080289504e470d0a1a0a0000000d4948445200000400000004000802000000f07fbcd40000000467414d410000afc837058ae90000001974455874536f6674776172650041646f626520496d616765526561647971c9653c00006aff4944415478daecc1011100000404301aaaf01df43f416cebcc160000f0c309c00e1dd0000000200cdaec1ffa4184084c010000fc480001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e4d08028b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f64d0802eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff54d0802209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c04d08027e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b74d08021ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c1281805a360148c82a10bfefcf943aa96ebf7cf93aa85919191542dcc8ccca46af9c7f09f542dffffffa14320333191dc5a10e21723558b84b0cc687a1e05a3803e0020007b76200000000020c8df7a904b23030000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c4d080216090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c1281805a360148c0282e0ffffffa46ab974fb14a95afefdfb47aa164e92ddc5a0fef83ea95afe32926ccd2f86ff640433a91a1819481ec8e3606724550b1b1bc9b67cfffa82e404f3f629a95a84f8c448d52223a1389a9d47c1280008c09e1d080000000008f2b71ee4d2c8000000c04802b05f07020000000082fcad07b92c1200000018490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fe4d0802d6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c1281805a360148c34f0efdf3f52b55cba7582542d5931245731ac9c7f48d5c2f6f72fa95afcd9b448d5f2e335c9e365a7a7bf2655cb5f92a38581e93f23a95a785848d6c2c244b296af023f49d5b283f529a95a0edc7a49aa9697af1f93aa45444492542df292aaa3e5cc2818cc0020007b76200000000020c8df7a904b23030000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f24d0802b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c1281805a360148c3470f9d62952b55cbb7b96542d29c96124bb8cf50ba93abecdfc49b22d3fff92aa83f1db3f52b58871b391aae5e5a7dfa447e67f5235bcfe41b2f7bf4990ecb0c8a81fa46ad1794e729b84fd123ba95a0e3c7a4aaa96af1f3f91aae5310333a95a642595468ba65140370010803d3b100000000010e46f3dc8a59101000080910460bf0e040000000004f95b0f725924000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000004d08020008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a360148c82210d2edc3846aa16d7e72f49d5e2c82347aa96db25cf48d5c2c6f487542ddf4ffe25550b23e981fcf4dd6f52b5fcf847b25f5e7292ec174bfd7fa46a79f291e4b1bf1d3749b685630bc90d0cb56fbca46a5165263d907ff193aae5fea7cfa46a79feee09a95a642595464bb35140370010803d3b100000000010e46f3dc8a59101000080910460bf0e040000000004f95b0f725924000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b040000004612404d080200f6eb40000000004090bff52097450200000023092096d1201805a360148c021a817ffffe91aae5cc9503a46a89fbc34cb296787552b53c5bff86542d9ff77d2455cba7efff490ee4ff248f643193aee5cb5f92a3f2fcdfdfa46a11e027d916311d4652b55c3b4b7254eefcf295542d278e93ecb000ce3fa46af1e01724550b1717c92d9f251fbe91aa65747875140c720010805d3a100000000010e46f3dc8c590a20000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401c4321a04a360148c82514023f09f742d779f5c27554bca123f52b50859f190aa45224d0802949364cfbcfc4aaa8e5f1f7e92aae558d76f52b5ec7df28e542d820c2457979cc2246b91d56624554be981e7a46af9f08983542d2a46a6a46a79ffe90da95ace3cbb4daa96404e4152b5588ab193aae5230fc9b6cc7bff89542db71e5e21558b9abcce68313b0ac8030001d8b303010000000041fed6835c1a1900000018490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a360148c021a0146202411fcff4fb22d4246a4bb4cea33c95aa49949d6f2918d541d6cff48b6c4568a643db753bf93ec300692c7cbbef3931cfb6bdff291aae515ab4d080239a95ad8253849d522272c45aa1671615952b5bc6326b94dd2fbfc26a95a94bf90ecfd7fffb848d5c2fbe50ba95a1e7f7c355a668e02ba018000ecd9810000000080207feb412e8d0c0000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401c4321a04a360148c8251400cd87b6203c97afefe2455c764211552b5dc8a7f4eaa160e665652b5fc63642455cb9f7f7f490fe6ffa46a60e427d90ebb081152b55c3af78a542df3ee90ec3001516d52b5c80a8a0fcefcc2cec64eaa16215992bd7f9f74873dfe7693542d690602a46ab9b29399e4944c7a161b054d0802a3806c0010803d3b100000000010e46f3dc8a59101000080910460bf0e040000000004f95b0f725924000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a360148c0262c0fb4faf49d5f2efef7752b5d8ca4992aa85f5ed0f52b59c7af491542d8ffe913c60f4fbff5f52b5fc203d5efe3293ace5db79921db69fe11fa95ae4d49d49d522c8273292b3d8bb2f6f48d5222ff29e542d5986c224e7978dff492e2efefd21550b231333c3281805f4020001d8b303010000000041fed6835c1a1900000018490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb4d0802412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a360148c4070e0cc5652b534e41891aaa528578c6497b17f2655c703efb7a46ab169372455cbb5baf3a46af9fd9b99542ddf19481e963afce717a95adebefd4baa96a7dc246bd1e71319cd6824815f3f498eca83f71e90aae5e1630e52b53c7bf69d542deffffd26558b2c83d4681a180574030001d8b303010000000041fed6835c1a1900000018490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03014d08020000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a360148c40f0e6dd5352b530fe1524d91a4ed25d46fab08cc24a0192f5b0be21558784ab38a95ab6dbbc26550bfb6f669203ec37c9be676624235a1847730dad011941ac25c847aa96026b2952b51cb8f79e542d138edd2755cbbfd114300ae8080002b06707020000000082fcad07b93432000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c1609004d080200008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401c4321a04a360148c821108fe93ae85f1df6fd2ad215d0b032bc93a0458e91164dc24d7179e6b4448d57230f233a95a12b5b849d5d275f1c36816a03578f7e115a95ac4259e91aac5d14f99542d8b673e22558bb9982ea95aacf494480eb1cf6f4793cd28a01b0008c09e1d080000000008f2b71ee4d2c8000000c04802b05f07020000000082fcad07b92c1200000018490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb4000004d080200004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c1281805a3601410031819ff92ac87890c2d8336009849d661cc41aa0efbdd22a46a59157095542d99c932a46af9bae005a95ace5e3b44728069d90d9bfcf2f3f72f52b51c397283542ddc2f0549d5e2c34db2c30edcbf45aa961fd212a46ad156311d2d664701dd004000f6ec40000000004090bff52097460600000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6834d08025c16090000008c24800062190d8251300a46c108044c8c240f7f3cd9f889542d774fbd2155cbffffff492ec75949f60b130723a95ae4568b911eca7f48d6224f728885f5901c2f35996ca46ae1fbfb8f542d6f3ebe18c9594c44509c542d4a5286a46ad976f914a95a2eb3939cf899f949f68bacb832a95a38d9b9464be65140370010803d3b100000000010e46f3dc8a59101000080910460bf0e040000000004f95b0f725924000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a360140c2af0f7ef1f52b5ec3eb196542d0b155549d5a2cccd45b296725192fdcffc9f541d0feb5e90aae5f74d0802ebdfa46a3969f194542d4c0c24fbc5741f2fa95a6e2d9022554b509604a95abe3d25d92f6f975d2555cbe9cbfb480e315da7c1999159595849d5a2a16040aa164e361e52b53c787e8b542d569a96243b8c9d8b61148c82410c0002b06707020000000082fcad07b93432000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401c4321a04a360148c82c10518491e9878fbe135a95aac0f8690aa45549d9164bf309131c8f29b540dff9b5e92ee2e6652b548fcff4baa964b0f49f6cb56d5b724a71746922bb2ed3b6e92aa8595f488e4233df63f7dfb38a25b244d08022c2447a5a28c2aa95a64251548d5c2c6ca315a308f8261060002b06707020000000082fcad07b93432000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401c4321a04a360148c8241052e9edf40aa96f7f9a6a46ae17af6876497fde42655c781f06da46a71b8a947aa96ffffffd1215e98181849d5c2fc97645bfe333093ac85f47a8c9591645ba42549b6a638868b542dc79ffe22554bf39123a46a31d6b61936c5051313c951c946ba9651300a861f0008c09e1d080000000008f2b71ee4d2c8000000c04802b05f07020000000082fcad07b92c120000004d080218490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c1281805a38076e0ffffffa46af9c5fe9d542d5c6dfa24bb8cf527a93a4eaa9d26558bc34679921df6f12da93a14370a90aae5be27c9b630fc61245507e37fd22d213d8d9dff417254b2903ef6f5f903c99e593cf913a95a44c448ae948bccff91aaa5f5d00e52b5d818798c9666a360140c270010803d3b100000000010e46f3dc8a59101000080910460bf0e040000000004f95b0f725924000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee44d0802b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a36014d00efcfefd93643dffff91ace5cf7f92b5b0926c0b133b37a95a8eb8bf20558bcd793992fdf2eb17a93a18ff926c09d37f6692c3988591f4a82459873e0b3ba95adea8931cfbe15924c7fed797247b7fc3922fa46a6167247920efe7afefa345d3281805231c000460cf0e040000000004f95b0f726964000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745024d08020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a36014d00eec39b99e542d823cff49b6e6e17b92b5683093aa4333409b542d37375e24d9615fd948b6c5ef09a95a38fe3092aae52fe9d12228cc41aa9697af7e91aa858d8d64bfd869ff21550bafe97352b5bcebe72355cbb9a7df48d5b2ecee0352b588884a8f164da360148c700010803d3b100000000010e46f3dc8a59101000080910460bf0e040000000004f95b0f725924000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b044d080200000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a3601410097efcf84eaa16210e7652b5b0be27d99647810f48d522b75c8d542d3ce97f49d5a2e66841aa96079efb49d5c2fe8fe492fcf73f92fdf2f6f32f52b5fcfb4ff21813332323a95ab8c5488f974ed253ff6792039991f91fa95a2c65f948d5e2efac4faa96aa0def49d5f2f3d74f9293251b3bc3281805a360b0028000ecd9810000000080207feb412e8d0c0000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c4d0802248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401c4321a04a360148c0222c1cee36b48d5b2315887542d72774877d9bbefa4ea78127b83542d0f1e93ec2e4991ffa46af9cf44f2b80c330bc95a9e7cf845aa16d2ddc5f0f933c9de67f8f78f642ddf484f3067ff92ac458d642dbcbc7f48d522f5fe25c9b5f86a92bd12c540b2c3a69edb4caa16178b90d13273148c82410b0002b06707020000000082fcad07b93432000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d08000000004d080208f2b71ee4b248000000602401c4321a04a360148c02620123c93adeed7b49aa16796e6e52b5fc27dd65ff189849d5c2caf987542db75ffd25dd61ff48d522294c72bc7cfbce487a20ff2739bd3091ec7d1e3192fdf2e215c95af654b191aac52a9095542d7ffe929c60feb190ec30061e9207f23ebdfe41b22dcccc0ca360148c8261040002b06707020000000082fcad07b93432000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401c4321a04a360148c4cf0e2cd6352b518317393aa85f12f23a95a7efdfd47aa1656266652b5fc63fa4baa160931926d4d080279779f64bffcfb4bf2b8ccd357bf498fffffa46a606224392a199849f6be69c24f52b5ccef612755cbc3fb24fbe56017c909e60f032ba95a94e44448d522a84572b4dcdbfe9e542dbc9c2447e5bda73749d522c0234caa16217e118651300a4601e90020007b76200000000020c8df7a904b23030000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c128180523139cbcbc9f542d3359a449d5c2f79de45186efa4174bec9c24dbc2f89f810e5a240548d6f2f4c33f92f5fc6324d92f0c246b616525d961ae3b49f7cbf9efa4eaf8c5c441aa16594d08024592bdefe541b22d0b26fd2539f69ffd2455cbe6072f49d522cac049aa16d53fcca46ad97a7e3ba95ad4e4f548d562aeeb345a988f825140060008c09e1d080000000008f2b71ee4d2c8000000c04802b05f07020000000082fcad07b92c1200000018490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c1281805830d3c7a7e87542d1fbebc2755cbcf5f3f4976192bc943068c0ccca46af9f58b64777dfeff87542dff814e23110870b392aa458c9f642d2f3efc27d9ffa48fe4b0b2936c8bdd047692ad51fd4cb29687bf49d5f18ff42cf6f605c95a9e9cfe4baa96b00492436cf7329253323f0337a94d08025a04997848d5c2ce4cb2c30c18f948d5f2f4d32b92e3e5e57d52b5c8882b8ed632a36014000460cf0e040000000004f95b0f726964000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff52097450200000023092096d1201805a3807870fdde4552b57cfff199542dac9ccca46a79fce20ea95aa485c548d572e9c74752b59833f092aae5df3792bdfffe3fc951c944fae8c7afdf246b111320b98c951323d9fbcfdffe21d9fb0c8c2427cbdfec24fbffcf5792d3d8663652b5c80ab192aa45c682e4407e7d9be48c7cea39c9e992475d89542d8297af92aae505d71752b5784b934d08021cfba23f48cefbcb9e7c22550be34392bd7feeed133a5416a497490ce2c2b224a7647185d17a791490070002b06707020000000082fcad07b93432000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8ad971404c1280cc345e524a284842e501451d02897d1169a481b6919ada1594b68dac4a866852848e4050735f0566aade19d4578e60fe7783e7f7fcbf90af2fac1ba18274abca74b49e98307bbb90625f13ba064369429e9d65b94247e8c3756752891951a25e606e7e23b384b2fc25dec28a544148b9464091eacd12c5172b6701b6d8ddfe4d13c4d0802c483ed5f942c56b84b185428d9aa381755c3476c3a7e50a22c254a740b47e91ff1e3a74946495b1028e9a578c93bfdc02f257e5b14f0d9bfbb26fe5ada574a069d09ce45eae7bf25ff575f01d8b303010000000041fed6835c1a1900000018490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c06ebdab1014c7011c27e47a283ad449b914992483c562f20036afe10dac668f2113190d12c31994e28894e4e0b89c4122f767f8663dbffd33fcaeffbfd52881112876873525b3d598124ddf51522b4628498a164aecce042536ef87926a5ba544d783b897172c4d080294bb8f92760b1779797e53922ba529f9e2b6988e8d0525fded8b92ac64a7a4bbb952a23e71fa3705e7a294dd78c5842f254d398ac77228e3197bb828e9dd8eb862f313de639b1f1fd8f3839280e6a0642f792849c430998c354a0a6181924a3e847f57667cc73a2bdc97fa608aef987ea0c4e31c51928a67289144fc881bf14ffc0460cf0e040000000004f95b0f726964000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c08eddeb1010446118b6594b646322bb684c43211a1a8568241297e1ceb804b528359add424314428220966c2188bf35aee14d0802556898fec9e47c2739f313fe47f0cb6bb19d51329aba94081150e276ca9414247fcd9a314c8c0827b87c313c50b2f76f9424a5c0bbbc4c4a7a47dc97a78533eebb0e251f7c7ed41b259c5848c3b538134a12951c2e468f52b1d29e94780ac7bc3a7b94ccbb6b4aeeba4dc9c6c0ad8c4b4949a0e1c4063e3ec7af9717251185278c1e1894d82a8efbf2d85152357162b50cee8b5278f2172d7cbe340b794a5ae313256d674949269dc54329f5bf947d75bd0560cf0e040000000004f95b0f726964000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c08e4d0802d9e32008836118922a466c3a480c9b71ece4e0e205bc87e770f00c2edecbc9dde062220841238d483dc3d3a18b7cfb93f67dbf9ffe88de827f8eaace29b2594f2872dc2f28a2f4008b092d4664c23d1bfa789747238a948f1745acc08e755c4bc9912495983178947d2d967fce6f1eb25f4aac4515b89103817f7fac8398f643896b56e33e8ef1b8680abcb1b74bf963930d5fc3d8c643f1b73cffe2fea4486cb0014b9efdd0c166db79e87d196144e3b322d8adc614d9ea39450ea70b45f22aa5c854cdfa8b9c73fc0460cf0e040000000004f95b0f726964000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124d08024000f6eb40000000004090bff52097450200000023092096d1201836e0fed39ba46a11e47f47aa9660773152b5f0abb091ec99ff7fe9d29b65a48b2dff497716c90efbfee317c93e61641e9c0306bf9f921c62cc8cff48d5f2eb1fc969ecd6ebc724472523e961f69f64bfbc7ef9810ef1c2f89f74af30929c927ffef843b2966f245764bf7efea34be2ff4f8778f9477a2033909e5fc8282d65193949d5a2fb8d8b542d977e939c6098c5c9c8957f49cffbf4282dffffff4daa16110e263a6869b024594be991d3a46af9cc6c4daa165e1e81d1e62204000460cf0e040000000004f95b0f726964000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd78100004d0802000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c08eb9a3200c0551f44da2a82490c646d3d95b5a59db586929b8042bd7e53ab44d6b190521d88468f44549c6359c801692e90f3377b8dcf769352bf89bcaf29422eb994791e5aacf9f9996ab7131a18291fcc6b570442a4a6ca7238acc033c57bc8f2962b327454e0fa54859dd29121538ca6c55628b19fc6322826de9183c58a8bd9f44bf72009b5f4c1b77e11eeb084e18dfc53b4b9d82228777820da3587ed8f529b2f070f2278ae3629761f9e30136ff66c24f311ee3aaa5f97e2947846ba9d1263ee2b4bc9caf141906afe6ee57bb3e02b06707020000000082fcad07b93432000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000004d08028c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8319f150481200eeb6a924804ddece403d44922e8d8b197e855bbe42bf4064250079922d774b65ee133880867cf1f333b7f7eb36c38a4e06fcc7f1f8a848ebbe18819f5b90d35e581d9070f8c7bf15a0ae4fb14230e27590ff8fa56842265d150e42e9622e726a248cd4b591c71c6bab6c788e17f99a9761489b9f6af37319e1613e08ce9f30b9a1470b98878c35c6fb8948b53c22509aba57163dc30824bb9ca2614d96d715fa609469633aefb4e7f74ef1bbef73dfef3eb632fe5052395601d9b0f2fbf0fec25007b76200000000020c8df7a904b23030000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b04000000464d0802124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c1b0012ab2daa46a3970e126a95ac4e7bd25554b64aa30e9bef9478f2063a48b1e26d2bbd9fc9c74c8cb4cc12aa46ae16420d92fd7d71f2355cbc7bbbf498e15c63fa46a616624d92fd24c24dbc2c2c24487c4cfc8f2970e09f9c99d1fa45b42b2358cff49f63ed3ffffa46a79f88d8b645bc8282cfeb091aa45f013c90efbc14872ec7ffa477220334b931c9549657ca46a61b52539ef33dc2539f6bfeffa4f7a094372fcff2723239391c6189949d742b23dff99480eb113ffde93aa4552c398e4aa925768b4ed47360008c09e1d080000000008f2b71ee4d2c8000000c04802b05f07020000000082fcad07b92c1200000018490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6834d08025c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6cb2005611888a29926a26d15445d089ec09dbd4f6fe2313c9c0b7b0011ecc606299a8c5ee115da45e9ec1ff367327f92b8a905a3892ccd2952dd0245ae95c7ca748f1169c77330917fb39b9a5bd962c40a477096a3d952a48d4bdce30f16a60197bf486714b9dc9f1479c72f1f325c4b308a73d4ca75055e891dc0949e3799bbc56c14dfb073c1798a1346ca73838b79ad3172e093bce3dbf2c1a75262ff0efb13091726032036c1488795e4157bdf652b8cb8e911db3d7e02b06707020000000082fcad07b93432000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40004d08020000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401c4981850321a0a2316fcf9f387542d6f3fde26558b103fc95a162fd423d933cc7f49d6f2efdf208d98bf74b18599f4fe3f1f1fe9b67092ee3232e28599742dff49d6b17535c95ad849771823c93a7e5d7124550b9bd65e7a2498bfa47be68e20c95a943e90ac85857487fd61a647aefcf7871ef98583742ddf4549d6f24e88642defdf91ecf9efa4c7e43b9263ff1fe9e9858989e412869191e42cc6c844726d31f9ec5752b5cc3ef589542d320a16a46a9196d6a643888d02380008c00e1d080000000008f2b71ee442c81d00008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b040000004d080246124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401c4321a04233afa59484e005fbe3392aa65dfa987a46ad9a1f68a542d17d6d890aa455a9f9df430fb4bba96ff24eb10912459cbaf0f246b61e325dd2f6ca46b216394818c72e91f3d328c77203d629f8c5871e6225d9327e9614c7abcfcff43b2165bd2438ce507e9f985742da74f91ac8591911e09e61fe9851223e9f9e5cb7b5275fcbe427aecff6526d92b2c246b61e12059cbdd5bbf49d5f2fa33131d72d886ddaca46ab925204a728809925c25b1710a939e5d4687a4e90a0002b04307020000000082fcad07b910d20d00002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71e4d0802e4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c12820092849ab93aae5c59b27a46ab9f7e40aa95adaa32f90aa45989d95542d15cbf449d5c2a9c34e8f8c49465ffefb2792b5b0916ecdee37246bf9fd9b642dcccc246b61255d0bdb5fd21dc648ba16d2a39283742dcc24fbe5cf9e6fa4a7ca7f0cf448caff49d5f0efff1f929df55d980e05ecff7fff69ef7b327430fcff4b7288fdff437ae227bde43b778be434b6702be9eefa4f72b2b4d021d9fbcfb93e93aa65d52f920b5815111b52b59828ea8e367e861f0008c09e1d080000000008f2b71ee4d2c8000000c04802b05f07020000000082fcad07b92c1200000018490001d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d084d08020000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6cb1e07611886c2d86d40951047a007409d99185a75ec0958391833dc816bf0d38115b1b121a54d4caff031c7fba7f8bd17474e9e2c48854a4428b2ad6a8ac41828727cdd296286e5f70d1e9995651439ec0b8a6cd6fc33cff59be15c068f1b5b661e6b09588ba8f0cbffc7293c163e95d122673022a3f258b0c9813ba6fc519a2cc3b97024cc7063df816b51dcd83cc7a7789ebe2946ae0f4791f3c5f15cb0634ffd50e4747b53a42c2b8aecda0eaf7d6e9136995453fd0460cf0e040000000004f95b0f726964000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000604d08022401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff520974502000000230920c6c48092d1501805830dfcfef39b542d7ffefea683c30e9ddc40aa16bd9f3f48d522cdc44aaa96ff0c8ca4e77e92fbff8c7fb848d5c2f49b642de511ff48d5c2cf43b2163e5e92b57cff4ab296bf741963e1e1203d2ac9482fff49d6f3ef3fc9b67c2539bb30fc273d90999949d6c2ce46b2671ebd26d9650d4bff90aac5588d645b2cb4494ec9ebf77c2155cbbd3f24c7e5b62f9f492e61c828fa1848f6be8abc2ea95ab4d52c49d5c2c2cc42aa165616b6d106c328200f000460cf0e040000000004f95b0f726964000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71e4d0802e4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff520974502000000230920c6c48092d1501805a38048f0ffff3fd2b5906ccbc94b7b48d5f2e8f91dd27d43b25f18819044e0ce244daa1689bfaca46a61662039947333481efe58b3e223c90efb4d72acb0b292ecb090505e926d61263db9901cf90cdfbefd2155cbcaf55f49d5c242724266101121398db97b7092aae5e62792bd1fb8f239c9f1f28ff42286f4a824dd0e726cf94b7a71a924ad49aa16532d3b92bd42ba5f9898981946c12818c40020007b76200000000020c8df7a904b23030000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d08004d080200000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000312606948c86c2281805a38046e0c8d9eda46a79fbe119a95afe91eeb0ff0c2ca46bf94bb235fffed22394199949d6c1408fd11f466098911cc8ffc9b0869cf827d5124692434c4c509a542dd6866ea385c6281805a3800e0020007b76200000000020c8df7a904b23030000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d0800000000084d0802f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000b18c06c1281805a38076c0c6d873341046c1281805a360148c8241050002b06707020000000082fcad07b93432000000309200ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fe4d0802d6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c244d08028000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd78100000000804d0802207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b040000004d080246124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb400000004dcd01004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff5209745020000002309c07e1d080000000008f2b71ee4b248000000602401d8af03010000000041fed6835c16090000008c248000ecd7810000000080207feb412e8b0400000046124000f6eb40000000004090bff520974502000000230930001b613f0abef479da0000000049454e44ae4260826821c1117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423e0000000001076b483045022100b0829a123c6d93c28568646b496782d96806598d542908414985e329fb57398402205136aa3c0b17aa1c45da5093a891a354a0c13c1767ed9f8fae324f474b652b6e0121029f740185b5f32afb7e6ccd21013d66991edb8050fef41ddc1d2a50b5db6f40120000",
          "signature_format": "psbt",
          "cid": "QmcWKAHo44jPei3iFY9Mqi3RAxDfegGGHQp3PuFNPSbrMx",
          "time": {
            "block": 1684926781000,
            "order": 1684917897203,
            "ago": "16 days ago"
          },
          "ago": "16 days ago",
          "value": {
            "sat": 1200,
            "btc": 0.000012,
            "usd": 0.31735477928448
          },
          "price": {
            "sat": 1000000,
            "btc": 0.01,
            "usd": 264.4623160704
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1463243868394468,
              "decimal": "375297.1368394468",
              "degree": "0°165297′321″1368394468‴",
              "name": "dmgeggjkmrl",
              "height": 375297,
              "cycle": 0,
              "epoch": 1,
              "period": 186,
              "offset": 1368394468,
              "rarity": "common",
              "output": "8d39c9044cd6829af1920fb51df352231de5cb4b722c0b71909d413c0ff1d35c:0",
              "start": 1463243868394468,
              "size": 546
            }
          ],
          "inscriptions": [
            {
              "id": "8d39c9044cd6829af1920fb51df352231de5cb4b722c0b71909d413c0ff1d35ci0",
              "outpoint": "8d39c9044cd6829af1920fb51df352231de5cb4b722c0b71909d413c0ff1d35c:0",
              "owner": "1DxnANKqXnnper7he1gDgUskJ2heXpECUp",
              "fee": 410234,
              "height": 791048,
              "number": 8882570,
              "sat": 1463243868394468,
              "timestamp": 1684847794,
              "media_type": "image/png",
              "media_size": 27501,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/8d39c9044cd6829af1920fb51df352231de5cb4b722c0b71909d413c0ff1d35c:0/8d39c9044cd6829af1920fb51df352231de5cb4b722c0b71909d413c0ff1d35ci0/media"
            }
          ]
        },
        {
          "ts": 1684913691351,
          "type": "sell",
          "location": "cf5bd804826c0ef7a0952a274ebecb0582877be060b6348a50d96317d87519a6:0",
          "maker": "18j4CbD2HpcMc2A4QDeEnDRk66d3it1JNP",
          "cardinals": 696900000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Peach",
            "description": "Social media users often use it as a suggestive icon for buttocks during sexting conversations.",
            "collection": "Ordifruits"
          },
          "signature": "70736274ff01007e0200000001a61975d81763d9508a34b660e07b878205cbbe4e272a95a0f70e6c8204d85bcf0000000000ffffffff010000000000000000426a406337383333343164616664313539313734613233316131303631616565616237313434366266346330316663326364626632396332396336663932326132396500000000000100fd750102000000000102dd7d256ba5d7ea4dc363c732880406be24a6f7a5c0f5f5432f167849734a1cdc0000000000ffffffffd8eacd413f07bccc090c43042ec75a5f3bd1b2e863d0b37a2e0ff03d9f9bb6ea0100000000ffffffff0222020000000000001976a91454bd059f2b80fe7596a4b55f86f7109c58f099a388ac596913000000000016001483e2d2b196fd7903b73d978678004d9aa4c0fa520247304402205406b22f1f2f3f1bf84c363c61e7299a50da9bf34da50e8092019076d394e92102203611de195e1eda3671f44e10edc5aaf2d2ae63907b37702576303de35f4185c00121036760e99268e160deca2bd827e9c574484fd5f7c221b5480b1be96692cc2dcb11024730440220382956dd68a26bde1d379096c52a9d07307d6e2887e1452ace8eb7652b2176b302206c5b6ec5ce58b1a3e63ce8834e69ab1418546bde60a052eee3c8114f9fb766ce0121036760e99268e160deca2bd827e9c574484fd5f7c221b5480b1be96692cc2dcb110000000001076a473044022025053bd24454eb2fc17d6d6b8b74721f8ff2dff9dba3e5a37730a03fd2e19e7d022072cd1f96fdc55a5b8703a54097630abb3ae768a3164fd8c2b56b31a0b73b6013012103d5a322f7027fca15f50e438ae71249d24f9e585861e9c99a8efbd68ebb9f228e0000",
          "signature_format": "psbt",
          "cid": "QmUyYSgy9krVdgr1uZW11soskzghZyU87ost44hTQ2apt7",
          "time": {
            "block": 1684913943000,
            "order": 1684913691351,
            "ago": "16 days ago"
          },
          "ago": "16 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 696900000,
            "btc": 6.969,
            "usd": 184303.78806946176
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 488248600308865,
              "decimal": "97649.3600308865",
              "degree": "0°97649′881″3600308865‴",
              "name": "kjvbzaljqzw",
              "height": 97649,
              "cycle": 0,
              "epoch": 0,
              "period": 48,
              "offset": 3600308865,
              "rarity": "common",
              "output": "cf5bd804826c0ef7a0952a274ebecb0582877be060b6348a50d96317d87519a6:0",
              "start": 488248600308865,
              "size": 546
            }
          ],
          "inscriptions": [
            {
              "id": "dc1c4a734978162f43f5f5c0a5f7a624be06048832c763c34dead7a56b257dddi0",
              "outpoint": "cf5bd804826c0ef7a0952a274ebecb0582877be060b6348a50d96317d87519a6:0",
              "owner": "18j4CbD2HpcMc2A4QDeEnDRk66d3it1JNP",
              "fee": 182790,
              "height": 791020,
              "number": 8828140,
              "sat": 488248600308865,
              "timestamp": 1684829454,
              "media_type": "image/png",
              "media_size": 15536,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/cf5bd804826c0ef7a0952a274ebecb0582877be060b6348a50d96317d87519a6:0/dc1c4a734978162f43f5f5c0a5f7a624be06048832c763c34dead7a56b257dddi0/media"
            }
          ]
        },
        {
          "ts": 1684724542904,
          "type": "sell",
          "location": "9f826809fa831189cf38233b89bc0a0ade10e969a11c06fccdf0fa9d46d26e1f:0",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 5000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Illuminati Eye #9",
            "description": "Number #9 of Illuminati Eye Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "H35J1+Ke+bKCgNf7aHpwSchRBqZP2/tn5HtyW28OR6fbWqduUnABSFarWu7FUs+3hhRAmE+mpkHgvEc1qfzuoXw=",
          "cid": "QmebJvqvEn4H912cDHgU8Zi2yLyAfjeicmgK9z8Ad9RktL",
          "time": {
            "block": 1684724968000,
            "order": 1684724542904,
            "ago": "18 days ago"
          },
          "ago": "18 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 5000000,
            "btc": 0.05,
            "usd": 1322.3115803520002
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1328254876475672,
              "decimal": "321301.2376475672",
              "degree": "0°111301′757″2376475672‴",
              "name": "elcpayewesn",
              "height": 321301,
              "cycle": 0,
              "epoch": 1,
              "period": 159,
              "offset": 2376475672,
              "rarity": "common",
              "output": "9f826809fa831189cf38233b89bc0a0ade10e969a11c06fccdf0fa9d46d26e1f:0",
              "start": 1328254876475672,
              "size": 2146
            }
          ],
          "inscriptions": [
            {
              "id": "5b88aa6d0df59d6fd3610014075d7d8ab563337bbf413613f049853cda3d06dai0",
              "outpoint": "9f826809fa831189cf38233b89bc0a0ade10e969a11c06fccdf0fa9d46d26e1f:0",
              "owner": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
              "fee": 2515852,
              "height": 790297,
              "number": 7691899,
              "sat": 1328254876475672,
              "timestamp": 1684397844,
              "media_type": "image/png",
              "media_size": 134676,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/9f826809fa831189cf38233b89bc0a0ade10e969a11c06fccdf0fa9d46d26e1f:0/5b88aa6d0df59d6fd3610014075d7d8ab563337bbf413613f049853cda3d06dai0/media"
            }
          ]
        },
        {
          "ts": 1684719819669,
          "type": "sell",
          "location": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 3000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Jus Bitchin #2",
            "description": "Number #2 of Jus Bitchin Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "H73iGlcGOLiDhX+ZBygZFbRUJoBQ2JFmtVEQzNv/6M4GKZtltQl8oqhaJIc+fQ1Um5Wo8hgiQzstnNFFkDha80g=",
          "cid": "QmVAob89X63yWeLjZEEAC3h4rrDTsh3rvTEVeEZjnZ5Fho",
          "time": {
            "block": 1684720437000,
            "order": 1684719819669,
            "ago": "18 days ago"
          },
          "ago": "18 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 3000000,
            "btc": 0.03,
            "usd": 793.3869482112
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1801139490732114,
              "decimal": "600911.740732114",
              "degree": "0°180911′143″740732114‴",
              "name": "bcacotwmwqp",
              "height": 600911,
              "cycle": 0,
              "epoch": 2,
              "period": 298,
              "offset": 740732114,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 1801139490732114,
              "size": 1449618
            },
            {
              "number": 1650035719036232,
              "decimal": "480028.719036232",
              "degree": "0°60028′220″719036232‴",
              "name": "cdvrtbobhph",
              "height": 480028,
              "cycle": 0,
              "epoch": 2,
              "period": 238,
              "offset": 719036232,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 1650035719036232,
              "size": 2313
            },
            {
              "number": 1816874490115315,
              "decimal": "613499.740115315",
              "degree": "0°193499′635″740115315‴",
              "name": "azctmojiydi",
              "height": 613499,
              "cycle": 0,
              "epoch": 2,
              "period": 304,
              "offset": 740115315,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 1816874490115315,
              "size": 144654
            },
            {
              "number": 305368025398593,
              "decimal": "61073.3025398593",
              "degree": "0°61073′593″3025398593‴",
              "name": "lrmvmxlairo",
              "height": 61073,
              "cycle": 0,
              "epoch": 0,
              "period": 30,
              "offset": 3025398593,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 305368025398593,
              "size": 674175
            },
            {
              "number": 1796630742362029,
              "decimal": "597304.742362029",
              "degree": "0°177304′568″742362029‴",
              "name": "bcvryeevkga",
              "height": 597304,
              "cycle": 0,
              "epoch": 2,
              "period": 296,
              "offset": 742362029,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 1796630742362029,
              "size": 481789
            },
            {
              "number": 1811821634571912,
              "decimal": "609457.384571912",
              "degree": "0°189457′625″384571912‴",
              "name": "baayphqsjyn",
              "height": 609457,
              "cycle": 0,
              "epoch": 2,
              "period": 302,
              "offset": 384571912,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 1811821634571912,
              "size": 49939
            },
            {
              "number": 1812607879489882,
              "decimal": "610086.379489882",
              "degree": "0°190086′1254″379489882‴",
              "name": "azxesdbyttv",
              "height": 610086,
              "cycle": 0,
              "epoch": 2,
              "period": 302,
              "offset": 379489882,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 1812607879489882,
              "size": 149742
            },
            {
              "number": 1812607879639624,
              "decimal": "610086.379639624",
              "degree": "0°190086′1254″379639624‴",
              "name": "azxesdbqggn",
              "height": 610086,
              "cycle": 0,
              "epoch": 2,
              "period": 302,
              "offset": 379639624,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 1812607879639624,
              "size": 159
            },
            {
              "number": 1649247960971385,
              "decimal": "479398.460971385",
              "degree": "0°59398′1606″460971385‴",
              "name": "cdzlvdmaosu",
              "height": 479398,
              "cycle": 0,
              "epoch": 2,
              "period": 237,
              "offset": 460971385,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 1649247960971385,
              "size": 42011
            },
            {
              "number": 1750130144812209,
              "decimal": "560104.144812209",
              "degree": "0°140104′1672″144812209‴",
              "name": "blkjmopiwey",
              "height": 560104,
              "cycle": 0,
              "epoch": 2,
              "period": 277,
              "offset": 144812209,
              "rarity": "common",
              "output": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "start": 1750130144812209,
              "size": 5600
            }
          ],
          "inscriptions": [
            {
              "id": "857c5b1fe148c7c7afe6c6b14fab04acc0c176b8c25527e7d21c4815be0ea38ei0",
              "outpoint": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1",
              "owner": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
              "fee": 1638060,
              "height": 789206,
              "number": 5608235,
              "sat": 1750130144812209,
              "timestamp": 1683785699,
              "media_type": "image/png",
              "media_size": 108076,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:1/857c5b1fe148c7c7afe6c6b14fab04acc0c176b8c25527e7d21c4815be0ea38ei0/media"
            }
          ]
        },
        {
          "ts": 1684489246575,
          "type": "sell",
          "location": "75856d7c658b8c2c6e174b25850de97fa7d2ba17acc4c8683b872b430b82f42c:0",
          "maker": "18j4CbD2HpcMc2A4QDeEnDRk66d3it1JNP",
          "cardinals": 694200000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Eggplant",
            "description": "Social media users have noted the emoji's phallic appearance and often use it as a euphemistic or suggestive icon during sexting conversations, to represent a penis.",
            "collection": "Ordifruits"
          },
          "signature": "70736274ff01007e02000000012cf4820b432b873b68c8c4ac17bad2a77fe90d85254b176e2c8c8b657c6d85750000000000ffffffff010000000000000000426a403265346131643262316537353262313034366238383832346136393730323062383133313533376233636238393961333764343862613239633838393138346200000000000100fd76010200000000010265441dc50063dd432e9676af87aa3b7d0ebe344e42087ded81bcb23aa32405840000000000ffffffff90051ee724775f31e83456da9076d293bf6158fadf371e8c7d0aaf1958171c440100000000ffffffff0222020000000000001976a91454bd059f2b80fe7596a4b55f86f7109c58f099a388ac895d2c000000000016001483e2d2b196fd7903b73d978678004d9aa4c0fa520247304402203205cb9ebb87e0ae8858f363561e1fb89c296d2f0c1b331a341e0f35a56aee4a02206be4f29b7575475ea34bde2ebed0015d4c8913b1f7c0ff58b0d8537558e5f17e0121036760e99268e160deca2bd827e9c574484fd5f7c221b5480b1be96692cc2dcb1102483045022100e512481d251124447618ae21c011030f396be0b6e5cb3b1ac1c915280c669a6702202c7b4a4740ff1a7b114eddd3e178273415d78adbe0f13b061261e68e7c02deca0121036760e99268e160deca2bd827e9c574484fd5f7c221b5480b1be96692cc2dcb110000000001076a473044022076740ac701891ce0e9a1403aefe0b5890491a262648ecaeff61b1b73db134cce022026820b46c278324d546e99b5f3324b99b1b1835687262d1e79a9a514e644d5c2012103d5a322f7027fca15f50e438ae71249d24f9e585861e9c99a8efbd68ebb9f228e0000",
          "signature_format": "psbt",
          "cid": "QmTefzNgZDj6ZLhqr9mFHN9HfKPdxQHKiSG4cJoMeFHLxk",
          "time": {
            "block": 1684489593000,
            "order": 1684489246575,
            "ago": "21 days ago"
          },
          "ago": "21 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 694200000,
            "btc": 6.942,
            "usd": 183589.7398160717
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1503738773056932,
              "decimal": "391495.1273056932",
              "degree": "0°181495′391″1273056932‴",
              "name": "deuglbczyrt",
              "height": 391495,
              "cycle": 0,
              "epoch": 1,
              "period": 194,
              "offset": 1273056932,
              "rarity": "common",
              "output": "75856d7c658b8c2c6e174b25850de97fa7d2ba17acc4c8683b872b430b82f42c:0",
              "start": 1503738773056932,
              "size": 546
            }
          ],
          "inscriptions": [
            {
              "id": "840524a33ab2bc81ed7d08424e34be0e7d3baa87af76962e43dd6300c51d4465i0",
              "outpoint": "75856d7c658b8c2c6e174b25850de97fa7d2ba17acc4c8683b872b430b82f42c:0",
              "owner": "18j4CbD2HpcMc2A4QDeEnDRk66d3it1JNP",
              "fee": 273182,
              "height": 790420,
              "number": 7859571,
              "sat": 1503738773056932,
              "timestamp": 1684483076,
              "media_type": "image/png",
              "media_size": 11319,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/75856d7c658b8c2c6e174b25850de97fa7d2ba17acc4c8683b872b430b82f42c:0/840524a33ab2bc81ed7d08424e34be0e7d3baa87af76962e43dd6300c51d4465i0/media"
            }
          ]
        },
        {
          "ts": 1684417998668,
          "type": "sell",
          "location": "a225d6c13602021ea94dafbac4a1cfd3a4d6a89b1105abfe115c34a862963575:0",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 5000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Illuminati Eye #8",
            "description": "Number #8 of Illuminati Eye Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "IP60SwTv6bR0e1AjGRfbrAyHGptxzIQ/RFtnipLZ2ReSDigLP8K0VfjMWLv+m3KRlg7k9NTT0Z1QRzZ7CIuDMw0=",
          "cid": "QmUv7hpJpYm7ZF8Gh1F1G16XRbWQBkP8AEHN2NAcUhJ3aT",
          "time": {
            "block": 1684445114000,
            "order": 1684417998668,
            "ago": "21 days ago"
          },
          "ago": "21 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 5000000,
            "btc": 0.05,
            "usd": 1322.3115803520002
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 644331750179890,
              "decimal": "128866.1750179890",
              "degree": "0°128866′1858″1750179890‴",
              "name": "jhbqvvswzzj",
              "height": 128866,
              "cycle": 0,
              "epoch": 0,
              "period": 63,
              "offset": 1750179890,
              "rarity": "common",
              "output": "a225d6c13602021ea94dafbac4a1cfd3a4d6a89b1105abfe115c34a862963575:0",
              "start": 644331750179890,
              "size": 2248
            }
          ],
          "inscriptions": [
            {
              "id": "5d8a844c78d385f2234db013435ea23a43c074b778618772eaf4f59d21aad03ei0",
              "outpoint": "a225d6c13602021ea94dafbac4a1cfd3a4d6a89b1105abfe115c34a862963575:0",
              "owner": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
              "fee": 2479153,
              "height": 790297,
              "number": 7691900,
              "sat": 644331750179890,
              "timestamp": 1684397844,
              "media_type": "image/png",
              "media_size": 134529,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/a225d6c13602021ea94dafbac4a1cfd3a4d6a89b1105abfe115c34a862963575:0/5d8a844c78d385f2234db013435ea23a43c074b778618772eaf4f59d21aad03ei0/media"
            }
          ]
        },
        {
          "ts": 1684409952265,
          "type": "sell",
          "location": "c17b83f31645129b11ce7509526ff357c6023414c45492fbbf94ea5ba75f46d0:0",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 5000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Illuminati Eye #5",
            "description": "Number #5 of Illuminati Eye Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "HyBEkKBvxyDx7TsbbMCaGVqBjoDn116tc1tVYyNqprnCfwYk3rabrGYUW+gZHousJ8GK1N/Ld9lEXeuLi6KtF1c=",
          "cid": "QmRpQqNg62jEXoegtmbEogAU49ZNpGvetif1T31ZKw7QkA",
          "time": {
            "block": 1684410985000,
            "order": 1684409952265,
            "ago": "22 days ago"
          },
          "ago": "22 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 5000000,
            "btc": 0.05,
            "usd": 1322.3115803520002
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 988302320381206,
              "decimal": "197660.2320381206",
              "degree": "0°197660′92″2320381206‴",
              "name": "gvsmuzfhmed",
              "height": 197660,
              "cycle": 0,
              "epoch": 0,
              "period": 98,
              "offset": 2320381206,
              "rarity": "common",
              "output": "c17b83f31645129b11ce7509526ff357c6023414c45492fbbf94ea5ba75f46d0:0",
              "start": 988302320381206,
              "size": 3064
            }
          ],
          "inscriptions": [
            {
              "id": "c50aebb4e19bad077dea49bc40f395a5a55f06ef6b033122e8355c8580063cc8i0",
              "outpoint": "c17b83f31645129b11ce7509526ff357c6023414c45492fbbf94ea5ba75f46d0:0",
              "owner": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
              "fee": 2416840,
              "height": 790297,
              "number": 7691915,
              "sat": 988302320381206,
              "timestamp": 1684397844,
              "media_type": "image/png",
              "media_size": 134842,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/c17b83f31645129b11ce7509526ff357c6023414c45492fbbf94ea5ba75f46d0:0/c50aebb4e19bad077dea49bc40f395a5a55f06ef6b033122e8355c8580063cc8i0/media"
            }
          ]
        },
        {
          "ts": 1684407468374,
          "type": "sell",
          "location": "3c3404ba5e6f03401c8f1eff12fa741f6caf44dd3224b2b2bf3a0dbae5d41178:0",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 5000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Illuminati Eye #4",
            "description": "Number #4 of Illuminati Eye Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "H8Ns6Qire+taIgkp1Ve8N8U7/taxL9nNVg/UsWs8R13fGqaxvB5U1slw4WXLs0Akibg2/+v4hExK0iybZvV20MA=",
          "cid": "Qmay9ngbxYf6TdyiEkX4vMAgZaeJ2XBA3P4WWAYyvJFaxK",
          "time": {
            "block": 1684407735000,
            "order": 1684407468374,
            "ago": "22 days ago"
          },
          "ago": "22 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 5000000,
            "btc": 0.05,
            "usd": 1322.3115803520002
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 879497754363988,
              "decimal": "175899.2754363988",
              "degree": "0°175899′507″2754363988‴",
              "name": "hptnniavfqj",
              "height": 175899,
              "cycle": 0,
              "epoch": 0,
              "period": 87,
              "offset": 2754363988,
              "rarity": "common",
              "output": "3c3404ba5e6f03401c8f1eff12fa741f6caf44dd3224b2b2bf3a0dbae5d41178:0",
              "start": 879497754363988,
              "size": 2656
            }
          ],
          "inscriptions": [
            {
              "id": "dfb394ff29d48f3b31c4a60c5cb15ed98d650e2edfb9cbf363a53d7ad21037f5i0",
              "outpoint": "3c3404ba5e6f03401c8f1eff12fa741f6caf44dd3224b2b2bf3a0dbae5d41178:0",
              "owner": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
              "fee": 2614800,
              "height": 790296,
              "number": 7691573,
              "sat": 879497754363988,
              "timestamp": 1684397109,
              "media_type": "image/png",
              "media_size": 138119,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/3c3404ba5e6f03401c8f1eff12fa741f6caf44dd3224b2b2bf3a0dbae5d41178:0/dfb394ff29d48f3b31c4a60c5cb15ed98d650e2edfb9cbf363a53d7ad21037f5i0/media"
            }
          ]
        },
        {
          "ts": 1683844978683,
          "type": "sell",
          "location": "2e15e5b2e24b20b9c826900f5ad91301cb9b9ac7a3a22bf108ef18fe6f56add3:0",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 3000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Jus Bitchin #5",
            "description": "Number #5 of Jus Bitchin Set - #2 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "HztsUAmWusFjpDZUkLVVW4Lyej1uXZuH6uFYzalQ4mjyAH2KXV18qRPyCwbP3YAhsvZSnpz0EF9mctdPu3A+mjg=",
          "cid": "QmYqsqmvnWoPetvy5pjjdbYDEdQ6VyuFAQfoeMY3aYR2DX",
          "time": {
            "block": 1683845748000,
            "order": 1683844978683,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 3000000,
            "btc": 0.03,
            "usd": 793.3869482112
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1612881794278139,
              "decimal": "450305.544278139",
              "degree": "0°30305′737″544278139‴",
              "name": "ckrppccjunu",
              "height": 450305,
              "cycle": 0,
              "epoch": 2,
              "period": 223,
              "offset": 544278139,
              "rarity": "common",
              "output": "2e15e5b2e24b20b9c826900f5ad91301cb9b9ac7a3a22bf108ef18fe6f56add3:0",
              "start": 1612881794278139,
              "size": 3064
            }
          ],
          "inscriptions": [
            {
              "id": "a9e480ec1614937dff9b43639cb1b902c860d382aa637e25794c6af98ee73949i0",
              "outpoint": "2e15e5b2e24b20b9c826900f5ad91301cb9b9ac7a3a22bf108ef18fe6f56add3:0",
              "owner": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
              "fee": 1332204,
              "height": 789267,
              "number": 5719034,
              "sat": 1612881794278139,
              "timestamp": 1683817863,
              "media_type": "image/png",
              "media_size": 69179,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/2e15e5b2e24b20b9c826900f5ad91301cb9b9ac7a3a22bf108ef18fe6f56add3:0/a9e480ec1614937dff9b43639cb1b902c860d382aa637e25794c6af98ee73949i0/media"
            }
          ]
        },
        {
          "ts": 1683815307578,
          "type": "sell",
          "location": "9580ec5462652c2060ac3e945e7f19f30911cc6c23a43f21de9a048be859f211:2",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 3000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Jus Bitchin #7",
            "description": "Number #7 of Jus Bitchin Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "IH3T6OR8KzusKs4OhtPxXtmlF2nmysirM39vgw8ars05DzwUywrKN/f9Q9QImwVIY+NfZCubEMcl8y8Z6FrQ75U=",
          "cid": "QmUK3AjGceYvW6i5ysrg6sKHctd5YN1WaypAc9JnyUpErQ",
          "time": {
            "block": 1683815537000,
            "order": 1683815307578,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 3000000,
            "btc": 0.03,
            "usd": 793.3869482112
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1750130143311959,
              "decimal": "560104.143311959",
              "degree": "0°140104′1672″143311959‴",
              "name": "blkjmosqfmw",
              "height": 560104,
              "cycle": 0,
              "epoch": 2,
              "period": 277,
              "offset": 143311959,
              "rarity": "common",
              "output": "9580ec5462652c2060ac3e945e7f19f30911cc6c23a43f21de9a048be859f211:2",
              "start": 1750130143311959,
              "size": 10000
            }
          ],
          "inscriptions": [
            {
              "id": "b9423bad544b6718cd11ea22b5a7c81d251aa8ee93d4c83d3a7de30ea161b448i0",
              "outpoint": "9580ec5462652c2060ac3e945e7f19f30911cc6c23a43f21de9a048be859f211:2",
              "owner": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
              "fee": 1490250,
              "height": 789181,
              "number": 5536268,
              "sat": 1750130143311959,
              "timestamp": 1683772715,
              "media_type": "image/png",
              "media_size": 78524,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/9580ec5462652c2060ac3e945e7f19f30911cc6c23a43f21de9a048be859f211:2/b9423bad544b6718cd11ea22b5a7c81d251aa8ee93d4c83d3a7de30ea161b448i0/media"
            }
          ]
        },
        {
          "ts": 1683812672517,
          "type": "sell",
          "location": "20f436233240721758c931d7ec97c48efff55be2f32a97475caf0b651658b1da:4",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 3000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Jus Bitchin #1",
            "description": "Number #1 of Jus Bitchin Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "H4dCJ+b99IuglBUNoMtyug72grf00QO/HIFG/LVrh8i5KRwrVoKZYpUiF484BWM3BaOG+umtVCAL/m3+hWGngh8=",
          "cid": "QmNNHZmSBYwzrtDCSEfVmh1qHYATTeRiZ8A1ffk7VxBosK",
          "time": {
            "block": 1683814166000,
            "order": 1683812672517,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 3000000,
            "btc": 0.03,
            "usd": 793.3869482112
          },
          "offers": {
            "count": 1,
            "list": [
              {
                "cid": "QmeFNiXzk1iXoMxKA6iNFWut854vNKiXjuPkKFBDXZhakV",
                "taker": "1JFbWA2xSATef44rJuaJ3EKLXfXnZNWPTp"
              }
            ]
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1895621853874033,
              "decimal": "722994.603874033",
              "degree": "0°92994′1266″603874033‴",
              "name": "akprbgbifcq",
              "height": 722994,
              "cycle": 0,
              "epoch": 3,
              "period": 358,
              "offset": 603874033,
              "rarity": "common",
              "output": "20f436233240721758c931d7ec97c48efff55be2f32a97475caf0b651658b1da:4",
              "start": 1895621853874033,
              "size": 10000
            }
          ],
          "inscriptions": [
            {
              "id": "c657250bd249b1d87050bb68145e4c2ada2894c6b38db370096afda928a52f29i0",
              "outpoint": "20f436233240721758c931d7ec97c48efff55be2f32a97475caf0b651658b1da:4",
              "owner": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
              "fee": 1789580,
              "height": 789205,
              "number": 5604292,
              "sat": 1895621853874033,
              "timestamp": 1683785214,
              "media_type": "image/png",
              "media_size": 108996,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/20f436233240721758c931d7ec97c48efff55be2f32a97475caf0b651658b1da:4/c657250bd249b1d87050bb68145e4c2ada2894c6b38db370096afda928a52f29i0/media"
            }
          ]
        },
        {
          "ts": 1683812176709,
          "type": "sell",
          "location": "0d1d044da40cd3906ec791f1ab4ed6b7fc9205da17c05af3eb29e51574aa3aa5:0",
          "maker": "123cFeHBiKdFPuThVSDMeGwVaSwsS3vwJH",
          "cardinals": 12000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Death Bird #2",
            "description": "#2 of six from Death Bird set. Only five copies exist. This is 1 of 5",
            "collection": "doordinals"
          },
          "signature": "H4ahV/O38poJ9hBq+iA9qRcxxXaDJ8SlXMxploO4FwT6dpmg571wCW7utYrxuKrzoOZ53HGSJ3w1NJIQ84TUkHs=",
          "cid": "QmeGWa7Y8QxkbRgyzx7nRkDkYz5sJ1bX3opNS5bLCH3Ceh",
          "time": {
            "block": 1683814166000,
            "order": 1683812176709,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 12000000,
            "btc": 0.12,
            "usd": 3173.5477928448
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 146873100216324,
              "decimal": "29374.3100216324",
              "degree": "0°29374′1150″3100216324‴",
              "name": "muruxiajbeb",
              "height": 29374,
              "cycle": 0,
              "epoch": 0,
              "period": 14,
              "offset": 3100216324,
              "rarity": "common",
              "output": "0d1d044da40cd3906ec791f1ab4ed6b7fc9205da17c05af3eb29e51574aa3aa5:0",
              "start": 146873100216324,
              "size": 10000
            }
          ],
          "inscriptions": [
            {
              "id": "0d1d044da40cd3906ec791f1ab4ed6b7fc9205da17c05af3eb29e51574aa3aa5i0",
              "outpoint": "0d1d044da40cd3906ec791f1ab4ed6b7fc9205da17c05af3eb29e51574aa3aa5:0",
              "owner": "123cFeHBiKdFPuThVSDMeGwVaSwsS3vwJH",
              "fee": 5852405,
              "height": 789221,
              "number": 5643742,
              "sat": 146873100216324,
              "timestamp": 1683793104,
              "media_type": "video/mp4",
              "media_size": 357583,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/0d1d044da40cd3906ec791f1ab4ed6b7fc9205da17c05af3eb29e51574aa3aa5:0/0d1d044da40cd3906ec791f1ab4ed6b7fc9205da17c05af3eb29e51574aa3aa5i0/media"
            }
          ]
        },
        {
          "ts": 1683808949933,
          "type": "sell",
          "location": "439efc38d83e892caff11be4be31eaf7413cf887fe92c48c72101163691930a3:0",
          "maker": "123cFeHBiKdFPuThVSDMeGwVaSwsS3vwJH",
          "cardinals": 12000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Death Bird #4",
            "description": "#4 of six from Death Bird set. Only five copies exist. This is 1 of 5",
            "collection": "doordinals"
          },
          "signature": "H+XQnOXLTNM/aIytY1hW5xufyv5xe8re68kP3+jhxoYXRSZDszByvmqADEz8otYGsjJ16C0VeJzMcVBelqaQeRI=",
          "cid": "QmVLZbudA5NPKdCbxAgQGFF4Ri2zjg4ywLL4WBm8t193vK",
          "time": {
            "block": 1683810121000,
            "order": 1683808949933,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 12000000,
            "btc": 0.12,
            "usd": 3173.5477928448
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1307464243240177,
              "decimal": "312985.1743240177",
              "degree": "0°102985′505″1743240177‴",
              "name": "eoydowvdplg",
              "height": 312985,
              "cycle": 0,
              "epoch": 1,
              "period": 155,
              "offset": 1743240177,
              "rarity": "common",
              "output": "439efc38d83e892caff11be4be31eaf7413cf887fe92c48c72101163691930a3:0",
              "start": 1307464243240177,
              "size": 10000
            }
          ],
          "inscriptions": [
            {
              "id": "439efc38d83e892caff11be4be31eaf7413cf887fe92c48c72101163691930a3i0",
              "outpoint": "439efc38d83e892caff11be4be31eaf7413cf887fe92c48c72101163691930a3:0",
              "owner": "123cFeHBiKdFPuThVSDMeGwVaSwsS3vwJH",
              "fee": 5834075,
              "height": 789221,
              "number": 5643741,
              "sat": 1307464243240177,
              "timestamp": 1683793104,
              "media_type": "video/mp4",
              "media_size": 356459,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/439efc38d83e892caff11be4be31eaf7413cf887fe92c48c72101163691930a3:0/439efc38d83e892caff11be4be31eaf7413cf887fe92c48c72101163691930a3i0/media"
            }
          ]
        },
        {
          "ts": 1683807506730,
          "type": "sell",
          "location": "e20070cbf352d3f3a66f2e13d749ebc15e9e518f427a01b42006bfdffe9ef7c7:0",
          "maker": "123cFeHBiKdFPuThVSDMeGwVaSwsS3vwJH",
          "cardinals": 12000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Death Bird #5",
            "description": "#5 of six from Death Bird set. Only five copies exist. This is 1 of 5",
            "collection": "doordinals"
          },
          "signature": "H5oWCia0/x3sHfZyL2GtKAP4SjRboFtvfX0JEmeqkh8eeZlVmcufJO3eP52NRFakIs0Drq4iQ1vXCS/XYtrR2R0=",
          "cid": "QmWHMiWckmTqCLuSBVr6ou84FXE9yM7Aa5scGivt9aHZjk",
          "time": {
            "block": 1683807994000,
            "order": 1683807506730,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 12000000,
            "btc": 0.12,
            "usd": 3173.5477928448
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1418459819696044,
              "decimal": "357383.2319696044",
              "degree": "0°147383′551″2319696044‴",
              "name": "dumqbywgnvh",
              "height": 357383,
              "cycle": 0,
              "epoch": 1,
              "period": 177,
              "offset": 2319696044,
              "rarity": "common",
              "output": "e20070cbf352d3f3a66f2e13d749ebc15e9e518f427a01b42006bfdffe9ef7c7:0",
              "start": 1418459819696044,
              "size": 10000
            }
          ],
          "inscriptions": [
            {
              "id": "e20070cbf352d3f3a66f2e13d749ebc15e9e518f427a01b42006bfdffe9ef7c7i0",
              "outpoint": "e20070cbf352d3f3a66f2e13d749ebc15e9e518f427a01b42006bfdffe9ef7c7:0",
              "owner": "123cFeHBiKdFPuThVSDMeGwVaSwsS3vwJH",
              "fee": 4857450,
              "height": 789221,
              "number": 5643743,
              "sat": 1418459819696044,
              "timestamp": 1683793104,
              "media_type": "video/mp4",
              "media_size": 296705,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/e20070cbf352d3f3a66f2e13d749ebc15e9e518f427a01b42006bfdffe9ef7c7:0/e20070cbf352d3f3a66f2e13d749ebc15e9e518f427a01b42006bfdffe9ef7c7i0/media"
            }
          ]
        },
        {
          "ts": 1683805329619,
          "type": "sell",
          "location": "9ece57352dbbcb9395fcf0b109fc55a3a01239ac12dadee3b2951d30fdebe82f:0",
          "maker": "123cFeHBiKdFPuThVSDMeGwVaSwsS3vwJH",
          "cardinals": 12000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Death Bird #6",
            "description": "#6 of six from Death Bird set. Only five copies exist. This is 1 of 5",
            "collection": "doordinals"
          },
          "signature": "H3T9H589WOzqqcGIrwVALmc29gbmun+KeMz99HjmEhO8PPJ/kuikozubWFSW1eqXFYt1hnv8LCxTiQqKqU2//Yk=",
          "cid": "QmdUBdoMeuUWEdAQHA99mHgSskSHYKW69d1XCcu8EgXwwz",
          "time": {
            "block": 1683805547000,
            "order": 1683805329619,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 12000000,
            "btc": 0.12,
            "usd": 3173.5477928448
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 478605882341996,
              "decimal": "95721.882341996",
              "degree": "0°95721′969″882341996‴",
              "name": "klpgntavxqj",
              "height": 95721,
              "cycle": 0,
              "epoch": 0,
              "period": 47,
              "offset": 882341996,
              "rarity": "common",
              "output": "9ece57352dbbcb9395fcf0b109fc55a3a01239ac12dadee3b2951d30fdebe82f:0",
              "start": 478605882341996,
              "size": 10000
            }
          ],
          "inscriptions": [
            {
              "id": "9ece57352dbbcb9395fcf0b109fc55a3a01239ac12dadee3b2951d30fdebe82fi0",
              "outpoint": "9ece57352dbbcb9395fcf0b109fc55a3a01239ac12dadee3b2951d30fdebe82f:0",
              "owner": "123cFeHBiKdFPuThVSDMeGwVaSwsS3vwJH",
              "fee": 6375330,
              "height": 789220,
              "number": 5643232,
              "sat": 478605882341996,
              "timestamp": 1683792823,
              "media_type": "video/mp4",
              "media_size": 389575,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/9ece57352dbbcb9395fcf0b109fc55a3a01239ac12dadee3b2951d30fdebe82f:0/9ece57352dbbcb9395fcf0b109fc55a3a01239ac12dadee3b2951d30fdebe82fi0/media"
            }
          ]
        },
        {
          "ts": 1685958318043,
          "type": "sell",
          "location": "aa723ef8fd78862e28e91763f005ae386c23c012100775e482d9a3dbb71aca1c:0",
          "maker": "18j4CbD2HpcMc2A4QDeEnDRk66d3it1JNP",
          "cardinals": 6969000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Banana",
            "description": "Depicting a partially peeled banana fruit, the banana emoji is variously used to suggest a penis, acting wild and crazy, slipping up, and the actual fruit.",
            "collection": "Ordifruits"
          },
          "signature": "70736274ff01007e02000000011cca1ab7dba3d982e475071012c0236c38ae05f06317e9282e8678fdf83e72aa0000000000ffffffff010000000000000000426a40396166326263646135356665373431393036386131353962613863393663613133386636613234363364306366363730643935343637666266333230653937660000000000010099020000000001017e7aa09d168e46ffa40e912cb476e51dd206277640dc26061b30c503c05df09b0000000000ffffffff01ca1b0000000000001976a91454bd059f2b80fe7596a4b55f86f7109c58f099a388ac0140e2c01eedb31f3dc9531f429cda4f4b71f20a17425edc81a6213573a25dbbe83d1507f57df2a39213391c58325117e72cafaa4fd39f1d22651f68b556970a88d70000000001076b4830450221009ed6020771d8ce6da2913fb5fc8ee621f2ee2e21ed5094f3ef45ca98c41bc688022009c92c8160ab34f3876cf4807589fd87b9d9a29110b6a5b345ef6c0f0c33cb8d012103d5a322f7027fca15f50e438ae71249d24f9e585861e9c99a8efbd68ebb9f228e0000",
          "signature_format": "psbt",
          "cid": "QmaKwHPeY5ofUnAbNJrKw8WULdEuZX5Kth4P11r791x3V3",
          "time": {
            "block": null,
            "order": 1685958318043,
            "ago": "Invalid date"
          },
          "ago": "Invalid date",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 6969000,
            "btc": 0.06969,
            "usd": 1843.0378806946178
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "ordinals": [
            {
              "number": 1379079878627699,
              "decimal": "341631.2378627699",
              "degree": "0°131631′927″2378627699‴",
              "name": "ebtfbwvggqo",
              "height": 341631,
              "cycle": 0,
              "epoch": 1,
              "period": 169,
              "offset": 2378627699,
              "rarity": "common",
              "output": "aa723ef8fd78862e28e91763f005ae386c23c012100775e482d9a3dbb71aca1c:0",
              "start": 1379079878627699,
              "size": 7114
            }
          ],
          "inscriptions": [
            {
              "id": "9bf05dc003c5301b0626dc40762706d21de576b42c910ea4ff468e169da07a7ei0",
              "outpoint": "aa723ef8fd78862e28e91763f005ae386c23c012100775e482d9a3dbb71aca1c:0",
              "owner": "18j4CbD2HpcMc2A4QDeEnDRk66d3it1JNP",
              "fee": 340053,
              "height": 792621,
              "number": 10576637,
              "sat": 1379079878627699,
              "timestamp": 1685754286,
              "media_type": "image/jpeg",
              "media_size": 63867,
              "media_content": "https://mainnet.ordit.io/utxo/inscriptions/aa723ef8fd78862e28e91763f005ae386c23c012100775e482d9a3dbb71aca1c:0/9bf05dc003c5301b0626dc40762706d21de576b42c910ea4ff468e169da07a7ei0/media"
            }
          ]
        }
      ],
      "offers": []
    },
    "rejected": {
      "orders": [
        {
          "ts": 1685347986089,
          "type": "sell",
          "location": "fcbcdea364e44f6aeae9fa65f488804ddff715bdac15464cdcbc7c050f1d9300:0",
          "maker": "152du2jCVntQ6TXVUPQNwpMNZnj5XkJCQH",
          "cardinals": 20000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Happy Pixel",
            "collection": "Happy Family"
          },
          "signature": "70736274ff01007e020000000100931d0f057cbcdc4c4615acbd15f7df4d8088f465fae9ea6a4fe464a3debcfc0000000000ffffffff010000000000000000426a403636393861303230343639656235366164666238333163333161613937623465636634666335656534663730663066363338393730316365633266643536326300000000000100fd650102000000000102b4c247c2c1a2f5478b16f6cf10b62ebb36539145d4abac3826ca270eb32333ed0000000000ffffffffa6d1712233d17b0f9cd89488de88718a185c04eb4a51688c4a3a4bed8d94bbeb0600000017160014057457bbe2934db1eae6600256958d97e771429dffffffff0222020000000000001976a9142c2fb81e8884da5b6a716fc11f3f7866d8cd9eb388acd9e503000000000017a9142d2154cbc0caaa6abe3a3d93209e4ae29e28dafc870140bfa3404d991e3351a43c3c22f1b36693ca63dc3c1e7134dd4f92e6311579b2e9c6efbc972e7aaacfadc3dda8c9a7ee7f0aecf61a7bfa73e6664ca36365fb2ca5024830450221008eb63f10678d1252693fba34565430b3ab13a1a7e4e1094b10fb4dd1f368cc2e02202add55096308f8de18a82651130e23e91128b8d45285c287343b63b7336ce82a012102dea4a90d28342b5984ebf7ef6fc23f72fb84059b2822bfea73c590b36206da8f0000000001076b483045022100966efbab7e4cf84c0afc46c9fbff224977d3a989e1ddd53782a1bbb9fd08ab2f02200be21bc865490e72bdce0be26e4ed4d216f01e37369e938db662ee43e708fd280121037a785f8192cdd835c86cfc9f6551aa3e54bbfdcb2c36413ed52a973e4ddc036c0000",
          "signature_format": "psbt",
          "cid": "QmPYf2rVyKDn95fCXFTs7ebUpuvYT6VqrzdXmQkQ1UmezC",
          "time": {
            "block": 1685348184000,
            "order": 1685347986089,
            "ago": "11 days ago"
          },
          "ago": "11 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 20000,
            "btc": 0.0002,
            "usd": 5.289246321408
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "reason": {
            "code": "ORDINALS_TRANSACTED_EXTERNALLY",
            "message": "Ordinal transacted to external recipients",
            "data": {
              "txid": "78ab5f528154a8205ccc79f480d0316deb72fa69ddbb8bf384616920fba3c8f5"
            }
          }
        },
        {
          "ts": 1684389488080,
          "type": "sell",
          "location": "b3d338ef2a01444ffc0063eec184c4094f63484bc5f87d711faac3d370cedc86:0",
          "maker": "1GrXVJhoDGbzKnAnKd3bpwwnSMk8cMdM3n",
          "cardinals": 10000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Ordinals 2023 Limited Edition Pass",
            "description": "Official Ordinal from the inaugural Ordinals Conference (1 of 20 pieces)",
            "collection": "Ordinals 2023 Poster (Edition 01) 20 Pieces"
          },
          "signature": "70736274ff01007e020000000186dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff010000000000000000426a406431656165373765343633636631636330353161656136333162666135396130326365393334643636363761383665643632663834666637666430363531323200000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0000000001076b483045022100da85870414d7959c7e62f0e48fbb9504220bf7b1cc21ceca3b0557a80fb3ddad02206ea7bcaf7abefbd276c5c2e46ec0bea652fb78855244e21fa9d18f6bea655ed7012102f6eb2b4fee358d8664458af480e13d07b1d83906a0b567b4c6cfdb14378077e70000",
          "signature_format": "psbt",
          "cid": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
          "time": {
            "block": 1684390007000,
            "order": 1684389488080,
            "ago": "22 days ago"
          },
          "ago": "22 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 10000,
            "btc": 0.0001,
            "usd": 2.644623160704
          },
          "offers": {
            "count": 5,
            "list": [
              {
                "cid": "QmSQpSfAtdFXtQK2KpbXjwrvUupjZB7KtNq9XY9xWty9z7",
                "taker": "1DxnANKqXnnper7he1gDgUskJ2heXpECUp"
              },
              {
                "cid": "QmWtcS29P1dQqTedwAyVM9LLpWvUcVPs9N28NjQcqJDV8z",
                "taker": "16ZT1Ei29X8QubTMfrE4Lu38uiH9PaJkXx"
              },
              {
                "cid": "QmSvyUQwsXrbTvdRR4zjLB7BgbfUs2W4QbMf8myhAHa6Ug",
                "taker": "1JFbWA2xSATef44rJuaJ3EKLXfXnZNWPTp"
              },
              {
                "cid": "QmXN6joa6XSwyEy8vH5ooqqexxArsTZBdY7eiyozxshgQr",
                "taker": "152du2jCVntQ6TXVUPQNwpMNZnj5XkJCQH"
              },
              {
                "cid": "QmbfQ4GJMHtVsnNzgx1RoK2QwGLLekVyrQVjmRa7BHjL5v",
                "taker": "1MGHVtT1WsXthfhnfRxX8VfgeK3Ej73UkX"
              }
            ]
          },
          "buy": false,
          "sell": true,
          "reason": {
            "code": "ORDINALS_TRANSACTED_EXTERNALLY",
            "message": "Ordinal transacted to external recipients",
            "data": {
              "txid": "03dab7d94f7fd946bc6be98931d166d3f921c12793382e8096d91e202d1c539a"
            }
          }
        },
        {
          "ts": 1684379944439,
          "type": "sell",
          "location": "b3d338ef2a01444ffc0063eec184c4094f63484bc5f87d711faac3d370cedc86:0",
          "maker": "1GrXVJhoDGbzKnAnKd3bpwwnSMk8cMdM3n",
          "cardinals": 694200000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Ordinals 2023 Limited Edition Pass",
            "description": "Official Ordinal from the inaugural Ordinals Conference (1 of 20 pieces)",
            "collection": "Ordinals 2023 Poster (Edition 01) 20 Pieces"
          },
          "signature": "70736274ff01007e020000000186dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff010000000000000000426a406434643465353732643031616634383033393965306533376563383964386336626239363933323739636165363963383235333235326264336566346232616100000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0000000001076a47304402202d75069f893f419ac985d7e0c1e6131dae2e8a233c258a9813af0ff35f7fea7c022036df0fc12938f3d0a6ef380f0a354412a0c01c4b148502596c17deb056817d4e012102f6eb2b4fee358d8664458af480e13d07b1d83906a0b567b4c6cfdb14378077e70000",
          "signature_format": "psbt",
          "cid": "QmabK4Ehvzw8sgvSF8gF9VnCnfsALnncMsJ3gT3RXv5yaU",
          "time": {
            "block": 1684380701000,
            "order": 1684379944439,
            "ago": "22 days ago"
          },
          "ago": "22 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 694200000,
            "btc": 6.942,
            "usd": 183589.7398160717
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "reason": {
            "code": "ORDINALS_TRANSACTED_EXTERNALLY",
            "message": "Ordinal transacted to external recipients",
            "data": {
              "txid": "03dab7d94f7fd946bc6be98931d166d3f921c12793382e8096d91e202d1c539a"
            }
          }
        },
        {
          "ts": 1683782695170,
          "type": "sell",
          "location": "b9423bad544b6718cd11ea22b5a7c81d251aa8ee93d4c83d3a7de30ea161b448:0",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 3000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Jus Bitchin #7",
            "description": "Number #7 of Jus Bitchin Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "IKi9tQMvZmr3jDwrN6nuOu7rVjGPOP5yYmnHYVtyXLmMOwcm+wf1KdvDevwT/KephNhJliZMKQfOUrDql8Dc44M=",
          "cid": "QmP4Jfe6bfjxRoaRRXgVgxhyysjrpFMPC4xyKmbkdecYHX",
          "time": {
            "block": 1683796413000,
            "order": 1683782695170,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 3000000,
            "btc": 0.03,
            "usd": 793.3869482112
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "reason": {
            "code": "ORDINALS_TRANSACTED_EXTERNALLY",
            "message": "Ordinal transacted to external recipients",
            "data": {
              "txid": "ea5b3b5e704c8115d0a2682a4dc623c33c109a84749c3477054d6c28631996ed"
            }
          }
        },
        {
          "ts": 1683792911164,
          "type": "sell",
          "location": "c657250bd249b1d87050bb68145e4c2ada2894c6b38db370096afda928a52f29:0",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 3000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Jus Bitchin #1",
            "description": "Number #1 of Jus Bitchin Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "IMVYzmCcmbMJQUuvmZw70hOAX7uLAfrC6dbDtJylIA5OQzryg+ipVdnA7VOJDnpS4aHca9mpbaVI+GIz+YiiqP0=",
          "cid": "QmdGsKaYg2AaJeQGvaVD4M4rAxUF1mq3yN5Njf5dg73Lip",
          "time": {
            "block": 1683793104000,
            "order": 1683792911164,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 3000000,
            "btc": 0.03,
            "usd": 793.3869482112
          },
          "offers": {
            "count": 0,
            "list": []
          },
          "buy": false,
          "sell": true,
          "reason": {
            "code": "ORDINALS_TRANSACTED_EXTERNALLY",
            "message": "Ordinal transacted to external recipients",
            "data": {
              "txid": "ea5b3b5e704c8115d0a2682a4dc623c33c109a84749c3477054d6c28631996ed"
            }
          }
        }
      ],
      "offers": [
        {
          "ts": 1685012277180,
          "origin": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
          "taker": "1DxnANKqXnnper7he1gDgUskJ2heXpECUp",
          "offer": "70736274ff0100a0020000000286dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff4515d75be9d8a8eafceb5a49c4056441ead1e41f74411af04b727e5e37bac8320200000000ffffffff0226ad6300000000001976a9148e2e16138030d76b2b342bd048b0ed2ef7e82a2a88ac10270000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88ac00000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f00000000000100fd250102000000018b718f76f992867174be0616ff298c6ed3cce5869c073c4d6369e9e735b16a44010000006a47304402206cf3831567bb4b66c489f9fc42f6ca190329549250f856a3f25129f97cf42f5802201d490999169ec6b53148247b096a2afe5be13a221f53f20b9e06e06dc72512f40121029f740185b5f32afb7e6ccd21013d66991edb8050fef41ddc1d2a50b5db6f4012ffffffff0358020000000000001976a914b04044a0549ca40f92478df96efb9e72f33b29be88ac00000000000000003b6a397361646f3d6f726465723a516d63574b41486f34346a50656933694659394d716933524178446665674747485170335075464e505362724d7872e86300000000001976a9148e2e16138030d76b2b342bd048b0ed2ef7e82a2a88ac0000000001076a47304402207a669790fe5c90d9061ae7db96b03b9e1d652d01ed097ea68ceee58aed8cc6f802205b6746ffe17c794be49396a1700a5b64168394d2ccb56ee03f2f7abe8d8b80960121029f740185b5f32afb7e6ccd21013d66991edb8050fef41ddc1d2a50b5db6f4012000000",
          "offer_format": "psbt",
          "cid": "QmSQpSfAtdFXtQK2KpbXjwrvUupjZB7KtNq9XY9xWty9z7",
          "time": {
            "block": 1685012539000,
            "offer": 1685012277180,
            "ago": "15 days ago"
          },
          "ago": "15 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 13200,
            "btc": 0.000132,
            "usd": 3.4909025721292806
          },
          "order": {
            "ts": 1684389488080,
            "type": "sell",
            "location": "b3d338ef2a01444ffc0063eec184c4094f63484bc5f87d711faac3d370cedc86:0",
            "maker": "1GrXVJhoDGbzKnAnKd3bpwwnSMk8cMdM3n",
            "cardinals": 10000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "Ordinals 2023 Limited Edition Pass",
              "description": "Official Ordinal from the inaugural Ordinals Conference (1 of 20 pieces)",
              "collection": "Ordinals 2023 Poster (Edition 01) 20 Pieces"
            },
            "signature": "70736274ff01007e020000000186dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff010000000000000000426a406431656165373765343633636631636330353161656136333162666135396130326365393334643636363761383665643632663834666637666430363531323200000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0000000001076b483045022100da85870414d7959c7e62f0e48fbb9504220bf7b1cc21ceca3b0557a80fb3ddad02206ea7bcaf7abefbd276c5c2e46ec0bea652fb78855244e21fa9d18f6bea655ed7012102f6eb2b4fee358d8664458af480e13d07b1d83906a0b567b4c6cfdb14378077e70000",
            "signature_format": "psbt",
            "cid": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
            "price": {
              "sat": 10000,
              "btc": 0.0001,
              "usd": 2.644623160704
            }
          },
          "reason": {
            "code": "ORDER_CLOSED",
            "message": "Order has been closed",
            "data": {}
          }
        },
        {
          "ts": 1684723381251,
          "origin": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
          "taker": "16ZT1Ei29X8QubTMfrE4Lu38uiH9PaJkXx",
          "offer": "70736274ff0100a0020000000286dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffffb7eb50a4f4983c8a81d24955196b22d0faa995b1102c1ef648f738d057b3e8d20100000000ffffffff0204dd0c00000000001976a9143cfba594fb49ce4f0a0622da5ab5ba360f6270f188ac10270000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88ac00000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f00000000000100eb0200000001a1d2d57562722aefa5549581e72692efedcddfcad92aa7e404c133e248240c44010000006b483045022100ea12390da93fef6a38dc9f85b0a61ed8f92b1bcdd17536f2cfbac2c391850af00220051a16aebe37651d271a17437e8ff802dffe6d973b1c7c2f3076ba26bf7b145d012102acb973d4b028d83aa7427e2e30a4a4a89c9dfaf7e88f4c0c0372f26e3a5629adffffffff02a086010000000000225120b6ca9c826512ef604a45ce8df65f8432bd66baae124ebcf487c311935e3242e5d9760d00000000001976a9143cfba594fb49ce4f0a0622da5ab5ba360f6270f188ac0000000001076b483045022100bd02cc70f6feb59d9812c36843fde2fa5e2c8e63688edc80413f09041be9391d022000cbbfdad283f28ae35392f4f755b7cea67dbb4b5240005f0225370eda1c62ab012102acb973d4b028d83aa7427e2e30a4a4a89c9dfaf7e88f4c0c0372f26e3a5629ad000000",
          "offer_format": "psbt",
          "cid": "QmWtcS29P1dQqTedwAyVM9LLpWvUcVPs9N28NjQcqJDV8z",
          "time": {
            "block": 1684723617000,
            "offer": 1684723381251,
            "ago": "18 days ago"
          },
          "ago": "18 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 37401.00000000012,
            "btc": 0.00037401000000000117,
            "usd": 9.891155083349062
          },
          "order": {
            "ts": 1684389488080,
            "type": "sell",
            "location": "b3d338ef2a01444ffc0063eec184c4094f63484bc5f87d711faac3d370cedc86:0",
            "maker": "1GrXVJhoDGbzKnAnKd3bpwwnSMk8cMdM3n",
            "cardinals": 10000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "Ordinals 2023 Limited Edition Pass",
              "description": "Official Ordinal from the inaugural Ordinals Conference (1 of 20 pieces)",
              "collection": "Ordinals 2023 Poster (Edition 01) 20 Pieces"
            },
            "signature": "70736274ff01007e020000000186dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff010000000000000000426a406431656165373765343633636631636330353161656136333162666135396130326365393334643636363761383665643632663834666637666430363531323200000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0000000001076b483045022100da85870414d7959c7e62f0e48fbb9504220bf7b1cc21ceca3b0557a80fb3ddad02206ea7bcaf7abefbd276c5c2e46ec0bea652fb78855244e21fa9d18f6bea655ed7012102f6eb2b4fee358d8664458af480e13d07b1d83906a0b567b4c6cfdb14378077e70000",
            "signature_format": "psbt",
            "cid": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
            "price": {
              "sat": 10000,
              "btc": 0.0001,
              "usd": 2.644623160704
            }
          },
          "reason": {
            "code": "ORDER_CLOSED",
            "message": "Order has been closed",
            "data": {}
          }
        },
        {
          "ts": 1684419571484,
          "origin": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
          "taker": "1JFbWA2xSATef44rJuaJ3EKLXfXnZNWPTp",
          "offer": "70736274ff0100a0020000000298cd02481b56ff658dc3e850d0584169096df5b4f041fbdf80729c6dac6a17770100000000ffffffff86dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff028dff3b00000000001976a914bd3cc35fce23bc6eafcb2fb1da0b1c922b47fece88ac10270000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88ac00000000000100ea020000000141f3872ae36cd02082fe12ef26217509fbbd72449f11562e5763e4cc7fed46f3000000006a4730440220473c106612710ffe94693e4d5251cdd2692022f7eb2acd96f91b951a93e5e7fa022046bcae783b014c5e44d39de380a112f066f563b80be73dfdf35c528e16ae2c9c012102a84c6144798b3ee3d6de19013082576017390446f774a14271c2fb7c42daff4bfdffffff024871000000000000225120bf5c23d234c2cec3218e47e371382877e0d738c4ef758f429697f84007d3697b696e3c00000000001976a914bd3cc35fce23bc6eafcb2fb1da0b1c922b47fece88ac0000000001076b483045022100aaa2e1bc43217d0bf7b41a8314254de852d6531d34ce9b0f5d438f0d2345c35602204337fdb1af9a852bf79542e6ccbd0845ea5ba4e92c88e6447d2e95d4f116e8e3012102a84c6144798b3ee3d6de19013082576017390446f774a14271c2fb7c42daff4b000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f00000000000000",
          "offer_format": "psbt",
          "cid": "QmSvyUQwsXrbTvdRR4zjLB7BgbfUs2W4QbMf8myhAHa6Ug",
          "time": {
            "block": 1684452363000,
            "offer": 1684419571484,
            "ago": "21 days ago"
          },
          "ago": "21 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 26400,
            "btc": 0.000264,
            "usd": 6.981805144258561
          },
          "order": {
            "ts": 1684389488080,
            "type": "sell",
            "location": "b3d338ef2a01444ffc0063eec184c4094f63484bc5f87d711faac3d370cedc86:0",
            "maker": "1GrXVJhoDGbzKnAnKd3bpwwnSMk8cMdM3n",
            "cardinals": 10000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "Ordinals 2023 Limited Edition Pass",
              "description": "Official Ordinal from the inaugural Ordinals Conference (1 of 20 pieces)",
              "collection": "Ordinals 2023 Poster (Edition 01) 20 Pieces"
            },
            "signature": "70736274ff01007e020000000186dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff010000000000000000426a406431656165373765343633636631636330353161656136333162666135396130326365393334643636363761383665643632663834666637666430363531323200000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0000000001076b483045022100da85870414d7959c7e62f0e48fbb9504220bf7b1cc21ceca3b0557a80fb3ddad02206ea7bcaf7abefbd276c5c2e46ec0bea652fb78855244e21fa9d18f6bea655ed7012102f6eb2b4fee358d8664458af480e13d07b1d83906a0b567b4c6cfdb14378077e70000",
            "signature_format": "psbt",
            "cid": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
            "price": {
              "sat": 10000,
              "btc": 0.0001,
              "usd": 2.644623160704
            }
          },
          "reason": {
            "code": "OFFER_VALIDATION_FAILED",
            "message": "Order utxo is in the wrong transaction input position",
            "data": {
              "location": "b3d338ef2a01444ffc0063eec184c4094f63484bc5f87d711faac3d370cedc86:0",
              "expected": 0,
              "actual": 1
            }
          }
        },
        {
          "ts": 1684382586236,
          "origin": "QmNNHZmSBYwzrtDCSEfVmh1qHYATTeRiZ8A1ffk7VxBosK",
          "taker": "1JFbWA2xSATef44rJuaJ3EKLXfXnZNWPTp",
          "offer": "70736274ff0100a00200000002dab15816650baf5c47972af3e25bf5ff8ec497ecd731c958177240322336f4200400000000ffffffff41f3872ae36cd02082fe12ef26217509fbbd72449f11562e5763e4cc7fed46f30000000000ffffffff02b8f20e00000000001976a914bd3cc35fce23bc6eafcb2fb1da0b1c922b47fece88acc0c62d00000000001976a9148745b27b692d2422edffa3c9b43cf3c77a42739788ac00000000000100fd690102000000011e523033dc007bb4fa8e6cac386c37f97411e50cd5bc4c5ee8285fb308a75d2b040000006a4730440220769a5028b4ad5591ef1ef15a2f8b085cdc8405d9e4971445775607cfe15b468602201c6479ef27f9db133c3f5851998465a8a7e4d3c27d28b207b148513aee00f0b301210280a636af7df0c5f3ea68ff74602ad00f5f09beb88ba09f29d2ec5aeebdc65ff1fdffffff0628230000000000001976a9140ceac017364e41a0dfa3fb7171a9842ca9bc2d1988ac28230000000000001976a9142efcfdb7c19b1d0ba04014c1742d880876f417e688ac28230000000000001976a914cd204370a3fd24844782bb45f4f6867c07922f1588ac48260000000000001976a914f7579ee54c2a135e63edd3fcea3042e8c52362fc88ac10270000000000001976a9148745b27b692d2422edffa3c9b43cf3c77a42739788ac42bf0000000000001976a914dd8dda7f80e96ce8880b267e285a5794afd47e3988acf60a0c00000100e1020000000001014688ce8ec6be38061be9dc0d6847d073e1485f66c1d170ca1ee9162168d9f6a70000000000fdffffff0200093d00000000001976a914bd3cc35fce23bc6eafcb2fb1da0b1c922b47fece88acaa0d0f0000000000160014cd296a59361e56476dd9771ffb8502976b49e34b0247304402202a2c1ddb1d6254049dc035ce8c3a8268c5c5ff450a493d089e83dfa76855b2ec02205f50314a076050d7c6ce38f8db9ef2e1b07a91c30e7922a34be365ad1604973701210202f76331918de0f594a3b3ff9f8d5b065527631758a3f8b51954a9d6664517c00000000001076b483045022100a0c74d6d4c5656e36d0f5eff740ba63ae721adb1e036d8234e2319368a4e6f4d02200d5c6c1acffe821bda120033f62d46797618e5b840b75509b7f798664ef4e130012102a84c6144798b3ee3d6de19013082576017390446f774a14271c2fb7c42daff4b000000",
          "offer_format": "psbt",
          "cid": "QmeFNiXzk1iXoMxKA6iNFWut854vNKiXjuPkKFBDXZhakV",
          "time": {
            "block": 1684382799000,
            "offer": 1684382586236,
            "ago": "22 days ago"
          },
          "ago": "22 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 30360,
            "btc": 0.0003036,
            "usd": 8.029075915897344
          },
          "order": {
            "ts": 1683812672517,
            "type": "sell",
            "location": "20f436233240721758c931d7ec97c48efff55be2f32a97475caf0b651658b1da:4",
            "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
            "cardinals": 3000000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "Jus Bitchin #1",
              "description": "Number #1 of Jus Bitchin Set - #1 of only 10 copies",
              "collection": "bitchin"
            },
            "signature": "H4dCJ+b99IuglBUNoMtyug72grf00QO/HIFG/LVrh8i5KRwrVoKZYpUiF484BWM3BaOG+umtVCAL/m3+hWGngh8=",
            "cid": "QmNNHZmSBYwzrtDCSEfVmh1qHYATTeRiZ8A1ffk7VxBosK",
            "price": {
              "sat": 3000000,
              "btc": 0.03,
              "usd": 793.3869482112
            }
          },
          "reason": {
            "code": "OFFER_VALIDATION_FAILED",
            "message": "One or more spent inputs",
            "data": {
              "txid": "f346ed7fcce463572e56119f4472bdfb09752126ef12fe8220d06ce32a87f341",
              "index": 0
            }
          }
        },
        {
          "ts": 1684327847820,
          "origin": "QmY1epJg3K2HHpN1Qqd2f4CM96bq2wELeuhXimev69FvZ6",
          "taker": "16vR1f6DTwfc1GswgQBGvUyBcGXHtYnMwV",
          "offer": "70736274ff0100a00200000002e6b62f44b939f1aab32f1ad1d69e47c620166b42445e79feb45cf20a62daecdf0200000000fffffffffeeb1be95fa75b6eef58bd062834534add337f2990b2a5e56a6a492612f6137f0000000000ffffffff0218360700000000001976a91440f2b7f203d4876078d0e0bd44d70ed7d8d2857c88acc0c62d00000000001976a9148745b27b692d2422edffa3c9b43cf3c77a42739788ac00000000000100fd250102000000012b7c03d1b801b3e81f343a9397a1da3dab8a7f612e2eafc5c3b8d128b82e4232010000006a47304402206ea6887ef17d01621b36b61a9eabed461f740532b5be324f6116a5d9bb66ee890220524a99f48a0f111d755e03e7cf604cabc2fe1f89c66c7f2d0551c3f063a517dc012103cf3f37962cdacd405ce7138804436642cd2595c79fc66cf8bf16a978a8a6ffabfdffffff041c250000000000001976a914c829ad22002740f2ccced33d3a4e92f929f820db88ac58260000000000001976a914dd8dda7f80e96ce8880b267e285a5794afd47e3988ac10270000000000001976a9148745b27b692d2422edffa3c9b43cf3c77a42739788ac33ccf100000000001976a91443b4f2bb4c3187354c230ea87e79a3a571f6e2aa88ac0b0b0c00000100e10200000001d6bc782cc9003ba21f7ebd89d2d0b6fb15ff6c68981e2c6814f75b27b18976b7000000006a47304402207914a6fa31dc24f354e288f466a920d1f072e658de615f9f7552abf2b5537e15022015e7959c61eedc794937c3c2d988927caa11edb9613b9ee744645d6848b01ead0121036a361155efe57c6290537963df55a5ff93825586d517a7e0d67476df8c91432bfdffffff02e0673500000000001976a91440f2b7f203d4876078d0e0bd44d70ed7d8d2857c88ac235a0700000000001976a914cc7473359480049811be000fee8e45c3a4f7921a88ac0000000001076a47304402201a2e0c9d9f8b3e5b62d139fc2326f9dc81243158a098161e3637668a77b7562c022003b390859b6cbc2c58d69246b0edbc282028ea5466733890605634b2ce4d5f39012102162449b5156ef58f0eb886b36b8db219fc884873eab8f4cca6ae4d7365444659000000",
          "offer_format": "psbt",
          "cid": "QmSBFcAH4VXyz6TjvELMdSTpCvyQ6QpidEwUB7X7K7TyTA",
          "time": {
            "block": 1684328216000,
            "offer": 1684327847820,
            "ago": "23 days ago"
          },
          "ago": "23 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 37400.000000000466,
            "btc": 0.00037400000000000465,
            "usd": 9.890890621033083
          },
          "order": {
            "ts": 1683817190600,
            "type": "sell",
            "location": "dfecda620af25cb4fe795e44426b1620c6479ed6d11a2fb3aaf139b9442fb6e6:2",
            "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
            "cardinals": 3000000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "Jus Bitchin #2",
              "description": "Number #2 of Jus Bitchin Set - #1 of only 10 copies",
              "collection": "bitchin"
            },
            "signature": "H4QUdlgwySQxWp1kNCdCUbdsehBGXe6/wE32wwq4evbOMZnFcfQ/ERjRZWx2PgV1E5Wxts1QXGogQofv6uhw9eY=",
            "cid": "QmY1epJg3K2HHpN1Qqd2f4CM96bq2wELeuhXimev69FvZ6",
            "price": {
              "sat": 3000000,
              "btc": 0.03,
              "usd": 793.3869482112
            }
          },
          "reason": {
            "code": "ORDER_FULFILLED",
            "message": "Order was fulfilled by another offer",
            "data": {}
          }
        },
        {
          "ts": 1685348979040,
          "origin": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
          "taker": "152du2jCVntQ6TXVUPQNwpMNZnj5XkJCQH",
          "offer": "70736274ff0100a0020000000286dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff4cadb079f86c0dd980e6d7ba08aedf38df2de75b23270cc60a98b1eb41b2c4090200000000ffffffff02c33b0000000000001976a9142c2fb81e8884da5b6a716fc11f3f7866d8cd9eb388ac10270000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88ac00000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f00000000000100fd25010200000001caa5e21fca2158572277c67ddc524cf72fee39238cc24cfb326243da00d16dd6000000006a473044022004839cd09adc39959a19508d2d4cc6ff74698ebb4b45170a6629c948634855250220655542202636b5cd027caf2e00ef050754b354bb506e26ffd89f13bdef3cda790121037a785f8192cdd835c86cfc9f6551aa3e54bbfdcb2c36413ed52a973e4ddc036cffffffff0358020000000000001976a914b04044a0549ca40f92478df96efb9e72f33b29be88ac00000000000000003b6a397361646f3d6f726465723a516d505966327256794b446e3935664358465473376562557075765954365671727a64586d516b5131556d657a43776e0000000000001976a9142c2fb81e8884da5b6a716fc11f3f7866d8cd9eb388ac0000000001076b48304502210090fffb916b776ef2ccfe2614daa29c0a98a2a27c18ea13867095955db642b4fe02203fe7ae1b4825f443c3ac121ecad3ff07972bd74464183d6b62925de445bee2920121037a785f8192cdd835c86cfc9f6551aa3e54bbfdcb2c36413ed52a973e4ddc036c000000",
          "offer_format": "psbt",
          "cid": "QmXN6joa6XSwyEy8vH5ooqqexxArsTZBdY7eiyozxshgQr",
          "time": {
            "block": null,
            "offer": 1685348979040,
            "ago": "Invalid date"
          },
          "ago": "Invalid date",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 11000,
            "btc": 0.00011,
            "usd": 2.9090854767744
          },
          "order": {
            "ts": 1684389488080,
            "type": "sell",
            "location": "b3d338ef2a01444ffc0063eec184c4094f63484bc5f87d711faac3d370cedc86:0",
            "maker": "1GrXVJhoDGbzKnAnKd3bpwwnSMk8cMdM3n",
            "cardinals": 10000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "Ordinals 2023 Limited Edition Pass",
              "description": "Official Ordinal from the inaugural Ordinals Conference (1 of 20 pieces)",
              "collection": "Ordinals 2023 Poster (Edition 01) 20 Pieces"
            },
            "signature": "70736274ff01007e020000000186dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff010000000000000000426a406431656165373765343633636631636330353161656136333162666135396130326365393334643636363761383665643632663834666637666430363531323200000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0000000001076b483045022100da85870414d7959c7e62f0e48fbb9504220bf7b1cc21ceca3b0557a80fb3ddad02206ea7bcaf7abefbd276c5c2e46ec0bea652fb78855244e21fa9d18f6bea655ed7012102f6eb2b4fee358d8664458af480e13d07b1d83906a0b567b4c6cfdb14378077e70000",
            "signature_format": "psbt",
            "cid": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
            "price": {
              "sat": 10000,
              "btc": 0.0001,
              "usd": 2.644623160704
            }
          },
          "reason": {
            "code": "ORDER_CLOSED",
            "message": "Order has been closed",
            "data": {}
          }
        },
        {
          "ts": 1685529475690,
          "origin": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
          "taker": "1MGHVtT1WsXthfhnfRxX8VfgeK3Ej73UkX",
          "offer": "70736274ff0100a0020000000286dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffffca0bf515384baa9562f8d10c1fff97bc157596007354e212fe0e637efd7ff5ac0000000000ffffffff02cc070400000000001976a914de4686e85c1024c28bf4d2104bcd9344012ee5cf88ac10270000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88ac00000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f00000000000100e1020000000171dff9b9df370401bae675098828c7a85d5ef2578709ff93c2b8728b1290d96d0e0000006a47304402206b15a280fa754aa02ffdfb34a25185a7802d228cbe1860e1ff04c334ef5a267e02200e7c754682d3e613346f163c24becf2373e66cb26c23b8c59a92440f13861da4012103d5a322f7027fca15f50e438ae71249d24f9e585861e9c99a8efbd68ebb9f228effffffff02e0930400000000001976a914de4686e85c1024c28bf4d2104bcd9344012ee5cf88ac39740200000000001976a91454bd059f2b80fe7596a4b55f86f7109c58f099a388ac0000000001076b483045022100a935f14e8ff36eb6bd751389b0858250338639faa9f38e06b0767588629c82d1022037f7faa25ad6023bdb4d19d78a3e7d849a63f85574457764cd504ca0ddc3660f01210391089bd15ee6bcb43de39056b1fc08498fb9f32d1ea2d7466f241cfaa9dd1bf5000000",
          "offer_format": "psbt",
          "cid": "QmbfQ4GJMHtVsnNzgx1RoK2QwGLLekVyrQVjmRa7BHjL5v",
          "time": {
            "block": null,
            "offer": 1685529475690,
            "ago": "Invalid date"
          },
          "ago": "Invalid date",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 33880,
            "btc": 0.0003388,
            "usd": 8.959983268465152
          },
          "order": {
            "ts": 1684389488080,
            "type": "sell",
            "location": "b3d338ef2a01444ffc0063eec184c4094f63484bc5f87d711faac3d370cedc86:0",
            "maker": "1GrXVJhoDGbzKnAnKd3bpwwnSMk8cMdM3n",
            "cardinals": 10000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "Ordinals 2023 Limited Edition Pass",
              "description": "Official Ordinal from the inaugural Ordinals Conference (1 of 20 pieces)",
              "collection": "Ordinals 2023 Poster (Edition 01) 20 Pieces"
            },
            "signature": "70736274ff01007e020000000186dcce70d3c3aa1f717df8c54b48634f09c484c1ee6300fc4f44012aef38d3b30000000000ffffffff010000000000000000426a406431656165373765343633636631636330353161656136333162666135396130326365393334643636363761383665643632663834666637666430363531323200000000000100fd740102000000000102b447ff9c3460751c6700a4de01d6105159dd891d7b691402b31b9a3f137d96f50000000000fdffffffdc6c50f9e599466e043205cf518f506d59c00613e53cb2932cd098618e5a4fa70100000000fdffffff02541f0000000000001976a914ade7b810913681714158cdb31834ecd80409bf7f88acced4090000000000160014db3aa782f3f30b1e286fdc4505f1c0ae0cf4eec802463043021f1a647ca392dad73cc20341eaf88024b85ad065ff2073d4cc5645b98158a09a02202a50118f9aee199c4c16c6cc7e78fa7f586d859c0b97a818720d6b7b17e28629012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0247304402206f30e61b6216d476dd4cb81647019fa638fc9eabdb34981547a850b0b0d891f5022000b7524b71e2eff045686fe6fa8de7a50419091977d8bec3071fd213b6181bd2012103830d8469c1db680b7c9ea937c2041715adf7a14be747f1d91387ba1e02cdac9f0000000001076b483045022100da85870414d7959c7e62f0e48fbb9504220bf7b1cc21ceca3b0557a80fb3ddad02206ea7bcaf7abefbd276c5c2e46ec0bea652fb78855244e21fa9d18f6bea655ed7012102f6eb2b4fee358d8664458af480e13d07b1d83906a0b567b4c6cfdb14378077e70000",
            "signature_format": "psbt",
            "cid": "QmU8Kr3AhBnXdVf8YEpgaXkD1CKZw4tuZCRrrhYrZTZgdX",
            "price": {
              "sat": 10000,
              "btc": 0.0001,
              "usd": 2.644623160704
            }
          },
          "reason": {
            "code": "ORDER_CLOSED",
            "message": "Order has been closed",
            "data": {}
          }
        }
      ]
    },
    "completed": {
      "orders": [
        {
          "ts": 1684389892527,
          "type": "sell",
          "location": "a6e81a8264c0f6d3eaf2488dbc17ae1db46ea32cf5f5c4d203e364f3a9d38037:0",
          "maker": "1JFbWA2xSATef44rJuaJ3EKLXfXnZNWPTp",
          "cardinals": 15000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "GM! "
          },
          "signature": "70736274ff01007e02000000013780d3a9f364e303d2c4f5f52ca36eb41dae17bc8d48f2ead3f6c064821ae8a60000000000ffffffff010000000000000000426a406463363338393136366439653132626464646565643762303131306537373230333365336564343463343466383861653534613763623465383433326538373900000000000100fd60070200000000010198cd02481b56ff658dc3e850d0584169096df5b4f041fbdf80729c6dac6a17770000000000fdffffff0222020000000000001976a914bd3cc35fce23bc6eafcb2fb1da0b1c922b47fece88acb60c00000000000016001405b8bea140fa95583ac77d5874975b47830778ed0340bd6a873242c5c63225cf75a0e73bd93c19a02298f1aa4bda7163eac08d00b13e89e1083c92b3b216467d29aaa91ab78b89d986b186f7e6251c3e181f58f4dfd0fd830620117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423eac06632d592d8801750063036f7264010109696d6167652f706e67004d080289504e470d0a1a0a0000000d49484452000000140000001408060000008d891d0d000000017352474200aece1ce9000000206348524d00007a26000080840000fa00000080e8000075300000ea6000003a98000017709cba513c00000084655849664d4d002a000000080005011200030000000100010000011a0005000000010000004a011b0005000000010000005201280003000000010002000087690004000000010000005a00000000000000140000000100000014000000010003a00100030000000100010000a00200040000000100000014a003000400000001000000140000000084f06ccf00000009704859730000031300000313013d6683c70000015969545874584d4c3a636f6d2e61646f62652e786d7000000000003c783a786d706d65746120786d6c6e733a783d2261646f62653a6e733a6d6574612f2220783a786d70746b3d22584d5020436f726520362e302e30223e0a2020203c7264663a52444620786d6c6e733a7264663d22687474703a2f2f7777772e77332e6f72672f313939392f30322f32322d7264662d73796e7461782d6e7323223e0a2020202020203c7264663a4465736372697074696f6e207264663a61626f75743d22220a202020202020202020202020786d6c6e733a746966663d22687474703a2f2f6e732e61646f62652e636f6d2f746966662f312e302f223e0a2020202020202020203c74694d080266663a4f7269656e746174696f6e3e313c2f746966663a4f7269656e746174696f6e3e0a2020202020203c2f7264663a4465736372697074696f6e3e0a2020203c2f7264663a5244463e0a3c2f783a786d706d6574613e0a195ee107000003bf494441543811a5944d6c1b4514c77ffb617bed7c38ae13278a8a9d34c48daaa60d341512a5a5282120716b0e90407d4020c40d29420ae1085229202e9cda720084140105b542ad38b4872281f8905a2a5048036de2384dec38969bd8f1d7dabbccaee3b4518984d4b79ad99d3733fffdbf79ff3792cfe733d9c6ac09493459f4a6788c8df136cb6db7bcdda4214bd4cb0a8d022c27196862a11f45f4d62fb637f5bfa62cb0bad5120b6a0eea3cb49b6e16e50a28aba845075ec945453205f4fde0f7019a02cc9bab30bf7b07af18610eadfb7078dc68659df968864fdae2248c1c4a491c815e1484b7826e09d9344d34d5c97c7e95de1d61c2759d7c75b09393dd1a1fa6f338063b39120b92ba1da73e99c0743841ecb9d7a4bb4931511507c97492633dbd74baf770de7f9391179fa7b79026b39ec4adbbb9f5cf65667cc35cbc7e0de5fbef28055a412f6d626e32942585929e21d8b18ff0cefda49c06cfed0d33f4cde3042e1da1adf56f421722f497de41afacb062b6b02260dc6e0f8661e5bf6a36a015aad3eb6575b540f88561629161e67abdace5f6f26656e77c32c69fa357f8569ae6ed4d0802734b2c644a44c23ef6ecea60313a8ba66922f26ae876c8b22c932d1a3cdcaa103a745c9c8b815c9767fd5a0a3395e3f0e8011e712578a8fe2ce77e5ae3bdec08b367dee787cb9778e97884502844369bb599ca16b2dfefa7984df3c6f8093e9a788d8b0b37988a17907e5964ee7017cb834374f73d4a476090834fbd4ee5c25582ededec17bec9c949a2d1282d2d2d364b3b648ba165aad389afbe01b5c94bf9400f6ba23606ea7d3425d25cf97a8af91b651a1443c8bb9191d167686a6bc6a95695276dc8c71ed5e237ca650c874aff5f2966677f24b9dbc9d4c75f909d8af30765228b653a9aa719e86fa6abbb0b972aa197ef26c422b599e5eac0a06028fcecda49e8b15e945090e5a79f4093d3f4b3cce7b2c997bf97f11a1aefce696474194594e5bd6603d6e83a85041ca53c5cff945ff785b81579999b03a3fc36dd00853e5e0d3cc90753bbe8bb7a163e3b29f427e1725b556e154cb562ec90755db79db1d8022ba924274e9fc1373084e9a9237fa788d621f3acde82cf23e33a7694b6db47e14e9c6c3c4654ecb1ac54aa8adb968d6998045a03cccccc303e3eced8d818c5421e492840b212269a21a424ae074cc14431253c427ba74e9f62e2ad097a7a7a585a5a12cbc445572bbd4aa542636323f17882b2b808feaf058341d2e9346a2ddb35400bc0cab6c3e1c0e3f1d8dff6a96c9c8d5d075635549dc8c29fcbe528168b36b31a81234d8635c783beb7c8e641c1acfdff0255f46bcf302051ab0000000049454e44ae4260826821c0117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423e0000000001076a47304402205af382b733ef79bc6b78e9e510f100bff22d936c88d3f0e38233b58ff1eedc0302204f89368fc139dae69510d3e46568cb9a14cd152297443fa9e01ccdd7050d3739012102a84c6144798b3ee3d6de19013082576017390446f774a14271c2fb7c42daff4b0000",
          "signature_format": "psbt",
          "cid": "QmcUEirL8hDzwcWaDhvjoNEqdDowZcXLDBkTkHt3CCPPw4",
          "time": {
            "block": 1684390007000,
            "order": 1684389892527,
            "ago": "22 days ago"
          },
          "ago": "22 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 15000,
            "btc": 0.00015,
            "usd": 3.966934741056
          },
          "offers": {
            "count": 1,
            "list": [
              {
                "cid": "QmQnQbU8qpBNbF3iwkx45kLkvnYKNbfFw9xPWBo2GL6bLM",
                "taker": "16vR1f6DTwfc1GswgQBGvUyBcGXHtYnMwV"
              }
            ],
            "taker": {
              "address": "16vR1f6DTwfc1GswgQBGvUyBcGXHtYnMwV",
              "location": "1a3f1a09160441770b79d18b9eff58898292b37413cf37e3ebb680020367a6a0:0"
            }
          },
          "buy": false,
          "sell": true
        },
        {
          "ts": 1683817190600,
          "type": "sell",
          "location": "dfecda620af25cb4fe795e44426b1620c6479ed6d11a2fb3aaf139b9442fb6e6:2",
          "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
          "cardinals": 3000000,
          "orderbooks": [
            "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
          ],
          "meta": {
            "name": "Jus Bitchin #2",
            "description": "Number #2 of Jus Bitchin Set - #1 of only 10 copies",
            "collection": "bitchin"
          },
          "signature": "H4QUdlgwySQxWp1kNCdCUbdsehBGXe6/wE32wwq4evbOMZnFcfQ/ERjRZWx2PgV1E5Wxts1QXGogQofv6uhw9eY=",
          "cid": "QmY1epJg3K2HHpN1Qqd2f4CM96bq2wELeuhXimev69FvZ6",
          "time": {
            "block": 1683817863000,
            "order": 1683817190600,
            "ago": "a month ago"
          },
          "ago": "a month ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "price": {
            "sat": 3000000,
            "btc": 0.03,
            "usd": 793.3869482112
          },
          "offers": {
            "count": 3,
            "list": [
              {
                "cid": "QmSBFcAH4VXyz6TjvELMdSTpCvyQ6QpidEwUB7X7K7TyTA",
                "taker": "16vR1f6DTwfc1GswgQBGvUyBcGXHtYnMwV"
              },
              {
                "cid": "QmNY2VmVNxga2bpsRcHb4g9Vf2FPkJP7MSoXMyHpctFCK6",
                "taker": "16ZT1Ei29X8QubTMfrE4Lu38uiH9PaJkXx"
              },
              {
                "cid": "QmRAmSSW5iGX5MYGEzMHFT9ey9CAWYDQZ3qiFT9121wLti",
                "taker": "16ZT1Ei29X8QubTMfrE4Lu38uiH9PaJkXx"
              }
            ],
            "taker": {
              "address": "16ZT1Ei29X8QubTMfrE4Lu38uiH9PaJkXx",
              "location": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f:0"
            }
          },
          "buy": false,
          "sell": true
        }
      ],
      "offers": [
        {
          "ts": 1684404565396,
          "origin": "QmcUEirL8hDzwcWaDhvjoNEqdDowZcXLDBkTkHt3CCPPw4",
          "taker": "16vR1f6DTwfc1GswgQBGvUyBcGXHtYnMwV",
          "offer": "70736274ff0100a002000000023780d3a9f364e303d2c4f5f52ca36eb41dae17bc8d48f2ead3f6c064821ae8a60000000000fffffffffeeb1be95fa75b6eef58bd062834534add337f2990b2a5e56a6a492612f6137f0000000000ffffffff02529d3400000000001976a91440f2b7f203d4876078d0e0bd44d70ed7d8d2857c88ac973a0000000000001976a914bd3cc35fce23bc6eafcb2fb1da0b1c922b47fece88ac00000000000100fd60070200000000010198cd02481b56ff658dc3e850d0584169096df5b4f041fbdf80729c6dac6a17770000000000fdffffff0222020000000000001976a914bd3cc35fce23bc6eafcb2fb1da0b1c922b47fece88acb60c00000000000016001405b8bea140fa95583ac77d5874975b47830778ed0340bd6a873242c5c63225cf75a0e73bd93c19a02298f1aa4bda7163eac08d00b13e89e1083c92b3b216467d29aaa91ab78b89d986b186f7e6251c3e181f58f4dfd0fd830620117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423eac06632d592d8801750063036f7264010109696d6167652f706e67004d080289504e470d0a1a0a0000000d49484452000000140000001408060000008d891d0d000000017352474200aece1ce9000000206348524d00007a26000080840000fa00000080e8000075300000ea6000003a98000017709cba513c00000084655849664d4d002a000000080005011200030000000100010000011a0005000000010000004a011b0005000000010000005201280003000000010002000087690004000000010000005a00000000000000140000000100000014000000010003a00100030000000100010000a00200040000000100000014a003000400000001000000140000000084f06ccf00000009704859730000031300000313013d6683c70000015969545874584d4c3a636f6d2e61646f62652e786d7000000000003c783a786d706d65746120786d6c6e733a783d2261646f62653a6e733a6d6574612f2220783a786d70746b3d22584d5020436f726520362e302e30223e0a2020203c7264663a52444620786d6c6e733a7264663d22687474703a2f2f7777772e77332e6f72672f313939392f30322f32322d7264662d73796e7461782d6e7323223e0a2020202020203c7264663a4465736372697074696f6e207264663a61626f75743d22220a202020202020202020202020786d6c6e733a746966663d22687474703a2f2f6e732e61646f62652e636f6d2f746966662f312e302f223e0a2020202020202020203c74694d080266663a4f7269656e746174696f6e3e313c2f746966663a4f7269656e746174696f6e3e0a2020202020203c2f7264663a4465736372697074696f6e3e0a2020203c2f7264663a5244463e0a3c2f783a786d706d6574613e0a195ee107000003bf494441543811a5944d6c1b4514c77ffb617bed7c38ae13278a8a9d34c48daaa60d341512a5a5282120716b0e90407d4020c40d29420ae1085229202e9cda720084140105b542ad38b4872281f8905a2a5048036de2384dec38969bd8f1d7dabbccaee3b4518984d4b79ad99d3733fffdbf79ff3792cfe733d9c6ac09493459f4a6788c8df136cb6db7bcdda4214bd4cb0a8d022c27196862a11f45f4d62fb637f5bfa62cb0bad5120b6a0eea3cb49b6e16e50a28aba845075ec945453205f4fde0f7019a02cc9bab30bf7b07af18610eadfb7078dc68659df968864fdae2248c1c4a491c815e1484b7826e09d9344d34d5c97c7e95de1d61c2759d7c75b09393dd1a1fa6f338063b39120b92ba1da73e99c0743841ecb9d7a4bb4931511507c97492633dbd74baf770de7f9391179fa7b79026b39ec4adbbb9f5cf65667cc35cbc7e0de5fbef28055a412f6d626e32942585929e21d8b18ff0cefda49c06cfed0d33f4cde3042e1da1adf56f421722f497de41afacb062b6b02260dc6e0f8661e5bf6a36a015aad3eb6575b540f88561629161e67abdace5f6f26656e77c32c69fa357f8569ae6ed4d0802734b2c644a44c23ef6ecea60313a8ba66922f26ae876c8b22c932d1a3cdcaa103a745c9c8b815c9767fd5a0a3395e3f0e8011e712578a8fe2ce77e5ae3bdec08b367dee787cb9778e97884502844369bb599ca16b2dfefa7984df3c6f8093e9a788d8b0b37988a17907e5964ee7017cb834374f73d4a476090834fbd4ee5c25582ededec17bec9c949a2d1282d2d2d364b3b648ba165aad389afbe01b5c94bf9400f6ba23606ea7d3425d25cf97a8af91b651a1443c8bb9191d167686a6bc6a95695276dc8c71ed5e237ca650c874aff5f2966677f24b9dbc9d4c75f909d8af30765228b653a9aa719e86fa6abbb0b972aa197ef26c422b599e5eac0a06028fcecda49e8b15e945090e5a79f4093d3f4b3cce7b2c997bf97f11a1aefce696474194594e5bd6603d6e83a85041ca53c5cff945ff785b81579999b03a3fc36dd00853e5e0d3cc90753bbe8bb7a163e3b29f427e1725b556e154cb562ec90755db79db1d8022ba924274e9fc1373084e9a9237fa788d621f3acde82cf23e33a7694b6db47e14e9c6c3c4654ecb1ac54aa8adb968d6998045a03cccccc303e3eced8d818c5421e492840b212269a21a424ae074cc14431253c427ba74e9f62e2ad097a7a7a585a5a12cbc445572bbd4aa542636323f17882b2b808feaf058341d2e9346a2ddb35400bc0cab6c3e1c0e3f1d8dff6a96c9c8d5d075635549dc8c29fcbe528168b36b31a81234d8635c783beb7c8e641c1acfdff0255f46bcf302051ab0000000049454e44ae4260826821c0117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423e00000000000100e10200000001d6bc782cc9003ba21f7ebd89d2d0b6fb15ff6c68981e2c6814f75b27b18976b7000000006a47304402207914a6fa31dc24f354e288f466a920d1f072e658de615f9f7552abf2b5537e15022015e7959c61eedc794937c3c2d988927caa11edb9613b9ee744645d6848b01ead0121036a361155efe57c6290537963df55a5ff93825586d517a7e0d67476df8c91432bfdffffff02e0673500000000001976a91440f2b7f203d4876078d0e0bd44d70ed7d8d2857c88ac235a0700000000001976a914cc7473359480049811be000fee8e45c3a4f7921a88ac0000000001076b483045022100deca427fe9918134b460e34b5580019b9c86b26865f596ae754f93066da922820220618514663d22be71895ba36b3a76a8683b3f86a9eb0ec9b3d7fc2dfc5e109a13012102162449b5156ef58f0eb886b36b8db219fc884873eab8f4cca6ae4d7365444659000000",
          "offer_format": "psbt",
          "cid": "QmQnQbU8qpBNbF3iwkx45kLkvnYKNbfFw9xPWBo2GL6bLM",
          "time": {
            "block": 1684405253000,
            "offer": 1684404565396,
            "ago": "22 days ago"
          },
          "ago": "22 days ago",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 37401.000000000466,
            "btc": 0.00037401000000000464,
            "usd": 9.891155083349153
          },
          "order": {
            "ts": 1684389892527,
            "type": "sell",
            "location": "a6e81a8264c0f6d3eaf2488dbc17ae1db46ea32cf5f5c4d203e364f3a9d38037:0",
            "maker": "1JFbWA2xSATef44rJuaJ3EKLXfXnZNWPTp",
            "cardinals": 15000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "GM! "
            },
            "signature": "70736274ff01007e02000000013780d3a9f364e303d2c4f5f52ca36eb41dae17bc8d48f2ead3f6c064821ae8a60000000000ffffffff010000000000000000426a406463363338393136366439653132626464646565643762303131306537373230333365336564343463343466383861653534613763623465383433326538373900000000000100fd60070200000000010198cd02481b56ff658dc3e850d0584169096df5b4f041fbdf80729c6dac6a17770000000000fdffffff0222020000000000001976a914bd3cc35fce23bc6eafcb2fb1da0b1c922b47fece88acb60c00000000000016001405b8bea140fa95583ac77d5874975b47830778ed0340bd6a873242c5c63225cf75a0e73bd93c19a02298f1aa4bda7163eac08d00b13e89e1083c92b3b216467d29aaa91ab78b89d986b186f7e6251c3e181f58f4dfd0fd830620117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423eac06632d592d8801750063036f7264010109696d6167652f706e67004d080289504e470d0a1a0a0000000d49484452000000140000001408060000008d891d0d000000017352474200aece1ce9000000206348524d00007a26000080840000fa00000080e8000075300000ea6000003a98000017709cba513c00000084655849664d4d002a000000080005011200030000000100010000011a0005000000010000004a011b0005000000010000005201280003000000010002000087690004000000010000005a00000000000000140000000100000014000000010003a00100030000000100010000a00200040000000100000014a003000400000001000000140000000084f06ccf00000009704859730000031300000313013d6683c70000015969545874584d4c3a636f6d2e61646f62652e786d7000000000003c783a786d706d65746120786d6c6e733a783d2261646f62653a6e733a6d6574612f2220783a786d70746b3d22584d5020436f726520362e302e30223e0a2020203c7264663a52444620786d6c6e733a7264663d22687474703a2f2f7777772e77332e6f72672f313939392f30322f32322d7264662d73796e7461782d6e7323223e0a2020202020203c7264663a4465736372697074696f6e207264663a61626f75743d22220a202020202020202020202020786d6c6e733a746966663d22687474703a2f2f6e732e61646f62652e636f6d2f746966662f312e302f223e0a2020202020202020203c74694d080266663a4f7269656e746174696f6e3e313c2f746966663a4f7269656e746174696f6e3e0a2020202020203c2f7264663a4465736372697074696f6e3e0a2020203c2f7264663a5244463e0a3c2f783a786d706d6574613e0a195ee107000003bf494441543811a5944d6c1b4514c77ffb617bed7c38ae13278a8a9d34c48daaa60d341512a5a5282120716b0e90407d4020c40d29420ae1085229202e9cda720084140105b542ad38b4872281f8905a2a5048036de2384dec38969bd8f1d7dabbccaee3b4518984d4b79ad99d3733fffdbf79ff3792cfe733d9c6ac09493459f4a6788c8df136cb6db7bcdda4214bd4cb0a8d022c27196862a11f45f4d62fb637f5bfa62cb0bad5120b6a0eea3cb49b6e16e50a28aba845075ec945453205f4fde0f7019a02cc9bab30bf7b07af18610eadfb7078dc68659df968864fdae2248c1c4a491c815e1484b7826e09d9344d34d5c97c7e95de1d61c2759d7c75b09393dd1a1fa6f338063b39120b92ba1da73e99c0743841ecb9d7a4bb4931511507c97492633dbd74baf770de7f9391179fa7b79026b39ec4adbbb9f5cf65667cc35cbc7e0de5fbef28055a412f6d626e32942585929e21d8b18ff0cefda49c06cfed0d33f4cde3042e1da1adf56f421722f497de41afacb062b6b02260dc6e0f8661e5bf6a36a015aad3eb6575b540f88561629161e67abdace5f6f26656e77c32c69fa357f8569ae6ed4d0802734b2c644a44c23ef6ecea60313a8ba66922f26ae876c8b22c932d1a3cdcaa103a745c9c8b815c9767fd5a0a3395e3f0e8011e712578a8fe2ce77e5ae3bdec08b367dee787cb9778e97884502844369bb599ca16b2dfefa7984df3c6f8093e9a788d8b0b37988a17907e5964ee7017cb834374f73d4a476090834fbd4ee5c25582ededec17bec9c949a2d1282d2d2d364b3b648ba165aad389afbe01b5c94bf9400f6ba23606ea7d3425d25cf97a8af91b651a1443c8bb9191d167686a6bc6a95695276dc8c71ed5e237ca650c874aff5f2966677f24b9dbc9d4c75f909d8af30765228b653a9aa719e86fa6abbb0b972aa197ef26c422b599e5eac0a06028fcecda49e8b15e945090e5a79f4093d3f4b3cce7b2c997bf97f11a1aefce696474194594e5bd6603d6e83a85041ca53c5cff945ff785b81579999b03a3fc36dd00853e5e0d3cc90753bbe8bb7a163e3b29f427e1725b556e154cb562ec90755db79db1d8022ba924274e9fc1373084e9a9237fa788d621f3acde82cf23e33a7694b6db47e14e9c6c3c4654ecb1ac54aa8adb968d6998045a03cccccc303e3eced8d818c5421e492840b212269a21a424ae074cc14431253c427ba74e9f62e2ad097a7a7a585a5a12cbc445572bbd4aa542636323f17882b2b808feaf058341d2e9346a2ddb35400bc0cab6c3e1c0e3f1d8dff6a96c9c8d5d075635549dc8c29fcbe528168b36b31a81234d8635c783beb7c8e641c1acfdff0255f46bcf302051ab0000000049454e44ae4260826821c0117f692257b2331233b5705ce9c682be8719ff1b2b64cbca290bd6faeb54423e0000000001076a47304402205af382b733ef79bc6b78e9e510f100bff22d936c88d3f0e38233b58ff1eedc0302204f89368fc139dae69510d3e46568cb9a14cd152297443fa9e01ccdd7050d3739012102a84c6144798b3ee3d6de19013082576017390446f774a14271c2fb7c42daff4b0000",
            "signature_format": "psbt",
            "cid": "QmcUEirL8hDzwcWaDhvjoNEqdDowZcXLDBkTkHt3CCPPw4",
            "price": {
              "sat": 15000,
              "btc": 0.00015,
              "usd": 3.966934741056
            }
          },
          "proof": "1a3f1a09160441770b79d18b9eff58898292b37413cf37e3ebb680020367a6a0"
        },
        {
          "ts": 1684303912011,
          "origin": "QmY1epJg3K2HHpN1Qqd2f4CM96bq2wELeuhXimev69FvZ6",
          "taker": "16ZT1Ei29X8QubTMfrE4Lu38uiH9PaJkXx",
          "offer": "70736274ff0100a002000000029446387423f6a5262194f711ea2f881c4f33be246a63ecc1db8488e4afed29bd0100000000ffffffffe6b62f44b939f1aab32f1ad1d69e47c620166b42445e79feb45cf20a62daecdf0200000000ffffffff02609a1e00000000001976a9143cfba594fb49ce4f0a0622da5ab5ba360f6270f188acc0c62d00000000001976a9148745b27b692d2422edffa3c9b43cf3c77a42739788ac00000000000100e102000000015d864de9938024249258a677376e6acfeda1fb224c9338eb98bfaf1441fdd6e0000000006a47304402201d389165cf2a74939ee86b4555bad3209c3f3a40e7f4ae58ec7134ba9f06574002203837acdbc1f30aa7a9e7b5137234d7de691f65aafe09b41661641cd2269f6a6b0121026725310ca28d890ce52953a9147d3ab29390a64f75cef173f9aaa6e85deea3c5fdffffff0200314c00000000001976a9142f4a7c83e0b3a81d9a37b236fb33ddf152458fd388ac404b4c00000000001976a9143cfba594fb49ce4f0a0622da5ab5ba360f6270f188ac0000000001076b483045022100afbf8bc79237246fc2b7d32ad4c9f37d606e141e2767aa53aec80dd38a2eb9bf022039ef6be83e3346df2e0cd963ab9fa0e18fd2fa7864c3ed42d3e513c072b956d3012102acb973d4b028d83aa7427e2e30a4a4a89c9dfaf7e88f4c0c0372f26e3a5629ad000100fd250102000000012b7c03d1b801b3e81f343a9397a1da3dab8a7f612e2eafc5c3b8d128b82e4232010000006a47304402206ea6887ef17d01621b36b61a9eabed461f740532b5be324f6116a5d9bb66ee890220524a99f48a0f111d755e03e7cf604cabc2fe1f89c66c7f2d0551c3f063a517dc012103cf3f37962cdacd405ce7138804436642cd2595c79fc66cf8bf16a978a8a6ffabfdffffff041c250000000000001976a914c829ad22002740f2ccced33d3a4e92f929f820db88ac58260000000000001976a914dd8dda7f80e96ce8880b267e285a5794afd47e3988ac10270000000000001976a9148745b27b692d2422edffa3c9b43cf3c77a42739788ac33ccf100000000001976a91443b4f2bb4c3187354c230ea87e79a3a571f6e2aa88ac0b0b0c00000000",
          "offer_format": "psbt",
          "cid": "QmNY2VmVNxga2bpsRcHb4g9Vf2FPkJP7MSoXMyHpctFCK6",
          "time": {
            "block": null,
            "offer": 1684303912011,
            "ago": "Invalid date"
          },
          "ago": "Invalid date",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 4400,
            "btc": 0.000044,
            "usd": 1.16363419070976
          },
          "order": {
            "ts": 1683817190600,
            "type": "sell",
            "location": "dfecda620af25cb4fe795e44426b1620c6479ed6d11a2fb3aaf139b9442fb6e6:2",
            "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
            "cardinals": 3000000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "Jus Bitchin #2",
              "description": "Number #2 of Jus Bitchin Set - #1 of only 10 copies",
              "collection": "bitchin"
            },
            "signature": "H4QUdlgwySQxWp1kNCdCUbdsehBGXe6/wE32wwq4evbOMZnFcfQ/ERjRZWx2PgV1E5Wxts1QXGogQofv6uhw9eY=",
            "cid": "QmY1epJg3K2HHpN1Qqd2f4CM96bq2wELeuhXimev69FvZ6",
            "price": {
              "sat": 3000000,
              "btc": 0.03,
              "usd": 793.3869482112
            }
          },
          "proof": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f"
        },
        {
          "ts": 1684304637039,
          "origin": "QmY1epJg3K2HHpN1Qqd2f4CM96bq2wELeuhXimev69FvZ6",
          "taker": "16ZT1Ei29X8QubTMfrE4Lu38uiH9PaJkXx",
          "offer": "70736274ff0100a00200000002e6b62f44b939f1aab32f1ad1d69e47c620166b42445e79feb45cf20a62daecdf0200000000ffffffff9446387423f6a5262194f711ea2f881c4f33be246a63ecc1db8488e4afed29bd0100000000ffffffff02609a1e00000000001976a9143cfba594fb49ce4f0a0622da5ab5ba360f6270f188acc0c62d00000000001976a9148745b27b692d2422edffa3c9b43cf3c77a42739788ac00000000000100fd250102000000012b7c03d1b801b3e81f343a9397a1da3dab8a7f612e2eafc5c3b8d128b82e4232010000006a47304402206ea6887ef17d01621b36b61a9eabed461f740532b5be324f6116a5d9bb66ee890220524a99f48a0f111d755e03e7cf604cabc2fe1f89c66c7f2d0551c3f063a517dc012103cf3f37962cdacd405ce7138804436642cd2595c79fc66cf8bf16a978a8a6ffabfdffffff041c250000000000001976a914c829ad22002740f2ccced33d3a4e92f929f820db88ac58260000000000001976a914dd8dda7f80e96ce8880b267e285a5794afd47e3988ac10270000000000001976a9148745b27b692d2422edffa3c9b43cf3c77a42739788ac33ccf100000000001976a91443b4f2bb4c3187354c230ea87e79a3a571f6e2aa88ac0b0b0c00000100e102000000015d864de9938024249258a677376e6acfeda1fb224c9338eb98bfaf1441fdd6e0000000006a47304402201d389165cf2a74939ee86b4555bad3209c3f3a40e7f4ae58ec7134ba9f06574002203837acdbc1f30aa7a9e7b5137234d7de691f65aafe09b41661641cd2269f6a6b0121026725310ca28d890ce52953a9147d3ab29390a64f75cef173f9aaa6e85deea3c5fdffffff0200314c00000000001976a9142f4a7c83e0b3a81d9a37b236fb33ddf152458fd388ac404b4c00000000001976a9143cfba594fb49ce4f0a0622da5ab5ba360f6270f188ac0000000001076b483045022100a0a7e02b6181d50df08ac1d58fc97382c9b8a3e518e8cb26d40f1ed16c77838e02207a8668838b8c45e52941cfa074f74d630029ffcfb2d1243ae29ee8abc82c1dd3012102acb973d4b028d83aa7427e2e30a4a4a89c9dfaf7e88f4c0c0372f26e3a5629ad000000",
          "offer_format": "psbt",
          "cid": "QmRAmSSW5iGX5MYGEzMHFT9ey9CAWYDQZ3qiFT9121wLti",
          "time": {
            "block": null,
            "offer": 1684304637039,
            "ago": "Invalid date"
          },
          "ago": "Invalid date",
          "value": {
            "sat": 600,
            "btc": 0.000006,
            "usd": 0.15867738964224
          },
          "fee": {
            "sat": 4400,
            "btc": 0.000044,
            "usd": 1.16363419070976
          },
          "order": {
            "ts": 1683817190600,
            "type": "sell",
            "location": "dfecda620af25cb4fe795e44426b1620c6479ed6d11a2fb3aaf139b9442fb6e6:2",
            "maker": "1DLFiYWAugJZqBwB8HrMVWPNEmgkUGegT5",
            "cardinals": 3000000,
            "orderbooks": [
              "1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7"
            ],
            "meta": {
              "name": "Jus Bitchin #2",
              "description": "Number #2 of Jus Bitchin Set - #1 of only 10 copies",
              "collection": "bitchin"
            },
            "signature": "H4QUdlgwySQxWp1kNCdCUbdsehBGXe6/wE32wwq4evbOMZnFcfQ/ERjRZWx2PgV1E5Wxts1QXGogQofv6uhw9eY=",
            "cid": "QmY1epJg3K2HHpN1Qqd2f4CM96bq2wELeuhXimev69FvZ6",
            "price": {
              "sat": 3000000,
              "btc": 0.03,
              "usd": 793.3869482112
            }
          },
          "proof": "9d001a9f98c1a86f921f3e2d2eda89e50209300218991595145ab4cbf2d0f48f"
        }
      ]
    }
  }
}
```

More detailed documentation regarding the Ordit API is available on [GitHub](https://github.com/sadoprotocol/utxo-api/blob/2a06b053759d9666c471d92708c35ab152180cf0/docs/README.md).

For more documentation regarding the SADO protocol, please visit [sado.space](https://sado.space).
