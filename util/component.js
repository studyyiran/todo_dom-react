(function(){
    let Components = function () {}
    window.Components = Components
    Components.prototype = {
        cache: {

        },
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
            if (vnode && vnode.props && vnode.props.class == 'fatherOfAll') {
                console.log('get it')
            }
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
                        // switch (key) {
                        //     case 'onchange':
                        //
                        //         break
                        //     case 'onclick':
                        //         dom.onclick = function (event) {
                        //             props[key](event)
                        //         }
                        //         break
                        //     default:
                        //
                        // }
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
            // 这块不对劲。应该触发的是本身的render方法。（这块对，其实是通过父组件触发的。）
            // let vnodeNow = this.render()
            // 然后。。。再。。。更新？或者说，再出发起源导火索？进行一次新的vnode渲染。
            window.rootRender()
        },
        setRootRender: function(renderFunc, dom) {
            // this.rootRender = function () {
                // 此处为了每次重新获得vnode，需要使用render方法
            // }
            window.rootRender = function() {
                console.log('start render')
                dom.innerHTML = ''
                Components.prototype.render(renderFunc(), dom)
                console.log('finish render')
            }
            window.rootRender()
        }
    }
})()
