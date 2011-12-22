var SCRIPT_VERSION = '0.15';

if (url.search(/profile\.aspx\?page=chapters/i) !== -1)
{
    var timestamps = getStorageItem('groups.general.timestamps') || {};
    var groups = document.getElementById('ctl00_mainContent_chaptersPanel')
                     .getElementsByClassName('arrow4');
    for (var i = 0, c = groups.length; i < c; ++i)
    {
        var list = groups[i].firstElementChild;
        var link = list.firstElementChild.firstElementChild;
        var id = link.href.match(/fanclub\/([^\/]+)\/group/i)[1];
        var el = document.createElement('strong');
        el.textContent = 'Last post:';
        list.appendChild(document.createElement('br'));
        list.appendChild(el);
        list.appendChild(document.createTextNode(' ' + (timestamps[id] ? relativeTime(timestamps[id]) : 'N/A')));
        //console.log(link.text, ' ', link.href.match(/fanclub\/([^\/]+)\/group/i)[1]);
    }
}
else if (url.search(/fanclub\/[^\/]+\/forums\/createpost\.aspx/i) !== -1)
{
    var timestamps = getStorageItem('groups.general.timestamps') || {};
    var link = document.getElementById('ctl00_backToIndexLink');
    var id = link.href.match(/fanclub\/([^\/]+)\/forums/i)[1];
    var submit = document.getElementById('ctl00_mainContent_postForm_skin_submitButton');
    submit.addEventListener('click', function()
    {
        timestamps[id] = Date.now();
        setStorageItem('groups.general.timestamps', timestamps);
    }, false);
}
else if (url.search(/fanclub\/[^\/]+\/forums\/posts\.aspx/i) !== -1)
{
    var i = 1;
    var el = null;
    // go through each post
    while (el = document.getElementById('ctl00_mainContent_postRepeater1_ctl' + pad(i++) + '_ctl00_postControl_skin_author_header'))
    {
        // create a closure for 'el'
        (function(_el) {
            var msglink = _el.lastElementChild.firstElementChild;
            // the post might be your own, and has no message link
            if (!msglink)
                return;
            msglink.addEventListener('click', function()
            {
                    var nameEl = _el.parentNode.parentNode.parentNode.firstElementChild;
                    if (nameEl.name === 'end') nameEl = nameEl.nextElementSibling;
                    // set the return link for use in the page to come
                    setStorageItem('messages.general.returnlink', url.replace('#end', '') + '#' + nameEl.name);
            }, false);
        })(el);
    }
}
else if (url.search(/profile\.aspx\?postid=[0-9]+\&act=msg/i) !== -1 && !document.getElementById('ctl00_mainContent_messageForm_skin_previewButton'))
{
    var el = document.getElementById('ctl00_mainContent_messageForm').firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild;
    var newEl = document.createElement('strong');
    var link = document.createElement('a');
    link.href = getStorageItem('messages.general.returnlink');
    link.textContent = 'Return to thread';
    newEl.appendChild(link);
    el.appendChild(document.createElement('br'));
    el.appendChild(document.createElement('br'));
    el.appendChild(newEl);
}