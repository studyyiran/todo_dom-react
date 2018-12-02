(function() {
    let listContainer = function () {
        // TODO 这个如何定义的更好一些？
        // window.gModel.addListener('listData', this.constructor.bind(this))
        let that = this
        // 这个如何不用箭头函数写
        window.gModel.addListener('listData', (newData) => {
            this.setState({
                list: newData
            })
        })

        // 拉取数据仓库如何更加优雅一些
        this.state = {
            list: window.gModel.getDataFromDB('listData'),
            currentShowIndex: undefined,
        }

        this.updateInfo = function (key, newContent) {
            window.gController.dispatch('listData',function (oData) {
                oData[key] = newContent
                return oData
            })
        }

        this.getItemClick = function (key) {
            this.setState({
                currentShowIndex: key
            })
            return
            if (this.state.currentShowIndex === key) {
                this.setState({
                    currentShowIndex: undefined
                })
            } else {
                this.setState({
                    currentShowIndex: key
                })
            }
        }


        this.renderList = function() {
            let arr = window.gModel.getDataFromDB('listData').map((dataInfo, key) => {
                return window.Components.get(window.Components.Input, {
                    update: this.updateInfo.bind(this, key),
                    getItemClick: this.getItemClick.bind(this, key),
                    editStatus: this.state.currentShowIndex === key,
                    dataInfo: dataInfo}, `input${key}`)
                // return window.Components.get(window.Components.Input, `input${key}`)
            })
            return {
                type: 'div',
                props: {
                    class: 'list_container'
                },
                children: arr
            }
        }

        this.addButton = function () {
            return {
                type: 'div',
                props: {
                    onclick: function () {
                        window.gController.dispatch('listData',function (oData) {
                            oData.push('new')
                            return oData
                        })
                    }
                },
                children: '添加+'
            }
        }

        /*
        类的render方法，入口。
         */
        this.render = function () {
            return {
                type: 'div',
                props: {
                    class: ''
                },
                children: [
                    this.renderList(),
                    this.addButton()
                ]
            }
        }
    }
    window.Components.listContainer = listContainer
    listContainer.prototype = window.Component.prototype

})()

