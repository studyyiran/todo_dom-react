(function() {
    let util = {a: '1234'}
    window.util = util


    window.$$ = (str) => {
        return document.querySelector(str)
    }
})()