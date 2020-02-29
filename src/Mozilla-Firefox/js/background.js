chrome.runtime.onInstalled.addListener(function (details){
    if (details.reason === 'install'){
        
        let user_lang = navigator.language;

        if(user_lang === undefined){
            enSetup();
        } else {
            if(user_lang.toLowerCase().indexOf("ja") !== -1){
                jaSetup();
            }
            else{
                enSetup();
            }
        }
    
        function jaSetup() {
            chrome.storage.local.set({
                "home_view_mode": 'default',
                "home_thumb_size": 4,
                "home_thumb_margin": 4,
                "home_contents_margin": 4,
                "home_font_size": 4,
                "search_view_mode": 'default',
                "search_thumb_size": 4,
                "search_thumb_margin": 4,
                "search_contents_margin": 4,
                "search_font_size": 4,
                "playlist_view_mode": 'tile',
                "playlist_thumb_size": 4,
                "playlist_thumb_margin": 4,
                "playlist_contents_margin": 4,
                "playlist_font_size": 4,
        
                "color_theme": 'dark',
                "lang": 'ja'
            });
        }
        
        function enSetup() {
            chrome.storage.local.set({
                "home_view_mode": 'default',
                "home_thumb_size": 4,
                "home_thumb_margin": 4,
                "home_contents_margin": 4,
                "home_font_size": 4,
                "search_view_mode": 'default',
                "search_thumb_size": 4,
                "search_thumb_margin": 4,
                "search_contents_margin": 4,
                "search_font_size": 4,
                "playlist_view_mode": 'tile',
                "playlist_thumb_size": 4,
                "playlist_thumb_margin": 4,
                "playlist_contents_margin": 4,
                "playlist_font_size": 4,
        
                "color_theme": 'dark',
                "lang": 'en'
            });
        }
    }
});

let ext_states = [[''], ['']];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){

    if (message === 'load'){

        chrome.tabs.query({url: "*://*.youtube.com/*"}, function (tabs){
            if (tabs.length >= 2 && ext_states[1][0] !== ''){

                sendResponse(ext_states[0]);

            } else {

                chrome.storage.local.get(["home_view_mode", "home_thumb_size", "home_thumb_margin", "home_contents_margin", "home_font_size",
                "search_view_mode", "search_thumb_size", "search_thumb_margin", "search_contents_margin", "search_font_size",
                "playlist_view_mode", "playlist_thumb_size", "playlist_thumb_margin", "playlist_contents_margin", "playlist_font_size"],
                function(items){
                    sendResponse([items.home_view_mode, items.home_thumb_size, items.home_thumb_margin, items.home_contents_margin, items.home_font_size,
                        items.search_view_mode, items.search_thumb_size, items.search_thumb_margin, items.search_contents_margin, items.search_font_size,
                        items.playlist_view_mode, items.playlist_thumb_size, items.playlist_thumb_margin, items.playlist_contents_margin, items.playlist_font_size]);
                })

            }
        })
    }

    if (message === 'ext_states'){

        if (ext_states[1][0] === ''){
            chrome.storage.local.get(["home_view_mode", "home_thumb_size", "home_thumb_margin", "home_contents_margin", "home_font_size",
            "search_view_mode", "search_thumb_size", "search_thumb_margin", "search_contents_margin", "search_font_size",
            "playlist_view_mode", "playlist_thumb_size", "playlist_thumb_margin", "playlist_contents_margin", "playlist_font_size",
            "color_theme", "lang"],
            function(items){
                sendResponse([items.home_view_mode, items.home_thumb_size, items.home_thumb_margin, items.home_contents_margin, items.home_font_size,
                    items.search_view_mode, items.search_thumb_size, items.search_thumb_margin, items.search_contents_margin, items.search_font_size,
                    items.playlist_view_mode, items.playlist_thumb_size, items.playlist_thumb_margin, items.playlist_contents_margin, items.playlist_font_size,
                    items.color_theme, items.lang]);
            })
        } else {
            chrome.storage.local.get(["color_theme", "lang"],
                function(items){
                    sendResponse(ext_states[0].concat([items.color_theme, items.lang]));
                }
            )
        }

    }

    if (message.length === 16 && message[15] === 'save'){
        chrome.storage.local.set({
            "home_view_mode": message[0],
            "home_thumb_size": message[1],
            "home_thumb_margin": message[2],
            "home_contents_margin": message[3],
            "home_font_size": message[4],
            "search_view_mode": message[5],
            "search_thumb_size": message[6],
            "search_thumb_margin": message[7],
            "search_contents_margin": message[8],
            "search_font_size": message[9],
            "playlist_view_mode": message[10],
            "playlist_thumb_size": message[11],
            "playlist_thumb_margin": message[12],
            "playlist_contents_margin": message[13],
            "playlist_font_size": message[14]
        });
        ext_states = [[message[0], message[1], message[2], message[3], message[4], message[5], message[6], message[7], message[8], message[9], message[10], message[11], message[12], message[13], message[14]], ['save']];
    } else if (message.length === 16 && message[15] === 'apply'){
        ext_states = [[message[0], message[1], message[2], message[3], message[4], message[5], message[6], message[7], message[8], message[9], message[10], message[11], message[12], message[13], message[14]], ['apply']];
    }

    if (message.length === 3 && message[2] === 'settings'){
        chrome.storage.local.set({
            "color_theme": message[0],
            "lang": message[1]
        });
    }

    return true;
})