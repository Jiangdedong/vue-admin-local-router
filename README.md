## 基于用户角色加载不同路由的vue-element-admin模板
此项目及在[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)的基础上，做了路由权限相关方面的修改。可以快速帮助你构建一个基于用户角色的后台管理系统
此项目包含两块功能
* 用户管理模块
* 菜单管理模块

## 用户管理模块
* 在当前模块中你可以新增，删除，修改，重置用户密码，给用户配置菜单

## 菜单管理模块
* 当前模块允许你动态添加路由，添加成功之后，可以前往用户管理模块给某个账户分配
* 现有的菜单新增，component组件已经设置了默认值，你无须改动。path、name及title属性值请勿重复
* 目前只支持二级菜单，添加的路由请严格按照vue-router格式来添加，否则可能会出现意想不到的后果
* 如果想支持三级，三级以上菜单，可以参考此例，修改后端的菜单逻辑

## 路由缓存问题
如果想缓存某个页面，请在路由对应的页面中确保路由中定义的`name`属性值和该页面中定义的`name`属性一样

## 项目预览
[当前项目在线Demo预览](http://localrouter.myhuier.top)

[用户分配路由后在线Demo预览](http://localrouter.myhuier.top)


## 开发

```bash

# 安装依赖
npm install

# 启动服务
npm run dev
```

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