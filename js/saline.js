var bip32ecc;

if(typeof bitcointp == 'object')
{
    bitcointp.initEccLib(ecc); // bitcoinjs dependency requires ecc
    bip32ecc = bip32.BIP32Factory(ecc); // bip32 dependency requires ecc
}

var saline_clipboard = false;
var saline_iso = {};

var saline = 
{
    db:
    {
        db:
        {
            setup: false,
            defaults:
            {
                network: 'regtest'
            },
            testing: true
        },
        html:
        {
            forms:
            {
                setup: false
            }
        }
    },
    data:
    {
        check: async function(username, pin, password, callback)
        {
            if(username && password && pin && typeof callback == 'function')
            {
                var salt = username + '_' + pin + '_' + password;
                var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');
                
                saline.sodium.keys(user_secret, function(user_keys)
                {
                    if(user_keys)
                    {
                        var key_string = Buffer.from(user_keys.publicKey).toString('hex');

                        if(key_string && saline.db.user.sodium && key_string == saline.db.user.sodium)
                        {
                            callback(user_keys);
                        }
                        else
                        {
                            callback(false);
                        }
                    }
                    else
                    {
                        callback(false);
                    }
                });
            }
        },
        get: async function(callback = false)
        {
            if(typeof callback == 'function')
            {
                var db = false;
                
                if(typeof browser == 'object')
                {
                    try
                    {
                        db = await browser.storage.local.get();
                    }
                    catch(e){ }
                    callback(db);
                }
                else if(typeof chrome == 'object' && typeof chrome.storage != 'undefined')
                {
                    chrome.storage.local.get(function(db)
                    {
                        callback(db);
                    });
                }
                else
                {
                    db = localStorage.getItem('db');
                    if(db)
                    {
                        try
                        {
                            db = JSON.parse(db);
                        }
                        catch(e){}
                    }
                    callback(db);
                }
            }
        },
        remove: async function(fields, callback = false)
        {
            if(typeof fields == 'object' && typeof callback == 'function')
            {
                var error = false;
                
                if(typeof browser == 'object')
                {
                    try
                    {
                        error = await browser.storage.local.remove(fields);
                    }
                    catch(e){ error = e.message }
                    callback(error);
                }
                else if(typeof chrome == 'object')
                {
                    chrome.storage.local.remove(fields, function()
                    {
                        callback();
                    });
                }
                else
                {
                    saline.data.get(function(old_db)
                    {
                        var db = {}
                        
                        jQuery.each(old_db, function(k, v)
                        {
                            var include = true;
                            for(f = 0; f < fields.length; f++)
                            {
                                if(k == fields[f])
                                {
                                    include = false;
                                }
                            }
                            if(include)
                            {
                                db[k] = v;
                            }
                        })
                        error = localStorage.setItem('db', JSON.stringify(db));
                        callback(error);
                    })
                }
            }
        },
        set: async function(db, callback = false)
        {
            if(db && typeof callback == 'function')
            {
                var error = false;
                
                if(typeof browser == 'object')
                {
                    try
                    {
                        error = await browser.storage.local.set(db);
                    }
                    catch(e){ error = e.message }
                }
                else if(typeof chrome == 'object')
                {
                    chrome.storage.local.set(db, function()
                    {
                        callback();
                    });
                }
                else
                {
                    error = localStorage.setItem('db', JSON.stringify(db));
                }
                
                callback(error);
            }
        },
        update: async function(fields = false, callback = false)
        {
            if(typeof fields == 'object' && typeof callback == 'function')
            {
                var error = false;
                
                if(typeof browser != null && typeof browser == 'object')
                {
                    try
                    {
                        error = await browser.storage.local.set(fields);
                    }
                    catch(e){ error = e.message }
                    callback(error);
                }
                else if(typeof chrome == 'object')
                {
                    chrome.storage.local.set(fields, function(e)
                    {
                        callback(error);
                    });
                }
                else
                {
                    saline.data.get(function(old_db)
                    {
                        var db = JSON.parse(JSON.stringify(old_db));
                        
                        jQuery.each(fields, function(k, v)
                        {
                            db[k] = v;
                        });
                        
                        error = localStorage.setItem('db', JSON.stringify(db));
                        setTimeout(function()
                        {
                            callback(error);
                        }, 150);
                    })
                }
            }
        }
    },
    session:
    {
        get: async function(callback = false)
        {
            if(typeof callback == 'function')
            {
                var db = false;
                
                if(typeof browser == 'object')
                {
                    try
                    {
                        db = await browser.storage.session.get();
                    }
                    catch(e){ }
                    callback(db);
                }
                else if(typeof chrome == 'object')
                {
                    chrome.storage.session.get(function(db)
                    {
                        callback(db);
                    });
                }
                else
                {
                    db = sessionStorage.getItem('db');
                    if(db)
                    {
                        try
                        {
                            db = JSON.parse(db);
                        }
                        catch(e){}
                    }
                    callback(db);
                }
            }
        },
        remove: async function(fields, callback = false)
        {
            if(typeof fields == 'object' && typeof callback == 'function')
            {
                var error = false;
                
                if(typeof browser == 'object')
                {
                    try
                    {
                        error = await browser.storage.session.remove(fields);
                    }
                    catch(e){ error = e.message }
                    callback(error);
                }
                else if(typeof chrome == 'object')
                {
                    chrome.storage.session.remove(fields, function()
                    {
                        callback();
                    });
                }
                else
                {
                    saline.session.get(function(old_db)
                    {
                        var db = {}
                        
                        jQuery.each(old_db, function(k, v)
                        {
                            var include = true;
                            for(f = 0; f < fields.length; f++)
                            {
                                if(k == fields[f])
                                {
                                    include = false;
                                }
                            }
                            if(include)
                            {
                                db[k] = v;
                            }
                        })
                        error = sessionStorage.setItem('db', JSON.stringify(db));
                        callback(error);
                    })
                }
            }
        },
        set: async function(db, callback = false)
        {
            if(db && typeof callback == 'function')
            {
                var error = false;
                
                if(typeof browser == 'object')
                {
                    try
                    {
                        error = await browser.storage.session.set(db);
                    }
                    catch(e){ error = e.message }
                    callback(error);
                }
                else if(typeof chrome == 'object')
                {
                    chrome.storage.session.set(db, function()
                    {
                        callback(error);
                    });
                }
                else
                {
                    error = sessionStorage.setItem('db', JSON.stringify(db));
                    callback(error);
                }
            }
        }
    },
    forms: function()
    {
        var setup = 'form-ordit-wallet-setup';
        var regenerate = 'form-ordit-wallet-regenerate';
        var lost = 'form-ordit-wallet-lost';
        var recover = 'form-ordit-wallet-recover';
        var login = 'form-ordit-wallet-login';
        var message = 'form-ordit-wallet-message';
        var verify = 'form-ordit-wallet-verify';
        var send = 'form-ordit-wallet-send';
        var inscribe = 'form-ordit-wallet-inscribe';
        var chunk = 'form-ordit-wallet-chunk';
        var collections = 'form-ordit-collection-inscription';
        var mint = 'form-ordit-mint-inscription';
        var sado = 'form-ordit-sado-list';
        var settings = 'form-ordit-sado-settings';
        var signtx = 'form-ordit-wallet-signtx';
        var switchnet = 'form-ordit-switch-network';
        var deploytoken = 'form-ordit-deploy-token';
        var minttoken = 'form-ordit-mint-tokens';
        var transfertoken = 'form-ordit-prepare-transfer';
        
        var get = 'form-ordit-wallet-get';
        var lookup = 'form-ordit-wallet-lookup';
        var prepare = 'form-ordit-wallet-prepare';
        var sign = 'form-ordit-wallet-sign';
        var relay = 'form-ordit-wallet-relay';
        
        // Lazy load text content ...?
        if(jQuery('textarea.ordit-text').length > 0)
        {
            jQuery('textarea.ordit-text').each(function(e)
            {
                var _this = jQuery(this);
                var src = jQuery(this).attr('data-src');
                fetch
                (
                    src, 
                    {
                        method: 'GET'
                    }
                )
                .then(response => response.text())
                .then(text => 
                {
                    jQuery(_this).val(text)
                })
                .catch(error => 
                { 
                    
                })
            });
                
        }
        
        // Track form state ...
        jQuery('button.state-tabs').each(function(e)
        {
            var tid = jQuery(this).attr('id');
            var tabEl = document.querySelector('button#' + tid);
            if(tabEl)
            {
                tabEl.addEventListener('shown.bs.tab', function (event) 
                {
                    var button = jQuery(event.target);
                    var tab = jQuery(jQuery(button).attr('data-bs-target'));
                    var form = jQuery(tab).find('form');
                    var form_id = jQuery(form).attr('id');
                    var id = jQuery(tab).attr('id');
                    
                    var get_form_values = function()
                    {
                        var data = {
                            session:
                            {
                                form: [],
                                tab: tid
                            }
                        };
                        jQuery('#' + id + ' .form-control').each(function(i)
                        {
                            data.session.form.push(jQuery(this).val());
                        })
                        
                        saline.data.update(data, function(res)
                        {
                            
                        })
                    }
                    jQuery(form).find('input.form-control').on('keyup', function(e)
                    {
                        get_form_values();
                    });
                    jQuery(form).find('select.form-control').on('change', function(e)
                    {
                        get_form_values();
                    });
                });
            }
        });
        
        if(typeof saline.db.db.session == 'object')
        {
            jQuery('button#' + saline.db.db.session.tab).trigger('click');
            var t = jQuery('button#' + saline.db.db.session.tab).attr('data-bs-target');
            var form = jQuery(t).find('form');
            jQuery.each(saline.db.db.session.form, function(f)
            {
                jQuery(form).find('.form-control').each(function(i)
                {
                    if(i == f)
                    {
                        jQuery(this).val(saline.db.db.session.form[i]);
                    }
                })
            })
        }
        // END OF FIREFOX STATE
        
        jQuery('body').on('submit', '.' + setup, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var fingerprint = jQuery(form).find('#' + setup + '-0').val();
            var username = jQuery(form).find('#' + setup + '-1').val();
            var pin = jQuery(form).find('#' + setup + '-2').val();
            var password = jQuery(form).find('#' + setup + '-3').val();
            var pinrepeat = jQuery(form).find('#' + setup + '-5').val();
            var pwrepeat = jQuery(form).find('#' + setup + '-6').val();
            if
            (
                username && password && pin && fingerprint
                && pinrepeat && pwrepeat
                && pwrepeat == password
                && pinrepeat == pin
                && username != password
                && pin != password
            )
            {
                var salt = username + '_' + pin + '_' + password;
                async function setup()
                {
                    var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                    var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                    var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');
                    
                    var rng = bip39.generateMnemonic(256);
                    var rand = bitcointp.crypto.sha256(Buffer.from(rng), 'utf8').toString('hex');
                    
                    // Two things need to be stored ?
                    // - rand 
                    // - fingerprint
                    
                    var user_salt = fingerprint + rand;
                    var device_hash = bitcointp.crypto.sha256(Buffer.from(user_salt), 'utf8').toString('hex');
                    var u = bip39.entropyToMnemonic(Buffer.from(device_hash, 'hex'), bip39.wordlists.english);
                    var personal_secret = await bip39.mnemonicToEntropy(u).toString('hex');
                    
                    var device_salt = user_secret + rand;
                    var device_hash = bitcointp.crypto.sha256(Buffer.from(device_salt), 'utf8').toString('hex');
                    var d = bip39.entropyToMnemonic(Buffer.from(device_hash, 'hex'), bip39.wordlists.english);
                    var device_secret = await bip39.mnemonicToEntropy(d).toString('hex');
                    
                    var credentials = 
                    {
                        user:
                        {
                            secret: user_secret,
                            salt: personal_secret
                        },
                        device:
                        {
                            salt: device_secret
                        }
                    }
                    return credentials;
                }
                setup().then(async (credentials) =>
                {
                    saline.sodium.keys(credentials.user.secret, function(user_keys)
                    {
                        saline.sodium.encrypt
                        (
                            credentials.device.salt,
                            user_keys.publicKey, 
                            async function(encrypted_device_salt)
                            {
                                saline.sodium.encrypt
                                (
                                    credentials.user.salt,
                                    user_keys.publicKey, 
                                    async function(encrypted_personal_salt)
                                    {
                                        var ds = credentials.device.salt;
                                        var ps = credentials.user.salt;
                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');
                                        
                                        ordit.sdk.wallet.get({seed: seed}, async function(wallet)
                                        {
                                            var public_key = wallet.data.keys[0].pub;

                                            var user_shards = secrets.share(secrets.str2hex(salt), 3, 2);
                                            var device_shards = secrets.share(secrets.str2hex(encrypted_device_salt), 3, 2);
                                            
                                            var personal_shards = secrets.share(secrets.str2hex(encrypted_personal_salt), 3, 2);

                                            var provide = 
                                            {
                                                key: public_key,
                                                dns: encrypted_personal_salt,
                                                shards:
                                                {
                                                    user: [user_shards[1], user_shards[2]],
                                                    device: [device_shards[1], device_shards[2]],
                                                    personal: [personal_shards[1], personal_shards[2]]
                                                }
                                            };

                                            var device = 
                                            {
                                                salt: encrypted_device_salt,
                                                shards:
                                                {
                                                    user: user_shards[0],
                                                    device: device_shards[0],
                                                    personal: personal_shards[0]
                                                }
                                            }

                                            var db = 
                                            {
                                                user:
                                                {
                                                    key: public_key,
                                                    sodium: Buffer.from(user_keys.publicKey).toString('hex')
                                                },
                                                network: saline.db.db.defaults.network,
                                                device: device,
                                                provide: provide
                                            }

                                            saline.data.set(db, function(error)
                                            {
                                                location.reload(true);
                                            })
                                        })
                                    }
                                );
                            }
                        );
                    });
                });
            }
            else
            {
                if(name && password != repeat)
                {
                    saline.modal('Setup Warning', 'Passwords do not match');
                }
                else if(name == password)
                {
                    saline.modal('Setup Warning', 'Name cannot match password');
                }
            }
        });
        jQuery('body').on('submit', '.' + login, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var username = jQuery(form).find('#' + login + '-0').val();
            var pin = jQuery(form).find('#' + login + '-1').val();
            var password = jQuery(form).find('#' + login + '-2').val();
            if
            (
                pin
                && username && password
                && username != password
            )
            {
                if
                (
                    typeof saline.db.db == 'object'
                    && typeof saline.db.db.salt != 'undefined'
                    && typeof saline.db.db.key != 'undefined'
                )
                {
                    ordit.sdk.dnkeys(username, function(dnkeys)
                    {   
                        if(typeof dnkeys["saline-salt"] != 'undefined')
                        {
                            var dns = dnkeys["saline-salt"];
                            
                            async function recover()
                            {
                                var salt = username + '_' + pin + '_' + password;
                                var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                                var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                                var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                                saline.sodium.keys(user_secret, function(user_keys)
                                {
                                    if(user_keys)
                                    {   
                                        saline.sodium.decrypt
                                        (
                                            dns,
                                            user_keys, 
                                            async function(decrypted_personal_salt)
                                            {
                                                if(decrypted_personal_salt)
                                                {   
                                                    var data = saline.db.db.salt;
                                                    saline.sodium.decrypt
                                                    (
                                                        data,
                                                        user_keys, 
                                                        async function(decrypted_device_salt)
                                                        {
                                                            var ds = decrypted_device_salt;
                                                            var ps = decrypted_personal_salt;
                                                            var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                            var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                            var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                            var seed = await bip39.mnemonicToEntropy(bip).toString('hex');

                                                            ordit.sdk.wallet.get({seed: seed}, async function(wallet)
                                                            {
                                                                var public_key = wallet.data.keys[0].pub;

                                                                if(public_key == saline.db.db.key)
                                                                {
                                                                    var db = 
                                                                    {
                                                                        active: true
                                                                    }
                                                                    saline.data.update(db, function(error)
                                                                    {
                                                                        location.reload(true);
                                                                    })
                                                                }
                                                                else
                                                                {
                                                                    saline.modal('Login Warning', 'Invalid login');
                                                                }
                                                            });
                                                        }
                                                    );
                                                }
                                                else
                                                {
                                                    saline.modal('Login Warning', 'Unable to decrypt DNS data');
                                                }
                                            }
                                        );
                                    }
                                });
                            }
                            recover();
                        }
                        else
                        {
                            saline.modal('Login Warning', 'Unable to verify DNS records');
                        }
                    });
                }
                else
                {
                    saline.modal('Login Warning', 'Unable to find necessary device credentials');
                }
            }
        });
        jQuery('body').on('submit', '.' + recover, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var shard_1 = jQuery(form).find('#' + recover + '-0').val();
            var shard_2 = jQuery(form).find('#' + recover + '-1').val();
            var username = jQuery(form).find('#' + recover + '-2').val();
            var dns = jQuery(form).find('#' + recover + '-3').val();
            var pin = jQuery(form).find('#' + recover + '-4').val();
            var password = jQuery(form).find('#' + recover + '-5').val();
            if
            (
                shard_1 && shard_2 && pin
                && dns
                && username && password
                && username != password
            )
            {
                async function recover()
                {
                    var salt = username + '_' + pin + '_' + password;
                    var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                    var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                    var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                    saline.sodium.keys(user_secret, function(user_keys)
                    {
                        if(user_keys)
                        {   
                            saline.sodium.decrypt
                            (
                                dns,
                                user_keys, 
                                async function(decrypted_personal_salt)
                                {   
                                    if(decrypted_personal_salt)
                                    {   
                                        var shards = [shard_1, shard_2];
                                        var data = false;
                                        
                                        try
                                        {
                                            data = secrets.hex2str(secrets.combine(shards));
                                        }
                                        catch(e){}
                                        
                                        function hasUnicode (str) {
                                            for (var i = 0; i < str.length; i++) {
                                                if (str.charCodeAt(i) > 127) return true;
                                            }
                                            return false;
                                        }
                                        
                                        if(data && !hasUnicode(data))
                                        {
                                            saline.sodium.decrypt
                                            (
                                                data,
                                                user_keys, 
                                                async function(decrypted_device_salt)
                                                {   
                                                    var ds = decrypted_device_salt;
                                                    var ps = decrypted_personal_salt;
                                                    var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                    var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                    var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                    var seed = await bip39.mnemonicToEntropy(bip).toString('hex');

                                                    ordit.sdk.wallet.get({seed: seed}, async function(wallet)
                                                    {
                                                        var public_key = wallet.data.keys[0].pub;

                                                        var user_shards = secrets.share(secrets.str2hex(salt), 3, 2);
                                                        var device_shards = secrets.share(secrets.str2hex(data), 3, 2);

                                                        var personal_shards = secrets.share(secrets.str2hex(dns), 3, 2);

                                                        var provide = 
                                                        {
                                                            key: public_key,
                                                            dns: dns,
                                                            shards:
                                                            {
                                                                user: [user_shards[1], user_shards[2]],
                                                                device: [device_shards[1], device_shards[2]],
                                                                personal: [personal_shards[1], personal_shards[2]]
                                                            }
                                                        };

                                                        var device = 
                                                        {
                                                            salt: data,
                                                            shards:
                                                            {
                                                                user: user_shards[0],
                                                                device: device_shards[0],
                                                                personal: personal_shards[0]
                                                            }
                                                        }

                                                        var db = 
                                                        {
                                                            user:
                                                            {
                                                                key: public_key,
                                                                sodium: Buffer.from(user_keys.publicKey).toString('hex')
                                                            },
                                                            network: saline.db.db.defaults.network,
                                                            device: device,
                                                            provide: provide,
                                                            active: true,
                                                            session: false
                                                        }

                                                        saline.data.set(db, function(error)
                                                        {
                                                            location.reload(true);
                                                        })
                                                    });
                                                }
                                            );
                                        }
                                        else
                                        {
                                            saline.modal('Recovery Warning', 'Invalid device recovery shards');
                                        }
                                    }
                                    else
                                    {
                                        saline.modal('Recovery Warning', 'Unable to decrypt DNS data');
                                    }
                                }
                            );
                        }
                    });
                }
                recover();
            }
            else
            {
                
            }
        });
        jQuery('body').on('submit', '.' + regenerate, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var shard_2 = jQuery(form).find('#' + regenerate + '-0').val();
            var username = jQuery(form).find('#' + regenerate + '-1').val();
            var pin = jQuery(form).find('#' + regenerate + '-2').val();
            var password = jQuery(form).find('#' + regenerate + '-3').val();
            
            var shard_1 = false;
            try
            {
                shard_1 = saline.db.db.shards.device;
            }
            catch(e){}
            
            if
            (
                shard_1 && shard_2 && pin
                && username && password
                && username != password
            )
            {
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {   
                                            if(decrypted_personal_salt)
                                            {   
                                                var shards = [shard_1, shard_2];
                                                var data = false;

                                                try
                                                {
                                                    data = secrets.hex2str(secrets.combine(shards));
                                                }
                                                catch(e){}

                                                function hasUnicode (str) {
                                                    for (var i = 0; i < str.length; i++) {
                                                        if (str.charCodeAt(i) > 127) return true;
                                                    }
                                                    return false;
                                                }

                                                if(data && !hasUnicode(data))
                                                {
                                                    saline.sodium.decrypt
                                                    (
                                                        data,
                                                        user_keys, 
                                                        async function(decrypted_device_salt)
                                                        {   
                                                            var ds = decrypted_device_salt;
                                                            var ps = decrypted_personal_salt;
                                                            var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                            var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                            var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                            var seed = await bip39.mnemonicToEntropy(bip).toString('hex');

                                                            ordit.sdk.wallet.get({seed: seed}, async function(wallet)
                                                            {
                                                                var public_key = wallet.data.keys[0].pub;

                                                                if(public_key == saline.db.db.key)
                                                                {
                                                                    var user_shards = secrets.share(secrets.str2hex(salt), 3, 2);
                                                                    var device_shards = secrets.share(secrets.str2hex(data), 3, 2);

                                                                    var personal_shards = secrets.share(secrets.str2hex(dns), 3, 2);

                                                                    var provide = 
                                                                    {
                                                                        key: public_key,
                                                                        dns: dns,
                                                                        shards:
                                                                        {
                                                                            user: [user_shards[1], user_shards[2]],
                                                                            device: [device_shards[1], device_shards[2]],
                                                                            personal: [personal_shards[1], personal_shards[2]]
                                                                        }
                                                                    };

                                                                    var device = 
                                                                    {
                                                                        salt: data,
                                                                        shards:
                                                                        {
                                                                            user: user_shards[0],
                                                                            device: device_shards[0],
                                                                            personal: personal_shards[0]
                                                                        }
                                                                    }

                                                                    var db = 
                                                                    {
                                                                        user:
                                                                        {
                                                                            key: public_key,
                                                                            sodium: Buffer.from(user_keys.publicKey).toString('hex')
                                                                        },
                                                                        network: saline.db.db.defaults.network,
                                                                        device: device,
                                                                        provide: provide,
                                                                        active: true,
                                                                        session: false
                                                                    }

                                                                    saline.data.set(db, function(error)
                                                                    {
                                                                        location.reload(true);
                                                                    })
                                                                }
                                                                else
                                                                {
                                                                    saline.modal('Regeneration Warning', 'Invalid regeneration credentials');
                                                                }
                                                            });
                                                        }
                                                    );
                                                }
                                                else
                                                {
                                                    saline.modal('Regeneration Warning', 'Invalid device recovery shards');
                                                }
                                            }
                                            else
                                            {
                                                saline.modal('Regeneration Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('Regeneration Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                if(name == password)
                {
                    saline.modal('Regeneration Warning', 'Name cannot match password');
                }
            }
        });
        jQuery('body').on('submit', '.' + message, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var msg = jQuery(form).find('#' + message + '-0').val();
            var username = jQuery(form).find('#' + message + '-1').val();
            var pin = jQuery(form).find('#' + message + '-2').val();
            var password = jQuery(form).find('#' + message + '-3').val();
            
            if
            (
                msg && pin
                && username && password
                && username != password
            )
            {
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {   
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');

                                                        ordit.sdk.message.sign({
                                                            seed: seed, 
                                                            message: msg,
                                                            network: saline.db.db.defaults.network
                                                        }, async function(sigs)
                                                        {
                                                            if(sigs.success)
                                                            {
                                                                var results = '<alert class="alert alert-block alert-info">';
                                                                results+= '<small>ADDRESS USED FOR SIGNATURES:<pre>' + sigs.data.address + '</pre><hr>PUBKEY USED FOR SIGNATURES:<pre>' + sigs.data.pub + '</pre></small>';
                                                                results+= '</alert><hr>';
                                                                results+= '<div class="row">';
                                                                results+= '<div class="col-sm-6">';
                                                                results+= '<b style="display: block; text-align: center;">HEX</b>';
                                                                results+= '<div class="qr-holder" data-content="' + sigs.data.hex + '"></div>';
                                                                results+= '<a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + sigs.data.hex + '">COPY</a>';
                                                                results+= '</div>';
                                                                results+= '<div class="col-sm-6">';
                                                                results+= '<b style="display: block; text-align: center;">BASE64</b>';
                                                                results+= '<div class="qr-holder" data-content="' + sigs.data.base64 + '"></div>';
                                                                results+= '<a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + sigs.data.base64 + '">COPY</a>';
                                                                results+= '</div>';
                                                                results+= '</div>';
                                                                saline.modal('Signatures', results);
                                                            }
                                                            else
                                                            {
                                                                saline.modal('Message Signing Warning', sigs.message);
                                                            }
                                                        });
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('Message Signing Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('Message Signing Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                if(name == password)
                {
                    saline.modal('Message Signing Warning', 'Name cannot match password');
                }
            }
        });
        jQuery('body').on('submit', '.' + signtx, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var input = jQuery(form).find('#' + signtx + '-0').val();
            var tweaked = parseInt(jQuery(form).find('#' + signtx + '-1').val());
            var extracted = parseInt(jQuery(form).find('#' + signtx + '-2').val());
            var finalized = parseInt(jQuery(form).find('#' + signtx + '-3').val());
            var sighashType = parseInt(jQuery(form).find('#' + signtx + '-4').val());
            var signingIndexes = jQuery(form).find('#' + signtx + '-5').val();
            var username = jQuery(form).find('#' + signtx + '-6').val();
            var pin = jQuery(form).find('#' + signtx + '-7').val();
            var password = jQuery(form).find('#' + signtx + '-8').val();
            
            if(signingIndexes)
            {
                try
                {
                    signingIndexes = JSON.parse(signingIndexes);
                }
                catch(e){}
            }
            
            if
            (
                input && pin
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'SIGNING');
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {   
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');
                                                        
                                                        // Is input hex or base64 ?
                                                        var is_hex = true;
                                                        if(input.indexOf('/') > -1 || input.indexOf('=') > -1)
                                                        {
                                                            is_hex = false;
                                                        }
                                                        
                                                        var psbt_options = 
                                                        {
                                                            seed: seed,
                                                            network: saline.db.db.defaults.network
                                                        }
                                                        
                                                        if(is_hex)
                                                        {
                                                            psbt_options.hex = Buffer.from(input, 'hex').toString('hex');
                                                        }
                                                        else
                                                        {
                                                            psbt_options.base64 = input;
                                                        }
                                                        
                                                        if(tweaked)
                                                        {
                                                            psbt_options.tweaked = true;
                                                        }
                                                        
                                                        if(sighashType)
                                                        {
                                                            psbt_options.sighashType = sighashType;
                                                        }
                                                        if(signingIndexes)
                                                        {
                                                            psbt_options.signingIndexes = signingIndexes;
                                                        }
                                                        if(extracted)
                                                        {
                                                            psbt_options.extracted = true;
                                                        }
                                                        else
                                                        {
                                                            psbt_options.extracted = false;
                                                        }

                                                        ordit.sdk.psbt.sign(
                                                            psbt_options, 
                                                        async function(sigs)
                                                        {
                                                            if(sigs.success)
                                                            {
                                                                if(sigs.data.hex != false)
                                                                {
                                                                    var results = '<alert class="alert alert-block alert-info">';
                                                                    results+= '<small>FINALIZED HEX FOR RELAY</small>';
                                                                    results+= '</alert><hr>';
                                                                    results+= '<div class="row">';
                                                                    results+= '<div class="col-sm-3"></div>';
                                                                    results+= '<div class="col-sm-6">';
                                                                    results+= '<b style="display: block; text-align: center;">HEX</b>';
                                                                    results+= '<div class="qr-holder" data-content="' + sigs.data.hex + '"></div>';
                                                                    results+= '<a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + sigs.data.hex + '">COPY</a>';
                                                                    results+= '</div>';
                                                                    results+= '<div class="col-sm-3"></div>';
                                                                    results+= '</div>';
                                                                    saline.modal('Signatures', results);
                                                                }
                                                                else if
                                                                (
                                                                    sigs.data.psbt.hex.length < 2950
                                                                )
                                                                {
                                                                    var results = '<alert class="alert alert-block alert-info">';
                                                                    results+= '<small>UNFINALIZED PSBT</small>';
                                                                    results+= '</alert><hr>';
                                                                    results+= '<div class="row">';
                                                                    results+= '<div class="col-sm-6">';
                                                                    results+= '<b style="display: block; text-align: center;">HEX</b>';
                                                                    results+= '<div class="qr-holder" data-content="' + sigs.data.psbt.hex + '"></div>';
                                                                    results+= '<a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + sigs.data.psbt.hex + '">COPY</a>';
                                                                    results+= '</div>';
                                                                    results+= '<div class="col-sm-6">';
                                                                    results+= '<b style="display: block; text-align: center;">BASE64</b>';
                                                                    results+= '<div class="qr-holder" data-content="' + sigs.data.psbt.base64 + '"></div>';
                                                                    results+= '<a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + sigs.data.psbt.base64 + '">COPY</a>';
                                                                    results+= '</div>';
                                                                    results+= '</div>';
                                                                    saline.modal('Signatures', results);
                                                                }
                                                                else
                                                                {
                                                                    var results = '<alert class="alert alert-block alert-info">';
                                                                    results+= '<small>UNFINALIZED PSBT</small>';
                                                                    results+= '</alert><hr>';
                                                                    results+= '<div class="row">';
                                                                    results+= '<div class="col-sm-6">';
                                                                    results+= '<b style="display: block; text-align: center;">HEX</b>';
                                                                    results+= '<pre>' + sigs.data.psbt.hex + '</pre>';
                                                                    results+= '<a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + sigs.data.psbt.hex + '">COPY</a>';
                                                                    results+= '</div>';
                                                                    results+= '<div class="col-sm-6">';
                                                                    results+= '<b style="display: block; text-align: center;">BASE64</b>';
                                                                    results+= '<pre>' + sigs.data.psbt.base64 + '</pre>';
                                                                    results+= '<a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + sigs.data.psbt.base64 + '">COPY</a>';
                                                                    results+= '</div>';
                                                                    results+= '</div>';
                                                                    saline.modal('Signatures', results);
                                                                }
                                                            }
                                                            else
                                                            {
                                                                saline.modal('PSBT Signing Warning', sigs.message);
                                                            }
                                                        });
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('PSBT Signing Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('PSBT Signing Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                if(name == password)
                {
                    saline.modal('PSBT Signing Warning', 'Name cannot match password');
                }
            }
        });
        jQuery('body').on('submit', '.' + verify, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var pub = jQuery(form).find('#' + verify + '-0').val();
            var msg = jQuery(form).find('#' + verify + '-1').val();
            var sig = jQuery(form).find('#' + verify + '-2').val();
            var username = jQuery(form).find('#' + verify + '-3').val();
            var pin = jQuery(form).find('#' + verify + '-4').val();
            var password = jQuery(form).find('#' + verify + '-5').val();
            
            if
            (
                msg && pin && pub && sig
                && username && password
                && username != password
            )
            {
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {   
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');
                                                        
                                                        var verification_options = 
                                                        {
                                                            key: pub, 
                                                            message: msg,
                                                            signature: sig,
                                                            network: saline.db.db.defaults.network
                                                        }

                                                        ordit.sdk.message.verify(
                                                            verification_options, 
                                                            async function(verified)
                                                        {
                                                            if(verified.success)
                                                            {
                                                                var results = '<alert class="alert alert-block alert-info">';
                                                                results+= '<small>SIGNATURE VERIFIED</small>';
                                                                results+= '</alert> ';
                                                                saline.modal('Verified', results);
                                                            }
                                                            else
                                                            {
                                                                var results = '<alert class="alert alert-block alert-info">';
                                                                results+= '<strong>UNABLE TO VERIFY SIGNATURE</small>';
                                                                results+= '</alert> ';
                                                                saline.modal('Verification Warning', verified.message);
                                                            }
                                                        });
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('Verification Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('Verification Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                if(name == password)
                {
                    saline.modal('Verification Warning', 'Name cannot match password');
                }
            }
        });
        jQuery('body').on('submit', '.' + collections, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var cover = false;
            
            var title = jQuery(form).find('#' + collections + '-0').val();
            var description = jQuery(form).find('#' + collections + '-1').val();
            var slug = jQuery(form).find('#' + collections + '-2').val();
            var url = jQuery(form).find('#' + collections + '-3').val();
            var name = jQuery(form).find('#' + collections + '-4').val();
            var email = jQuery(form).find('#' + collections + '-5').val();
            
            var tpublishers = jQuery(form).find('#' + collections + '-7').val();
            var tinscriptions = jQuery(form).find('#' + collections + '-8').val();
            
            var username = jQuery(form).find('#' + collections + '-9').val();
            var pin = jQuery(form).find('#' + collections + '-10').val();
            var password = jQuery(form).find('#' + collections + '-11').val();
            
            var publishers = [];
            var inscriptions = [];
            
            try
            {
                publishers = JSON.parse(tpublishers);
                inscriptions = JSON.parse(tinscriptions);
            }
            catch(e){}
            
            try
            {
                cover = jQuery(form).find('#' + collections + '-6')[0].files[0];
            }
            catch(e){}
            
            if
            (
                pin
                && publishers.length > 0
                && inscriptions.length > 0
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'CONSTRUCTING');
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {   
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');

                                                        ordit.sdk.wallet.get
                                                        ({
                                                            seed: seed, 
                                                            network: saline.db.db.defaults.network
                                                        },  async function(wallet)
                                                        {
                                                            var public_key = false;
                                                            var public_address = false;
                                                            
                                                            for(w = 0; w < wallet.data.addresses.length; w++)
                                                            {
                                                                if(wallet.data.addresses[w].format == 'taproot')
                                                                {
                                                                    public_key = wallet.data.keys[0].pub;
                                                                    public_address = wallet.data.addresses[w].address;
                                                                }
                                                            }
                                                            
                                                            var prepare_collection = function(mt, mc)
                                                            {
                                                                var collection_options = 
                                                                {
                                                                    seed: seed,

                                                                    title: title,
                                                                    description: description,
                                                                    slug: slug,
                                                                    url: url,
                                                                    destination: public_address,

                                                                    publishers: publishers,
                                                                    inscriptions: inscriptions,

                                                                    postage: 10000,
                                                                    creator: name,
                                                                    email: email,
                                                                    media_content: mc,
                                                                    media_type: mt,

                                                                    network: saline.db.db.defaults.network
                                                                };
                                                                ordit.sdk.collections.publish
                                                                (
                                                                    collection_options,  
                                                                    function(inscription)
                                                                {
                                                                    if(inscription.success)
                                                                    {
                                                                        var txid = inscription.data.txid;
                                                                        var results = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                                                        saline.modal('Success', results);
                                                                    }
                                                                    else if
                                                                    (
                                                                        typeof inscription.data.btc != 'undefined'
                                                                        && typeof inscription.data.sats != 'undefined'
                                                                        && typeof inscription.data.address != 'undefined'
                                                                    )
                                                                    {
                                                                        var results = '<alert class="alert alert-block alert-info"><small style="text-transform: uppercase;">' + inscription.message + '<hr>Requires single <b>spendable</b> of ' + inscription.data.btc + ' BTC<br /><small>( ' + inscription.data.sats + ' cardinals / safe to spend sats )</small></small></alert>';
                                                                        results+= '<div class="row"><div class="col-sm-3"></div><div class="col-sm-6"><div class="qr-holder" data-content="' + inscription.data.address + '"></div></div><div class="col-sm-3"></div></div><hr><pre>' + inscription.data.address + '</pre><div class="row"><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + inscription.data.address + '">COPY</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recover="1" data-form=".form-ordit-collection-inscription">RECOVER</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recover="0" data-form=".form-ordit-collection-inscription">RETRY</a></div></div>';
                                                                        saline.modal('Collection Warning', results);
                                                                    }
                                                                    else
                                                                    {
                                                                        saline.modal('Collection Warning', inscription.message);
                                                                    }
                                                                })
                                                            }
                                                            
                                                            function getBase64(file) 
                                                            {
                                                                var reader = new FileReader();
                                                                reader.onload = function () 
                                                                {
                                                                    var data = reader.result.split(':');
                                                                    var meta = data[1].split(';');
                                                                    var media_type = meta[0];
                                                                    var media_content = meta[1].split(',')[1];
                                                                    prepare_collection(media_type, media_content);
                                                                    
                                                                }
                                                                reader.onerror = function (error) 
                                                                {
                                                                    saline.modal('Inscribe Error', 'Unable to read file');
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                            
                                                            if(cover)
                                                            {
                                                                getBase64(cover);
                                                            }
                                                            else
                                                            {
                                                                prepare_collection(
                                                                    'text/plain;charset=utf-8', 
                                                                    'OIP2'
                                                                );
                                                            }
                                                        });
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('Collection Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('Collection Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                if(name == password)
                {
                    saline.modal('Collection Warning', 'Name cannot match password');
                }
            }
        });
        jQuery('body').on('submit', '.' + deploytoken, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            
            var ticker = jQuery(form).find('#' + deploytoken + '-0').val();
            var decimals = jQuery(form).find('#' + deploytoken + '-1').val();
            var max = parseInt(jQuery(form).find('#' + deploytoken + '-2').val());
            var limit = parseInt(jQuery(form).find('#' + deploytoken + '-3').val());
            var fees = jQuery(form).find('#' + deploytoken + '-4').val();

            var username = jQuery(form).find('#' + deploytoken + '-5').val();
            var pin = jQuery(form).find('#' + deploytoken + '-6').val();
            var password = jQuery(form).find('#' + deploytoken + '-7').val();
            
            var postage = 10000;
            var actual_decimals = 0;
            var actual_fees = 0;
            if(decimals) actual_decimals = parseInt(decimals);
            if(fees) actual_fees = parseInt(fees);
            
            if
            (
                pin && ticker && max && limit
                && limit <= max
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'DEPLOYING');
                
                var deploy_supply = function(these_options, this_seed)
                {
                    ordit.sdk.tokens.deploy(these_options, function(response)
                    {   
                        if
                        (
                            typeof response.data == 'object'
                            && typeof response.data.address == 'string'
                            && typeof response.data.fees == 'number'
                        )
                        {
                            // Need to check if ready for reveal ...?
                            ordit.sdk.inscription.psbt({
                                seed: this_seed,
                                media_content: response.data.media_content,
                                media_type: response.data.media_type,
                                destination: saline.db.wallet.addresses[0].address,
                                change_address: saline.db.wallet.addresses[0].address,
                                fees: response.data.fees,
                                network: saline.db.db.defaults.network,
                                recovery: false
                            },  function(reveal)
                            {   
                                if(reveal.success)
                                {
                                    ordit.sdk.psbt.sign({
                                        seed: this_seed, 
                                        hex: reveal.data.hex,
                                        network: saline.db.db.defaults.network,
                                        tweaked: false
                                    }, 
                                    function(signed)
                                    {
                                        if
                                        (
                                            signed.success
                                            && typeof signed.data.hex != 'undefined'
                                            && signed.data.hex
                                        )
                                        {
                                            ordit.sdk.txid.get({
                                                hex: signed.data.hex,
                                                network: saline.db.db.defaults.network
                                            }, 
                                            function(relayed)
                                            {
                                                if(relayed.success)
                                                {
                                                    var txid = relayed.data.txid;
                                                    var results = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                                    saline.modal('Success', results);
                                                }
                                                else
                                                {
                                                    saline.modal('Mint Warning', 'Unable to relay TX');
                                                }
                                            });
                                        }
                                        else
                                        {
                                            saline.modal('Mint Warning', 'Unable to sign PSBT');
                                        }
                                    });
                                }
                                else
                                {


                                    // Show commit details ...
                                    var msg = 'Depoly Commit';

                                    var form_id = '.form-ordit-deploy-token';
                                    var sats = (response.data.fees + postage);
                                    var btc = parseFloat(sats / (10 ** 8));
                                    var results = '<alert class="alert alert-block alert-info"><small style="text-transform: uppercase;">' + response.message + '<hr>Requires single <b>spendable</b> of ' + btc + ' BTC<br /><small>( ' + sats + ' cardinals / safe to spend sats )</small></small></alert>';
                                    results+= '<div class="row"><div class="col-sm-3"></div><div class="col-sm-6"><div class="qr-holder" data-content="' + response.data.address + '"></div></div><div class="col-sm-3"></div></div><hr><pre>' + response.data.address + '</pre><div class="row"><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + response.data.address + '">COPY</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recover="1" data-form="' + form_id + '">RECOVER</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recoer="0" data-form="' + form_id + '">RETRY</a></div></div>';
                                    saline.modal(msg, results);
                                }
                            });
                        }
                        else
                        {
                            if(response.success)
                            {
                                var txid = 'N/A';
                                var title = 'Deployed Token';
                                
                                if
                                (
                                    typeof response.data == 'object'
                                    && typeof response.data.deploy == 'string'
                                )
                                {
                                    txid = response.data.deploy
                                }
                                
                                var msg = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                saline.modal(title, msg);
                            }
                            else
                            {
                                saline.modal('Deploy Warning', response.message);
                            }
                        }
                    })
                }
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {   
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');
                                                        
                                                        var deploy_options = 
                                                        {
                                                            seed: seed,
                                                            symbol: ticker,
                                                            supply: jQuery(form).find('#' + deploytoken + '-2').val(),
                                                            limit: jQuery(form).find('#' + deploytoken + '-3').val(),
                                                            decimals: actual_decimals,
                                                            fees: actual_fees,
                                                            network: saline.db.db.defaults.network
                                                        };
                                                        
                                                        deploy_supply(deploy_options, seed);
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('Deploy Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                                else
                                {
                                    saline.modal('Deploy Warning', 'Unable to locate DNS data');
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('Deploy Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                saline.modal('Deploy Warning', 'Invalid deploy options');
            }
        });
        jQuery('body').on('submit', '.' + minttoken, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            
            var ticker = jQuery(form).find('#' + minttoken + '-0').val();
            var amount = parseInt(jQuery(form).find('#' + minttoken + '-1').val());
            var fees = jQuery(form).find('#' + minttoken + '-2').val();

            var username = jQuery(form).find('#' + minttoken + '-3').val();
            var pin = jQuery(form).find('#' + minttoken + '-4').val();
            var password = jQuery(form).find('#' + minttoken + '-5').val();
            
            var postage = 10000;
            var actual_fees = 0;
            if(fees) actual_fees = parseInt(fees);
            
            if
            (
                pin && ticker && amount
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'MINTING');
                
                var mint_tokens = function(these_options, this_seed, this_address)
                {
                    ordit.sdk.tokens.mint(these_options, function(response)
                    {
                        if
                        (
                            typeof response.data == 'object'
                            && typeof response.data.address == 'string'
                            && typeof response.data.fees == 'number'
                        )
                        {
                            // Need to check if ready for reveal ...?
                            ordit.sdk.inscription.psbt({
                                seed: this_seed,
                                media_content: response.data.media_content,
                                media_type: response.data.media_type,
                                destination: this_address,
                                change_address: this_address,
                                fees: response.data.fees,
                                network: saline.db.db.defaults.network,
                                recovery: false
                            },  function(reveal)
                            {
                                if(reveal.success)
                                {
                                    ordit.sdk.psbt.sign({
                                        seed: this_seed, 
                                        hex: reveal.data.hex,
                                        network: saline.db.db.defaults.network,
                                        tweaked: false
                                    }, 
                                    function(signed)
                                    {
                                        if
                                        (
                                            signed.success
                                            && typeof signed.data.hex != 'undefined'
                                            && signed.data.hex
                                        )
                                        {
                                            ordit.sdk.txid.get({
                                                hex: signed.data.hex,
                                                network: saline.db.db.defaults.network
                                            }, 
                                            function(relayed)
                                            {
                                                if(relayed.success)
                                                {
                                                    var txid = relayed.data.txid;
                                                    var results = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                                    saline.modal('Success', results);
                                                }
                                                else
                                                {
                                                    saline.modal('Mint Warning', 'Unable to relay TX');
                                                }
                                            });
                                        }
                                        else
                                        {
                                            saline.modal('Mint Warning', 'Unable to sign PSBT');
                                        }
                                    });
                                }
                                else
                                {
                                    // Show commit details ...
                                    var msg = 'Mint Tokens';
                                    var form_id = '.form-ordit-mint-tokens';
                                    var sats = (response.data.fees + postage);
                                    var btc = parseFloat(sats / (10 ** 8));
                                    var results = '<alert class="alert alert-block alert-info"><small style="text-transform: uppercase;">' + response.message + '<hr>Requires single <b>spendable</b> of ' + btc + ' BTC<br /><small>( ' + sats + ' cardinals / safe to spend sats )</small></small></alert>';
                                    results+= '<div class="row"><div class="col-sm-3"></div><div class="col-sm-6"><div class="qr-holder" data-content="' + response.data.address + '"></div></div><div class="col-sm-3"></div></div><hr><pre>' + response.data.address + '</pre><div class="row"><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + response.data.address + '">COPY</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recover="1" data-form="' + form_id + '">RECOVER</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recoer="0" data-form="' + form_id + '">RETRY</a></div></div>';
                                    saline.modal(msg, results);
                                }
                            })
                        }
                        else
                        {
                            if(response.success)
                            {
                                var txid = 'N/A';
                                var title = 'Minted Tokens';
                                
                                if
                                (
                                    typeof response.data == 'object'
                                    && typeof response.data.mint == 'string'
                                )
                                {
                                    txid = response.data.mint
                                }
                                
                                var msg = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                saline.modal(title, msg);
                            }
                            else
                            {
                                saline.modal('Mint Warning', response.message);
                            }
                        }
                    })
                }
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {   
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');
                                                        
                                                        var mint_options = 
                                                        {
                                                            seed: seed,
                                                            symbol: ticker,
                                                            amount: amount,
                                                            fees: actual_fees,
                                                            network: saline.db.db.defaults.network
                                                        };
                                                        
                                                        mint_tokens(mint_options, seed, saline.db.wallet.addresses[0].address);
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('Mint Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                                else
                                {
                                    saline.modal('Mint Warning', 'Unable to locate DNS data');
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('Mint Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                saline.modal('Mint Warning', 'Invalid deploy options');
            }
        });
        jQuery('body').on('submit', '.' + transfertoken, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            
            var ticker = jQuery(form).find('#' + transfertoken + '-0').val();
            var amount = parseInt(jQuery(form).find('#' + transfertoken + '-1').val());
            var fees = jQuery(form).find('#' + transfertoken + '-2').val();

            var username = jQuery(form).find('#' + transfertoken + '-3').val();
            var pin = jQuery(form).find('#' + transfertoken + '-4').val();
            var password = jQuery(form).find('#' + transfertoken + '-5').val();
            
            var postage = 10000;
            var actual_fees = 0;
            if(fees) actual_fees = parseInt(fees);
            
            if
            (
                pin && ticker && amount
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'PREPARING');
                
                var transfer_tokens = function(these_options, this_seed, this_address)
                {
                    ordit.sdk.tokens.transfer(these_options, function(response)
                    {
                        if
                        (
                            typeof response.data == 'object'
                            && typeof response.data.address == 'string'
                            && typeof response.data.fees == 'number'
                        )
                        {
                            // Need to check if ready for reveal ...?
                            ordit.sdk.inscription.psbt({
                                seed: this_seed,
                                media_content: response.data.media_content,
                                media_type: response.data.media_type,
                                destination: this_address,
                                change_address: this_address,
                                fees: response.data.fees,
                                network: saline.db.db.defaults.network,
                                recovery: false
                            },  function(reveal)
                            {
                                if(reveal.success)
                                {
                                    ordit.sdk.psbt.sign({
                                        seed: this_seed, 
                                        hex: reveal.data.hex,
                                        network: saline.db.db.defaults.network,
                                        tweaked: false
                                    }, 
                                    function(signed)
                                    {
                                        if
                                        (
                                            signed.success
                                            && typeof signed.data.hex != 'undefined'
                                            && signed.data.hex
                                        )
                                        {
                                            ordit.sdk.txid.get({
                                                hex: signed.data.hex,
                                                network: saline.db.db.defaults.network
                                            }, 
                                            function(relayed)
                                            {
                                                if(relayed.success)
                                                {
                                                    var txid = relayed.data.txid;
                                                    var results = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                                    saline.modal('Success', results);
                                                }
                                                else
                                                {
                                                    saline.modal('Transfer Warning', 'Unable to relay TX');
                                                }
                                            });
                                        }
                                        else
                                        {
                                            saline.modal('Transfer Warning', 'Unable to sign PSBT');
                                        }
                                    });
                                }
                                else
                                {
                                    // Show commit details ...
                                    var msg = 'Prepare Tokens';
                                    var form_id = '.form-ordit-prepare-transfer';
                                    var sats = (response.data.fees + postage);
                                    var btc = parseFloat(sats / (10 ** 8));
                                    var results = '<alert class="alert alert-block alert-info"><small style="text-transform: uppercase;">' + response.message + '<hr>Requires single <b>spendable</b> of ' + btc + ' BTC<br /><small>( ' + sats + ' cardinals / safe to spend sats )</small></small></alert>';
                                    results+= '<div class="row"><div class="col-sm-3"></div><div class="col-sm-6"><div class="qr-holder" data-content="' + response.data.address + '"></div></div><div class="col-sm-3"></div></div><hr><pre>' + response.data.address + '</pre><div class="row"><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + response.data.address + '">COPY</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recover="1" data-form="' + form_id + '">RECOVER</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recoer="0" data-form="' + form_id + '">RETRY</a></div></div>';
                                    saline.modal(msg, results);
                                }
                            })
                        }
                        else
                        {
                            if(response.success)
                            {
                                var txid = 'N/A';
                                var title = 'Prepared Tokens';
                                
                                if
                                (
                                    typeof response.data == 'object'
                                    && typeof response.data.mint == 'string'
                                )
                                {
                                    txid = response.data.mint
                                }
                                
                                var msg = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                saline.modal(title, msg);
                            }
                            else
                            {
                                saline.modal('Transfer Warning', response.message);
                            }
                        }
                    })
                }
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {   
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');
                                                        
                                                        var transfer_options = 
                                                        {
                                                            seed: seed,
                                                            symbol: ticker,
                                                            amount: amount,
                                                            fees: actual_fees,
                                                            network: saline.db.db.defaults.network
                                                        };
                                                        
                                                        transfer_tokens(transfer_options, seed, saline.db.wallet.addresses[0].address);
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('Transfer Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                                else
                                {
                                    saline.modal('Transfer Warning', 'Unable to locate DNS data');
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('Transfer Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                saline.modal('Transfer Warning', 'Invalid deploy options');
            }
        });
        jQuery('body').on('submit', '.' + mint, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var media = false;
            
            var collection = jQuery(form).find('#' + mint + '-0').val();
            var inscription = jQuery(form).find('#' + mint + '-1').val();
            
            try
            {
                media = jQuery(form).find('#' + mint + '-2')[0].files[0];
            }
            catch(e){}
            
            var nonce = parseInt(jQuery(form).find('#' + mint + '-3').val());
            var publisher = parseInt(jQuery(form).find('#' + mint + '-4').val());
            var destination = jQuery(form).find('#' + mint + '-5').val();
            
            var username = jQuery(form).find('#' + mint + '-6').val();
            var pin = jQuery(form).find('#' + mint + '-7').val();
            var password = jQuery(form).find('#' + mint + '-8').val();
            
            if
            (
                pin && media && destination
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'CONSTRUCTING');
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {   
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');

                                                        ordit.sdk.wallet.get
                                                        ({
                                                            seed: seed, 
                                                            network: saline.db.db.defaults.network
                                                        },  async function(wallet)
                                                        {
                                                            var public_key = false;
                                                            var public_address = false;
                                                            
                                                            for(w = 0; w < wallet.data.addresses.length; w++)
                                                            {
                                                                if(wallet.data.addresses[w].format == 'taproot')
                                                                {
                                                                    public_key = wallet.data.keys[0].pub;
                                                                    public_address = wallet.data.addresses[w].address;
                                                                }
                                                            }
                                                            
                                                            
                                                            var prepare_inscription = function(mt, mc)
                                                            {
                                                                var mint_options = 
                                                                {
                                                                    seed: seed,
                                                                    collection: collection,
                                                                    inscription: inscription,
                                                                    nonce: nonce,
                                                                    publisher: publisher,
                                                                    destination: destination,
                                                                    media_type: mt,
                                                                    media_content: mc,
                                                                    network: saline.db.db.defaults.network
                                                                };
                                                                
                                                                ordit.sdk.collections.mint
                                                                (
                                                                    mint_options,  
                                                                    function(inscription)
                                                                {
                                                                    if(inscription.success)
                                                                    {
                                                                        var txid = inscription.data.txid;
                                                                        var results = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                                                        saline.modal('Success', results);
                                                                    }
                                                                    else if
                                                                    (
                                                                        typeof inscription.data.btc != 'undefined'
                                                                        && typeof inscription.data.sats != 'undefined'
                                                                        && typeof inscription.data.address != 'undefined'
                                                                    )
                                                                    {
                                                                        var results = '<alert class="alert alert-block alert-info"><small style="text-transform: uppercase;">' + inscription.message + '<hr>Requires single <b>spendable</b> of ' + inscription.data.btc + ' BTC<br /><small>( ' + inscription.data.sats + ' cardinals / safe to spend sats )</small></small></alert>';
                                                                        results+= '<div class="row"><div class="col-sm-3"></div><div class="col-sm-6"><div class="qr-holder" data-content="' + inscription.data.address + '"></div></div><div class="col-sm-3"></div></div><hr><pre>' + inscription.data.address + '</pre><div class="row"><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + inscription.data.address + '">COPY</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recover="1" data-form=".form-ordit-mint-inscription">RECOVER</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recover="0" data-form=".form-ordit-mint-inscription">RETRY</a></div></div>';
                                                                        saline.modal('Mint Warning', results);
                                                                    }
                                                                    else
                                                                    {
                                                                        saline.modal('Mint Warning', inscription.message);
                                                                    }
                                                                })
                                                            }
                                                            
                                                            function getBase64(file) 
                                                            {
                                                                var reader = new FileReader();
                                                                reader.onload = function () 
                                                                {
                                                                    var data = reader.result.split(':');
                                                                    var meta = data[1].split(';');
                                                                    var media_type = meta[0];
                                                                    var media_content = meta[1].split(',')[1];
                                                                    prepare_inscription(media_type, media_content);
                                                                    
                                                                }
                                                                reader.onerror = function (error) 
                                                                {
                                                                    saline.modal('Mint Error', 'Unable to read file');
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                            
                                                            getBase64(media);
                                                        });
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('Mint Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('Mint Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                if(name == password)
                {
                    saline.modal('Mint Warning', 'Name cannot match password');
                }
            }
        });
        jQuery('body').on('submit', '.' + sado, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var utxo = jQuery(form).find('#' + sado + '-0').val();
            var cardinals = parseInt(jQuery(form).find('#' + sado + '-1').val());
            
            var username = jQuery(form).find('#' + sado + '-2').val();
            var pin = jQuery(form).find('#' + sado + '-3').val();
            var password = jQuery(form).find('#' + sado + '-4').val();
            
            if
            (
                utxo && cardinals && pin
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'LISTING');
                
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');
                
                                                        ordit.sdk.sado.order({
                                                            seed: seed,
                                                            location: utxo,
                                                            cardinals: cardinals,
                                                            network: saline.db.db.defaults.network,
                                                            instant: true
                                                        },  function(order)
                                                        {
                                                            if(order.success)
                                                            {
                                                                var txid = order.data.txid;
                                                                var results = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                                                saline.modal('Success', results);
                                                            }
                                                            else
                                                            {
                                                                saline.modal('List Warning', order.message);
                                                            }
                                                        });
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('List Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                                else
                                {
                                    saline.modal('List Warning', 'Unable to verify DNS data');
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('List Warning', 'Unable to verify DNS entry');
                    }
                });
            }
        });
        jQuery('body').on('submit', '.' + send, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var destination = jQuery(form).find('#' + send + '-0').val();
            var send_type = jQuery(form).find('#' + send + '-1').val();
            var value = jQuery(form).find('#' + send + '-2').val();
            var username = jQuery(form).find('#' + send + '-3').val();
            var pin = jQuery(form).find('#' + send + '-4').val();
            var password = jQuery(form).find('#' + send + '-5').val();
            
            if
            (
                destination && value && send_type && pin
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'SENDING');
                
                // cardinals only support for now ...
                var cardinals = 0;
                var specific_unspent = false;
                
                if(send_type == 'cardinals')
                {
                    cardinals = parseInt(value);
                }
                else if(send_type == 'unspent')
                {
                    specific_unspent = value;
                }
                
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');

                                                        // All formats
                                                        // All networks 

                                                        var tweaked = false;
                                                        var format = saline.db.wallet.addresses[0].format;
                                                        if(format == 'taproot') tweaked = true;
                                                        
                                                        var psbt_options = 
                                                        {
                                                            seed: seed,
                                                            ins: [{address: saline.db.wallet.addresses[0].address}],
                                                            outs: [{
                                                                address: destination,
                                                                cardinals: cardinals
                                                            }],
                                                            network: saline.db.db.defaults.network
                                                        };
                                                        
                                                        if(send_type == 'unspent')
                                                        {
                                                            psbt_options.outs[0].cardinals = 0;
                                                            psbt_options.outs[0].location = specific_unspent;
                                                        }
                                                        
                                                        psbt_options.format = 'p2tr';
                                                        
                                                        ordit.sdk.psbt.get(psbt_options, function(tx)
                                                        {
                                                            if(tx.success)
                                                            {
                                                                ordit.sdk.psbt.sign({
                                                                    seed: seed, 
                                                                    hex: tx.data.hex,
                                                                    network: saline.db.db.defaults.network,
                                                                    tweaked: tweaked
                                                                }, 
                                                                function(signed)
                                                                {
                                                                    if
                                                                    (
                                                                        signed.success
                                                                        && typeof signed.data.hex != 'undefined'
                                                                        && signed.data.hex
                                                                    )
                                                                    {

                                                                        ordit.sdk.txid.get({
                                                                            hex: signed.data.hex,
                                                                            network: saline.db.db.defaults.network
                                                                        }, 
                                                                        function(relayed)
                                                                        {
                                                                            if(relayed.success)
                                                                            {
                                                                                var txid = relayed.data.txid;
                                                                                var results = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                                                                saline.modal('Success', results);
                                                                            }
                                                                            else
                                                                            {
                                                                                saline.modal('Send Warning', 'Unable to relay TX');
                                                                            }
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        saline.modal('Send Warning', 'Unable to sign PSBT');
                                                                    }
                                                                });
                                                            }
                                                            else
                                                            {
                                                                saline.modal('Send Warning', 'Unable to construct PSBT: ' + tx.message);
                                                            }
                                                        });
                                                    }
                                                );
                                            }
                                            else
                                            {
                                                saline.modal('Send Warning', 'Unable to decrypt DNS data');
                                            }
                                        }
                                    );
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        saline.modal('Send Warning', 'Unable to verify DNS data');
                    }
                });
            }
            else
            {
                if(name == password)
                {
                    saline.modal('Send Warning', 'Name cannot match password');
                }
            }
        });
        jQuery('body').on('submit', '.' + chunk, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var recovered = parseInt(jQuery(this).attr('data-recover'));
            var destination = jQuery(form).find('#' + chunk + '-0').val();
            var file = false;
            var jmeta = jQuery(form).find('#' + chunk + '-2').val();
            var meta_format = jQuery(form).find('#' + chunk + '-3').val();
            var parent_id = jQuery(form).find('#' + chunk + '-4').val();
            var username = jQuery(form).find('#' + chunk + '-5').val();
            var pin = jQuery(form).find('#' + chunk + '-6').val();
            var password = jQuery(form).find('#' + chunk + '-7').val();
            
            var postage = 10000;
            var change_address = saline.db.wallet.addresses[0].address;
            
            if(saline.db.browser === true)
            {
                file = jQuery(form).find('#' + chunk + '-1').val();
            }
            else
            {
                try
                {
                    file = jQuery(form).find('#' + chunk + '-1')[0].files[0];
                }
                catch(e){}
            }
            
            var user_meta = false;
            if(jmeta)
            {
                try
                {
                    user_meta = JSON.parse(jmeta);
                }
                catch(e){}
            }
            
            if(!destination)
            {
                destination = saline.db.wallet.addresses[0].address;
            }
            
            var chunks_prepared = function(mt, chunks, seed)
            {   
                if
                (
                    mt && seed 
                    && typeof chunks == 'object' 
                    && chunks.length > 1 && chunks.length < 13
                )
                {
                    var relevant_ids = [];
                    
                    for(c = 0; c < chunks.length; c++)
                    {
                        if
                        (
                            (
                                typeof chunks[c].relayed == 'object'
                                && typeof chunks[c].relayed.success != 'undefined'
                                && chunks[c].relayed.success === true
                                && typeof chunks[c].relayed.data != 'undefined'
                            )
                            ||
                            (
                                typeof chunks[c].inscription != 'undefined'
                            )
                        )
                        {
                            relevant_ids.push(chunks[c]);
                        }
                    }
                    
                    if(relevant_ids.length == chunks.length)
                    {   
                        function compare( a, b ) {
                          if ( a.i < b.i ){
                            return -1;
                          }
                          if ( a.i > b.i ){
                            return 1;
                          }
                          return 0;
                        }
                        relevant_ids.sort( compare );
                        
                        var iids = [];
                        var correct_set = true;
                        var first_length = relevant_ids[0].l;
                        var total_pieces = relevant_ids.length;
                        
                        for(l = 0; l < relevant_ids.length; l++)
                        {
                            if
                            (
                                relevant_ids[l].l != first_length
                                || relevant_ids[l].t != total_pieces
                            )
                            {
                                correct_set = false;
                            }
                            else
                            {
                                if
                                (
                                    typeof relevant_ids[l].relayed == 'object'
                                    && relevant_ids[l].relayed.success
                                )
                                {
                                    iids.push(relevant_ids[l].relayed.data);
                                }
                                else
                                {
                                    iids.push(relevant_ids[l].inscription);
                                }
                            }
                        }
                        
                        if(correct_set)
                        {
                            var oip_meta = 
                            {
                                type: "base64"
                            };
                            if(user_meta)
                            {
                                oip_meta = user_meta;
                            }
                            var meta = 
                            {
                                p: "chunks",
                                v: 1,
                                mt: mt,
                                iids: iids,
                                meta: oip_meta
                            };
                            
                            // Trump Testnet = f991d5d7b7996eda3de8b5b97f8d143724e13519d0782b84d437667fedb095fei0
                            // Play Icon Testnet = 2b1b77036443d2d13bc93b07a245725953c20ef78342a1c26917d8b64211fd61i0
                            
                            var setup_files = 
                            {
                                regtest:
                                {
                                    css: '721b3583d9aa31bb9980fe6354d36457a3361488bf3e20dace6452677ea73ec4i0', // needs updating for audio and images
                                    js: '803b4f185bdb0893a674598df1cdb06d84fa8b7afbff49dde86337e16351754bi0' // needs updating for audio and images
                                },
                                testnet:
                                {
                                    css: 'a9c87fcddd837bf0c59cd68363f89c9aa4c4790283980ce6ad434db4806c6068i0',
                                    js: '38cd031bc8e31397d0b81f26f8ad7cb64d928e4ccb01fddb7af53f94ff33ee0ai0'
                                },
                                mainnet:
                                {
                                    css: 'XXX',
                                    js: 'XXX'
                                }
                            }
                            
                            var renderer = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /><title>OIP4 RENDERER</title><link rel="stylesheet" href="/content/' + setup_files[saline.db.db.defaults.network].css + '" crossorigin="anonymous"></head><body class="loading" data-text="LOADING" id="main-body" ';
                            renderer+= "data-oip4='";
                            renderer+= JSON.stringify(meta);
                            renderer+= "'>";
                            renderer+= '<div class="oip4-renderer">OIP4</div></body><script src="/content/' + setup_files[saline.db.db.defaults.network].js + '" crossorigin="unsafe"></script></html>';
                            
                            var based_render = Buffer.from(renderer, 'utf8').toString('base64');
                            
                            ordit.sdk.inscription.address({
                                seed: seed,
                                media_content: based_render,
                                media_type: 'text/html;charset=utf-8',
                                network: saline.db.db.defaults.network,
                                meta: meta
                            },  function(commit)
                            {
                                if(commit.success)
                                {
                                    ordit.sdk.inscription.psbt({
                                        seed: seed,
                                        media_content: based_render,
                                        media_type: 'text/html;charset=utf-8',
                                        destination: destination,
                                        change_address: change_address,
                                        fees: commit.data.fees,
                                        network: saline.db.db.defaults.network,
                                        meta: meta,
                                        recovery: false
                                    },  function(reveal)
                                    {
                                        if(reveal.success)
                                        {
                                            var tweaked = false;

                                            ordit.sdk.psbt.sign({
                                                seed: seed, 
                                                hex: reveal.data.hex,
                                                network: saline.db.db.defaults.network,
                                                tweaked: tweaked
                                            }, 
                                            function(signed)
                                            {
                                                if(signed.success)
                                                {
                                                    ordit.sdk.apis.relay({
                                                        hex: signed.data.hex,
                                                        network: saline.db.db.defaults.network
                                                    }, 
                                                    function(relayed)
                                                    {
                                                        if(relayed.success)
                                                        {
                                                            var txid = relayed.data;
                                                            var results = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                                            saline.modal('Success', results);
                                                        }
                                                        else
                                                        {
                                                            saline.modal('Chunking Error', relayed.message);
                                                        }
                                                    });
                                                }
                                                else
                                                {
                                                    saline.modal('Chunking Error', signed.message);
                                                }
                                            });
                                        }
                                        else
                                        {
                                            var sats = (commit.data.fees + postage);
                                            var btc = parseFloat(sats / (10 ** 8));
                                            var results = '<alert class="alert alert-block alert-info"><small style="text-transform: uppercase;">' + reveal.message + '<hr>Requires single <b>spendable</b> of ' + btc + ' BTC<br /><small>( ' + sats + ' cardinals / safe to spend sats )</small></small></alert>';
                                            results+= '<div class="row"><div class="col-sm-3"></div><div class="col-sm-6"><div class="qr-holder" data-content="' + commit.data.address + '"></div></div><div class="col-sm-3"></div></div><hr><pre>' + commit.data.address + '</pre><div class="row"><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + commit.data.address + '">COPY</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recover="1" data-form=".form-ordit-wallet-inscribe">RECOVER</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recoer="0" data-form=".form-ordit-wallet-chunk">RETRY</a></div></div>';
                                            saline.modal('Chunking Confirmation', results);
                                        }
                                    });
                                }
                                else
                                {
                                    saline.modal('Chunking Error', commit.message);
                                }
                            });
                        }
                        else
                        {
                            saline.modal('Chunking Error', 'These chunks are not a valid set');
                        }
                    }
                    else
                    {
                        var results = '<alert class="alert alert-block alert-info">';
                        results+= '<small>';
                        results+= 'FILE FIRST NEEDS TO BE SPLIT INTO ' + chunks.length;
                        results+= '<hr><a href="#" class="btn btn-primary btn-retry-form" data-recoer="0" data-form=".form-ordit-wallet-chunk">RETRY</a>'
                        results+= '</small>';
                        results+= '</alert>';

                        results+= '<hr><div class="row">';

                        var css = 'col-md-6';
                        if(chunks.length % 3 == 0)
                        {
                            css = 'col-md-4';
                        }

                        for(c = 0; c < chunks.length; c++)
                        {   
                            var address = chunks[c].commit.data.address;
                            var sats = (chunks[c].commit.data.fees + postage);
                            var btc = parseFloat(sats / (10 ** 8));
                            
                            var msg = 'THIS CHUNK HAS BEEN PREPARED ';
                            msg+= '<small>Genesis ID:</small>';
                            
                            if
                            (
                                (
                                    typeof chunks[c].relayed == 'object'
                                    && typeof chunks[c].relayed.success != 'undefined'
                                    && chunks[c].relayed.success === true
                                    && typeof chunks[c].relayed.data != 'undefined'
                                )
                                ||
                                typeof chunks[c].inscription != 'undefined'
                            )
                            {
                                // Prepared message
                            }
                            else
                            {
                                if(typeof chunks[c].reveal == 'object')
                                {
                                    msg = chunks[c].reveal.message;
                                }
                            }
                            
                            results+= '<div class="' + css + '">';
                            
                            if
                            (
                                (
                                    typeof chunks[c].relayed == 'object'
                                    && typeof chunks[c].relayed.success != 'undefined'
                                    && chunks[c].relayed.success === true
                                    && typeof chunks[c].relayed.data != 'undefined'
                                )
                                ||
                                typeof chunks[c].inscription != 'undefined'
                            )
                            {
                                var genesis_id = false;
                                if(typeof chunks[c].inscription != 'undefined')
                                {
                                    genesis_id = chunks[c].inscription;
                                }
                                else
                                {
                                    genesis_id = chunks[c].relayed.data + 'i0';
                                }
                                
                                results+= '<alert class="alert alert-block alert-success"><small style="text-transform: uppercase;">' + msg + '</small></alert>';
                                
                                results+= '<div class="row"><div class="col-sm-12"><div class="qr-holder" data-content="' + genesis_id + '"></div></div></div><hr><pre>' + genesis_id + '</pre><div class="row"><div class="col-sm-12"><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + genesis_id + '">COPY</a></div></div>';
                            }
                            else
                            {
                                results+= '<alert class="alert alert-block alert-info"><small style="text-transform: uppercase;">Requires single <b>spendable</b> <small><br />' + sats + ' sats</small></small></alert>';
                                results+= '<div class="row"><div class="col-sm-12"><div class="qr-holder" data-content="' + address + '"></div></div></div><hr><pre>' + address + '</pre><div class="row"><div class="col-sm-12"><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + address + '">COPY</a></div></div>';
                            }
                            results+= '</div>';
                        }

                        results+= '</div>'; // row

                        saline.modal('Chunked OIP4 Data', results);
                    }
                }
                else
                {
                    saline.modal('Chunk Warning', 'Unable to chunk or not needed');
                }
            }
            
            function getBase64(file, seed) 
            {
                var reader = new FileReader();
                reader.onload = function () 
                {
                    var data = reader.result.split(':');
                    var meta = data[1].split(';');
                    var media_type = meta[0];
                    var media_content = meta[1].split(',')[1];
                    
                    var chunks = media_content.match(/.{1,350000}/g);

                    var chunk_objects = [];
                    for(c = 0; c < chunks.length; c++)
                    {
                        chunk_objects.push({
                            i: c,
                            t: chunks.length,
                            l: media_content.length,
                            d: chunks[c]
                        })
                    }
                    
                    var chunked = [];
                    
                    jQuery.each(chunk_objects, function(co)
                    {
                        var original_chunk = JSON.parse(JSON.stringify(chunk_objects[co]));
                        var chunk = chunk_objects[co];
                        
                        ordit.sdk.inscription.address({
                            seed: seed,
                            media_content: JSON.stringify(original_chunk),
                            media_type: 'application/json;charset=utf-8',
                            network: saline.db.db.defaults.network,
                            meta: false
                        },  function(commit)
                        {
                            if(commit.success)
                            {
                                chunk.commit = commit;
                                chunk.postage = postage;
                                
                                // TODO - check if revealed already?
                                
                                ordit.sdk.apis.transactions({
                                    address: commit.data.address,
                                    network: saline.db.db.defaults.network
                                },  function(transactions)
                                {
                                    
                                    var got_inscription = false;
                                    if
                                    (
                                        transactions.success
                                        && typeof transactions.data == 'object'
                                        && typeof transactions.data.transactions == 'object'
                                        && transactions.data.transactions.length > 0
                                    )
                                    {
                                        var txs = transactions.data.transactions;
                                        for(t = 0; t < txs.length; t++)
                                        {
                                            if(txs[t].vout[0].inscriptions.length === 1)
                                            {
                                                got_inscription = txs[t].vout[0].inscriptions[0].id;
                                            }
                                        }
                                    }
                                    
                                    if(got_inscription)
                                    {
                                        chunk.inscription = got_inscription;
                                        chunked.push(chunk);
                                        if(chunked.length == chunk_objects.length)
                                        {
                                            chunks_prepared(media_type, chunked, seed);
                                        }
                                    }
                                    else
                                    {
                                        ordit.sdk.inscription.psbt({
                                            seed: seed,
                                            media_content: JSON.stringify(original_chunk),
                                            media_type: 'application/json;charset=utf-8',
                                            destination: destination,
                                            change_address: change_address,
                                            fees: chunk.commit.data.fees,
                                            network: saline.db.db.defaults.network,
                                            meta: false,
                                            recovery: false
                                        },  function(reveal)
                                        {
                                            chunk.reveal = reveal;

                                            if(reveal.success)
                                            {
                                                var tweaked = false;

                                                ordit.sdk.psbt.sign({
                                                    seed: seed, 
                                                    hex: reveal.data.hex,
                                                    network: saline.db.db.defaults.network,
                                                    tweaked: tweaked
                                                }, 
                                                function(signed)
                                                {
                                                    chunk.signed = signed;

                                                    if(signed.success)
                                                    {
                                                        ordit.sdk.apis.relay({
                                                            hex: signed.data.hex,
                                                            network: saline.db.db.defaults.network
                                                        }, 
                                                        function(relayed)
                                                        {
                                                            chunk.relayed = relayed;

                                                            chunked.push(chunk);
                                                            if(chunked.length == chunk_objects.length)
                                                            {
                                                                chunks_prepared(media_type, chunked, seed);
                                                            }
                                                        });
                                                    }
                                                    else
                                                    {
                                                        chunked.push(chunk);
                                                        if(chunked.length == chunk_objects.length)
                                                        {
                                                            chunks_prepared(media_type, chunked, seed);
                                                        }
                                                    }
                                                });
                                            }
                                            else
                                            {
                                                chunked.push(chunk);
                                                if(chunked.length == chunk_objects.length)
                                                {
                                                    chunks_prepared(media_type, chunked, seed);
                                                }
                                            }
                                        });
                                    }
                                })
                            }
                            else
                            {
                                saline.modal('Chunk Warning', 'Unable to generate chunk addresses');
                            }
                        });
                    });
                }
                reader.onerror = function (error) 
                {
                    saline.modal('Inscribe Error', 'Unable to read file');
                };
                reader.readAsDataURL(file);
            }
            
            if
            (
                destination && pin && file
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'INSCRIBING');
                
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        async function recover()
                        {
                            var salt = username + '_' + pin + '_' + password;
                            var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                            var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                            var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                            saline.sodium.keys(user_secret, function(user_keys)
                            {
                                if(user_keys)
                                {   
                                    saline.sodium.decrypt
                                    (
                                        dns,
                                        user_keys, 
                                        async function(decrypted_personal_salt)
                                        {
                                            if(decrypted_personal_salt)
                                            { 
                                                var data = saline.db.db.salt;
                                                saline.sodium.decrypt
                                                (
                                                    data,
                                                    user_keys, 
                                                    async function(decrypted_device_salt)
                                                    {
                                                        var ds = decrypted_device_salt;
                                                        var ps = decrypted_personal_salt;
                                                        var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                        var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                        var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                        var seed = await bip39.mnemonicToEntropy(bip).toString('hex');
                                                        
                                                        getBase64(file, seed);
                                                    }
                                                );
                                            }
                                            else
                                            {

                                            }
                                        }
                                    );
                                }
                                else
                                {

                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        
                    }
                });
            }   
        });
        jQuery('body').on('submit', '.' + inscribe, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var recovered = parseInt(jQuery(this).attr('data-recover'));
            var destination = jQuery(form).find('#' + inscribe + '-0').val();
            var file = false;
            var jmeta = jQuery(form).find('#' + inscribe + '-2').val();
            var meta_format = jQuery(form).find('#' + inscribe + '-3').val();
            var parent_id = jQuery(form).find('#' + inscribe + '-4').val();
            var parent_location = jQuery(form).find('#' + inscribe + '-5').val();
            var username = jQuery(form).find('#' + inscribe + '-6').val();
            var pin = jQuery(form).find('#' + inscribe + '-7').val();
            var password = jQuery(form).find('#' + inscribe + '-8').val();
            
            var parent_txid = false;
            var parent_vout = 0;
            if(parent_location)
            {
                try
                {
                    var locs = parent_location.split(':');
                    if(locs.length == 2)
                    {
                        parent_txid = locs[0];
                        parent_vout = locs[1];
                    }
                }
                catch(e){}
            }
            
            if(saline.db.browser === true)
            {
                file = jQuery(form).find('#' + inscribe + '-1').val();
            }
            else
            {
                try
                {
                    file = jQuery(form).find('#' + inscribe + '-1')[0].files[0];
                }
                catch(e){}
            }
            
            if(!destination)
            {
                destination = saline.db.wallet.addresses[0].address;
            }
            
            if
            (
                destination && pin && file
                && username && password
                && username != password
            )
            {
                saline.loader(true, 'INSCRIBING');
                
                ordit.sdk.dnkeys(username, function(dnkeys)
                {   
                    if(typeof dnkeys["saline-salt"] != 'undefined')
                    {
                        var dns = dnkeys["saline-salt"];
                        
                        function getBase64(file) 
                        {
                            var reader = new FileReader();
                            reader.onload = function () 
                            {
                               var data = reader.result.split(':');
                               var meta = data[1].split(';');
                               var media_type = meta[0];
                               var media_content = meta[1].split(',')[1];
                               
                               async function recover()
                               {
                                    var salt = username + '_' + pin + '_' + password;
                                    var hash = bitcointp.crypto.sha256(Buffer.from(salt), 'utf8').toString('hex');
                                    var m = bip39.entropyToMnemonic(Buffer.from(hash, 'hex'), bip39.wordlists.english);
                                    var user_secret = await bip39.mnemonicToEntropy(m).toString('hex');

                                    saline.sodium.keys(user_secret, function(user_keys)
                                    {
                                        if(user_keys)
                                        {   
                                            saline.sodium.decrypt
                                            (
                                                dns,
                                                user_keys, 
                                                async function(decrypted_personal_salt)
                                                {
                                                    if(decrypted_personal_salt)
                                                    { 
                                                        var data = saline.db.db.salt;
                                                        saline.sodium.decrypt
                                                        (
                                                            data,
                                                            user_keys, 
                                                            async function(decrypted_device_salt)
                                                            {
                                                                var ds = decrypted_device_salt;
                                                                var ps = decrypted_personal_salt;
                                                                var secret = ds + '_' + salt + '_' + ps + '_' + username + '_' + password;
                                                                var hashed = bitcointp.crypto.sha256(Buffer.from(secret), 'utf8').toString('hex');
                                                                var bip = bip39.entropyToMnemonic(Buffer.from(hashed, 'hex'), bip39.wordlists.english);
                                                                var seed = await bip39.mnemonicToEntropy(bip).toString('hex');

                                                                var inscription_meta = false;
                                                                if(jmeta)
                                                                {
                                                                    try
                                                                    {
                                                                        var jd = JSON.parse(jmeta);
                                                                        if(typeof jd == 'object')
                                                                        {
                                                                            inscription_meta = jd;
                                                                        }
                                                                    }
                                                                    catch(e){}
                                                                }
                                                                
                                                                if
                                                                (
                                                                    media_type.indexOf('text') > -1
                                                                    || media_type.indexOf('json') > -1
                                                                )
                                                                {
                                                                    media_content = Buffer.from(media_content, 'base64').toString('utf8');
                                                                }

                                                                ordit.sdk.inscription.address({
                                                                    seed: seed,
                                                                    media_content: media_content,
                                                                    media_type: media_type,
                                                                    network: saline.db.db.defaults.network,
                                                                    meta: inscription_meta,
                                                                    meta_format: meta_format,
                                                                    parent_txid: parent_txid,
                                                                    parent_id: parent_id,
                                                                    parent_vout: parent_vout
                                                                },  function(commit)
                                                                {

                                                                    var postage = 10000;

                                                                    var change_address = saline.db.wallet.addresses[0].address;

                                                                    if(commit.success)
                                                                    {
                                                                        ordit.sdk.inscription.psbt({
                                                                            seed: seed,
                                                                            media_content: media_content,
                                                                            media_type: media_type,
                                                                            destination: destination,
                                                                            change_address: change_address,
                                                                            fees: commit.data.fees,
                                                                            network: saline.db.db.defaults.network,
                                                                            meta: inscription_meta,
                                                                            meta_format: meta_format,
                                                                            recovery: recovered,
                                                                            parent_txid: parent_txid,
                                                                            parent_id: parent_id,
                                                                            parent_vout: parent_vout
                                                                        },  function(reveal)
                                                                        {
                                                                            if(reveal.success)
                                                                            {
                                                                                var tweaked = false;
                                                                                //var format = saline.db.wallet.addresses[0].format;
                                                                                //if(format == 'taproot') tweaked = true;
                                                                                
                                                                                if(recovered)
                                                                                {
                                                                                    //tweaked = true;
                                                                                }

                                                                                ordit.sdk.psbt.sign({
                                                                                    seed: seed, 
                                                                                    hex: reveal.data.hex,
                                                                                    network: saline.db.db.defaults.network,
                                                                                    tweaked: tweaked
                                                                                }, 
                                                                                function(signed)
                                                                                {

                                                                                    if(signed.success)
                                                                                    {
                                                                                        ordit.sdk.txid.get({
                                                                                            hex: signed.data.hex,
                                                                                            network: saline.db.db.defaults.network
                                                                                        }, 
                                                                                        function(relayed)
                                                                                        {
                                                                                            if(relayed.success)
                                                                                            {
                                                                                                var txid = relayed.data.txid;
                                                                                                var results = '<alert class="alert alert-block alert-info"><small>Transaction ID:<br /><pre>' + txid + '</pre></small></alert>';
                                                                                                saline.modal('Success', results);
                                                                                            }
                                                                                            else
                                                                                            {
                                                                                                saline.modal('Inscribe Error', 'Unable to relay commit');
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        saline.modal('Inscribe Error', 'Unable to sign commit');
                                                                                    }
                                                                                });
                                                                            }
                                                                            else
                                                                            {
                                                                                var sats = (commit.data.fees + postage);
                                                                                var btc = parseFloat(sats / (10 ** 8));
                                                                                var results = '<alert class="alert alert-block alert-info"><small style="text-transform: uppercase;">' + reveal.message + '<hr>Requires single <b>spendable</b> of ' + btc + ' BTC<br /><small>( ' + sats + ' cardinals / safe to spend sats )</small></small></alert>';
                                                                                results+= '<div class="row"><div class="col-sm-3"></div><div class="col-sm-6"><div class="qr-holder" data-content="' + commit.data.address + '"></div></div><div class="col-sm-3"></div></div><hr><pre>' + commit.data.address + '</pre><div class="row"><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + commit.data.address + '">COPY</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recover="1" data-form=".form-ordit-wallet-inscribe">RECOVER</a></div><div class="col-sm-4"><a href="#" class="btn btn-block btn-primary btn-retry-form" data-recoer="0" data-form=".form-ordit-wallet-inscribe">RETRY</a></div></div>';
                                                                                saline.modal('Inscribe Error', results);
                                                                            }
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        saline.modal('Inscribe Error', 'Unable to commit: ' + commit.message);
                                                                    }
                                                                });
                                                            }
                                                        );
                                                    }
                                                    else
                                                    {
                                                        saline.modal('Inscribe Error', 'Invalid credentials');
                                                    }
                                                }
                                            );
                                        }
                                        else
                                        {
                                            saline.modal('Inscribe Error', 'Invalid credentials');
                                        }
                                    });
                                }
                               recover();
                           };
                           reader.onerror = function (error) 
                           {
                               saline.modal('Inscribe Error', 'Unable to read file');
                           };
                           reader.readAsDataURL(file);
                        }

                        if(saline.db.browser === true)
                        {
                            var callback = function(res)
                            {
                                if(res)
                                {
                                    file = window.URL.createObjectURL(res);
                                    getBase64(file);
                                }
                            }
                            fetch
                            (
                                file, 
                                {
                                    method: 'GET'
                                }
                            )
                            .then(response => res.blob())
                            .then(response => callback(response))
                            .catch(response => callback(false))
                        }
                        else
                        {
                            getBase64(file);
                        }
                    }
                    else
                    {
                        saline.modal('Send Warning', 'DNS setup is not complete?');
                    }
                })
            }
            else
            {
                if(name == password)
                {
                    saline.modal('Send Warning', 'Name cannot match password');
                }
            }
        });
        jQuery('body').on('submit', '.' + lost, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var required_shard = jQuery(form).find('#' + lost + '-0').val();
            var optional_shard = jQuery(form).find('#' + lost + '-1').val();
            var shard_type = jQuery(form).find('#' + lost + '-2').val();
            if
            (
                required_shard && shard_type
                && required_shard != optional_shard
            )
            {
                var got_user_shards = function(collected_shards)
                {
                    var credentials = false;
                    try
                    {
                        var data = secrets.hex2str(secrets.combine(collected_shards)).split('_');
                        credentials = 
                        {
                            username: data[0],
                            pin: data[1],
                            password: data[2]
                        };
                    }
                    catch(e){}
                    
                    if
                    (
                        typeof credentials == 'object'
                        && typeof credentials.username != 'undefined'
                        && typeof credentials.pin != 'undefined'
                        && typeof credentials.password != 'undefined'
                    )
                    {
                        var results = '<alert class="alert alert-block alert-info">';
                        results+= '<small>SENSITIVE DATA TO BE REVEALED</small>';
                        results+= '</alert>';
                        
                        
                        results+= '<div class="row mb-3"><label for="reveal-username" class="col-sm-3 col-form-label">Username</label><div class="col-sm-9"><input type="password" id="reveal-username" value="' + credentials.username + '" class="form-control" readonly="readonly" /></div></div>';
                        results+= '<div class="row mb-3"><label for="reveal-username" class="col-sm-3 col-form-label">PIN</label><div class="col-sm-9"><input type="password" id="reveal-pin" value="' + credentials.pin + '" class="form-control" readonly="readonly" /></div></div>';
                        results+= '<div class="row mb-3"><label for="reveal-username" class="col-sm-3 col-form-label">Password</label><div class="col-sm-9"><input type="password" id="reveal-password" value="' + credentials.password + '" class="form-control" readonly="readonly" /></div></div>';
                        
                        results+= '<hr><a href="#" class="btn btn-block btn-danger btn-toggle-reveals">REVEAL HIDDEN CREDENTIALS</a>';
                        
                        saline.modal('Recovered Credentials', results);
                    }
                    else
                    {
                        saline.modal('Lost Credential Warning', 'Unable to reconstruct recovery shards');
                    }
                        
                }
                
                var got_personal_shards = function(collected_shards)
                {
                    var credentials = false;
                    try
                    {
                        var data = secrets.hex2str(secrets.combine(collected_shards));
                        
                        function hasUnicode (str) {
                            for (var i = 0; i < str.length; i++) {
                                if (str.charCodeAt(i) > 127) return true;
                            }
                            return false;
                        }
                        if(!hasUnicode(data))
                        {
                            credentials = 
                            {
                                dns: data
                            };
                        }
                    }
                    catch(e){}
                    
                    if
                    (
                        typeof credentials == 'object'
                        && typeof credentials.dns != 'undefined'
                    )
                    {
                        var results = '<alert class="alert alert-block alert-info">';
                        results+= '<small>SENSITIVE DATA TO BE REVEALED</small>';
                        results+= '</alert>';
                        
                        
                        results+= '<div class="row mb-3"><label for="reveal-dns" class="col-sm-3 col-form-label">Username</label><div class="col-sm-9"><input type="password" id="reveal-dns" value="' + credentials.dns + '" class="form-control" readonly="readonly" /></div></div>';
                        
                        results+= '<hr><a href="#" class="btn btn-block btn-danger btn-toggle-reveals">REVEAL HIDDEN CREDENTIALS</a>';
                        
                        saline.modal('Recovered DNS Record', results);
                    }
                    else
                    {
                        saline.modal('Lost Credential Warning', 'Unable to reconstruct recovery shards');
                    }
                        
                }
                var shards = [];
                shards.push(required_shard);
                if(optional_shard)
                {
                    shards.push(optional_shard);
                    if(shard_type == 'user')
                    {
                        got_user_shards(shards);
                    }
                    else
                    {
                        got_personal_shards(shards);
                    }
                }
                else
                {
                    if(shard_type == 'user')
                    {
                        shards.push(saline.db.db.shards.user);
                        got_user_shards(shards);
                    }
                    else
                    {
                        shards.push(saline.db.db.shards.personal);
                        got_personal_shards(shards);
                    }
                }
            }
        });
        
        
        
        
        jQuery('body').on('submit', '.' + get, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var input = jQuery(form).find('#' + get + '-0').val();
            var network = jQuery(form).find('#' + get + '-1').val();
            var source = jQuery(form).find('#' + get + '-2').val();
            if
            (
                (
                    input && source
                )
                ||
                (
                    source == 'unisat'
                    || source == 'xverse'
                    || source == 'metamask'
                )
                && network 
            )
            {
                jQuery('body').addClass('loading');
                
                if
                (
                    source == 'seed' 
                    || source == 'bip39' 
                    || source == 'key' 
                    || source == 'unisat' 
                    || source == 'xverse'
                    || source == 'metamask'
                )
                {
                    var options = 
                    {
                        network: network
                    }
                    if(source == 'seed')
                    {
                        options.seed = input;
                    }
                    else if(source == 'bip39')
                    {
                        options.bip39 = input;
                    }
                    else if(source == 'key')
                    {
                        options.key = input;
                    }
                    else if(source == 'unisat' || source == 'xverse' || source == 'metamask')
                    {
                        options.connect = source;
                    }
                    ordit.sdk.wallet.get(options, function(results)
                    {
                        if(results.success)
                        {
                            var contents = '<alert class="alert alert-block alert-info">';
                                contents+= '<small>';
                                    contents+= 'ADDRESS'
                                    if(results.data.counts.addresses > 1)
                                    {
                                        contents+= 'ES (' + results.data.counts.addresses + ')';
                                        contents+= 'ES (' + results.data.counts.addresses + ')';
                                    }
                                    for(a = 0; a < results.data.counts.addresses; a++)
                                    {
                                        var format = 'External';
                                        try
                                        {
                                            var f = results.data.addresses[a].format;
                                            format = f.charAt(0).toUpperCase() + f.slice(1);
                                        }
                                        catch(e){}
                                        contents+= '<hr><pre>' + format + ': ' + results.data.addresses[a].address + '</pre>';
                                    }
                                contents+= '</small>';
                            contents+= '</alert>';
                            saline.modal('Results', contents);
                        }
                        else
                        {
                            saline.modal('Warning', results.message);
                        }
                    });
                }
            }
        });
        jQuery('body').on('submit', '.' + lookup, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var input = jQuery(form).find('#' + lookup + '-0').val();
            var network = jQuery(form).find('#' + lookup + '-1').val();
            var source = jQuery(form).find('#' + lookup + '-2').val();
            if
            (
                (
                    input && source
                )
                ||
                (
                    source == 'unisat'
                    || source == 'xverse'
                    || source == 'metamask'
                )
                && network 
            )
            {
                jQuery('body').addClass('loading');
                
                if
                (
                    source == 'seed' 
                    || source == 'bip39' 
                    || source == 'key' 
                    || source == 'unisat' 
                    || source == 'xverse'
                    || source == 'metamask'
                )
                {
                    var options = 
                    {
                        network: network
                    }
                    if(source == 'seed')
                    {
                        options.seed = input;
                    }
                    else if(source == 'bip39')
                    {
                        options.bip39 = input;
                    }
                    else if(source == 'key')
                    {
                        options.key = input;
                    }
                    else if(source == 'unisat' || source == 'xverse' || source == 'metamask')
                    {
                        options.connect = source;
                    }
                    ordit.sdk.balance.get(options, function(results)
                    {
                        if(results.success)
                        {
                            var contents = '<alert class="alert alert-block alert-info">';
                                contents+= '<small>';
                                    contents+= 'ADDRESS'
                                    if(results.data.counts.addresses > 1)
                                    {
                                        contents+= 'ES (' + results.data.counts.addresses + ')';
                                    }
                                    for(a = 0; a < results.data.counts.addresses; a++)
                                    {
                                        var c = results.data.addresses[a].counts;
                                        var format = 'External';
                                        try
                                        {
                                            var f = results.data.addresses[a].format;
                                            format = f.charAt(0).toUpperCase() + f.slice(1);
                                        }
                                        catch(e){}
                                        contents+= '<hr><pre>' + format + ': ' + results.data.addresses[a].address + '</pre>';
                                        contents+= '<pre>Satoshis: ' + c.satoshis.toLocaleString('en-GB') + ' | Cardinals: ' + c.cardinals.toLocaleString('en-GB') + '</pre>';
                                    }
                                contents+= '</small>';
                            contents+= '</alert>';
                            
                            contents+= '<div class="row">';
                                contents+= '<div class="col-sm-6">';
                                    contents+= '<hr><alert class="alert alert-block alert-info"><small>';
                                        contents+= 'Total Ordinals: ' + results.data.counts.ordinals;
                                    contents+= '</small></alert>';
                                contents+= '</div>';
                                contents+= '<div class="col-sm-6">';
                                    contents+= '<hr><alert class="alert alert-block alert-info"><small>';
                                        contents+= 'Total Inscriptions: ' + results.data.counts.inscriptions;
                                    contents+= '</small></alert>';
                                contents+= '</div>';
                            contents+= '</div>';
                            
                            for(i = 0; i < results.data.inscriptions.length; i++)
                            {
                                var ins = results.data.inscriptions[i];
                                contents+= '<hr><alert class="alert alert-block alert-info"><small>';
                                contents+= '<pre>Inscription ID: ' + ins.id + '</pre>';
                                if(ins.media_type.indexOf('image') > -1)
                                {
                                    contents+= '<img src="' + ins.media_content + '" class="img img-thumbnail img-responsive img-block" crossorigin="anonymous" />';
                                }
                                else if(ins.media_type.indexOf('video') > -1)
                                {
                                    contents+= '<video controls class="ordit-video" src="' + ins.media_content + '#t=0.1" type="' + ins.media_type + '" crossorigin="anonymous"></video>';
                                }
                                else if(ins.media_type.indexOf('audio') > -1)
                                {
                                    contents+= '<audio controls class="ordit-video" src="' + ins.media_content + '" type="' + ins.media_type + '" crossorigin="anonymous"></audio>';
                                }
                                else if(ins.media_type.indexOf('text') > -1)
                                {
                                    contents+= '<textarea class="form-control ordit-text" readonly="readonly" data-src="' + ins.media_content + '" crossorigin="anonymous" loading="lazy"></textarea>';
                                }
                                contents+= '</small></alert>';
                            }
                            
                            for(o = 0; o < results.data.ordinals.length; o++)
                            {
                                var ord = results.data.ordinals[o];
                                contents+= '<hr><alert class="alert alert-block alert-info"><small>';
                                contents+= 'Ordinal ID: ' + ord.number + ' | Name: ' + ord.name;
                                contents+= '<br />Rarity: ' + ord.rarity + ' | Size: ' + ord.size;
                                contents+= '</small></alert>';
                            }
                            
                            saline.modal('Results', contents);
                        }
                        else
                        {
                            saline.modal('Warning', results.message);
                        }
                    });
                }
            }
        });
        jQuery('body').on('submit', '.' + prepare, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var input = jQuery(form).find('#' + prepare + '-0').val();
            var network = jQuery(form).find('#' + prepare + '-1').val();
            var source = jQuery(form).find('#' + prepare + '-2').val();
            var to = jQuery(form).find('#' + prepare + '-4').val();
            var value = jQuery(form).find('#' + prepare + '-5').val();
            var asset = jQuery(form).find('#' + prepare + '-6').val();
            if
            (
                (
                    input && source
                )
                ||
                (
                    source == 'unisat'
                    || source == 'xverse'
                    || source == 'metamask'
                )
                && network && to && value
                &&
                (
                    asset == 'cardinals'
                )
            )
            {
                jQuery('body').addClass('loading');
                
                if
                (
                    source == 'seed' 
                    || source == 'bip39' 
                    || source == 'key' 
                    || source == 'unisat' 
                    || source == 'xverse'
                    || source == 'metamask'
                )
                {
                    var options = 
                    {
                        network: network
                    }
                    if(source == 'seed')
                    {
                        options.seed = input;
                    }
                    else if(source == 'bip39')
                    {
                        options.bip39 = input;
                    }
                    else if(source == 'key')
                    {
                        options.key = input;
                    }
                    else if(source == 'unisat' || source == 'xverse' || source == 'metamask')
                    {
                        options.connect = source;
                    }
                    if(asset == 'cardinals')
                    {
                        options.ins = [{ address: 'any' }]
                        options.outs = [{
                            address: to,
                            amount: parseInt(value)
                        }];
                    }
                    ordit.sdk.psbt.get(options, function(results)
                    {   
                        if(results.success)
                        {
                            var contents = '<alert class="alert alert-block alert-info">';
                                contents+= '<small>';
                                    contents+= 'UNSIGNED PSBT'
                                contents+= '</small>';
                            contents+= '</alert>';
                            contents+= '<hr>';
                            contents+= '<alert class="alert alert-block alert-info">';
                                contents+= '<small>';
                                    contents+= '<pre>Base64: ' + results.data.base64 + '</pre>';
                                    contents+= '<pre>Hex: ' + results.data.hex + '</pre>';
                                contents+= '</small>';
                            contents+= '</alert>';
                            
                            if(typeof results.data.inputs == 'object' && results.data.inputs.length > 0)
                            {
                                for(i = 0; i < results.data.inputs.length; i++)
                                {
                                    var ins = results.data.inputs[i];
                                    
                                    contents+= '<hr>';
                                    contents+= '<alert class="alert alert-block alert-info">';
                                        contents+= '<small>';
                                            contents+= '<pre>Address: ' + ins.address + '</pre>';
                                            contents+= '<pre>Signing Indexes: [';
                                            for(s = 0; s < ins.signingIndexes.length; s++)
                                            {
                                                if(s > 0)
                                                {
                                                    contents+= ', ';
                                                }
                                                contents+= '' + ins.signingIndexes[s];
                                            }
                                            contents+= ']';
                                        contents+= '</small>';
                                    contents+= '</alert>';
                                }
                            }
                            
                            saline.modal('Results', contents);
                        }
                        else
                        {
                            saline.modal('Warning', results.message);
                        }
                    });
                }
            }
        });
        jQuery('body').on('submit', '.' + sign, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var input = jQuery(form).find('#' + sign + '-0').val();
            var psbt = jQuery(form).find('#' + sign + '-1').val();
            var type = jQuery(form).find('#' + sign + '-2').val();
            var network = jQuery(form).find('#' + sign + '-3').val();
            var source = jQuery(form).find('#' + sign + '-4').val();
            if
            (
                (
                    input && source
                    &&
                    (
                        type == 'hex'
                        || type == 'base64'
                    )
                )
                ||
                (
                    source == 'unisat'
                    || source == 'xverse'
                    || source == 'metamask'
                )
                && network && psbt
            )
            {
                jQuery('body').addClass('loading');
                
                if
                (
                    source == 'seed' 
                    || source == 'bip39' 
                    || source == 'key' 
                    || source == 'unisat' 
                    || source == 'xverse'
                    || source == 'metamask'
                )
                {
                    var options = 
                    {
                        network: network
                    }
                    
                    if(type == 'hex')
                    {
                        options.hex = psbt;
                    }
                    else
                    {
                        options.base64 = psbt;
                    }
                    
                    if(source == 'seed')
                    {
                        options.seed = input;
                    }
                    else if(source == 'bip39')
                    {
                        options.bip39 = input;
                    }
                    else if(source == 'key')
                    {
                        options.key = input;
                    }
                    else if(source == 'unisat' || source == 'xverse' || source == 'metamask')
                    {
                        options.connect = source;
                    }
                    ordit.sdk.psbt.sign(options, function(results)
                    {
                        if(results.success)
                        {
                            var contents = '<alert class="alert alert-block alert-info">';
                                if(typeof results.data.psbt == 'object')
                                {
                                    contents+= '<small>UNFINALIZED PSBT</small>';
                                    contents+= '<hr><pre>Base64: ' + results.data.psbt.base64 + '</pre>';
                                    contents+= '<pre>Hex: ' + results.data.psbt.hex + '</pre>';
                                }
                                else
                                {
                                    contents+= '<small>FINALIZED RAW TX</small>';
                                    contents+= '<hr><pre>' + results.data.hex + '</pre>';
                                }
                            contents+= '</alert>';
                            saline.modal('Results', contents);
                        }
                        else
                        {
                            saline.modal('Warning', results.message);
                        }
                    });
                }
            }
        });
        jQuery('body').on('submit', '.' + relay, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var input = jQuery(form).find('#' + relay + '-0').val();
            var network = jQuery(form).find('#' + relay + '-1').val();
            if(input && network)
            {
                jQuery('body').addClass('loading');
                
                var options = 
                {
                    network: network,
                    hex: input
                }
                ordit.sdk.txid.get(options, function(results)
                {
                    if(results.success)
                    {
                        var contents = '<alert class="alert alert-block alert-info">';
                            contents+= '<small>TXID: <pre>' + results.data.txid + '</pre>';
                        contents+= '</alert>';
                        saline.modal('Results', contents);
                    }
                    else
                    {
                        saline.modal('Warning', results.message);
                    }
                });
            }
        });
    },
    init: function()
    {
        saline.markdown();
        //saline.mustache();
    },
    selects: function()
    {
        jQuery('body').on('change', 'select#form-ordit-switch-network-0', function(e)
        {
            var selected_network = jQuery(this).val();
            var current_network = saline.db.db.defaults.network;
            if(selected_network != current_network)
            {
                saline.loader(true, 'SWITCHING');
                
                saline.data.get(function(db)
                {
                    db.network = selected_network;
                    saline.data.update(db, function(db)
                    {   
                        setTimeout(function()
                        {
                            window.location.reload();
                        }, 150)
                    });
                });
            }
        });
    },
    buttons: function()
    {
        jQuery('body').on('click', '.btn-ordit-mint-more-tokens', function(e)
        {
            e.preventDefault();
            var button = jQuery(this);
            var tick = jQuery(button).attr('data-symbol');
            var limit = jQuery(button).attr('data-limit');
            jQuery('#form-ordit-mint-tokens-0').val(tick);
            jQuery('#form-ordit-mint-tokens-1').val(limit);
        });
        jQuery('body').on('click', '.btn-ordit-prepare-more-tokens', function(e)
        {
            e.preventDefault();
            var button = jQuery(this);
            var tick = jQuery(button).attr('data-symbol');
            var limit = jQuery(button).attr('data-limit');
            jQuery('#form-ordit-prepare-transfer-0').val(tick);
            jQuery('#ordit-preptoken-reserves').text(limit);
        });
        jQuery('body').on('click', '.btn-ordit-display-token-info', function(e)
        {
            e.preventDefault();
            var button = jQuery(this);
            var type = jQuery(button).attr('data-type');
            var tick = jQuery(button).attr('data-tick');
            var decimal = jQuery(button).attr('data-decimal');
            var balance = jQuery(button).attr('data-balance');
            var reserve = jQuery(button).attr('data-reserve');
            var amount = jQuery(button).attr('data-amount');
            var max = jQuery(button).attr('data-max');
            var remain = parseInt(jQuery(button).attr('data-remain'));
            var reserves = parseInt(jQuery(button).attr('data-available'));
            var transferable = parseInt(jQuery(button).attr('data-transferable'));
            var remaining = jQuery(button).attr('data-remaining');
            var inscription = jQuery(button).attr('data-inscription');
            var limit = jQuery(button).attr('data-limit');
            if(type && tick && decimal && balance && reserve && amount && max)
            {
                ordit.sdk.tokens.get({
                    address: saline.db.wallet.addresses[0].address,
                    symbol: tick,
                    transfers: true,
                    network: saline.db.db.defaults.network
                },  function(tokens)
                {
                    var contents = '<alert class="alert alert-block alert-info">';
                    contents+= '<small><strong>' + tick + '</strong> (' + type + ')</small>';
                    contents+= '<br /><small>Current Supply: ' + amount + '</small>';
                    contents+= '<br /><small>Maximum Supply: ' + max + '</small>';
                    if(remain)
                    {
                        contents+= '<br /><small>Mintable: ' + remaining + '</small>';
                    }
                    contents+= '<hr>';
                    contents+= '<small><strong><small>THIS WALLET</small></strong></small>';
                    contents+= '<br /><br /><strong>Reserves:</strong> ' + reserve;

                    if(reserves)
                    {
                        contents+= ' <small><a href="#" class="btn btn-sm btn-outline-light btn-ordit-prepare-more-tokens" data-symbol="' + tick + '" data-limit="' + reserves +'" data-bs-toggle="modal" data-bs-target="#ordit-preptoken-modal" style="margin-top:-7px;"><small>prepare transfers</small></a></small>';
                    }

                    contents+= '<br /><br /><strong>Transferable:</strong> ' + balance;
                    contents+= '</alert>';
                    
                    if
                    (
                        tokens.success 
                        && typeof tokens.data == 'object' 
                        && typeof tokens.data.transferables == 'object'
                    )
                    {
                        for(t = 0; t < tokens.data.transferables.length; t++)
                        {
                            var token = tokens.data.transferables[t];
                            contents+= '<hr><alert class="alert alert-block alert-info">';
                            contents+= '<small>Amount: ' + ordit.sdk.utils.float(token.amount, parseInt(decimal)) + ' ' + token.tick + ' <small><a href="#" class="btn btn-sm btn-primary btn-ordit-send-sat" data-unspent="' + token.from.txid + '" style="margin: -5px 0 0 5px;"><small>SEND</small></a></small></small>';
                            contents+= '</alert>';
                        }
                    }
                    
                    saline.modal(tick + ' Info', contents);
                })
            }
        });
        jQuery('body').on('click', '.btn-oip-meta', function(e)
        {
            e.preventDefault();
            var meta = [];
            var inscription = false;
            var id = jQuery(this).attr('data-id');
            for(i =0 ; i < saline.db.wallet.inscriptions.length; i++)
            {
                if
                (
                    saline.db.wallet.inscriptions[i].id == id
                    && typeof saline.db.wallet.inscriptions[i].meta == 'object'
                )
                {
                    inscription = saline.db.wallet.inscriptions[i];
                    jQuery.each(inscription.meta, function(k, v)
                    {
                        meta.push({
                            index: k,
                            value: v
                        });
                    });
                }
            }
            if(meta.length > 0)
            {
                var results = '<alert class="alert alert-block alert-info">';
                results+= '<small>OIP-1 META DATA<br />Location: <a href="#" class="btn btn-xs btn-sm btn-primary btn-ordit-copy" data-content="' + inscription.outpoint + '"><small>COPY</small></a></small><hr><small><pre>' + inscription.outpoint + '</pre></small>';
                results+= '</alert>';
                for(m = 0; m < meta.length; m++)
                {
                    results+= '<hr><alert class="alert alert-block">';
                    results+= '<strong>' + meta[m].index + '</strong>';
                    if(typeof meta[m].value == 'object')
                    {
                        results+= '<pre>' + JSON.stringify(meta[m].value) + '</pre>';
                    }
                    else
                    {
                        results+= '<pre>' + meta[m].value + '</pre>';
                    }
                    results+= '</alert>';
                }
                saline.modal('Meta Data', results);
            }
        });
        jQuery('body').on('click', '.btn-send-to-sado', function(e)
        {
            e.preventDefault();
            var utxo = jQuery(this).attr('data-txid');
            if(utxo)
            {
                var form = jQuery('#ordit-sado-modal').find('form');
                
                jQuery(form).find('#form-ordit-sado-list-0').val(utxo);
                
                var id = 'ordit-sado-modal';
                var el = document.getElementById(id);
                var modal = new bootstrap.Modal(el, {
                    keyboard: true,
                    backdrop: true,
                    focus: false
                });
                el.addEventListener('hidden.bs.modal', function (event)
                {

                });
                el.addEventListener('shown.bs.modal', function (event)
                {
                    saline.copy(id);
                });
                modal.show();
            }
        });
        jQuery('body').on('click', '.btn-ordit-confirm-send', function(e)
        {
            e.preventDefault();
            var txid = jQuery(this).attr('data-txid');
            if(txid)
            {
                var form = jQuery('#ordit-send-modal').find('form');
                jQuery(form).find('#form-ordit-wallet-send-1').val('unspent');
                jQuery(form).find('#form-ordit-wallet-send-2').val(txid);
                
                var id = 'ordit-send-modal';
                var el = document.getElementById(id);
                var modal = new bootstrap.Modal(el, {
                    keyboard: true,
                    backdrop: true,
                    focus: false
                });
                el.addEventListener('hidden.bs.modal', function (event)
                {

                });
                el.addEventListener('shown.bs.modal', function (event)
                {
                    saline.copy(id);
                });
                modal.show();
                
                //jQuery('#primary-send-button').trigger('click');
            }
        });
        jQuery('body').on('click', '.btn-ordit-send-sat', function(e)
        {
            e.preventDefault();
            var unspent = false;
            var un = jQuery(this).attr('data-unspent');
            for(u = 0; u < saline.db.wallet.addresses[0].unspents.length; u++)
            {
                if(saline.db.wallet.addresses[0].unspents[u].txid == un)
                {
                    unspent = saline.db.wallet.addresses[0].unspents[u];
                }
            }
            if(unspent)
            {
                unspent.value = ordit.sdk.utils.float(unspent.sats, 18);
                var results = '<alert class="alert alert-block alert-info"><strong>CURRENT SEND FUNCTIONALITY ONLY SUPPORTS SINGLE UNSPENTS, WHICH MAY CONTAIN MULTIPLE ORDINALS AND INSCRIPTIONS</strong><hr><small>Value: <strong>' + unspent.value + ' BTC</strong></small></alert>';
                
                if(typeof unspent.ordinals == 'undefined')
                {
                    unspent.ordinals = 
                    {
                        length: 'N/A'
                    };
                }
                
                if(unspent.safeToSpend)
                {
                    results+= '<hr><a href="#" class="btn btn-block btn-primary btn-ordit-confirm-send" data-txid="' + unspent.txid + ':' + unspent.n + '">CONFIRM TRANSACTION</a>';
                }
                else
                {
                    results+= '<hr><div class="row">';
                    results+= '<div class="col-sm-6"><alert class="alert alert-block alert-info"><small>Ordinals:</small><hr><strong>' + unspent.ordinals.length + '</strong></alert></div>';
                    results+= '<div class="col-sm-6"><alert class="alert alert-block alert-info"><small>Inscriptions:</small><hr><strong>' + unspent.inscriptions.length + '</strong></alert></div>';
                    results+= '</div>';
                    results+= '<hr><div class="row"><div class="col-sm-6"><a href="#" class="btn btn-block btn-outline-light btn-send-to-sado" data-txid="' + unspent.txid + ':' + unspent.n + '">LIST ON SADO</a></div><div class="col-sm-6"><a href="#" class="btn btn-block btn-outline-danger btn-ordit-confirm-send" data-txid="' + unspent.txid + ':' + unspent.n + '">CONFIRM TRANSACTION</a></div></div>';
                }
                
                saline.modal('Confirm Transaction', results);
            }
        });
        jQuery('body').on('click', '.btn-retry-form', function(e)
        {
            e.preventDefault();
            var target = jQuery(this).attr('data-form');
            var recover = parseInt(jQuery(this).attr('data-recover'));
            if(recover)
            {
                jQuery(target).attr('data-recover', '1');
            }
            else
            {
                jQuery(target).attr('data-recover', '0');
            }
            jQuery(target).trigger('submit');
        });
        jQuery('body').on('click', '.btn-toggle-reveals', function(e)
        {
            e.preventDefault();
            var wrapper = jQuery(this).parent();
            jQuery(wrapper).find('input.form-control').each(function(i)
            {
                var current_type = jQuery(this).attr('type');
                if(current_type == 'password')
                {
                    jQuery(this).attr('type', 'text');
                }
                else
                {
                    jQuery(this).attr('type', 'password');
                }
            });
        });
        jQuery('body').on('click', '.btn-ordit-ready', function(e)
        {
            e.preventDefault();
            var key = jQuery(this).attr('data-key');
            if(key)
            {
                saline.data.get(function(db)
                {
                    saline.data.update({provide: false}, function(error)
                    {
                        location.reload(true);
                    })
                });
            }
        });
        jQuery('body').on('click', '.btn-ordit-qr', function(e)
        {
            e.preventDefault();
            var content = jQuery(this).attr('data-content');
            var title = jQuery(this).attr('data-title');
            var results = '<div class="row">';
            results+= '<div class="col-sm-3"></div>';
            results+= '<div class="col-sm-6">';
            results+= '<div class="qr-holder" data-content="' + content + '"></div>';
            results+= '<hr><a href="#" class="btn btn-block btn-primary btn-ordit-copy" data-content="' + content + '">COPY</a>';
            results+= '</div>';
            results+= '<div class="col-sm-3"></div>';
            results+= '</div>';
            saline.modal(title, results);
        });
        jQuery('body').on('click', '.btn-ordit-reset-wallet', function(e)
        {
            e.preventDefault();
            
            saline.loader(true, 'RESETTING');

            saline.data.remove(['user', 'device', 'provide', 'wallet'], function(error)
            {
                location.reload(true);
            })
        });
    },
    markdown: function()
    {
        var c = 0;
        var m = jQuery('.batter-markdown').length;
        if(jQuery('.batter-markdown').length > 0)
        {
            jQuery('.batter-markdown').each(function(i)
            {
                var div = jQuery(this);
                var url = jQuery(div).attr('data-url');
                saline.md(url, function(html)
                {
                    jQuery(div).html(html);
                    c++;
                    if(m == c)
                    {
                        saline.mustache();
                    }
                })
            });
        }
        else
        {
            saline.mustache();
        }
    },
    md: function(url, callback)
    {
        if(url && typeof callback == 'function')
        {
            jQuery.ajax({
                url: url,
                dataType: 'html',
                async: true,
                cache: false,
                success: function(res)
                {
                    var html = marked.parse(res);
                    callback(html);
                }
            });
        }
    },
    modal: function(title, contents, id = false)
    {
        if((title && contents) || id)
        {
            saline.loader(false);
            if(jQuery('.modal.show').length > 0)
            {
                jQuery('.modal.show').each(function(m)
                {
                    var id = jQuery(this).attr('id');
                    var this_modal = bootstrap.Modal.getInstance(
                        document.getElementById(id)
                    );
                    this_modal.hide();
                });
            }
            if(!id)
            {
                id = 'default-modal';
                jQuery('#' + id).find('.modal-title').html(title);
                jQuery('#' + id).find('.modal-body').html(contents);
            }
            if(jQuery('#' + id).find('.qr-holder').length > 0)
            {
                saline.qr();
            }
            var el = document.getElementById(id);
            var modal = new bootstrap.Modal(el, {
                keyboard: true,
                backdrop: true,
                focus: false
            });
            el.addEventListener('hidden.bs.modal', function (event)
            {

            });
            el.addEventListener('shown.bs.modal', function (event)
            {
                saline.copy(id);
            });
            modal.show();
        }
    },
    copy: function(focus = false)
    {
        if(jQuery('.btn-ordit-copy').length > 0)
        {
            try
            {
                if(focus)
                {
                    saline_clipboard = new ClipboardJS('.btn-ordit-copy', {
                        container: document.getElementById(focus),
                        text: function(trigger) {
                            jQuery('.btn-copied').removeClass('btn-copied');
                            jQuery(trigger).addClass('btn-copied');
                            var text = trigger.getAttribute('data-content');
                            return text;
                        }
                    });
                }
                else
                {
                    saline_clipboard = new ClipboardJS('.btn-ordit-copy', {
                        container: document.getElementById('main-body'),
                        text: function(trigger) {
                            jQuery('.btn-copied').removeClass('btn-copied');
                            jQuery(trigger).addClass('btn-copied');
                            var text = trigger.getAttribute('data-content');
                            return text;
                        }
                    });
                }
            }
            catch(err){ console.info('copy.err', err)}
        }
    },
    isotope: function()
    {
        jQuery('.batter-isotope').each(function(i)
        {
            var id = jQuery(this).attr('id');
            saline_iso[id] = jQuery('#' + id).isotope({
                itemSelector: '.iso-grid',
                layoutMode: 'masonry'
            }); 
        });
        var tabEl = document.querySelector('button#artifacts-tab');
        if(tabEl)
        {
            tabEl.addEventListener('shown.bs.tab', function (event) 
            {
                jQuery.each(saline_iso, function(k, v)
                {
                    saline_iso[k].isotope('layout');
                });
            });
        }
    },
    qr: function()
    {
        jQuery('body').find('.qr-holder').each(function()
        {
            if(jQuery(this).find('img').length > 0)
            {
                jQuery(this).find('img').remove();
            }
            try
            {
                jQuery(this).qrcode({
                    render: 'image',
                    text: jQuery(this).attr('data-content')
                });
            }
            catch(e)
            {
                jQuery(this).html('<pre>' + jQuery(this).attr('data-content') + '</pre>');
            }
        });
    },
    loader: function(open = false, text = false)
    {
        if(open) jQuery('body').addClass('loading');
        else jQuery('body').removeClass('loading');

        if(text) jQuery('body').attr('data-text', text);
        else jQuery('body').attr('data-text', 'LOADING');
    },
    mustache: function()
    {
        var c = 0;
        var m = jQuery('.batter-mustache').length;
        
        var check_html = function()
        {
            saline.qr();
            saline.copy();
            saline.forms();
            saline.buttons();
            saline.selects();
            saline.isotope();
            
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
              return new bootstrap.Tooltip(tooltipTriggerEl)
            })
            
            saline.loader(false);
        }
        
        if(jQuery('.batter-mustache').length > 0)
        {
            jQuery('.batter-mustache').each(function(i)
            {
                var div = jQuery(this);
                var content = jQuery(div).html();
                var html = '';
                
                try
                {
                    console.info('saline.db', saline.db);
                    html = Mustache.render(content, saline.db);
                }
                catch(e){}
                
                jQuery(div).html(html);
                c++;
                if(m == c)
                {
                    check_html();
                }
            });
        }
        else
        {
            check_html();
        }
    },
    html:
    {
        forms: 
        {
            provide: function(db)
            {
                var provide = db.provide;
                var results = '<div class="row">';
                results+= '<div class="col-sm-12">';
                results+= '<div class="card">';
                results+= '<div class="card-body">';
                results+= '<alert class="alert alert-block alert-info">';
                results+= '<b><a href="#" class="btn btn-sm btn-xs btn-primary btn-ordit-copy" data-content="dnkey-saline-salt=' + provide.dns + '" style="margin: -4px 0 4px;"><small>COPY</small></a> RECOVERY SHARDS AND DNS RECORD</b><br />';
                results+= '<pre style="margin-bottom: 5px;">DNS: dnkey-saline-salt=' + provide.dns + '</pre>';
                results+= '<small>( do not store different shards in the same place )</small>';
                results+= '</alert>';

                results+= '<div class="row">';

                results+= '<div class="col-sm-6">';
                results+= '<alert class="alert alert-block alert-info">';
                results+= '<small><a href="#" class="btn btn-sm btn-xs btn-primary btn-ordit-copy" data-content="' + provide.shards.user[0] + '" style="margin: -4px 0 4px;"><small>COPY</small></a> USER SHARD #1</small><pre style="margin-bottom: 5px;">' + provide.shards.user[0] + '</pre>';
                results+= '</alert>';
                results+= '</div>';

                results+= '<div class="col-sm-6">';
                results+= '<alert class="alert alert-block alert-info">';
                results+= '<small><a href="#" class="btn btn-sm btn-xs btn-primary btn-ordit-copy" data-content="' + provide.shards.user[1] + '" style="margin: -4px 0 4px;"><small>COPY</small></a> USER SHARD #2</small><pre style="margin-bottom: 5px;">' + provide.shards.user[1] + '</pre>';
                results+= '</alert>';
                results+= '</div>';
                
                results+= '</div>';
                
                results+= '<div class="row">';

                results+= '<div class="col-sm-6">';
                results+= '<alert class="alert alert-block alert-info">';
                results+= '<small><a href="#" class="btn btn-sm btn-xs btn-primary btn-ordit-copy" data-content="' + provide.shards.personal[0] + '" style="margin: -4px 0 4px;"><small>COPY</small></a> PERSONAL SHARD #1</small><pre style="margin-bottom: 5px;">' + provide.shards.personal[0] + '</pre>';
                results+= '</alert>';
                results+= '</div>';

                results+= '<div class="col-sm-6">';
                results+= '<alert class="alert alert-block alert-info">';
                results+= '<small><a href="#" class="btn btn-sm btn-xs btn-primary btn-ordit-copy" data-content="' + provide.shards.personal[1] + '" style="margin: -4px 0 4px;"><small>COPY</small></a> PERSONAL SHARD #2</small><pre style="margin-bottom: 5px;">' + provide.shards.personal[1] + '</pre>';
                results+= '</alert>';
                results+= '</div>';
                
                results+= '</div>';

                /*
                results+= '<div class="row">';
                results+= '<div class="col-sm-12">';
                results+= '<alert class="alert alert-block alert-info">';
                results+= '<b>ENCRYPTED DEVICE RECOVERY SHARDS</b>';
                results+= '<hr><small>( do not store both shards in the same place )</small>';
                results+= '</alert>';
                results+= '</div>';
                results+= '</div>';
                */

                results+= '<div class="row">';

                results+= '<div class="col-sm-6">';
                results+= '<alert class="alert alert-block alert-info">';
                results+= '<small><a href="#" class="btn btn-sm btn-xs btn-primary btn-ordit-copy" data-content="' + provide.shards.device[0] + '" style="margin: -4px 0 4px;"><small>COPY</small></a> DEVICE SHARD #1</small><pre style="margin-bottom: 5px;">' + provide.shards.device[0] + '</pre>';
                results+= '</alert>';
                results+= '</div>';

                results+= '<div class="col-sm-6">';
                results+= '<alert class="alert alert-block alert-info">';
                results+= '<small><a href="#" class="btn btn-sm btn-xs btn-primary btn-ordit-copy" data-content="' + provide.shards.device[1] + '" style="margin: -4px 0 4px;"><small>COPY</small></a> DEVICE SHARD #2</small><pre style="margin-bottom: 5px;">' + provide.shards.device[1] + '</pre>';
                results+= '</alert>';
                results+= '</div>';
                
                results+= '</div>';
                
                results+= '<div class="row">';
                results+= '<hr>';
                results+= '<div class="col-sm-12">';
                results+= '<a href="#" class="btn btn-block btn-outline-danger btn-ordit-ready" data-key="' + provide.key + '">';
                results+= '<strong>READY TO CONTINUE? DEFINITELY COPIED THIS DATA?</strong><br /><small>CANNOT ACCESS THESE RECORDS AGAIN !!!</small>';
                results+= '</a></div><div>';
                
                results+= '</div>';
                results+= '</div>';
                
                return results;
            },
            create: function(params = {})
            {
                var options = 
                {
                    id: '',
                    css: '',
                    action: false,
                    submit: true,
                    fields: false
                };
                Object.assign(options, params);
                var html = '<form class="form ' + options.css + '" id="' + options.id + '">';
                if(typeof options.fields == 'object' && options.fields.length > 0)
                {
                    for(f = 0; f < options.fields.length; f++)
                    {
                        var field = options.fields[f];
                        if
                        (
                            typeof field.type != 'undefined'
                            && 
                            (
                                field.type == 'text'
                                || field.type == 'number'
                                || field.type == 'password'
                                || field.type == 'hidden'
                                || field.type == 'select'
                                || field.type == 'hr'
                                || field.type == 'alert'
                                || field.type == 'file'
                            )
                        )
                        {
                            if(field.type == 'hr' || field.type == 'alert')
                            {
                                if(field.type == 'alert' && typeof field.value != 'undefined')
                                {
                                    html+= '<alert class="alert alert-block alert-info">';
                                    html+= '<small>' + field.value + '</small>';
                                    html+= '</alert>';
                                }
                                else
                                {
                                    html+= '<hr>';
                                }
                            }
                            else
                            {
                                if
                                (
                                    field.type != 'hidden'
                                    && typeof field.label != 'undefined'
                                ){
                                    html+= '<div class="row mb-3">';
                                    html+= '<label for="' + options.css + '-' + f + '" class="col-sm-3 col-form-label">' + field.label + '</label>';
                                    html+= '<div class="col-sm-9">';
                                }

                                if(field.type == 'text' || field.type == 'hidden' || field.type == 'password' || field.type == 'number' || field.type == 'file')
                                {
                                    var ph = '';
                                    var val = '';
                                    if(typeof field.placeholder != 'undefined')
                                    {
                                        ph = field.placeholder;
                                    }
                                    if(typeof field.value != 'undefined')
                                    {
                                        val = field.value;
                                    }
                                    
                                    var np = '';
                                    if(field.type == 'number')
                                    {
                                        np = 'pattern="[0-9]*"';
                                    }
                                    if(np)
                                    {
                                        field.type = 'password';
                                    }
                                    
                                    var ro = '';
                                    if(typeof field.readonly != 'undefined' && field.readonly === true)
                                    {
                                        ro = ' readonly="readonly"';
                                    }
                                    html+= "<input class='form-control' type='" + field.type + "' name='" + options.css + "-" + f + "' id='" + options.css + "-" + f + "' placeholder='" + ph + "' value='" + val + "' autocomplete='off' " + np + "" + ro + " />";
                                }
                                else if(field.type == 'select' && typeof field.choices == 'object')
                                {
                                    html+= '<select class="form-control" name="' + options.css + '-' + f + '" id="' + options.css + '-' + f + '">';
                                    for(fc = 0; fc < field.choices.length; fc++)
                                    {
                                        var c = field.choices[fc];
                                        var selected = '';
                                        if(typeof c.selected != 'undefined' && c.selected)
                                        {
                                            selected = 'selected="selected"';
                                        }
                                        html+= '<option value="' + c.id + '" ' + selected + '>' + c.text + '</option>';
                                    }
                                    html+= '</select>';
                                }

                                if
                                (
                                    field.type != 'hidden'
                                    && typeof field.label != 'undefined'
                                ){
                                    html+= '</div>';
                                    html+= '</div>';
                                }
                            }
                        }
                    }
                }
                
                if(options.submit)
                {
                    html+= '<hr>';
                    html+= '<div class="row">';
                    html+= '<div class="col-sm-6">';

                    if(options.action)
                    {
                        html+= options.action;
                    }

                    html+= '</div>';
                    html+= '<div class="col-sm-6">';
                    html+= '<input class="btn btn-block btn-primary" type="submit" value="SUBMIT" />';
                    html+= '</div>';
                    html+= '</div>';
                }
                
                html+= '</form>';
                return html;
            }
        }
    },
    sado:
    {
        db: function()
        {
            var db = 
            {
                orderbook: ordit.sdk.config.apis[saline.db.db.defaults.network].orderbook,
                dust: 1000,
                fees: 15,
                format: 'psbt'
            };
            
            return db;
        }
    },
    sodium:
    {
        decrypt: function(encrypted_message = false, key_pair = false, callback = false)
        {
            if(encrypted_message && key_pair && typeof callback == 'function')
            {
                var message = false;
                
                async function ready() 
                {
                    await sodium.ready;
                    try
                    {
                        message = await sodium.crypto_box_seal_open(
                            sodium.from_hex(encrypted_message), 
                            key_pair.publicKey, 
                            key_pair.privateKey
                        );
                        callback(sodium.to_string(message));
                    }
                    catch(err)
                    {
                        callback(message, err);
                    }
                }
                ready();
            }
        },
        encrypt: function(message = false, public_key = false, callback = false)
        {
            if(message && public_key && typeof callback == 'function')
            {
                var encrypted_message = false;
                async function ready() 
                {
                    await sodium.ready;
                    try
                    {
                        encrypted_message = await sodium.crypto_box_seal(
                            message, 
                            public_key
                        );
                        callback(sodium.to_hex(encrypted_message));
                    }
                    catch(err)
                    {
                        callback(encrypted_message, err);
                    }
                }
                ready();
            }
        },
        keys: function(seed = false, callback = false)
        {
            var keys = false;
            if(seed && typeof callback == 'function')
            {
                async function ready() 
                {
                    await sodium.ready;
                    try
                    {
                        var hash = await sodium.crypto_generichash(
                            sodium.crypto_sign_SEEDBYTES, 
                            seed
                        );
                        keys = await sodium.crypto_box_seed_keypair(hash);
                        callback(keys);
                    }
                    catch(err){
                        callback(false, err);
                    }
                }
                ready();
            }
        }
    },
    tx:
    {
        confirm: function(hex, network = 'testnet', callback = false)
        {
            if(hex && network && typeof callback == 'function')
            {
                var tx = bitcointp.Transaction.fromHex(hex);
                var unspents = saline.db.wallet.addresses[0].unspents;
                var net_obj = ordit.sdk.network(network);
                if(net_obj && typeof unspents == 'object' && unspents.length > 0)
                {
                    for(i = 0; i < tx.ins.length; i++)
                    {
                        var txid = Buffer.from(tx.ins[i].hash).reverse().toString('hex');
                        tx.ins[i].txid = txid;
                        for(u = 0; u < unspents.length; u++)
                        {
                            if(unspents[u].txid == txid)
                            {
                                tx.ins[i].tx = unspents[u];
                            }
                        }
                    }
                    for(t = 0; t < tx.outs.length; t++)
                    {
                        if(typeof tx.outs[t].script == 'object')
                        {
                            var to = bitcointp.address.fromOutputScript(tx.outs[t].script, net_obj);
                            tx.outs[t].amount = parseFloat(tx.outs[t].value / (10 ** 8));
                            tx.outs[t].to = to;
                        }
                    }
                    
                    // Time to display confirmation screen ?
                    
                    callback(false);
                }
                else
                {
                    callback(false);
                }
            }
        }
    }
}

