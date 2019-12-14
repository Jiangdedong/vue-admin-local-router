<!--
 * @Descripttion: 
 * @version: 
 * @Author: JDD
 * @Date: 2019-12-14 15:55:37
 * @LastEditors: JDD
 * @LastEditTime: 2019-12-14 16:08:09
 -->
# vue-admin-template

## Build Setup

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9526](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 根据权限加载动态路由
如果你的动态路由已经添加到了vux的state中，但是页面的左侧菜单栏并没有对应的路由菜单，在`src`目录下的`permission.js`中，将以下代码：
~~~Javascript
router.addRoutes(accessRoutes)
~~~
做如下修改：
~~~Javascript
router.options.routes = store.getters.addRouters
router.addRoutes(accessRoutes)
~~~
同时相应的在`store`目录下的`permission.js`中将以下代码：
~~~Javascript
SET_ROUTERS: (state, routers) => {
    state.addRouters = routes
    state.routers = constantRouterMap.concat(routers)
}
~~~
做如下修改：
~~~Javascript
SET_ROUTERS: (state, routers) => {
    state.addRouters = constantRouterMap.concat(routers)
    state.routers = constantRouterMap.concat(routers)
}
~~~

## 路由缓存问题
如果想缓存某个页面，请在路由对应的页面中确保路由中定义的`name`属性值和该页面中定义的`name`属性一样