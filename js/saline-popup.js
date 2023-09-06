var saline_popup_sdk =
{
    forms: function()
    {
        jQuery('body').on('submit', 'form.form-ordit-popup-sign', function(e)
        {
            e.preventDefault();
            var input = jQuery('#form-ordit-popup-sign-1').val();
            var username = jQuery('#form-ordit-popup-sign-2').val();
            var pin = jQuery('#form-ordit-popup-sign-3').val();
            var password = jQuery('#form-ordit-popup-sign-4').val();
            var action = jQuery('#form-ordit-popup-sign-5').val();
            var id = jQuery('#form-ordit-popup-sign-6').val();
            var extracted = jQuery('#form-ordit-popup-sign-7').val();
            var finalized = jQuery('#form-ordit-popup-sign-8').val();
            var sighash = jQuery('#form-ordit-popup-sign-9').val();
            var tweaked = jQuery('#form-ordit-popup-sign-10').val();
            var nosign = jQuery('#form-ordit-popup-sign-11').val();
            
            if(nosign)
            {
                try
                {
                    nosign = JSON.parse(nosign);
                }
                catch(e){}
            }
            if(nosign && typeof nosign != 'object')
            {
                var integer = JSON.parse(JSON.stringify(nosign));
                nosign = [integer];
            }
            
            var popup_error = function(str)
            {
                var opts = 'Invalid action for ' + action + ' inputs';
                if(str)
                {
                    opts = str;
                }
                var error = JSON.stringify({
                    action: action,
                    options: {
                        success: false,
                        message: opts,
                        data: false
                    }
                });
                
                function handleResponse(message)
                {
                    console.info('message', message);
                }

                function handleError(error) 
                {
                    console.info('error', error);
                    console.info('id', id);
                    console.info('opts', opts);
                }

                if(typeof browser == 'object')
                {
                    const sending = browser.runtime.sendMessage(
                        id,
                        {
                            success: false,
                            message: opts,
                            data: false
                        },
                        {}
                    );
                    sending.then(handleResponse, handleError);
                }
                else
                {
                    window.opener.postMessage({
                        direction: "from-content-script",
                        action: action,
                        message: JSON.stringify({
                            action: action,
                            options: JSON.stringify({
                                success: false,
                                message: opts,
                                data: false
                            })
                        })
                    },"*");
                    setTimeout(function()
                    {
                        window.close();
                    }, 150);
                }
            }

            if
            (
                (
                    action == 'signTransaction'
                    && input && username && pin && password 
                    && extracted && finalized && sighash && tweaked
                )
                ||
                (
                    action == 'signMessage'
                    && input && username && pin && password
                )
            )
            {
                ordit.sdk.dnkeys(username, function(dnkeys)
                { 
                    if(dnkeys && typeof dnkeys["saline-salt"] != 'undefined')
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
                                                saline.data.get(function(db)
                                                {   
                                                    var data = db.device.salt;
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
                                                            
                                                            if(action == 'signMessage')
                                                            {   
                                                                var message_options = 
                                                                {
                                                                    seed: seed,
                                                                    network: saline.db.db.defaults.network,
                                                                    message: input
                                                                }
                                                                ordit.sdk.message.sign(
                                                                    message_options, 
                                                                    function(messaged)
                                                                {
                                                                    function handleResponse(message) 
                                                                    {
                                                                        console.info('message', message);
                                                                    }

                                                                    function handleError(error) 
                                                                    {
                                                                        console.info('error', error);
                                                                    }
                                                                    
                                                                    if(typeof browser == 'object')
                                                                    {
                                                                        const sending = browser.runtime.sendMessage(
                                                                            id,
                                                                            messaged,
                                                                            {}
                                                                        );

                                                                        sending.then(handleResponse, handleError);
                                                                    }
                                                                    else
                                                                    {
                                                                        window.opener.postMessage({
                                                                            direction: "from-content-script",
                                                                            action: action,
                                                                            message: JSON.stringify({
                                                                                action: action,
                                                                                options: JSON.stringify(messaged)
                                                                            })
                                                                        },"*");
                                                                        setTimeout(function()
                                                                        {
                                                                            window.close();
                                                                        }, 150);
                                                                    }
                                                                });
                                                            }
                                                            else
                                                            {
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
                                                                if(tweaked == 'true')
                                                                {
                                                                    psbt_options.tweaked = true;
                                                                }
                                                                if(sighash != 'false')
                                                                {
                                                                    psbt_options.sighashType = parseInt(sighash);
                                                                }
                                                                if(extracted == 'true')
                                                                {
                                                                    psbt_options.extracted = true;
                                                                }
                                                                else
                                                                {
                                                                    psbt_options.extracted = false;
                                                                }
                                                                if(finalized == 'true')
                                                                {
                                                                    psbt_options.finalized = true;
                                                                }
                                                                else
                                                                {
                                                                    psbt_options.finalized = false;
                                                                }
                                                                
                                                                if(typeof nosign == 'object' && nosign.length > 0)
                                                                {
                                                                    psbt_options.noSignIndexes = nosign;
                                                                }
                                                                
                                                                ordit.sdk.psbt.sign
                                                                (
                                                                    psbt_options, 
                                                                    function(sigs)
                                                                {   
                                                                    function handleResponse(message)
                                                                    {
                                                                        console.info('message', message);
                                                                    }

                                                                    function handleError(error) 
                                                                    {
                                                                        console.info('error', error);
                                                                    }
                                                                    
                                                                    if(typeof browser == 'object')
                                                                    {
                                                                        const sending = browser.runtime.sendMessage(
                                                                            id,
                                                                            sigs,
                                                                            {}
                                                                        );

                                                                        sending.then(handleResponse, handleError);
                                                                    }
                                                                    else
                                                                    {
                                                                        window.opener.postMessage({
                                                                            direction: "from-content-script",
                                                                            action: action,
                                                                            message: JSON.stringify({
                                                                                action: action,
                                                                                options: JSON.stringify(sigs)
                                                                            })
                                                                        },"*");
                                                                        setTimeout(function()
                                                                        {
                                                                            window.close();
                                                                        }, 150);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    );
                                                })
                                            }
                                            else
                                            {
                                                popup_error('Invalid decrypted credentials');
                                            }
                                        }
                                    );
                                }
                                else
                                {
                                    popup_error('Invalid encrypted credentials');
                                }
                            });
                        }
                        recover();
                    }
                    else
                    {
                        popup_error('Invalid personal credentials');
                    }
                });
            }
            else
            {
                popup_error();
            }
        })
    }
}
window.addEventListener("load", function()
//document.addEventListener("click", (e) => {
{   
    var params = {};
    var s = window.location.search.split('?');
    if(s.length == 2)
    {
        var ps = s[1].split('&');
        for(p = 0; p < ps.length; p++)
        {
            var t = ps[p].split('=');
            params[t[0]] = t[1];
        }
    }
    if
    (
        (
            typeof params.a != 'undefined'
            && params.a == 'signTransaction'
            && typeof params.t != 'undefined'
            && typeof params.n != 'undefined'
            && typeof params.h != 'undefined'
            && typeof params.e != 'undefined'
            && typeof params.f != 'undefined'
            && typeof params.s != 'undefined'
            && typeof params.id != 'undefined'
            && typeof params.ns != 'undefined'
            && params.t
            && params.n
            && params.h
            && params.e
            && params.f
            && params.s
            && params.id
            && params.ns
            &&
            (
                params.n == 'mainnet'
                || params.n == 'testnet'
                || params.n == 'regtest'
            )
        )
        ||
        (
            typeof params.a != 'undefined'
            && params.a == 'signMessage'
            && typeof params.t != 'undefined'
            && typeof params.n != 'undefined'
            && typeof params.msg != 'undefined'
            && typeof params.id != 'undefined'
            && params.t
            && params.n
            && params.msg
            && params.id
            &&
            (
                params.n == 'mainnet'
                || params.n == 'testnet'
                || params.n == 'regtest'
            )
        )
    )
    {
        var signer_fields = [];
        
        if(typeof params.m != 'undefined' && params.m)
        {
            signer_fields.push(
            {
                type: 'alert',
                value: decodeURI(params.m)
            })
        }
        
        if(params.a == 'signTransaction')
        {
            signer_fields.push(
            {
                type: 'text',
                label: 'PSBT',
                value: params.h,
                readonly: true
            });
        }
        else if(params.a == 'signMessage')
        {
            signer_fields.push(
            {
                type: 'text',
                label: 'Message',
                value: decodeURI(params.msg),
                readonly: true
            });
        }
        
        signer_fields.push(
        {
            type: 'text',
            label: 'Username',
            placeholder: 'Provide a domain-based username ...'
        });
        signer_fields.push(
        {
            type: 'number',
            label: 'PIN',
            placeholder: '6 or more numerical digits ...'
        });
        signer_fields.push(
        {
            type: 'password',
            label: 'Password',
            placeholder: 'Enter password to get started ...'
        });
        signer_fields.push(
        {
            type: 'hidden',
            value: params.a // action
        });
        signer_fields.push(
        {
            type: 'hidden',
            value: params.id // id
        });
        
        if(params.a == 'signTransaction')
        {
            signer_fields.push(
            {
                type: 'hidden',
                value: params.e // extracted
            });
            signer_fields.push(
            {
                type: 'hidden',
                value: params.f // finalized
            });
            signer_fields.push(
            {
                type: 'hidden',
                value: params.s // sigHash
            });
            signer_fields.push(
            {
                type: 'hidden',
                value: true // tweaked
            });
            signer_fields.push(
            {
                type: 'hidden',
                value: params.ns // noSignIndexes
            });
        }
        
        var sign_form = saline.html.forms.create(
        {
            css: 'form-ordit-popup-sign',
            fields: signer_fields
        });
        
        var data = 
        {
            card:
            {
                title: decodeURI(params.t),
                content: sign_form
            },
            network: params.n
        }
        var html = '';        
        var div = jQuery('#saline-popup-template');
        var content = jQuery(div).html();
        try
        {
            html = Mustache.render(content, JSON.parse(JSON.stringify(data)));
        }
        catch(e){ console.info('e', e) }
        jQuery(div).html(html);
        saline_popup_sdk.forms();
        saline.loader(false);
    }
    else
    {
        saline.loader(false);
    }
});