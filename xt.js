var XT = (function()
{
    // package
    var api = {};
    
    // private
    var prefix = '';
    
    // public
    api.get = function(name, defval)
    {
        var result = JSON.parse(localStorage.getItem(prefix + name));
        return result !== null ? result : defval;
    };
    
    api.getAll = function(asArray)
    {
        var result = asArray ? [] : {};
        for (var key in localStorage)
            if (key.substr(0, prefix.length) === prefix)
                if (asArray)
                    result.push({key: key, value: api.get(key.substr(prefix.length))});
                else
                    result[key] = api.get(key.substr(prefix.length));
        return result;
    };
    
    api.init = function(name)
    {
        prefix = name + '.';
    };
    
    api.remove = function(name)
    {
        localStorage.removeItem(name);
    };
    
    api.set = function(name, value)
    {
        localStorage.setItem(prefix + name, JSON.stringify(value));
    };
    
    return api;
})();