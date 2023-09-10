var saline_callbacks = {};
var saline_inited = false;
var saline_windows = {};

function SalineInit() 
{
    if(!saline_inited)
    {
        var callback = false;

        window.addEventListener("message", (event) => 
        {
            if 
            (
                event?.data?.direction === "from-popup-script"
            )
            {
                var content = JSON.stringify(
                {
                    action: event.data.action,
                    options: event.data.message
                });

                window.postMessage(
                {
                    direction: "from-content-script",
                    action: event.data.action,
                    message: content
                },
                "*");

            }
            else if 
            (
                event?.data?.direction === "from-content-script"
            )
            {
                var data = false;
                try
                {
                    data = JSON.parse(event.data.message);
                    callback = saline_callbacks[event.data.action];
                }
                catch(e){ console.info('error.e1', e)}

                if(typeof callback == 'function')
                {
                    callback(JSON.stringify(data));
                }
            }
        });
    }
}

async function SalineSDK(params = {action: false}, callback = false) 
{
    var options = 
    {
        action: false,
        options: options
    };
    Object.assign(options, params);
    
    if
    (
        options.action == 'getAddresses'
        || options.action == 'signTransaction'
        || options.action == 'signMessage'
    )
    {
        saline_callbacks[options.action] = callback;
        
        var content = JSON.stringify(
        {
            action: options.action,
            options: options.options
        });
        
        window.postMessage(
        {
            direction: "from-page-script",
            message: content
        },
        "*");
    }
}
    
function SalinePop(url, opts, action)
{
    var popup = window.open(url, '_blank', opts);
    saline_windows[action] = popup;
}

SalineInit();