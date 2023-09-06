var oip4_renderer = 
{
    config:
    {
        testing: 'https://trinity-testnet.ordit.io',
        //testing: false
    },
    init: function()
    {
        var m = oip4_renderer.meta();
        if
        (
            typeof m == 'object'
            && typeof m.p != 'undefined'
            && typeof m.v != 'undefined'
            && typeof m.mt != 'undefined'
            && typeof m.iids == 'object'
            && m.p == 'chunks'
            && m.v == 1
        )
        {
            var file = '';
            var total_chunks = 0;
            var cover = '';
            var play = '';
            
            if
            (
                typeof m.meta == 'object'
                && typeof m.meta.cover != 'undefined'
            )
            {
                if(oip4_renderer.config.testing)
                {
                    cover+= oip4_renderer.config.testing;
                }
                cover+= '/content/' + m.meta.cover;
            }
            if
            (
                typeof m.meta == 'object'
                && typeof m.meta.play != 'undefined'
            )
            {
                if(oip4_renderer.config.testing)
                {
                    play+= oip4_renderer.config.testing;
                }
                play+= '/content/' + m.meta.play;
            }

            async function loop() 
            {
                for(i = 0; i < m.iids.length; i++)
                { 
                    var ins = m.iids[i];
                    
                    await new Promise(next => 
                    {
                        var uri = '';
                        if(oip4_renderer.config.testing)
                        {
                            uri+= oip4_renderer.config.testing;
                        }
                        uri+= '/content/' + ins;
                        
                        var callback = function(res)
                        {
                            if
                            (
                                typeof res == 'object'
                                && typeof res.d != 'undefined'
                                && typeof res.i != 'undefined'
                                && typeof res.l != 'undefined'
                                && typeof res.t != 'undefined'
                                && res.i == i
                                && res.t == m.iids.length
                            )
                            {
                                file+= res.d;
                                total_chunks++;
                                next();
                            }
                        }
                        fetch
                        (
                            uri, 
                            {
                                method: 'GET'
                            }
                        )
                        .then(response => response.json())
                        .then(response => callback(response))
                        .catch(response => callback(false))
                    });
                }
            }
            loop().then(() => 
            {
                if(total_chunks == m.iids.length)
                {
                    async function digestMessage(message) {
                      const encoder = new TextEncoder();
                      const data = encoder.encode(message);
                      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
                      const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
                      const hashHex = hashArray
                        .map((b) => b.toString(16).padStart(2, "0"))
                        .join(""); // convert bytes to hex string
                      return hashHex;
                    }

                    digestMessage(JSON.stringify(m.iids)).then((id) =>
                    {
                        var html = 'FORMAT NOT SUPPORTED';
                        var body = document.querySelector('#main-body');
                        var wrapper = document.querySelector('.oip4-renderer');
                        
                        if(m.mt.indexOf('image') > -1)
                        {
                            html = '<img id="ordit-' + id + '" class="ordit-image" src="data:' + m.mt + ';base64, ' + file + '" type="' + m.mt + '" crossorigin="anonymous" />';
                            
                            wrapper.innerHTML = html;
                        }
                        else if
                        (
                            m.mt.indexOf('audio') > -1
                            || m.mt.indexOf('video') > -1
                        )
                        {
                            html = '<video controls id="ordit-' + id + '" class="ordit-video" poster="' + cover + '" data-play="' + play + '" src="data:' + m.mt + ';base64, ' + file + '" type="' + m.mt + '" crossorigin="anonymous"></video>';
                            
                            wrapper.innerHTML = html;

                            let player = document.getElementById('ordit-' + id);

                            player.onplay = function() 
                            {
                                document.getElementById('ordit-' + id).setAttribute('poster', play);
                            }; 
                            player.onstop = function() 
                            {
                                document.getElementById('ordit-' + id).setAttribute('poster', cover);
                            }; 
                            player.onpause = function() 
                            {
                                document.getElementById('ordit-' + id).setAttribute('poster', cover);
                            }; 
                        }
                        else
                        {
                            wrapper.innerHTML = html;
                        }
                        body.classList.remove("loading");
                    });
                }
            });
        }
    },
    meta: function()
    {
        var m = false;
        try
        {
            m = JSON.parse(document.getElementById("main-body").getAttribute("data-oip4"));
        }
        catch(e){}
        return m;
    }
}

window.addEventListener("load", (event) => 
{
    oip4_renderer.init();
});