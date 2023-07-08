(function(exports){

// DEPENDENICES
    
// ECC: https://github.com/sadoprotocol/ordit.io/blob/master/js/ecc.js
// BIP32: https://github.com/sadoprotocol/ordit.io/blob/master/js/bip32.js
// BIP39: https://github.com/sadoprotocol/ordit.io/blob/master/js/bip39.js
// BUFFER: https://github.com/sadoprotocol/ordit.io/blob/master/js/buffer.js
// BITCOINJS: https://github.com/sadoprotocol/ordit.io/blob/master/js/bitcoin-tap.js

bitcointp.initEccLib(ecc); // bitcoinjs dependency requires ecc
var bip32ecc = bip32.BIP32Factory(ecc); // bip32 dependency requires ecc

exports.sdk = 
{
    config:
    {
        version: '0.0.0.11',
        apis:
        {
            mainnet:
            {
                batter: 'https://mainnet.ordit.io/',
                dns: 'https://dns.google/resolve',
                orderbook: '1H4vvBnr62YWQmvNSt8Z4pDw3Vcv1n5xz7',
                formats:
                [
                    {
                        type: 'p2pkh',
                        name: 'legacy',
                        reg: /^[1][a-km-zA-HJ-NP-Z1-9]{25,34}$/
                    },
                    {
                        type: 'p2sh',
                        name: 'segwit',
                        reg: /^[3][a-km-zA-HJ-NP-Z1-9]{25,34}$/
                    },
                    {
                        type: 'p2wpkh',
                        name: 'bech32',
                        reg: /^(bc1[qp])[a-zA-HJ-NP-Z0-9]{14,74}$/
                    },
                    {
                        type: 'p2tr',
                        name: 'taproot',
                        reg: /^(bc1p)[a-zA-HJ-NP-Z0-9]{14,74}$/
                    }
                ],
                ipfs: 'http://ipfs-gateway.ordit.io/'
            },
            regtest:
            {
                batter: 'https://regtest.ordit.io/',
                dns: 'https://dns.google/resolve',
                orderbook: 'bcrt1q2ys7qws8g072dqe3psp92pqz93ac6wmztexkh5',
                formats:
                [
                    {
                        type: 'p2pkh',
                        name: 'legacy',
                        reg: /^[mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/
                    },
                    {
                        type: 'p2sh',
                        name: 'segwit',
                        reg: /^[2][a-km-zA-HJ-NP-Z1-9]{25,34}$/
                    },
                    {
                        type: 'p2wpkh',
                        name: 'bech32',
                        reg: /^(tb1[qp]|bcrt1[qp])[a-zA-HJ-NP-Z0-9]{14,74}$/
                    },
                    {
                        type: 'p2tr',
                        name: 'taproot',
                        reg: /^(tb1p|bcrt1p)[a-zA-HJ-NP-Z0-9]{14,74}$/
                    }
                ],
                ipfs: 'http://ipfs-gateway.ordit.io/'
            },
            testnet:
            {
                batter: 'https://testnet.ordit.io/',
                dns: 'https://dns.google/resolve',
                orderbook: 'tb1qfnw26753j7kqu3q099sd48htvtk5wm4e0enmru',
                formats:
                [
                    {
                        type: 'p2pkh',
                        name: 'legacy',
                        reg: /^[mn][a-km-zA-HJ-NP-Z1-9]{25,34}$/
                    },
                    {
                        type: 'p2sh',
                        name: 'segwit',
                        reg: /^[2][a-km-zA-HJ-NP-Z1-9]{25,34}$/
                    },
                    {
                        type: 'p2wpkh',
                        name: 'bech32',
                        reg: /^(tb1[qp]|bcrt1[qp])[a-zA-HJ-NP-Z0-9]{14,74}$/
                    },
                    {
                        type: 'p2tr',
                        name: 'taproot',
                        reg: /^(tb1p|bcrt1p)[a-zA-HJ-NP-Z0-9]{14,74}$/
                    }
                ],
                ipfs: 'http://ipfs-gateway.ordit.io/'
            }
        }
    },
    collections:
    {
        publish: function(params = {}, callback = false)
        {
            // Generate OIP data array ...?
            
            var options = 
            {
                seed: false,
                
                title: false,
                description: false,
                slug: false,
                url: false,
                destination: false,
                
                publishers: false, // a required array of addresses
                inscriptions: false, // a required array of inscription objects
                
                postage: 10000, // can optional be changed
                creator: false, // an optional name for creator
                email: false, // an optional email address for creator
                media_content: 'OIP-2', // optionally updated for collection cover
                media_type: 'text/plain;charset=utf-8', // optionally updated for collection cover
                
                network: 'testnet'
            };
            var results = 
            {
                success: false,
                message: 'Invalid inputs for collections.prepare',
                data: false
            };
            Object.assign(options, params);
            if
            (
                options.seed
                && options.media_type && options.media_content && options.destination
                && typeof options.publishers == 'object' && options.publishers.length > 0
                && typeof options.inscriptions == 'object' && options.inscriptions.length > 0
                &&
                (
                    options.network == 'mainnet'
                    || options.network == 'testnet'
                    || options.network == 'regtest'
                )
                && typeof callback == 'function'
            )
            {
                // Validate inscriptions ...
                var valid_inscriptions = [];
                for(ins = 0; ins < options.inscriptions.length; ins++)
                {
                    if
                    (
                        typeof options.inscriptions[ins].iid != 'undefined'
                        && typeof options.inscriptions[ins].lim != 'undefined'
                    )
                    {
                        var valid_inscription = {
                            iid: options.inscriptions[ins].iid,
                            lim: options.inscriptions[ins].lim
                        }
                        if(typeof options.inscriptions[ins].sri != 'undefined')
                        {
                            valid_inscription.sri = options.inscriptions[ins].sri;
                        }
                        valid_inscriptions.push(valid_inscription);
                    }
                }

                if(valid_inscriptions.length == options.inscriptions.length)
                {
                    ordit.sdk.wallet.get({
                        seed: options.seed,
                        network: options.network,
                        format: 'p2pkh'
                    },  function(w)
                    {
                        if(w.success)
                        {
                            var creator = 
                            {
                                address: w.data.addresses[0].address // legacy address from seed ?
                            }

                            if(options.creator)
                            {
                                creator.name = options.creator;
                            }
                            if(options.email)
                            {
                                creator.email = options.email;
                            }

                            // Need to get address belonging to input (seed) ?

                            var data = 
                            {
                                p: "vord", // protocol
                                v: 1, // version
                                ty: 'col',
                                title: options.title,
                                desc: options.description,
                                url: options.url,
                                slug: options.slug,
                                creator: creator,
                                pub1: options.publishers,
                                insc: valid_inscriptions
                            };

                            ordit.sdk.inscription.address({
                                seed: options.seed,
                                media_content: options.media_content,
                                media_type: options.media_type,
                                network: options.network,
                                meta: data
                            },  function(commit)
                            {
                                if(commit.success)
                                {
                                    commit.data.meta = data;

                                    ordit.sdk.inscription.psbt({
                                        seed: options.seed,
                                        media_content: options.media_content,
                                        media_type: options.media_type,
                                        destination: options.destination,
                                        change_address: commit.data.address,
                                        fees: commit.data.fees,
                                        network: options.network,
                                        meta: commit.data.meta
                                    },  function(reveal)
                                    {
                                        if(reveal.success)
                                        {
                                            var tweaked = false;
                                            ordit.sdk.psbt.sign({
                                                seed: options.seed, 
                                                hex: reveal.data.hex,
                                                network: options.network,
                                                tweaked: tweaked
                                            }, 
                                            function(signed)
                                            {
                                                if(signed.success)
                                                {
                                                    ordit.sdk.txid.get({
                                                        hex: signed.data.hex,
                                                        network: options.network
                                                    }, 
                                                    function(relayed)
                                                    {
                                                        if(relayed.success)
                                                        {
                                                            results.success = true;
                                                            results.message = 'TXID attached to data';
                                                            results.data = 
                                                            {
                                                                txid: relayed.data.txid
                                                            };
                                                            callback(results);
                                                        }
                                                        else
                                                        {
                                                            results.message = 'Unable to relay commit';
                                                            callback(results);
                                                        }
                                                    });
                                                }
                                                else
                                                {
                                                    results.message = 'Unable to sign commit';
                                                    callback(results);
                                                }
                                            });
                                        }
                                        else
                                        {
                                            var sats = (commit.data.fees + options.postage);
                                            var btc = parseFloat(sats / (10 ** 8));
                                            results.message = reveal.message;
                                            results.data = {
                                                sats: sats,
                                                btc: btc,
                                                address: commit.data.address
                                            };
                                            callback(results);
                                        }
                                    });
                                }
                                else
                                {
                                    results.message = commit.message;
                                    callback(results);
                                }
                            });
                        }
                        else
                        {
                            results.message = w.message;
                            callback(results);
                        }
                    });
                }
                else
                {
                    if(valid_inscriptions.length == options.inscriptions.length)
                    {
                        results.message = 'Invalid creators address and key combo';
                    }
                    else
                    {
                        results.message = 'Invalid inscription object array';
                    }
                    callback(results);
                }
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        },
        mint: function(params = {}, callback = false)
        {   
            var options = 
            {
                seed: false, // todo - add support for other input types
                destination: false, // location of collection inscription
                collection: false, // location of collection inscription
                inscription: false, // inscription ID as defined by collection
                nonce: 0, // auto incrementing integer of sequence from limit
                publisher: 0, // integer index from pub array
                postage: 10000, // integer index from pub array
                media_type: false,
                media_content: false,
                network: 'testnet'
            };
            var results = 
            {
                success: false,
                message: 'Invalid inputs for collections.mint',
                data: false
            };
            Object.assign(options, params);
            if
            (
                options.seed && options.inscription && options.destination
                && options.collection && options.collection.indexOf(':') > 0
                &&
                (
                    options.network == 'mainnet'
                    || options.network == 'testnet'
                    || options.network == 'regtest'
                )
            )
            {
                // Get / validate collection ?
                
                var location = options.collection.split(':');
                var txid = location[0];
                var vout = location[1];
                
                ordit.sdk.api({
                    uri: 'utxo/transaction',
                    data: { 
                        txid: txid,
                        options:
                        {
                            txhex: true,
                            notsafetospend: false,
                            allowedrarity: ['common']
                        }
                    },
                    network: options.network
                }, function(transaction)
                {
                    if(transaction.success)
                    {
                        var tx = transaction.rdata;
                        var meta = false;
                        
                        try
                        {
                            var m = transaction.rdata.vout[vout].inscriptions[0].meta;

                            // TODO - more validation where possible ?
                            
                            var valid_inscription = false;
                            for(i = 0; i < m.insc.length; i++)
                            {
                                if
                                (
                                    m.insc[i].iid == options.inscription
                                    && typeof m.pub1[parseInt(options.publisher)] != 'undefined'
                                    && parseInt(options.nonce) < parseInt(m.insc[i].lim)
                                )
                                {
                                    valid_inscription = true;
                                }
                            }

                            if(valid_inscription)
                            {   
                                meta = 
                                {
                                    p: "vord",
                                    v: 1,
                                    ty: "insc",
                                    col: options.collection,
                                    iid: options.inscription,
                                    pub1: m.pub1[options.publisher],
                                    nonce: options.nonce
                                }
                            }
                        }
                        catch(e){}
                        
                        if(typeof meta == 'object')
                        {
                            // now need to add "sig" to meta ...
                            ordit.sdk.message.sign({
                                seed: options.seed, 
                                message: options.collection + ' ' + options.inscription + ' ' + options.nonce,
                                network: options.network
                            }, async function(sigs)
                            {
                                if(sigs.success)
                                {
                                    meta.sig = sigs.data.hex;
                            
                                    // Generate new inscription address / deposit modal flow 
                                    // like collections.publish ...
                                    
                                    ordit.sdk.inscription.address({
                                        seed: options.seed,
                                        media_content: options.media_content,
                                        media_type: options.media_type,
                                        network: options.network,
                                        meta: meta
                                    },  function(commit)
                                    {
                                        if(commit.success)
                                        {
                                            commit.data.meta = meta;

                                            ordit.sdk.inscription.psbt({
                                                seed: options.seed,
                                                media_content: options.media_content,
                                                media_type: options.media_type,
                                                destination: options.destination,
                                                change_address: commit.data.address,
                                                fees: commit.data.fees,
                                                network: options.network,
                                                meta: commit.data.meta
                                            },  function(reveal)
                                            {
                                                if(reveal.success)
                                                {
                                                    var tweaked = false;
                                                    ordit.sdk.psbt.sign({
                                                        seed: options.seed, 
                                                        hex: reveal.data.hex,
                                                        network: options.network,
                                                        tweaked: tweaked
                                                    }, 
                                                    function(signed)
                                                    {
                                                        if(signed.success)
                                                        {
                                                            ordit.sdk.txid.get({
                                                                hex: signed.data.hex,
                                                                network: options.network
                                                            }, 
                                                            function(relayed)
                                                            {
                                                                if(relayed.success)
                                                                {
                                                                    results.success = true;
                                                                    results.message = 'TXID attached to data';
                                                                    results.data = 
                                                                    {   
                                                                        txid: relayed.data.txid
                                                                    };
                                                                    callback(results);
                                                                }
                                                                else
                                                                {
                                                                    results.message = 'Unable to relay commit';
                                                                    callback(results);
                                                                }
                                                            });
                                                        }
                                                        else
                                                        {
                                                            results.message = 'Unable to sign commit';
                                                            callback(results);
                                                        }
                                                    });
                                                }
                                                else
                                                {
                                                    var sats = (commit.data.fees + options.postage);
                                                    var btc = parseFloat(sats / (10 ** 8));
                                                    results.message = reveal.message;
                                                    results.data = {
                                                        sats: sats,
                                                        btc: btc,
                                                        address: commit.data.address
                                                    };
                                                    callback(results);
                                                }
                                            });
                                        }
                                        else
                                        {
                                            results.message = commit.message;
                                            callback(results);
                                        }
                                    });
                                }
                                else
                                {
                                    results.message = sigs.message;
                                    callback(results);
                                }
                            });
                        }
                        else
                        {
                            results.message = 'Invalid OIP2 Meta';
                            callback(results);
                        }
                    }
                    else
                    {
                        results.message = transaction.message;
                        callback(results);
                    }
                });
            }
            else if(typeof callback == 'function')
            {
                callback(results);
            }
        }
    },
    get: function(request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof ordit.sdk[request].get == 'function')
            {
                ordit.sdk[request].get(params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid get request');
            }
        });
    },
    sign: function(request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof ordit.sdk[request].sign == 'function')
            {
                ordit.sdk[request].sign(params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid sign request');
            }
        });
    },
    inscribe: function(request = false, params = {})
    {
        return new Promise((resolve, reject) => 
        {
            if(typeof ordit.sdk.inscription[request] == 'function')
            {
                ordit.sdk.inscription[request](params, function(res)
                {
                    if(res.success)
                    {
                        resolve(res.data);
                    }
                    else
                    {
                        reject(res.message);
                    }
                });
            }
            else
            {
                reject('Invalid sign request');
            }
        });
    },
    api: function(params = {}, callback = false)
    {
        var options = 
        {
            uri: false,
            data: false,
            network: 'testnet'
        };
        Object.assign(options, params);
        if(options.uri && options.data && options.network && typeof callback == 'function')
        {   
            try
            {
                var uri = ordit.sdk.config.apis[options.network].batter + options.uri;
                fetch
                (
                    uri, 
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(options.data)
                    }
                )
                .then(response => response.json())
                .then(response => callback(response))
                .catch(response => callback(false))
            }
            catch(err)
            {
                callback(false, err);
            }
        }
    },
    dnkeys: function(host = false, callback = false)
    {
        if(host && callback && typeof callback == 'function')
        {
            var url = ordit.sdk.config.apis['testnet'].dns + '?name=' + host + '&type=TXT';
            jQuery.ajax({
                url: url,
                dataType: 'json',
                async: true,
                success: function(data)
                {
                    var results = false;
                    if(data && typeof data.Answer == 'object' && data.Answer.length > 0)
                    {
                        results = {};
                        var res = [];
                        var dnk_count = 0;
                        jQuery.each(data.Answer, function(d)
                        {
                            if(data.Answer[d].data.indexOf('dnkey-') > -1)
                            {
                                var dn = data.Answer[d].data.split('dnkey-');
                                var dx = dn[1].split('=');
                                var v = dx[1];
                                if(dx.length > 2)
                                {
                                    for(dx2 = 2; dx2 < dx.length; dx2++)
                                    {
                                        if(
                                            dx[dx2] == ''
                                            || dx[dx2].indexOf('....') > -1
                                        ){
                                            v = v + '=';
                                            if(dx[dx2].indexOf('....') > -1)
                                            {
                                                v = v + dx[dx2];
                                            }
                                        }
                                        else
                                        {
                                            v = v + dx[dx2];
                                        }
                                    }
                                }

                                results[dx[0]] = v;

                                res.push({k: dx[0], v: dx[1]});
                                dnk_count++;

                                if(dnk_count == data.Answer.length)
                                {
                                    results.dnkeys = res;
                                    callback(results);
                                }
                            }
                            else
                            {
                                dnk_count++;

                                if(dnk_count == data.Answer.length)
                                {
                                    results.dnkeys = res;
                                    callback(results);
                                }
                            }
                        });
                    }
                }
            });
        }
    },
    network: function(network)
    {
        var chain = false;
        var net_word = network;
        if(network == 'mainnet')
        {
            net_word = 'bitcoin';
        }
        try
        {
            chain = bitcointp.networks[net_word];
        }
        catch(e){}
        return chain;
    },
    keys:
    {
        get: function(params = {}, callback = false)
        {
            var options = 
            {
                seed: false,
                bip39: false,
                path: false,
                format: 'all',
                network: 'testnet'
            };
            Object.assign(options, params);
            if((options.seed || options.bip39) && options.network && options.format && typeof callback == 'function')
            {
                var results =
                {
                    success: false,
                    message: 'Invalid network for getting keys',
                    data: false
                };
                var net_obj = ordit.sdk.network(options.network);
                
                if(net_obj)
                {
                    var s = false;
                    var seeds = false;
                    var msg = false;

                    async function get_seed()
                    {
                        if(options.bip39)
                        {
                            try
                            {
                                msg = 'Invalid 24 BIP39 words';
                                s = await bip39.mnemonicToEntropy(options.bip39);
                                seeds = s.toString('hex');
                            }
                            catch(e){}
                        }
                        else
                        {
                            try
                            {
                                var b = bitcointp.crypto.sha256(Buffer.from(options.seed), 'utf8').toString('hex');
                                var m = bip39.entropyToMnemonic(Buffer.from(b, 'hex'), bip39.wordlists.english);
                                s = await bip39.mnemonicToEntropy(m);
                                seeds = s.toString('hex');
                            }
                            catch(e){}
                        }

                        if(seeds)
                        {
                            var root = bip32ecc.fromSeed
                            (
                                Buffer.from(seeds, 'hex'),
                                net_obj
                            );
                                
                            var words = root;
                            var parent = root;

                            if(options.seed)
                            {
                                words = bip39.entropyToMnemonic(Buffer.from(seeds, 'hex'), bip39.wordlists.english);
                            }

                            if(typeof options.path == 'object' && options.path.length > 0)
                            {
                                for(p = 0; p < options.path.length; p++)
                                {
                                    parent = parent.derive(parseInt(options.path[p]));
                                }
                            }
                            var keys = 
                            {
                                pub: Buffer.from(parent.publicKey).toString('hex'),
                                hd: parent.neutered().toBase58()
                            }
                            
                            try
                            {
                                keys.xkey = parent.publicKey.slice(1, 33);
                            }
                            catch(e){}

                            if(options.seed)
                            {
                                keys.bip39 = words;
                            }
                            results.success = true;
                            results.message = 'Keys attached to data';
                            results.data = keys;
                            callback(results);
                        }
                        else
                        {
                            results.message = 'Unable to construct seed';
                            if(msg)
                            {
                                results.message+= ': ' + msg;
                            }
                            callback(results);
                        }
                    };
                    get_seed();
                }
                else
                {
                    callback(results);
                }
            }
        }
    },
    addresses:
    {
        format: function(address = false, network = false)
        {
            var format = 'unknown';
            if(address && network)
            {
                var formats = false;
                try
                {
                    formats = ordit.sdk.config.apis[network].formats;
                }
                catch(e){}
                if(typeof formats == 'object' && formats.length > 0)
                {
                    for(f = 0; f < formats.length; f++)
                    {
                        if(formats[f].reg.test(address))
                        {
                            format = formats[f].name;
                        }
                    }
                }
            }
            return format;
        },
        get: function(params = {}, callback = false)
        {
            var options = 
            {
                key: false,
                seed: false,
                bip39: false,
                path: false,
                network: 'testnet',
                format: 'all'
            };
            Object.assign(options, params);
            if((options.seed || options.key || options.bip39) && options.network && options.format && typeof callback == 'function')
            {
                var results =
                {
                    success: false,
                    message: 'Invalid network for getting address',
                    data: false
                };
                var net_obj = ordit.sdk.network(options.network);
                
                if(net_obj)
                {
                    var getAddresses = function(key)
                    {
                        var addresses = [];
                        var chain_code = new Buffer(32);
                        chain_code.fill(1);
                        
                        var childNodeXOnlyPubkey = false;

                        try
                        {
                            
                            var keys = bip32ecc.fromPublicKey
                            (
                                Buffer.from(key, 'hex'),
                                chain_code,
                                net_obj
                            );
                            childNodeXOnlyPubkey = keys.publicKey.slice(1, 33);
                            
                        }
                        catch(e)
                        {
                            childNodeXOnlyPubkey = Buffer.from(key, 'hex');
                        }
                        
                        var error = false;
                        
                        if(keys && options.format == 'all' || options.format == 'p2pkh')
                        {
                            try
                            {
                                var p2pkh = bitcointp.payments.p2pkh({ pubkey: keys.publicKey, network: net_obj });
                                addresses.push({
                                    address: p2pkh.address,
                                    format: 'legacy',
                                    pub: keys.publicKey.toString('hex')
                                });
                            }
                            catch(e){ error = e }
                        }
                        if(keys && options.format == 'all' || options.format == 'p2sh')
                        {
                            try
                            {
                                var p2sh = bitcointp.payments.p2sh({
                                    redeem: bitcointp.payments.p2wpkh({ pubkey: keys.publicKey, network: net_obj }),
                                    network: net_obj
                                });
                                addresses.push({
                                    address: p2sh.address,
                                    format: 'segwit',
                                    pub: keys.publicKey.toString('hex')
                                });
                            }
                            catch(e){ error = e }
                        }
                        if(keys && options.format == 'all' || options.format == 'p2wpkh')
                        {
                            try
                            {
                                var p2wpkh = bitcointp.payments.p2wpkh({ pubkey: keys.publicKey, network: net_obj });
                                addresses.push({
                                    address: p2wpkh.address,
                                    format: 'bech32',
                                    pub: keys.publicKey.toString('hex')
                                });
                            }
                            catch(e){ error = e }
                        }
                        if(childNodeXOnlyPubkey && options.format == 'all' || options.format == 'p2tr')
                        {
                            try
                            {
                                var p2tr = bitcointp.payments.p2tr({
                                    internalPubkey: childNodeXOnlyPubkey,
                                    network: net_obj
                                });
                                addresses.push({
                                    address: p2tr.address,
                                    xkey: childNodeXOnlyPubkey.toString('hex'),
                                    format: 'taproot',
                                    pub: keys.publicKey.toString('hex')
                                });
                            }
                            catch(e){ error = e }
                        }
                        if(addresses.length > 0)
                        {
                            results.success = true;
                            results.message = 'Addresses attached to data';
                            results.data = addresses;
                            callback(results);
                        }
                        else
                        {
                            results.message = 'Invalid address format';
                            if(error)
                            {
                                results.message+= ': ' + error;
                            }
                            callback(results);
                        }
                    }
                    
                    if(options.seed || options.bip39)
                    {
                        ordit.sdk.keys.get(options, function(k)
                        {
                            if(k.success)
                            {
                                getAddresses(k.data.pub);
                            }
                            else
                            {
                                results.message = k.message;
                                callback(results);
                            }
                        })
                    }
                    else
                    {
                        getAddresses(options.key);
                    }
                }
                else
                {
                    callback(results);
                }
            }
        }
    },
    wallet:
    {
        get: function(params = {}, callback = false)
        {
            var options = 
            {
                key: false,
                seed: false,
                connect: false,
                bip39: false,
                path: false,
                network: 'testnet',
                format: 'all'
            };
            Object.assign(options, params);
            if
            (
                (options.seed || options.key || options.connect || options.bip39) 
                && options.network && options.format && typeof callback == 'function'

                // be sure only one of the four inputs is used ...
                
                && ! (options.seed && options.key && options.bip39 && options.connect) 
                && ! (options.key && options.bip39 && options.connect) 
                && ! (options.seed && options.key && options.connect) 
                && ! (options.seed && options.key && options.bip39) 
                && ! (options.bip39 && options.connect) 
                && ! (options.seed && options.connect) 
                && ! (options.key && options.connect) 
                && ! (options.seed && options.bip39) 
                && ! (options.key && options.bip39) 
                && ! (options.seed && options.key) 
            )
            {
                var results =
                {
                    success: false,
                    message: 'Unable to get addresses',
                    data: false
                };
                
                var get_addresses = function(opt, keys, specified_address = false)
                {
                    if(opt.connect)
                    {
                        var wallet = 
                        {
                            counts:
                            {
                                addresses: keys.length
                            },
                            keys: keys,
                            addresses: keys
                        };
                        results.success = true;
                        results.message = 'Wallet attached to data';
                        results.data = wallet;
                        callback(results);
                    }
                    else
                    {
                        ordit.sdk.addresses.get(opt, function(a)
                        {
                            if(a.success)
                            {
                                var addresses = a.data;
                                if(specified_address)
                                {
                                    new_addresses = [];
                                    for(a = 0; a < addresses.length; a++)
                                    {
                                        if(addresses[a].address == specified_address)
                                        {
                                            new_addresses.push(addresses[a]);
                                        }
                                    }
                                    addresses = JSON.parse(JSON.stringify(new_addresses));
                                }
                                var wallet = 
                                {
                                    counts:
                                    {
                                        addresses: addresses.length
                                    },
                                    keys: keys,
                                    addresses: addresses
                                };
                                results.success = true;
                                results.message = 'Wallet attached to data';
                                results.data = wallet;
                                callback(results);
                            }
                            else
                            {
                                results.message = a.message;
                                callback(results);
                            }
                        });
                    }
                }
                if(options.seed || options.bip39)
                {
                    ordit.sdk.keys.get(options, function(k)
                    {
                        if(k.success)
                        {
                            var keys = k.data;
                            options.seed = false;
                            options.key = keys.pub;
                            get_addresses(options, [keys]);
                        }
                        else
                        {
                            results.message = k.message;
                            callback(results);
                        }
                    });
                }
                else if(options.connect)
                {
                    ordit.sdk.connect.key(options, function(k)
                    {
                        if(k.success)
                        {
                            var keys = k.data;
                            var address = false;
                            options.seed = false;
                            options.key = keys.pub;
                            if(typeof keys.address)
                            {
                                address = keys.address;
                            }
                            get_addresses(options, keys, address);
                        }
                        else
                        {
                            results.message = k.message;
                            callback(results);
                        }
                    });
                }
                else
                {
                    get_addresses(options, [{ pub: options.key}]);
                }
            }
            else if(typeof callback == 'function')
            {
                callback({
                    success: false,
                    message: 'Invalid options for wallet.get function',
                    data: false
                })
            }
        }
    },
    balance:
    {
        get: function(params = {}, callback = false)
        {
            var options = 
            {
                key: false,
                seed: false,
                connect: false,
                bip39: false,
                path: false,
                network: 'testnet',
                format: 'all'
            };
            Object.assign(options, params);
            if
            (
                (options.seed || options.key || options.connect || options.bip39) 
                && options.network && options.format && typeof callback == 'function'

                // be sure only one of the four inputs is used ...
                
                && ! (options.seed && options.key && options.bip39 && options.connect) 
                && ! (options.key && options.bip39 && options.connect) 
                && ! (options.seed && options.key && options.connect) 
                && ! (options.seed && options.key && options.bip39) 
                && ! (options.bip39 && options.connect) 
                && ! (options.seed && options.connect) 
                && ! (options.key && options.connect) 
                && ! (options.seed && options.bip39) 
                && ! (options.key && options.bip39) 
                && ! (options.seed && options.key) 
            )
            {
                var results =
                {
                    success: false,
                    message: 'Unable to get wallet',
                    data: false
                };
                ordit.sdk.wallet.get(options, function(w)
                {
                    if(w.success)
                    {
                        var ordinals = [];
                        var collections = [];
                        var inscriptions = [];
                        var spendables = [];
                        var unspendables = [];
                        var wallet = w.data;
                        if(typeof wallet.counts != 'object')
                        {
                            wallet.counts = 
                            {
                                addresses: wallet.addresses.length
                            }
                        }
                        wallet.counts.unspents = 0;
                        wallet.counts.satoshis = 0;
                        wallet.counts.cardinals = 0;
                        wallet.counts.spendables = 0;
                        wallet.counts.unspendables = 0;
                        wallet.counts.ordinals = 0;
                        wallet.counts.inscriptions = 0;
                        wallet.counts.collections = 0;
                        
                        var completed = 0;
                        
                        jQuery.each(wallet.addresses, function(i)
                        {
                            var address = wallet.addresses[i].address;
                            var wallet_unspents = 0;
                            var wallet_satoshis = 0;
                            var wallet_cardinals = 0;
                            var wallet_spendables = 0;
                            var wallet_unspendables = 0;
                            var wallet_collections = 0;

                            ordit.sdk.api({
                                uri: 'utxo/unspents',
                                data: { 
                                    address: address,
                                    options:
                                    {
                                        oips: true,
                                        txhex: true,
                                        notsafetospend: false,
                                        allowedrarity: ['common']
                                    }
                                },
                                network: options.network
                            }, function(unspent)
                            {
                                if(unspent.success)
                                {
                                    wallet.addresses[i].unspents = unspent.rdata;
                                }
                                wallet.counts.unspents+= wallet.addresses[i].unspents.length;
                                wallet_unspents+= wallet.addresses[i].unspents.length;
                                for(u = 0; u < wallet.addresses[i].unspents.length; u++)
                                {
                                    wallet.addresses[i].unspents[u].pub = wallet.addresses[i].pub;
                                    var un = wallet.addresses[i].unspents[u];
                                    wallet.counts.satoshis+= un.sats;
                                    wallet_satoshis+= un.sats;
                                    if(un.safeToSpend)
                                    {
                                        wallet.counts.cardinals+= un.sats;
                                        wallet_cardinals+= un.sats;
                                        wallet.counts.spendables++;
                                        wallet_spendables++;
                                        spendables.push(un);
                                    }
                                    else
                                    {
                                        wallet.counts.unspendables++;
                                        wallet_unspendables++;
                                        unspendables.push(un);
                                    }

                                    var ord = un.ordinals;
                                    var ins = un.inscriptions;

                                    for(od = 0; od < ord.length; od++)
                                    {
                                        ord[od].address = address;
                                        ord[od].unspent = un.txid;
                                        
                                        var safeToSpend = true;
                                        for(is1 = 0; is1 < ins.length; is1++)
                                        {
                                            if
                                            (
                                                ins[is1].sat == ord[od].number
                                                || ord[od].rarity != 'common'
                                            )
                                            {
                                                safeToSpend = false;
                                            }
                                        }
                                        ord[od].safeToSpend = safeToSpend;
                                        
                                        ordinals.push(ord[od]);
                                    }
                                    for(is = 0; is < ins.length; is++)
                                    {
                                        ins[is].fake = false;
                                        ins[is].verified = false;
                                        if
                                        (
                                            typeof ins[is].meta == 'object'
                                            && typeof ins[is].meta.p != 'undefined'
                                            && typeof ins[is].meta.ty != 'undefined'
                                            && ins[is].meta.ty == 'col'
                                            && ins[is].meta.p == 'vord'
                                        )
                                        {
                                            collections.push(ins[is]);
                                            wallet_collections++;
                                        }
                                        else if
                                        (
                                            typeof ins[is].meta == 'object'
                                            && typeof ins[is].meta.p != 'undefined'
                                            && typeof ins[is].meta.ty != 'undefined'
                                            && typeof ins[is].meta.sig != 'undefined'
                                            && ins[is].meta.ty == 'insc'
                                            && ins[is].meta.p == 'vord'
                                        )
                                        {   
                                            ordit.sdk.message.verify({
                                                address: ins[is].meta.pub1,
                                                message: ins[is].meta.col + ' ' + ins[is].meta.iid + ' ' + ins[is].meta.nonce,
                                                signature: ins[is].meta.sig,
                                                network: options.network
                                            },  function(verified)
                                            {
                                                if(verified.success)
                                                {
                                                    ins[is].verified = true;
                                                }
                                                else
                                                {
                                                    ins[is].fake = true;
                                                }
                                            })
                                        }
                                        ins[is].address = address;
                                        ins[is].unspent = un.txid;
                                        ins[is].value = parseFloat((ins[is].fee + un.sats) / (10 ** 8));
                                        
                                        ins[is].formats = 
                                        {
                                            image: false,
                                            audio: false,
                                            video: false,
                                            text: false
                                        }
                                        if(ins[is].media_type.indexOf('image') === 0)
                                        {
                                            ins[is].formats.image = true;
                                            ins[is].type = 'image';
                                        }
                                        else if(ins[is].media_type.indexOf('audio') === 0)
                                        {
                                            ins[is].formats.audio = true;
                                            ins[is].type = 'audio';
                                        }
                                        else if(ins[is].media_type.indexOf('video') === 0)
                                        {
                                            ins[is].formats.video = true;
                                            ins[is].type = 'video';
                                        }
                                        else if
                                        (
                                            ins[is].media_type.indexOf('text') === 0
                                            || ins[is].media_type.indexOf('json') > -1
                                        )
                                        {
                                            ins[is].formats.text = true;
                                            ins[is].type = 'text';
                                        }
                                        
                                        inscriptions.push(ins[is]);
                                    }
                                }
                                wallet.spendables = spendables;
                                wallet.unspendables = unspendables;
                                wallet.ordinals = ordinals;
                                wallet.inscriptions = inscriptions;
                                wallet.collections = collections;
                                
                                wallet.counts.ordinals = ordinals.length;
                                wallet.counts.inscriptions = inscriptions.length;
                                wallet.counts.collections = collections.length;

                                wallet.addresses[i].counts = 
                                {
                                    unspents: wallet_unspents,
                                    satoshis: wallet_satoshis,
                                    cardinals: wallet_cardinals,
                                    spendables: wallet_spendables,
                                    unspendables: wallet_unspendables,
                                    collections: wallet_collections
                                };

                                // ++
                                completed++;
                                if(completed == wallet.addresses.length)
                                {
                                    results.success = true;
                                    results.message = 'Wallet lookup attached to data';
                                    results.data = wallet;
                                    callback(results);
                                }
                            });
                        });
                    }
                    else
                    {
                        results.message = w.message;
                        callback(results);
                    }
                });
            }
            else if(typeof callback == 'function')
            {
                callback({
                    success: false,
                    message: 'Invalid options for balance.get function',
                    data: false
                })
            }
        }
    },
    psbt:
    {
        get: function(params = {}, callback = false)
        {
            var options = 
            {
                key: false,
                seed: false,
                bip39: false,
                connect: false,
                path: false,
                network: 'testnet',
                format: 'all',
                ins: [],
                outs: []
            };
            Object.assign(options, params);
            if
            (
                (options.seed || options.key || options.bip39 || options.connect) 
                && options.network && options.format && typeof callback == 'function'
                && typeof options.ins == 'object' && options.ins.length > 0
                && typeof options.outs == 'object' && options.outs.length > 0

                // be sure only one of the four inputs is used ...
                
                && ! (options.seed && options.key && options.bip39 && options.connect) 
                && ! (options.key && options.bip39 && options.connect) 
                && ! (options.seed && options.key && options.connect) 
                && ! (options.seed && options.key && options.bip39) 
                && ! (options.bip39 && options.connect) 
                && ! (options.seed && options.connect) 
                && ! (options.key && options.connect) 
                && ! (options.seed && options.bip39) 
                && ! (options.key && options.bip39) 
                && ! (options.seed && options.key) 
            )
            {
                var results =
                {
                    success: false,
                    message: 'Unable to construct transaction',
                    data: false
                };
                
                ordit.sdk.balance.get(options, function(w)
                {   
                    var net_obj = ordit.sdk.network(options.network);
                    
                    if(w.success && net_obj)
                    {
                        var wallet = w.data;
                        
                        var fees = 0;
                        var change = 0;
                        var dust = 600;
                        var inputs_used = 0;
                        var sats_per_byte = 10;
                        var total_cardinals_to_send = 0;
                        var total_cardinals_available = 0;
                        var unsupported_inputs = [];
                        var unspents_to_use = [];
                        var xverse_inputs = [];
                        
                        var psbt = new bitcointp.Psbt({network: net_obj});
                        
                        var send_specific_unspent = false;
                        
                        for(o = 0; o < options.outs.length; o++)
                        {
                            try
                            {
                                if
                                (
                                    typeof options.outs[o].cardinals != 'undefined'
                                    && options.outs[o].cardinals > dust
                                )
                                {
                                    total_cardinals_to_send+= parseInt(options.outs[o].cardinals);
                                    psbt.addOutput({ 
                                        address: options.outs[o].address, 
                                        value: parseInt(options.outs[o].cardinals)
                                    });
                                }
                                else if(typeof options.outs[o].location != 'undefined')
                                {
                                    fees = JSON.parse(JSON.stringify((80 + (1 * 180)) * sats_per_byte));
                                    var unspents = saline.db.wallet.addresses[0].unspents;
                                    for(u = 0; u < unspents.length; u++)
                                    {
                                        if(unspents[u].txid + ':' + unspents[u].n == options.outs[o].location)
                                        {
                                            total_cardinals_to_send+= unspents[u].sats - fees;
                                            psbt.addOutput({ 
                                                address: options.outs[o].address, 
                                                value: total_cardinals_to_send
                                            });
                                            wallet.spendables = [unspents[u]];
                                        }
                                    }
                                }
                            }
                            catch(output_error)
                            {
                                console.info('output_error', output_error);
                            }
                        }
                        
                        for(i = 0; i < options.ins.length; i++)
                        {
                            if(typeof options.ins[i].address != 'undefined')
                            {
                                for(ws = 0; ws < wallet.spendables.length; ws++)
                                {
                                    var sats = wallet.spendables[ws].sats;
                                    var a = wallet.spendables[ws].scriptPubKey.address;
                                    
                                    fees = JSON.parse(JSON.stringify((80 + ((ws + 1) * 180)) * sats_per_byte));
                                    
                                    if
                                    (
                                        (
                                            a == options.ins[i].address
                                            || options.ins[i].address == 'any'
                                        )
                                        && total_cardinals_available <= (total_cardinals_to_send + fees)
                                    )
                                    {   
                                        
                                        var error = false;
                                        var supported = false;
                                        var spendable = wallet.spendables[ws];
                                        var t = spendable.scriptPubKey.type;
                                        
                                        if(options.ins[i].address == 'any')
                                        {
                                            options.ins[i].address = a;
                                        }
                                        
                                        if(t == 'witness_v1_taproot')
                                        {
                                            try
                                            {
                                                var childNodeXOnlyPubkey = false;
                                                
                                                try
                                                {
                                                    var chain_code = new Buffer(32);
                                                    chain_code.fill(1);
                                                    var pkey = bip32ecc.fromPublicKey(
                                                        Buffer.from(spendable.pub, 'hex'),
                                                        chain_code,
                                                        net_obj
                                                    );
                                                    childNodeXOnlyPubkey = pkey.publicKey.slice(1, 33);
                                                }
                                                catch(e)
                                                {
                                                    childNodeXOnlyPubkey = Buffer.from(spendable.pub, 'hex');
                                                }
                                                
                                                var p2tr = bitcointp.payments.p2tr({
                                                    internalPubkey: childNodeXOnlyPubkey,
                                                    network: net_obj
                                                });
                                                psbt.addInput({
                                                    hash: spendable.txid,
                                                    index: parseInt(spendable.n),
                                                    tapInternalKey: childNodeXOnlyPubkey,
                                                    witnessUtxo:
                                                    {
                                                        script: p2tr.output, 
                                                        value: parseInt(spendable.sats)
                                                    }
                                                }); 
                                                supported = true;
                                            }
                                            catch(e){ error = e }
                                        }
                                        else if(t == 'witness_v0_keyhash')
                                        {
                                            try
                                            {
                                                var p = bitcointp.payments.p2wpkh({ 
                                                    pubkey: Buffer.from(spendable.pub, 'hex'), 
                                                    network: net_obj 
                                                });
                                                psbt.addInput({
                                                    hash: spendable.txid,
                                                    index: parseInt(spendable.n),
                                                    witnessUtxo:
                                                    {
                                                        script: p.output, 
                                                        value: parseInt(spendable.sats)
                                                    }
                                                }); 
                                                supported = true;
                                            }
                                            catch(e){ error = e }
                                        }
                                        else if(t == 'scripthash')
                                        {
                                            try
                                            {
                                                var p2sh = bitcointp.payments.p2sh({
                                                  redeem: bitcointp.payments.p2wpkh({ 
                                                      pubkey: Buffer.from(spendable.pub, 'hex'),
                                                      network: net_obj 
                                                  }),
                                                  network: net_obj
                                                });
                                                psbt.addInput({
                                                    hash: spendable.txid,
                                                    index: parseInt(spendable.n),
                                                    redeemScript: p2sh.redeem.output,
                                                    witnessUtxo:
                                                    {
                                                        script: p2sh.output, 
                                                        value: parseInt(spendable.sats)
                                                    }
                                                }); 
                                                supported = true;
                                            }
                                            catch(e){ error = e }
                                        }
                                        else if(t == 'pubkeyhash')
                                        {
                                            try
                                            {
                                                psbt.addInput({
                                                    hash: spendable.txid,
                                                    index: parseInt(spendable.n),
                                                    nonWitnessUtxo: Buffer.from(spendable.txhex, 'hex')
                                                });
                                                supported = true;
                                            }
                                            catch(e){ error = e }
                                        }
                                        else
                                        {
                                            error = 'Unsupported input type';
                                        }
                                        if(supported)
                                        {
                                            unspents_to_use.push(wallet.spendables[ws]);
                                            total_cardinals_available+= sats;
                                            xverse_inputs.push({
                                                address: a,
                                                signingIndexes: [inputs_used]
                                            });
                                            inputs_used++;
                                        }
                                        else
                                        {
                                            wallet.spendables[ws].error = error;
                                            unsupported_inputs.push(wallet.spendables[ws]);
                                        }
                                    }
                                }
                            }
                        }
                        
                        change = total_cardinals_available - (total_cardinals_to_send + fees);
                        
                        if(unsupported_inputs.length > 0)
                        {
                            console.info('unsupported_inputs', unsupported_inputs);
                        }
                        
                        if
                        (
                            unspents_to_use.length > 0 
                            && change >= 0
                        )
                        {
                            if(change >= dust)
                            {
                                psbt.addOutput({ 
                                    address: options.ins[0].address, 
                                    value: change
                                });
                            }
                            var psbt_hex = psbt.toHex();
                            var psbt_base64 = psbt.toBase64();
                            
                            results.success = true;
                            results.message = 'Unsigned PSBT formats attached to data';
                            results.data = 
                            {
                                hex: psbt_hex,
                                base64: psbt_base64
                            };
                            
                            if(options.connect == 'xverse')
                            {
                                results.data.inputs = xverse_inputs;
                            }
                            
                            callback(results);
                        }
                        else
                        {
                            results.message = 'Not enough input value to cover outputs and fees. Total cardinals available: ' + total_cardinals_available + '. Cardinals to send: ' + total_cardinals_to_send + '. Estimated fees: ' + fees + '.';
                            callback(results);
                        }
                    }
                    else
                    {
                        results.message = w.message;
                        callback(results);
                    }
                });
            }
            else if(typeof callback == 'function')
            {
                callback({
                    success: false,
                    message: 'Invalid options for tx.get function',
                    data: false
                })
            }
        },
        sign: function(params = {}, callback = false)
        {
            var options = 
            {
                seed: false,
                bip39: false,
                connect: false,
                path: false,
                hex: false,
                base64: false,
                network: 'testnet'
            };
            Object.assign(options, params);
            if
            (
                (options.hex || options.base64) 
                && (options.seed || options.bip39 || options.connect) 
                && options.network && typeof callback == 'function'
                && ! (options.hex && options.base64)
                
                // be sure only one of the three inputs is used ...
                
                && ! (options.seed && options.bip39 && options.connect) 
                && ! (options.bip39 && options.connect) 
                && ! (options.seed && options.connect) 
                && ! (options.seed && options.bip39) 
            )
            {
                var results =
                {
                    success: false,
                    message: 'Unable to reconstruct PSBT',
                    data: false
                };
                var error = false;
                var psbt = false;
                
                var net_obj = ordit.sdk.network(options.network);
                
                if(options.hex && net_obj)
                {
                    try
                    {
                        psbt = bitcointp.Psbt.fromHex(options.hex, { network: net_obj});
                    }
                    catch(err){ error = err }
                }
                else
                {
                    if(!psbt && net_obj)
                    {
                        try
                        {
                            psbt = bitcointp.Psbt.fromBase64(options.base64, { network: net_obj});
                        }
                        catch(err){ error = err }
                    }
                }
                if(psbt)
                {
                    if(options.seed || options.bip39)
                    {
                        var net_obj = ordit.sdk.network(options.network);
                        
                        // TODO - re-construct private keys and sign ???
                        
                        async function get_keys()
                        {
                            if(options.bip39)
                            {

                                s = await bip39.mnemonicToEntropy(options.bip39);
                                seeds = s.toString('hex');
                            }
                            else
                            {
                                try
                                {
                                    var b = bitcointp.crypto.sha256(Buffer.from(options.seed), 'utf8').toString('hex');
                                    var m = bip39.entropyToMnemonic(Buffer.from(b, 'hex'), bip39.wordlists.english);
                                    s = await bip39.mnemonicToEntropy(m);
                                    seeds = s.toString('hex');
                                }
                                catch(e){}
                            }

                            var root = bip32ecc.fromSeed
                            (
                                Buffer.from(seeds, 'hex'),
                                net_obj
                            );

                            var parent = root;

                            if(typeof options.path == 'object' && options.path.length > 0)
                            {
                                for(p = 0; p < options.path.length; p++)
                                {
                                    parent = parent.derive(parseInt(options.path[p]));
                                }
                            }
                            var keys = 
                            {
                                pub: Buffer.from(parent.publicKey).toString('hex'),
                                priv: Buffer.from(parent.privateKey).toString('hex'),
                                wif: parent.toWIF(),
                                parent: parent
                            }
                            
                            return keys;
                        }
                        get_keys().then(async (full_keys) =>
                        {   
                            if
                            (
                                typeof psbt == 'object' 
                                && typeof psbt.inputCount != 'undefined'
                                && psbt.inputCount > 0
                            )
                            {
                                var error = false;
                                
                                var xkey = full_keys.parent.publicKey.slice(1, 33);
                                
                                var tweaked_key = full_keys.parent.tweak(
                                    bitcointp.crypto.taggedHash(
                                        "TapTweak", 
                                        xkey
                                    )
                                );
                                
                                for(i = 0; i < psbt.inputCount; i++)
                                {
                                    if(typeof options.tweaked != 'undefined' && options.tweaked === true)
                                    {
                                        try
                                        {
                                            psbt.signInput(i, tweaked_key);
                                        }
                                        catch(e){ error = e }
                                    }
                                    else
                                    {
                                        try
                                        {
                                            psbt.signInput(i, full_keys.parent);
                                        }
                                        catch(e){ error = e }
                                    }
                                }
                                
                                
                                if(error)
                                {
                                    results.message = 'Error signing: ' + error;
                                    callback(results);
                                }
                                else
                                {
                                    var psbt_hex = psbt.toHex();
                                    var psbt_base64 = psbt.toBase64();

                                    if
                                    (
                                        (options.hex && options.hex != psbt_hex)
                                        ||
                                        (options.base64 && options.base64 != psbt_base64)
                                    ){
                                        results.success = true;
                                        results.message = 'Signed PSBT attached to data';
                                        var hex = false;
                                        var psbt_data = false;
                                        try
                                        {
                                            psbt.finalizeAllInputs();
                                            hex = psbt.extractTransaction().toHex();
                                            results.message = 'Finalized raw TX hex attached to data';
                                        }
                                        catch(e)
                                        {
                                            console.info('sign.e', e);
                                            psbt_data = 
                                            {
                                                hex: psbt_hex,
                                                base64: psbt_base64
                                            };
                                        }
                                        var signed_response = 
                                        {
                                            hex: hex,
                                            psbt: psbt_data
                                        };
                                        results.data = signed_response;
                                        callback(results);
                                    }
                                    else
                                    {
                                        results.message = 'Signed PSBT same as input PSBT';
                                        callback(results);
                                    }
                                }
                            }
                            else
                            {
                                results.message = 'Unable to count inputs';
                                callback(results);
                            }
                        });
                    }
                    else if(options.connect)
                    {
                        options.psbt = psbt;
                        ordit.sdk.connect.sign(options, function(s)
                        {
                            callback(s);
                        });
                    }
                }
                else
                {
                    if(error)
                    {
                        results.message+= ': ' + error;
                    }
                    callback(results);
                }
            }
            else if(typeof callback == 'function')
            {
                callback({
                    success: false,
                    message: 'Invalid options for signature.get function',
                    data: false
                })
            }
        }
    },
    txid:
    {
        get: function(params = {}, callback = false)
        {
            var options = 
            {
                hex: false,
                network: 'testnet'
            };
            Object.assign(options, params);
            if(options.hex && options.network && typeof callback == 'function')
            {
                var results =
                {
                    success: false,
                    message: 'Unable to relay transaction',
                    data: false
                };
                ordit.sdk.api({
                    uri: 'utxo/relay',
                    data: { hex: options.hex },
                    network: options.network
                }, function(response)
                {
                    if
                    (
                        typeof response == 'object' 
                        && typeof response.success != 'undefined' 
                        && response.success === true 
                        && typeof response.rdata != 'undefined' 
                        && response.rdata
                    )
                    {
                        var txid = response.rdata;
                        results.success = true;
                        results.message = 'Transaction ID attached to data';
                        results.data = 
                        {
                            txid: txid
                        };
                    }
                    else
                    {
                        if(response.message)
                        {
                            results.message+= ': ' + response.message;
                        }
                    }
                    callback(results);
                });
            }
            else if(typeof callback == 'function')
            {
                callback({
                    success: false,
                    message: 'Invalid options for txid.get function',
                    data: false
                })
            }
        }
    },
    message:
    {
        sign: function(params = {}, callback = false)
        {
            var options = 
            {
                seed: false,
                bip39: false,
                connect: false,
                path: false,
                message: false,
                format: 'core',
                network: 'testnet'
            };
            Object.assign(options, params);
            if
            (
                (options.seed || options.bip39 || options.connect) 
                && options.network && options.message && options.format
                && typeof callback == 'function'
                &&
                (
                    options.format == 'core'
                )

                // be sure only one of the three inputs is used ...
                
                && ! (options.seed && options.bip39 && options.connect) 
                && ! (options.bip39 && options.connect) 
                && ! (options.seed && options.connect) 
                && ! (options.seed && options.bip39) 
            )
            {   
                var results = 
                {
                    data: false,
                    success: false,
                    message: 'Invalid options for signature'
                };
                
                if(options.seed || options.bip39)
                {
                    var net_obj = ordit.sdk.network(options.network);
                
                    async function get_keys()
                    {
                        if(options.bip39)
                        {

                            s = await bip39.mnemonicToEntropy(options.bip39);
                            seeds = s.toString('hex');
                        }
                        else
                        {
                            try
                            {
                                var b = bitcointp.crypto.sha256(Buffer.from(options.seed), 'utf8').toString('hex');
                                var m = bip39.entropyToMnemonic(Buffer.from(b, 'hex'), bip39.wordlists.english);
                                s = await bip39.mnemonicToEntropy(m);
                                seeds = s.toString('hex');
                            }
                            catch(e){}
                        }

                        var root = bip32ecc.fromSeed
                        (
                            Buffer.from(seeds, 'hex'),
                            net_obj
                        );

                        var parent = root;

                        if(typeof options.path == 'object' && options.path.length > 0)
                        {
                            for(p = 0; p < options.path.length; p++)
                            {
                                parent = parent.derive(parseInt(options.path[p]));
                            }
                        }
                        var keys = 
                        {
                            pub: Buffer.from(parent.publicKey).toString('hex'),
                            priv: Buffer.from(parent.privateKey).toString('hex'),
                            wif: parent.toWIF(),
                            parent: parent
                        }

                        return keys;
                    }
                    get_keys().then(async (full_keys) =>
                    {   
                        var error = false;
                        var signature = false;
                        var signing_address = false;
                        
                        try
                        {
                            var chain_id = options.network;
                            if(options.network == 'mainnet') chain_id = 'bitcoin';
                            else chain_id = 'bitcointestnet';
                            var blockchain = bitcoin.networks[chain_id];
                            var message_key = bitcoin.ECKey.fromWIF(full_keys.wif);
                            signing_address = message_key.pub.getAddress(blockchain);
                            signature = bitcoin.Message.sign(
                                message_key, 
                                options.message, 
                                blockchain
                            );
                        }
                        catch(e){ error = e }
                        
                        if(signature)
                        {
                            results.success = true;
                            results.message = 'Signature attached to data';
                            results.data = 
                            {
                                hex: signature.toString('hex'),
                                base64: signature.toString('base64'),
                                address: signing_address.toString('hex')
                            }
                            callback(results);
                        }
                        else
                        {
                            results.message = 'Unable to sign message:<hr><code>' + error + '</code>';
                            callback(results);
                        }
                    });
                }
                else
                {
                    ordit.sdk.connect.message(options, function(s)
                    {
                        if(s.success)
                        {
                            var signatures = s.data;
                            results.success = true;
                            results.message = 'Signatures attached to data';
                            results.data = signatures;
                        }
                        else
                        {
                            results.message = s.message;
                        }
                        callback(results);
                    });
                }
            }
        },
        verify: function(params = {}, callback = false)
        {
            var options = 
            {
                address: false,
                message: false,
                signature: false,
                network: 'testnet'
            };
            Object.assign(options, params);
            if
            (
                options.address && options.message && options.signature && options.network
                && typeof callback == 'function'
            )
            {
                var results = 
                {
                    success: false,
                    data: false,
                    message: 'Unable to verify message'
                }
                var error = false;
                var verified = false;
                try
                {
                    var chain_id = options.network;
                    if(options.network == 'mainnet') chain_id = 'bitcoin';
                    else chain_id = 'bitcointestnet';
                    var blockchain = bitcoin.networks[chain_id];
                    verified = bitcoin.Message.verify(
                        options.address,
                        options.signature, 
                        options.message, 
                        blockchain
                    );
                }
                catch(e){ error = e }
                
                if(!verified)
                {
                    try
                    {
                        var chain_id = options.network;
                        if(options.network == 'mainnet') chain_id = 'bitcoin';
                        else chain_id = 'bitcointestnet';
                        var blockchain = bitcoin.networks[chain_id];

                        verified = bitcoin.Message.verify(
                            options.address,
                            Buffer.from(options.signature, 'hex').toString('base64'),
                            options.message,
                            blockchain
                        );
                        if(verified)
                        {
                            error = false;
                        }
                    }
                    catch(e){ }
                }
                
                if(error)
                {
                    results.message = error.message;
                }
                else
                {
                    results.success = true;
                    results.message = 'Verification attached to data';
                    results.data =
                    {
                        verified: verified
                    }
                }
                callback(results);
            }
            else if(typeof callbaclk == 'function')
            {
                callback({
                    data: false,
                    success: false,
                    message: 'Invalid options for message veriofy'
                })
            }
        }
    },
    connect:
    {
        supported: function(wallet = false, network = false)
        {
            var supported = false;
            if
            (
                (
                    (
                        wallet == 'unisat'
                        || wallet == 'xverse'
                    )
                    && 
                    (
                        network == 'mainnet'
                        || network == 'testnet'
                    )
                )
                || wallet == 'metamask'
            )
            {
                supported = true;
            }
            return supported;
        },
        key: function(params = {}, callback = false)
        {
            var options = 
            {
                connect: false,
                network: 'testnet',
                format: 'all'
            };
            Object.assign(options, params);
            if(options.connect && options.network && options.format && typeof callback == 'function')
            {
                var results =
                {
                    success: false,
                    message: 'The ' + options.connect + ' wallet cannot support get on  ' + options.network,
                    data: false
                };
                if
                (
                    ordit.sdk.connect.supported(options.connect, options.network)
                    && typeof ordit.sdk[options.connect] == 'object'
                    && typeof ordit.sdk[options.connect].key == 'function'
                )
                {
                    ordit.sdk[options.connect].key(options, function(k)
                    {
                        if(k.success)
                        {
                            callback(k);
                        }
                        else
                        {
                            results.message = k.message;
                            callback(results);
                        }
                    })
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for connect.key',
                        data: false
                    });
                }
            }
        },
        message: function(params = {}, callback = false)
        {
            var options = 
            {
                connect: false,
                message: false,
                network: 'testnet'
            };
            Object.assign(options, params);
            if
            (
                options.connect
                && options.network 
                && options.message 
                && typeof callback == 'function'
            )
            {
                var results =
                {
                    success: false,
                    message: 'The ' + options.connect + ' wallet cannot support message signing on ' + options.network,
                    data: false
                };
                if
                (
                    ordit.sdk.connect.supported(options.connect, options.network)
                    && typeof ordit.sdk[options.connect] == 'object'
                    && typeof ordit.sdk[options.connect].message == 'function'
                )
                {
                    ordit.sdk[options.connect].message(options, function(s)
                    {
                        if(s.success)
                        {
                            callback(s);
                        }
                        else
                        {
                            results.message = s.message;
                            callback(results);
                        }
                    })
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for connect.sign',
                        data: false
                    })
                }
            }
        },
        sign: function(params = {}, callback = false)
        {
            var options = 
            {
                connect: false,
                psbt: false,
                network: 'testnet'
            };
            Object.assign(options, params);
            if
            (
                options.connect
                && options.network 
                && typeof options.psbt == 'object' 
                && typeof callback == 'function'
            )
            {
                var results =
                {
                    success: false,
                    message: 'The ' + options.connect + ' wallet cannot support sign on  ' + options.network,
                    data: false
                };
                if
                (
                    ordit.sdk.connect.supported(options.connect, options.network)
                    && typeof ordit.sdk[options.connect] == 'object'
                    && typeof ordit.sdk[options.connect].sign == 'function'
                )
                {
                    ordit.sdk[options.connect].sign(options, function(s)
                    {
                        if(s.success)
                        {
                            callback(s);
                        }
                        else
                        {
                            results.message = s.message;
                            callback(results);
                        }
                    })
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for connect.sign',
                        data: false
                    })
                }
            }
        }
    },
    metamask:
    {
        key: function(params = {}, callback = false)
        {
            var options = 
            {
                path: false,
                network: 'testnet'
            };
            Object.assign(options, params);
            if(options.network && typeof callback == 'function')
            {
                var results =
                {
                    success: false,
                    message: 'Metamask not installed',
                    data: false
                };
                if(typeof window.MetaMaskSDK != 'undefined')
                {
                    var MMSDK = new MetaMaskSDK.MetaMaskSDK();
                    var ethereum = MMSDK.getProvider() // You can also access via window.ethereum
                    
                    async function get_accounts()
                    {
                        return await ethereum.request({method: 'eth_requestAccounts'});
                    }
                    get_accounts().then(async (accounts) =>
                    {
                        var address = accounts[0];
                        var msg = 'Generate Bitcoin Addresses from ' + address + '?';
                        var signature = await ethereum.request({method: 'personal_sign', params: [msg, address]});   
                        var wallet_options = 
                        {
                            seed: signature,
                            path: options.path,
                            network: options.network,
                            format: 'all'
                        };
                        ordit.sdk.wallet.get(wallet_options, function(w)
                        {
                            if(w.success)
                            {
                                results.success = true;
                                results.message = 'Key attached to data';
                                results.data = w.data.addresses;
                            }
                            else
                            {
                                results.message = w.message;
                            }
                            callback(results);
                        })
                    });
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for metamask.key',
                        data: false
                    })
                }
            }
        },
        sign: function(params = {}, callback = false)
        {
            var options = 
            {
                psbt: false
            };
            Object.assign(options, params);
            if(typeof options.psbt == 'object' && typeof callback == 'function')
            {
                var results =
                {
                    success: false,
                    message: 'Metamask not installed for signing',
                    data: false
                };
                
                if(typeof window.MetaMaskSDK != 'undefined')
                {
                    var MMSDK = new MetaMaskSDK.MetaMaskSDK();
                    var ethereum = MMSDK.getProvider() // You can also access via window.ethereum
                    
                    var net_obj = ordit.sdk.network(options.network);
                    
                    var psbt = options.psbt;
                    
                    async function get_accounts()
                    {
                        return await ethereum.request({method: 'eth_requestAccounts'});
                    }
                    get_accounts().then(async (accounts) =>
                    {
                        var address = accounts[0];
                        var msg = 'Generate Bitcoin Addresses from ' + address + '?';
                        var signature = await ethereum.request({method: 'personal_sign', params: [msg, address]}); 
                        
                        async function get_keys()
                        {
                            var s = false;
                            var seeds = false;
                            
                            try
                            {
                                var b = bitcointp.crypto.sha256(Buffer.from(signature), 'utf8').toString('hex');
                                var m = bip39.entropyToMnemonic(Buffer.from(b, 'hex'), bip39.wordlists.english);
                                s = await bip39.mnemonicToEntropy(m);
                                seeds = s.toString('hex');
                            }
                            catch(e){}

                            var root = bip32ecc.fromSeed
                            (
                                Buffer.from(seeds, 'hex'),
                                net_obj
                            );

                            var parent = root;

                            if(typeof options.path == 'object' && options.path.length > 0)
                            {
                                for(p = 0; p < options.path.length; p++)
                                {
                                    parent = parent.derive(parseInt(options.path[p]));
                                }
                            }
                            var keys = 
                            {
                                pub: Buffer.from(parent.publicKey).toString('hex'),
                                priv: Buffer.from(parent.privateKey).toString('hex'),
                                wif: parent.toWIF(),
                                parent: parent
                            }
                            
                            return keys;
                        }
                        get_keys().then(async (full_keys) =>
                        {   
                            if
                            (
                                typeof psbt == 'object' 
                                && typeof psbt.inputCount != 'undefined'
                                && psbt.inputCount > 0
                            )
                            {
                                var error = false;
                                
                                for(i = 0; i < psbt.inputCount; i++)
                                {
                                    try
                                    {
                                        psbt.signInput(i, full_keys.parent);
                                    }
                                    catch(e){ error = e }
                                }
                                
                                if(error)
                                {
                                    results.message = 'Error signing:<hr><code>' + error + '</code>';
                                    callback(results);
                                }
                                else
                                {
                                    var psbt_hex = psbt.toHex();
                                    var psbt_base64 = psbt.toBase64();

                                    if
                                    (
                                        (options.hex && options.hex != psbt_hex)
                                        ||
                                        (options.base64 && options.base64 != psbt_base64)
                                    ){
                                        results.success = true;
                                        results.message = 'Signed PSBT attached to data';
                                        var hex = false;
                                        var psbt_data = false;
                                        try
                                        {
                                            psbt.finalizeAllInputs();
                                            hex = psbt.extractTransaction().toHex();
                                            results.message = 'Finalized raw TX hex attached to data';
                                        }
                                        catch(e)
                                        {
                                            psbt_data = 
                                            {
                                                hex: psbt_hex,
                                                base64: psbt_base64
                                            };
                                        }
                                        var signed_response = 
                                        {
                                            hex: hex,
                                            psbt: psbt_data
                                        };
                                        results.data = signed_response;
                                        callback(results);
                                    }
                                    else
                                    {
                                        results.message = 'Signed PSBT same as input PSBT';
                                        callback(results);
                                    }
                                }
                            }
                            else
                            {
                                results.message = 'Unable to count inputs';
                                callback(results);
                            }
                        });
                    });
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for unisat.sign',
                        data: false
                    })
                }
            }
        },
        message: function(params = {}, callback = false)
        {
            var options = 
            {
                connect: false,
                message: false,
                network: 'testnet'
            };
            Object.assign(options, params);
            if
            (
                options.connect == 'metamask'
                && options.network 
                && options.message 
                && typeof callback == 'function'
            )
            {
                var results =
                {
                    success: false,
                    message: 'The metamask wallet cannot support message signing',
                    data: false
                };
                
                if(typeof window.MetaMaskSDK != 'undefined')
                {
                    var MMSDK = new MetaMaskSDK.MetaMaskSDK();
                    var ethereum = MMSDK.getProvider() // You can also access via window.ethereum
                    
                    async function get_accounts()
                    {
                        return await ethereum.request({method: 'eth_requestAccounts'});
                    }
                    get_accounts().then(async (accounts) =>
                    {
                        var address = accounts[0];
                        var msg = 'Generate Bitcoin Addresses from ' + address + '?';
                        var signature = await ethereum.request({method: 'personal_sign', params: [msg, address]}); 
                        
                        async function get_keys()
                        {
                            var s = false;
                            var seeds = false;
                            
                            try
                            {
                                var b = bitcointp.crypto.sha256(Buffer.from(signature), 'utf8').toString('hex');
                                var m = bip39.entropyToMnemonic(Buffer.from(b, 'hex'), bip39.wordlists.english);
                                s = await bip39.mnemonicToEntropy(m);
                                seeds = s.toString('hex');
                            }
                            catch(e){}

                            options.connect = false;
                            options.seed = seeds;
                            ordit.sdk.message.sign(options, function(signed)
                            {
                                callback(signed);
                            })
                        }
                        get_keys();
                    });
                }
                else
                {
                    results.message = 'Metamask not installed for messages';
                }
            }
            else if(typeof callback == 'function')
            {
                callback({
                    data: false,
                    success: false,
                    message: 'Invalid options for metamask.message'
                })
            }
        }
    },
    unisat:
    {
        key: function(params = {}, callback = false)
        {
            var options = 
            {
                network: false
            };
            Object.assign(options, params);
            if(options.network && typeof callback == 'function')
            {
                var results =
                {
                    success: false,
                    message: 'Unisat not installed',
                    data: false
                };
                if(typeof window.unisat != 'undefined')
                {
                    var uninet = false;
                    async function getnet() 
                    {
                        uninet = await window.unisat.getNetwork();
                        var unisatnet = 'livenet';
                        if(options.network == 'testnet')
                        {
                            unisatnet = options.network;
                        }
                        if(uninet != unisatnet)
                        {
                            await window.unisat.switchNetwork(unisatnet);
                        }
                    }
                    getnet().then(() =>
                    {            
                        var address = false;
                        var public_key = false;
                        async function connect() 
                        {
                            let accounts = await window.unisat.requestAccounts();
                            if(typeof accounts == 'object' && accounts.length > 0)
                            {
                                address = accounts[0];
                            }
                        }
                        connect().then(async () => 
                        {
                            public_key = await window.unisat.getPublicKey();
                            results.success = true;
                            results.message = 'Key attached to data';
                            results.data = 
                            [{ 
                                pub: public_key,
                                address: address,
                                format: ordit.sdk.addresses.format(address, options.network)
                            }];
                            
                            if(ordit.sdk.addresses.format(address, options.network) == 'taproot')
                            {
                                var chain_code = new Buffer(32);
                                chain_code.fill(1);

                                var childNodeXOnlyPubkey = false;

                                try
                                {

                                    var net_obj = ordit.sdk.network(options.network);
                                    var keys = bip32ecc.fromPublicKey
                                    (
                                        Buffer.from(public_key, 'hex'),
                                        chain_code,
                                        net_obj
                                    );
                                    childNodeXOnlyPubkey = keys.publicKey.slice(1, 33);

                                }
                                catch(e)
                                {
                                    childNodeXOnlyPubkey = Buffer.from(public_key, 'hex');
                                }
                                
                                if(childNodeXOnlyPubkey)
                                {
                                    results.data[0].xkey = childNodeXOnlyPubkey.toString('hex');
                                }
                            }
                            
                            callback(results);
                        });
                    });
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for unisat.key',
                        data: false
                    })
                }
            }
        },
        sign: function(params = {}, callback = false)
        {
            var options = 
            {
                psbt: false
            };
            Object.assign(options, params);
            if(typeof options.psbt == 'object' && typeof callback == 'function')
            {
                var results =
                {
                    success: false,
                    message: 'Unisat not installed for signing',
                    data: false
                };
                if(typeof window.unisat != 'undefined')
                {
                    var psbt = options.psbt;
                    var psbt_hex = psbt.toHex();
                    async function sign() 
                    {
                        return await window.unisat.signPsbt(psbt_hex);
                    }
                    sign().then(async (signed_tx) => 
                    {   
                        if(signed_tx)
                        {
                            var final_psbt = bitcointp.Psbt.fromHex(signed_tx);
                            
                            var data = 
                            {
                                hex: false,
                                psbt: false
                            }
                            var final_hex = false;
                            var msg = 'Unfinalized PSBT attached to data';
                            
                            try
                            {
                                final_hex = final_psbt.extractTransaction().toHex();
                                msg = 'Finalized raw TX hex attached to data';
                                data.hex = final_hex;
                            }
                            catch(e)
                            {
                                final_hex = signed_tx;
                                data.psbt = 
                                {
                                    hex: final_psbt.toHex(),
                                    base64: final_psbt.toBase64()
                                }
                            }

                            if(psbt_hex != final_psbt.toHex())
                            {
                                results.data = data;
                                results.message = msg;
                                results.success = true;
                                callback(results);
                            }
                            else
                            {
                                results.message = 'Signed PSBT is the same as input PSBT';
                                callback(results);
                            }
                        }
                        else
                        {
                            results.message = 'Unable to sign using unisat';
                            callback(results);
                        }
                    });
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for unisat.sign',
                        data: false
                    })
                }
            }
        },
        message: function(params = {}, callback = false)
        {
            var options = 
            {
                message: false
            };
            Object.assign(options, params);
            if(options.message && typeof callback == 'function')
            {
                var results =
                {
                    success: false,
                    message: 'Unisat not installed for message signing',
                    data: false
                };
                if(typeof window.unisat != 'undefined')
                {
                    var signed_message = false;
                    
                    async function sign() 
                    {
                        return await window.unisat.signMessage(options.message);
                    }
                    sign().then(async (signed_message) => 
                    {   
                        if(signed_message)
                        {
                            results.success = true;
                            results.message = 'Signatures attached to data';
                            results.data = 
                            {
                                base64: signed_message,
                                hex: Buffer.from(signed_message, 'base64').toString('hex'),
                                address: false
                            }
                        }
                        else
                        {
                            results.message = 'Unable to sign message via unisat';
                            callback(results);
                        }
                    });
                }
                else
                {
                    results.message = 'Unisat not installed for messages';
                    callback(results);
                }
            }
            else if(typeof callback == 'function')
            {
                callback({
                    data: false,
                    success: false,
                    message: 'Invalid options for unisat.message'
                })
            }
        }
    },
    xverse:
    {
        key: function(params = {}, callback = false)
        {
            var options = 
            {
                network: false,
                payload:
                {
                    message: 'Provide access to 2 address formats'
                }
            };
            Object.assign(options, params);
            if
            (
                options.network 
                && typeof callback == 'function'
                && typeof options.payload == 'object'
                && typeof options.payload.message != 'undefined'
            )
            {
                var results =
                {
                    success: false,
                    message: 'xVerse not installed',
                    data: false
                };
                if(typeof window.satsConnect != 'undefined')
                {
                    const xverse_options = 
                    {
                        payload: 
                        {
                            purposes: ['ordinals', 'payment'],
                            message: options.payload.message,
                            network: 
                            {
                                type: options.network.charAt(0).toUpperCase() + options.network.slice(1)
                            },
                        },
                        onFinish: (response) => 
                        {
                            var address = false;
                            var public_key = false;
                            var addresses = response;
                            if
                            (
                                typeof addresses == 'object' 
                                && typeof addresses.addresses == 'object' 
                                && addresses.addresses.length == 2
                            )
                            {
                                results.success = true;
                                results.message = 'Key attached to data';
                                results.data = [];

                                for(a = 0; a < addresses.addresses.length; a++)
                                {
                                    results.data.push({
                                        pub: addresses.addresses[a].publicKey,
                                        address: addresses.addresses[a].address,
                                        format: ordit.sdk.addresses.format
                                        (
                                            addresses.addresses[a].address, 
                                            options.network
                                        )
                                    })
                                    
                                    if(ordit.sdk.addresses.format(addresses.addresses[a].address, options.network) == 'taproot')
                                    {
                                        var chain_code = new Buffer(32);
                                        chain_code.fill(1);

                                        var childNodeXOnlyPubkey = false;

                                        try
                                        {
                                            var public_key = addresses.addresses[a].publicKey;
                                            var net_obj = ordit.sdk.network(options.network);
                                            var keys = bip32ecc.fromPublicKey
                                            (
                                                Buffer.from(public_key, 'hex'),
                                                chain_code,
                                                net_obj
                                            );
                                            childNodeXOnlyPubkey = keys.publicKey.slice(1, 33);

                                        }
                                        catch(e)
                                        {
                                            childNodeXOnlyPubkey = Buffer.from(public_key, 'hex');
                                        }

                                        if(childNodeXOnlyPubkey)
                                        {
                                            results.data[0].xkey = childNodeXOnlyPubkey.toString('hex');
                                        }
                                    }
                                }
                            }
                            else
                            {
                                results.message = 'Invalid address format';
                            }
                            callback(results);
                        },
                        onCancel: () => 
                        {
                            results.message = 'Request canceled by xVerse';
                            callback(results);
                        },
                        onError: (e) =>
                        {
                            results.message+= ': ' + e;
                            callback(results);
                        }
                    }

                    async function get() 
                    {
                        try
                        {
                            await satsConnect.getAddress(xverse_options);
                        }
                        catch(e)
                        {
                            callback(results);
                        }
                    }
                    get();
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for xverse.key',
                        data: false
                    })
                }
            }
        },
        sign: function(params = {}, callback = false)
        {
            var options = 
            {
                psbt: false,
                network: false,
                inputs: false
            };
            Object.assign(options, params);
            if
            (
                options.network 
                && typeof options.inputs == 'object' 
                && typeof options.psbt == 'object' 
                && typeof callback == 'function'
            )
            {
                var psbt = options.psbt;
                var psbt_base64 = psbt.toBase64();
                var results =
                {
                    success: false,
                    message: 'xVerse not installed for signing',
                    data: false
                };
                if(typeof window.satsConnect != 'undefined')
                {
                    const xverse_options = 
                    {
                        payload: 
                        {
                            network: 
                            {
                                type: options.network.charAt(0).toUpperCase() + options.network.slice(1)
                            },
                            message: 'Sign Ordit SDK Transaction',
                            psbtBase64: psbt_base64,
                            broadcast: false,
                            inputsToSign: options.inputs
                        },
                        onFinish: (response) => 
                        {
                            var signed_tx = response.psbtBase64;

                            if(signed_tx)
                            {
                                var final_psbt = bitcointp.Psbt.fromBase64(signed_tx);
                                
                                var data = 
                                {
                                    hex: false,
                                    psbt: false
                                }
                                var final_hex = false;
                                var msg = 'Unfinalized PSBT attached to data';

                                try
                                {
                                    final_psbt.finalizeAllInputs();
                                    final_hex = final_psbt.extractTransaction().toHex();
                                    msg = 'Finalized raw TX hex attached to data';
                                    data.hex = final_hex;
                                }
                                catch(e)
                                {
                                    final_hex = signed_tx;
                                    data.psbt = 
                                    {
                                        hex: final_psbt.toHex(),
                                        base64: final_psbt.toBase64()
                                    }
                                }

                                if(signed_tx != psbt_base64)
                                {
                                    results.data = data;
                                    results.message = msg;
                                    results.success = true;
                                    callback(results);
                                }
                                else
                                {
                                    results.message = 'Signed xVerse PSBT same as input';
                                    callback(results);
                                }
                            }
                            else
                            {
                                results.message = 'Unable to sign xVerse transaction';
                                callback(results);
                            }
                        },
                        onCancel: () => 
                        {
                            results.message = 'Signing canceled by xVerse';
                            callback(results);
                        }
                    }
                    async function sign() 
                    {
                        try
                        {
                            await satsConnect.signTransaction(xverse_options);
                        }
                        catch(e)
                        {
                            callback(results);
                        }
                    }
                    sign();
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for xverse.sign',
                        data: false
                    })
                }
            }
        },
        message: function(params = {}, callback = false)
        {
            var options = 
            {
                address: false,
                message: false,
                network: false
            };
            Object.assign(options, params);
            if
            (
                options.network && options.message && options.address
                && typeof callback == 'function'
            )
            {
                var results =
                {
                    success: false,
                    message: 'xVerse not installed for message',
                    data: false
                };
                if(typeof window.satsConnect != 'undefined')
                {
                    const xverse_options = 
                    {
                        payload: 
                        {
                            network: 
                            {
                                type: options.network.charAt(0).toUpperCase() + options.network.slice(1)
                            },
                            address: options.address,
                            message: options.message
                        },
                        onFinish: (response) => 
                        {
                            console.info('TODO,response', response);
                        },
                        onCancel: () => 
                        {
                            results.message = 'Message signing canceled by xVerse';
                            callback(results);
                        }
                    }

                    async function get() 
                    {
                        try
                        {
                            await satsConnect.signMessage(xverse_options);
                        }
                        catch(e)
                        {
                            callback(results);
                        }
                    }
                    get();
                }
                else
                {
                    callback(results);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback({
                        success: false,
                        message: 'Invalid options for xverse.message',
                        data: false
                    })
                }
            }
        }
    },
    inscription:
    {
        address: function(params = {}, callback = false)
        {
            var options = 
            {
                seed: false,
                bip39: false,
                connect: false,
                media_content: false,
                sats_per_byte: 10,
                media_type: 'text/plain;charset=utf-8',
                network: 'testnet',
                meta: false
            };
            Object.assign(options, params);
            if
            (
                options.network && options.media_type && options.media_content
                && options.sats_per_byte
                && typeof callback == 'function'
                && 
                (
                    (options.seed || options.bip39 || options.key)
                    ||
                    (
                        options.connect == 'metamask'
                        || options.connect == 'unisat'
                        || options.connect == 'xverse'
                    )
                )
                
                // be sure only one of the four inputs is used ...
                
                && ! (options.seed && options.key && options.bip39 && options.connect) 
                && ! (options.key && options.bip39 && options.connect) 
                && ! (options.seed && options.key && options.connect) 
                && ! (options.seed && options.key && options.bip39) 
                && ! (options.bip39 && options.connect) 
                && ! (options.seed && options.connect) 
                && ! (options.key && options.connect) 
                && ! (options.seed && options.bip39) 
                && ! (options.key && options.bip39) 
                && ! (options.seed && options.key)
            )
            {
                var results = 
                {
                    data: false,
                    success: false,
                    message: 'Unsupported network for inscription.address'
                };
                
                ordit.sdk.wallet.get(options, function(k)
                {
                    if(k.success)
                    {
                        var xkey = false;
                        for(ke = 0; ke < k.data.keys.length; ke++)
                        {
                            if(typeof k.data.keys[ke].xkey != 'undefined')
                            {
                                xkey = Buffer.from(k.data.keys[ke].xkey, 'hex');
                            }
                        }
                        if(!xkey)
                        {
                            for(ka = 0; ka < k.data.addresses.length; ka++)
                            {
                                if(typeof k.data.addresses[ka].xkey != 'undefined')
                                {
                                    xkey = Buffer.from(k.data.addresses[ka].xkey, 'hex');
                                }
                            }
                        }
                        if(xkey)
                        {
                            var net_obj = ordit.sdk.network(options.network);
                            if(net_obj)
                            {

                                // Generate inscription address ...

                                var error = false;
                                var address = false;

                                try
                                {
                                    options.xkey = xkey;
                                    
                                    var witness_script = ordit.sdk.inscription.witness(options);
                                    
                                    var recovery_script = ordit.sdk.inscription.witness(options, true);

                                    var script_tree = 
                                    [
                                        {
                                            output: witness_script
                                        },
                                        {
                                            output: recovery_script
                                        }
                                    ];
                                    
                                    var redeem_script = {
                                        output: witness_script,
                                        redeemVersion: 192,
                                    };
                                    
                                    var inscribe = bitcointp.payments.p2tr({
                                        internalPubkey: xkey,
                                        scriptTree: script_tree,
                                        redeem: redeem_script,
                                        network: net_obj
                                    });
                                    
                                    var fees = JSON.parse(JSON.stringify((80 + (1 * 180)) * options.sats_per_byte));
                                    var script_length = witness_script.toString('hex').length;
                                    var script_fees = (parseInt(script_length / 10) * (options.sats_per_byte)) + fees;
                                    
                                    address = {
                                        address: inscribe.address,
                                        xkey: xkey.toString('hex'),
                                        format: 'inscribe',
                                        fees: script_fees
                                    };
                                }
                                catch(e){ error = e }

                                if(error)
                                {
                                   results.message = error.message; 
                                }
                                else
                                {
                                    results.success = true;
                                    results.message = 'Inscription address attached to data';
                                    results.data = address;
                                }
                                callback(results);
                            }
                            else
                            {
                                callback(results);
                            }
                        }
                        else
                        {
                            results.message = 'No xKey provided';
                            callback(results);
                        }
                    }
                    else
                    {
                        results.message = k.message;
                        callback(results);
                    }
                })
            }
            else if(typeof callback == 'function')
            {
                callback({
                    data: false,
                    success: false,
                    message: 'Inavlid options for inscription.address'
                });
            }
        },
        psbt: function(params = {}, callback = false)
        {
            var options = 
            {
                key: false,
                seed: false,
                bip39: false,
                connect: false,
                media_content: false,
                destination: false,
                change_address: false,
                fees: 10,
                postage: 10000,
                media_type: 'text/plain;charset=utf-8',
                network: 'testnet',
                meta: false,
                recovery: false
            };
            Object.assign(options, params);
            if
            (
                options.network && options.media_type && options.media_content
                && options.destination && options.fees && options.postage
                && typeof callback == 'function'
                && 
                (
                    (options.seed || options.bip39 || options.key)
                    ||
                    (
                        options.connect == 'metamask'
                        || options.connect == 'unisat'
                        || options.connect == 'xverse'
                    )
                )
                
                // be sure only one of the three inputs is used ...
                
                && ! (options.seed && options.key && options.bip39 && options.connect) 
                && ! (options.key && options.bip39 && options.connect) 
                && ! (options.seed && options.key && options.connect) 
                && ! (options.seed && options.key && options.bip39) 
                && ! (options.bip39 && options.connect) 
                && ! (options.seed && options.connect) 
                && ! (options.key && options.connect) 
                && ! (options.seed && options.bip39) 
                && ! (options.key && options.bip39) 
                && ! (options.seed && options.key) 
            )
            {
                var results = 
                {
                    data: false,
                    success: false,
                    message: 'Unsupported network for inscription.psbt'
                };
                
                var net_obj = ordit.sdk.network(options.network);
                if(net_obj)
                {
                    var got_seed = function(options)
                    {
                        var s = false;
                        var seeds = false;
                        async function get_keys()
                        {
                            if(options.bip39)
                            {

                                s = await bip39.mnemonicToEntropy(options.bip39);
                                seeds = s.toString('hex');
                            }
                            else if(options.seed)
                            {
                                try
                                {
                                    var b = bitcointp.crypto.sha256(Buffer.from(options.seed), 'utf8').toString('hex');
                                    var m = bip39.entropyToMnemonic(Buffer.from(b, 'hex'), bip39.wordlists.english);
                                    s = await bip39.mnemonicToEntropy(m);
                                    seeds = s.toString('hex');
                                }
                                catch(e){}
                            }

                            var root = false;
                            
                            if(seeds)
                            {
                                root = bip32ecc.fromSeed
                                (
                                    Buffer.from(seeds, 'hex'),
                                    net_obj
                                );
                            }
                            
                            if(options.connect == 'unisat')
                            {
                                var chain_code = new Buffer(32);
                                chain_code.fill(1);
                                
                                // xverse pubkey ?
                                //seeds = '0207f591c4be9bfbe6a854869a088e6b763d4929559539e02cac08602d2fcdd2c3';
                                
                                root = bip32ecc.fromPublicKey
                                (
                                    Buffer.from(seeds, 'hex'),
                                    chain_code,
                                    net_obj
                                );
                            }
                            else if(options.key)
                            {
                                var chain_code = new Buffer(32);
                                chain_code.fill(1);
                                
                                // xverse pubkey ?
                                //seeds = '0207f591c4be9bfbe6a854869a088e6b763d4929559539e02cac08602d2fcdd2c3';
                                
                                root = bip32ecc.fromPublicKey
                                (
                                    Buffer.from(options.key, 'hex'),
                                    chain_code,
                                    net_obj
                                );
                            }
                            else if(typeof options.connect != 'undefined' && options.connect != 'xverse')
                            {
                                root = bip32ecc.fromSeed
                                (
                                    Buffer.from(seeds, 'hex'),
                                    net_obj
                                );
                            }

                            var parent = root;

                            if(typeof options.path == 'object' && options.path.length > 0)
                            {
                                for(p = 0; p < options.path.length; p++)
                                {
                                    parent = parent.derive(parseInt(options.path[p]));
                                }
                            }
                            
                            var childNodeXOnlyPubkey = false;

                            try
                            {
                                childNodeXOnlyPubkey = parent.publicKey.slice(1, 33);

                            }
                            catch(e)
                            {
                                if(options.connect == 'xverse')
                                {
                                    var x_key = 'e60aa5a5eeb26aef91da79c1ae20dc909cfcafb940576ef172d7ba6759c4e0fb'
                                    childNodeXOnlyPubkey = Buffer.from(x_key, 'hex');
                                }
                            }
                            
                            var keys = 
                            {
                                pub: false,
                                xkey: childNodeXOnlyPubkey,
                                parent: parent
                            }
                            
                            if(options.connect != 'xverse')
                            {
                                keys.pub = Buffer.from(parent.publicKey).toString('hex')
                            }
                            
                            if(typeof parent.privateKey == 'object')
                            {
                                keys.priv = Buffer.from(parent.privateKey).toString('hex');
                                keys.wif = parent.toWIF();
                            }
                            
                            return keys;
                        }
                        get_keys().then(async (full_keys) =>
                        {  
                            options.xkey = full_keys.xkey;
                            
                            var witness_script = ordit.sdk.inscription.witness(options);
                                    
                            var recovery_script = ordit.sdk.inscription.witness(options, true);

                            var script_tree =
                            [
                                {
                                    output: witness_script
                                },
                                {
                                    output: recovery_script
                                }
                            ];
                            
                            var script_tree2 = 
                            {
                                output: witness_script
                            };

                            var redeem_script = {
                                output: witness_script,
                                redeemVersion: 192,
                            };
                            
                            if(options.recovery)
                            {
                                redeem_script = {
                                    output: recovery_script,
                                    redeemVersion: 192,
                                };
                            }

                            var inscribe = bitcointp.payments.p2tr({
                                internalPubkey: full_keys.xkey,
                                scriptTree: script_tree,
                                redeem: redeem_script,
                                network: net_obj
                            });
                            
                            ordit.sdk.api({
                                uri: 'utxo/unspents',
                                data: { 
                                    address: inscribe.address,
                                    options:
                                    {
                                        txhex: true,
                                        notsafetospend: false,
                                        allowedrarity: ['common']
                                    }
                                },
                                network: options.network
                            }, function(unspent)
                            {
                                if(unspent.success)
                                {
                                    var unspents = unspent.rdata;
                                    var fees_for_witness_data = options.fees;
                                    var got_suitable_unspent = [];
                                    var sats_per_byte = 10;
                                    var sats_in = 0;
                                    
                                    for(u = 0; u < unspents.length; u++)
                                    {   
                                        unspents[u].sats = parseInt(unspents[u].value * (10 ** 8));
                                        if
                                        (
                                            (
                                                unspents[u].sats >= (options.postage + fees_for_witness_data)
                                                && unspents[u].safeToSpend === true
                                            )
                                            ||
                                            options.recovery
                                        )
                                        {
                                            if(options.recovery)
                                            {
                                                sats_in+= unspents[u].sats;
                                                got_suitable_unspent.push(unspents[u]);
                                            }
                                            else
                                            {
                                                sats_in = unspents[u].sats;
                                                got_suitable_unspent[0] = unspents[u];
                                            }
                                        }
                                    }
                                    
                                    if(got_suitable_unspent.length > 0)
                                    {
                                        var fees = (options.postage + fees_for_witness_data);
                                        
                                        if(options.recovery)
                                        {
                                            fees = JSON.parse(JSON.stringify((80 + (got_suitable_unspent.length * 180)) * sats_per_byte));
                                        }
                                        
                                        var change = sats_in - fees;
                                        
                                        var psbt = new bitcointp.Psbt({network: net_obj});
                                        try
                                        {
                                            jQuery.each(got_suitable_unspent, function(su)
                                            {
                                                var gsu = got_suitable_unspent[su];
                                                var witness_index = 0;
                                                if(options.recovery)
                                                {
                                                    witness_index = 1;
                                                }
                                                psbt.addInput({
                                                    hash: gsu.txid,
                                                    index: parseInt(gsu.n),
                                                    tapInternalKey: full_keys.xkey,
                                                    witnessUtxo:
                                                    {
                                                        script: inscribe.output, 
                                                        value: parseInt(gsu.sats)
                                                    },
                                                    tapLeafScript: [
                                                        {
                                                            leafVersion: redeem_script.redeemVersion,
                                                            script: redeem_script.output,
                                                            controlBlock: inscribe.witness[inscribe.witness.length - 1]
                                                        }
                                                    ]
                                                });
                                                
                                            });

                                            if(!options.recovery)
                                            {
                                                psbt.addOutput({
                                                    address: options.destination, 
                                                    value: options.postage
                                                });
                                            }

                                            if(change > 600)
                                            {
                                                var change_address = inscribe.address;
                                                if
                                                (
                                                    typeof options.change_address != 'undefined'
                                                    && options.change_address
                                                )
                                                {
                                                    change_address = options.change_address;
                                                }
                                                psbt.addOutput({
                                                    address: change_address, 
                                                    value: change
                                                });
                                            }
                                            
                                            results.success = true;
                                            results.message = 'Unsigned PSBT attached to data';
                                            results.data = 
                                            {
                                                hex: psbt.toHex(),
                                                base64: psbt.toBase64()
                                            };
                                            callback(results);
                                        }
                                        catch(e)
                                        {
                                            results.message = e.message;
                                            callback(results);
                                        }
                                    }
                                    else
                                    {
                                        results.message = 'Unable to find suitable unspent for reveal';
                                        callback(results);
                                    }
                                }
                                else
                                {
                                    results.message = unspent.message;
                                    callback(results);
                                }
                            });
                        });
                    };
                    
                    if
                    (
                        options.key
                        || options.seed 
                        || options.bip39 
                        || options.connect == 'unisat' 
                        || options.connect == 'xverse' 
                    )
                    {
                        got_seed(options);
                    }
                    else if(options.connect == 'metamask')
                    {
                        if(typeof window.MetaMaskSDK != 'undefined')
                        {
                            var MMSDK = new MetaMaskSDK.MetaMaskSDK();
                            var ethereum = MMSDK.getProvider() // You can also access via window.ethereum

                            async function get_accounts()
                            {
                                return await ethereum.request({method: 'eth_requestAccounts'});
                            }
                            get_accounts().then(async (accounts) =>
                            {
                                var address = accounts[0];
                                var msg = 'Generate Bitcoin Addresses from ' + address + '?';
                                var seed = await ethereum.request({method: 'personal_sign', params: [msg, address]}); 
                                options.seed = seed;
                                got_seed(options);
                            });
                        }
                        else
                        {
                            results.message = 'Metamask not installed';
                            callback(results);
                        }
                    }
                }
                else
                {
                    callback(results);
                }
            }
            else if(typeof callback == 'function')
            {
                callback({
                    data: false,
                    success: false,
                    message: 'Inavlid options for inscription.reveal'
                });
            }
        },
        witness: function(params = {}, recover = false)
        {
            var options = 
            {
                xkey: false,
                media_content: false,
                media_type: 'text/plain;charset=utf-8',
                meta: false
            };
            var witness = false;
            Object.assign(options, params);
            if(options.media_type && options.media_content && options.xkey)
            {
                try
                {
                    var chunk_content = function(str)
                    {
                        var strings = str.match(/.{1,520}/g);
                        return strings;
                    }
                    
                    var meta_chunks = [];
                    var chunks = chunk_content(options.media_content);
                    
                    if(typeof options.meta == 'object')
                    {
                        meta_chunks = chunk_content(JSON.stringify(options.meta));
                    }
                    
                    var op_push = function(str, t = 'utf8')
                    {
                        var buff = Buffer.from(str, t);
                        var obj = [buff];
                        var push = Buffer.concat(obj);
                        return push;
                    }
                    
                    var the_scripts = [
                        options.xkey,
                        bitcointp.opcodes.OP_CHECKSIG
                    ];
                    
                    if(!recover)
                    {
                        the_scripts.push(bitcointp.opcodes.OP_FALSE);
                        the_scripts.push(bitcointp.opcodes.OP_IF);
                        the_scripts.push(op_push('ord'));
                        the_scripts.push(1);
                        the_scripts.push(1);
                        the_scripts.push(op_push(options.media_type)); // text/plain;charset=utf-8
                        the_scripts.push(bitcointp.opcodes.OP_0);

                        for(c = 0; c < chunks.length; c++)
                        {
                            var encode_type = 'utf8';
                            if(options.media_type.indexOf('text') < 0 && options.media_type.indexOf('json') < 0)
                            {
                                encode_type = 'base64';
                            }
                            the_scripts.push(op_push(chunks[c], encode_type));
                        }

                        the_scripts.push(bitcointp.opcodes.OP_ENDIF);

                        if(typeof options.meta == 'object' && typeof meta_chunks == 'object')
                        {
                            the_scripts.push(bitcointp.opcodes.OP_FALSE);
                            the_scripts.push(bitcointp.opcodes.OP_IF);
                            the_scripts.push(op_push('ord'));
                            the_scripts.push(1);
                            the_scripts.push(1);
                            the_scripts.push(op_push('application/json;charset=utf-8'));
                            the_scripts.push(bitcointp.opcodes.OP_0);

                            for(mc = 0; mc < meta_chunks.length; mc++)
                            {
                                the_scripts.push(op_push(meta_chunks[mc]));
                            }
                            the_scripts.push(op_push(meta_chunks));

                            the_scripts.push(bitcointp.opcodes.OP_ENDIF);
                        }
                        
                    }
                    
                    witness = bitcointp.script.compile(the_scripts);
                }
                catch(e){}
            }
            return witness;
        }
    }
};

})(typeof exports === 'undefined'? this['ordit']={}: exports);