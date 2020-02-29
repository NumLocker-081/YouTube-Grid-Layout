window.addEventListener('load', sub_main);

function sub_main (e) {
    let checkLoadedURL =  browser.tabs.query({'active': true, 'lastFocusedWindow': true});
    checkLoadedURL.then(main);
}

function main (tabs) {
    if (/^https:\/\/www\.youtube\.com.+$/.test(tabs[0].url) === true){
        document.getElementsByTagName('body')[0].setAttribute('url_alert','true');

        let loadExtStates =  browser.runtime.sendMessage('ext_states');
        loadExtStates.then(applyExtStates);

        document.getElementById('apply').addEventListener('click', apply);

        document.getElementById('setting_apply').addEventListener('click', function(){
            let color_theme = document.getElementById('color_theme').value;
            let lang = document.getElementById('language').value;
            document.querySelector('body').setAttribute('color_theme', color_theme);
            document.querySelector('body').setAttribute('lang', lang);

            browser.runtime.sendMessage([color_theme, lang, 'settings']);
            setInputLang(lang);
            setSlectLang(lang);
        })


        document.getElementById('home_view_mode').addEventListener('change', function () {
            if (document.getElementById('home_view_mode').value === 'tile' || document.getElementById('home_view_mode').value === 'simple_tile'){
                document.getElementById('home_can_change').setAttribute('changeable', 'true');
            } else {
                document.getElementById('home_can_change').setAttribute('changeable', 'false');
            }
        })

        document.getElementById('search_view_mode').addEventListener('change', function () {
            if (document.getElementById('search_view_mode').value === 'tile' || document.getElementById('search_view_mode').value === 'wide'){
                document.getElementById('search_can_change').setAttribute('changeable', 'true');
            } else {
                document.getElementById('search_can_change').setAttribute('changeable', 'false');
            }
        })

        document.getElementById('playlist_view_mode').addEventListener('change', function () {
            if (document.getElementById('playlist_view_mode').value === 'tile'){
                document.getElementById('playlist_can_change').setAttribute('changeable', 'true');
            } else {
                document.getElementById('playlist_can_change').setAttribute('changeable', 'false');
            }
        })

    } else {
        browser.runtime.sendMessage('ext_states', error_setup);
    }
}

function applyExtStates (response) {

    document.getElementById('home_view_mode').value = response[0];
    document.getElementById('home_thumb_size').value = response[1];
    document.getElementById('home_thumb_margin').value = response[2];
    document.getElementById('home_contents_margin').value = response[3];
    document.getElementById('home_font_size').value = response[4];
    document.getElementById('search_view_mode').value = response[5];
    document.getElementById('search_thumb_size').value = response[6];
    document.getElementById('search_thumb_margin').value = response[7];
    document.getElementById('search_contents_margin').value = response[8];
    document.getElementById('search_font_size').value = response[9];
    document.getElementById('playlist_view_mode').value = response[10];
    document.getElementById('playlist_thumb_size').value = response[11];
    document.getElementById('playlist_thumb_margin').value = response[12];
    document.getElementById('playlist_contents_margin').value = response[13];
    document.getElementById('playlist_font_size').value = response[14];
    document.getElementById('color_theme').value = response[15];
    document.getElementById('language').value = response[16];
    document.querySelector('body').setAttribute('color_theme', response[15]);
    document.querySelector('body').setAttribute('lang', response[16]);
    setInputLang(response[16]);
    setSlectLang(response[16]);
    
    if (response[0] === 'tile' || response[0] === 'simple_tile'){
        document.getElementById('home_can_change').setAttribute('changeable', 'true');
    } else {
        document.getElementById('home_can_change').setAttribute('changeable', 'false');
    }

    if (response[5] === 'tile' || response[5] === 'wide'){
        document.getElementById('search_can_change').setAttribute('changeable', 'true');
    } else {
        document.getElementById('search_can_change').setAttribute('changeable', 'false');
    }

    if (response[10] === 'tile'){
        document.getElementById('playlist_can_change').setAttribute('changeable', 'true');
    } else {
        document.getElementById('playlist_can_change').setAttribute('changeable', 'false');
    }
}

function apply (e) {
    home_view_mode = document.getElementById('home_view_mode').value;
    home_thumb_size = document.getElementById('home_thumb_size').value;
    home_thumb_margin = document.getElementById('home_thumb_margin').value;
    home_contents_margin = document.getElementById('home_contents_margin').value;
    home_font_size = document.getElementById('home_font_size').value;
    search_view_mode = document.getElementById('search_view_mode').value;
    search_thumb_size = document.getElementById('search_thumb_size').value;
    search_thumb_margin = document.getElementById('search_thumb_margin').value;
    search_contents_margin = document.getElementById('search_contents_margin').value;
    search_font_size = document.getElementById('search_font_size').value;
    playlist_view_mode = document.getElementById('playlist_view_mode').value;
    playlist_thumb_size = document.getElementById('playlist_thumb_size').value;
    playlist_thumb_margin = document.getElementById('playlist_thumb_margin').value;
    playlist_contents_margin = document.getElementById('playlist_contents_margin').value;
    playlist_font_size = document.getElementById('playlist_font_size').value;
    
    let getAllTab =  browser.tabs.query({url: "*://*.youtube.com/*"});
    getAllTab.then(sendToAllTab);

    if (document.getElementById('set_default').checked === true){
        browser.runtime.sendMessage(
            [home_view_mode, home_thumb_size, home_thumb_margin, home_contents_margin, home_font_size,
                search_view_mode, search_thumb_size, search_thumb_margin, search_contents_margin, search_font_size,
                playlist_view_mode, playlist_thumb_size, playlist_thumb_margin, playlist_contents_margin, playlist_font_size, 'save']);
    } else {
        browser.runtime.sendMessage(
            [home_view_mode, home_thumb_size, home_thumb_margin, home_contents_margin, home_font_size,
                search_view_mode, search_thumb_size, search_thumb_margin, search_contents_margin, search_font_size,
                playlist_view_mode, playlist_thumb_size, playlist_thumb_margin, playlist_contents_margin, playlist_font_size, 'apply']);
    }
}

