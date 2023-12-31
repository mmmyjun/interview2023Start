import Vue from 'vue'

// 一个指令定义对象可以提供如下几个钩子函数(均为可选)：
// bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
// inserted：被绑定元素插入父节点时调用(仅保证父节点存在，但不一定已被插入文档中)。
// update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新(详细的钩子函数参数见下)。
// 我们会在稍后讨论渲染函数时介绍更多 VNodes 的细节。
// componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
// unbind：只调用一次，指令与元素解绑时调用。

// binding：一个对象，包含以下 property：
// name：指令名，不包括 v - 前缀。
// value：指令的绑定值，例如：v - my - directive="1 + 1" 中，绑定值为 2。
// oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
// expression：字符串形式的指令表达式。例如 v - my - directive="1 + 1" 中，表达式为 "1 + 1"。
// arg：传给指令的参数，可选。例如 v - my - directive:foo 中，参数为 "foo"。
// modifiers：一个包含修饰符的对象。例如：v - my - directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
Vue.directive('focus', {
    bind: function (el, binding, vnode) {
        // 第二种方法,需要加定时器
        // setTimeout(() => {
        //     // el.focus()
        //     vnode.elm.focus()
        // }, 0);
    },
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 第一种方法，最优解!!!!!!!!!!!!!!!!!
        el.focus()
    }
})
// 使用: <input v-focus>