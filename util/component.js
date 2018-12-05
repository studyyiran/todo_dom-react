(function(){
    let Components = function () {}
    window.Components = Components
    Components.prototype = {
        cache: {

        },
        status: undefined,
        get: function (func, props, name) {
            if (window.Components.prototype.cache[name]) {
                return window.Components.prototype.cache[name].render(props)
            } else {
                let Component = new func()
                window.Components.prototype.cache[name] = Component
                return Component.render(props)
            }
        },
        render: function (vnode, root) {
            // root.innerHTML = ''
            let {type, props} = vnode

            let children = vnode.children || (props && props.children)
            // 如果vnode是一个文本节点
            if (!children && (typeof vnode === 'string' || typeof vnode === 'number' )) {
                // fix 这块会破坏root的结构。
                let textNode = document.createTextNode(vnode)
                root.appendChild(textNode)
            } else {
                let dom = document.createElement(type)
                if (props && Object.keys(props) && Object.keys(props).length) {
                    if (Object.keys(props).find((key) => {
                        return key === 'showDom' && props[key] === false
                    })) {
                        return root
                    }
                    Object.keys(props).map(key => {
                        if (key.indexOf('on') === 0) {
                            dom[key] = function (event) {
                                props[key](event)
                            }
                        } else if (key !== 'children') {
                            dom.setAttribute(key, props[key])
                        }
                    })
                }
                root.appendChild(dom)
                if (children) {
                    // 根据children类型渲染
                    if (children instanceof Array) {
                        children.map(child => {
                            // 这种可以理解成静态方法吧我想
                            Components.prototype.render(child, dom)
                        })
                    } else if (children instanceof Object) {
                        Components.prototype.render(children, dom)
                    } else {
                        Components.prototype.render(children, dom)
                    }
                }
            }
            return root
        },
        setState: function (nextState) {
            let newState = Object.assign({}, this.state, nextState)
            // 更新了自身的state之后。就仅仅需要父组件触发子组件的render方法了。
            this.state = newState
            // let vnodeNow = this.render()
            // 现在每次都会通过重新渲染根节点，并且配合缓存了的Component保留state，来完成reRender
            // 以后需要优化成仅仅渲染变化的节点。
            window.rootRender()
        },
        setRootRender: function(renderFunc, dom) {
            // this.rootRender = function () {
                // 此处为了每次重新获得vnode，需要使用render方法
            // }
            window.rootRender = function() {
                // window.Components.status = 'beforeRender'
                dom.innerHTML = ''
                Components.prototype.render(renderFunc(), dom)
                // window.Components.status = 'afterRender'
                // 执行钩子
                window.Components.prototype.runTrigger('afterRender')
            }
            window.rootRender()
        },
        promiseObj: {},
        addPromise: function (key) {
            if (!this.promiseObj[key]) {
                let promiseTrigger
                this.promiseObj[key] = {
                    promise: new Promise((resolve, reject) => {
                        promiseTrigger = resolve
                    }),
                    trigger: promiseTrigger
                }
            }
            return this.promiseObj[key].promise
        },
        runTrigger: function (key) {
            if (this.promiseObj[key] && this.promiseObj[key].trigger) {
                this.promiseObj[key].trigger()
                this.promiseObj[key] = undefined
            }
        }
    }
})()
