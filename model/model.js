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
            window.localStorage.setItem('test', JSON.stringify(db))
            return this.getDB('test')
        },
        getDB: function (dbName) {
            let db = window.localStorage.getItem(dbName) || this.initDB({'listData': [1,2,3]})
            db = JSON.parse(db)
            return db
        },
        initDB: function (data) {
            window.localStorage.setItem('test', JSON.stringify(data))
            return this.getDB('test')
        },
        transData: function () {
            let saveKey = 'save'
            let number = 0
            while(sessionStorage.getItem(`save${number}`)) {
                number++
            }
            function transFunc(oldData) {
                oldData.finishData = ''
                return oldData
            }
            // 备份
            sessionStorage.setItem(`save${number}`, localStorage.getItem('test'))
            let originData = JSON.parse(sessionStorage.getItem(`save${number}`))
            // 转换
            // let newData = originData.listData.map(transFunc)
            let newData = {listData: originData}
            // 输出结果，并替换源数据
            localStorage.setItem(`test`, JSON.stringify(newData))

        }
    }
    window.gModel = gModel
})()