(function() {
    // 定义了构造函数首先
    let listContainer = function () {
        /*
        mvvm
        m-v 靠的是 render函数将state（m）转成 vnode（v，在template的帮助下）
        v-m 开的是 setState 修改m。然后出发reRender
         */
        this.state = {
            value: 'content value',
            edit: false
        }


        this.renderList = function() {
            let propsArr = ['1111', '222']
            return propsArr.map((content, key) => {
                return window.Components.get(window.Components.Input, `input${key}`)
                // return window.Components.get(window.Components.Input, `input${key}`)
            })
        }

        /*
        类的render方法，入口。
         */
        this.render = function () {
            console.log('render father')
            return {
                type: 'div',
                props: {
                    class: ''
                },
                children: this.renderList()
            }
        }
    }
    window.Components.listContainer = listContainer
    // 完成继承
    listContainer.prototype = window.Component.prototype

})()

