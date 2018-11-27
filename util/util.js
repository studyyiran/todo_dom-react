(function() {
    let util = {a: '1234'}
    window.util = util


    window.$$ = (str) => {
        console.log(str)
        return document.querySelector(str)
    }
})()