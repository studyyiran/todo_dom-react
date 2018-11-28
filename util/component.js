(function(){
    window.Component = function () {
    }
    Component.prototype = {
        render: function (vnode, root) {
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
                dom.innerHTML = ''
                Component.prototype.render(renderFunc(), dom)
            }
            window.rootRender()
        }
    }
})()
