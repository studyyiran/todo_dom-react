# todo_dom-react
这是一个简单的Todo，用于练习一些基础的DOM操作。
原型地址
https://todoist.com

0）概述
一个很简单的，原生js实现的todo demo。使用vnode描述DOM节点进行渲染

1）todo基本功能
新建todo
设定内容，完成预期日期
完成todo
按照类别查看

2）目录结构
入口文件
index.html

3）数据流
MVC
view层
负责渲染model层的数据。目前封装了一层简陋的mvvm。
data --(render)--> view
从model层获得的数据，被函数组件转换成html包括了state的vnode。
node交给全局的渲染函数进行渲染。

view --(setState) --> data
setState首先更新组件实例的state
之后触发全局的reRender进行更新

因为是从根节点的reRender，所以每次setState都会重新渲染整个dom结构一次。
组件使用state维护组件数据。通过props进行子父组件通信。

model层
负责数据维护。并提供监听给view层。

controller
负责将view层的数据操作dispatch到model层



