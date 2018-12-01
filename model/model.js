(function() {
    // 静态对象。
    window.listData = [1,2,3]
    let gModel = {
        state: {

        },
        listener: {

        },
        callBackCache: {

        },
        addListener: function (key, func) {
            this.callBackCache[key] = this.callBackCache[key] || []
            this.callBackCache[key].push(func)
        },
        update: function (key ,updateFunc) {
            let data = this.getDataFromDB(key)
            let newData = updateFunc(data)
            this.updateDB(key, newData)
            this.runAllCallBack(key, newData)
        },
        runAllCallBack: function (key, newData) {
            this.callBackCache[key].map((func) => {
                func(newData)
            })
        },
        getDataFromDB: function (key) {
            let db = window
            return db[key]
        },
        updateDB: function (key, data) {
            let db = window
            db[key] = data
        }
    }
    window.gModel = gModel
})()