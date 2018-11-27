(function(){
    window.Component = function () {
    }
    Component.prototype = {
        render: function (vnode, root) {
            console.log('start')
            // root.innerHTML = ''
            let {type, props} = vnode
            let children = vnode.children || (props && props.children)
            if (!children && typeof vnode === 'string') {
                children = vnode
            }
            let dom = document.createElement(type)
            if (props && Object.keys(props) && Object.keys(props).length) {
                Object.keys(props).map(key => {
                    if (key === 'onChange') {
                        dom.onchange = function (event) {
                            console.log(event)
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
                if (typeof children === 'string') {
                    root.textContent = children
                } else if (children instanceof Array) {
                    children.map(child => {
                        // 这种可以理解成静态方法吧我想
                        Component.prototype.render(child, dom)
                    })
                } else if (children instanceof Object) {
                    Component.prototype.render(children, dom)
                }
            }
            return root
        },
        setState: function (nextState) {
            console.log('setState')
            let newState = Object.assign({}, this.state, nextState)
            this.state = newState
            this.rootRender()
        },
        setRootRender: function(renderFunc, dom) {
            this.rootRender = function () {
                console.log('clear')
                dom.innerHTML = ''
                // 此处为了每次重新获得vnode，需要使用render方法
                Component.prototype.render(renderFunc(), dom)
            }
            console.log('set')
            this.rootRender()
        }
    }
})()
