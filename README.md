## 基于用户角色加载不同路由的vue-element-admin模板


## Build Setup

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

## 路由缓存问题
如果想缓存某个页面，请在路由对应的页面中确保路由中定义的`name`属性值和该页面中定义的`name`属性一样