var load_saline = function()
{
    async function fingerprint()
    {
        var webgl = new WebGl();

        webgl.ready.then(() => 
        {
            var fp = webgl.hash;

            saline.db.html.forms.setup = saline.html.forms.create({
                css: 'form-ordit-wallet-setup',
                fields:
                [
                    {
                        type: 'hidden',
                        value: fp
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: '6 or more numerical digits ...'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Enter password to get started ...'
                    },
                    {
                        type: 'alert',
                        value: 'REPEAT PIN AND PASSWORD'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Repeat PIN for safety ...'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Repeat password to be safe ...'
                    }
                ]
            });
            saline.db.html.forms.lost = saline.html.forms.create({
                css: 'form-ordit-wallet-lost',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Either Shard',
                        placeholder: 'One of two recovery shards provided at setup ...'
                    },
                    {
                        type: 'text',
                        label: 'Optional Shard',
                        placeholder: 'Only required if this device has not stored one ...'
                    },
                    {
                        type: 'select',
                        label: 'Type',
                        choices: [
                            {
                                id: '',
                                text: '-- Select Recovery Type --'
                            },
                            {
                                id: 'user',
                                text: 'User Shard (Password)'
                            },
                            {
                                id: 'personal',
                                text: 'Personal Shard (DNS)'
                            }
                        ]
                    }
                ]
            });
            saline.db.html.forms.recover = saline.html.forms.create({
                css: 'form-ordit-wallet-recover',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Shard #1',
                        placeholder: 'First of two DEVICE shards provided at setup ...'
                    },
                    {
                        type: 'text',
                        label: 'Shard #2',
                        placeholder: 'Second of two DEVICE shards provided at setup ...'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Username used during setup ...'
                    },
                    {
                        type: 'text',
                        label: 'DNS Record',
                        placeholder: 'Required if not using DNS updates ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate session'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Password used during setup ...'
                    }
                ]
            });
            saline.db.html.forms.login = saline.html.forms.create({
                css: 'form-ordit-wallet-login',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Required to activate session ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate session'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Required to authenticate session'
                    }
                ]
            });
            saline.db.html.forms.regenerate = saline.html.forms.create({
                css: 'form-ordit-wallet-regenerate',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Device Shard',
                        placeholder: 'Either of two DEVICE shards provided at setup ...'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            saline.db.html.forms.message = saline.html.forms.create({
                css: 'form-ordit-wallet-message',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Message',
                        placeholder: 'What to sign ...?'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            saline.db.html.forms.signtx = saline.html.forms.create({
                css: 'form-ordit-wallet-signtx',
                fields:
                [
                    {
                        type: 'text',
                        label: 'PSBT',
                        placeholder: 'What to sign ...?'
                    },
                    {
                        type: 'select',
                        label: 'Tweaked',
                        choices:
                        [
                            {
                                id: '0',
                                text: 'NO'
                            },
                            {
                                id: '1',
                                text: 'YES'
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: 'Extracted',
                        choices:
                        [
                            {
                                id: '1',
                                text: 'YES'
                            },
                            {
                                id: '0',
                                text: 'NO'
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: 'Finalized',
                        choices:
                        [
                            {
                                id: '1',
                                text: 'YES'
                            },
                            {
                                id: '0',
                                text: 'NO'
                            }
                        ]
                    },
                    {
                        type: 'text',
                        label: 'sighashType',
                        placeholder: 'Optional integer value ...'
                    },
                    {
                        type: 'text',
                        label: 'signingIndexes',
                        placeholder: 'Optional JSON array ...'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            
            saline.db.html.forms.deploytoken = saline.html.forms.create({
                css: 'form-ordit-deploy-token',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Ticker',
                        placeholder: 'Must be 4 characters ...'
                    },
                    {
                        type: 'text',
                        label: 'Decimals',
                        placeholder: 'If used remeber to account for it ...'
                    },
                    {
                        type: 'text',
                        label: 'Max Supply',
                        placeholder: 'Remember to account for decimals ...'
                    },
                    {
                        type: 'text',
                        label: 'Mint Limit',
                        placeholder: 'Mint limit per transaction ...'
                    },
                    {
                        type: 'text',
                        label: 'Fees',
                        placeholder: 'Sats per vByte to pay for inscriptions ...'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            saline.db.html.forms.minttoken = saline.html.forms.create({
                css: 'form-ordit-mint-tokens',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Ticker',
                        placeholder: 'Must be 4 characters ...'
                    },
                    {
                        type: 'text',
                        label: 'Amount',
                        placeholder: 'Amount to mint ...'
                    },
                    {
                        type: 'text',
                        label: 'Fees',
                        placeholder: 'Sats per vByte to pay for inscriptions ...'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            saline.db.html.forms.transfertoken = saline.html.forms.create({
                css: 'form-ordit-prepare-transfer',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Ticker',
                        placeholder: 'Must be 4 characters ...'
                    },
                    {
                        type: 'text',
                        label: 'Amount',
                        placeholder: 'Amount to prepare ...'
                    },
                    {
                        type: 'text',
                        label: 'Fees',
                        placeholder: 'Sats per vByte to pay for inscriptions ...'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            
            saline.db.html.forms.verify = saline.html.forms.create({
                css: 'form-ordit-wallet-verify',
                fields:
                [
                    {
                        type: 'text',
                        label: 'PubKey',
                        placeholder: 'Public key used to sign message ...?'
                    },
                    {
                        type: 'text',
                        label: 'Message',
                        placeholder: 'What message was signed ...?'
                    },
                    {
                        type: 'text',
                        label: 'Signature',
                        placeholder: 'What is the signature ...?'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            saline.db.html.forms.collection = saline.html.forms.create({
                css: 'form-ordit-collection-inscription',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Title',
                        placeholder: 'The main title of collection ...'
                    },
                    {
                        type: 'text',
                        label: 'Description',
                        placeholder: 'Markdown compatible description ...'
                    },
                    {
                        type: 'text',
                        label: 'Slug',
                        placeholder: 'Optional one-word slug ...'
                    },
                    {
                        type: 'text',
                        label: 'URL',
                        placeholder: 'Optional URL for collection ...'
                    },
                    {
                        type: 'text',
                        label: 'Artist',
                        placeholder: 'Optional name of artist ...'
                    },
                    {
                        type: 'text',
                        label: 'Email',
                        placeholder: 'Optional email address ...'
                    },
                    {
                        type: 'file',
                        label: 'Cover',
                        placeholder: 'Collection cover ...'
                    },
                    {
                        type: 'text',
                        label: 'Publishers',
                        placeholder: 'An array of publisher credentials ...'
                    },
                    {
                        type: 'text',
                        label: 'Inscriptions',
                        placeholder: 'An array of inscription objects ...'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            saline.db.html.forms.send = saline.html.forms.create({
                css: 'form-ordit-wallet-send',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Destination',
                        placeholder: 'Must be a valid address ...'
                    },
                    {
                        type: 'select',
                        label: 'Type',
                        choices: [
                            {
                                id: '',
                                text: '-- Select Type --'
                            },
                            {
                                id: 'cardinals',
                                text: 'Cardinals (Safe Satoshis)'
                            },
                            {
                                id: 'unspent',
                                text: 'Specific Unspent UTXO'
                            }
                        ]
                    },
                    {
                        type: 'text',
                        label: 'Value',
                        placeholder: 'How many sats (satoshis) to send ...?'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            
            saline.db.html.forms.sado = saline.html.forms.create({
                css: 'form-ordit-sado-list',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Location',
                        placeholder: 'Must be an unspent TXID:VOUT ...',
                        readonly: true
                    },
                    {
                        type: 'text',
                        label: 'Cardinals',
                        placeholder: 'How many satoshis in exchange for location?'
                    },
                    {
                        type: 'text',
                        label: 'Username',
                        placeholder: 'Provide a domain-based username ...'
                    },
                    {
                        type: 'number',
                        label: 'PIN',
                        placeholder: 'Required to authenticate action'
                    },
                    {
                        type: 'password',
                        label: 'Password',
                        placeholder: 'Also required for this action ...'
                    }
                ]
            });
            
            saline.db.html.forms.settings = saline.html.forms.create({
                css: 'form-ordit-sado-settings',
                fields:
                [
                    {
                        type: 'text',
                        label: 'Orderbook',
                        placeholder: 'Must be a valid orderbook address ...',
                        value: ordit.sdk.config.apis[saline.db.db.defaults.network].orderbook
                    },
                    {
                        type: 'text',
                        label: 'Network Fee',
                        placeholder: 'Default dust for orderbook updates ...',
                        value: 1000
                    },
                    {
                        type: 'text',
                        label: 'Sats per Byte',
                        placeholder: 'Defaults to 15 sats per byte if empty ...',
                        value: 15
                    },
                    {
                        type: 'select',
                        label: 'Sig Format',
                        choices:
                        [
                            {
                                id: 'psbt',
                                text: 'PSBT Signatures'
                            }
                        ]
                    }
                ]
            });
            
            var inscribe_fields = 
            [
                {
                    type: 'text',
                    label: 'Destination',
                    placeholder: 'Must be a valid address ...'
                },
                {
                    type: 'file',
                    label: 'File',
                    placeholder: 'What to inscribe ...?'
                },
                {
                    type: 'text',
                    label: 'Meta',
                    placeholder: 'Optional JSON data (OIP-1) ...'
                },
                {
                    type: 'select',
                    label: 'Format',
                    choices: 
                    [
                        {
                            id: '',
                            text: '-- Select Meta Format --'
                        },
                        {
                            id: 'oip1',
                            text: 'OIP-01'
                        },
                        {
                            id: 'op5',
                            text: 'OP5'
                        }
                    ]
                },
                {
                    type: 'text',
                    label: 'Parent ID',
                    placeholder: 'Parent ID (not location) ...'
                },
                {
                    type: 'text',
                    label: 'Parent Out',
                    placeholder: 'Location of parent ...'
                },
                {
                    type: 'text',
                    label: 'Username',
                    placeholder: 'Provide a domain-based username ...'
                },
                {
                    type: 'number',
                    label: 'PIN',
                    placeholder: 'Required to authenticate action'
                },
                {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Also required for this action ...'
                }
            ];

            if(saline.db.browser == true)
            {
                inscribe_fields[1] = 
                {
                    type: 'text',
                    label: 'File',
                    placeholder: 'URL to file being inscribed ...?'
                }
            }

            saline.db.html.forms.inscribe = saline.html.forms.create({
                css: 'form-ordit-wallet-inscribe',
                fields: inscribe_fields,
                action: '<a href="#" class="btn btn-block btn-outline-light" data-bs-toggle="modal" data-bs-target="#ordit-chunk-modal"">CHUNK DATA</a>'
            });
            
            saline.db.html.forms.chunk = saline.html.forms.create({
                css: 'form-ordit-wallet-chunk',
                fields: inscribe_fields
            });

            var network = 'regtest'; 

            saline.data.get(function(db)
            {
                if(db != null && typeof db == 'object')
                {
                    if(typeof db.network != 'undefined')
                    {
                        network = db.network;
                    }
                    if(network == 'mainnet')
                    {
                        saline.db.db.testing = false;
                    }
                    saline.db.db.defaults.network = network;
                    saline.db.db.defaults.content = ordit.sdk.config.apis[saline.db.db.defaults.network].rpc + '/../content/';
                    if
                    (
                        typeof db.provide == 'object'
                        && typeof db.provide.shards == 'object'
                        && typeof db.provide.key != 'undefined'
                        && typeof db.provide.dns != 'undefined'
                    )
                    {
                        saline.db.db.pending = 
                        {
                            form: saline.html.forms.provide(db)
                        };
                    }
                    else if
                    (
                        typeof db.user == 'object'
                        && typeof db.device == 'object'
                        && typeof db.device.shards == 'object'
                        && typeof db.user.key != 'undefined'
                        && typeof db.user.sodium != 'undefined'
                        && typeof db.device.salt != 'undefined'
                        && typeof db.device.shards.user != 'undefined'
                        && typeof db.device.shards.device != 'undefined'
                        && typeof db.device.shards.personal != 'undefined'
                    )
                    {
                        saline.db.db.setup = true;
                        saline.db.db.salt = db.device.salt;
                        saline.db.db.key = db.user.key;
                        saline.db.db.shards = db.device.shards;
                        if(typeof db.active != 'undefined' && JSON.parse(JSON.stringify(db.active)) === true)
                        {
                            saline.db.user = db.user;
                        }
                    }
                    if(typeof db.session == 'object')
                    {
                        saline.db.db.session = db.session;
                    }
                    if
                    (
                        saline.db.db.setup === true 
                        && typeof saline.db.user == 'object' 
                        && typeof db.provide != 'object'
                    )
                    {
                        saline.loader(true, 'FETCHING');
                        
                        ordit.sdk.balance.get({
                            key: saline.db.user.key, 
                            format: 'p2tr', 
                            network: network
                        },  function(w)
                        {
                            if(w.success)
                            {
                                var net_obj = ordit.sdk.network(network);
                                var collections = [];
                                for(c = 0; c < w.data.collections.length; c++)
                                {
                                    var is_key = false;
                                    
                                    for(k = 0; k < w.data.collections[c].meta.publ.length; k++)
                                    {
                                        var potential_key = w.data.collections[c].meta.publ[k];
                                        var chain_code = new Buffer(32);
                                        chain_code.fill(1);

                                        try
                                        {

                                            var this_key = bip32ecc.fromPublicKey
                                            (
                                                Buffer.from(potential_key, 'hex'),
                                                chain_code,
                                                net_obj
                                            );
                                            if(this_key)
                                            {
                                                is_key = true;
                                            }
                                        }
                                        catch(e){ }
                                    }
                                    
                                    if(is_key === true)
                                    {
                                        collections.push(w.data.collections[c]);
                                    }
                                }
                                
                                w.data.got_collections = false;
                                w.data.collections = collections;
                                if(collections.length > 0)
                                {
                                    w.data.got_collections = true;
                                }
                                
                                ordit.sdk.sado.orderbook({
                                    network: network,
                                    address: w.data.addresses[0].address
                                },  function(sado)
                                {
                                    if(sado.success)
                                    {
                                        saline.db.orderbook = sado.data;
                                    }
                                    var strings = 
                                    {
                                        counts: {},
                                        balance: parseFloat(w.data.counts.satoshis / (10 ** 8))
                                    };
                                    jQuery.each(w.data.counts, function(k, v)
                                    {
                                        strings.counts[k] = v.toLocaleString('en-GB');
                                    })
                                    w.data.strings = strings;
                                    saline.db.wallet = w.data;

                                    var collection_field = 
                                    {
                                        type: 'hidden'
                                    }

                                    if(typeof saline.db.wallet.collections == 'object' && saline.db.wallet.collections.length > 0)
                                    {
                                        collection_field = 
                                        {
                                            type: 'select',
                                            label: 'Collection',
                                            choices: [
                                                {
                                                    id: '',
                                                    text: '-- Select Collection --'
                                                }
                                            ]
                                        };
                                        for(c = 0; c < saline.db.wallet.collections.length; c++)
                                        {
                                            collection_field.choices.push({
                                                id: saline.db.wallet.collections[c].outpoint,
                                                text: saline.db.wallet.collections[c].meta.title
                                            })
                                        }
                                    }

                                    var network_choices = [];
                                    jQuery.each(ordit.sdk.config.apis, function(k, v)
                                    {
                                        var choice = 
                                        {
                                            id: k,
                                            text: k.toUpperCase()
                                        }
                                        if(k == saline.db.db.defaults.network)
                                        {
                                            choice.selected = true;
                                        }
                                        network_choices.push(choice);
                                    });

                                    saline.db.html.forms.switchnet = saline.html.forms.create({
                                        css: 'form-ordit-switch-network',
                                        fields:
                                        [
                                            {
                                                type: 'select',
                                                choices: network_choices
                                            }
                                        ],
                                        submit: false
                                    });

                                    saline.db.html.forms.mint = saline.html.forms.create({
                                        css: 'form-ordit-mint-inscription',
                                        fields:
                                        [
                                            collection_field,
                                            {
                                                type: 'text',
                                                label: 'Inscription',
                                                placeholder: 'Outpoint / location of collection ...'
                                            },
                                            {
                                                type: 'file',
                                                label: 'File',
                                                placeholder: 'File to inscribe ...'
                                            },
                                            {
                                                type: 'text',
                                                label: 'Nonce',
                                                placeholder: 'Unique integer less than limit ...'
                                            },
                                            {
                                                type: 'text',
                                                label: 'Publisher',
                                                placeholder: 'Integer index for publisher array ...'
                                            },
                                            {
                                                type: 'text',
                                                label: 'Destination',
                                                placeholder: 'Where to send the inscription ...?'
                                            },
                                            {
                                                type: 'text',
                                                label: 'Username',
                                                placeholder: 'Provide a domain-based username ...'
                                            },
                                            {
                                                type: 'number',
                                                label: 'PIN',
                                                placeholder: 'Required to authenticate action'
                                            },
                                            {
                                                type: 'password',
                                                label: 'Password',
                                                placeholder: 'Also required for this action ...'
                                            }
                                        ]
                                    });

                                    saline.init();
                                });
                            }
                            else
                            {
                                saline.init();
                            }
                        });
                    }
                    else
                    {
                        saline.init();
                    }
                }
                else
                {
                    saline.init();
                }
            });
        });
    };
    fingerprint();
};