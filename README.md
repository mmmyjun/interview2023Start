#  从2023年开始记录和收集的前端面试题~~~

## vue2 vite, 见vue2vitets/
- 自定义指令
  1) 实现focus
  2) bind和inserted生命周期钩子函数的区别
  3) 项目中用到的例子
  ```js
    Vue.directive("signal", {
      bind(el, binding, vnode) {
        el.innerText = changeSignal(el.innerText, binding.value);
      },
      componentUpdated(el, binding, vnode, oldVnode) {
        if (binding.value === binding.oldValue && vnode.children[0].text === oldVnode.children[0].text) return;
        el.innerText = changeSignal(vnode.children[0].text, binding.value, vnode, oldVnode);
      },
    });
  ```
- 路由守卫
  1) 全局守卫：beforeEach、beforeResolve、afterEach
  2) beforeRouterEnter里用this,见js/vue/beforeRouteEnter用this.png
- v-model
  1) vue2里v-model等于:value+@input/@change的语法糖.
   - 在页面初始化时会把所有data里的数据的属性通过defineProperty设置get set，便于设置和追踪数据的变化。get时候会订阅数据变化，在数据变化时set里面调用notify通知数据变化；
   - 由于defineProperty只对属性做数据劫持而且没法监听属性的添加和移除，所以对数组方法push、splice、pop等做了重写，而且用Vue.set/this.$set的方式来弥补这部分的缺陷
   - 另一种形式的v-model是v-bind的.sync。比如v-bind:title.sync等于:title+@update:title
  2) vue3里v-model等价于:modelValue+@update:modelValue的语法糖
   - 采用proxy对整个对象做数据劫持，所以不必重写数组方法也不必使用$set
  3) 自定义组件的v-model
   - {model: { prop: 'checked', event: 'change' }}
- 静态资源的http缓存, 见js/http强缓存协商缓存
  1) 缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。当 web 缓存发现请求的资源已经被存储，它会拦截请求，返回该资源的拷贝，而不会去源服务器重新下载。这样带来的好处有：缓解服务器端压力，提升性能(获取资源的耗时更短了)。对于网站来说，缓存是达到高性能的重要组成部分。缓存需要合理配置，因为并不是所有资源都是永久不变的：重要的是对一个资源的缓存应截止到其下一次发生改变（即不能缓存过期的资源）。
  2) 强制缓存expire、cache-control(max-age=31536000)
- cookie缓存 setcookie(name,value,expire,path,domain,secure,Httponly)
- spa: 见js/spampa 和本文档“ssr为何能提高加载速度”问题参考链接一致: [astro mpa-spa](https://docs.astro.build/zh-cn/concepts/mpa-vs-spa/)的解释：
  1) 多页应用 (MPA，Multi-Page Application) 是一个由多个 HTML 页面组成的网站，主要在服务器上渲染。当您导航到一个新页面时，您的浏览器会从服务器请求一个新的 HTML 页面
  2) 单页应用(SPA，Single-Page Application) 是一个由单个 JavaScript 应用程序组成的网站，该应用程序在用户浏览器中加载，然后在本地呈现 HTML。SPA 也可能在服务器上生成 HTML，但 SPA 的独特之处在于它们能够在浏览器中将您的网站作为 JavaScript 应用程序运行，以便在您导航时呈现新的 HTML 页面。此外， Next.js、Nuxt、SvelteKit、Remix、Gatsby 和 Create React App 都是 SPA 框架的示例。
- 输入ip地址到出现网页的过程 见js/输入ip地址到出现网页的过程.txt
- 虚拟dom virtualdom 见js/virtualdom/vue
- 受控非受控组件, 见js/受控非受控组件
- Jquery / Mvvm框架的区别 
  1) 应用场景不同 \
  jquery专注dom的原子操作, 而mvvm框架驱动整个web应用，操作dom只是它的一小部分，mvvm框架试图将数据映射到虚拟dom(非必须,比如svelte没有虚拟dom)，并在数据更新以后将更改同步到真实dom
  2) 性能不同 \
  原子化的dom操作在极端场景下，可能会产生性能问题，Mvvm框架在dom同步过程是分批次的(Vue里称作一个Tick)，可以尽可能较少非必要的dom更新，提升了性能
  3) 多平台应用不同 \
  jquery只能用于浏览器应用dom树的操作，而mvvm框架本身剥离了dom层，使其可以运行在Server端(ssr), Native端(例如react-native)
