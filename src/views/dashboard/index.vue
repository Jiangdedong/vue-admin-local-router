<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <!-- <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <!-- <div class="markdown-body" v-html="dashboardMd" /> -->
    <h3>Demo说明</h3>
    <div style="margin-bottom:5px;">当前站点（我称之为B站）是在<el-tag size="medium">花裤衩</el-tag>大佬的<el-tag size="medium">vue-admin-template</el-tag>的基础上，做了路由权限相关方面的修改。</div>
    <div>当你在B站登录提供的不同用户账户，你会发现加载的左侧菜单可能会有所不同</div>
    <h4>用户列表模块</h4>
    <ul>
      <li>
        <span>该模块下的用户数据来自于</span>
        <el-tag size="medium">
          <a style="color:#66b1ff" href="http://localrouter.myhuier.top" target="_blank">http://localrouter.myhuier.top</a>
        </el-tag>
        <span>（下文称之为A站点）站点，你可以访问登录A站。并在A站的<el-tag size="medium">用户管理</el-tag>模块中新增修改用户的相关信息。</span>
      </li>
      <li>
        B站的<el-tag size="medium">用户列表</el-tag>模块只有查询用户信息的功能，如果你想修改某条用户数据，请访问A站。
      </li>
      <li>
        或许你会发现当你在A站中修改了某条用户数据后，当前站点的相关用户信息并没有发生改变，请不要怀疑，你在A站的信息没有修改成功。因为A站与B的后端服务我使用的<el-tag size="medium">Nodejs</el-tag>、<el-tag size="medium">Express</el-tag>，在关于用户登录校验这里我使用的是<el-tag size="medium">JWT</el-tag>，如果你对此有所了解的话，就会知道为什么会产生当前的结果。
      </li>
      <li>
        如果你想在B站切换用户，以便于验证，在A站中给用户配置的菜单，那么所有的用户注册成功后的初始密码为<el-tag size="medium">123456</el-tag>。若遇到密码错误，请前往A站中修改你需要登录的用户账户密码。
      </li>
    </ul>
    <h4>菜单列表模块</h4>
    <ul>
      <li>
        当前模块只是为了让你大概了解菜单树的格式，方便你对照路由菜单。如果想自定义菜单，请前往A站，登录后访问<el-tag size="medium">菜单管理</el-tag>模块
      </li>
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
