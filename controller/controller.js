(function() {
    let model = window.gModel
    let controller = {
        addList: function (func) {
            model.update('listData', func)
        },
        dispatch: function (key, func) {
            model.update(key, func)
        }
    }
    window.gController = controller
})()


