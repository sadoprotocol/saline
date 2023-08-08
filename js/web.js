"use strict";

var saline_id = false;
var saline_tab = false;
var saline_popup = false;
var saline_window = false;

if(typeof chrome == 'object' || typeof browser == 'object')
{
    saline_window = window;
    
    var post_message = function(e, f, g)
    {
        var action = 'signTransaction';
        if(typeof e.data == 'object' && typeof e.data.psbt == 'undefined')
        {
            action = 'signMessage';
        }
        saline_window.postMessage(
        {
            direction: "from-popup-script",
            message: JSON.stringify(e),
            action: action
        },
        "*");
    }
    
    if(typeof chrome == 'object')
    {
        var s = document.createElement('script');
        s.src = chrome.runtime.getURL('js/saline-sdk.js');  
        s.onload = function() { this.remove(); };
        (document.head || document.documentElement).appendChild(s);
        chrome.runtime.onMessage.addListener(post_message);
    }
    else if(typeof browser == 'object')
    {
        exportFunction(SalineInit, window, {defineAs:'SalineInit'});
        exportFunction(SalineSDK, window, {defineAs:'SalineSDK'});
        exportFunction(SalinePop, window, {defineAs:'SalinePop'});
        browser.runtime.onMessage.addListener(post_message);
    }
    
    window.addEventListener("message", async (event) => 
    {
        console.log('web.event', event);
        if 
        (
            event.source === window &&
            event?.data?.direction === "from-page-script"
        ) 
        {
            var data = false;
            try
            {
                data = JSON.parse(event.data.message);
            }
            catch(e){}

            var results = 
            {
                success: false,
                message: 'Invalid action',
                data: false
            };

            var db = false;

            var got_db = function()
            {
                saline.data.get(function(db)
                {
                    if
                    (
                        typeof db == 'object'
                        && typeof db.user == 'object'
                        && typeof db.user.key != 'undefined'
                        && typeof data == 'object'
                        && typeof data.options == 'object'
                        && typeof data.options.network != 'undefined'
                        && typeof data.action != 'undefined'
                    )
                    {
                        ordit.sdk.wallet.get({
                            key: db.user.key,
                            format: 'p2tr',
                            network: data.options.network
                        },  function(w)
                        {   
                            if(w.success)
                            {
                                if
                                (
                                    data.action == 'signTransaction'
                                    && typeof data.options.psbt != 'undefined'
                                )
                                {
                                    var width = 580;
                                    var height = 560;
                                    var difference = window.screen.width - window.outerWidth;
                                    var left = (window.screenX + (window.outerWidth - width)) - 2;
                                    var top = (window.screenY + (window.screen.height - window.screen.availHeight)) - 20;

                                    var url_request = saline_popup + '?t=Sign Transaction&a=signTransaction';
                                    url_request+= '&n=' + data.options.network;
                                    url_request+= '&h=' + data.options.hex;
                                    url_request+= '&e=' + data.options.extracted;
                                    url_request+= '&f=' + data.options.finalized;
                                    url_request+= '&s=' + data.options.sighashType;
                                    url_request+= '&id=' + saline_id;

                                    if(typeof data.options.msg != 'undefined' && data.options.msg)
                                    {
                                        url_request+= '&m=' + data.options.msg;
                                    }

                                    var opts = "left=" + left + ",height=" + height;
                                    opts+= ",width=" + width + ",top=" + top;
                                    opts+= ",noopener=no,opener=yes";
                                    
                                    SalinePop(url_request, opts, data.action);
                                    
                                }
                                else if
                                (
                                    data.action == 'signMessage'
                                    && typeof data.options.message != 'undefined'
                                )
                                {
                                    var width = 580;
                                    var height = 560;
                                    var difference = window.screen.width - window.outerWidth;
                                    var left = (window.screenX + (window.outerWidth - width)) - 2;
                                    var top = (window.screenY + (window.screen.height - window.screen.availHeight)) - 20;

                                    var url_request = saline_popup + '?t=Sign Message&a=signMessage';
                                    url_request+= '&n=' + data.options.network;
                                    url_request+= '&msg=' + data.options.message;
                                    url_request+= '&id=' + saline_id;

                                    if(typeof data.options.msg != 'undefined' && data.options.msg)
                                    {
                                        url_request+= '&m=' + data.options.msg;
                                    }

                                    var opts = "left=" + left + ",height=" + height;
                                    opts+= ",width=" + width + ",top=" + top;
                                    //opts+= ",titlebar=0,toolbar=0,menubar=0,resizable=0,location=0";
                      
                                    opts+= ",noopener=no,opener=yes";
                      
                                    SalinePop(url_request, opts, data.action);
                                }
                                else 
                                {
                                    if(data.action == 'getAddresses')
                                    {
                                        results.success = true;
                                        results.message = 'Addresses attached to data';
                                        results.data = w.data.addresses;
                                    }
                                    window.postMessage(
                                    {
                                        direction: "from-content-script",
                                        message: JSON.stringify(results),
                                        action: data.action
                                    },
                                    "*");
                                }

                            }
                            else
                            {
                                results.message = w.message;
                                window.postMessage(
                                {
                                    direction: "from-content-script",
                                    message: JSON.stringify(results),
                                    action: data.action
                                },
                                "*");
                            }
                        });
                    }
                    else
                    {
                        window.postMessage(
                        {
                            direction: "from-content-script",
                            message: JSON.stringify(results),
                            action: data.action,
                            popup: saline_popup
                        },
                        "*");
                    }
                });
            }

            if(typeof chrome == 'object')
            {
                try
                {
                    chrome.storage.local.get(function(this_db)
                    {
                        db = this_db;
                        saline_popup = chrome.runtime.getURL('content/popup.html');
                        saline_id = chrome.runtime.id;
                        got_db();
                    });
                }
                catch(e){ }
            }
            else if(typeof browser == 'object')
            {
                try
                {
                    db = await browser.storage.local.get();
                    saline_popup = await browser.runtime.getURL('content/popup.html');
                    saline_id = await browser.runtime.id;
                }
                catch(e){ }
                got_db();
            }
        }
    });
}