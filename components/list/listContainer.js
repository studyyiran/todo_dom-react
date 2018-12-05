/*
列表容器。用于包括一堆input item
 */
(function() {
    let listContainer = function () {
        this.state = {
            currentShowIndex: undefined,
        }

        this.updateInfo = function (itemId, newContent) {
            window.gController.dispatch('listData',function (oData) {
                let resultIndex = oData.findIndex(item => item.itemId === itemId)
                if (resultIndex !== -1) {
                    oData[resultIndex] = newContent
                }
                return oData
            })
        }

        this.getItemClick = function (key) {
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
            let arr = this.props.list.map((dataInfo, key) => {
                return window.Components.prototype.get(window.Components.Input, {
                    type: this.props.type,
                    update: this.updateInfo.bind(this, dataInfo.itemId),
                    getItemClick: this.getItemClick.bind(this, key),
                    editStatus: this.state.currentShowIndex === key,
                    dataInfo: dataInfo}, `input${key}`)
                // return window.Components.prototype.get(window.Components.Input, `input${key}`)
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
            if (this.props.type === 'receive') {
                return {
                    type: 'div',
                    props: {
                        onclick: function () {
                            window.gController.dispatch('listData',function (oData) {
                                oData.push(window.gModel.getNewListObj())
                                return oData
                            })
                        }
                    },
                    children: '添加+'
                }
            } else {
                return null
            }
        }

        this.init = function (props) {
            this.props = props
        }

        /*
        类的render方法，入口。
         */
        this.render = function (props) {
            this.init(props)
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
    listContainer.prototype = window.Components.prototype

})()

