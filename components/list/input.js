(function() {
    // let Input = function () {
    //
    // }
    // Input.prototype = window.Component.prototype

    // input 继承了。
    // let Input = new (window.Component)()

    // 定义了构造函数首先
    let Input = function () {
        /*
        mvvm
        m-v 靠的是 render函数将state（m）转成 vnode（v，在template的帮助下）
        v-m 开的是 setState 修改m。然后出发reRender
         */
        this.state = {
            value: 'content value'
        }

        /*
        pure view.get state to render with state
         */
        this.vnodeInputOutDiv = function({children = ''}) {
            return ({
                type: 'div',
                props: {
                    class: 'my-input-div',
                },
                children: [
                    {
                        type: 'p',
                        props: {
                            class: 'left'
                        },
                        children: 'circle'
                    },
                    {
                        type: 'span',
                        props: {
                            class: 'mid'
                        },
                        children: this.state.value
                    },
                    {
                        type: 'div',
                        props: {
                            class: 'right'
                        },
                        children: children
                    }
                ]
            })
        }

        this.inputHandler = function(event) {
            // TODO
            this.setState({
                value: event.target.value
            })
        }


        this.vnodeInput = function() {
            return ({
                type: 'input',
                props: {
                    class: 'my-input',
                    onChange: this.inputHandler.bind(this)
                }
            })
        }

        this.vnodeMix = function() {
            return this.vnodeInputOutDiv(
                {children: this.vnodeInput()}
            )
        }

        /*
        类的render方法，入口。
         */
        this.render = function () {
            return this.vnodeMix()
        }
    }
    window.Components.Input = Input
    // 完成继承
    Input.prototype = window.Component.prototype

})()

