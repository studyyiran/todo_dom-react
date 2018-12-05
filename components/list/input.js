(function() {
    // let Input = function () {
    //
    // }
    // Input.prototype = window.Components.prototype

    // input 继承了。
    // let Input = new (window.Components)()

    // 定义了构造函数首先
    let Input = function () {
        /*
        mvvm
        m-v 靠的是 render函数将state（m）转成 vnode（v，在template的帮助下）
        v-m 开的是 setState 修改m。然后出发reRender
         */
        this.state = {
        }

        this.clickContentHandler = function (e) {
            this.props.getItemClick()
        }

        /*
        pure view.get state to render with state
         */
        this.renderContentStatus = function() {
            return ({
                type: 'div',
                props: {
                    class: 'list_input_container',
                },
                children: [
                    {
                        type: 'div',
                        props: {
                            class: 'list_input_container_finishIcon',
                            onclick: () => {
                                let time = new Date()
                                let dataInfo = this.props.dataInfo
                                dataInfo['finishDate'] = time
                                this.props.update(dataInfo)
                            }
                        },
                        children: ''
                    },
                    {
                        type: 'div',
                        props: {
                            class: 'list_input_container_content',
                            onclick: this.clickContentHandler.bind(this)
                        },
                        children: this.props.dataInfo.content
                    },
                    {
                        type: 'div',
                        props: {
                            class: 'list_input_container_endTime',
                            onclick: this.clickContentHandler.bind(this)
                        },
                        children: this.props.dataInfo.endTime
                    }
                ]
            })
        }

        this.renderItem = function() {
            if (this.props.editStatus) {
                return {
                    type: 'div',
                    children: [
                        this.renderEditStatus(),
                        this.buttons()
                    ]
                }
            } else {
                return this.renderContentStatus()
            }
        }

        this.inputHandler = function(key, event) {
            this.inputCache = this.inputCache || JSON.parse(JSON.stringify(this.props.dataInfo))
            this.inputCache[key] = event.target.value || event
        }

        this.renderEditStatus = function () {
            return {
                type: 'div',
                props: {
                    class: 'list_input_edit',
                    onchange: (event) => {this.inputHandler(event.target.dataset.name, event)},
                },
                children: [
                    this.vnodeInput(),
                    this.dateChange(),
                ]
            }
        }

        this.buttons = function () {
            let buttonSure = {
                type: 'div',
                props: {
                    class: 'button',
                    'data-button': 'ok'
                },
                children: '保存'
            }
            let buttonCancel = {
                type: 'div',
                props: {
                    class: '',
                    'data-button': 'cancel'

                },
                children: '取消'
            }
            return {
                type: 'div',
                props: {
                    onclick: (event) => {
                        let type = event.target.dataset.button
                        let inputValue = this.inputCache
                        // 确认按钮
                        if (inputValue && type === "ok") {
                            this.props.update(inputValue)
                        }
                        this.inputCache = null
                        this.props.getItemClick()
                    }
                },
                children: [
                    buttonSure,
                    buttonCancel
                ]
            }
        }

        this.dateChange = function () {
            return {
                type: 'input',
                props: {
                    value: this.props.dataInfo.endTime,
                    'data-name': 'endTime',
                }
            }
        }


        this.vnodeInput = function() {
            return ({
                type: 'textarea',
                props: {
                    class: 'list_input_edit_textarea',
                    'data-name': 'content',
                    children: this.props.dataInfo.content
                }
            })
        }

        this.vnodeMix = function() {
            return this.renderItem({})
        }

        this.componentDidUpdate = function (props) {
            this.props = props
            if (this.oldProps && this.oldProps.editStatus === true && this.props.editStatus === false) {
                if (this.inputCache) {
                    // 更新状态
                    console.log('didUPdate')
                    let value = this.inputCache
                    this.inputCache = null
                    this.props.update(value)

                }
            }
            this.oldProps = this.props
        }

        /*
        类的render方法，入口。
         */
        this.render = function (props) {
            this.componentDidUpdate(props)
            return this.vnodeMix()
        }
    }
    window.Components.Input = Input
    // 完成继承
    Input.prototype = window.Components.prototype

})()

