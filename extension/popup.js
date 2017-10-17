
function getCurrentTabUrl (callback) {

    var query_info = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(query_info, function (tabs) {
        
        var tab = tabs[0],
            url = tab.url;

        callback(url);
    });
}

function getTrelloCardId (url) {

    var url_regex = new RegExp('\:\/\/trello\.com\/c\/(.*?)\/');
    if (url) {
        var url_matches = url.match(url_regex);
        if (url_matches) {
            return url_matches[1];
        }

    } else {
        return null;
    }
}

function getTrelloEditHistoryUrl (card_id) {

    return 'https://trello.com/1/cards/' + card_id + '/actions?filter=updateCard:desc';
}

document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabUrl(function (url) {

        var valid_container   = document.getElementById('valid'),
            invalid_container = document.getElementById('invalid'),
            history_url       = document.getElementById('history_url');

        var currentTabUrl = getCurrentTabUrl(function (url) {

            var trelloCardId = getTrelloCardId(url);
            if (trelloCardId) {

                history_url.href = getTrelloEditHistoryUrl(trelloCardId);

                valid_container.style.display   = 'block';
                invalid_container.style.display = 'none';
            } else {
                valid_container.style.display   = 'none';
                invalid_container.style.display = 'block';
            }
        });
    });
});