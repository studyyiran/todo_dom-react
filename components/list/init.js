(function(){
    window.Components = {
        cache: {

        },
        get: function (func, name) {
            if (window.Components.cache[name]) {
                console.log('cache')
                return window.Components.cache[name].render()
            } else {
                console.log('not cache')
                let Component = new func()
                window.Components.cache[name] = Component
                return Component.render()
            }
        }
    }
})()