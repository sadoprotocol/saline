if(typeof browser == 'object')
{
    browser.runtime.onMessage.addListener(async function(e, f, g)
    {
        var wins = await browser.windows.getAll();
        for(w = 0; w < wins.length; w++)
        {
            var tab = false;
            var old_tabs = await browser.tabs.query({
                windowId: wins[w].id,
                active: true,
                title: 'SALINE'
            });
            for(ot = 0; ot < old_tabs.length; ot++)
            {
                await browser.tabs.remove(old_tabs[ot].id)
            }
            var tabs = await browser.tabs.query({
                windowId: wins[w].id,
                active: true 
            });
            if
            (
                typeof tabs == 'object' && tabs.length == 1
                && typeof tabs[0].id != 'undefined'
            )
            {
                tab = tabs[0].id;
            }
            try
            {
                if(tab)
                {
                    await browser.tabs.sendMessage(tab, e);
                }
            }
            catch(err){}
        }
        var results = 
        {
            e: e,
            f: f,
            w: wins
        }
        g(results);
    });
}