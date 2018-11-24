function Input() {
    /*
    mvvm
    m-v 靠的是 render函数将state（m）转成 vnode（v，在template的帮助下）
    v-m 开的是 setState 修改m。然后出发reRender
     */

    this.state = {
        value: 'some thing i will understand'
    }

    /*
    pure view.get state to render with state
     */
    function vnodeInputOutDiv({children = ''}) {
        return ({
            type: 'div',
            class: 'my-input-div',
            children: [
                this.state.value,
                children
            ]
        })
    }

    function inputHandler(event) {
        console.log(event)
        // TODO
        Component.setState({
            value: event.target.value
        }, this)
    }


    function vnodeInput() {
        return ({
            type: 'input',
            props: {
                class: 'my-input',
                onChange: this.inputHandler.call(this, event)
            }

        })
    }

    function vnodeMix() {
        return vnodeInputOutDiv(
            vnodeInput()
        )
    }

    /*
    类的render方法，入口。
     */
    function render() {
        return vnodeMix()
    }

    return render()
}