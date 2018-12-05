/*
首页的js描述
 */
(function() {
    let mainPage = function () {
        window.gModel.addListener('listData', (newData) => {
            this.setState({
                list: newData,
            })
        })

        this.state = {
            list: window.gModel.getDataFromDB('listData'),
            currentTitleIndex: 0
        }

        this.renderTitle = function (item, index) {
            let {title, iconUrl, filterFunc} = item
            return {
                type: 'div',
                props: {
                    class: 'sideBar_item',
                    onclick: () => {
                        this.setState({
                            currentTitleIndex: index
                        })
                    }
                },
                children: [
                    {
                        type: 'img',
                        props: {
                            class: 'sideBar_item_icon',
                            src: iconUrl
                        },
                    },
                    {
                        type: 'span',
                        props: {
                            class: ''
                        },
                        children: title
                    },
                    {
                        type: 'span',
                        props: {
                            class: ''
                        },
                        children: this.state.list.filter(filterFunc).length || '0'
                    },
                ]
            }
        }

        this.renderSideBar = function () {
            return {
                type: 'div',
                props: {
                    class: 'mainPage_sideBar'
                },
                children: this.titles.map((item, index) => {
                    return this.renderTitle(item, index)
                })
            }
        }

        this.init = function () {
            this.titles = [
                {
                    title: '收件箱',
                    iconUrl: '/res/icon/icon_all.png',
                    type: 'receive',
                    filterFunc: (item) => {
                        return !item.finishDate
                    }
                },
                {
                    title: '已完成',
                    iconUrl: '/res/icon/icon_finish.png',
                    type: 'finish',
                    filterFunc: (item) => {
                        return item.finishDate
                    }
                },
            ]
        }

        this.render = function () {
            this.init()
            let {list, currentTitleIndex} = this.state
            let currentList = list.filter(this.titles[currentTitleIndex].filterFunc)
            let type = this.titles[currentTitleIndex].type
            return {
                type: 'div',
                props: {
                    class: 'mainPage'
                },
                children: [
                    this.renderSideBar(),
                    window.Components.prototype.get(window.Components.listContainer, {list: currentList, type: type}, `listContainer`)
                ]
            }
        }
    }
    window.Components.mainPage = mainPage
    mainPage.prototype = window.Components.prototype

})()

