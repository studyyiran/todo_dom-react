(function() {
    // 静态对象。
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

            let db = this.getDB('test')
            return db[key]
        },
        updateDB: function (key, data) {
            let db = this.getDB('test') || {}
            db[key] = data
            window.sessionStorage.setItem('test', JSON.stringify(db))
            return this.getDB('test')
        },
        getDB: function (dbName) {
            let db = window.sessionStorage.getItem(dbName) || this.initDB({'listData': [1,2,3]})
            db = JSON.parse(db)
            return db
        },
        initDB: function (data) {
            window.sessionStorage.setItem('test', JSON.stringify(data))
            return this.getDB('test')
        }
    }
    window.gModel = gModel
})()