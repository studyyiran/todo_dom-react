let Component = {

}

Component.render = function (vnode, root) {
    console.log(vnode)
    root.innerHTML = ''
    let {type, props} = vnode
    let children = vnode.children || props.children
    let dom = document.createElement(type)
    if (props && Object.keys(props) && Object.keys(props).length) {
        Object.keys(props).map(key => {
            if (key !== 'children') {
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
                render(child, dom)
            })
        } else if (children instanceof Object) {
            render(children, dom)
        }
    }
    return root
}

/*

     */
Component.setState = function (nextState, that) {
    let newState = Object.assign({}, that.state, nextState)
    that.state = newState
    Component.rootRender()
}

Component.setRootRender = function(vnode, dom) {
    Component.rootRender = function () {
        Component.render(vnode, dom)
    }
}