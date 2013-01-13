// unsafeWindow hack for chrome and console helper for firefox
window.unsafeWindow = (function()
{
    var e = document.createElement('p');
    e.setAttribute('onclick', 'return window;');
    return e.onclick();
})();
console = unsafeWindow.console;