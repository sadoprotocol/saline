var firefox_webextension = false;
var saline_clipboard = false;
var saline_iso = {};

//if(typeof browser == 'object') firefox_webextension = true;

var saline = 
{
    db:
    {
        browser: firefox_webextension,
        db:
        {
            setup: false,
            defaults:
            {
                network: 'regtest'
            }
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
                else if(typeof chrome == 'object')
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
                
                if(browser != null && typeof browser == 'object')
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
        var send = 'form-ordit-wallet-send';
        var inscribe = 'form-ordit-wallet-inscribe';
        var collections = 'form-ordit-collection-inscription';
        var mint = 'form-ordit-mint-inscription';
        
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
        
        // Track form state
        // -- For firefox extension :-(
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
                                                                results+= '<small>ADDRESS USED FOR SIGNATURES:<pre>' + sigs.data.address + '</pre></small>';
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
        jQuery('body').on('submit', '.' + inscribe, function(e)
        {
            e.preventDefault();
            var form = jQuery(this);
            var recovered = parseInt(jQuery(this).attr('data-recover'));
            var destination = jQuery(form).find('#' + inscribe + '-0').val();
            var file = false;
            var jmeta = jQuery(form).find('#' + inscribe + '-2').val();
            var username = jQuery(form).find('#' + inscribe + '-3').val();
            var pin = jQuery(form).find('#' + inscribe + '-4').val();
            var password = jQuery(form).find('#' + inscribe + '-5').val();
            
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

                                                                ordit.sdk.inscription.address({
                                                                    seed: seed,
                                                                    media_content: media_content,
                                                                    media_type: media_type,
                                                                    network: saline.db.db.defaults.network,
                                                                    meta: inscription_meta
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
                                                                            recovery: recovered
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
    buttons: function()
    {
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
                var results = '<alert class="alert alert-block alert-info"><strong>CURRENT SEND FUNCTIONALITY ONLY SUPPORTS SINGLE UNSPENTS, WHICH MAY CONTAIN MULTIPLE ORDINALS AND INSCRIPTIONS</strong><hr><small>Value: <strong>' + unspent.value + ' BTC</strong></small></alert>';
                
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
                    results+= '<hr><a href="#" class="btn btn-block btn-outline-danger btn-ordit-confirm-send" data-txid="' + unspent.txid + ':' + unspent.n + '">CONFIRM TRANSACTION</a>';
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
            jQuery(this).qrcode({
                render: 'image',
                text: jQuery(this).attr('data-content')
            });
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
                                    html+= '<input class="form-control" type="' + field.type + '" name="' + options.css + '-' + f + '" id="' + options.css + '-' + f + '" placeholder="' + ph + '" value="' + val + '" autocomplete="off" ' + np + ' />';
                                }
                                else if(field.type == 'select' && typeof field.choices == 'object')
                                {
                                    html+= '<select class="form-control" name="' + options.css + '-' + f + '" id="' + options.css + '-' + f + '">';
                                    for(fc = 0; fc < field.choices.length; fc++)
                                    {
                                        var c = field.choices[fc];
                                        html+= '<option value="' + c.id + '">' + c.text + '</option>';
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
                html+= '<hr>';
                html+= '<div class="row">';
                html+= '<div class="col-sm-6"></div>';
                html+= '<div class="col-sm-6">';
                html+= '<input class="btn btn-block btn-primary" type="submit" value="SUBMIT" />';
                html+= '</div>';
                html+= '</div>';
                html+= '</form>';
                return html;
            }
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

jQuery(window).on('load', function()
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
                        placeholder: 'An array of publisher addresses ...'
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
                    placeholder: 'How many sats (satoshis) to send ...?'
                },
                {
                    type: 'text',
                    label: 'Meta',
                    placeholder: 'Optional JSON data (OIP-1) ...'
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
                        ordit.sdk.balance.get({key: saline.db.user.key, format: 'p2tr', network: network}, function(w)
                        {
                            if(w.success)
                            {
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
                            }

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
                }
                else
                {
                    saline.init();
                }
            });
        });
    };
    fingerprint();
});