function sendToAllTab (tabs) {
    for (let count = 0; count < tabs.length; count++) {
        browser.tabs.sendMessage(tabs[count].id,
            [home_view_mode, home_thumb_size, home_thumb_margin, home_contents_margin, home_font_size,
                search_view_mode, search_thumb_size, search_thumb_margin, search_contents_margin, search_font_size,
                playlist_view_mode, playlist_thumb_size, playlist_thumb_margin, playlist_contents_margin, playlist_font_size, 'apply']);
    }
}

function setInputLang(lang){
    let all_input_reset = document.querySelectorAll('input.input_reset');
    let all_input_apply = document.querySelectorAll('input.input_apply');
    let all_input_register = document.querySelectorAll('input.input_register');

    if (lang === 'ja'){
        for (let i = 0; i < all_input_reset.length; i++) {
            all_input_reset[i].value = 'リセット';
        }
        for (let i = 0; i < all_input_apply.length; i++) {
            all_input_apply[i].value = '適用';
        }
        for (let i = 0; i < all_input_register.length; i++) {
            all_input_register[i].value = '登録';
        }
    } else if (lang ==='en'){
        for (let i = 0; i < all_input_reset.length; i++) {
            all_input_reset[i].value = 'Reset';
        }
        for (let i = 0; i < all_input_apply.length; i++) {
            all_input_apply[i].value = 'Apply';
        }
        for (let i = 0; i < all_input_register.length; i++) {
            all_input_register[i].value = 'Register';
        }
    }
}

function setSlectLang(lang){
    let all_select_default = document.querySelectorAll('option[value="default"]');
    let all_select_simple = document.querySelectorAll('option[value="simple"]');
    let all_select_tile = document.querySelectorAll('option[value="tile"]');
    let all_select_simpleTile = document.querySelectorAll('option[value="simple_tile"]');
    let all_select_wide = document.querySelectorAll('option[value="wide"]');
    let all_select_ribbon = document.querySelectorAll('option[value="ribbon"]');
    let all_select_light = document.querySelectorAll('option[value="light"]');
    let all_select_dark = document.querySelectorAll('option[value="dark"]');

    if (lang === 'ja'){
        for (let i = 0; i < all_select_default.length; i++) {
            all_select_default[i].innerHTML = 'デフォルト';
        }
        for (let i = 0; i < all_select_simple.length; i++) {
            all_select_simple[i].innerHTML = 'シンプル';
        }
        for (let i = 0; i < all_select_tile.length; i++) {
            all_select_tile[i].innerHTML = 'タイル';
        }
        for (let i = 0; i < all_select_simpleTile.length; i++) {
            all_select_simpleTile[i].innerHTML = 'シンプルタイル';
        }
        for (let i = 0; i < all_select_wide.length; i++) {
            all_select_wide[i].innerHTML = 'ワイド';
        }
        for (let i = 0; i < all_select_ribbon.length; i++) {
            all_select_ribbon[i].innerHTML = 'リボン';
        }
        for (let i = 0; i < all_select_light.length; i++) {
            all_select_light[i].innerHTML = 'ライト';
        }
        for (let i = 0; i < all_select_dark.length; i++) {
            all_select_dark[i].innerHTML = 'ダーク';
        }
    } else if (lang === 'en'){
        for (let i = 0; i < all_select_default.length; i++) {
            all_select_default[i].innerHTML = 'Default';
        }
        for (let i = 0; i < all_select_simple.length; i++) {
            all_select_simple[i].innerHTML = 'Simple';
        }
        for (let i = 0; i < all_select_tile.length; i++) {
            all_select_tile[i].innerHTML = 'Tile';
        }
        for (let i = 0; i < all_select_simpleTile.length; i++) {
            all_select_simpleTile[i].innerHTML = 'Simple Tile';
        }
        for (let i = 0; i < all_select_wide.length; i++) {
            all_select_wide[i].innerHTML = 'Wide';
        }
        for (let i = 0; i < all_select_ribbon.length; i++) {
            all_select_ribbon[i].innerHTML = 'Ribbon';
        }
        for (let i = 0; i < all_select_light.length; i++) {
            all_select_light[i].innerHTML = 'Light';
        }
        for (let i = 0; i < all_select_dark.length; i++) {
            all_select_dark[i].innerHTML = 'Dark';
        }
    }
}

function error_setup (response) {
    document.querySelector('body').setAttribute('color_theme', response[15]);
    document.querySelector('body').setAttribute('lang', response[16]);
}