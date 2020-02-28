window.addEventListener('load', main);

function main () {
    tools_container = document.querySelector('ytd-page-manager#page-manager.style-scope.ytd-app');

    browser.runtime.sendMessage('load', load_attribute);

    browser.runtime.onMessage.addListener(receiveMessage);
}

function load_attribute (response) {
    tools_container.setAttribute('ext_home_view_mode', response[0]);
    tools_container.setAttribute('ext_home_thumb_size', response[1]);
    tools_container.setAttribute('ext_home_thumb_margin', response[2]);
    tools_container.setAttribute('ext_home_contents_margin', response[3]);
    tools_container.setAttribute('ext_home_font_size', response[4]);
    tools_container.setAttribute('ext_search_view_mode', response[5]);
    tools_container.setAttribute('ext_search_thumb_size', response[6]);
    tools_container.setAttribute('ext_search_thumb_margin', response[7]);
    tools_container.setAttribute('ext_search_contents_margin', response[8]);
    tools_container.setAttribute('ext_search_font_size', response[9]);
    tools_container.setAttribute('ext_playlist_view_mode', response[10]);
    tools_container.setAttribute('ext_playlist_thumb_size', response[11]);
    tools_container.setAttribute('ext_playlist_thumb_margin', response[12]);
    tools_container.setAttribute('ext_playlist_contents_margin', response[13]);
    tools_container.setAttribute('ext_playlist_font_size', response[14]);
}

function receiveMessage (message, sender, sendResponse) {
    if (message.length === 16 && message[15] === 'apply'){
        tools_container.setAttribute('ext_home_view_mode', message[0]);
        tools_container.setAttribute('ext_home_thumb_size', message[1]);
        tools_container.setAttribute('ext_home_thumb_margin', message[2]);
        tools_container.setAttribute('ext_home_contents_margin', message[3]);
        tools_container.setAttribute('ext_home_font_size', message[4]);
        tools_container.setAttribute('ext_search_view_mode', message[5]);
        tools_container.setAttribute('ext_search_thumb_size', message[6]);
        tools_container.setAttribute('ext_search_thumb_margin', message[7]);
        tools_container.setAttribute('ext_search_contents_margin', message[8]);
        tools_container.setAttribute('ext_search_font_size', message[9]);
        tools_container.setAttribute('ext_playlist_view_mode', message[10]);
        tools_container.setAttribute('ext_playlist_thumb_size', message[11]);
        tools_container.setAttribute('ext_playlist_thumb_margin', message[12]);
        tools_container.setAttribute('ext_playlist_contents_margin', message[13]);
        tools_container.setAttribute('ext_playlist_font_size', message[14]);
    }
}