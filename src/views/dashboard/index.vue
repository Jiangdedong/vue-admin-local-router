<template>
  <div class="dashboard-container">
    <div class="dashboard-text">账户名: {{ name }}</div>
    <div class="dashboard-text">账户角色: <span v-for="role in roles" :key="role">{{ role }}</span></div>
    <!-- <div class="markdown-body" v-html="dashboardMd" /> -->
    <div style="margin-bottom:5px;">当前站点（以下称之为A站）是在<el-tag size="medium">花裤衩</el-tag>大佬的<el-tag size="medium">vue-admin-template</el-tag>的基础上，做了路由权限相关方面的修改。</div>
    <div>当你在A站登录提供的不同用户账户，你会发现加载的左侧菜单可能会有所不同，依据的是不同的用户对应有不同的用户角色</div>
    <h4>用户管理模块</h4>
    <ul>
      <li>
        在当前模块中你可以新增，删除，修改，给用户配置菜单。新增的用户，你可以在当前站点登录，也可以前往
        <el-tag size="medium">
          <a style="color:#66b1ff" href="http://remoterouter.myhuier.top" target="_blank">http://remoterouter.myhuier.top</a>
        </el-tag>（B站）登录，初始密码为<el-tag size="medium">123456</el-tag>，若遇到密码错误，可以重置你需要登录的用户账户密码。
      </li>
      <li>
        在A站中切换不同的用户账户，左侧菜单会有所不同，<el-tag size="medium">admin</el-tag>账户才有<el-tag size="medium">菜单管理</el-tag>模块，其他账户，包含新增的账户没有此模块
      </li>
      <li>
        因为A站与B的后端服务我使用的<el-tag size="medium">Nodejs</el-tag>、<el-tag size="medium">Express</el-tag>，在关于用户登录校验这里我使用的是<el-tag size="medium">JWT</el-tag>，所以如果你修改了账户信息，请退出重新登录。
      </li>
    </ul>
    <h4>菜单管理模块</h4>
    <ul>
      <li>
        当前模块允许你动态添加路由，添加成功之后，可以前往<el-tag size="medium">用户管理</el-tag>模块给某个账户分配。分配完成之后你可以前往B站登录，查看验证。
      </li>
      <li>现有的菜单新增，component组件已经设置了默认值，你无须改动。path、name及title属性值请勿重复</li>
      <li>目前只支持二级菜单，添加的路由请严格按照<el-tag size="medium">vue-router</el-tag>格式来添加，否则可能会出现意想不到的后果。</li>
      <li>如果想支持三级，三级以上菜单，可以参考此例，修改后端的菜单逻辑</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 10px;
    background-color: white;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.markdown-body{
  font-size: 14px;
}
ul>li{
  margin-bottom: 5px;
  line-height: 30px;
}
</style>
