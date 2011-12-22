// http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
function t(s, d)
{
    for (var p in d)
        s = s.replace(new RegExp('{' + p + '}','g'), d[p]);
    return s;
}

function pad(i) { return i < 10 ? '0' + i.toString() : i }

// http://stackoverflow.com/questions/11/how-do-i-calculate-relative-time
// converted for javascript
var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var MONTH = 30 * DAY;
function relativeTime(time)
{   
    var delta = Date.now() - time;
    if (delta < 1 * MINUTE)
    {
        var seconds = Math.floor(delta / SECOND);
        return seconds <= 1 ? "1 second ago" : seconds + " seconds ago";
    }
    if (delta < 2 * MINUTE)
    {
        return "1 minute ago";
    }
    if (delta < 45 * MINUTE)
    {
        return Math.floor(delta / MINUTE) + " minutes ago";
    }
    if (delta < 90 * MINUTE)
    {
        return "1 hour ago";
    }
    if (delta < 24 * HOUR)
    {
        return Math.floor(delta / HOUR) + " hours ago";
    }
    if (delta < 48 * HOUR)
    {
        return "yesterday";
    }
    if (delta < 30 * DAY)
    {
        return Math.floor(delta / DAY) + " days ago";
    }
    if (delta < 12 * MONTH)
    {
        var months = Math.floor(delta / DAY / 30);
        return months <= 1 ? "1 month ago" : months + " months ago";
    }
    else
    {
        var years = Math.floor(delta / DAY / 365);
        return years <= 1 ? "1 year ago" : years + " years ago";
    }
}

function getStorageItem(name)
{
    return JSON.parse(localStorage.getItem('bes.' + name));
}

function setStorageItem(name, value)
{
    localStorage.setItem('bes.' + name, JSON.stringify(value));
}

var url = location.href;