## vue2,webpack. 见vue2webpack/;
- 设置淘宝镜像npm config set registry https://registry.npm.taobao.org
- npm install -g @vue/cli \
  npm install -g @vue/cli-init \
  // `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同 \
  vue init webpack my-project
- nexttick异步任务在dom渲染完成前做了哪些操作?? ==>
  - 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。\
  // 修改数据
  vm.msg = 'Hello' \
  // DOM 还没有更新
  Vue.nextTick(function () {// DOM 更新了})

  // 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示) \
  Vue.nextTick().then(function () {// DOM 更新了})


## 移动端
- 网页移动端[lib-flexible](https://github.com/amfe/lib-flexible)底层原理:
 - 配合px2rem一起使用.
 - 由于viewport单位得到众多浏览器的兼容，lib-flexible这个过渡方案已经可以放弃使用，不管是现在的版本还是以前的版本，都存有一定的问题。建议大家开始使用viewport来替代此方。



## react:
- 常用hook: useState、useEffect、useMemo、useRef
- 类组件和函数组件之间的区别?? ==> 类组件可以使用其他特性，如状态和生命周期钩子并且它有this; \
    函数组件只能接受props渲染到页面，无状态组件，没有this,不能使用生命周期钩子 \
    函数组件性能高于类组件，因为类组件使用要实例化，而函数组件直接执行返回结果即可
- 生命周期,见react/ \
  componentWillmount（）组件将要挂载 \
  componentDidMount（）组件挂载完毕 \
  componentWillUnmount（）组件将要卸载 \
  componentWillReceiveProps （） 组件将要接受参数 （子组件将要接受新参数时触发的生命周期函数）\
  shouldComponentUpdate() 是否可以组件更新，必须有 Boolean 值得返回，如果为 true 则继续生命周期，如果为 false 则不执行任何后续操作，相当于更新操作的阀门 \
  componentWillUpdate （） 组件即将要更新 \
  componentDidUpdate（）组件更新完成 \
  unmountComponentAtNode() 卸载组件 \
  render（）初始化渲染、状态更新之后执行人 render
- 虚拟DOM, 见js/virtualdom \
  本质就是通过编译 JSX 得到的一个以 JavaScript 对象形式存在的 DOM 结构描述。在组件初始化阶段，会通过生命周期方法 render 生成虚拟 DOM节点，然后通过调用 ReactDOM.render 方法，完成虚拟 DOM 节点到真实 DOM 节点的转换。在组件更新阶段，会再次调用 render 方法生成新的虚拟 DOM 节点，然后借助Diffing 算法比对两次虚拟 DOM 节点的差异，从而找出变化的部分实现最小化的 DOM 更新。所以也可以说虚拟 DOM 是 React 核心算法 Diffing 的基石。
- react形式的attrs $listener的处理:  
  ```jsx 
    <ButtonBase LinkComponent={GatsbyLink} href={app.url} disableRipple>
    function GatsbyLink({ href, ...rest }: GatsbyLinkProps) {
          return (
              <Link to={href} {...rest} />
          )
      }
  ```


## ts, 在vue2vitets文件夹src/tsTest
- unknwon/any/never的区别
  - any隐性类型关闭了ts校验不推荐使用; unknown未知类型，在一开始没确定是什么类型但是又想在赋值或其他必要的时候回填确定的类型时使用；
    never是除了符合的条件以外的情况，属于永远不可能存在的类型,比如string&number的交叉类型。
- 对象的交叉类型和联合类型
  - 交叉类型:两个岛A、B有一个会沉入海里，出于类型安全考虑跑到A B的交叉点，所以取A B属性的并集
  - 联合类型:鱼会吃、游泳，猫会吃、喵喵叫。在盲盒抓取这两样的其中一个的时候，为了保证类型安全，也就是抓到了鱼它不需要喵喵叫抓到了狗它不需要游泳，所以取公共属性"吃"
- 同名interface会出现什么情况
  - 属性类型合并|并集（两个类型的交集具有他们所有的属性）

## qiankun相关:
- 主子应用localstorage。见js/qiankunRelative

## 低代码平台:form-create

## ts-node

## tailwind: https://tailwindcss.com/ https://tailwindcss.com/docs/guides/vite
- npm install -D tailwindcss postcss autoprefixer


## nuxt
- ssr为何能提高加载速度?? ==> csr需要从浏览器下载html css等文件，ssr都是从服务器返回静态数据然后注水。和本文档“spa”问题参考链接一致:[astro ssr](https://docs.astro.build/zh-cn/concepts/mpa-vs-spa/)

## js
- fetch发送两次请求?? ==> 跨域时需要通过响应头allow-origin后端校验接口支不支持
  答案参考链接：https://www.nowcoder.com/questionTerminal/77e45f2d9733454babbbe73bd30270f4?orderByHotValue=1&page=1&onlyReference=false
  发送2次请求需要满足以下2个条件：
 - 必须要在跨域的情况下 
 - 除GET、HEAD和POST(content-type： application/x-www-form-urlencoded, multipart/form-data, text/plain Content-Type)以外的跨域请求（我们可以称为预检(Preflighted)的跨域请求）
  总结：
  之所以会发送2次请求，那是因为我们使用了带预检(Preflighted)的跨域请求。该请求会在发送真实的请求之前发送一个类型为OPTIONS的预检请求。预检请求会检测服务器是否支持我们的真实请求所需要的跨域资源，唯有资源满足条件才会发送真实的请求。比如我们在请求头部增加了authorization项，那么在服务器响应头中需要放入Access-Control-Allow-Headers，并且其值中必须要包含authorization，否则OPTIONS预检会失败，从而导致不会发送真实的请求
- 有哪些dom节点 见js/dom
- 宏任务微任务:同步任务->微任务->宏任务 \
  微任务包含：Promise.then、Object.observe、MutationObserver、process.nextTick(Node.js 环境) \
  宏任务包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)
- sort()原理  有参数没参数的差别:没参数按ASCII码排序，有参数按照实际计算排序
  
## css 
- rem局限性?? ==> 
  1) 无法适应页面尺寸。使用rem可能会导致页面布局变得混乱，因为每个元素的宽度都基于页面的根元素宽度，而不是页面的实际尺寸。这可能会导致页面上的元素无法自适应页面大小，从而导致页面呈现不良的效果。
  2) 不支持 iframe 而且有一个理念问题 大屏是为了更大更清晰还是为了承载更多内容。比如：小说网站，屏幕越小的移动设备如果用了rem肯定文字就越小，就会导致看文章的时候特别费眼
  3) PC端一般不使用REM，主要是因为兼容低版本浏览器。例如，从IE9开始就支持REM，但只是部分支持。Ie11完全支持。部分支持IE9和ie10
  4) CSS 属性 aspect-ratio 为盒子规定了首选纵横比，这个纵横比可以用于计算 auto 尺寸以及其他布局函数。
- flex:1;flex-grow flex-shrink flex-basis区别,见css/

## vite: https://cn.vitejs.dev/guide/why.html
- vite比webpack快在哪儿?? ==>

## 网络相关
-  http code: 
  - 301永久重定向，说明请求的资源已经被移动到了由 Location 头部指定的url上，是固定的不会再改变; \
  302是临时性重定向，旧地址还能用; \
  304:not modified 未改变说明无需再次传输请求的内容，也就是说可以使用缓存的内容。这通常是在一些安全的方法（safe），例如GET 或HEAD 或在请求中附带了头部信息：If-None-Match 或If-Modified-Since。
  - 401: unauthorized; \
   403: forbidden表示对请求资源的访问被服务器拒绝; \
   405: method not allowed
- 浏览器渲染过程: 参考链接:https://juejin.cn/post/6844903565610188807#comment  见js/network/
  - 所以浏览器的渲染过程主要包括以下几步：
    - 解析HTML生成DOM树。
    - 解析CSS生成CSSOM规则树。
    - 将DOM树与CSSOM规则树合并在一起生成渲染树。
    - 遍历渲染树开始布局，计算每个节点的位置大小信息。
    - 将渲染树每个节点绘制到屏幕。
  - DOM树的生成过程中不会被CSS加载执行阻塞，CSS只阻塞了DOM的渲染而不会影响其生成～



## 博客技术:mdx

## uniapp、微信小程序、react/react native、低代码
- 低代码:nocobase、简道云