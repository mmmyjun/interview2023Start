# 内容包括但不限于 从2023年开始记录和收集的前端面试题、日常练习

## vue2, 在vue2vitets文件夹里
- . 自定义指令
  1) 实现focus
  2) bind和inserted生命周期钩子函数的区别
- . 路由守卫底层原理
  - 全局守卫：beforeEach、beforeResolve、afterEach
- . http code: 
  - 301永久重定向，说明请求的资源已经被移动到了由 Location 头部指定的url上，是固定的不会再改变; 
    302是临时性重定向，旧地址还能用; 
    304:not modified 未改变说明无需再次传输请求的内容，也就是说可以使用缓存的内容。这通常是在一些安全的方法（safe），例如GET 或HEAD 或在请求中附带了头部信息：If-None-Match 或If-Modified-Since。
  - 401: unauthorized; 403: forbidden表示对请求资源的访问被服务器拒绝; 405: method not allowed
- . v-model底层原理
  1) vue2里v-model等于:value+@input/@change的语法糖.
   - 在页面初始化时会把所有data里的数据的属性通过defineProperty设置get set，便于设置和追踪数据的变化。get时候会订阅数据变化，在数据变化时set里面调用notify通知数据变化；
   - 由于defineProperty只对属性做数据劫持而且没法监听属性的添加和移除，所以对数组方法push、splice、pop等做了重写，而且用Vue.set/this.$set的方式来弥补这部分的缺陷
   - 另一种形式的v-model是v-bind的.sync。比如v-bind:title.sync等于:title+@update:title
  2) vue3里v-model等价于:modelValue+@update:modelValue的语法糖
   - 采用proxy对整个对象做数据劫持，所以不必重写数组方法也不必使用$set
- . 静态资源的http缓存, 见js/http强缓存协商缓存
   - 缓存是一种保存资源副本并在下次请求时直接使用该副本的技术。当 web 缓存发现请求的资源已经被存储，它会拦截请求，返回该资源的拷贝，而不会去源服务器重新下载。这样带来的好处有：缓解服务器端压力，提升性能(获取资源的耗时更短了)。对于网站来说，缓存是达到高性能的重要组成部分。缓存需要合理配置，因为并不是所有资源都是永久不变的：重要的是对一个资源的缓存应截止到其下一次发生改变（即不能缓存过期的资源）。
   - 强制缓存expire、cache-control(max-age=31536000)
- . cookie缓存 setcookie(name,value,expire,path,domain,secure,Httponly) ???expire
- . spa: 见js/spampa
  - 参考: https://docs.astro.build/zh-cn/concepts/mpa-vs-spa/的解释：
  1) 多页应用 (MPA，Multi-Page Application) 是一个由多个 HTML 页面组成的网站，主要在服务器上渲染。当您导航到一个新页面时，您的浏览器会从服务器请求一个新的 HTML 页面
  2) 单页应用(SPA，Single-Page Application) 是一个由单个 JavaScript 应用程序组成的网站，该应用程序在用户浏览器中加载，然后在本地呈现 HTML。SPA 也可能在服务器上生成 HTML，但 SPA 的独特之处在于它们能够在浏览器中将您的网站作为 JavaScript 应用程序运行，以便在您导航时呈现新的 HTML 页面。此外， Next.js、Nuxt、SvelteKit、Remix、Gatsby 和 Create React App 都是 SPA 框架的示例。
- . 输入ip地址到出现网页的过程 见js/输入ip地址到出现网页的过程.txt
- . virtualdom 见js/virtualdom
- . 受控非受控组件, 见js/受控非受控组件


## react
  1) 常用hook: useState、useEffect、useMemo、useRef


## ts, 在vue2vitets文件夹src/tsTest
  1) unknwon/any/never的区别
    - any隐性类型关闭了ts校验不推荐使用; unknown未知类型，在一开始没确定是什么类型但是又想在赋值或其他必要的时候回填确定的类型时使用；
      never是除了符合的条件以外的情况，属于永远不可能存在的类型,比如string&number的交叉类型。
  2) 对象的交叉类型和联合类型
    - 交叉类型:两个岛A、B有一个会沉入海里，出于类型安全考虑跑到A B的交叉点，所以取A B属性的并集
    - 联合类型:鱼会吃、游泳，猫会吃、喵喵叫。在盲盒抓取这两样的其中一个的时候，为了保证类型安全，也就是抓到了鱼它不需要喵喵叫抓到了狗它不需要游泳，所以取公共属性"吃"
  3) 同名interface会出现什么情况
    - 属性类型合并|并集（两个类型的交集具有他们所有的属性）

## 低代码平台:form-create