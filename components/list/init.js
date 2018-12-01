(function(){
    window.Components = {
        cache: {

        },
        get: function (func, props, name) {
            if (window.Components.cache[name]) {
                return window.Components.cache[name].render(props)
            } else {
                let Component = new func()
                window.Components.cache[name] = Component
                return Component.render(props)
            }
        }
    }
})()